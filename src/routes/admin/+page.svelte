<script lang="ts">
    import { onMount } from 'svelte';
    import { convex } from '$lib/convex';
    import { api } from '$convex/_generated/api';
    import { fade, fly, scale } from 'svelte/transition';
    import Tooltip from '$lib/components/ui/Tooltip.svelte';

    let stats = $state({
        totalUsers: 0,
        pendingApps: 0,
        activeRequests: 0,
        systemHealth: 100
    });

    let recentActivity: any[] = $state([]);
    let loading = $state(true);

    onMount(() => {
        // Real-time Platform Stats
        const unsubStats = convex.onUpdate(api.admin.getPlatformStats, {}, (data) => {
            if (data) stats = data;
        });

        // Real-time Activity Feed
        const unsubLogs = convex.onUpdate(api.functions.getAuditLogs, { 
            paginationOpts: { numItems: 8, cursor: null } 
        }, (data) => {
            recentActivity = data?.page ?? [];
            loading = false;
        });

        return () => {
            unsubStats();
            unsubLogs();
        };
    });

    function formatAction(action: string) {
        return action.replace(/_/g, ' ').toLowerCase();
    }
</script>

<svelte:head>
    <title>Enterprise Command Center | E-WIN</title>
</svelte:head>

<div class="space-y-10">
    <!-- Welcome Header -->
    <div in:fade>
        <h1 class="font-['Bebas_Neue'] text-5xl lg:text-6xl tracking-widest text-white leading-none mb-3">
            COMMAND <span class="text-[var(--gold)]">CENTER</span>
        </h1>
        <div class="flex items-center gap-4">
            <p class="text-[12px] text-white/40 font-['Space_Mono'] uppercase tracking-[4px]">Platform Operational Intelligence</p>
            <div class="h-px flex-grow bg-white/5"></div>
            <span class="text-[10px] text-[var(--gold)] font-bold uppercase tracking-widest px-3 py-1 border border-[var(--gold)]/20 rounded-full bg-[var(--gold)]/5">
                Live Session: {new Date().toLocaleDateString()}
            </span>
        </div>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each [
            { label: 'Platform Users', value: stats.totalUsers, icon: '👥', color: 'blue', help: 'Total verified users across all platform nodes.' },
            { label: 'Pending Applications', value: stats.pendingApps, icon: '📋', color: 'gold', help: 'Workforce applications awaiting administrative review.' },
            { label: 'Service Requests', value: stats.activeRequests, icon: '📥', color: 'teal', help: 'Open service inquiries currently in the pipeline.' },
            { label: 'System Uptime', value: stats.systemHealth + '%', icon: '⚡', color: 'green', help: 'Real-time infrastructure health score.' }
        ] as metric, i}
            <div 
                in:scale={{ delay: i * 100, duration: 600, start: 0.95 }}
                class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-3xl p-8 hover:border-[#c9a84c]/30 transition-all group relative overflow-hidden"
            >
                <div class="absolute top-0 right-0 w-24 h-24 bg-[var(--gold)]/5 rounded-full blur-3xl group-hover:bg-[var(--gold)]/10 transition-all"></div>
                
                <div class="flex items-center justify-between mb-6">
                    <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {metric.icon}
                    </div>
                    <Tooltip text={metric.help} position="left" />
                </div>
                
                <div class="space-y-1">
                    <h3 class="text-3xl font-bold text-white tracking-tighter">{metric.value}</h3>
                    <p class="text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/30">{metric.label}</p>
                </div>
            </div>
        {/each}
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Live Activity Feed -->
        <div class="lg:col-span-2 bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-3xl overflow-hidden shadow-2xl">
            <div class="px-8 py-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <h2 class="font-['Bebas_Neue'] text-2xl tracking-widest text-white">Live Activity Stream</h2>
                <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
                    <span class="text-[9px] font-bold text-white/40 uppercase tracking-widest">Real-time Pulse</span>
                </div>
            </div>
            <div class="p-4 sm:p-8">
                <div class="space-y-6">
                    {#if loading}
                        <div class="py-12 text-center text-white/10 font-mono text-[11px] tracking-widest uppercase">Syncing with Convex Nodes...</div>
                    {:else if recentActivity.length === 0}
                        <div class="py-12 text-center text-white/10">No recent system mutations detected.</div>
                    {:else}
                        {#each recentActivity as log, i}
                            <div in:fly={{ x: -20, delay: i * 50 }} class="flex items-start gap-4 group">
                                <div class="w-2 h-2 rounded-full bg-[var(--gold)] mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
                                <div class="flex-grow">
                                    <div class="flex items-center justify-between gap-4 mb-1">
                                        <h4 class="text-[13px] font-bold text-white uppercase tracking-tight capitalize">{formatAction(log.action)}</h4>
                                        <span class="text-[10px] text-white/20 font-mono whitespace-nowrap">
                                            {new Date(log.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p class="text-[12px] text-white/40 font-medium">
                                        <span class="text-[var(--gold)]/60">@{log.adminEmail || 'system'}</span> performed mutation on cluster.
                                    </p>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
            </div>
            <div class="p-6 bg-white/[0.01] border-t border-white/5 text-center">
                <a href="/admin/audit" class="text-[10px] font-bold text-[var(--gold)] uppercase tracking-[3px] hover:text-white transition-colors">View Complete Audit Trail →</a>
            </div>
        </div>

        <!-- Quick Actions & Tools -->
        <div class="space-y-8">
            <div class="bg-[#0f0e0b] border border-[#c9a84c]/20 rounded-3xl p-8 shadow-2xl">
                <h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-white mb-6">Strategic Actions</h3>
                <div class="grid grid-cols-1 gap-3">
                    <a href="/admin/broadcasts" class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-[var(--gold)]/10 border border-white/5 hover:border-[var(--gold)]/20 transition-all text-left group">
                        <span class="text-xl grayscale group-hover:grayscale-0 transition-all">📢</span>
                        <div>
                            <div class="text-[12px] font-bold text-white group-hover:text-[var(--gold)] transition-colors">Broadcast Message</div>
                            <div class="text-[10px] text-white/30 uppercase tracking-tighter">Instant Edge Notification</div>
                        </div>
                    </a>
                    <a href="/admin/applications" class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-teal-500/10 border border-white/5 hover:border-teal-500/20 transition-all text-left group">
                        <span class="text-xl grayscale group-hover:grayscale-0 transition-all">👤</span>
                        <div>
                            <div class="text-[12px] font-bold text-white group-hover:text-teal-400 transition-colors">New User Audit</div>
                            <div class="text-[10px] text-white/30 uppercase tracking-tighter">Review Pending Accounts</div>
                        </div>
                    </a>
                    <a href="/admin/settings" class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 transition-all text-left group">
                        <span class="text-xl grayscale group-hover:grayscale-0 transition-all">🛑</span>
                        <div>
                            <div class="text-[12px] font-bold text-white group-hover:text-red-400 transition-colors">Maintenance Toggle</div>
                            <div class="text-[10px] text-white/30 uppercase tracking-tighter">Global Emergency Lock</div>
                        </div>
                    </a>
                </div>
            </div>

            <!-- Server Status Widget -->
            <div class="bg-gradient-to-br from-[#14b8a6]/10 to-[#0f0e0b] border border-[#14b8a6]/20 rounded-3xl p-8 relative overflow-hidden">
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>
                <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-3 h-3 rounded-full bg-[#14b8a6] animate-pulse shadow-[0_0_8px_#14b8a6]"></div>
                        <h4 class="text-[11px] font-bold text-[#14b8a6] uppercase tracking-[3px]">Nodes Nominal</h4>
                    </div>
                    <p class="text-[13px] text-white/60 leading-relaxed font-medium">
                        All Convex edge functions and Firebase clusters are operating at zero reported latency.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
