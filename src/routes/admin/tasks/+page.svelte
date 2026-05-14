<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../../convex/_generated/api';
	import { currentUser } from '$lib/stores/auth';
	import { ui } from '$lib/stores/ui';

	let tasks: any[]    = $state([]);
	let loading = $state(true);
	let filter  = $state<'all' | 'pending' | 'in_progress' | 'submitted' | 'completed'>('all');
	let updating = $state<string | null>(null);
	let showCreate = $state(false);

	// Create task form
	let newTitle   = $state('');
	let newDesc    = $state('');
	let newEmail   = $state('');
	let newDeadline = $state('');
	let creating   = $state(false);

	onMount(() => {
		const unsub = convex.onUpdate(api.functions.getTasksForAdmin, {}, (data) => {
			tasks = data ?? [];
			loading = false;
		});
		return unsub;
	});

	const filtered = $derived(() => {
		if (filter === 'all') return tasks;
		return tasks.filter(t => t.status === filter);
	});

	const counts = $derived({
		all: tasks.length,
		pending: tasks.filter(t => t.status === 'pending').length,
		in_progress: tasks.filter(t => t.status === 'in_progress').length,
		submitted: tasks.filter(t => t.status === 'submitted').length,
		completed: tasks.filter(t => t.status === 'completed').length,
	});

	async function markStatus(id: string, status: 'in_progress' | 'completed') {
		updating = id;
		try {
			await convex.mutation(api.functions.updateTaskStatus, { taskId: id as any, status });
			ui.success(`Task marked as ${status.replace('_',' ')}.`);
		} catch (e: any) { ui.error(e.message); }
		finally { updating = null; }
	}

	async function createTask() {
		if (!newTitle.trim() || !newEmail.trim() || !newDeadline) {
			ui.error('Title, email, and deadline are required.'); return;
		}
		creating = true;
		try {
			// Find the application by email to get the assignee ID
			const user = await convex.query(api.functions.getApplicationByEmail, { email: newEmail });
			if (!user) throw new Error('No application found for that email address.');
			await convex.mutation(api.functions.createTask, {
				assigneeId: user._id,
				title: newTitle.trim(),
				description: newDesc.trim(),
				deadline: new Date(newDeadline).getTime(),
			});
			ui.success('Task created successfully.');
			newTitle = ''; newDesc = ''; newEmail = ''; newDeadline = '';
			showCreate = false;
		} catch (e: any) { ui.error(e.message); }
		finally { creating = false; }
	}

	const statusColor = (s: string) => ({
		pending:     'bg-amber-500/15 text-amber-400 border-amber-500/30',
		in_progress: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
		submitted:   'bg-purple-500/15 text-purple-400 border-purple-500/30',
		completed:   'bg-teal-500/15 text-teal-400 border-teal-500/30',
	}[s] ?? 'bg-white/10 text-white/50 border-white/20');

	const fmt = (ts: number) => new Date(ts).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
	const isOverdue = (deadline: number) => deadline < Date.now();
</script>

<svelte:head><title>Tasks — Admin | E-WIN</title></svelte:head>

<div class="space-y-5 max-w-[1200px] mx-auto">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<div>
			<h1 class="font-['Bebas_Neue'] text-3xl tracking-widest text-white">Tasks</h1>
			<p class="text-[11px] text-white/40 font-['Space_Mono'] mt-0.5">{tasks.length} total tasks</p>
		</div>
		<button type="button" onclick={() => showCreate = !showCreate}
			class="px-5 py-2.5 min-h-[44px] bg-[#c9a84c] text-[#0b0a07] text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#a07820] transition-all active:scale-95">
			+ Create Task
		</button>
	</div>

	<!-- Create task panel -->
	{#if showCreate}
		<div class="bg-[#0f0e0b] border border-[#c9a84c]/20 rounded-2xl p-6 space-y-4">
			<h2 class="font-['Bebas_Neue'] text-xl tracking-widest text-[#c9a84c]">New Task</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="sm:col-span-2">
					<label for="task-title" class="block text-[10px] font-['Space_Mono'] uppercase tracking-widest text-white/40 mb-1.5">Task Title *</label>
					<input id="task-title" type="text" bind:value={newTitle} placeholder="e.g. Complete client onboarding report"
						class="w-full bg-[#0b0a07] border border-[#c9a84c]/15 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#c9a84c]/50 outline-none" />
				</div>
				<div>
					<label for="task-email" class="block text-[10px] font-['Space_Mono'] uppercase tracking-widest text-white/40 mb-1.5">Assignee Email *</label>
					<input id="task-email" type="email" bind:value={newEmail} placeholder="applicant@email.com"
						class="w-full bg-[#0b0a07] border border-[#c9a84c]/15 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#c9a84c]/50 outline-none" />
				</div>
				<div>
					<label for="task-deadline" class="block text-[10px] font-['Space_Mono'] uppercase tracking-widest text-white/40 mb-1.5">Deadline *</label>
					<input id="task-deadline" type="date" bind:value={newDeadline}
						class="w-full bg-[#0b0a07] border border-[#c9a84c]/15 rounded-xl px-4 py-2.5 text-[13px] text-white focus:border-[#c9a84c]/50 outline-none" />
				</div>
				<div class="sm:col-span-2">
					<label for="task-desc" class="block text-[10px] font-['Space_Mono'] uppercase tracking-widest text-white/40 mb-1.5">Description</label>
					<textarea id="task-desc" bind:value={newDesc} rows="3" placeholder="Task details and requirements..."
						class="w-full bg-[#0b0a07] border border-[#c9a84c]/15 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#c9a84c]/50 outline-none resize-none">
					</textarea>
				</div>
			</div>
			<div class="flex gap-3 pt-2">
				<button type="button" onclick={createTask} disabled={creating}
					class="px-8 py-2.5 min-h-[44px] bg-[#c9a84c] text-[#0b0a07] text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#a07820] disabled:opacity-50 transition-all active:scale-95">
					{creating ? 'Creating...' : 'Create Task'}
				</button>
				<button type="button" onclick={() => showCreate = false}
					class="px-6 py-2.5 min-h-[44px] border border-[#c9a84c]/20 text-white/50 text-[12px] font-bold uppercase tracking-wider rounded-xl hover:border-[#c9a84c]/40 transition-all active:scale-95">
					Cancel
				</button>
			</div>
		</div>
	{/if}

	<!-- Filter tabs -->
	<div class="flex gap-2 flex-wrap">
		{#each (['all','pending','in_progress','submitted','completed'] as const) as tab}
			<button type="button" onclick={() => filter = tab}
				class="px-4 py-2 min-h-[36px] rounded-xl text-[11px] font-['Space_Mono'] uppercase tracking-wider border transition-all active:scale-95
					{filter === tab ? 'bg-[#c9a84c] text-[#0b0a07] border-[#c9a84c]' : 'bg-[#0f0e0b] text-white/50 border-[#c9a84c]/15 hover:border-[#c9a84c]/30'}">
				{tab.replace('_',' ')} ({counts[tab]})
			</button>
		{/each}
	</div>

	<!-- Tasks grid -->
	{#if loading}
		<p class="text-white/30 text-center py-10">Loading tasks...</p>
	{:else if filtered().length === 0}
		<p class="text-white/30 text-center py-10">No tasks found.</p>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
			{#each filtered() as task}
				<div class="bg-[#0f0e0b] border {isOverdue(task.deadline) && task.status !== 'completed' ? 'border-red-500/30' : 'border-[#c9a84c]/10'} rounded-2xl p-5 flex flex-col gap-3 hover:border-[#c9a84c]/20 transition-colors">
					<div class="flex items-start justify-between gap-2">
						<h3 class="text-[14px] font-medium text-white leading-snug flex-1">{task.title}</h3>
						<span class="shrink-0 text-[10px] font-['Space_Mono'] uppercase px-2 py-1 rounded-full border {statusColor(task.status)}">{task.status.replace('_',' ')}</span>
					</div>
					{#if task.description}
						<p class="text-[12px] text-white/50 leading-relaxed">{task.description}</p>
					{/if}
					<div class="flex items-center justify-between text-[11px] pt-1 border-t border-[#c9a84c]/5">
						<span class="font-['Space_Mono'] {isOverdue(task.deadline) && task.status !== 'completed' ? 'text-red-400' : 'text-white/30'}">
							Due: {fmt(task.deadline)}
						</span>
						{#if task.status === 'pending'}
							<button type="button" disabled={updating === task._id} onclick={() => markStatus(task._id, 'in_progress')}
								class="px-3 py-1 min-h-[30px] bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-blue-500/25 disabled:opacity-40 transition-all active:scale-95">
								Start
							</button>
						{:else if task.status === 'in_progress' || task.status === 'submitted'}
							<button type="button" disabled={updating === task._id} onclick={() => markStatus(task._id, 'completed')}
								class="px-3 py-1 min-h-[30px] bg-teal-500/15 text-teal-400 border border-teal-500/30 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-teal-500/25 disabled:opacity-40 transition-all active:scale-95">
								Complete
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
