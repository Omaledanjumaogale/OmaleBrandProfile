<script lang="ts">
	import DashboardLayout from '$lib/components/dashboard/DashboardLayout.svelte';
	import StatCard from '$lib/components/dashboard/StatCard.svelte';

	const platformMetrics = [
		{ name: 'E-WIN Hub 🏢', users: '12,500', growth: '+15%', status: 'Active ✅' },
		{ name: 'DealxHire 💼', users: '4,200', growth: '+22%', status: 'Active ✅' },
		{ name: 'AkademyX 🎓', users: '8,900', growth: '+30%', status: 'Maintenance 🛠️' },
		{ name: 'Alt AkademyX 💡', users: '3,100', growth: '+8%', status: 'Active ✅' },
		{ name: 'I-AM Network 👥', users: '1,500', growth: '+5%', status: 'Coming Soon ⏳' }
	];
</script>

<svelte:head>
	<title>Admin Portal · E-WIN Project 🛡️</title>
</svelte:head>

<DashboardLayout title="Admin Overview 📊" isAdmin={true}>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 reveal visible">
		<StatCard label="Total Platform Users 👥" value="30,200" trend="+18.5%" icon="👤" color="teal" />
		<StatCard label="Monthly Revenue 💰" value="₦12.5M" trend="+22%" icon="💳" color="gold" />
		<StatCard label="System Health 🛡️" value="99.9%" trend="STABLE" icon="🛠️" color="teal" />
		<StatCard label="Pending Verifications 📋" value="142" trend="-12" icon="⏳" color="red" />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal visible delay-200">
		<!-- Platform Performance Table -->
		<div class="lg:col-span-2 bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl relative">
			<div class="p-6 border-b border-border flex items-center justify-between bg-surface2/50">
				<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">Ecosystem Performance 🏢</h3>
				<button class="text-[10px] tracking-widest uppercase text-gold hover:underline">Download Report 📄</button>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm font-light">
					<thead class="bg-bg text-muted uppercase text-[10px] tracking-widest font-bold">
						<tr>
							<th class="px-6 py-4">Platform Name</th>
							<th class="px-6 py-4">Active Users</th>
							<th class="px-6 py-4">Growth (MoM)</th>
							<th class="px-6 py-4">Status</th>
							<th class="px-6 py-4">Action</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border">
						{#each platformMetrics as metric}
							<tr class="hover:bg-bg/50 transition-colors">
								<td class="px-6 py-5 font-semibold text-text">{metric.name}</td>
								<td class="px-6 py-5 text-muted2">{metric.users}</td>
								<td class="px-6 py-5 text-teal font-bold">{metric.growth}</td>
								<td class="px-6 py-5 text-xs tracking-widest font-medium">{metric.status}</td>
								<td class="px-6 py-5">
									<button class="bg-gold-dim border border-gold-line text-gold px-3 py-1.5 rounded-md text-[9px] tracking-widest uppercase hover:bg-gold hover:text-bg transition-all">Manage</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- System Analytics -->
		<div class="bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl">
			<div class="p-6 border-b border-border bg-surface2/50">
				<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">Real-Time Insights 📈</h3>
			</div>
			<div class="p-6 space-y-8">
				<div>
					<div class="flex items-center justify-between mb-2">
						<span class="text-[10px] tracking-widest text-muted uppercase font-bold">Server Load 🖥️</span>
						<span class="text-[10px] tracking-widest text-teal font-bold">14% OPTIMAL ✅</span>
					</div>
					<div class="h-2 bg-bg rounded-full overflow-hidden border border-border">
						<div class="h-full bg-teal2 rounded-full" style="width: 14%"></div>
					</div>
				</div>
				<div>
					<div class="flex items-center justify-between mb-2">
						<span class="text-[10px] tracking-widest text-muted uppercase font-bold">Storage Capacity 🗄️</span>
						<span class="text-[10px] tracking-widest text-gold font-bold">62% CAPACITY 📂</span>
					</div>
					<div class="h-2 bg-bg rounded-full overflow-hidden border border-border">
						<div class="h-full bg-gold rounded-full" style="width: 62%"></div>
					</div>
				</div>
				<div>
					<div class="flex items-center justify-between mb-2">
						<span class="text-[10px] tracking-widest text-muted uppercase font-bold">Global API Response 🌐</span>
						<span class="text-[10px] tracking-widest text-teal font-bold">120ms FAST ⚡</span>
					</div>
					<div class="h-2 bg-bg rounded-full overflow-hidden border border-border">
						<div class="h-full bg-teal rounded-full" style="width: 90%"></div>
					</div>
				</div>
				<div class="pt-4 border-t border-border">
					<div class="flex items-center gap-4 p-4 bg-gold-dim border border-gold-line rounded-xl">
						<div class="text-2xl">🛡️</div>
						<div>
							<h4 class="text-[10px] tracking-widest text-gold font-bold uppercase mb-1">Security Shield Active 🔒</h4>
							<p class="text-[9px] text-muted2 leading-relaxed font-light">Last intrusion attempt blocked from IP 192.168.1.1 🛡️</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</DashboardLayout>