<script lang="ts">
	import { convex, getClientSessionContext } from '$lib/convex';
	import { api } from '$convex/_generated/api';
	import { ui } from '$lib/stores/ui';
	import Tooltip from '$lib/components/ui/Tooltip.svelte';

	// ── Form state ───────────────────────────────────────────────────
	let step = $state(1);
	const TOTAL_STEPS = 3;

	let formData = $state({
		// Step 1 — Personal Details
		fullName: '',
		email: '',
		mobileNumber: '',
		whatsappNumber: '',
		stateOfOrigin: '',
		lgaOfOrigin: '',
		stateOfResidence: '',
		lgaOfResidence: '',
		nin: '',
		// Step 2 — Background
		academicBackground: '',
		workingExperience: '',
		skills: '',
		// Step 3 — Vision
		motivationalStatement: '',
		monthlyEarningsTarget: ''
	});

	let loading = $state(false);
	let submitted = $state(false);
	let error = $state('');
	let honeypot = $state('');

	// ── Nigerian States ──────────────────────────────────────────────
	const nigerianStates = [
		'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
		'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT (Abuja)','Gombe',
		'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
		'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
		'Taraba','Yobe','Zamfara'
	];

	const academicOptions = [
		'No Formal Education',
		'Primary School Certificate',
		'Junior Secondary (JSS)',
		'Senior Secondary (SSCE / WAEC)',
		'National Diploma (ND)',
		'Higher National Diploma (HND)',
		'Bachelor\'s Degree (B.Sc / B.A / B.Eng)',
		'Post Graduate Diploma (PGD)',
		'Master\'s Degree (M.Sc / MBA)',
		'Doctorate (PhD)',
		'Professional Certification(s)'
	];

	const earningsTargets = [
		'₦50,000 – ₦100,000 / month',
		'₦100,000 – ₦200,000 / month',
		'₦200,000 – ₦500,000 / month',
		'₦500,000 – ₦1,000,000 / month',
		'₦1,000,000+ / month'
	];

	// ── Validation ───────────────────────────────────────────────────
	function validateStep(n: number): string | null {
		if (n === 1) {
			if (formData.fullName.trim().length < 3)        return 'Full name must be at least 3 characters.';
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address.';
			if (formData.mobileNumber.trim().length < 10)   return 'Mobile number must be at least 10 digits.';
			if (formData.whatsappNumber.trim().length < 10) return 'WhatsApp number must be at least 10 digits.';
			if (!formData.stateOfOrigin)                     return 'Please select your state of origin.';
			if (formData.lgaOfOrigin.trim().length < 2)     return 'Please enter your LGA of origin.';
			if (!formData.stateOfResidence)                  return 'Please select your state of residence.';
			if (formData.lgaOfResidence.trim().length < 2)  return 'Please enter your LGA of residence.';
			if (formData.nin.replace(/\D/g, '').length < 11) return 'NIN must be exactly 11 digits.';
		}
		if (n === 2) {
			if (!formData.academicBackground)              return 'Please select your educational background.';
			if (formData.workingExperience.trim().length < 20) return 'Please describe your work experience (min 20 characters).';
			if (formData.skills.trim().length < 10)        return 'Please list your key skills (min 10 characters).';
		}
		if (n === 3) {
			if (formData.motivationalStatement.trim().length < 50) return 'Motivational statement must be at least 50 characters.';
			if (!formData.monthlyEarningsTarget)           return 'Please select your monthly earnings target.';
		}
		return null;
	}

	function nextStep() {
		const err = validateStep(step);
		if (err) { error = err; return; }
		error = '';
		step = Math.min(step + 1, TOTAL_STEPS);
	}

	function prevStep() {
		error = '';
		step = Math.max(step - 1, 1);
	}

	import { currentUser } from '$lib/stores/auth';

	// ── Sanitize ─────────────────────────────────────────────────────
	const sanitize = (str: string) => str.replace(/<[^>]*>?/gm, '').trim();

	// ── Submit ───────────────────────────────────────────────────────
	async function handleSubmit() {
		if (loading || honeypot) return;
		const err = validateStep(3);
		if (err) { error = err; return; }

		loading = true;
		error = '';
		try {
			const clean = Object.fromEntries(
				Object.entries(formData).map(([k, v]) => [k, typeof v === 'string' ? sanitize(v) : v])
			);
			await convex.mutation(api.functions.submitApplicationWorkflow, {
				...clean as any,
				...getClientSessionContext()
			});
			submitted = true;
			ui.success('Your application was submitted! We\'ll contact you within 3–5 business days.');
		} catch (e: any) {
			error = e.message || 'Submission failed. Please try again.';
			ui.error(error);
		} finally {
			loading = false;
		}
	}

	const stepLabels = ['Personal Details', 'Background', 'Vision & Goals'];
	const progress = $derived(((step - 1) / (TOTAL_STEPS - 1)) * 100);

	const inputClass = 'w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 min-h-[48px] text-[14px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 outline-none transition-all';
	const labelClass = 'block text-[11px] font-bold font-["Space_Mono"] uppercase tracking-[2px] text-[var(--muted)] mb-2';
	const selectClass = 'w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 min-h-[48px] text-[14px] text-[var(--text)] focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 outline-none transition-all appearance-none';
</script>

<section id="iam-application" class="bg-[var(--surface)] px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
	<div class="max-w-[760px] mx-auto">

		{#if submitted}
			<!-- ── Success State ─────────────────────────────────── -->
			<div class="text-center py-16 px-6 bg-[var(--bg)] border border-[var(--border)] rounded-3xl">
				<div class="text-6xl mb-6">✅</div>
				<h2 class="font-['Bebas_Neue'] text-[clamp(32px,5vw,64px)] text-[var(--gold)] tracking-[2px] mb-4">
					Application Received!
				</h2>
				<p class="text-[15px] text-[var(--muted2)] leading-relaxed max-w-[480px] mx-auto mb-8">
					Thank you for applying to the <strong class="text-[var(--text)]">I-AM Network</strong>.
					Your application is under review. Check your email for a confirmation.
					<br /><br />
					<strong class="text-[var(--gold)]">Expected review: 3–5 business days.</strong>
				</p>
				<a href="/" class="inline-flex items-center gap-2 px-8 py-3 bg-[var(--gold)] text-[var(--bg)] text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-[var(--gold2)] transition-all min-h-[44px]">
					Return Home
				</a>
			</div>

		{:else}
			<!-- ── Header ────────────────────────────────────────── -->
			<div class="mb-10 text-center">
				<div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-[var(--gold)] mb-4 flex items-center justify-center gap-2">
					I-AM Network — Application Form
					<Tooltip text="The Impact Ambassador Model (I-AM) is a strategic initiative to empower 10 million Nigerian youths through technology." position="right" />
				</div>
				<h2 class="font-['Bebas_Neue'] text-[clamp(32px,6vw,72px)] tracking-[2px] text-[var(--text)] leading-[0.9] mb-4">
					Join the <span class="text-[var(--gold)]">Elite Network</span>
				</h2>
				<p class="text-[14px] text-[var(--muted2)] max-w-[540px] mx-auto leading-relaxed">
					Complete all 3 steps to submit your I-AM Network application. Fields marked * are required.
				</p>
			</div>

			<!-- ── Step Progress Bar ─────────────────────────────── -->
			<div class="mb-10">
				<div class="flex items-center justify-between mb-3">
					{#each stepLabels as label, i}
						<button
							type="button"
							onclick={() => { if (i + 1 < step) step = i + 1; }}
							class="flex flex-col items-center gap-1 cursor-pointer group"
							aria-current={step === i + 1 ? 'step' : undefined}
						>
							<div class="w-9 h-9 rounded-full border-2 flex items-center justify-center text-[12px] font-bold transition-all
								{step > i + 1 ? 'bg-[var(--gold)] border-[var(--gold)] text-[var(--bg)]' : 
								 step === i + 1 ? 'border-[var(--gold)] text-[var(--gold)] bg-[var(--bg)]' : 
								 'border-[var(--border)] text-[var(--muted)] bg-[var(--bg)]'}">
								{step > i + 1 ? '✓' : i + 1}
							</div>
							<span class="text-[10px] font-['Space_Mono'] uppercase tracking-widest hidden sm:block
								{step === i + 1 ? 'text-[var(--gold)]' : 'text-[var(--muted)]'}">
								{label}
							</span>
						</button>
						{#if i < stepLabels.length - 1}
							<div class="flex-1 h-[2px] mx-2 bg-[var(--border)] relative">
								<div class="h-full bg-[var(--gold)] transition-all duration-500"
									style="width: {step > i + 1 ? '100%' : '0%'}">
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>

			<!-- ── Error Banner ──────────────────────────────────── -->
			{#if error}
				<div class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-[13px] mb-6 flex items-center gap-3" role="alert">
					<span class="text-xl shrink-0">⚠️</span>
					{error}
				</div>
			{/if}

			<!-- ── Honeypot ──────────────────────────────────────── -->
			<div class="hidden" aria-hidden="true">
				<input
					type="text"
					name="website_url"
					aria-label="Leave this field empty"
					bind:value={honeypot}
					tabindex="-1"
					autocomplete="off"
				/>
			</div>

			<!-- ═══════════════════════════════════════════════════ -->
			<!-- STEP 1: Personal Details                            -->
			<!-- ═══════════════════════════════════════════════════ -->
			{#if step === 1}
				<div class="bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6">
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label for="fullName" class={labelClass}>Full Name *</label>
							<input id="fullName" type="text" bind:value={formData.fullName} required
								placeholder="e.g. Emeka Johnson" class={inputClass} />
						</div>
						<div>
							<label for="email" class={labelClass}>Email Address *</label>
							<input id="email" type="email" bind:value={formData.email} required
								placeholder="emeka@example.com" class={inputClass} />
						</div>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label for="mobileNumber" class={labelClass}>Mobile Number *</label>
							<input id="mobileNumber" type="tel" inputmode="tel" bind:value={formData.mobileNumber} required
								placeholder="080XXXXXXXX" class={inputClass} />
						</div>
						<div>
							<label for="whatsappNumber" class={labelClass}>WhatsApp Number *</label>
							<input id="whatsappNumber" type="tel" inputmode="tel" bind:value={formData.whatsappNumber} required
								placeholder="+234XXXXXXXXXX" class={inputClass} />
						</div>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label for="stateOfOrigin" class={labelClass}>State of Origin *</label>
							<div class="relative">
								<select id="stateOfOrigin" bind:value={formData.stateOfOrigin} required class={selectClass}>
									<option value="">Select state...</option>
									{#each nigerianStates as state}
										<option value={state}>{state}</option>
									{/each}
								</select>
								<span class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]">▼</span>
							</div>
						</div>
						<div>
							<label for="lgaOfOrigin" class={labelClass}>LGA of Origin *</label>
							<input id="lgaOfOrigin" type="text" bind:value={formData.lgaOfOrigin} required
								placeholder="e.g. Onitsha" class={inputClass} />
						</div>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div>
							<label for="stateOfResidence" class={labelClass}>State of Residence *</label>
							<div class="relative">
								<select id="stateOfResidence" bind:value={formData.stateOfResidence} required class={selectClass}>
									<option value="">Select state...</option>
									{#each nigerianStates as state}
										<option value={state}>{state}</option>
									{/each}
								</select>
								<span class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]">▼</span>
							</div>
						</div>
						<div>
							<label for="lgaOfResidence" class={labelClass}>LGA of Residence *</label>
							<input id="lgaOfResidence" type="text" bind:value={formData.lgaOfResidence} required
								placeholder="e.g. Ikeja" class={inputClass} />
						</div>
					</div>

					<div>
						<label for="nin" class={labelClass}>National Identification Number (NIN) *</label>
						<input id="nin" type="text" inputmode="numeric" bind:value={formData.nin} required
							placeholder="12345678901 (11 digits)" maxlength="11" class={inputClass} />
						<p class="text-[11px] text-[var(--muted)] mt-1">Your NIN is secured and used only for identity verification.</p>
					</div>
				</div>

			<!-- ═══════════════════════════════════════════════════ -->
			<!-- STEP 2: Background                                  -->
			<!-- ═══════════════════════════════════════════════════ -->
			{:else if step === 2}
				<div class="bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6">
					<div>
						<label for="academicBackground" class={labelClass}>Highest Education Level *</label>
						<div class="relative">
							<select id="academicBackground" bind:value={formData.academicBackground} required class={selectClass}>
								<option value="">Select qualification...</option>
								{#each academicOptions as opt}
									<option value={opt}>{opt}</option>
								{/each}
							</select>
							<span class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]">▼</span>
						</div>
					</div>

					<div>
						<label for="workingExperience" class={labelClass}>Work Experience *</label>
						<textarea id="workingExperience" bind:value={formData.workingExperience} required
							rows="4" placeholder="Describe your work experience, previous roles, and achievements..."
							class="{inputClass} resize-none">
						</textarea>
						<p class="text-[11px] text-[var(--muted)] mt-1">{formData.workingExperience.length} / 500 characters</p>
					</div>

					<div>
						<label for="skills" class={labelClass}>Key Skills & Competencies *</label>
						<textarea id="skills" bind:value={formData.skills} required
							rows="3" placeholder="e.g. Digital Marketing, Python, Copywriting, Sales, Graphic Design..."
							class="{inputClass} resize-none">
						</textarea>
						<p class="text-[11px] text-[var(--muted)] mt-1">List all relevant skills, separated by commas.</p>
					</div>
				</div>

			<!-- ═══════════════════════════════════════════════════ -->
			<!-- STEP 3: Vision & Goals                              -->
			<!-- ═══════════════════════════════════════════════════ -->
			{:else if step === 3}
				<div class="bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6">
					<div>
						<label for="motivationalStatement" class={labelClass}>Motivational Statement *</label>
						<textarea id="motivationalStatement" bind:value={formData.motivationalStatement} required
							rows="6"
							placeholder="Why do you want to join the I-AM Network? What is your vision for your financial and professional growth? How do you plan to contribute to the E-WIN ecosystem? (Minimum 50 characters)"
							class="{inputClass} resize-none">
						</textarea>
						<div class="flex justify-between mt-1">
							<p class="text-[11px] text-[var(--muted)]">Be authentic — tell us your story.</p>
							<p class="text-[11px] {formData.motivationalStatement.length >= 50 ? 'text-[var(--gold)]' : 'text-[var(--muted)]'}">
								{formData.motivationalStatement.length} chars
							</p>
						</div>
					</div>

					<div>
						<label for="earningsTarget" class={labelClass}>Monthly Earnings Target *</label>
						<div class="grid grid-cols-1 gap-3">
							{#each earningsTargets as target}
								<label class="flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
									{formData.monthlyEarningsTarget === target 
										? 'border-[var(--gold)] bg-[var(--gold)]/10' 
										: 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)]/50'}">
									<input type="radio" name="earningsTarget" value={target}
										bind:group={formData.monthlyEarningsTarget}
										class="w-4 h-4 accent-[var(--gold)]" />
									<span class="text-[13px] font-medium text-[var(--text)]">{target}</span>
								</label>
							{/each}
						</div>
					</div>

					<!-- Preview summary before submit -->
					<div class="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl space-y-2">
						<div class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-[var(--gold)] mb-3">Application Summary</div>
						<div class="grid grid-cols-2 gap-x-6 gap-y-1 text-[12px]">
							<span class="text-[var(--muted)]">Name:</span>
							<span class="text-[var(--text)] font-medium">{formData.fullName || '—'}</span>
							<span class="text-[var(--muted)]">Email:</span>
							<span class="text-[var(--text)] font-medium">{formData.email || '—'}</span>
							<span class="text-[var(--muted)]">State:</span>
							<span class="text-[var(--text)] font-medium">{formData.stateOfResidence || '—'}</span>
							<span class="text-[var(--muted)]">Education:</span>
							<span class="text-[var(--text)] font-medium">{formData.academicBackground || '—'}</span>
						</div>
					</div>
				</div>
			{/if}

			<!-- ── Navigation Buttons ─────────────────────────────── -->
			<div class="flex items-center justify-between mt-8 gap-4">
				{#if step > 1}
					<button type="button" onclick={prevStep}
						class="px-8 py-3 min-h-[48px] border border-[var(--border)] text-[var(--text)] text-[12px] font-bold tracking-[2px] uppercase rounded-xl hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all active:scale-95">
						← Back
					</button>
				{:else}
					<div></div>
				{/if}

				{#if step < TOTAL_STEPS}
					<button type="button" onclick={nextStep}
						class="flex-1 sm:flex-none px-10 py-3 min-h-[48px] bg-[var(--gold)] text-[var(--bg)] text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-[var(--gold2)] transition-all active:scale-95 shadow-[0_4px_20px_rgba(160,120,32,0.3)]">
						Next Step →
					</button>
				{:else}
					<button type="button" onclick={handleSubmit} disabled={loading}
						class="flex-1 sm:flex-none px-10 py-3 min-h-[48px] bg-[var(--gold)] text-[var(--bg)] text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-[var(--gold2)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-[0_4px_20px_rgba(160,120,32,0.3)] flex items-center justify-center gap-3">
						{#if loading}
							<span class="w-4 h-4 border-2 border-[var(--bg)]/30 border-t-[var(--bg)] rounded-full animate-spin"></span>
							Submitting...
						{:else}
							Submit Application 🚀
						{/if}
					</button>
				{/if}
			</div>
		{/if}

	</div>
</section>
