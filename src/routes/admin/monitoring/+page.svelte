<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Tooltip from '$lib/components/ui/Tooltip.svelte';

    let health = $state({
        api: 'healthy',
        db: 'healthy',
        realtime: 'connected',
        latency: 12,
        uptime: '99.998%'
    });

    let metrics = $state([
        { name: 'Request Throughput', value: '42.5k', change: '+12%', status: 'nominal' },
        { name: 'Active WebSocket Nodes', value: '842', change: '+5%', status: 'nominal' },
        { name: 'Average Mutation Time', value: '142ms', change: '-8%', status: 'optimal' },
        { name: 'Error Rate (24h)', value: '0.002%', change: '0%', status: 'optimal' }
    ]);

    const systems = [
        { name: 'Edge Runtime', location: 'Global (Anycast)', provider: 'Cloudflare', status: 'online' },
        { name: 'Real-time Sync', location: 'us-east-1', provider: 'Convex', status: 'online' },
        { name: 'Identity Service', location: 'Global', provider: 'Firebase', status: 'online' },
        { name: 'Static Assets', location: 'Global CDN', provider: 'Vercel', status: 'online' }
    ];
</script>

<svelte:head>
    <title>System Health Monitoring — Admin Portal | E-WIN</title>
</svelte:head>

<div class="space-y-8">
    <!-- Header -->
    <div>
        <h1 class="font-['Bebas_Neue'] text-4xl tracking-widest text-white mb-2">Observability Command Center</h1>
        <p class="text-[12px] text-white/40 font-['Space_Mono'] uppercase tracking-widest">
            Infrastructure health and real-time performance metrics
        </p>
    </div>

    <!-- Live Status Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each metrics as metric}
            <div class="bg-[#0f0e0b] border border-white/5 rounded-2xl p-6 hover:border-[#c9a84c]/20 transition-all">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-[10px] font-['Space_Mono'] text-white/30 uppercase tracking-widest">{metric.name}</span>
                    <span class="text-[10px] font-bold {metric.change.startsWith('+') ? 'text-teal-500' : 'text-red-500'}">
                        {metric.change}
                    </span>
                </div>
                <div class="flex items-end justify-between">
                    <span class="text-3xl font-bold text-white">{metric.value}</span>
                    <div class="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_#14b8a6]"></div>
                </div>
            </div>
        {/each}
    </div>

    <!-- Infrastructure Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Service Status -->
        <div class="lg:col-span-2 bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-3xl overflow-hidden">
            <div class="px-8 py-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-white">Distributed Node Status</h3>
                <span class="px-3 py-1 bg-teal-500/10 text-teal-500 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-teal-500/20">
                    Live Cluster View
                </span>
            </div>
            <div class="p-8">
                <div class="space-y-6">
                    {#each systems as system}
                        <div class="flex items-center justify-between group">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
                                    🌐
                                </div>
                                <div>
                                    <h4 class="text-[14px] font-bold text-white">{system.name}</h4>
                                    <p class="text-[11px] text-white/30 font-['Space_Mono']">{system.provider} · {system.location}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="text-[10px] text-white/20 font-['Space_Mono'] uppercase">Lat: 12ms</span>
                                <div class="px-3 py-1 bg-[#22917a]/10 border border-[#22917a]/20 rounded-lg">
                                    <span class="text-[9px] font-bold text-[#22917a] uppercase tracking-wider">Online</span>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Latency Chart Placeholder -->
        <div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
            <div class="relative w-32 h-32 mb-6">
                <svg class="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" class="text-white/5" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" stroke-dasharray="364" stroke-dashoffset="36.4" class="text-[var(--gold)]" />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-2xl font-bold text-white">99%</span>
                    <span class="text-[9px] text-white/30 uppercase tracking-widest">Health</span>
                </div>
            </div>
            <h3 class="font-bold text-white mb-2">Infrastructure Confidence</h3>
            <p class="text-[11px] text-white/30 font-['Space_Mono'] leading-relaxed">
                Calculated based on real-time heartbeat analysis across global edge clusters.
            </p>
        </div>
    </div>
</div>
