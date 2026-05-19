<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '$convex/_generated/api';
import { ui } from '$lib/stores/ui';

	let requests: any[] = $state([]);
	let loading    = $state(true);
	let filter     = $state<'all' | 'pending' | 'contacted' | 'completed' | 'archived'>('all');
	let search     = $state('');
	let updating   = $state<string | null>(null);
	let selected   = $state<any | null>(null);

	onMount(() => {
		const unsub = convex.onUpdate(api.functions.getServiceRequests, {}, (data) => {
			requests = data ?? [];
			loading = false;
		});
		return unsub;
	});

	const filtered = $derived(() => {
		let list = requests;
		if (filter !== 'all') list = list.filter(r => r.status === filter);
		if (search.trim()) {
			const q = search.toLowerCase();
			list = list.filter(r =>
				r.fullName?.toLowerCase().includes(q) ||
				r.email?.toLowerCase().includes(q) ||
				r.serviceType?.toLowerCase().includes(q)
			);
		}
		return list.sort((a, b) => b.createdAt - a.createdAt);
	});

	async function updateStatus(id: string, status: 'contacted' | 'completed' | 'archived') {
		updating = id;
		try {
			await convex.mutation(api.functions.updateServiceRequestStatus, {
				id: id as any, status
			});
			ui.success(`Request marked as ${status}.`);
			selected = null;
		} catch (e: any) { ui.error(e.message); }
		finally { updating = null; }
	}

	const counts = $derived({
		all: requests.length,
		pending: requests.filter(r => r.status === 'pending').length,
		contacted: requests.filter(r => r.status === 'contacted').length,
		completed: requests.filter(r => r.status === 'completed').length,
		archived: requests.filter(r => r.status === 'archived').length,
	});

	const statusColor = (s: string) => ({
		pending:   'bg-amber-500/15 text-amber-400 border-amber-500/30',
		contacted: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
		completed: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
		archived:  'bg-gray-500/15 text-gray-400 border-gray-500/30',
	}[s] ?? 'bg-white/10 text-white/50 border-white/20');

	const fmt = (ts: number) => new Date(ts).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	const timeAgo = (ts: number) => { const m = Math.floor((Date.now()-ts)/60000); return m<60?`${m}m ago`:`${Math.floor(m/60)}h ago`; };
</script>

<svelte:head><title>Service Requests — Admin | E-WIN</title></svelte:head>

<div class="space-y-5 max-w-[1200px] mx-auto">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<div>
			<h1 class="font-['Bebas_Neue'] text-3xl tracking-widest text-white">Service Requests</h1>
			<p class="text-[11px] text-white/40 font-['Space_Mono'] mt-0.5">{requests.length} total received</p>
		</div>
		<input type="search" bind:value={search} placeholder="Search requests..."
			class="w-full sm:w-72 bg-[#0f0e0b] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#c9a84c]/50 outline-none transition-colors" />
	</div>

	<div class="flex gap-2 flex-wrap">
		{#each (['all','pending','contacted','completed','archived'] as const) as tab}
			<button type="button" onclick={() => filter = tab}
				class="px-4 py-2 min-h-[36px] rounded-xl text-[11px] font-['Space_Mono'] uppercase tracking-wider border transition-all active:scale-95
					{filter === tab ? 'bg-[#c9a84c] text-[#0b0a07] border-[#c9a84c]' : 'bg-[#0f0e0b] text-white/50 border-[#c9a84c]/15 hover:border-[#c9a84c]/30'}">
				{tab} ({counts[tab]})
			</button>
		{/each}
	</div>

	<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-[13px]">
				<thead>
					<tr class="border-b border-[#c9a84c]/10">
						{#each ['Name','Email','Service Type','Urgency','Date','Status','Actions'] as col}
							<th class="text-left px-5 py-3.5 text-white/30 font-['Space_Mono'] text-[10px] uppercase tracking-wider whitespace-nowrap">{col}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-[#c9a84c]/5">
					{#if loading}
						<tr><td colspan="7" class="px-5 py-10 text-center text-white/30">Loading...</td></tr>
					{:else if filtered().length === 0}
						<tr><td colspan="7" class="px-5 py-10 text-center text-white/30">No requests found.</td></tr>
					{:else}
						{#each filtered() as req}
							<tr class="hover:bg-white/2 transition-colors">
								<td class="px-5 py-3">
									<button type="button" onclick={() => selected = req} class="text-white font-medium hover:text-[#c9a84c] transition-colors text-left">{req.fullName}</button>
								</td>
								<td class="px-5 py-3 text-white/60 truncate max-w-[160px]">{req.email}</td>
								<td class="px-5 py-3 text-white/70 whitespace-nowrap">{req.serviceType}</td>
								<td class="px-5 py-3">
									<span class="text-[10px] px-2 py-1 rounded-full {req.urgency === 'urgent' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white/40'}">{req.urgency}</span>
								</td>
								<td class="px-5 py-3 text-white/40 font-['Space_Mono'] text-[11px] whitespace-nowrap">{fmt(req.createdAt)}</td>
								<td class="px-5 py-3">
									<span class="text-[10px] font-['Space_Mono'] uppercase px-2.5 py-1 rounded-full border {statusColor(req.status)}">{req.status}</span>
								</td>
								<td class="px-5 py-3">
									{#if req.status === 'pending'}
										<button type="button" disabled={updating === req._id} onclick={() => updateStatus(req._id, 'contacted')}
											class="px-3 py-1.5 min-h-[32px] bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-blue-500/25 disabled:opacity-40 transition-all active:scale-95">
											{updating === req._id ? '...' : 'Mark Contacted'}
										</button>
									{:else if req.status === 'contacted'}
										<button type="button" disabled={updating === req._id} onclick={() => updateStatus(req._id, 'completed')}
											class="px-3 py-1.5 min-h-[32px] bg-teal-500/15 text-teal-400 border border-teal-500/30 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-teal-500/25 disabled:opacity-40 transition-all active:scale-95">
											{updating === req._id ? '...' : 'Complete'}
										</button>
									{:else}
										<span class="text-[11px] text-white/20 font-['Space_Mono']">Done</span>
									{/if}
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</div>

{#if selected}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div role="none" class="fixed inset-0 bg-black/60 z-50" onclick={() => selected = null}></div>
	<aside class="fixed right-0 top-0 bottom-0 w-full max-w-[480px] z-[60] bg-[#0f0e0b] border-l border-[#c9a84c]/15 overflow-y-auto flex flex-col">
		<div class="flex items-center justify-between px-6 py-5 border-b border-[#c9a84c]/10 shrink-0">
			<h2 class="font-['Bebas_Neue'] text-xl tracking-widest text-[#c9a84c]">Request Detail</h2>
			<button type="button" onclick={() => selected = null} class="w-9 h-9 flex items-center justify-center rounded-xl border border-[#c9a84c]/20 text-white/50 hover:text-white transition-all">✕</button>
		</div>
		<div class="p-6 space-y-4 flex-1 text-[13px]">
			{#each [
				['Name', selected.fullName], ['Email', selected.email], ['Mobile', selected.mobileNumber],
				['WhatsApp', selected.whatsappNumber], ['State', selected.stateOfResidence],
				['Service', selected.serviceType], ['Budget', selected.budget],
				['Urgency', selected.urgency], ['Best Time to Reach', selected.bestTimeToReach],
				['Communication Pref.', selected.preferredCommunication],
			] as [l, v]}
				<div class="flex gap-4">
					<span class="text-[11px] font-['Space_Mono'] text-white/30 uppercase tracking-wider w-36 shrink-0 pt-0.5">{l}</span>
					<span class="text-white flex-1">{v ?? '—'}</span>
				</div>
			{/each}
			<div class="pt-3 border-t border-[#c9a84c]/10">
				<p class="text-[11px] font-['Space_Mono'] text-white/30 uppercase tracking-wider mb-2">Description</p>
				<p class="text-white/80 leading-relaxed">{selected.description ?? '—'}</p>
			</div>
		</div>
		<div class="p-6 border-t border-[#c9a84c]/10 flex gap-3 shrink-0">
			{#if selected.status === 'pending'}
				<button type="button" disabled={updating === selected._id} onclick={() => updateStatus(selected._id, 'contacted')}
					class="flex-1 py-3 min-h-[48px] bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-blue-500/30 disabled:opacity-40 transition-all active:scale-95">
					Mark Contacted
				</button>
			{:else if selected.status === 'contacted'}
				<button type="button" disabled={updating === selected._id} onclick={() => updateStatus(selected._id, 'completed')}
					class="flex-1 py-3 min-h-[48px] bg-teal-500/20 text-teal-400 border border-teal-500/30 text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-teal-500/30 disabled:opacity-40 transition-all active:scale-95">
					Mark Completed
				</button>
			{/if}
			{#if selected.status !== 'archived'}
				<button type="button" disabled={updating === selected._id} onclick={() => updateStatus(selected._id, 'archived')}
					class="py-3 px-4 min-h-[48px] bg-gray-500/10 text-gray-400 border border-gray-500/20 text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-gray-500/20 disabled:opacity-40 transition-all active:scale-95">
					Archive
				</button>
			{/if}
		</div>
	</aside>
{/if}
