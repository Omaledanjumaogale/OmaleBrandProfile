<script lang="ts">
    import { onMount } from 'svelte';
    import { convex } from '$lib/convex';
    import { api } from '../../../../convex/_generated/api';
    import { ui } from '$lib/stores/ui';
    import { fade, fly } from 'svelte/transition';
    import Tooltip from '$lib/components/ui/Tooltip.svelte';

    let broadcasts: any[] = $state([]);
    let loading = $state(true);
    let sending = $state(false);

    let newBroadcast = $state({
        title: '',
        message: '',
        type: 'info' as 'info' | 'warning' | 'critical' | 'update'
    });

    onMount(() => {
        const unsubscribe = convex.onUpdate(api.admin.getBroadcasts, {}, (data) => {
            broadcasts = data ?? [];
            loading = false;
        });
        return unsubscribe;
    });

    async function handleSend() {
        if (!newBroadcast.title || !newBroadcast.message) return;
        
        sending = true;
        try {
            await convex.mutation(api.admin.sendBroadcast, {
                title: newBroadcast.title,
                message: newBroadcast.message,
                type: newBroadcast.type
            });
            ui.success("Broadcast deployed successfully.", "System Updated");
            newBroadcast = { title: '', message: '', type: 'info' };
        } catch (e) {
            ui.error("Failed to transmit broadcast.");
        } finally {
            sending = false;
        }
    }

    function getTypeColor(type: string) {
        switch (type) {
            case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'warning': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'update': return 'bg-teal-500/10 text-teal-500 border-teal-500/20';
            default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        }
    }
</script>

<svelte:head>
    <title>System Broadcasts — Admin Portal | E-WIN</title>
</svelte:head>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Broadcast Creator -->
    <div class="lg:col-span-1 space-y-6">
        <div class="bg-[#0f0e0b] border border-[#c9a84c]/20 rounded-3xl p-8 shadow-2xl sticky top-28">
            <h2 class="font-['Bebas_Neue'] text-3xl tracking-widest text-white mb-6 flex items-center gap-3">
                DEPLOY BROADCAST
                <Tooltip text="Broadcasts are instantly pushed to all active platform sessions via Convex WebSockets." />
            </h2>

            <div class="space-y-4">
                <div class="space-y-2">
                    <label for="event-title" class="text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40 ml-1">Event Title</label>
                    <input 
                        id="event-title"
                        type="text" 
                        bind:value={newBroadcast.title}
                        placeholder="Maintenance Schedule, Update, etc."
                        class="w-full bg-[#0b0a07] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:border-[var(--gold)] outline-none transition-all"
                    />
                </div>

                <div class="space-y-2">
                    <span class="text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40 ml-1 block">Broadcast Type</span>
                    <div class="grid grid-cols-2 gap-2" role="group" aria-label="Broadcast category selection">
                        {#each ['info', 'warning', 'critical', 'update'] as type}
                            <button 
                                onclick={() => newBroadcast.type = type as any}
                                aria-label="Select {type} type"
                                aria-pressed={newBroadcast.type === type}
                                class="px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider border transition-all
                                    {newBroadcast.type === type 
                                        ? 'border-[var(--gold)] bg-[var(--gold)] text-[#0b0a07]' 
                                        : 'border-white/5 bg-white/5 text-white/40 hover:text-white'}"
                            >
                                {type}
                            </button>
                        {/each}
                    </div>
                </div>

                <div class="space-y-2">
                    <label for="urgent-message" class="text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40 ml-1">Urgent Message</label>
                    <textarea 
                        id="urgent-message"
                        bind:value={newBroadcast.message}
                        rows="4"
                        placeholder="Enter the critical announcement content here..."
                        class="w-full bg-[#0b0a07] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:border-[var(--gold)] outline-none transition-all resize-none"
                    ></textarea>
                </div>

                <button 
                    onclick={handleSend}
                    disabled={sending || !newBroadcast.title || !newBroadcast.message}
                    aria-label="Send broadcast message"
                    class="w-full bg-[var(--gold)] text-[#0b0a07] font-bold py-4 rounded-xl uppercase tracking-[3px] text-[12px] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-4 shadow-lg shadow-[#c9a84c]/20"
                >
                    {sending ? 'TRANSMITTING...' : 'INITIATE BROADCAST 🛰️'}
                </button>
            </div>
        </div>
    </div>

    <!-- Active Broadcasts List -->
    <div class="lg:col-span-2 space-y-6">
        <div class="flex items-center justify-between mb-2">
            <h2 class="font-['Bebas_Neue'] text-3xl tracking-widest text-white">Transmission History</h2>
            <div class="flex items-center gap-2 px-3 py-1 bg-[#22917a]/10 border border-[#22917a]/20 rounded-lg">
                <div class="w-1.5 h-1.5 rounded-full bg-[#22917a] animate-pulse"></div>
                <span class="text-[9px] font-bold text-[#22917a] uppercase tracking-wider">WebSocket Active</span>
            </div>
        </div>

        <div class="space-y-4">
            {#if loading}
                <div class="p-20 text-center text-white/10 font-['Space_Mono'] tracking-widest">
                    SYNCING BROADCAST NODES...
                </div>
            {:else if broadcasts.length === 0}
                <div class="p-20 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-3xl text-white/20 font-['Space_Mono']">
                    NO BROADCASTS TRANSMITTED YET.
                </div>
            {:else}
                {#each broadcasts as b, i}
                    <div 
                        in:fly={{ y: 20, delay: i * 50 }}
                        class="bg-[#0f0e0b] border border-white/5 rounded-2xl p-6 hover:border-[#c9a84c]/30 transition-all group"
                    >
                        <div class="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border mb-2 inline-block {getTypeColor(b.type)}">
                                    {b.type}
                                </span>
                                <h3 class="text-lg font-bold text-white group-hover:text-[var(--gold)] transition-colors">{b.title}</h3>
                            </div>
                            <span class="text-[11px] text-white/20 font-['Space_Mono']">
                                {new Date(b.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <p class="text-white/60 text-[14px] leading-relaxed mb-6">
                            {b.message}
                        </p>
                        <div class="flex items-center justify-between pt-4 border-t border-white/5">
                            <span class="text-[10px] text-white/20 uppercase tracking-widest">Target: {b.target || 'GLOBAL_ALL'}</span>
                            <button 
                                aria-label="Deactivate broadcast transmission"
                                class="text-[10px] text-red-500/40 hover:text-red-500 font-bold uppercase tracking-widest transition-colors"
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>
