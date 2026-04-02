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
	let activeTab = $state('requests'); // 'requests', 'applications', 'history', 'logs', 'sessions', 'tasks', 'broadcast'
	let loading = $state(true);

	// New States
	let maintenanceMode = $state(false);
	let registrationOpen = $state(true);
	let selectedItem = $state(null);
	let showModal = $state(false);
	let broadcastMsg = $state('');
	let taskTitle = $state('');
	let taskDesc = $state('');
	let taskDeadline = $state('');
	let tasks = $state([]);
	let broadcasts = $state([]);
	let history = $state([]);

	async function fetchData() {
		try {
			if (!api.functions?.getApplications || !api.functions?.getServiceRequests) {
				console.warn("Convex API functions not yet generated.");
				return;
			}
			const [apps, requests, logs, sessions, mm, ro, tks, bcasts, hist] = await Promise.all([
				convex.query(api.functions.getApplications),
				convex.query(api.functions.getServiceRequests),
				convex.query(api.functions.getAuditLogs),
				convex.query(api.functions.getActiveSessions),
				convex.query(api.functions.getSetting, { key: 'maintenance_mode' }),
				convex.query(api.functions.getSetting, { key: 'registration_open' }),
				convex.query(api.functions.getTasksForAdmin || api.functions.getApplications),
				convex.query(api.functions.getLatestBroadcasts),
				convex.query(api.functions.getHistory || api.functions.getServiceRequests) // Placeholder until backend function is ready
			]);
			applications = apps?.filter(a => a.status !== 'archived' && a.status !== 'declined') || [];
			serviceRequests = requests?.filter(r => r.status === 'pending' || r.status === 'contacted') || [];
			history = [...(apps || []), ...(requests || [])].filter(i => i.status === 'archived' || i.status === 'completed' || i.status === 'declined') || [];
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

	async function toggleSetting(key, currentVal) {
		await convex.mutation(api.functions.updateSetting, { key, value: !currentVal });
		fetchData();
	}

	async function handleBroadcast() {
		if (!broadcastMsg) return;
		await convex.mutation(api.functions.createBroadcast, { message: broadcastMsg, sender: 'Admin' });
		broadcastMsg = '';
		fetchData();
	}

	async function assignTask(assigneeId) {
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
		<!-- Maintenance Control -->
		<div class="lg:col-span-3 bg-surface border border-border rounded-[var(--radius)] p-6 shadow-2xl reveal visible flex items-center justify-between gap-6">
			<div class="flex items-center gap-10">
				<div class="flex items-center gap-3">
					<span class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Maintenance Mode 🛡️</span>
					<button 
						onclick={() => toggleSetting('maintenance_mode', maintenanceMode)}
						class="w-12 h-6 rounded-full transition-all relative {maintenanceMode ? 'bg-red-500' : 'bg-muted/30'}"
					>
						<span class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all {maintenanceMode ? 'translate-x-6' : 'translate-x-0'}"></span>
					</button>
				</div>
				<div class="flex items-center gap-3">
					<span class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">IAM Registration 🌍</span>
					<button 
						onclick={() => toggleSetting('registration_open', registrationOpen)}
						class="w-12 h-6 rounded-full transition-all relative {registrationOpen ? 'bg-teal2' : 'bg-muted/30'}"
					>
						<span class="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all {registrationOpen ? 'translate-x-6' : 'translate-x-0'}"></span>
					</button>
				</div>
			</div>
			
			<div class="flex-grow max-w-md flex items-center gap-3">
				<input 
					type="text" 
					bind:value={broadcastMsg}
					placeholder="Broadcast to all users... 📢" 
					class="flex-grow bg-bg border border-border rounded-xl px-4 py-2 text-[12px] outline-none focus:border-gold"
				/>
				<button 
					onclick={handleBroadcast}
					class="px-4 py-2 bg-gold text-bg text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gold2"
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
						onclick={() => activeTab = 'history'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'history' ? 'text-gold' : 'text-muted hover:text-text'}"
					>
						History 📦
					</button>
					<button 
						onclick={() => activeTab = 'tasks'}
						class="font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap {activeTab === 'tasks' ? 'text-gold' : 'text-muted hover:text-text'}"
					>
						Tasks 🎯
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
												<button 
													onclick={() => { selectedItem = request; showModal = true; }}
													class="px-3 py-1 bg-gold/10 text-gold text-[9px] font-bold uppercase tracking-widest rounded border border-gold/20 hover:bg-gold/20"
												>
													View Details 📑
												</button>
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
										<p class="text-[12px] text-text font-light mb-4 bg-surface/50 p-3 rounded-lg border border-border/50 line-clamp-2">{request.description}</p>
									</div>
								{/each}
							{/if}
						</div>
					{:else if activeTab === 'applications'}
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
											<div class="flex gap-2">
												<button 
													onclick={() => { selectedItem = app; showModal = true; }}
													class="px-3 py-1 bg-gold/10 text-gold text-[9px] font-bold uppercase tracking-widest rounded border border-gold/20 hover:bg-gold/20"
												>
													View Form 📄
												</button>
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
										</div>
										<p class="text-[11px] text-muted italic line-clamp-1">"{app.motivationalStatement}"</p>
									</div>
								{/each}
							{/if}
						</div>
					{:else if activeTab === 'history'}
						<div class="space-y-4">
							{#if history.length === 0}
								<p class="text-center py-10 text-muted text-[12px]">No archived history yet.</p>
							{:else}
								{#each history as item}
									<div class="p-4 bg-bg border border-border rounded-xl flex justify-between items-center group hover:border-gold/30 transition-all opacity-70 hover:opacity-100">
										<div class="flex items-center gap-4">
											<div class="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-[12px]">
												{item.serviceType ? '🛠️' : '🌍'}
											</div>
											<div>
												<h4 class="text-[13px] font-bold text-text">{item.fullName}</h4>
												<p class="text-[10px] text-muted uppercase tracking-tighter">
													{item.serviceType || 'IAM Application'} · {new Date(item.createdAt).toLocaleDateString()}
												</p>
											</div>
										</div>
										<div class="flex items-center gap-3">
											<span class="px-2 py-0.5 bg-surface text-muted text-[8px] font-bold uppercase tracking-widest rounded border border-border">
												{item.status}
											</span>
											<button 
												onclick={() => { selectedItem = item; showModal = true; }}
												class="p-2 hover:text-gold transition-colors"
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
								<p class="text-center py-10 text-muted text-[12px]">No tasks assigned yet.</p>
							{:else}
								{#each tasks as task}
									<div class="p-6 bg-bg border border-border rounded-2xl group hover:border-gold-line transition-all">
										<div class="flex justify-between items-start mb-4">
											<div>
												<h4 class="font-['Bebas_Neue'] text-xl tracking-widest text-text mb-1">{task.title}</h4>
												<p class="text-[11px] text-muted">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
											</div>
											<span class="px-3 py-1 bg-teal2/10 text-teal2 text-[9px] font-bold uppercase tracking-widest rounded border border-teal2/20">
												{task.status}
											</span>
										</div>
										<p class="text-[12px] text-text font-light mb-4 line-clamp-2">{task.description}</p>
										{#if task.report}
											<div class="p-4 bg-surface rounded-xl border border-border mt-4">
												<div class="text-[9px] text-gold uppercase tracking-widest mb-2 font-bold">Report Submitted 📋</div>
												<p class="text-[11px] italic font-light">"{task.report}"</p>
											</div>
										{/if}
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

	<!-- Details Modal -->
	{#if showModal && selectedItem}
		<div class="fixed inset-0 z-[100] flex items-center justify-center p-6">
			<button class="absolute inset-0 bg-bg/90 backdrop-blur-xl border-none" onclick={() => showModal = false}></button>
			<div class="bg-surface border border-border w-full max-w-2xl rounded-3xl p-10 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
				<div class="flex justify-between items-start mb-10">
					<div>
						<div class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-gold mb-2">Detailed Documentation 📑</div>
						<h2 class="font-['Bebas_Neue'] text-4xl tracking-widest">{selectedItem.fullName}</h2>
						<p class="text-muted text-[13px]">{selectedItem.email}</p>
					</div>
					<button class="text-2xl text-muted hover:text-text" onclick={() => showModal = false}>✕</button>
				</div>

				<div class="space-y-8">
					{#if selectedItem.serviceType}
						<!-- Service Request Details -->
						<div class="grid grid-cols-2 gap-6">
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">WhatsApp / Mobile</label>
								<div class="p-3 bg-bg border border-border rounded-xl text-[12px]">{selectedItem.whatsappNumber} / {selectedItem.mobileNumber}</div>
							</div>
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Preferred Medium</label>
								<div class="p-3 bg-bg border border-border rounded-xl text-[12px] text-gold font-bold">{selectedItem.preferredCommunication}</div>
							</div>
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Best Time to Reach</label>
								<div class="p-3 bg-bg border border-border rounded-xl text-[12px]">{selectedItem.bestTimeToReach}</div>
							</div>
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Urgency</label>
								<div class="p-3 bg-bg border border-border rounded-xl text-[12px] text-teal2 font-bold">{selectedItem.urgency}</div>
							</div>
						</div>

						<div class="space-y-2">
							<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Location & Address</label>
							<div class="p-4 bg-bg border border-border rounded-xl text-[12px] leading-relaxed">
								{selectedItem.address}<br/>
								<span class="text-gold">{selectedItem.lgaOfResidence}, {selectedItem.stateOfResidence}</span>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-8">
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Service Category & Need</label>
								<div class="p-4 bg-bg border border-border rounded-xl text-gold font-bold">
									{selectedItem.serviceType}<br/>
									<span class="text-[10px] text-muted font-normal uppercase tracking-tighter">Type: {selectedItem.needType}</span>
								</div>
							</div>
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Budget Estimate</label>
								<div class="p-4 bg-bg border border-border rounded-xl font-bold">{selectedItem.budget || 'N/A'}</div>
							</div>
						</div>
						<div class="space-y-2">
							<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Project Description</label>
							<div class="p-6 bg-bg border border-border rounded-2xl text-[14px] leading-relaxed font-light">{selectedItem.description}</div>
						</div>
						<div class="flex gap-4 pt-4">
							<a href="mailto:{selectedItem.email}" class="flex-grow py-4 bg-gold text-bg text-[11px] font-bold uppercase tracking-widest rounded-xl text-center">Send Quotation 📩</a>
							<button 
								onclick={async () => {
									await updateRequestStatus(selectedItem._id, 'archived');
									showModal = false;
								}}
								class="flex-grow py-4 border border-border text-text text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-surface"
							>
								Archive Request 📦
							</button>
						</div>
					{:else}
						<!-- IAM Application Details -->
						<div class="grid grid-cols-2 gap-6">
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Mobile / WhatsApp</label>
								<div class="p-3 bg-bg border border-border rounded-xl text-[12px]">{selectedItem.mobileNumber} / {selectedItem.whatsappNumber}</div>
							</div>
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">NIN Verification</label>
								<div class="p-3 bg-bg border border-border rounded-xl text-[12px] font-['Space_Mono']">{selectedItem.nin}</div>
							</div>
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Location</label>
								<div class="p-3 bg-bg border border-border rounded-xl text-[12px]">{selectedItem.stateOfResidence}, {selectedItem.lgaOfResidence}</div>
							</div>
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Earnings Target</label>
								<div class="p-3 bg-bg border border-border rounded-xl text-[12px] text-gold font-bold">{selectedItem.monthlyEarningsTarget}</div>
							</div>
						</div>

						<div class="space-y-6">
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Professional Background</label>
								<div class="p-4 bg-bg border border-border rounded-xl text-[13px]">{selectedItem.academicBackground}</div>
							</div>
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Skills & Expertise</label>
								<div class="p-4 bg-bg border border-border rounded-xl text-[13px] text-teal2">{selectedItem.skills}</div>
							</div>
							<div class="space-y-2">
								<label class="text-[10px] uppercase tracking-widest text-muted font-bold">Motivational Statement</label>
								<div class="p-6 bg-bg border border-border rounded-2xl text-[13px] leading-relaxed italic">"{selectedItem.motivationalStatement}"</div>
							</div>
						</div>

						{#if selectedItem.status === 'approved'}
							<div class="mt-10 p-8 border border-gold/30 bg-gold/5 rounded-3xl space-y-6">
								<div class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-gold text-center">Assign Strategic Task 🎯</div>
								<input type="text" bind:value={taskTitle} placeholder="Task Title (e.g., Market Research)" class="w-full bg-bg border border-border rounded-xl px-5 py-3 text-[13px] outline-none focus:border-gold" />
								<textarea bind:value={taskDesc} placeholder="Task Description & Deliverables..." class="w-full bg-bg border border-border rounded-xl px-5 py-3 text-[13px] h-32 outline-none focus:border-gold"></textarea>
								<div class="flex gap-4">
									<input type="date" bind:value={taskDeadline} class="flex-grow bg-bg border border-border rounded-xl px-5 py-3 text-[13px] outline-none" />
									<button onclick={() => assignTask(selectedItem._id)} class="px-8 py-3 bg-gold text-bg text-[11px] font-bold uppercase tracking-widest rounded-xl">Assign Task 🚀</button>
								</div>
							</div>
						{/if}
					{/if}
				</div>
			</div>
		</div>
	{/if}
</DashboardLayout>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: var(--border);
		border-radius: 10px;
	}
</style>
