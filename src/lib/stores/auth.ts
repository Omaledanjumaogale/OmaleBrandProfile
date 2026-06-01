// ── Auth Store: Firebase + Convex Bridge ──────────────────────────────
// Manages Firebase Auth state and syncs the ID token to the Convex client
// for authenticated backend queries/mutations.

import { writable, derived, get } from 'svelte/store';
import { convex, getClientSessionContext } from '$lib/convex';
import { onAuthChange, signInEmail, signInGoogle, signOutUser, getIdToken } from '$lib/firebase';
import { api } from '$convex/_generated/api';
import type { User } from 'firebase/auth';

// ── State ─────────────────────────────────────────────────────────────

export interface AuthUser {
	uid: string;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	/** Role resolved from Convex — undefined while loading */
	role?: 'user' | 'admin' | 'auditor' | 'superadmin';
	plan?: 'free' | 'pro' | 'enterprise';
	subscriptionStatus?: 'active' | 'inactive' | 'pending';
	isLocked?: boolean;
}

interface AuthState {
	user: AuthUser | null;
	loading: boolean;
	error: string | null;
	/** True when Firebase + Convex token sync is complete */
	ready: boolean;
}

const _auth = writable<AuthState>({
	user: null,
	loading: true,
	error: null,
	ready: false
});

// ── Convex Token Sync ─────────────────────────────────────────────────
// Convex's ConvexClient accepts a token for auth — we feed it the
// Firebase ID token so backend functions can verify the caller.

async function syncConvexToken(firebaseUser: User | null) {
	try {
		if (firebaseUser) {
			// Inject the Firebase ID token into all future Convex calls
			convex.setAuth(async () => {
				// Refresh the token just before each Convex call
				return (await getIdToken()) ?? null;
			});
		} else {
			// Clear auth: pass a function that always returns null
			convex.setAuth(async () => null);
		}
	} catch (err) {
		console.error('[auth] Convex token sync failed:', err);
	}
}

// ── Firebase Auth Listener ────────────────────────────────────────────

let _unsubscribe: (() => void) | null = null;

/** Call once in layout — subscribes to Firebase auth state */
export function initAuth(): () => void {
	if (typeof window === 'undefined') {
		_auth.update((s) => ({ ...s, loading: false, ready: true }));
		return () => {};
	}

	_unsubscribe = onAuthChange(async (firebaseUser) => {
		_auth.update((s) => ({ ...s, loading: true }));

		await syncConvexToken(firebaseUser);

		if (firebaseUser) {
			try {
				// ── Sync with Convex ──
				// This ensures the Firebase identity exists in the platform database
				const session = getClientSessionContext();
				await convex.mutation(api.functions.syncUser, {
					email: firebaseUser.email ?? "",
					name: firebaseUser.displayName ?? "User",
					image: firebaseUser.photoURL ?? undefined,
					...session
				});

				// Fetch full user record from Convex for roles/subscription
				const platformUser = await convex.query(api.functions.getCurrentUser, {});

				const authUser: AuthUser = {
					uid:         firebaseUser.uid,
					email:       firebaseUser.email,
					displayName: firebaseUser.displayName,
					photoURL:    firebaseUser.photoURL,
					role:        platformUser?.role ?? 'user',
					plan:        platformUser?.plan,
					subscriptionStatus: platformUser?.subscriptionStatus,
					isLocked:    platformUser?.isLocked
				};
				_auth.set({ user: authUser, loading: false, error: null, ready: true });
			} catch (err) {
				console.error('[auth] Sync failed:', err);
				_auth.update((s) => ({ ...s, loading: false, ready: true }));
			}
		} else {
			_auth.set({ user: null, loading: false, error: null, ready: true });
		}
	});

	return () => { _unsubscribe?.(); };
}

// ── Public Actions ────────────────────────────────────────────────────

export async function loginWithEmail(email: string, password: string): Promise<void> {
	_auth.update((s) => ({ ...s, loading: true, error: null }));
	try {
		await signInEmail(email, password);
		// onAuthChange will update store
	} catch (err: any) {
		const msg = parseFirebaseError(err.code);
		_auth.update((s) => ({ ...s, loading: false, error: msg }));
		throw new Error(msg);
	}
}

export async function loginWithGoogle(): Promise<void> {
	_auth.update((s) => ({ ...s, loading: true, error: null }));
	try {
		await signInGoogle();
	} catch (err: any) {
		const msg = parseFirebaseError(err.code);
		_auth.update((s) => ({ ...s, loading: false, error: msg }));
		throw new Error(msg);
	}
}

export async function logout(): Promise<void> {
	await signOutUser();
	_auth.set({ user: null, loading: false, error: null, ready: true });
}

// ── Derived Stores ────────────────────────────────────────────────────

export const authStore = { subscribe: _auth.subscribe };
export const currentUser    = derived(_auth, ($a) => $a.user);
export const isLoggedIn     = derived(_auth, ($a) => !!$a.user);
export const authLoading    = derived(_auth, ($a) => $a.loading);
export const authReady      = derived(_auth, ($a) => $a.ready);
export const isAdmin = derived(_auth, ($a) =>
	$a.user?.role === 'admin' || $a.user?.role === 'auditor' || $a.user?.role === 'superadmin'
);

// ── Firebase Error → Human-Readable Message ────────────────────────

function parseFirebaseError(code: string): string {
	const map: Record<string, string> = {
		'auth/user-not-found':     'No account found with this email.',
		'auth/wrong-password':     'Incorrect password. Please try again.',
		'auth/invalid-email':      'Please enter a valid email address.',
		'auth/user-disabled':      'This account has been disabled.',
		'auth/too-many-requests':  'Too many attempts. Please try again later.',
		'auth/popup-closed-by-user': 'Sign-in was cancelled.',
		'auth/network-request-failed': 'Network error. Please check your connection.',
		'auth/invalid-credential': 'Invalid credentials. Please try again.',
	};
	return map[code] ?? 'Sign-in failed. Please try again.';
}
