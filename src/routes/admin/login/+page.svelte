<script lang="ts">
	import { auth } from '$lib/services/firebase';
	import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { PUBLIC_SUPER_ADMIN_EMAIL, PUBLIC_SUPER_ADMIN_PASSWORD } from '$env/static/public';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');
	let showReset = $state(false);
	let resetSuccess = $state(false);

	// Super Admin Hardlocked Credentials from Env
	const SUPER_ADMIN_EMAIL = PUBLIC_SUPER_ADMIN_EMAIL;
	const SUPER_ADMIN_PASSWORD = PUBLIC_SUPER_ADMIN_PASSWORD;

	async function handleLogin() {
		loading = true;
		error = '';
		
		try {
			// Hardlocked Super Admin check
			if (email.toLowerCase() === SUPER_ADMIN_EMAIL?.toLowerCase() && password === SUPER_ADMIN_PASSWORD) {
				// In a real enterprise app, you'd set a secure cookie/session here
				// For now, we'll leverage the existing auth state or a local override
				localStorage.setItem('is_super_admin', 'true');
				goto('/admin');
				return;
			}

			if (!auth) throw new Error("Auth service unavailable");
			await signInWithEmailAndPassword(auth, email, password);
		} catch (e: any) {
			console.error('Login error:', e);
			error = e.message || 'Invalid credentials or access denied.';
		} finally {
			loading = false;
		}
	}

	async function handleReset() {
		if (!auth || !email) return;
		loading = true;
		error = '';
		try {
			await sendPasswordResetEmail(auth, email);
			resetSuccess = true;
			showReset = false;
		} catch (e: any) {
			error = e.message || 'Failed to send reset email.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-bg px-6 py-12 relative overflow-hidden">
	<!-- Background grid -->
	<div class="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 pointer-events-none"></div>
	
	<div class="w-full max-w-[450px] relative z-10">
		<div class="text-center mb-10">
			<a href="/" class="text-4xl font-['Bebas_Neue'] tracking-[4px] text-text mb-4 inline-block">
				<span class="text-gold italic font-normal">O</span>MALE OGALE
			</a>
			<div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-gold">Admin Portal Access 🛡️</div>
		</div>

		<div class="bg-surface border border-border p-10 rounded-3xl shadow-2xl backdrop-blur-xl">
			{#if error}
				<div class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-[11px] mb-6 flex items-center gap-3">
					<span>⚠️</span> {error}
				</div>
			{/if}

			{#if resetSuccess}
				<div class="p-4 bg-teal2/10 border border-teal2/30 rounded-xl text-teal2 text-[11px] mb-6 flex items-center gap-3">
					<span>📧</span> Reset link sent to your email.
				</div>
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); showReset ? handleReset() : handleLogin(); }} class="space-y-6">
				<div class="space-y-2">
					<label for="email" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Administrative Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						required
						placeholder="admin@ewinproject.com"
						class="w-full bg-bg border border-border rounded-xl px-5 py-4 text-[13px] focus:border-gold outline-none transition-all"
					/>
				</div>

				{#if !showReset}
					<div class="space-y-2">
						<div class="flex justify-between items-center">
							<label for="password" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Password</label>
							<button type="button" onclick={() => showReset = true} class="text-[9px] text-gold hover:underline uppercase tracking-widest">Forgot?</button>
						</div>
						<input
							type="password"
							id="password"
							bind:value={password}
							required
							placeholder="••••••••"
							class="w-full bg-bg border border-border rounded-xl px-5 py-4 text-[13px] focus:border-gold outline-none transition-all"
						/>
					</div>
				{/if}

				<button
					type="submit"
					disabled={loading}
					class="w-full py-5 bg-gold text-bg text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
				>
					{#if loading}
						<span class="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin"></span>
						Authenticating...
					{:else}
						{showReset ? 'Send Reset Link 📧' : 'Enter Portal 🛡️'}
					{/if}
				</button>

				{#if showReset}
					<button type="button" onclick={() => showReset = false} class="w-full text-center text-[10px] text-muted hover:text-text uppercase tracking-widest">
						Back to Login
					</button>
				{/if}
			</form>
		</div>

		<div class="mt-10 text-center">
			<p class="text-[11px] text-muted leading-relaxed">
				Authorized access only. All sessions are logged and monitored.<br />
				© 2026 Danjuma Omale-Ogale · E-WIN Project.
			</p>
		</div>
	</div>
</div>
