<script lang="ts">
	import { auth } from '$lib/services/firebase';
	import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');
	let showReset = $state(false);
	let resetSuccess = $state(false);

	// Super Admin Hardlocked Credentials from Dynamic Env to prevent build failure
	const SUPER_ADMIN_EMAIL = env.PUBLIC_SUPER_ADMIN_EMAIL;
	const SUPER_ADMIN_PASSWORD = env.PUBLIC_SUPER_ADMIN_PASSWORD;

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

<svelte:head>
	<title>Admin Portal - Secure E-WIN Project Management | Omale Ogale ProfileX</title>
	<meta name="description" content="Access the E-WIN Project administrative portal to manage ecosystem operations, verify participants, and oversee workforce distribution. Secure login for authorized staff." />
	
	<!-- JSON-LD Schema Markup -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebApplication",
		"name": "E-WIN Admin Portal",
		"url": "https://omaledanjumaogale.ewinproject.org/admin/login",
		"description": "Secure administrative access for the E-WIN Project ecosystem management.",
		"applicationCategory": "BusinessApplication",
		"operatingSystem": "All",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		}
	}
	</script>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-bg px-6 py-12 relative overflow-hidden">
	<!-- Background grid -->
	<div class="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 pointer-events-none"></div>
	
	<div class="w-full max-w-[450px] relative z-10">
		<div class="text-center mb-10">
			<a href="/" class="text-3xl sm:text-4xl font-['Bebas_Neue'] tracking-[4px] text-text mb-4 inline-block">
				<span class="text-gold italic font-normal">O</span>MALE OGALE
			</a>
			<div class="font-['Space_Mono'] text-sm md:text-[10px] tracking-[4px] uppercase text-gold">Admin Portal Access 🛡️</div>
		</div>

		<div class="bg-surface border border-border p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl">
			{#if error}
				<div class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm md:text-[11px] mb-6 flex items-center gap-3">
					<span>⚠️</span> {error}
				</div>
			{/if}

			{#if resetSuccess}
				<div class="p-4 bg-teal2/10 border border-teal2/30 rounded-xl text-teal2 text-sm md:text-[11px] mb-6 flex items-center gap-3">
					<span>📧</span> Reset link sent to your email.
				</div>
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); showReset ? handleReset() : handleLogin(); }} class="space-y-6">
				<div class="space-y-2">
					<label for="email" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Administrative Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						required
						placeholder="admin@ewinproject.com"
						class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm md:text-[13px] focus:border-gold outline-none transition-all"
					/>
				</div>

				{#if !showReset}
					<div class="space-y-2">
						<div class="flex justify-between items-center">
							<label for="password" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Security Key</label>
							<button type="button" onclick={() => showReset = true} class="text-sm md:text-[9px] uppercase tracking-widest text-gold hover:text-gold2 font-bold min-h-[44px] flex items-center">Forgot? 🔑</button>
						</div>
						<input
							type="password"
							id="password"
							bind:value={password}
							required
							placeholder="••••••••••••"
							class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm md:text-[13px] focus:border-gold outline-none transition-all"
						/>
					</div>
				{/if}

				<button
					type="submit"
					disabled={loading}
					class="w-full py-4 min-h-[44px] bg-gold text-bg text-sm md:text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 transition-all shadow-xl shadow-gold/30 flex items-center justify-center gap-3"
				>
					{loading ? (showReset ? 'Sending Reset...' : 'Authenticating...') : (showReset ? 'Send Reset Link 📧' : 'Access Portal 🛡️')}
					{#if !loading}
						<span class="text-xl">→</span>
					{/if}
				</button>

				{#if showReset}
					<button type="button" onclick={() => showReset = false} class="w-full text-sm md:text-[10px] uppercase tracking-[2px] text-muted hover:text-text font-bold py-2 min-h-[44px]">Back to Login 🔙</button>
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
