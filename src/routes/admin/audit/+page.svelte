<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../convex/_generated/api';
	import { fly, fade } from 'svelte/transition';
	import type { AuditLogData } from '$lib/constants';

	// State for audit logs
	let logs = $state<AuditLogData[]>([]);
	let loading = $state(true);
	let filterAction = $state('');

	onMount(async () => {
		try {
			const data = await convex.query(api.functions.getAuditLogs, {});
			logs = (data as AuditLogData[]) || [];
		} catch (e) {
			console.error('Failed to fetch audit logs:', e);
		} finally {
			loading = false;
		}
	});

	const filteredLogs = $derived(
		logs.filter(log => 
			!filterAction || log.action.toLowerCase().includes(filterAction.toLowerCase())
		)
	);

	function formatDate(ts: number) {
		return new Date(ts).toLocaleString('en-NG', {
			dateStyle: 'medium',
			timeStyle: 'short'
		});
	}

	function getActionColor(action: string) {
		if (action.includes('APPROVED')) return 'text-(--teal2) border-(--teal2)/30 bg-(--teal2)/5';
		if (action.includes('DECLINED')) return 'text-red-400 border-red-400/30 bg-red-400/5';
		if (action.includes('SUBMITTED')) return 'text-(--gold) border-(--gold)/30 bg-(--gold)/5';
		return 'text-(--muted) border-(--border) bg-(--surface2)/5';
	}
</script>

<svelte:head>
	<title>Audit Logs | E-WIN Admin</title>
</svelte:head>

<div class="min-h-screen bg-(--bg) p-4 sm:p-8 pt-24 pb-32">
	<div class="max-w-6xl mx-auto">
		<!-- Header Section -->
		<header class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
			<div transition:fly={{ y: 20, duration: 800 }}>
				<div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-(--gold) mb-3 flex items-center gap-2">
					<span class="w-8 h-[1px] bg-(--gold)/50"></span>
					Observability Engine
				</div>
				<h1 class="font-['Bebas_Neue'] text-5xl sm:text-7xl tracking-tighter text-(--text) leading-[0.9]">
					AUDIT <span class="text-(--gold) text-stroke-gold">LOGS</span>
				</h1>
				<p class="text-(--muted) text-sm max-w-md mt-4 font-light leading-relaxed">
					Real-time traceability for all administrative actions and system mutations.
				</p>
			</div>

			<div class="flex flex-col gap-2 w-full md:w-72" transition:fade={{ delay: 200 }}>
				<label for="action-filter" class="font-['Space_Mono'] text-[9px] uppercase tracking-widest text-(--muted)">Filter Actions</label>
				<input
					id="action-filter"
					type="text"
					bind:value={filterAction}
					placeholder="SEARCH ACTIONS..."
					class="w-full h-[52px] bg-(--surface) border border-(--border) rounded-xl px-5 text-[11px] font-bold tracking-[2px] uppercase text-(--text) outline-none focus:border-(--gold) transition-all placeholder:text-(--muted)/50"
				/>
			</div>
		</header>

		<!-- Logs Feed -->
		<div class="space-y-4">
			{#if loading}
				{#each Array(5) as _, i}
					<div class="h-24 bg-(--surface)/50 border border-(--border) rounded-2xl animate-pulse"></div>
				{/each}
			{:else if filteredLogs.length > 0}
				{#each filteredLogs as log, i (log._id)}
					<div 
						transition:fly={{ y: 20, delay: i * 50, duration: 600 }}
						class="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 bg-(--surface) border border-(--border) rounded-2xl hover:border-(--gold)/30 transition-all duration-300"
					>
						<div class="flex items-start gap-4 flex-1">
							<div class="mt-1 w-2 h-2 rounded-full bg-(--gold) shadow-[0_0_10px_var(--gold)]"></div>
							<div>
								<div class="flex flex-wrap items-center gap-3 mb-1">
									<span class="font-['Space_Mono'] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border {getActionColor(log.action)}">
										{log.action}
									</span>
									<span class="text-[10px] font-['Space_Mono'] text-(--muted)">{formatDate(log.timestamp)}</span>
								</div>
								<div class="text-[13px] text-(--text) font-light leading-relaxed">
									{#if log.adminEmail}
										Action triggered by <span class="text-(--gold) font-medium">{log.adminEmail}</span>
									{:else}
										System-automated trigger
									{/if}
								</div>
								{#if log.payload && typeof log.payload === 'object'}
									<div class="mt-3 p-3 bg-(--bg)/50 rounded-xl border border-(--border)/50">
										<pre class="text-[9px] font-['Space_Mono'] text-(--muted) overflow-x-auto">
											{JSON.stringify(log.payload, null, 2)}
										</pre>
									</div>
								{/if}
							</div>
						</div>
						
						<div class="shrink-0 w-full sm:w-auto flex justify-end">
							<div class="text-[9px] font-['Space_Mono'] tracking-[2px] uppercase text-(--muted) opacity-0 group-hover:opacity-100 transition-opacity">
								ID: {log._id?.slice(-8)}
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<div class="py-24 flex flex-col items-center justify-center border border-dashed border-(--border) rounded-3xl" transition:fade>
					<div class="text-4xl mb-4">🔍</div>
					<p class="font-['Space_Mono'] text-[10px] tracking-[2px] uppercase text-(--muted)">No matching audit trails found</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.text-stroke-gold {
		-webkit-text-stroke: 1px var(--gold);
		color: transparent;
	}
</style>
