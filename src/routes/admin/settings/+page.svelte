<script lang="ts">
	import DashboardLayout from '$lib/components/dashboard/DashboardLayout.svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../convex/_generated/api';
	import { onMount } from 'svelte';

	let maintenanceMode = $state(false);
	let registrationOpen = $state(true);
	let broadcastMsg = $state('');
	let broadcastSender = $state('Admin');
	let saving = $state(false);
	let saved = $state('');

	async function loadSettings() {
		[maintenanceMode, registrationOpen] = await Promise.all([
			convex.query(api.functions.getSetting, { key: 'maintenance_mode' }),
			convex.query(api.functions.getSetting, { key: 'registration_open' })
		]);
	}

	onMount(loadSettings);

	async function saveSetting(key: string, value: boolean) {
		saving = true;
		try {
			await convex.mutation(api.functions.updateSetting, { key, value });
			saved = key;
			setTimeout(() => { saved = ''; }, 2000);
		} catch (e: any) {
			alert(e.message);
		} finally {
			saving = false;
		}
	}

	async function sendBroadcast() {
		if (!broadcastMsg.trim()) return;
		saving = true;
		try {
			await convex.mutation(api.functions.createBroadcast, {
				message: broadcastMsg.trim(),
				sender: broadcastSender.trim() || 'Admin'
			});
			broadcastMsg = '';
			saved = 'broadcast';
			setTimeout(() => { saved = ''; }, 2000);
		} finally {
			saving = false;
		}
	}
</script>

<svelte:head>
	<title>Settings · Admin · E-WIN Project</title>
</svelte:head>

<DashboardLayout title="Settings" isAdmin>
	<div class="space-y-8 max-w-2xl">
		<!-- Platform Controls -->
		<div class="card p-6 space-y-6">
			<h2 class="font-['Bebas_Neue'] text-2xl tracking-widest text-(--text)">Platform Controls</h2>

			{#each [
				{ key: 'maintenance_mode', label: 'Maintenance Mode', desc: 'Queues all new service requests for admin review.', value: maintenanceMode },
				{ key: 'registration_open', label: 'I-AM Registration', desc: 'Allow new Impact Ambassador applications.', value: registrationOpen }
			] as { key, label, desc, value }}
				<div class="flex items-center justify-between gap-4 py-4 border-b border-(--border) last:border-0">
					<div>
						<div class="text-[13px] font-bold text-(--text) uppercase tracking-widest">{label}</div>
						<div class="text-[11px] text-(--muted) mt-1">{desc}</div>
					</div>
					<button
						onclick={() => {
							const newVal = !value;
							if (key === 'maintenance_mode') maintenanceMode = newVal;
							else registrationOpen = newVal;
							saveSetting(key, newVal);
						}}
						disabled={saving}
						class="relative min-w-[56px] h-7 rounded-full transition-all duration-300 {value ? 'bg-(--gold)' : 'bg-(--surface3)'}"
						aria-label="Toggle {label}"
						role="switch"
						aria-checked={value}
					>
						<span class="absolute top-1 transition-all duration-300 w-5 h-5 rounded-full bg-white shadow {value ? 'left-8' : 'left-1'}"></span>
					</button>
					{#if saved === key}
						<span class="text-[10px] text-(--teal2) font-['Space_Mono'] uppercase">Saved ✓</span>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Broadcast -->
		<div class="card p-6 space-y-4">
			<h2 class="font-['Bebas_Neue'] text-2xl tracking-widest text-(--text)">Send Broadcast</h2>
			<p class="text-[12px] text-(--muted)">Send a message to all dashboard members.</p>

			<div class="space-y-3">
				<input
					type="text"
					bind:value={broadcastSender}
					placeholder="Sender name (default: Admin)"
					class="input-base"
				/>
				<textarea
					bind:value={broadcastMsg}
					rows="3"
					placeholder="Type your broadcast message here..."
					class="input-base resize-none h-24"
				></textarea>
				<button
					onclick={sendBroadcast}
					disabled={saving || !broadcastMsg.trim()}
					class="px-8 py-3 bg-(--gold) text-(--bg) text-[11px] font-bold tracking-[2px] uppercase rounded-xl hover:bg-(--gold2) transition-all disabled:opacity-50 min-h-[44px] flex items-center gap-2"
				>
					{#if saving}
						<span class="w-3.5 h-3.5 border-2 border-(--bg)/30 border-t-(--bg) rounded-full animate-spin" aria-hidden="true"></span>
					{:else}
						<span aria-hidden="true">📡</span>
					{/if}
					Send Broadcast
				</button>
				{#if saved === 'broadcast'}
					<div class="text-[11px] text-(--teal2) font-['Space_Mono'] uppercase">Broadcast sent ✓</div>
				{/if}
			</div>
		</div>
	</div>
</DashboardLayout>
