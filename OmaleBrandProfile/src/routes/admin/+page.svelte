<script lang="ts">
	import DashboardLayout from '$lib/components/dashboard/DashboardLayout.svelte';
	import StatCard from '$lib/components/dashboard/StatCard.svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';
	import { onMount } from 'svelte';

	let applications = $state([]);
	let serviceRequests = $state([]);
	let auditLogs = $state([]);
	let activeSessions = $state([]);
	let activeTab = $state('requests'); // 'requests', 'applications', 'logs', 'sessions'
	let loading = $state(true);

	async function fetchData() {
		try {
			if (!api.functions?.getApplications || !api.functions?.getServiceRequests) {
				console.warn("Convex API functions not yet generated.");
				return;
			}
			const [apps, requests, logs, sessions] = await Promise.all([
				convex.query(api.functions.getApplications),
				convex.query(api.functions.getServiceRequests),
				convex.query(api.functions.getAuditLogs),
				convex.query(api.functions.getActiveSessions)
			]);
			applications = apps || [];
			serviceRequests = requests || [];
			auditLogs = logs || [];
			activeSessions = sessions || [];
		} catch (e) {
			console.error('Error fetching admin data:', e);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchData();
	});

	async function updateAppStatus(id, status) {
		await convex.mutation(api.functions.updateApplicationStatus, { id, status });
		fetchData();
	}

	async function updateRequestStatus(id, status) {
		await convex.mutation(api.functions.updateServiceRequestStatus, { id, status });
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
			<div class="p-6 border-b border-border bg-surface2/50 flex items-center justify-between">
				<div class="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
					<button 
						onclick={() => activeTab = 'requests'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'requests' ? 'text-gold' : 'text-muted hover:text-text'}"
					>
						Requests 🛠️
					</button>
					<button 
						onclick={() => activeTab = 'applications'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'applications' ? 'text-gold' : 'text-muted hover:text-text'}"
					>
						IAM Apps 🌍
					</button>
					<button 
						onclick={() => activeTab = 'logs'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'logs' ? 'text-gold' : 'text-muted hover:text-text'}"
					>
						Audit Logs 📋
					</button>
					<button 
						onclick={() => activeTab = 'sessions'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'sessions' ? 'text-gold' : 'text-muted hover:text-text'}"
					>
						Sessions 👥
					</button>
				</div>
			</div>

			<div class="p-6">
				{#if loading}
					<div class="flex flex-col items-center justify-center py-20 gap-4">
						<div class="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
						<p class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Synchronizing Data...</p>
					</div>
				{:else}
					{#if activeTab === 'requests'}
						<div class="space-y-4">
							{#if serviceRequests.length === 0}
								<p class="text-center py-10 text-muted text-[12px]">No service requests yet.</p>
							{:else}
								{#each serviceRequests as request}
									<div class="p-6 bg-bg border border-border rounded-2xl group hover:border-gold-line transition-all">
										<div class="flex justify-between items-start mb-4">
											<div>
												<div class="flex items-center gap-3 mb-1">
													<h4 class="font-['Bebas_Neue'] text-xl tracking-widest text-text">{request.fullName}</h4>
													<span class="px-2 py-0.5 bg-gold/10 text-gold text-[9px] font-bold uppercase tracking-widest rounded">{request.serviceType}</span>
												</div>
												<p class="text-[11px] text-muted">{request.email} {request.company ? `· ${request.company}` : ''}</p>
											</div>
											<div class="flex gap-2">
												<select 
													value={request.status} 
													onchange={(e) => updateRequestStatus(request._id, e.target.value)}
													class="bg-surface border border-border text-[10px] font-bold uppercase tracking-widest rounded px-2 py-1 outline-none focus:border-gold"
												>
													<option value="pending">Pending</option>
													<option value="contacted">Contacted</option>
													<option value="completed">Completed</option>
													<option value="archived">Archived</option>
												</select>
											</div>
										</div>
										<p class="text-[12px] text-text font-light mb-4 bg-surface/50 p-3 rounded-lg border border-border/50">{request.description}</p>
										<div class="flex justify-between items-center text-[10px] font-['Space_Mono'] uppercase tracking-widest">
											<span class="text-gold">Budget: {request.budget || 'N/A'}</span>
											<span class="text-muted">{new Date(request.createdAt).toLocaleDateString()}</span>
										</div>
									</div>
								{/each}
							{/if}
						</div>
					{:else}
						<div class="space-y-4">
							{#if applications.length === 0}
								<p class="text-center py-10 text-muted text-[12px]">No IAM applications yet.</p>
							{:else}
								{#each applications as app}
									<div class="p-6 bg-bg border border-border rounded-2xl group hover:border-gold-line transition-all">
										<div class="flex justify-between items-start mb-4">
											<div>
												<h4 class="font-['Bebas_Neue'] text-xl tracking-widest text-text mb-1">{app.fullName}</h4>
												<p class="text-[11px] text-muted">{app.email} · {app.mobileNumber}</p>
											</div>
											<select 
												value={app.status} 
												onchange={(e) => updateAppStatus(app._id, e.target.value)}
												class="bg-surface border border-border text-[10px] font-bold uppercase tracking-widest rounded px-2 py-1 outline-none focus:border-gold"
											>
												<option value="pending">Pending</option>
												<option value="approved">Approved</option>
												<option value="declined">Declined</option>
											</select>
										</div>
										<div class="grid grid-cols-2 gap-4 mb-4 text-[11px]">
											<div class="text-muted">Skills: <span class="text-text">{app.skills}</span></div>
											<div class="text-muted">Target: <span class="text-text">{app.monthlyEarningsTarget}</span></div>
										</div>
										<p class="text-[11px] text-muted italic line-clamp-2">"{app.motivationalStatement}"</p>
									</div>
								{/each}
							{/if}
						</div>
					{:else if activeTab === 'logs'}
						<div class="space-y-4">
							{#if auditLogs.length === 0}
								<p class="text-center py-10 text-muted text-[12px]">No logs recorded.</p>
							{:else}
								{#each auditLogs as log}
									<div class="p-4 bg-bg border border-border rounded-xl flex justify-between items-center text-[11px]">
										<div>
											<span class="text-gold font-bold uppercase tracking-widest">{log.action}</span>
											<span class="text-muted ml-3">{log.payload?.email || 'System'}</span>
										</div>
										<span class="text-muted font-['Space_Mono']">{new Date(log.timestamp).toLocaleTimeString()}</span>
									</div>
								{/each}
							{/if}
						</div>
					{:else if activeTab === 'sessions'}
						<div class="space-y-4">
							{#if activeSessions.length === 0}
								<p class="text-center py-10 text-muted text-[12px]">No active sessions.</p>
							{:else}
								{#each activeSessions as session}
									<div class="p-4 bg-bg border border-border rounded-xl flex justify-between items-center text-[11px]">
										<div>
											<span class="text-gold font-bold uppercase tracking-widest">SESSION ID: {session.sessionId.slice(0, 8)}...</span>
											<span class="text-muted ml-3">{session.email || 'Anonymous'}</span>
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
</DashboardLayout>
