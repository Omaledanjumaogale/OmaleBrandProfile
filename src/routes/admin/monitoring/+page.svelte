<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '$convex/_generated/api';

	type MonitoringSnapshot = NonNullable<
		Awaited<ReturnType<typeof convex.query<typeof api.admin.getMonitoringSnapshot>>>
	>;

	let snapshot = $state<MonitoringSnapshot | null>(null);
	let loading = $state(true);

	onMount(() => {
		const unsubscribe = convex.onUpdate(api.admin.getMonitoringSnapshot, {}, (data) => {
			snapshot = data ?? null;
			loading = false;
		});
		return unsubscribe;
	});

	function statusClasses(status: string) {
		switch (status) {
			case 'online':
				return 'bg-teal-500/10 text-teal-300 border border-teal-500/20';
			case 'idle':
				return 'bg-blue-500/10 text-blue-200 border border-blue-500/20';
			default:
				return 'bg-amber-500/10 text-amber-200 border border-amber-500/20';
		}
	}
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
        {#if loading || !snapshot}
            <div class="col-span-full bg-[#0f0e0b] border border-white/5 rounded-2xl p-8 text-center text-white/30 font-['Space_Mono'] uppercase tracking-[3px]">
                Building live monitoring snapshot...
            </div>
        {:else}
        {#each snapshot.metrics as metric}
            <div class="bg-[#0f0e0b] border border-white/5 rounded-2xl p-6 hover:border-[#c9a84c]/20 transition-all">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-[10px] font-['Space_Mono'] text-white/30 uppercase tracking-widest">{metric.name}</span>
                    <span class="text-[10px] font-bold text-[var(--gold)] uppercase tracking-[2px]">
                        Live
                    </span>
                </div>
                <div class="flex items-end justify-between">
                    <span class="text-3xl font-bold text-white">{metric.value}</span>
                    <div class="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_#14b8a6]"></div>
                </div>
                <p class="text-[11px] text-white/35 mt-3 leading-relaxed">{metric.detail}</p>
            </div>
        {/each}
        {/if}
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
                    {#if snapshot}
                    {#each snapshot.systems as system}
                        <div class="flex items-center justify-between group">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">
                                    🌐
                                </div>
                                <div>
                                    <h4 class="text-[14px] font-bold text-white">{system.name}</h4>
                                    <p class="text-[11px] text-white/30 font-['Space_Mono']">{system.provider} · {system.location}</p>
                                    <p class="text-[11px] text-white/40 mt-1">{system.detail}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="px-3 py-1 rounded-lg {statusClasses(system.status)}">
                                    <span class="text-[9px] font-bold uppercase tracking-wider">{system.status}</span>
                                </div>
                            </div>
                        </div>
                    {/each}
                    {/if}
                </div>
            </div>
        </div>

        <!-- Health Summary -->
        <div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
            <div class="relative w-32 h-32 mb-6">
                <svg class="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" stroke-width="8" fill="transparent" class="text-white/5" />
                    <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        stroke-width="8"
                        fill="transparent"
                        stroke-dasharray="364"
                        stroke-dashoffset={snapshot ? 364 - (snapshot.healthScore / 100) * 364 : 364}
                        class="text-[var(--gold)]"
                    />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-2xl font-bold text-white">{snapshot?.healthScore ?? 0}%</span>
                    <span class="text-[9px] text-white/30 uppercase tracking-widest">Health</span>
                </div>
            </div>
            <h3 class="font-bold text-white mb-2">Infrastructure Confidence</h3>
            <p class="text-[11px] text-white/30 font-['Space_Mono'] leading-relaxed">
                Computed from live queue pressure, integration readiness, and locked-account risk in the unified application.
            </p>
            {#if snapshot}
                <div class="mt-6 w-full rounded-2xl bg-white/[0.02] border border-white/5 p-4 text-left">
                    <div class="text-[10px] uppercase tracking-[2px] text-white/30 font-['Space_Mono'] mb-3">Recent Events</div>
                    <div class="space-y-3 max-h-56 overflow-auto">
                        {#each snapshot.recentEvents.slice(0, 5) as event}
                            <div class="flex items-start justify-between gap-3 text-[11px]">
                                <div>
                                    <div class="text-white/80 font-medium">{event.action.replaceAll('_', ' ')}</div>
                                    <div class="text-white/30">{event.adminEmail}</div>
                                </div>
                                <div class="text-white/20 whitespace-nowrap">{new Date(event.timestamp).toLocaleTimeString()}</div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
