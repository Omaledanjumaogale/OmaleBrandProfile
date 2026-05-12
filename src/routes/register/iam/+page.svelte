<script lang="ts">
	import { convex, getSessionId } from '$lib/convex';
	import { api } from '../../../../convex/_generated/api';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// Status from URL (pending | apply)
	const urlStatus = $derived($page.url.searchParams.get('status') ?? '');

	let registrationOpen = $state(true);
	let checkingStatus = $state(true);

	onMount(async () => {
		try {
			registrationOpen = await convex.query(api.functions.getSetting, { key: 'registration_open' });
		} catch { registrationOpen = true; }
		finally { checkingStatus = false; }
	});

	const nigerianStates = [
		'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
		'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja','Gombe',
		'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
		'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
		'Taraba','Yobe','Zamfara'
	];

	let form = $state({
		fullName: '', email: '', mobileNumber: '', whatsappNumber: '',
		stateOfOrigin: '', lgaOfOrigin: '', stateOfResidence: '', lgaOfResidence: '',
		nin: '', academicBackground: '', workingExperience: '', skills: '',
		motivationalStatement: '', monthlyEarningsTarget: ''
	});
	let honeypot = $state('');
	let loading = $state(false);
	let success = $state(false);
	let error = $state('');
	let step = $state(1);
	const totalSteps = 3;

	const sanitize = (s: string) => s.replace(/<[^>]*>?/gm, '').trim();

	function nextStep() { if (step < totalSteps) step++; }
	function prevStep() { if (step > 1) step--; }

	async function handleSubmit() {
		if (loading || honeypot) return;
		loading = true; error = '';
		try {
			const clean = Object.fromEntries(
				Object.entries(form).map(([k, v]) => [k, typeof v === 'string' ? sanitize(v) : v])
			) as typeof form;

			await convex.mutation(api.functions.submitApplicationWorkflow, {
				...clean,
				sessionId: getSessionId()
			});
			success = true;
		} catch (e: any) {
			error = e.message ?? 'Submission failed. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Join the I-AM Network · E-WIN Project</title>
	<meta name="description" content="Apply to become an Impact Ambassador in the E-WIN Project. Unlock multiple income streams, AI upskilling, and Africa's biggest workforce network." />
</svelte:head>

<div class="min-h-screen bg-[var(--bg)] px-4 sm:px-6 py-16 sm:py-24">
	<div class="max-w-2xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12">
			<a href="/" class="font-['Bebas_Neue'] text-2xl tracking-widest text-[var(--text)] mb-6 block">
				<span class="text-[var(--gold)]">E</span>-WIN PROJECT
			</a>
			<div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-[var(--gold)] mb-4 flex items-center justify-center gap-3">
				<span class="w-8 h-[1px] bg-[var(--gold)]" aria-hidden="true"></span>
				I-AM Network Application
				<span class="w-8 h-[1px] bg-[var(--gold)]" aria-hidden="true"></span>
			</div>
			<h1 class="font-['Bebas_Neue'] text-[clamp(32px,7vw,64px)] tracking-[2px] leading-[0.95] text-[var(--text)]">
				Become an <span class="text-[var(--gold)]">Impact Ambassador.</span>
			</h1>
			<p class="text-[15px] text-[var(--muted2)] mt-4 leading-relaxed max-w-lg mx-auto">
				Join 10 million+ youth, graduates and skilled professionals building sustainable incomes across Africa. Earn ₦200,000+ monthly.
			</p>
		</div>

		{#if urlStatus === 'pending'}
			<div class="card p-8 text-center mb-8">
				<div class="text-4xl mb-4" aria-hidden="true">⏳</div>
				<h2 class="font-['Bebas_Neue'] text-2xl tracking-widest text-[var(--gold)] mb-2">Application Under Review</h2>
				<p class="text-[14px] text-[var(--muted2)] leading-relaxed">
					Your application is being reviewed by our team. You will be notified by email once a decision is made. Average review time is 3–5 business days.
				</p>
				<a href="/" class="mt-6 inline-flex items-center gap-2 text-[12px] font-['Space_Mono'] uppercase tracking-widest text-[var(--gold)] hover:text-[var(--gold2)] transition-colors">
					← Return to Home
				</a>
			</div>
		{/if}

		{#if checkingStatus}
			<div class="flex justify-center py-10">
				<div class="w-8 h-8 border-4 border-[var(--gold)]/30 border-t-[var(--gold)] rounded-full animate-spin" aria-label="Loading"></div>
			</div>
		{:else if success}
			<div class="card p-10 text-center">
				<div class="text-5xl mb-4" aria-hidden="true">✅</div>
				<h2 class="font-['Bebas_Neue'] text-3xl tracking-widest text-[var(--teal2)] mb-3">Application Submitted!</h2>
				<p class="text-[14px] text-[var(--muted2)] leading-relaxed mb-6">
					Thank you for applying to the I-AM Network. Our team will review your application and contact you within 3–5 business days.
				</p>
				<a href="/" class="px-8 py-3 bg-[var(--gold)] text-[var(--bg)] text-[11px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-[var(--gold2)] transition-all inline-flex items-center gap-2">
					<span aria-hidden="true">🏠</span> Back to Home
				</a>
			</div>
		{:else}
			<!-- Step indicator -->
			<div class="flex items-center justify-center gap-3 mb-8">
				{#each Array(totalSteps) as _, i}
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all {step === i+1 ? 'bg-[var(--gold)] text-[var(--bg)]' : step > i+1 ? 'bg-[var(--teal2)] text-white' : 'bg-[var(--surface3)] text-[var(--muted)]'}">
							{step > i + 1 ? '✓' : i + 1}
						</div>
						{#if i < totalSteps - 1}
							<div class="w-10 h-[1px] {step > i+1 ? 'bg-[var(--teal2)]' : 'bg-[var(--border)]'} transition-colors"></div>
						{/if}
					</div>
				{/each}
			</div>

			{#if !registrationOpen}
				<div class="card p-6 mb-6 border-[var(--gold-line)] bg-[var(--gold-dim)]">
					<div class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--gold)] mb-2 flex items-center gap-2">
						<span aria-hidden="true">🛡️</span> Applications are currently queued
					</div>
					<p class="text-[13px] text-[var(--muted2)]">We are processing the current batch. Your submission will be placed in priority queue for review when the next intake opens.</p>
				</div>
			{/if}

			{#if error}
				<div class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-[13px]" role="alert">{error}</div>
			{/if}

			<!-- Honeypot (hidden) -->
			<div class="hidden" aria-hidden="true">
				<input type="text" name="website" bind:value={honeypot} tabindex="-1" autocomplete="off" />
			</div>

			<form onsubmit={(e) => { e.preventDefault(); if (step < totalSteps) nextStep(); else handleSubmit(); }} class="card p-6 sm:p-8 space-y-5">
				<!-- Step 1: Personal Info -->
				{#if step === 1}
					<h2 class="font-['Bebas_Neue'] text-2xl tracking-widest text-[var(--text)] mb-2">Personal Information</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div class="space-y-2 sm:col-span-2">
							<label for="fullName" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">Full Name *</label>
							<input id="fullName" type="text" bind:value={form.fullName} required placeholder="e.g. Amaka Okonkwo" class="input-base" />
						</div>
						<div class="space-y-2">
							<label for="email" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">Email Address *</label>
							<input id="email" type="email" bind:value={form.email} required placeholder="you@email.com" class="input-base" />
						</div>
						<div class="space-y-2">
							<label for="mobile" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">Mobile Number *</label>
							<input id="mobile" type="tel" inputmode="tel" bind:value={form.mobileNumber} required placeholder="080..." class="input-base" />
						</div>
						<div class="space-y-2">
							<label for="whatsapp" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">WhatsApp Number *</label>
							<input id="whatsapp" type="tel" inputmode="tel" bind:value={form.whatsappNumber} required placeholder="+234..." class="input-base" />
						</div>
						<div class="space-y-2">
							<label for="nin" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">NIN *</label>
							<input id="nin" type="text" inputmode="numeric" bind:value={form.nin} required placeholder="11-digit NIN" maxlength="11" class="input-base" />
						</div>
					</div>
				{/if}

				<!-- Step 2: Location -->
				{#if step === 2}
					<h2 class="font-['Bebas_Neue'] text-2xl tracking-widest text-[var(--text)] mb-2">Location Details</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div class="space-y-2">
							<label for="stateOrigin" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">State of Origin *</label>
							<div class="relative">
								<select id="stateOrigin" bind:value={form.stateOfOrigin} required class="input-base pr-8">
									<option value="">Select state</option>
									{#each nigerianStates as s}<option value={s}>{s}</option>{/each}
								</select>
								<div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)] text-xs" aria-hidden="true">▼</div>
							</div>
						</div>
						<div class="space-y-2">
							<label for="lgaOrigin" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">LGA of Origin *</label>
							<input id="lgaOrigin" type="text" bind:value={form.lgaOfOrigin} required placeholder="e.g. Ikeja" class="input-base" />
						</div>
						<div class="space-y-2">
							<label for="stateRes" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">State of Residence *</label>
							<div class="relative">
								<select id="stateRes" bind:value={form.stateOfResidence} required class="input-base pr-8">
									<option value="">Select state</option>
									{#each nigerianStates as s}<option value={s}>{s}</option>{/each}
								</select>
								<div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)] text-xs" aria-hidden="true">▼</div>
							</div>
						</div>
						<div class="space-y-2">
							<label for="lgaRes" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">LGA of Residence *</label>
							<input id="lgaRes" type="text" bind:value={form.lgaOfResidence} required placeholder="e.g. Gwagwalada" class="input-base" />
						</div>
					</div>
				{/if}

				<!-- Step 3: Background & Motivation -->
				{#if step === 3}
					<h2 class="font-['Bebas_Neue'] text-2xl tracking-widest text-[var(--text)] mb-2">Background & Goals</h2>
					<div class="space-y-5">
						<div class="space-y-2">
							<label for="academic" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">Educational Background *</label>
							<input id="academic" type="text" bind:value={form.academicBackground} required placeholder="e.g. B.Sc Computer Science, UNILAG" class="input-base" />
						</div>
						<div class="space-y-2">
							<label for="experience" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">Work Experience *</label>
							<textarea id="experience" bind:value={form.workingExperience} required rows="3" placeholder="Describe your relevant work experience..." class="input-base resize-none h-24"></textarea>
						</div>
						<div class="space-y-2">
							<label for="skills" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">Skills & Abilities *</label>
							<input id="skills" type="text" bind:value={form.skills} required placeholder="e.g. Social media, writing, data entry, coding..." class="input-base" />
						</div>
						<div class="space-y-2">
							<label for="target" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">Monthly Earnings Target *</label>
							<input id="target" type="text" bind:value={form.monthlyEarningsTarget} required placeholder="e.g. ₦200,000" class="input-base" />
						</div>
						<div class="space-y-2">
							<label for="statement" class="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold block">Why do you want to join? *</label>
							<textarea id="statement" bind:value={form.motivationalStatement} required rows="4" placeholder="Tell us why you want to be an Impact Ambassador and what you will contribute..." class="input-base resize-none h-32"></textarea>
						</div>
					</div>
				{/if}

				<!-- Navigation buttons -->
				<div class="flex gap-4 pt-2">
					{#if step > 1}
						<button type="button" onclick={prevStep} class="flex-1 py-3.5 border border-[var(--border2)] text-[var(--muted2)] text-[11px] font-bold tracking-[2px] uppercase rounded-xl hover:border-[var(--gold-line)] hover:text-[var(--gold)] transition-all min-h-[48px]">
							← Back
						</button>
					{/if}
					<button type="submit" disabled={loading} class="flex-1 py-3.5 bg-[var(--gold)] text-[var(--bg)] text-[11px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-[var(--gold2)] transition-all disabled:opacity-50 min-h-[48px] flex items-center justify-center gap-2 shadow-[var(--shadow-gold)]">
						{#if loading}
							<span class="w-4 h-4 border-2 border-[var(--bg)]/30 border-t-[var(--bg)] rounded-full animate-spin" aria-hidden="true"></span>
							Submitting...
						{:else if step < totalSteps}
							Continue →
						{:else}
							<span aria-hidden="true">🚀</span> Submit Application
						{/if}
					</button>
				</div>
			</form>
		{/if}
	</div>
</div>
