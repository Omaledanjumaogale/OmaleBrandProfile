<script lang="ts">
	import DashboardLayout from '$lib/components/dashboard/DashboardLayout.svelte';
	import { user } from '$lib/stores/auth';
	import { convex } from '$lib/convex';
	import { api } from '../../../../convex/_generated/api';
	import { onMount } from 'svelte';
	import { APPLICATION_STATUS_COLORS, TASK_STATUS_COLORS } from '$lib/constants';
	import type { ApplicationData, TaskData } from '$lib/constants';

	let application = $state<ApplicationData | null>(null);
	let tasks = $state<TaskData[]>([]);
	let loading = $state(true);

	onMount(async () => {
		if ($user?.email) {
			try {
				[application, tasks] = await Promise.all([
					convex.query(api.functions.getApplicationByEmail, { email: $user.email }),
					convex.query(api.functions.getTasksForUser, { email: $user.email })
				]);
			} catch (e) {
				console.error('Profile load error:', e);
			} finally {
				loading = false;
			}
		} else {
			loading = false;
		}
	});

</script>

<svelte:head>
	<title>My Profile · E-WIN Member Dashboard</title>
</svelte:head>

<DashboardLayout title="My Profile">
	{#if loading}
		<div class="flex items-center justify-center py-24">
			<div class="w-10 h-10 border-4 border-[var(--gold)]/30 border-t-[var(--gold)] rounded-full animate-spin" aria-label="Loading profile"></div>
		</div>
	{:else}
		<div class="space-y-8 max-w-3xl">
			<!-- Identity Card -->
			<div class="card p-6 sm:p-8">
				<div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
					<div class="w-20 h-20 rounded-2xl bg-[var(--gold-dim)] border border-[var(--gold-line)] flex items-center justify-center shrink-0">
						<span class="font-['Bebas_Neue'] text-4xl text-[var(--gold)]">
							{($user?.displayName ?? $user?.email ?? 'U').charAt(0).toUpperCase()}
						</span>
					</div>
					<div class="flex-grow min-w-0">
						<h2 class="font-['Bebas_Neue'] text-3xl tracking-widest text-[var(--text)] truncate">
							{application?.fullName ?? $user?.displayName ?? 'Member'}
						</h2>
						<p class="text-[12px] text-[var(--muted)] font-['Space_Mono'] tracking-widest mt-1 truncate">{$user?.email}</p>
						{#if application?.status}
							<span class="mt-3 inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-widest uppercase border rounded-lg {APPLICATION_STATUS_COLORS[application.status] ?? ''}">
								{application.status === 'approved' ? '✅' : application.status === 'declined' ? '❌' : '⏳'}
								{application.status.charAt(0).toUpperCase() + application.status.slice(1)}
							</span>
						{/if}
					</div>
				</div>
			</div>

			<!-- Application Details -->
			{#if application}
				<div class="card p-6">
					<h3 class="font-['Bebas_Neue'] text-xl tracking-widest text-[var(--text)] mb-6">Application Details</h3>
					<dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{#each [
							['State of Origin', application.stateOfOrigin],
							['State of Residence', application.stateOfResidence],
							['LGA of Residence', application.lgaOfResidence],
							['Skills', application.skills],
							['Academic Background', application.academicBackground],
							['Monthly Target', application.monthlyEarningsTarget],
							['Applied', application.createdAt ? new Date(application.createdAt).toLocaleDateString('en-NG', { dateStyle: 'medium' }) : '—']
						] as [label, val]}
							<div class="p-4 bg-[var(--surface2)] rounded-xl">
								<dt class="text-[9px] font-['Space_Mono'] uppercase tracking-[2px] text-[var(--muted)] mb-1">{label}</dt>
								<dd class="text-[13px] text-[var(--text)] font-medium break-words">{val || '—'}</dd>
							</div>
						{/each}
					</dl>
				</div>
			{:else}
				<div class="card p-8 text-center border-dashed">
					<div class="text-4xl mb-4" aria-hidden="true">📋</div>
					<p class="text-[14px] text-[var(--muted2)] mb-6">No I-AM application found for this account.</p>
					<a href="/register/iam" class="px-8 py-3 bg-[var(--gold)] text-[var(--bg)] text-[11px] font-bold tracking-[2px] uppercase rounded-xl hover:bg-[var(--gold2)] transition-all inline-flex items-center gap-2 min-h-[44px]">
						<span aria-hidden="true">🚀</span> Apply Now
					</a>
				</div>
			{/if}

			<!-- Tasks -->
			<div class="card p-6">
				<h3 class="font-['Bebas_Neue'] text-xl tracking-widest text-[var(--text)] mb-6">
					Assigned Tasks <span class="text-[var(--gold)]">{tasks.length > 0 ? `(${tasks.length})` : ''}</span>
				</h3>
				{#if tasks.length === 0}
					<p class="text-[13px] text-[var(--muted)] text-center py-6">No tasks assigned yet. Check back soon.</p>
				{:else}
					<div class="space-y-3">
						{#each tasks as task}
							<div class="p-4 bg-[var(--surface2)] border border-[var(--border)] rounded-xl">
								<div class="flex items-start justify-between gap-3 flex-wrap">
									<div class="min-w-0">
										<div class="text-[13px] font-bold text-[var(--text)] mb-1 truncate">{task.title}</div>
										<div class="text-[11px] text-[var(--muted)]">{task.description}</div>
										<div class="text-[10px] text-[var(--muted)] mt-2 font-['Space_Mono']">
											Due: {task.deadline ? new Date(task.deadline).toLocaleDateString('en-NG', { dateStyle: 'medium' }) : '—'}
										</div>
									</div>
									<span class="shrink-0 px-3 py-1 text-[9px] font-bold tracking-[2px] uppercase border rounded-lg {TASK_STATUS_COLORS[task.status] ?? ''}">
										{task.status.replace('_', ' ')}
									</span>
								</div>
								{#if task.report}
									<div class="mt-3 p-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[11px] text-[var(--muted2)] leading-relaxed">
										<strong class="text-[var(--gold)] text-[9px] uppercase tracking-widest block mb-1">Report</strong>
										{task.report}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</DashboardLayout>
