<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../../convex/_generated/api';
	import { currentUser } from '$lib/stores/auth';
	import { ui } from '$lib/stores/ui';

	let users: any[]    = $state([]);
	let loading = $state(true);
	let search  = $state('');
	let updating = $state<string | null>(null);

	onMount(() => {
		const unsub = convex.onUpdate(api.functions.getUsers, {}, (data) => {
			users = data ?? [];
			loading = false;
		});
		return unsub;
	});

	const filtered = $derived(() => {
		if (!search.trim()) return users;
		const q = search.toLowerCase();
		return users.filter(u =>
			u.email?.toLowerCase().includes(q) ||
			u.displayName?.toLowerCase().includes(q)
		);
	});

	async function setRole(id: string, role: 'admin' | 'user') {
		updating = id;
		try {
			await convex.mutation(api.functions.updateUserRole, { id: id as any, role, adminEmail: $currentUser?.email ?? undefined });
			ui.success(`User role updated to ${role}.`);
		} catch (e: any) { ui.error(e.message); }
		finally { updating = null; }
	}

	async function toggleLock(id: string, isLocked: boolean) {
		updating = id;
		try {
			await convex.mutation(api.functions.toggleUserLock, { id: id as any, isLocked: !isLocked, adminEmail: $currentUser?.email ?? undefined });
			ui.success(isLocked ? 'User unlocked.' : 'User locked.');
		} catch (e: any) { ui.error(e.message); }
		finally { updating = null; }
	}

	const fmt = (ts?: number) => ts ? new Date(ts).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—';
	const roleColor = (r: string) => r === 'admin' ? 'bg-[#c9a84c]/15 text-[#c9a84c] border-[#c9a84c]/30' : 'bg-white/5 text-white/50 border-white/10';
</script>

<svelte:head><title>Users — Admin | E-WIN</title></svelte:head>

<div class="space-y-5 max-w-[1200px] mx-auto">
	<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
		<div>
			<h1 class="font-['Bebas_Neue'] text-3xl tracking-widest text-white">Users</h1>
			<p class="text-[11px] text-white/40 font-['Space_Mono'] mt-0.5">{users.length} registered</p>
		</div>
		<input type="search" bind:value={search} placeholder="Search by name or email..."
			class="w-full sm:w-72 bg-[#0f0e0b] border border-[#c9a84c]/20 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#c9a84c]/50 outline-none transition-colors" />
	</div>

	<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full text-[13px]">
				<thead>
					<tr class="border-b border-[#c9a84c]/10">
						{#each ['User','Email','Role','Status','Joined','Actions'] as col}
							<th class="text-left px-5 py-3.5 text-white/30 font-['Space_Mono'] text-[10px] uppercase tracking-wider whitespace-nowrap">{col}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="divide-y divide-[#c9a84c]/5">
					{#if loading}
						<tr><td colspan="6" class="px-5 py-10 text-center text-white/30">Loading...</td></tr>
					{:else if filtered().length === 0}
						<tr><td colspan="6" class="px-5 py-10 text-center text-white/30">No users found.</td></tr>
					{:else}
						{#each filtered() as user}
							<tr class="hover:bg-white/2 transition-colors">
								<td class="px-5 py-3">
									<div class="flex items-center gap-3">
										<div class="w-8 h-8 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c] font-bold text-sm shrink-0">
											{(user.displayName?.[0] ?? user.email?.[0] ?? '?').toUpperCase()}
										</div>
										<span class="text-white font-medium">{user.displayName ?? 'Unknown'}</span>
									</div>
								</td>
								<td class="px-5 py-3 text-white/60">{user.email}</td>
								<td class="px-5 py-3">
									<span class="text-[10px] font-['Space_Mono'] uppercase px-2.5 py-1 rounded-full border {roleColor(user.role)}">{user.role ?? 'user'}</span>
								</td>
								<td class="px-5 py-3">
									<span class="flex items-center gap-1.5 text-[11px] {user.isLocked ? 'text-red-400' : 'text-teal-400'}">
										<span class="w-1.5 h-1.5 rounded-full bg-current"></span>
										{user.isLocked ? 'Locked' : 'Active'}
									</span>
								</td>
								<td class="px-5 py-3 text-white/40 font-['Space_Mono'] text-[11px]">{fmt(user.createdAt)}</td>
								<td class="px-5 py-3">
									<div class="flex gap-2">
										{#if (user.role ?? 'user') !== 'admin'}
											<button type="button" disabled={updating === user._id} onclick={() => setRole(user._id, 'admin')}
												class="px-3 py-1.5 min-h-[32px] bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-[#c9a84c]/20 disabled:opacity-40 transition-all active:scale-95">
												Make Admin
											</button>
										{:else}
											<button type="button" disabled={updating === user._id} onclick={() => setRole(user._id, 'user')}
												class="px-3 py-1.5 min-h-[32px] bg-white/5 text-white/50 border border-white/10 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-white/10 disabled:opacity-40 transition-all active:scale-95">
												Remove Admin
											</button>
										{/if}
										<button type="button" disabled={updating === user._id} onclick={() => toggleLock(user._id, user.isLocked)}
											class="px-3 py-1.5 min-h-[32px] text-[10px] font-bold uppercase tracking-wider rounded-lg disabled:opacity-40 transition-all active:scale-95 border
												{user.isLocked ? 'bg-teal-500/15 text-teal-400 border-teal-500/30 hover:bg-teal-500/25' : 'bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25'}">
											{user.isLocked ? 'Unlock' : 'Lock'}
										</button>
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
