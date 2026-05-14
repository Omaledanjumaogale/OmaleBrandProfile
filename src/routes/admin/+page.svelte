<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../convex/_generated/api';

	// ── Real-time Convex subscriptions ───────────────────────────────
	let applications: any[]   = $state([]);
	let serviceRequests: any[] = $state([]);
	let auditLogs: any[]       = $state([]);
	let sessions: any[]        = $state([]);
	let loading = $state(true);

	onMount(() => {
		const unsubApps = convex.onUpdate(api.functions.getApplications, {}, (data) => {
			applications = data ?? [];
		});
		const unsubReqs = convex.onUpdate(api.functions.getServiceRequests, {}, (data) => {
			serviceRequests = data ?? [];
		});
		const unsubLogs = convex.onUpdate(api.functions.getAuditLogs, {}, (data) => {
			auditLogs = data ?? [];
			loading = false;
		});
		const unsubSess = convex.onUpdate(api.functions.getActiveSessions, {}, (data) => {
			sessions = data ?? [];
		});
		return () => { unsubApps(); unsubReqs(); unsubLogs(); unsubSess(); };
	});

	// ── Derived stats ─────────────────────────────────────────────────
	const stats = $derived([
		{
			label:   'Total Applications',
			value:   applications.length,
			delta:   applications.filter(a => {
				const d = new Date(a.createdAt); const n = new Date();
				return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
			}).length,
			deltaLabel: 'this month',
			icon: '📋', color: 'gold'
		},
		{
			label:   'Pending Review',
			value:   applications.filter(a => a.status === 'pending').length,
			delta:   null,
			deltaLabel: '',
			icon: '⏳', color: 'amber'
		},
		{
			label:   'Service Requests',
			value:   serviceRequests.length,
			delta:   serviceRequests.filter(r => r.status === 'pending').length,
			deltaLabel: 'pending',
			icon: '📥', color: 'teal'
		},
		{
			label:   'Active Sessions',
			value:   sessions.length,
			delta:   null,
			deltaLabel: '',
			icon: '🔴', color: 'green'
		}
	]);

	const recentApps = $derived(
		[...applications].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5)
	);
	const recentReqs = $derived(
		[...serviceRequests].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5)
	);

	function statusBadge(status: string) {
		const map: Record<string, string> = {
			pending:   'bg-amber-500/15 text-amber-400 border-amber-500/30',
			approved:  'bg-teal-500/15 text-teal-400 border-teal-500/30',
			declined:  'bg-red-500/15 text-red-400 border-red-500/30',
			contacted: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
			completed: 'bg-green-500/15 text-green-400 border-green-500/30',
			archived:  'bg-gray-500/15 text-gray-400 border-gray-500/30',
		};
		return map[status] ?? 'bg-white/10 text-white/50 border-white/20';
	}

	function timeAgo(ts: number): string {
		const diff = Date.now() - ts;
		const m = Math.floor(diff / 60000);
		if (m < 1)  return 'just now';
		if (m < 60) return `${m}m ago`;
		const h = Math.floor(m / 60);
		if (h < 24) return `${h}h ago`;
		return `${Math.floor(h / 24)}d ago`;
	}
</script>

<svelte:head>
	<title>Dashboard — Admin Portal | E-WIN</title>
</svelte:head>

<div class="space-y-6 max-w-[1200px] mx-auto">

	<!-- Page header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="font-['Bebas_Neue'] text-3xl sm:text-4xl tracking-widest text-white">
				Overview
			</h1>
			<p class="text-[12px] text-white/40 font-['Space_Mono'] mt-1">
				{new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
			</p>
		</div>
		{#if loading}
			<div class="flex items-center gap-2 text-[#c9a84c]/60 text-[11px] font-['Space_Mono']">
				<span class="w-3 h-3 border border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin"></span>
				LIVE
			</div>
		{:else}
			<div class="flex items-center gap-2 text-[#22917a] text-[11px] font-['Space_Mono']">
				<span class="w-2 h-2 bg-[#22917a] rounded-full animate-pulse"></span>
				LIVE
			</div>
		{/if}
	</div>

	<!-- ── Stat Cards ─────────────────────────────────────────────── -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
		{#each stats as stat}
			<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl p-5 hover:border-[#c9a84c]/25 transition-colors">
				<div class="flex items-start justify-between mb-3">
					<span class="text-2xl" aria-hidden="true">{stat.icon}</span>
					{#if stat.delta !== null}
						<span class="text-[10px] font-['Space_Mono'] text-[#22917a] bg-[#22917a]/10 px-2 py-1 rounded-full">
							+{stat.delta} {stat.deltaLabel}
						</span>
					{/if}
				</div>
				<div class="font-['Bebas_Neue'] text-4xl text-white tracking-widest mb-1">
					{loading ? '—' : stat.value}
				</div>
				<div class="text-[11px] text-white/40 font-['Space_Mono'] uppercase tracking-widest">
					{stat.label}
				</div>
			</div>
		{/each}
	</div>

	<!-- ── Two column grid ───────────────────────────────────────── -->
	<div class="grid grid-cols-1 xl:grid-cols-2 gap-6">

		<!-- Recent Applications -->
		<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl overflow-hidden">
			<div class="flex items-center justify-between px-5 py-4 border-b border-[#c9a84c]/10">
				<h2 class="font-['Bebas_Neue'] text-lg tracking-widest text-[#c9a84c]">Recent Applications</h2>
				<a href="/admin/applications" class="text-[11px] text-white/40 hover:text-[#c9a84c] font-['Space_Mono'] uppercase tracking-wider transition-colors">
					View all →
				</a>
			</div>
			{#if loading}
				<div class="p-8 text-center text-white/30 text-[12px]">Loading...</div>
			{:else if recentApps.length === 0}
				<div class="p-8 text-center text-white/30 text-[12px]">No applications yet.</div>
			{:else}
				<div class="divide-y divide-[#c9a84c]/5">
					{#each recentApps as app}
						<div class="px-5 py-3 flex items-center justify-between gap-3 hover:bg-white/2 transition-colors">
							<div class="min-w-0">
								<div class="text-[13px] text-white font-medium truncate">{app.fullName}</div>
								<div class="text-[11px] text-white/40 truncate">{app.email} · {timeAgo(app.createdAt)}</div>
							</div>
							<span class="shrink-0 text-[10px] font-['Space_Mono'] uppercase px-2.5 py-1 rounded-full border {statusBadge(app.status)}">
								{app.status}
							</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Recent Service Requests -->
		<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl overflow-hidden">
			<div class="flex items-center justify-between px-5 py-4 border-b border-[#c9a84c]/10">
				<h2 class="font-['Bebas_Neue'] text-lg tracking-widest text-[#c9a84c]">Service Requests</h2>
				<a href="/admin/service-requests" class="text-[11px] text-white/40 hover:text-[#c9a84c] font-['Space_Mono'] uppercase tracking-wider transition-colors">
					View all →
				</a>
			</div>
			{#if loading}
				<div class="p-8 text-center text-white/30 text-[12px]">Loading...</div>
			{:else if recentReqs.length === 0}
				<div class="p-8 text-center text-white/30 text-[12px]">No requests yet.</div>
			{:else}
				<div class="divide-y divide-[#c9a84c]/5">
					{#each recentReqs as req}
						<div class="px-5 py-3 flex items-center justify-between gap-3 hover:bg-white/2 transition-colors">
							<div class="min-w-0">
								<div class="text-[13px] text-white font-medium truncate">{req.fullName}</div>
								<div class="text-[11px] text-white/40 truncate">{req.serviceType} · {timeAgo(req.createdAt)}</div>
							</div>
							<span class="shrink-0 text-[10px] font-['Space_Mono'] uppercase px-2.5 py-1 rounded-full border {statusBadge(req.status)}">
								{req.status}
							</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- ── Audit Log (last 5) ─────────────────────────────────── -->
	<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl overflow-hidden">
		<div class="flex items-center justify-between px-5 py-4 border-b border-[#c9a84c]/10">
			<h2 class="font-['Bebas_Neue'] text-lg tracking-widest text-[#c9a84c]">Audit Log</h2>
			<a href="/admin/audit" class="text-[11px] text-white/40 hover:text-[#c9a84c] font-['Space_Mono'] uppercase tracking-wider transition-colors">
				View all →
			</a>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-[12px]">
				<thead>
					<tr class="border-b border-[#c9a84c]/5">
						<th class="text-left px-5 py-2.5 text-white/30 font-['Space_Mono'] uppercase tracking-wider text-[10px]">Action</th>
						<th class="text-left px-5 py-2.5 text-white/30 font-['Space_Mono'] uppercase tracking-wider text-[10px]">Admin</th>
						<th class="text-right px-5 py-2.5 text-white/30 font-['Space_Mono'] uppercase tracking-wider text-[10px]">Time</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-[#c9a84c]/5">
					{#if loading}
						<tr><td colspan="3" class="px-5 py-6 text-center text-white/30">Loading...</td></tr>
					{:else if auditLogs.length === 0}
						<tr><td colspan="3" class="px-5 py-6 text-center text-white/30">No activity yet.</td></tr>
					{:else}
						{#each auditLogs.slice(0, 5) as log}
							<tr class="hover:bg-white/2 transition-colors">
								<td class="px-5 py-3 text-white font-mono">{log.action}</td>
								<td class="px-5 py-3 text-white/50">{log.adminEmail ?? 'system'}</td>
								<td class="px-5 py-3 text-white/40 text-right font-['Space_Mono']">{timeAgo(log.timestamp)}</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>

</div>
