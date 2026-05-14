<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../../convex/_generated/api';

	let logs: any[]  = $state([]);
	let loading = $state(true);
	let search  = $state('');
	let page    = $state(0);
	const PER_PAGE = 25;

	onMount(() => {
		const unsub = convex.onUpdate(api.functions.getAuditLogs, {}, (data) => {
			logs = data ?? [];
			loading = false;
		});
		return unsub;
	});

	const filtered = $derived(() => {
		if (!search.trim()) return logs;
		const q = search.toLowerCase();
		return logs.filter(l =>
			l.action?.toLowerCase().includes(q) ||
			l.adminEmail?.toLowerCase().includes(q)
		);
	});

	const paginated  = $derived(() => filtered().slice(page * PER_PAGE, (page + 1) * PER_PAGE));
	const totalPages = $derived(() => Math.ceil(filtered().length / PER_PAGE));

	const actionColor = (action: string) => {
		if (action.includes('APPROVED') || action.includes('COMPLETED') || action.includes('UNLOCKED'))
			return 'text-teal-400';
		if (action.includes('DECLINED') || action.includes('LOCKED') || action.includes('ARCHIVED'))
			return 'text-red-400';
		if (action.includes('SUBMITTED') || action.includes('CONTACTED'))
			return 'text-blue-400';
		if (action.includes('ADMIN') || action.includes('ROLE'))
			return 'text-[#c9a84c]';
		return 'text-white/60';
	};

	const actionIcon = (action: string) => {
		if (action.includes('APPLICATION')) return '📋';
		if (action.includes('REQUEST'))     return '📥';
		if (action.includes('USER'))        return '👤';
		if (action.includes('TASK'))        return '✅';
		if (action.includes('BROADCAST'))   return '📢';
		if (action.includes('SETTING'))     return '⚙️';
		return '🔍';
	};

	const fmt = (ts: number) => new Date(ts).toLocaleString('en-GB', {
		day: '2-digit', month: 'short', year: 'numeric',
		hour: '2-digit', minute: '2-digit'
	});

	$effect(() => { search; page = 0; });
</script>

<svelte:head><title>Audit Log — Admin | E-WIN</title></svelte:head>

<div class="space-y-5 max-w-[1100px] mx-auto">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<div>
			<h1 class="font-['Bebas_Neue'] text-3xl tracking-widest text-white">Audit Log</h1>
			<p class="text-[11px] text-white/40 font-['Space_Mono'] mt-0.5">
				{logs.length} events recorded · showing last 100
			</p>
		</div>
		<input type="search" bind:value={search} placeholder="Filter by action or admin..."
			class="w-full sm:w-72 bg-[#0f0e0b] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5
			       text-[13px] text-white placeholder:text-white/30 focus:border-[#c9a84c]/50 outline-none transition-colors" />
	</div>

	<!-- Legend -->
	<div class="flex flex-wrap gap-3 text-[11px] font-['Space_Mono']">
		{#each [['teal-400','Approved / Completed'],['red-400','Declined / Locked'],['blue-400','Submitted / Contacted'],['[#c9a84c]','Role / Admin'],['white/40','System']] as [col, label]}
			<span class="flex items-center gap-1.5 text-{col}">
				<span class="w-2 h-2 rounded-full bg-{col}"></span>{label}
			</span>
		{/each}
	</div>

	<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-[12px]">
				<thead>
					<tr class="border-b border-[#c9a84c]/10">
						{#each ['','Action','Admin','Details','Timestamp'] as col}
							<th class="text-left px-4 py-3 text-white/30 font-['Space_Mono'] text-[10px] uppercase tracking-wider whitespace-nowrap">
								{col}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-[#c9a84c]/5">
					{#if loading}
						<tr><td colspan="5" class="px-4 py-10 text-center text-white/30">Loading audit log...</td></tr>
					{:else if paginated().length === 0}
						<tr><td colspan="5" class="px-4 py-10 text-center text-white/30">No matching events.</td></tr>
					{:else}
						{#each paginated() as log}
							<tr class="hover:bg-white/2 transition-colors">
								<td class="px-4 py-3 text-lg w-8">{actionIcon(log.action)}</td>
								<td class="px-4 py-3 font-mono font-medium {actionColor(log.action)}">{log.action}</td>
								<td class="px-4 py-3 text-white/50">{log.adminEmail ?? 'system'}</td>
								<td class="px-4 py-3 text-white/30 max-w-[200px] truncate">
									{#if log.payload && typeof log.payload === 'object'}
										{JSON.stringify(log.payload).slice(0, 60)}{JSON.stringify(log.payload).length > 60 ? '…' : ''}
									{:else}
										—
									{/if}
								</td>
								<td class="px-4 py-3 text-white/30 font-['Space_Mono'] whitespace-nowrap">{fmt(log.timestamp)}</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		{#if totalPages() > 1}
			<div class="flex items-center justify-between px-5 py-3 border-t border-[#c9a84c]/10">
				<button type="button" onclick={() => page = Math.max(0, page - 1)} disabled={page === 0}
					class="px-4 py-2 min-h-[36px] text-[11px] font-['Space_Mono'] uppercase tracking-wider border border-[#c9a84c]/15 text-white/50 rounded-xl hover:border-[#c9a84c]/30 disabled:opacity-30 transition-all active:scale-95">
					← Prev
				</button>
				<span class="text-[11px] font-['Space_Mono'] text-white/30">
					Page {page + 1} of {totalPages()}
				</span>
				<button type="button" onclick={() => page = Math.min(totalPages() - 1, page + 1)} disabled={page >= totalPages() - 1}
					class="px-4 py-2 min-h-[36px] text-[11px] font-['Space_Mono'] uppercase tracking-wider border border-[#c9a84c]/15 text-white/50 rounded-xl hover:border-[#c9a84c]/30 disabled:opacity-30 transition-all active:scale-95">
					Next →
				</button>
			</div>
		{/if}
	</div>
</div>
