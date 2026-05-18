<script lang="ts">
	import { loginWithEmail, loginWithGoogle, authStore } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { ui } from '$lib/stores/ui';

	let email = $state('');
	let password = $state('');
	let loading = $derived($authStore.loading);
	let error = $derived($authStore.error);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		try {
			await loginWithEmail(email, password);
			ui.success('Logged in successfully');
			goto('/admin');
		} catch (err: any) {
			// error is handled by the store
		}
	}

	async function handleGoogleLogin() {
		try {
			await loginWithGoogle();
			ui.success('Logged in with Google');
			goto('/admin');
		} catch (err: any) {
			// error is handled by the store
		}
	}
</script>

<svelte:head>
	<title>Login — E-WIN Admin Portal</title>
</svelte:head>

<section class="min-h-[80vh] flex items-center justify-center px-6 py-20">
	<div class="w-full max-w-md space-y-8 bg-[#0f0e0b] border border-[var(--gold)]/10 p-10 rounded-3xl reveal">
		<div class="text-center space-y-2">
			<h1 class="font-['Bebas_Neue'] text-4xl tracking-widest text-[var(--gold)]">SECURE LOGIN</h1>
			<p class="text-white/40 text-xs font-['Space_Mono'] uppercase tracking-widest">Admin Portal Access</p>
		</div>

		{#if error}
			<div class="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center">
				{error}
			</div>
		{/if}

		<form onsubmit={handleSubmit} class="space-y-6">
			<div class="space-y-2">
				<label for="email" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-white/40 ml-2">Email Address</label>
				<input 
					id="email"
					type="email" 
					bind:value={email} 
					required 
					placeholder="admin@ewinproject.org"
					class="w-full bg-[#0b0a07] border border-[var(--gold)]/20 rounded-xl px-5 py-4 text-white focus:border-[var(--gold)]/50 outline-none transition-all"
				/>
			</div>

			<div class="space-y-2">
				<label for="password" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-white/40 ml-2">Password</label>
				<input 
					id="password"
					type="password" 
					bind:value={password} 
					required 
					placeholder="••••••••"
					class="w-full bg-[#0b0a07] border border-[var(--gold)]/20 rounded-xl px-5 py-4 text-white focus:border-[var(--gold)]/50 outline-none transition-all"
				/>
			</div>

			<button 
				type="submit" 
				disabled={loading}
				class="w-full py-4 bg-[var(--gold)] text-[#0b0a07] font-bold rounded-xl uppercase tracking-widest hover:bg-[var(--gold-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
			>
				{loading ? 'Authenticating...' : 'Sign In'}
			</button>
		</form>

		<div class="relative py-4 flex items-center justify-center">
			<div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/5"></div></div>
			<span class="relative bg-[#0f0e0b] px-4 text-[10px] font-['Space_Mono'] text-white/20 uppercase tracking-widest">Or continue with</span>
		</div>

		<button 
			onclick={handleGoogleLogin}
			disabled={loading}
			class="w-full py-4 border border-white/10 text-white rounded-xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
		>
			<svg class="w-5 h-5" viewBox="0 0 24 24">
				<path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
				<path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
				<path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
				<path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
			</svg>
			<span class="text-sm font-medium">Google Account</span>
		</button>
	</div>
</section>
