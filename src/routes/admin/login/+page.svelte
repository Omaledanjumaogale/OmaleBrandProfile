<script lang="ts">
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/services/firebase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	const redirectTo = $derived($page.url.searchParams.get('redirect') ?? '/admin');

	async function handleLogin() {
		if (loading || !email || !password) return;
		loading = true;
		error = '';

		try {
			if (!auth) throw new Error('Authentication service unavailable. Check Firebase config.');

			// 1. Sign in with Firebase
			const credential = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await credential.user.getIdToken();

			// 2. Determine role — admin emails stored in Firebase custom claims
			// For now, all logins via this page are treated as admin
			const role = 'admin';

			// 3. Exchange Firebase token for a server-side session cookie
			const res = await fetch('/api/session', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ idToken, role })
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.error ?? 'Session creation failed. Please try again.');
			}

			// 4. Redirect to intended destination
			await goto(redirectTo, { invalidateAll: true });
		} catch (e: any) {
			const code = e?.code ?? '';
			if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
				error = 'Incorrect email or password. Please try again.';
			} else if (code === 'auth/too-many-requests') {
				error = 'Too many attempts. Please wait a few minutes and try again.';
			} else {
				error = e.message ?? 'An unexpected error occurred.';
			}
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin Sign In · E-WIN Project</title>
</svelte:head>

<div class="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 py-16">
	<!-- Background grid -->
	<div class="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 pointer-events-none" aria-hidden="true"></div>

	<div class="relative z-10 w-full max-w-[420px]">
		<!-- Logo -->
		<a href="/" class="flex items-center justify-center gap-2 mb-10">
			<span class="font-['Bebas_Neue'] text-3xl tracking-widest text-[var(--text)]">
				<span class="text-[var(--gold)]">E</span>-WIN
			</span>
			<span class="font-['Space_Mono'] text-[9px] tracking-[3px] uppercase text-[var(--muted)] mt-1">Admin Portal</span>
		</a>

		<div class="card p-8 sm:p-10">
			<div class="mb-8">
				<div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-[var(--gold)] mb-2 flex items-center gap-2">
					<span aria-hidden="true">🛡️</span> Secure Access
				</div>
				<h1 class="font-['Bebas_Neue'] text-4xl tracking-widest text-[var(--text)]">Admin Sign In</h1>
				<p class="text-[13px] text-[var(--muted)] mt-1">Authorised personnel only.</p>
			</div>

			{#if error}
				<div class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-[13px] flex items-start gap-3" role="alert">
					<span aria-hidden="true">⚠️</span>
					<span>{error}</span>
				</div>
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); handleLogin(); }} class="space-y-5">
				<div class="space-y-2">
					<label for="email" class="font-['Space_Mono'] text-[10px] tracking-[2px] uppercase text-[var(--muted)] font-bold block">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						autocomplete="email"
						placeholder="admin@ewinproject.org"
						class="input-base"
					/>
				</div>

				<div class="space-y-2">
					<label for="password" class="font-['Space_Mono'] text-[10px] tracking-[2px] uppercase text-[var(--muted)] font-bold block">
						Password
					</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						autocomplete="current-password"
						placeholder="••••••••"
						class="input-base"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full py-4 min-h-[48px] bg-[var(--gold)] text-[var(--bg)] font-bold tracking-[3px] uppercase text-[12px] rounded-xl hover:bg-[var(--gold2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-2 shadow-[var(--shadow-gold)]"
				>
					{#if loading}
						<span class="w-4 h-4 border-2 border-[var(--bg)]/30 border-t-[var(--bg)] rounded-full animate-spin" aria-hidden="true"></span>
						Verifying...
					{:else}
						<span aria-hidden="true">🔐</span> Sign In
					{/if}
				</button>
			</form>

			<div class="mt-8 pt-6 border-t border-[var(--border)] text-center">
				<a href="/" class="text-[11px] font-['Space_Mono'] tracking-widest uppercase text-[var(--muted)] hover:text-[var(--gold)] transition-colors">
					← Back to Public Site
				</a>
			</div>
		</div>

		<p class="text-center text-[10px] text-[var(--muted)] mt-6 font-['Space_Mono'] tracking-widest uppercase">
			© 2026 E-WIN Project · Secure Infrastructure
		</p>
	</div>
</div>
