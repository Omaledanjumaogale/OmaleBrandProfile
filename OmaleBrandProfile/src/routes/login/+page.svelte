<script lang="ts">
	import { user, loading } from '$lib/stores/auth';
	import { auth } from '$lib/services/firebase';
	import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let isRegistering = $state(false);
	let error = $state('');

	const handleGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			goto('/dashboard');
		} catch (e: any) {
			error = e.message;
		}
	};

	const handleEmailAuth = async () => {
		try {
			if (isRegistering) {
				await createUserWithEmailAndPassword(auth, email, password);
			} else {
				await signInWithEmailAndPassword(auth, email, password);
			}
			goto('/dashboard');
		} catch (e: any) {
			error = e.message;
		}
	};
</script>

<div class="min-h-screen bg-bg flex items-center justify-center px-6 py-20 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none"></div>
	
	<div class="w-full max-w-md reveal visible">
		<div class="bg-surface border border-border p-10 rounded-3xl shadow-2xl relative">
			<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-teal2 rounded-t-3xl"></div>
			
			<div class="text-center mb-10">
				<a href="/" class="text-3xl font-['Bebas_Neue'] tracking-widest text-text mb-2 inline-block">
					<span class="text-gold italic">E</span>-WIN PROJECT
				</a>
				<h2 class="font-['Bebas_Neue'] text-4xl tracking-widest text-text uppercase">
					{isRegistering ? 'Join the Mission 🌍' : 'Welcome Back 🤝'}
				</h2>
				<p class="text-[11px] font-['Space_Mono'] tracking-widest text-muted uppercase mt-2">
					Secure Enterprise Access Portal 🛡️
				</p>
			</div>

			{#if error}
				<div class="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
					{error}
				</div>
			{/if}

			<div class="space-y-6">
				<button 
					onclick={handleGoogleLogin}
					class="w-full flex items-center justify-center gap-4 py-4 bg-bg border border-border rounded-xl hover:border-gold-line transition-all group"
				>
					<span class="text-xl">🌐</span>
					<span class="text-[11px] font-bold tracking-[2px] uppercase text-text group-hover:text-gold transition-colors">Continue with Google</span>
				</button>

				<div class="relative flex items-center gap-4 py-2">
					<div class="flex-grow h-[1px] bg-border"></div>
					<span class="text-[10px] font-['Space_Mono'] text-muted uppercase">OR</span>
					<div class="flex-grow h-[1px] bg-border"></div>
				</div>

				<div class="space-y-4">
					<div class="space-y-2">
						<label for="email" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Email Address 📧</label>
						<input 
							id="email"
							type="email" 
							bind:value={email}
							placeholder="Enter your email"
							class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:outline-none focus:border-gold transition-all"
						/>
					</div>
					<div class="space-y-2">
						<label for="password" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Password 🔒</label>
						<input 
							id="password"
							type="password" 
							bind:value={password}
							placeholder="••••••••"
							class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:outline-none focus:border-gold transition-all"
						/>
					</div>
				</div>

				<button 
					onclick={handleEmailAuth}
					class="w-full py-4 bg-gold text-bg text-[11px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 hover:translate-y-[-2px] transition-all shadow-lg shadow-gold/20"
				>
					{isRegistering ? 'Create Account 🚀' : 'Sign In 🗝️'}
				</button>

				<p class="text-center text-[11px] text-muted font-light">
					{isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
					<button 
						onclick={() => isRegistering = !isRegistering}
						class="text-gold font-bold hover:underline uppercase ml-1"
					>
						{isRegistering ? 'Login' : 'Register'}
					</button>
				</p>
			</div>
		</div>

		<p class="mt-8 text-center text-[9px] font-['Space_Mono'] tracking-widest text-muted uppercase">
			Protected by E-WIN Security Infrastructure · 256-bit AES 🛡️
		</p>
	</div>
</div>
