<script lang="ts">
	import { convex, getSessionId } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';

	let formData = $state({
		fullName: '',
		email: '',
		company: '',
		serviceType: 'App Development 📱',
		description: '',
		budget: '',
		sessionId: getSessionId()
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

	async function handleSubmit() {
		loading = true;
		error = '';
		try {
			await convex.mutation(api.functions.submitServiceRequestWorkflow, formData);
			success = true;
			formData = {
				fullName: '',
				email: '',
				company: '',
				serviceType: 'App Development 📱',
				description: '',
				budget: '',
				sessionId: getSessionId()
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
		<div class="p-4 bg-gold/10 border border-gold/30 rounded-xl text-gold text-[11px] mb-6 flex items-center gap-3">
			<span>🛡️</span> Notice: System is in high-priority review mode. New requests will be queued for administrative review.
		</div>
	{/if}

	{#if success}
		<div class="p-6 bg-teal2/10 border border-teal2/30 rounded-xl text-teal2 text-center mb-6 animate-in fade-in slide-in-from-top-4">
			<div class="text-3xl mb-2">✅</div>
			<div class="font-bold uppercase tracking-widest text-[12px]">Request Submitted Successfully!</div>
			<p class="text-[11px] mt-1 opacity-80">I will review your request and get back to you shortly.</p>
		</div>
	{/if}

	{#if error}
		<div class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-[11px] mb-6">
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
				<label for="fullName" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Full Name *</label>
				<input
					type="text"
					id="fullName"
					bind:value={formData.fullName}
					required
					placeholder="John Doe"
					class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"
				/>
			</div>
			<div class="space-y-2">
				<label for="email" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Email Address *</label>
				<input
					type="email"
					id="email"
					bind:value={formData.email}
					required
					placeholder="john@example.com"
					class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"
				/>
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
			<div class="space-y-2">
				<label for="company" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Company (Optional)</label>
				<input
					type="text"
					id="company"
					bind:value={formData.company}
					placeholder="Acme Corp"
					class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"
				/>
			</div>
			<div class="space-y-2">
				<label for="serviceType" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Service Type *</label>
				<select
					id="serviceType"
					bind:value={formData.serviceType}
					required
					class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors appearance-none"
				>
					{#each services as service}
						<option value={service}>{service}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="space-y-2">
			<label for="budget" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Budget Range (Optional)</label>
			<input
				type="text"
				id="budget"
				bind:value={formData.budget}
				placeholder="e.g. ₦500k - ₦1M"
				class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"
			/>
		</div>

		<div class="space-y-2">
			<label for="description" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Project Description *</label>
			<textarea
				id="description"
				bind:value={formData.description}
				required
				rows="4"
				placeholder="Tell me about your project, goals, and requirements..."
				class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors resize-none"
			></textarea>
		</div>

		<button
			type="submit"
			disabled={loading}
			class="w-full py-4 bg-gold text-bg text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
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
