<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../../convex/_generated/api';
	import { ui } from '$lib/stores/ui';

	// ── Settings state ────────────────────────────────────────────────
	let registrationOpen = $state(true);
	let maintenanceMode  = $state(false);
	let maxApplications  = $state(10000);
	let notifyEmail      = $state('danjumaumar.ogale@gmail.com');
	let saving = $state(false);
	let loading = $state(true);

	onMount(async () => {
		try {
			const [reg, maint, maxApp, email] = await Promise.all([
				convex.query(api.functions.getSetting, { key: 'registration_open' }),
				convex.query(api.functions.getSetting, { key: 'maintenance_mode' }),
				convex.query(api.functions.getSetting, { key: 'max_applications' }),
				convex.query(api.functions.getSetting, { key: 'notify_email' }),
			]);
			registrationOpen = reg   ?? true;
			maintenanceMode  = maint ?? false;
			maxApplications  = maxApp ?? 10000;
			notifyEmail      = email  ?? 'danjumaumar.ogale@gmail.com';
		} catch (e) {
			console.error('Settings load error:', e);
		} finally {
			loading = false;
		}
	});

	async function saveSettings() {
		saving = true;
		try {
			await Promise.all([
				convex.mutation(api.functions.updateSetting, { key: 'registration_open', value: registrationOpen }),
				convex.mutation(api.functions.updateSetting, { key: 'maintenance_mode',  value: maintenanceMode }),
				convex.mutation(api.functions.updateSetting, { key: 'max_applications',  value: maxApplications }),
				convex.mutation(api.functions.updateSetting, { key: 'notify_email',       value: notifyEmail }),
			]);
			ui.success('Settings saved successfully.');
		} catch (e: any) {
			ui.error(e.message ?? 'Failed to save settings.');
		} finally {
			saving = false;
		}
	}

	const inputClass = 'w-full bg-[#0b0a07] border border-[#c9a84c]/15 rounded-xl px-4 py-3 text-[13px] text-white placeholder:text-white/30 focus:border-[#c9a84c]/50 outline-none transition-colors min-h-[48px]';
	const labelClass = 'block text-[10px] font-["Space_Mono"] uppercase tracking-widest text-white/40 mb-2';
</script>

<svelte:head><title>Settings — Admin | E-WIN</title></svelte:head>

<div class="space-y-6 max-w-[720px] mx-auto">
	<div>
		<h1 class="font-['Bebas_Neue'] text-3xl tracking-widest text-white">Platform Settings</h1>
		<p class="text-[11px] text-white/40 font-['Space_Mono'] mt-0.5">
			Configure platform behaviour — changes take effect immediately
		</p>
	</div>

	{#if loading}
		<div class="flex items-center gap-3 text-white/30 text-[12px] py-10">
			<span class="w-5 h-5 border-2 border-white/10 border-t-white/40 rounded-full animate-spin"></span>
			Loading settings...
		</div>
	{:else}
		<!-- Applications section -->
		<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl p-6 space-y-5">
			<h2 class="font-['Bebas_Neue'] text-xl tracking-widest text-[#c9a84c] border-b border-[#c9a84c]/10 pb-3">
				Applications
			</h2>

			<!-- Registration toggle -->
			<div class="flex items-center justify-between gap-4">
				<div>
					<p class="text-[14px] text-white font-medium">Accept Applications</p>
					<p class="text-[12px] text-white/40 mt-0.5">
						When off, the I-AM application form shows a "queue" message instead of the form.
					</p>
				</div>
				<button
					type="button"
					role="switch"
					aria-checked={registrationOpen}
					onclick={() => registrationOpen = !registrationOpen}
					class="relative shrink-0 w-12 h-6 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#c9a84c] outline-none
						{registrationOpen ? 'bg-[#c9a84c]' : 'bg-white/10'}"
				>
					<span class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300
						{registrationOpen ? 'translate-x-6' : 'translate-x-0'}">
					</span>
					<span class="sr-only">{registrationOpen ? 'Applications open' : 'Applications closed'}</span>
				</button>
			</div>

			<!-- Max applications -->
			<div>
				<label for="maxApps" class={labelClass}>Maximum Applications Intake</label>
				<input id="maxApps" type="number" min="100" max="100000" step="100"
					bind:value={maxApplications} class={inputClass} />
				<p class="text-[11px] text-white/30 mt-1.5 font-['Space_Mono']">
					Applications will automatically close when this limit is reached.
				</p>
			</div>
		</div>

		<!-- Platform section -->
		<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl p-6 space-y-5">
			<h2 class="font-['Bebas_Neue'] text-xl tracking-widest text-[#c9a84c] border-b border-[#c9a84c]/10 pb-3">
				Platform
			</h2>

			<!-- Maintenance mode -->
			<div class="flex items-center justify-between gap-4">
				<div>
					<p class="text-[14px] text-white font-medium">Maintenance Mode</p>
					<p class="text-[12px] text-white/40 mt-0.5">
						Shows a maintenance notice to all visitors. Admin portal remains accessible.
					</p>
				</div>
				<button
					type="button"
					role="switch"
					aria-checked={maintenanceMode}
					onclick={() => maintenanceMode = !maintenanceMode}
					class="relative shrink-0 w-12 h-6 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-red-400 outline-none
						{maintenanceMode ? 'bg-red-500' : 'bg-white/10'}"
				>
					<span class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300
						{maintenanceMode ? 'translate-x-6' : 'translate-x-0'}">
					</span>
					<span class="sr-only">{maintenanceMode ? 'Maintenance on' : 'Maintenance off'}</span>
				</button>
			</div>

			{#if maintenanceMode}
				<div class="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
					<span class="text-xl shrink-0">⚠️</span>
					<p class="text-[13px] text-red-300 leading-relaxed">
						<strong>Maintenance mode is ON.</strong> All public-facing pages are showing a maintenance notice.
						Remember to turn this off when updates are complete.
					</p>
				</div>
			{/if}
		</div>

		<!-- Notifications section -->
		<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl p-6 space-y-5">
			<h2 class="font-['Bebas_Neue'] text-xl tracking-widest text-[#c9a84c] border-b border-[#c9a84c]/10 pb-3">
				Notifications
			</h2>
			<div>
				<label for="notifyEmail" class={labelClass}>Admin Notification Email</label>
				<input id="notifyEmail" type="email" bind:value={notifyEmail}
					placeholder="admin@ewinproject.org" class={inputClass} />
				<p class="text-[11px] text-white/30 mt-1.5 font-['Space_Mono']">
					New applications and service requests send alerts to this address.
				</p>
			</div>
		</div>

		<!-- Save button -->
		<div class="flex items-center justify-between pt-2">
			<p class="text-[11px] text-white/25 font-['Space_Mono']">
				Changes are saved to Convex database and take effect immediately.
			</p>
			<button type="button" onclick={saveSettings} disabled={saving}
				class="px-10 py-3 min-h-[48px] bg-[#c9a84c] text-[#0b0a07] text-[12px] font-bold uppercase tracking-widest
				       rounded-xl hover:bg-[#a07820] disabled:opacity-50 disabled:cursor-not-allowed
				       transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-[#c9a84c]/20">
				{#if saving}
					<span class="w-4 h-4 border-2 border-[#0b0a07]/30 border-t-[#0b0a07] rounded-full animate-spin"></span>
					Saving...
				{:else}
					Save Settings
				{/if}
			</button>
		</div>
	{/if}
</div>
