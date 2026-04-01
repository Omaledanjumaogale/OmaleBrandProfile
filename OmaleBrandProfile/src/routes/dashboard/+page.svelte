<script lang="ts">
	import DashboardLayout from '$lib/components/dashboard/DashboardLayout.svelte';
	import StatCard from '$lib/components/dashboard/StatCard.svelte';

	const recentTransactions = [
		{ id: '#TX-8271', date: '2026-03-31', amount: '₦25,000', status: 'Completed ✅', type: 'E-Deals' },
		{ id: '#TX-8272', date: '2026-03-30', amount: '₦12,500', status: 'Pending ⏳', type: 'AkademyX' },
		{ id: '#TX-8273', date: '2026-03-29', amount: '₦45,000', status: 'Completed ✅', type: 'DealxHire' },
		{ id: '#TX-8274', date: '2026-03-28', amount: '₦8,000', status: 'Failed ❌', type: 'E-Deals' }
	];
</script>

<svelte:head>
	<title>User Dashboard · E-WIN Project 📊</title>
</svelte:head>

<DashboardLayout title="User Overview 📈" isAdmin={false}>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 reveal visible">
		<StatCard label="Total Earnings 💰" value="₦124,500" trend="+12.5%" icon="💵" color="teal" />
		<StatCard label="Active Projects 🏗️" value="7" trend="+2" icon="🚀" color="gold" />
		<StatCard label="Course Progress 🎓" value="84%" trend="+5%" icon="📖" color="blue" />
		<StatCard label="Trust Score 🛡️" value="98/100" trend="PERFECT" icon="🛡️" color="gold" />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal visible delay-200">
		<!-- Recent Activity Table -->
		<div class="lg:col-span-2 bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl relative">
			<div class="p-6 border-b border-border flex items-center justify-between bg-surface2/50">
				<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">Recent Transactions 💳</h3>
				<button class="text-[10px] tracking-widest uppercase text-gold hover:underline">View All →</button>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm font-light">
					<thead class="bg-bg text-muted uppercase text-[10px] tracking-widest font-bold">
						<tr>
							<th class="px-6 py-4">Transaction ID</th>
							<th class="px-6 py-4">Platform</th>
							<th class="px-6 py-4">Date</th>
							<th class="px-6 py-4">Amount</th>
							<th class="px-6 py-4">Status</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border">
						{#each recentTransactions as tx}
							<tr class="hover:bg-bg/50 transition-colors">
								<td class="px-6 py-5 font-['Space_Mono'] text-gold text-xs">{tx.id}</td>
								<td class="px-6 py-5 text-text">{tx.type}</td>
								<td class="px-6 py-5 text-muted2">{tx.date}</td>
								<td class="px-6 py-5 font-semibold text-text">{tx.amount}</td>
								<td class="px-6 py-5 text-xs tracking-widest font-medium">{tx.status}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Notifications / Updates -->
		<div class="bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl">
			<div class="p-6 border-b border-border bg-surface2/50">
				<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">Platform Updates 🔔</h3>
			</div>
			<div class="p-6 space-y-6">
				<div class="flex gap-4 p-4 bg-bg border border-border rounded-xl group hover:border-gold-line transition-all">
					<div class="text-2xl">🎓</div>
					<div>
						<h4 class="text-[12px] tracking-widest text-text font-bold uppercase mb-1">AkademyX Reward 🏆</h4>
						<p class="text-[11px] text-muted2 leading-relaxed font-light">You've unlocked the "AI Prompt Specialist" badge. Check your profile! 🚀</p>
					</div>
				</div>
				<div class="flex gap-4 p-4 bg-bg border border-border rounded-xl group hover:border-gold-line transition-all">
					<div class="text-2xl">🛡️</div>
					<div>
						<h4 class="text-[12px] tracking-widest text-text font-bold uppercase mb-1">Security Audit ✅</h4>
						<p class="text-[11px] text-muted2 leading-relaxed font-light">Your bi-weekly security audit passed with a score of 98. Stay secure! 🔒</p>
					</div>
				</div>
				<div class="flex gap-4 p-4 bg-bg border border-border rounded-xl group hover:border-gold-line transition-all">
					<div class="text-2xl">🌍</div>
					<div>
						<h4 class="text-[12px] tracking-widest text-text font-bold uppercase mb-1">E-WIN Network 🌐</h4>
						<p class="text-[11px] text-muted2 leading-relaxed font-light">New collaborative gig available in Lagos area. Apply now! 💼</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</DashboardLayout>