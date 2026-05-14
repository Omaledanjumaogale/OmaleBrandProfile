<script lang="ts">
    import { onMount } from 'svelte';
    import { convex } from '$lib/convex';
    import { api } from '../../../../convex/_generated/api';
    import { fade, fly } from 'svelte/transition';
    import Tooltip from '$lib/components/ui/Tooltip.svelte';

    let users: any[] = $state([]);
    let loading = $state(true);
    let searchTerm = $state('');

    onMount(() => {
        const unsubscribe = convex.onUpdate(api.functions.getUsers, {}, (data) => {
            users = data ?? [];
            loading = false;
        });
        return unsubscribe;
    });

    const filteredUsers = $derived(
        users.filter(u => 
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    function getPlanColor(plan: string) {
        switch (plan) {
            case 'enterprise': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'pro': return 'text-[var(--gold)] bg-[var(--gold)]/10 border-[var(--gold)]/20';
            default: return 'text-white/40 bg-white/5 border-white/10';
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
                        <th class="px-6 py-4 text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">Status</th>
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
                                    <div class="flex items-center gap-2">
                                        <div class="w-1.5 h-1.5 rounded-full {user.subscriptionStatus === 'active' ? 'bg-teal-500' : 'bg-red-500'}"></div>
                                        <span class="text-[11px] font-bold uppercase tracking-widest text-white/70">{user.subscriptionStatus}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border {getPlanColor(user.plan)}">
                                        {user.plan}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-[11px] text-white/30 font-['Space_Mono']">
                                        {new Date(user.lastLogin).toLocaleDateString()}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <button class="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all" title="Edit Permissions">🛠️</button>
                                        <button class="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-500 transition-all" title="Suspend Account">⚠️</button>
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
