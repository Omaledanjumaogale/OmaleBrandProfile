<script lang="ts">
	import DashboardLayout from '$lib/components/dashboard/DashboardLayout.svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../convex/_generated/api';
	import { onMount } from 'svelte';
	import type { UserData } from '$lib/constants';

	let users = $state<UserData[]>([]);
	let searchQuery = $state('');
	let loading = $state(true);

	const filteredUsers = $derived(
		users.filter(u => 
			u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
			u.email.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	async function fetchUsers() {
		try {
			const res = await convex.query(api.functions.getUsers, {});
			users = (res as UserData[]) || [];
		} catch (e) {
			console.error('Error fetching users:', e);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchUsers();
	});

	async function toggleRole(user: UserData) {
		const newRole = user.role === 'admin' ? 'user' : 'admin';
		if (!confirm(`Are you sure you want to change ${user.name}'s role to ${newRole}?`)) return;
		
		await convex.mutation(api.functions.updateUserRole, { 
			id: user._id as any, 
			role: newRole 
		});
		fetchUsers();
	}

	async function toggleLock(user: UserData) {
		const newLockState = !user.isLocked;
		const action = newLockState ? 'lock' : 'unlock';
		if (!confirm(`Are you sure you want to ${action} ${user.name}'s account?`)) return;

		await convex.mutation(api.functions.toggleUserLock, { 
			id: user._id as any, 
			isLocked: newLockState 
		});
		fetchUsers();
	}

	async function updateStatus(user: UserData, status: 'active' | 'suspended' | 'pending') {
		if (!confirm(`Set ${user.name}'s status to ${status}?`)) return;

		await convex.mutation(api.functions.updateUserStatus, { 
			id: user._id as any, 
			status 
		});
		fetchUsers();
	}
</script>

<DashboardLayout title="User Management" isAdmin={true}>
	<div class="space-y-8">
		<!-- Header Actions -->
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-(--surface) p-8 rounded-(--radius) border border-(--border) shadow-2xl reveal visible">
			<div class="space-y-1">
				<h2 class="font-['Bebas_Neue'] text-3xl tracking-widest text-(--text)">Access Control 🛡️</h2>
				<p class="text-(--muted) text-[11px] font-['Space_Mono'] uppercase tracking-widest">Manage platform roles and security</p>
			</div>
			
			<div class="w-full md:max-w-md relative group">
				<span class="absolute left-4 top-1/2 -translate-y-1/2 text-gold transition-transform group-focus-within:scale-110">🔍</span>
				<input 
					type="text" 
					bind:value={searchQuery}
					placeholder="Search users by name or email..." 
					class="w-full bg-(--bg) border border-(--border) rounded-xl pl-12 pr-4 py-4 text-[12px] outline-none focus:border-(--gold) transition-all shadow-inner font-light"
				/>
			</div>
		</div>

		<!-- Users Table -->
		<div class="bg-(--surface) border border-(--border) rounded-(--radius) overflow-hidden shadow-2xl reveal visible delay-100">
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="bg-(--surface2)/50 border-b border-(--border)">
							<th class="px-8 py-5 text-(--gold) font-['Space_Mono'] text-[10px] uppercase tracking-widest">User</th>
							<th class="px-8 py-5 text-(--gold) font-['Space_Mono'] text-[10px] uppercase tracking-widest">Role</th>
							<th class="px-8 py-5 text-(--gold) font-['Space_Mono'] text-[10px] uppercase tracking-widest">Status</th>
							<th class="px-8 py-5 text-(--gold) font-['Space_Mono'] text-[10px] uppercase tracking-widest">Trust Score</th>
							<th class="px-8 py-5 text-(--gold) font-['Space_Mono'] text-[10px] uppercase tracking-widest text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-(--border)">
						{#if loading}
							<tr>
								<td colspan="5" class="px-8 py-20 text-center">
									<div class="flex flex-col items-center gap-4">
										<div class="w-8 h-8 border-4 border-(--gold)/30 border-t-(--gold) rounded-full animate-spin"></div>
										<p class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-(--muted)">Syncing Registry...</p>
									</div>
								</td>
							</tr>
						{:else if filteredUsers.length === 0}
							<tr>
								<td colspan="5" class="px-8 py-20 text-center text-(--muted) text-[12px] font-light">
									No users found matching your criteria.
								</td>
							</tr>
						{:else}
							{#each filteredUsers as user}
								<tr class="hover:bg-(--surface2)/30 transition-colors group">
									<td class="px-8 py-6">
										<div class="flex items-center gap-4">
											<div class="w-10 h-10 rounded-full bg-(--gold-dim) border border-(--gold-line) flex items-center justify-center text-(--gold) font-bold group-hover:scale-110 transition-transform">
												{user.name.charAt(0).toUpperCase()}
											</div>
											<div>
												<div class="text-(--text) font-bold text-[13px]">{user.name}</div>
												<div class="text-(--muted) text-[11px] font-light">{user.email}</div>
											</div>
										</div>
									</td>
									<td class="px-8 py-6">
										<span class="px-3 py-1 rounded text-[9px] font-bold uppercase tracking-widest border {user.role === 'admin' ? 'bg-gold/10 text-gold border-gold/20' : 'bg-teal2/10 text-teal2 border-teal2/20'}">
											{user.role}
										</span>
									</td>
									<td class="px-8 py-6">
										<div class="flex flex-col gap-1">
											<span class="text-[10px] font-medium {user.isLocked ? 'text-red-400' : 'text-emerald-400'}">
												{user.isLocked ? 'Locked 🔒' : 'Active ✅'}
											</span>
											<span class="text-[9px] text-(--muted) uppercase tracking-tighter italic">
												{user.status || 'Active'}
											</span>
										</div>
									</td>
									<td class="px-8 py-6">
										<div class="flex items-center gap-2">
											<div class="w-16 h-1.5 bg-(--bg) rounded-full overflow-hidden border border-(--border)">
												<div class="h-full bg-gold" style="width: {user.trustScore}%"></div>
											</div>
											<span class="text-[10px] font-['Space_Mono'] text-gold">{user.trustScore}</span>
										</div>
									</td>
									<td class="px-8 py-6 text-right">
										<div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
											<button 
												onclick={() => toggleRole(user)}
												title="Change Role"
												class="p-2 text-(--gold) hover:bg-(--gold-dim) rounded-lg transition-colors border border-transparent hover:border-(--gold-line)"
											>
												🎭
											</button>
											<button 
												onclick={() => toggleLock(user)}
												title={user.isLocked ? 'Unlock' : 'Lock'}
												class="p-2 {user.isLocked ? 'text-emerald-400' : 'text-red-400'} hover:bg-surface3 rounded-lg transition-colors border border-transparent hover:border-(--border)"
											>
												{user.isLocked ? '🔓' : '🔒'}
											</button>
											<select 
												value={user.status || 'active'}
												onchange={(e) => updateStatus(user, e.currentTarget.value as any)}
												class="bg-(--bg) border border-(--border) rounded-lg px-2 py-1 text-[9px] outline-none text-(--text) font-bold uppercase tracking-widest"
											>
												<option value="active">Active</option>
												<option value="suspended">Suspended</option>
												<option value="pending">Pending</option>
											</select>
										</div>
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</DashboardLayout>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.reveal.visible {
		opacity: 1;
		transform: translateY(0);
	}
	.delay-100 { transition-delay: 0.1s; }
</style>
