<script lang="ts">
	import DashboardLayout from '$lib/components/dashboard/DashboardLayout.svelte';
	import StatCard from '$lib/components/dashboard/StatCard.svelte';
	import RequestCard from '$lib/components/admin/RequestCard.svelte';
	import ApplicationCard from '$lib/components/admin/ApplicationCard.svelte';
	import DetailsModal from '$lib/components/admin/DetailsModal.svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';
	import { onMount } from 'svelte';
	import type { ApplicationData, ServiceRequestData, TaskData, BroadcastData, AuditLogData } from '$lib/constants';

	let applications = $state<ApplicationData[]>([]);
	let serviceRequests = $state<ServiceRequestData[]>([]);
	let auditLogs = $state<AuditLogData[]>([]);
	let activeSessions = $state<any[]>([]); // We didn't define SessionData yet, but this is fine for now

	let activeTab = $state('requests');
	let loading = $state(true);

	let maintenanceMode = $state(false);
	let registrationOpen = $state(true);
	let selectedItem = $state<ApplicationData | ServiceRequestData | null>(null);
	let showModal = $state(false);
	let broadcastMsg = $state('');
	let taskTitle = $state('');
	let taskDesc = $state('');
	let taskDeadline = $state('');
	let tasks = $state<TaskData[]>([]);
	let broadcasts = $state<BroadcastData[]>([]);
	let history = $state<(ApplicationData | ServiceRequestData)[]>([]);

	async function fetchData() {
		try {
			if (!api.functions?.getApplications || !api.functions?.getServiceRequests) {
				console.warn("Convex API functions not yet generated.");
				return;
			}
			const [apps, requests, logs, sessions, mm, ro, tks, bcasts, hist] = await Promise.all([
				convex.query(api.functions.getApplications, {}),
				convex.query(api.functions.getServiceRequests, {}),
				convex.query(api.functions.getAuditLogs, {}),
				convex.query(api.functions.getActiveSessions, {}),
				convex.query(api.functions.getSetting, { key: 'maintenance_mode' }),
				convex.query(api.functions.getSetting, { key: 'registration_open' }),
				convex.query(api.functions.getTasksForAdmin, {}),
				convex.query(api.functions.getLatestBroadcasts, {}),
				convex.query(api.functions.getHistory, {})
			]);
			applications = (apps as ApplicationData[])?.filter((a) => a.status !== 'declined') || [];
			serviceRequests = (requests as ServiceRequestData[])?.filter((r) => r.status === 'pending' || r.status === 'contacted') || [];
			history = [...((apps as ApplicationData[]) || []), ...((requests as ServiceRequestData[]) || [])].filter((i) => i.status === 'archived' || i.status === 'completed' || i.status === 'declined') || [];
			auditLogs = logs || [];
			activeSessions = sessions || [];
			maintenanceMode = mm;
			registrationOpen = ro;
			tasks = tks || [];
			broadcasts = bcasts || [];
		} catch (e) {
			console.error('Error fetching admin data:', e);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchData();
	});

	async function toggleSetting(key: string, currentVal: boolean) {
		await convex.mutation(api.functions.updateSetting, { key, value: !currentVal });
		fetchData();
	}

	async function handleBroadcast() {
		if (!broadcastMsg) return;
		await convex.mutation(api.functions.createBroadcast, { message: broadcastMsg, sender: 'Admin' });
		broadcastMsg = '';
		fetchData();
	}

	async function assignTask(assigneeId: any) {
		if (!taskTitle || !taskDesc || !taskDeadline) return;
		await convex.mutation(api.functions.createTask, {
			assigneeId,
			title: taskTitle,
			description: taskDesc,
			deadline: new Date(taskDeadline).getTime()
		});
		taskTitle = ''; taskDesc = ''; taskDeadline = '';
		showModal = false;
		fetchData();
	}

	async function updateAppStatus(id: any, status: string) {
		await convex.mutation(api.functions.updateApplicationStatus, { id, status: status as 'pending' | 'approved' | 'declined' });
		fetchData();
	}

	async function updateRequestStatus(id: any, status: string) {
		await convex.mutation(api.functions.updateServiceRequestStatus, { id, status: status as 'pending' | 'contacted' | 'completed' | 'archived' });
		fetchData();
	}

	let metrics = $derived([
		{ label: 'Total Applicants 👥', value: applications.length.toString(), trend: '+12%', icon: '👥', color: 'blue' },
		{ label: 'Service Requests 🛠️', value: serviceRequests.length.toString(), trend: '+5', icon: '📝', color: 'teal' },
		{ label: 'Platform Health 🏥', value: '99.9%', trend: 'STABLE', icon: '⚡', color: 'gold' },
		{ label: 'Pending Apps 🛡️', value: applications.filter(a => a.status === 'pending').length.toString(), trend: '-5', icon: '📝', color: 'gold' }
	]);

	const alerts = [
		{ type: 'Critical 🚨', message: 'New administrative access detected from unknown IP.', time: '2 mins ago' },
		{ type: 'Update 📢', message: 'E-WIN Hub scheduled maintenance complete.', time: '1 hour ago' },
		{ type: 'Growth 🚀', message: 'AkademyX reached 5,000 active students milestone!', time: '3 hours ago' }
	];


</script>

<svelte:head>
	<title>Admin Portal · E-WIN Project 🛡️</title>
</svelte:head>

<DashboardLayout title="Admin Command Center 🛡️" isAdmin={true}>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 reveal visible">
		{#each metrics as metric}
			<StatCard {...metric} />
		{/each}
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
		<!-- Maintenance Control -->
		<div class="lg:col-span-3 bg-surface border border-border rounded-[var(--radius)] p-6 shadow-2xl reveal visible flex flex-col md:flex-row items-center justify-between gap-8">
			<div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full md:w-auto">
				<div class="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-3 px-4 sm:px-0">
					<span class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Maintenance Mode 🛡️</span>
					<button 
						onclick={() => toggleSetting('maintenance_mode', maintenanceMode)}
						class="w-14 h-7 rounded-full transition-all relative {maintenanceMode ? 'bg-red-500' : 'bg-muted/30'}"
						aria-label={maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
					>
						<span class="absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-all {maintenanceMode ? 'translate-x-7' : 'translate-x-0'}"></span>
					</button>
				</div>
				<div class="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-3 px-4 sm:px-0">
					<span class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">IAM Registration 🌍</span>
					<button 
						onclick={() => toggleSetting('registration_open', registrationOpen)}
						class="w-14 h-7 rounded-full transition-all relative {registrationOpen ? 'bg-teal2' : 'bg-muted/30'}"
						aria-label={registrationOpen ? 'Close Registration' : 'Open Registration'}
					>
						<span class="absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-all {registrationOpen ? 'translate-x-7' : 'translate-x-0'}"></span>
					</button>
				</div>
			</div>
			
			<div class="w-full md:flex-grow md:max-w-md flex items-center gap-3">
				<input 
					type="text" 
					bind:value={broadcastMsg}
					placeholder="Broadcast to all users... 📢" 
					class="flex-grow bg-bg border border-border rounded-xl px-4 py-3 min-h-[44px] text-[12px] outline-none focus:border-gold"
				/>
				<button 
					onclick={handleBroadcast}
					class="px-6 py-3 min-h-[44px] bg-gold text-bg text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gold2"
				>
					Send 🚀
				</button>
			</div>
		</div>

		<!-- System Alerts -->
		<div class="bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl reveal visible delay-100">
			<div class="p-6 border-b border-border bg-surface2/50 flex items-center justify-between">
				<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">System Alerts 🚨</h3>
				<span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
			</div>
			<div class="p-6 space-y-4">
				{#each alerts as alert}
					<div class="p-4 bg-bg border border-border rounded-xl hover:border-gold-line transition-all">
						<div class="flex justify-between mb-1">
							<span class="text-[10px] font-['Space_Mono'] tracking-widest text-gold uppercase">{alert.type}</span>
							<span class="text-[9px] text-muted">{alert.time}</span>
						</div>
						<p class="text-[12px] text-text font-light">{alert.message}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Management Tabs -->
		<div class="lg:col-span-2 bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl reveal visible delay-200">
			<div class="p-6 border-b border-border bg-surface2/50">
				<div class="flex items-center gap-10 overflow-x-auto pb-2 scrollbar-hide">
					<button 
						onclick={() => activeTab = 'requests'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'requests' ? 'text-gold' : 'text-muted hover:text-text'} min-h-[44px]"
					>
						Requests 🛠️
					</button>
					<button 
						onclick={() => activeTab = 'applications'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'applications' ? 'text-gold' : 'text-muted hover:text-text'} min-h-[44px]"
					>
						IAM Apps 🌍
					</button>
					<button 
						onclick={() => activeTab = 'history'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'history' ? 'text-gold' : 'text-muted hover:text-text'} min-h-[44px]"
					>
						History 📦
					</button>
					<button 
						onclick={() => activeTab = 'tasks'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'tasks' ? 'text-gold' : 'text-muted hover:text-text'} min-h-[44px]"
					>
						Tasks 🎯
					</button>
					<button 
						onclick={() => activeTab = 'logs'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'logs' ? 'text-gold' : 'text-muted hover:text-text'} min-h-[44px]"
					>
						Audit Logs 📋
					</button>
					<button 
						onclick={() => activeTab = 'sessions'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'sessions' ? 'text-gold' : 'text-muted hover:text-text'} min-h-[44px]"
					>
						Sessions 👥
					</button>
				</div>
			</div>

			<div class="p-6">
				{#if loading}
					<div class="flex flex-col items-center justify-center py-20 gap-4">
						<div class="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
						<p class="text-sm md:text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Synchronizing Data...</p>
					</div>
				{:else}
					{#if activeTab === 'requests'}
						<div class="space-y-4" role="list" aria-label="Service requests">
							{#if serviceRequests.length === 0}
								<p class="text-center py-10 text-[var(--muted)] text-[12px]">No service requests yet.</p>
							{:else}
								{#each serviceRequests as request (request._id)}
									<div role="listitem">
										<RequestCard
											{request}
											onViewDetails={(r) => { selectedItem = r; showModal = true; }}
											onStatusChange={updateRequestStatus}
										/>
									</div>
								{/each}
							{/if}
						</div>
					{:else if activeTab === 'applications'}
						<div class="space-y-4" role="list" aria-label="IAM applications">
							{#if applications.length === 0}
								<p class="text-center py-10 text-[var(--muted)] text-[12px]">No IAM applications yet.</p>
							{:else}
								{#each applications as app (app._id)}
									<div role="listitem">
										<ApplicationCard
											application={app}
											onViewDetails={(a) => { selectedItem = a; showModal = true; }}
											onStatusChange={updateAppStatus}
										/>
									</div>
								{/each}
							{/if}
						</div>
					{:else if activeTab === 'history'}
						<div class="space-y-4">
							{#if history.length === 0}
								<p class="text-center py-10 text-muted text-sm md:text-[12px]">No archived history yet.</p>
							{:else}
								{#each history as item}
									<div class="p-4 bg-bg border border-border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center group hover:border-gold/30 transition-all opacity-70 hover:opacity-100 gap-4">
										<div class="flex items-center gap-4">
											<div class="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-sm md:text-[12px]">
												{'serviceType' in item ? '🛠️' : '🌍'}
											</div>
											<div>
												<h4 class="text-sm md:text-[13px] font-bold text-text">{item.fullName}</h4>
												<p class="text-sm md:text-[10px] text-muted uppercase tracking-tighter">
													{('serviceType' in item ? item.serviceType : '') || 'IAM Application'} · {new Date(item.createdAt).toLocaleDateString()}
												</p>
											</div>
										</div>
										<div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
											<span class="px-2 py-0.5 bg-surface text-muted text-sm md:text-[8px] font-bold uppercase tracking-widest rounded border border-border">
												{item.status}
											</span>
											<button 
												onclick={() => { selectedItem = item; showModal = true; }}
												class="p-4 min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-gold transition-colors"
											>
												📑
											</button>
										</div>
									</div>
								{/each}
							{/if}
						</div>
					{:else if activeTab === 'tasks'}
						<div class="space-y-4">
							{#if tasks.length === 0}
								<p class="text-center py-10 text-muted text-sm md:text-[12px]">No tasks assigned yet.</p>
							{:else}
								{#each tasks as task}
									<div class="p-6 bg-bg border border-border rounded-2xl group hover:border-gold-line transition-all">
										<div class="flex justify-between items-start mb-4 gap-4">
											<div>
												<h4 class="font-['Bebas_Neue'] text-xl tracking-widest text-text mb-1">{task.title}</h4>
												<p class="text-sm md:text-[11px] text-muted">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
											</div>
											<span class="px-3 py-1 bg-teal2/10 text-teal2 text-sm md:text-[9px] font-bold uppercase tracking-widest rounded border border-teal2/20">
												{task.status}
											</span>
										</div>
										<p class="text-sm md:text-[12px] text-text font-light mb-4 line-clamp-2">{task.description}</p>
										{#if task.report}
											<div class="p-4 bg-surface rounded-xl border border-border mt-4">
												<div class="text-sm md:text-[9px] text-gold uppercase tracking-widest mb-2 font-bold">Report Submitted 📋</div>
												<p class="text-sm md:text-[11px] italic font-light">"{task.report}"</p>
											</div>
										{/if}
									</div>
								{/each}
							{/if}
						</div>
					{:else if activeTab === 'logs'}
						<div class="space-y-4">
							{#if auditLogs.length === 0}
								<p class="text-center py-10 text-muted text-sm md:text-[12px]">No logs recorded.</p>
							{:else}
								{#each auditLogs as log}
									<div class="p-4 bg-bg border border-border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm md:text-[11px] gap-2">
										<div>
											<span class="text-gold font-bold uppercase tracking-widest">{log.action}</span>
											<span class="text-muted ml-0 sm:ml-3 block sm:inline">{log.payload?.email || 'System'}</span>
										</div>
										<span class="text-muted font-['Space_Mono']">{new Date(log.timestamp).toLocaleTimeString()}</span>
									</div>
								{/each}
							{/if}
						</div>
					{:else if activeTab === 'sessions'}
						<div class="space-y-4">
							{#if activeSessions.length === 0}
								<p class="text-center py-10 text-muted text-sm md:text-[12px]">No active sessions.</p>
							{:else}
								{#each activeSessions as session}
									<div class="p-4 bg-bg border border-border rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm md:text-[11px] gap-2">
										<div>
											<span class="text-gold font-bold uppercase tracking-widest">SESSION ID: {session.sessionId.slice(0, 8)}...</span>
											<span class="text-muted ml-0 sm:ml-3 block sm:inline">{session.email || 'Anonymous'}</span>
										</div>
										<div class="text-right">
											<div class="text-muted font-['Space_Mono']">{session.actionsCount} actions</div>
											<div class="text-[9px] text-muted opacity-50">{new Date(session.lastActivity).toLocaleString()}</div>
										</div>
									</div>
								{/each}
							{/if}
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>


	<!-- Details Modal — uses native <dialog> for focus trap + Escape key -->
	<DetailsModal
		item={selectedItem}
		open={showModal}
		onClose={() => {
			showModal = false;
			selectedItem = null;
		}}
	/>

</DashboardLayout>



