<script lang="ts">
	import { convex, getSessionId } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';

	let formData = $state({
		fullName: '',
		email: '',
		whatsappNumber: '',
		mobileNumber: '',
		address: '',
		stateOfResidence: '',
		lgaOfResidence: '',
		company: '',
		serviceType: 'App Development 📱',
		description: '',
		budget: '',
		bestTimeToReach: 'Morning (8AM - 12PM)',
		urgency: 'Immediately ⚡',
		preferredCommunication: 'WhatsApp 📱',
		needType: 'Personal Need 👤'
	});

	let loading = $state(false);
	let success = $state(false);
	let error = $state('');
	let isMaintenance = $state(false);

	import { onMount } from 'svelte';
	onMount(async () => {
		const mm = await convex.query(api.functions.getSetting, { key: 'maintenance_mode' });
		isMaintenance = mm;
	});

	const services = [
		'App Development 📱',
		'AI Consultancy 🤖',
		'Business Advisory 💼',
		'Academic Writing 🎓',
		'Corporate Writing ✍️',
		'Branding & Design 🎨',
		'Other'
	];

	const timeSlots = ['Morning (8AM - 12PM)', 'Afternoon (12PM - 4PM)', 'Evening (4PM - 8PM)', 'Anytime 🕒'];
	const urgencyLevels = ['Immediately ⚡', 'In 1 Day 🗓️', 'In 3 Days ⏳', 'In 1 Week 📅', 'In 1 Month 🌙'];
	const commMediums = ['WhatsApp 📱', 'Email 📧', 'Phone Call 📞', 'Text Message 💬'];
	const needTypes = ['Personal Need 👤', 'Business Need 💼', 'Official Need 🏛️'];

	async function handleSubmit() {
		if (loading) return;
		loading = true;
		error = '';
		try {
			await convex.mutation(api.functions.submitServiceRequest, formData);
			success = true;
			// Reset form data except for status flags
			formData = {
				fullName: '',
				email: '',
				whatsappNumber: '',
				mobileNumber: '',
				address: '',
				stateOfResidence: '',
				lgaOfResidence: '',
				company: '',
				serviceType: 'App Development 📱',
				description: '',
				budget: '',
				bestTimeToReach: 'Morning (8AM - 12PM)',
				urgency: 'Immediately ⚡',
				preferredCommunication: 'WhatsApp 📱',
				needType: 'Personal Need 👤'
			};
			setTimeout(() => {
				success = false;
			}, 5000);
		} catch (e: any) {
			error = e.message || 'Something went wrong. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="w-full max-w-[600px] mx-auto relative overflow-hidden">
	{#if isMaintenance}
		<div class="p-4 bg-gold/10 border border-gold/30 rounded-xl text-gold text-sm md:text-[11px] mb-6 flex items-center gap-3">
			<span>🛡️</span> Notice: System is in high-priority review mode. New requests will be queued for administrative review.
		</div>
	{/if}

	{#if success}
		<div class="p-6 bg-teal2/10 border border-teal2/30 rounded-xl text-teal2 text-center mb-6 animate-in fade-in slide-in-from-top-4">
			<div class="text-3xl mb-2">✅</div>
			<div class="font-bold uppercase tracking-widest text-sm md:text-[12px]">Request Submitted Successfully!</div>
			<p class="text-sm md:text-[11px] mt-1 opacity-80">I will review your request and get back to you shortly.</p>
		</div>
	{/if}

	{#if error}
		<div class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm md:text-[11px] mb-6">
			{error}
		</div>
	{/if}

	<form 
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}} 
		class="space-y-5"
	>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
			<div class="space-y-2">
				<label for="fullName" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Full Name *</label>
				<input type="text" id="fullName" bind:value={formData.fullName} required placeholder="John Doe" class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors" />
			</div>
			<div class="space-y-2">
				<label for="email" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Email Address *</label>
				<input type="email" id="email" bind:value={formData.email} required placeholder="john@example.com" class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors" />
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
			<div class="space-y-2">
				<label for="whatsappNumber" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">WhatsApp Number *</label>
				<input type="tel" id="whatsappNumber" inputmode="tel" bind:value={formData.whatsappNumber} required placeholder="+234..." class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors" />
			</div>
			<div class="space-y-2">
				<label for="mobileNumber" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Mobile Number *</label>
				<input type="tel" id="mobileNumber" inputmode="tel" bind:value={formData.mobileNumber} required placeholder="080..." class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors" />
			</div>
		</div>

		<div class="space-y-2">
			<label for="address" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Home/Office Address *</label>
			<input type="text" id="address" bind:value={formData.address} required placeholder="No. 123 Street Name..." class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors" />
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
			<div class="space-y-2">
				<label for="stateOfResidence" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">State of Residence *</label>
				<input type="text" id="stateOfResidence" bind:value={formData.stateOfResidence} required placeholder="e.g. Lagos" class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors" />
			</div>
			<div class="space-y-2">
				<label for="lgaOfResidence" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">LGA *</label>
				<input type="text" id="lgaOfResidence" bind:value={formData.lgaOfResidence} required placeholder="e.g. Ikeja" class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors" />
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
			<div class="space-y-2">
				<label for="company" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Company (Optional)</label>
				<input type="text" id="company" bind:value={formData.company} placeholder="Acme Corp" class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors" />
			</div>
			<div class="space-y-2">
				<label for="serviceType" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Service Category *</label>
				<div class="relative">
					<select id="serviceType" bind:value={formData.serviceType} required class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors appearance-none">
						{#each services as service}
							<option value={service}>{service}</option>
						{/each}
					</select>
					<div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">▼</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
			<div class="space-y-2">
				<label for="urgency" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">When is this required? *</label>
				<div class="relative">
					<select id="urgency" bind:value={formData.urgency} required class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors appearance-none">
						{#each urgencyLevels as level}
							<option value={level}>{level}</option>
						{/each}
					</select>
					<div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">▼</div>
				</div>
			</div>
			<div class="space-y-2">
				<label for="needType" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Type of Need *</label>
				<div class="relative">
					<select id="needType" bind:value={formData.needType} required class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors appearance-none">
						{#each needTypes as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
					<div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">▼</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
			<div class="space-y-2">
				<label for="bestTime" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Best Time to Reach You *</label>
				<div class="relative">
					<select id="bestTime" bind:value={formData.bestTimeToReach} required class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors appearance-none">
						{#each timeSlots as slot}
							<option value={slot}>{slot}</option>
						{/each}
					</select>
					<div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">▼</div>
				</div>
			</div>
			<div class="space-y-2">
				<label for="preferredComm" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Preferred Medium *</label>
				<div class="relative">
					<select id="preferredComm" bind:value={formData.preferredCommunication} required class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors appearance-none">
						{#each commMediums as medium}
							<option value={medium}>{medium}</option>
						{/each}
					</select>
					<div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">▼</div>
				</div>
			</div>
		</div>

		<div class="space-y-2">
			<label for="budget" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Budget Estimate *</label>
			<input type="text" id="budget" bind:value={formData.budget} required placeholder="e.g. ₦500k - ₦1M" class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors" />
		</div>

		<div class="space-y-2">
			<label for="description" class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Project Description *</label>
			<textarea
				id="description"
				bind:value={formData.description}
				required
				rows="4"
				placeholder="Tell me about your project, goals, and requirements..."
				class="w-full bg-bg border border-border rounded-lg px-4 py-4 min-h-[44px] text-sm md:text-[14px] focus:border-gold outline-none transition-colors resize-none"
			></textarea>
		</div>

		<button
			type="submit"
			disabled={loading}
			class="w-full py-4 min-h-[44px] bg-gold text-bg text-sm md:text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
		>
			{#if loading}
				<span class="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin"></span>
				Processing...
			{:else}
				Submit Request 🚀
			{/if}
		</button>
	</form>
</div>
