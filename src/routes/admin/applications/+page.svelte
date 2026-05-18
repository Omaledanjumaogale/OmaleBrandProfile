<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '$convex/_generated/api';
	import { currentUser } from '$lib/stores/auth';
	import { ui } from '$lib/stores/ui';

	let applications: any[] = $state([]);
	let loading   = $state(true);
	let filter    = $state<'all' | 'pending' | 'approved' | 'declined'>('all');
	let search    = $state('');
	let updating  = $state<string | null>(null);
	let selected  = $state<any | null>(null);

	onMount(() => {
		const unsub = convex.onUpdate(api.functions.getApplications, {}, (data) => {
			applications = data ?? [];
			loading = false;
		});
		return unsub;
	});

	const filtered = $derived(() => {
		let list = applications;
		if (filter !== 'all') list = list.filter(a => a.status === filter);
		if (search.trim()) {
			const q = search.toLowerCase();
			list = list.filter(a =>
				a.fullName?.toLowerCase().includes(q) ||
				a.email?.toLowerCase().includes(q) ||
				a.stateOfResidence?.toLowerCase().includes(q)
			);
		}
		return list.sort((a, b) => b.createdAt - a.createdAt);
	});

	async function updateStatus(id: string, status: 'approved' | 'declined') {
		updating = id;
		try {
			await convex.mutation(api.functions.updateApplicationStatus, {
				id: id as any,
				status,
				adminEmail: $currentUser?.email ?? undefined
			});
			ui.success(`Application ${status}.`);
			selected = null;
		} catch (e: any) {
			ui.error(e.message ?? 'Update failed.');
		} finally {
			updating = null;
		}
	}

	const statusColor = (s: string) => ({
		pending:  'bg-amber-500/15 text-amber-400 border-amber-500/30',
		approved: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
		declined: 'bg-red-500/15 text-red-400 border-red-500/30',
	}[s] ?? 'bg-white/10 text-white/50 border-white/20');

	const counts = $derived({
		all:      applications.length,
		pending:  applications.filter(a => a.status === 'pending').length,
		approved: applications.filter(a => a.status === 'approved').length,
		declined: applications.filter(a => a.status === 'declined').length,
	});

	function fmt(ts: number) {
		return new Date(ts).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	}
</script>

<svelte:head><title>Applications — Admin | E-WIN</title></svelte:head>

<div class="space-y-5 max-w-[1200px] mx-auto">

	<!-- Header -->
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<div>
			<h1 class="font-['Bebas_Neue'] text-3xl tracking-widest text-white">Applications</h1>
			<p class="text-[11px] text-white/40 font-['Space_Mono'] mt-0.5">{applications.length} total received</p>
		</div>
		<!-- Search -->
		<input
			type="search" bind:value={search}
			aria-label="Search applications by name, email, or residence"
			placeholder="Search by name or email..."
			class="w-full sm:w-72 bg-[#0f0e0b] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#c9a84c]/50 outline-none transition-colors"
		/>
	</div>

	<!-- Filter tabs -->
	<div class="flex gap-2 flex-wrap" role="tablist" aria-label="Application status filters">
		{#each (['all','pending','approved','declined'] as const) as tab}
			<button type="button" 
				onclick={() => filter = tab}
				role="tab"
				aria-selected={filter === tab}
				aria-label="Show {tab} applications ({counts[tab]})"
				class="px-4 py-2 min-h-[36px] rounded-xl text-[11px] font-['Space_Mono'] uppercase tracking-wider border transition-all active:scale-95
					{filter === tab
						? 'bg-[#c9a84c] text-[#0b0a07] border-[#c9a84c]'
						: 'bg-[#0f0e0b] text-white/50 border-[#c9a84c]/15 hover:border-[#c9a84c]/30'}">
				{tab} ({counts[tab]})
			</button>
		{/each}
	</div>

	<!-- Table -->
	<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-[13px]">
				<thead>
					<tr class="border-b border-[#c9a84c]/10">
						{#each ['Full Name','Email','State','Applied','Status','Actions'] as col}
							<th class="text-left px-5 py-3.5 text-white/30 font-['Space_Mono'] text-[10px] uppercase tracking-wider whitespace-nowrap">{col}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-[#c9a84c]/5">
					{#if loading}
						<tr><td colspan="6" class="px-5 py-10 text-center text-white/30">Loading...</td></tr>
					{:else if filtered().length === 0}
						<tr><td colspan="6" class="px-5 py-10 text-center text-white/30">No applications found.</td></tr>
					{:else}
						{#each filtered() as app}
							<tr class="hover:bg-white/2 transition-colors">
								<td class="px-5 py-3.5">
									<button type="button" onclick={() => selected = app}
										class="text-white font-medium hover:text-[#c9a84c] transition-colors text-left">
										{app.fullName}
									</button>
								</td>
								<td class="px-5 py-3.5 text-white/60">{app.email}</td>
								<td class="px-5 py-3.5 text-white/60 whitespace-nowrap">{app.stateOfResidence ?? '—'}</td>
								<td class="px-5 py-3.5 text-white/40 whitespace-nowrap font-['Space_Mono'] text-[11px]">{fmt(app.createdAt)}</td>
								<td class="px-5 py-3.5">
									<span class="text-[10px] font-['Space_Mono'] uppercase px-2.5 py-1 rounded-full border {statusColor(app.status)}">
										{app.status}
									</span>
								</td>
								<td class="px-5 py-3.5">
									{#if app.status === 'pending'}
										<div class="flex gap-2">
											<button type="button"
												disabled={updating === app._id}
												onclick={() => updateStatus(app._id, 'approved')}
												aria-label="Approve application for {app.fullName}"
												class="px-3 py-1.5 min-h-[32px] bg-teal-500/15 text-teal-400 border border-teal-500/30 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-teal-500/25 disabled:opacity-40 transition-all active:scale-95">
												{updating === app._id ? '...' : 'Approve'}
											</button>
											<button type="button"
												disabled={updating === app._id}
												onclick={() => updateStatus(app._id, 'declined')}
												aria-label="Decline application for {app.fullName}"
												class="px-3 py-1.5 min-h-[32px] bg-red-500/15 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-red-500/25 disabled:opacity-40 transition-all active:scale-95">
												Decline
											</button>
										</div>
									{:else}
										<span class="text-[11px] text-white/20 font-['Space_Mono']">Reviewed</span>
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

<!-- Detail panel (slide-in) -->
{#if selected}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div role="none" class="fixed inset-0 bg-black/60 z-50" onclick={() => selected = null}></div>
	<aside class="fixed right-0 top-0 bottom-0 w-full max-w-[480px] z-[60]
	              bg-[#0f0e0b] border-l border-[#c9a84c]/15 overflow-y-auto
	              flex flex-col">
		<!-- Header -->
		<div class="flex items-center justify-between px-6 py-5 border-b border-[#c9a84c]/10 shrink-0">
			<h2 class="font-['Bebas_Neue'] text-xl tracking-widest text-[#c9a84c]">Application Detail</h2>
			<button type="button" onclick={() => selected = null}
				aria-label="Close details"
				class="w-9 h-9 flex items-center justify-center rounded-xl border border-[#c9a84c]/20 text-white/50 hover:text-white hover:border-[#c9a84c]/40 transition-all">
				✕
			</button>
		</div>
		<!-- Content -->
		<div class="p-6 space-y-5 flex-1">
			{#each [
				['Full Name',        selected.fullName],
				['Email',            selected.email],
				['Mobile',           selected.mobileNumber],
				['WhatsApp',         selected.whatsappNumber],
				['State of Origin',  selected.stateOfOrigin],
				['LGA of Origin',    selected.lgaOfOrigin],
				['State of Residence', selected.stateOfResidence],
				['LGA of Residence', selected.lgaOfResidence],
				['NIN',              '••••••••' + (selected.nin?.slice(-3) ?? '—')],
				['Education',        selected.academicBackground],
				['Skills',           selected.skills],
				['Earnings Target',  selected.monthlyEarningsTarget],
			] as [label, val]}
				<div class="flex gap-4">
					<span class="text-[11px] font-['Space_Mono'] text-white/30 uppercase tracking-wider w-36 shrink-0 pt-0.5">{label}</span>
					<span class="text-[13px] text-white flex-1">{val ?? '—'}</span>
				</div>
			{/each}
			<div class="pt-2 border-t border-[#c9a84c]/10">
				<span class="text-[11px] font-['Space_Mono'] text-white/30 uppercase tracking-wider">Motivational Statement</span>
				<p class="text-[13px] text-white/80 leading-relaxed mt-2">{selected.motivationalStatement ?? '—'}</p>
			</div>
			<div class="pt-2 border-t border-[#c9a84c]/10">
				<span class="text-[11px] font-['Space_Mono'] text-white/30 uppercase tracking-wider">Work Experience</span>
				<p class="text-[13px] text-white/80 leading-relaxed mt-2">{selected.workingExperience ?? '—'}</p>
			</div>
		</div>
		<!-- Actions -->
		{#if selected.status === 'pending'}
			<div class="p-6 border-t border-[#c9a84c]/10 flex gap-3 shrink-0">
				<button type="button"
					disabled={updating === selected._id}
					onclick={() => updateStatus(selected._id, 'approved')}
					class="flex-1 py-3 min-h-[48px] bg-teal-500/20 text-teal-400 border border-teal-500/30 text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-teal-500/30 disabled:opacity-40 transition-all active:scale-95">
					{updating === selected._id ? 'Processing...' : '✓ Approve'}
				</button>
				<button type="button"
					disabled={updating === selected._id}
					onclick={() => updateStatus(selected._id, 'declined')}
					class="flex-1 py-3 min-h-[48px] bg-red-500/20 text-red-400 border border-red-500/30 text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-red-500/30 disabled:opacity-40 transition-all active:scale-95">
					✕ Decline
				</button>
			</div>
		{:else}
			<div class="p-6 border-t border-[#c9a84c]/10 shrink-0">
				<span class="block text-center text-[11px] font-['Space_Mono'] text-white/30 uppercase tracking-wider">
					Reviewed · Status: {selected.status}
				</span>
			</div>
		{/if}
	</aside>
{/if}
