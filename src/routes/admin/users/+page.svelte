<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { convex } from '$lib/convex';
	import { api } from '$convex/_generated/api';
	import { ui } from '$lib/stores/ui';

	type Role = 'user' | 'admin';
	type Plan = 'free' | 'pro' | 'enterprise';
	type SubscriptionStatus = 'active' | 'inactive' | 'pending';

	type AdminUser = {
		_id: string;
		name: string;
		email: string;
		image?: string;
		role: Role;
		plan: Plan;
		subscriptionStatus: SubscriptionStatus;
		lastLogin: number;
		isLocked?: boolean;
	};

	let users = $state<AdminUser[]>([]);
	let loading = $state(true);
	let savingUserId = $state<string | null>(null);
	let searchTerm = $state('');

	onMount(() => {
		const unsubscribe = convex.onUpdate(api.functions.getUsers, {}, (data) => {
			users = (data ?? []) as AdminUser[];
			loading = false;
		});
		return unsubscribe;
	});

	const filteredUsers = $derived(
		users.filter(
			(u) =>
				u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				u.email.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	function getPlanColor(plan: Plan) {
		switch (plan) {
			case 'enterprise':
				return 'text-purple-300 bg-purple-400/10 border-purple-400/20';
			case 'pro':
				return 'text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20';
			default:
				return 'text-white/40 bg-white/5 border-white/10';
		}
	}

	async function persistUser(user: AdminUser, message: string) {
		savingUserId = String(user._id);
		try {
			await convex.mutation(api.functions.updateUserAdminState, {
				userId: user._id as any,
				role: user.role,
				plan: user.plan,
				subscriptionStatus: user.subscriptionStatus,
				isLocked: Boolean(user.isLocked)
			});
			ui.success(message, 'User Updated');
		} catch (e: any) {
			ui.error(e.message || 'Failed to update user.');
		} finally {
			savingUserId = null;
		}
	}
</script>

<svelte:head>
    <title>User Management — Admin Portal | E-WIN</title>
</svelte:head>

<div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
            <h1 class="font-['Bebas_Neue'] text-4xl tracking-widest text-white mb-2">Platform Identity Directory</h1>
            <p class="text-[12px] text-white/40 font-['Space_Mono'] uppercase tracking-widest">
                Manage accounts, roles, and platform permissions
            </p>
        </div>

        <div class="flex items-center gap-3 bg-[#0f0e0b] border border-white/5 rounded-2xl px-4 py-2 w-full sm:w-80">
            <span class="text-white/20">🔍</span>
            <input 
                type="text" 
                bind:value={searchTerm}
                placeholder="Search by name or email..." 
                class="bg-transparent border-none outline-none text-[13px] text-white/80 w-full placeholder:text-white/20"
            />
        </div>
    </div>

    <!-- User Table -->
    <div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-3xl overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-white/5 bg-white/[0.02]">
                        <th class="px-6 py-4 text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">Identity</th>
                        <th class="px-6 py-4 text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">Access</th>
                        <th class="px-6 py-4 text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">Billing Tier</th>
                        <th class="px-6 py-4 text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">Last Activity</th>
                        <th class="px-6 py-4 text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    {#if loading}
                        <tr><td colspan="5" class="px-6 py-20 text-center text-white/20 font-['Space_Mono'] tracking-widest">ESTABLISHING CRYPTOGRAPHIC HANDSHAKE...</td></tr>
                    {:else if filteredUsers.length === 0}
                        <tr><td colspan="5" class="px-6 py-20 text-center text-white/20">No matching user records identified.</td></tr>
                    {:else}
                        {#each filteredUsers as user, i}
                            <tr 
                                in:fly={{ y: 10, delay: i * 30 }}
                                class="hover:bg-white/[0.02] transition-colors group"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg border border-white/5 group-hover:border-[var(--gold)]/20 transition-all">
                                            {user.image ? '🖼️' : '👤'}
                                        </div>
                                        <div>
                                            <div class="text-[14px] font-bold text-white leading-none mb-1">{user.name}</div>
                                            <div class="text-[11px] text-white/30 font-mono">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="space-y-2 min-w-[180px]">
                                        <select bind:value={user.role} class="w-full bg-[#0b0a07] border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white/70 uppercase tracking-widest">
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <select bind:value={user.subscriptionStatus} class="w-full bg-[#0b0a07] border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white/70 uppercase tracking-widest">
                                            <option value="active">Active</option>
                                            <option value="pending">Pending</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="space-y-2 min-w-[150px]">
                                        <span class="inline-flex px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border {getPlanColor(user.plan)}">
                                            {user.plan}
                                        </span>
                                        <select bind:value={user.plan} class="w-full bg-[#0b0a07] border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white/70 uppercase tracking-widest">
                                            <option value="free">Free</option>
                                            <option value="pro">Pro</option>
                                            <option value="enterprise">Enterprise</option>
                                        </select>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-[11px] text-white/30 font-['Space_Mono']">
                                        {new Date(user.lastLogin).toLocaleDateString()}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex flex-col sm:flex-row gap-2 min-w-[220px]">
                                        <button
                                            onclick={() => persistUser(user, `Saved access profile for ${user.name}.`)}
                                            disabled={savingUserId === String(user._id)}
                                            class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-[11px] uppercase tracking-[2px] font-bold disabled:opacity-50"
                                            title="Save User Access"
                                        >
                                            {savingUserId === String(user._id) ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            onclick={() => {
                                                user.isLocked = !user.isLocked;
                                                persistUser(
                                                    user,
                                                    `${user.isLocked ? 'Locked' : 'Unlocked'} ${user.name}'s account.`
                                                );
                                            }}
                                            disabled={savingUserId === String(user._id)}
                                            class="px-4 py-2 rounded-xl {user.isLocked ? 'bg-teal-500/10 text-teal-200 border border-teal-500/20' : 'bg-red-500/10 text-red-200 border border-red-500/20'} transition-all text-[11px] uppercase tracking-[2px] font-bold disabled:opacity-50"
                                            title={user.isLocked ? 'Unlock Account' : 'Lock Account'}
                                        >
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
