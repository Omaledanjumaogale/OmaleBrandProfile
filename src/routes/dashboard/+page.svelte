<script lang="ts">
	import DashboardLayout from '$lib/components/dashboard/DashboardLayout.svelte';
	import StatCard from '$lib/components/dashboard/StatCard.svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';
	import { user } from '$lib/stores/auth';
	import { onMount } from 'svelte';

	let tasks = $state([]);
	let broadcasts = $state([]);
	let loading = $state(true);
	let reportText = $state('');
	let selectedTask = $state(null);
	let showReportModal = $state(false);

	async function fetchData() {
		if (!$user?.email) return;
		try {
			const [tks, bcasts] = await Promise.all([
				convex.query(api.functions.getTasksForUser, { email: $user.email }),
				convex.query(api.functions.getLatestBroadcasts)
			]);
			tasks = tks || [];
			broadcasts = bcasts || [];
		} catch (e) {
			console.error('Error fetching dashboard data:', e);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchData();
	});

	async function submitReport() {
		if (!selectedTask || !reportText) return;
		await convex.mutation(api.functions.updateTaskStatus, {
			taskId: selectedTask._id,
			status: 'submitted',
			report: reportText
		});
		reportText = '';
		showReportModal = false;
		fetchData();
	}

	async function updateStatus(taskId, status) {
		await convex.mutation(api.functions.updateTaskStatus, { taskId, status });
		fetchData();
	}

	let metrics = $derived([
		{ label: 'Active Tasks 🎯', value: tasks.filter(t => t.status !== 'completed').length.toString(), trend: 'ASSIGNED', icon: '🎯', color: 'gold' },
		{ label: 'Completed 🏆', value: tasks.filter(t => t.status === 'completed').length.toString(), trend: 'TOTAL', icon: '🏆', color: 'teal' },
		{ label: 'Trust Score 🛡️', value: '98%', trend: 'ELITE', icon: '🛡️', color: 'blue' },
		{ label: 'Earnings 💰', value: '₦0.00', trend: 'PENDING', icon: '💰', color: 'gold' }
	]);
</script>

<svelte:head>
	<title>IAM Member Dashboard · E-WIN Project 🌍</title>
</svelte:head>

<DashboardLayout title="Member Command Center 🌍" isAdmin={false}>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 reveal visible">
		{#each metrics as metric}
			<StatCard {...metric} />
		{/each}
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
		<!-- Broadcasts -->
		<div class="bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl reveal visible delay-100">
			<div class="p-6 border-b border-border bg-surface2/50 flex items-center justify-between">
				<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">Broadcasts 📢</h3>
				<span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
			</div>
			<div class="p-6 space-y-4">
				{#if broadcasts.length === 0}
					<p class="text-center py-10 text-muted text-sm md:text-[12px]">No broadcasts yet.</p>
				{:else}
					{#each broadcasts as b}
						<div class="p-4 bg-bg border border-border rounded-xl hover:border-gold-line transition-all">
							<div class="flex justify-between mb-1">
								<span class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest text-gold uppercase">{b.sender}</span>
								<span class="text-sm md:text-[9px] text-muted">{new Date(b.timestamp).toLocaleDateString()}</span>
							</div>
							<p class="text-sm md:text-[12px] text-text font-light">{b.message}</p>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Assigned Tasks -->
		<div class="lg:col-span-2 bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl reveal visible delay-200">
			<div class="p-6 border-b border-border bg-surface2/50">
				<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">Assigned Strategic Tasks 🎯</h3>
			</div>

			<div class="p-6">
				{#if loading}
					<div class="flex flex-col items-center justify-center py-20 gap-4">
						<div class="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
						<p class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Synchronizing Tasks...</p>
					</div>
				{:else}
					<div class="space-y-4">
						{#if tasks.length === 0}
							<div class="text-center py-20">
								<div class="text-4xl mb-4">📭</div>
								<p class="text-muted text-[13px] max-w-xs mx-auto">No tasks currently assigned. Maintain your profile and stay active for upcoming opportunities.</p>
							</div>
						{:else}
							{#each tasks as task}
								<div class="p-6 bg-bg border border-border rounded-2xl group hover:border-gold-line transition-all">
									<div class="flex justify-between items-start mb-4">
										<div>
											<h4 class="font-['Bebas_Neue'] text-xl tracking-widest text-text mb-1">{task.title}</h4>
											<div class="flex gap-4 text-[10px] font-['Space_Mono'] uppercase tracking-widest">
												<span class="text-gold">Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
												<span class="text-muted">Status: {task.status}</span>
											</div>
										</div>
										<div class="flex gap-2">
											{#if task.status === 'pending'}
												<button 
													onclick={() => updateStatus(task._id, 'in_progress')}
													class="px-4 py-2 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-xl border border-gold/20 hover:bg-gold/20"
												>
													Accept Task ✅
												</button>
											{:else if task.status === 'in_progress'}
												<button 
													onclick={() => { selectedTask = task; showReportModal = true; }}
													class="px-4 py-2 bg-teal2/10 text-teal2 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-teal2/20 hover:bg-teal2/20"
												>
													Submit Report 📋
												</button>
											{/if}
										</div>
									</div>
									<p class="text-[13px] text-text font-light leading-relaxed">{task.description}</p>
									{#if task.report}
										<div class="mt-4 p-4 bg-surface rounded-xl border border-border/50 italic text-[11px] text-muted">
											Report: "{task.report}"
										</div>
									{/if}
								</div>
							{/each}
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Report Submission Modal -->
	{#if showReportModal && selectedTask}
		<div class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
			<button class="absolute inset-0 bg-bg/90 backdrop-blur-xl border-none" onclick={() => showReportModal = false} aria-label="Close modal overlay"></button>
			<div class="bg-surface border-t sm:border border-border w-full max-w-lg rounded-t-[32px] sm:rounded-3xl p-8 sm:p-10 relative z-10 shadow-2xl">
				<div class="mb-8">
					<div class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-gold mb-2">Submit Task Report 📋</div>
					<h2 class="font-['Bebas_Neue'] text-3xl tracking-widest">{selectedTask.title}</h2>
				</div>

				<textarea 
					bind:value={reportText}
					placeholder="Describe the work completed, findings, or outcomes..."
					class="w-full bg-bg border border-border rounded-2xl p-5 text-[13px] h-48 outline-none focus:border-gold resize-none mb-6 min-h-[120px]"
				></textarea>

				<div class="flex flex-col sm:flex-row gap-4 pb-8 sm:pb-0">
					<button 
						onclick={() => showReportModal = false}
						class="flex-grow py-4 border border-border text-muted text-[11px] font-bold uppercase tracking-widest rounded-xl min-h-[44px]"
					>
						Cancel
					</button>
					<button 
						onclick={submitReport}
						class="flex-grow py-4 bg-gold text-bg text-[11px] font-bold uppercase tracking-widest rounded-xl min-h-[44px]"
					>
						Submit Report 🚀
					</button>
				</div>
			</div>
		</div>
	{/if}
</DashboardLayout>
