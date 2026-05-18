<script lang="ts">
    import { onMount } from 'svelte';
    import { convex } from '$lib/convex';
    import { api } from '$convex/_generated/api';
    import { fade, fly } from 'svelte/transition';
    import Tooltip from '$lib/components/ui/Tooltip.svelte';

    let logs: any[] = $state([]);
    let loading = $state(true);
    let searchTerm = $state('');
    let filterAction = $state('all');

    onMount(() => {
        const unsubscribe = convex.onUpdate(api.functions.getAuditLogs, {}, (data) => {
            logs = data ?? [];
            loading = false;
        });
        return unsubscribe;
    });

    const filteredLogs = $derived(
        logs.filter(log => {
            const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 (log.adminEmail && log.adminEmail.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesAction = filterAction === 'all' || log.action.startsWith(filterAction);
            return matchesSearch && matchesAction;
        })
    );

    function formatTime(ts: number) {
        return new Date(ts).toLocaleString('en-GB', {
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    }

    function getActionColor(action: string) {
        if (action.includes('FAILED')) return 'text-red-500';
        if (action.includes('SUBMIT')) return 'text-teal-400';
        if (action.includes('BROADCAST')) return 'text-amber-400';
        return 'text-white/70';
    }
</script>

<svelte:head>
    <title>Audit Logs — Admin Portal | E-WIN</title>
</svelte:head>

<div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
            <div class="flex items-center gap-3 mb-2">
                <h1 class="font-['Bebas_Neue'] text-4xl tracking-widest text-white">System Audit Trail</h1>
                <Tooltip text="Immutable, real-time record of every significant administrative action and system mutation." position="right" />
            </div>
            <p class="text-[12px] text-white/40 font-['Space_Mono'] uppercase tracking-widest">
                Forensic visibility into platform operations
            </p>
        </div>

        <div class="flex items-center gap-4">
            <button 
                aria-label="Export audit logs as CSV"
                class="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
            >
                Export CSV
            </button>
        </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-[#0f0e0b] border border-white/5 rounded-2xl px-4 py-2 flex items-center gap-3">
            <span aria-hidden="true" class="text-white/20">🔍</span>
            <input 
                type="text" 
                bind:value={searchTerm}
                aria-label="Search audit actions or administrators"
                placeholder="Search action or admin..." 
                class="bg-transparent border-none outline-none text-[13px] text-white/80 w-full placeholder:text-white/20"
            />
        </div>

        <select 
            bind:value={filterAction}
            aria-label="Filter audit logs by action category"
            class="bg-[#0f0e0b] border border-white/5 rounded-2xl px-4 py-3 text-[13px] text-white/80 outline-none focus:border-[#c9a84c]/40 transition-all appearance-none cursor-pointer"
        >
            <option value="all">All Actions</option>
            <option value="SYSTEM">System Events</option>
            <option value="APPLICATION">Application Events</option>
            <option value="SERVICE">Service Events</option>
            <option value="BROADCAST">Broadcast Events</option>
        </select>
    </div>

    <!-- Log Table -->
    <div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-3xl overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-white/5 bg-white/[0.02]">
                        <th class="px-6 py-4 text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">Timestamp</th>
                        <th class="px-6 py-4 text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">Action Event</th>
                        <th class="px-6 py-4 text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">Initiator</th>
                        <th class="px-6 py-4 text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">Payload Snippet</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                    {#if loading}
                        <tr><td colspan="4" class="px-6 py-20 text-center text-white/20">Establishing secure connection to Convex...</td></tr>
                    {:else if filteredLogs.length === 0}
                        <tr><td colspan="4" class="px-6 py-20 text-center text-white/20">No matching logs found in the current audit window.</td></tr>
                    {:else}
                        {#each filteredLogs as log, i}
                            <tr 
                                in:fly={{ x: -10, delay: i * 30, duration: 300 }}
                                class="hover:bg-white/[0.02] transition-colors group"
                            >
                                <td class="px-6 py-4 text-[12px] text-white/40 font-['Space_Mono']">
                                    {formatTime(log.timestamp)}
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-[13px] font-bold font-mono tracking-tight {getActionColor(log.action)}">
                                        {log.action}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <div class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-[10px]">👤</div>
                                        <span class="text-[13px] text-white/70">{log.adminEmail || 'System'}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="max-w-[300px] truncate text-[11px] text-white/30 font-mono bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                                        {JSON.stringify(log.payload)}
                                    </div>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    </div>

    <!-- Footer Stats -->
    <div class="flex items-center justify-between px-6 py-4 bg-white/2 rounded-2xl border border-white/5">
        <p class="text-[11px] text-white/30">
            Showing <strong class="text-white/60">{filteredLogs.length}</strong> entries from the last 30 days.
        </p>
        <div class="flex gap-2">
            <button class="p-2 text-white/20 hover:text-white transition-colors" disabled>←</button>
            <button class="p-2 text-white/20 hover:text-white transition-colors" disabled>→</button>
        </div>
    </div>
</div>
