<script lang="ts">
	import DashboardLayout from '$lib/components/dashboard/DashboardLayout.svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../convex/_generated/api';
	import { onMount } from 'svelte';

	let settings = $state([]);
	let loading = $state(true);
	let saving = $state(false);

	async function fetchSettings() {
		try {
			const data = await convex.query(api.functions.getSettings);
			settings = data || [];
		} catch (e) {
			console.error('Error fetching settings:', e);
		} finally {
			loading = false;
		}
	}

	async function updateSetting(key: string, value: any) {
		saving = true;
		try {
			await convex.mutation(api.functions.updateAdminSettings, { key, value });
			await fetchSettings();
		} catch (e) {
			console.error('Error updating setting:', e);
		} finally {
			saving = false;
		}
	}

	onMount(fetchSettings);

	const defaultSettings = [
		{ key: 'maintenance_mode', label: 'Maintenance Mode 🛠️', type: 'toggle', description: 'Enable to restrict public access.' },
		{ key: 'registration_open', label: 'IAM Registration 🌍', type: 'toggle', description: 'Allow new Impact Ambassador applications.' },
		{ key: 'notifications_email', label: 'Admin Notifications 📧', type: 'text', description: 'Email for system alerts.' }
	];

	function getSettingValue(key: string) {
		const s = settings.find(s => s.key === key);
		return s ? s.value : (key === 'notifications_email' ? '' : false);
	}
</script>

<DashboardLayout title="System Settings ⚙️" isAdmin={true}>
	<div class="max-w-3xl space-y-8">
		<div class="bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl">
			<div class="p-8 border-b border-border bg-surface2/50">
				<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">Global Infrastructure 🏗️</h3>
				<p class="text-[11px] text-muted uppercase tracking-widest mt-1">Configure platform-wide behaviors.</p>
			</div>

			<div class="p-8 space-y-10">
				{#if loading}
					<div class="py-10 text-center text-muted uppercase tracking-widest text-sm md:text-[10px]">Loading Settings...</div>
				{:else}
					{#each defaultSettings as item}
						<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
							<div class="flex-grow">
								<h4 class="font-['Bebas_Neue'] text-xl tracking-widest text-text mb-1">{item.label}</h4>
								<p class="text-sm md:text-[12px] text-muted font-light">{item.description}</p>
							</div>
							
							{#if item.type === 'toggle'}
								<button 
									onclick={() => updateSetting(item.key, !getSettingValue(item.key))}
									disabled={saving}
									aria-label="Toggle {item.label}"
									class="relative w-14 h-7 rounded-full transition-colors {getSettingValue(item.key) ? 'bg-gold' : 'bg-border'} {saving ? 'opacity-50' : ''} shrink-0"
								>
									<div class="absolute top-1 left-1 w-5 h-5 bg-bg rounded-full transition-transform {getSettingValue(item.key) ? 'translate-x-7' : ''}"></div>
								</button>
							{:else}
								<div class="flex gap-2 w-full sm:w-auto">
									<input 
										type="text" 
										value={getSettingValue(item.key)} 
										onchange={(e) => updateSetting(item.key, e.target.value)}
										disabled={saving}
										class="bg-bg border border-border rounded-lg px-4 py-3 min-h-[44px] text-sm md:text-[12px] text-text focus:border-gold outline-none transition-all w-full sm:w-64"
									/>
								</div>
							{/if}
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<div class="p-6 bg-gold/5 border border-gold/20 rounded-2xl flex items-start gap-4">
			<span class="text-2xl">🛡️</span>
			<div>
				<h4 class="font-bold text-gold text-xs uppercase tracking-widest mb-1">Security Protocol</h4>
				<p class="text-[11px] text-muted leading-relaxed">
					All changes to system settings are logged in the audit trail. Critical modifications may require multi-factor authentication in future updates.
				</p>
			</div>
		</div>
	</div>
</DashboardLayout>
