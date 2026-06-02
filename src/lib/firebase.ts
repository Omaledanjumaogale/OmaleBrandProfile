// Firebase Auth integration for OmaleBrandProfile
// Uses Firebase v9 modular SDK
import { env } from '$env/dynamic/public';
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
	type User,
	type Auth
} from 'firebase/auth';

// ── Singleton initialisation ───────────────────────────────────────
let app: FirebaseApp;
let auth: Auth;
let googleProvider: GoogleAuthProvider;

if (typeof window !== 'undefined') {
	// ── Firebase Config ────────────────────────────────────────────────
	// Values come from PUBLIC_ env vars (safe to expose client-side)
	const firebaseConfig = {
		apiKey: env.PUBLIC_FIREBASE_API_KEY,
		authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		appId: env.PUBLIC_FIREBASE_APP_ID
	};
	const firebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

	if (!firebaseConfigured) {
		console.warn('[firebase] Public configuration is missing. Authentication features are disabled.');
	} else {
		app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
		auth = getAuth(app);
		auth.languageCode = 'en';
		googleProvider = new GoogleAuthProvider();
		googleProvider.addScope('email');
		googleProvider.addScope('profile');
	}
}

// ── Auth Actions ───────────────────────────────────────────────────

/** Sign in with email + password */
export async function signInEmail(email: string, password: string): Promise<User> {
	if (!auth) throw new Error('Firebase not initialised');
	const cred = await signInWithEmailAndPassword(auth, email, password);
	return cred.user;
}

/** Sign in with Google popup */
export async function signInGoogle(): Promise<User> {
	if (!auth) throw new Error('Firebase not initialised');
	const cred = await signInWithPopup(auth, googleProvider);
	return cred.user;
}

/** Sign out */
export async function signOutUser(): Promise<void> {
	if (!auth) return;
	await signOut(auth);
}

/** Send password reset email */
export async function resetPassword(email: string): Promise<void> {
	if (!auth) throw new Error('Firebase not initialised');
	await sendPasswordResetEmail(auth, email);
}

/** Get current user's ID token for Convex auth */
export async function getIdToken(): Promise<string | null> {
	if (!auth?.currentUser) return null;
	return auth.currentUser.getIdToken();
}

/** Subscribe to auth state changes — returns unsubscribe fn */
export function onAuthChange(callback: (user: User | null) => void): () => void {
	if (!auth) return () => {};
	return onAuthStateChanged(auth, callback);
}

export { auth };
