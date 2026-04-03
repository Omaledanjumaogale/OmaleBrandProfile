<script lang="ts">
	import { goto } from '$app/navigation';
	import { convex, getSessionId } from '$lib/convex';
	import { api } from '../../../../convex/_generated/api';

	let form = $state({
		fullName: '',
		email: '',
		mobileNumber: '',
		whatsappNumber: '',
		stateOfOrigin: '',
		lgaOfOrigin: '',
		stateOfResidence: '',
		lgaOfResidence: '',
		nin: '',
		academicBackground: '',
		workingExperience: '',
		skills: '',
		motivationalStatement: '',
		monthlyEarningsTarget: '',
		sessionId: getSessionId()
	});

	let loading = $state(false);
	let error = $state('');

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		loading = true;
		error = '';

		try {
			await convex.mutation(api.functions.submitApplicationWorkflow, form);
			goto('/register/success');
		} catch (err: any) {
			error = err.message || 'An error occurred while submitting your application.';
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>I-AM Network - Free Distributed Work & Earnings Platform | Omale Ogale ProfileX</title>
	<meta name="description" content="Join the I-AM Network to access free distributed work opportunities across Nigeria. Scale your earnings with our decentralized workforce model—signup now to start." />
	
	<!-- JSON-LD Schema Markup -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebApplication",
		"name": "I-AM Network 🌍",
		"url": "https://danjumaomaleogale.ewinproject.org/register/iam",
		"description": "The Impact Ambassador Network — a decentralised workforce of vetted, trained professionals performing distributed work across the E-WIN ecosystem.",
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

<div class="min-h-screen bg-bg flex flex-col items-center py-12 sm:py-20 px-6 relative overflow-hidden">
	<!-- Background Effects -->
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none"></div>

	<div class="w-full max-w-4xl relative z-10">
		<div class="text-center mb-12 sm:mb-16 reveal visible">
			<a href="/" class="text-2xl sm:text-3xl font-['Bebas_Neue'] tracking-widest text-text mb-2 inline-block">
				<span class="text-gold italic">O</span>MALE OGALE ProfileX
			</a>
			<h1 class="font-['Bebas_Neue'] text-4xl sm:text-5xl tracking-[2px] text-text uppercase">
				I-AM Network Registration 🌍
			</h1>
			<p class="text-sm md:text-[11px] font-['Space_Mono'] tracking-widest text-muted uppercase mt-3">
				Onboard into the E-WIN Project Ecosystem 🛡️
			</p>
		</div>

		{#if error}
			<div class="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
				{error}
			</div>
		{/if}

		<form onsubmit={handleSubmit} class="bg-surface border border-border p-6 sm:p-12 rounded-3xl shadow-2xl relative">
			<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-teal2 rounded-t-3xl"></div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- Personal Details Section -->
				<div class="space-y-6">
					<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-gold uppercase border-b border-border pb-2">
						Personal Details 👤
					</h3>
					
					<div class="space-y-2">
						<label for="fullName" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Full Name 📝</label>
						<input id="fullName" type="text" bind:value={form.fullName} required placeholder="Danjuma Ogale" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div class="space-y-2">
							<label for="email" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Email Address 📧</label>
							<input id="email" type="email" bind:value={form.email} required placeholder="email@example.com" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
						</div>
						<div class="space-y-2">
							<label for="mobileNumber" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Mobile Number 📱</label>
							<input id="mobileNumber" type="tel" inputmode="tel" bind:value={form.mobileNumber} required placeholder="+234..." class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
						</div>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div class="space-y-2">
							<label for="whatsappNumber" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">WhatsApp Number 💬</label>
							<input id="whatsappNumber" type="tel" inputmode="tel" bind:value={form.whatsappNumber} required placeholder="+234..." class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
						</div>
						<div class="space-y-2">
							<label for="nin" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">NIN Number 🛡️</label>
							<input id="nin" type="text" inputmode="numeric" bind:value={form.nin} required placeholder="National ID Number" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
						</div>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div class="space-y-2">
							<label for="stateOfOrigin" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">State of Origin 🇳🇬</label>
							<input id="stateOfOrigin" type="text" bind:value={form.stateOfOrigin} required placeholder="State" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
						</div>
						<div class="space-y-2">
							<label for="lgaOfOrigin" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">LGA of Origin 📍</label>
							<input id="lgaOfOrigin" type="text" bind:value={form.lgaOfOrigin} required placeholder="Local Gov Area" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
						</div>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div class="space-y-2">
							<label for="stateOfResidence" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">State of Residence 🏠</label>
							<input id="stateOfResidence" type="text" bind:value={form.stateOfResidence} required placeholder="State" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
						</div>
						<div class="space-y-2">
							<label for="lgaOfResidence" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">LGA of Residence 🏘️</label>
							<input id="lgaOfResidence" type="text" bind:value={form.lgaOfResidence} required placeholder="Local Gov Area" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
						</div>
					</div>
				</div>

				<!-- Professional & Academic Section -->
				<div class="space-y-6">
					<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-gold uppercase border-b border-border pb-2">
						Academic & Career 💼
					</h3>

					<div class="space-y-2">
						<label for="academicBackground" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Academic Background 🎓</label>
						<input id="academicBackground" type="text" bind:value={form.academicBackground} required placeholder="Degree/Course of Study" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
					</div>

					<div class="space-y-2">
						<label for="workingExperience" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Working Experience 💼</label>
						<textarea id="workingExperience" bind:value={form.workingExperience} required rows="3" placeholder="Describe previous experience (or mention 'No Experience')" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors resize-none"></textarea>
					</div>

					<div class="space-y-2">
						<label for="skills" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Skills (Soft/Digital/Marketing) ⚡</label>
						<textarea id="skills" bind:value={form.skills} required rows="3" placeholder="List your digital skills, knowledge sharing, or business development expertise" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors resize-none"></textarea>
					</div>

					<div class="space-y-2">
						<label for="motivationalStatement" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Motivational Statement 🚀</label>
						<textarea id="motivationalStatement" bind:value={form.motivationalStatement} required rows="4" placeholder="Why do you want to work with the E-WIN Project?" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors resize-none"></textarea>
					</div>

					<div class="space-y-2">
						<label for="monthlyEarningsTarget" class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Monthly Earnings Target 💰</label>
						<input id="monthlyEarningsTarget" type="text" bind:value={form.monthlyEarningsTarget} required placeholder="How much would you like to earn monthly? (e.g. ₦150,000)" class="w-full bg-bg border border-border rounded-xl px-5 py-4 min-h-[44px] text-sm focus:border-gold outline-none transition-colors" />
					</div>
				</div>
			</div>

			<div class="mt-12 pt-8 border-t border-border flex flex-col items-center">
				<p class="text-sm sm:text-[11px] text-muted text-center mb-6 max-w-[500px] font-light italic">
					By submitting this application, you agree to the E-WIN Project terms of service and commit to the mission of impacting Nigeria's workforce through elite collaboration. 🛡️
				</p>
				<button 
					type="submit" 
					disabled={loading}
					class="w-full md:max-w-md py-4 min-h-[44px] bg-gold text-bg text-sm md:text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 hover:translate-y-[-2px] transition-all shadow-xl shadow-gold/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? 'Processing Application...' : 'Submit IAM Application 🚀'}
					{#if !loading}
						<span class="text-xl">→</span>
					{/if}
				</button>
			</div>
		</form>

		<p class="mt-12 text-center text-sm md:text-[9px] font-['Space_Mono'] tracking-widest text-muted uppercase">
			Verified Security Protocol Active 🛡️ · E-WIN Project Ecosystem
		</p>
	</div>
</div>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	
	.reveal.visible {
		opacity: 1;
		transform: translateY(0);
	}
</style>
