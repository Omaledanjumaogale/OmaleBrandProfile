<script lang="ts">
    import { toast } from '$lib/stores/toast.svelte';
    import Tooltip from '$lib/components/ui/Tooltip.svelte';
    import { subscribeToPush } from '$lib/push';
    
    let { sidebarOpen = $bindable() } = $props<{ sidebarOpen: boolean }>();

    async function handleActivatePush() {
        const sub = await subscribeToPush();
        if (sub) {
            toast.success("Real-time push notifications activated for this device.", "Push Active");
        } else {
            toast.info("Push subscription pending VAPID configuration.", "Push Protocol Status");
        }
    }
</script>

<header class="h-20 bg-[#0b0a07]/80 backdrop-blur-xl border-b border-[#c9a84c]/10 sticky top-0 z-[90] px-6 flex items-center justify-between">
    <div class="flex items-center gap-6">
        <button 
            onclick={() => sidebarOpen = !sidebarOpen}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white/60 hover:text-white"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>

        <div class="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-xl">
            <span class="text-sm">🔍</span>
            <input 
                type="text" 
                placeholder="Global Search (Ctrl + K)" 
                class="bg-transparent border-none outline-none text-[13px] text-white/60 w-64 placeholder:text-white/20"
            />
        </div>
    </div>

    <div class="flex items-center gap-4">
        <!-- System Health -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#22917a]/10 border border-[#22917a]/20 rounded-lg">
            <div class="w-2 h-2 rounded-full bg-[#22917a] animate-pulse"></div>
            <span class="text-[10px] font-['Space_Mono'] text-[#22917a] uppercase tracking-wider font-bold">Systems Nominal</span>
            <Tooltip text="All edge functions and database clusters are operating at zero latency." position="bottom" />
        </div>

        <div class="h-8 w-px bg-white/10 mx-2"></div>

        <!-- Notifications -->
        <button 
            onclick={handleActivatePush}
            aria-label="Activate push notifications"
            class="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-all text-white/40 hover:text-white"
        >
            <span>🔔</span>
            <div class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0b0a07]"></div>
            <Tooltip text="Activate real-time push notifications for this administrative node." position="bottom" />
        </button>

        <!-- User Profile -->
        <div class="flex items-center gap-3 pl-2">
            <div class="text-right hidden sm:block">
                <div class="text-[12px] font-bold text-white leading-none mb-1">Super Admin</div>
                <div class="text-[10px] text-[var(--gold)] font-medium uppercase tracking-tighter">Root Authority</div>
            </div>
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#b89844] flex items-center justify-center text-xl shadow-lg shadow-[#c9a84c]/20">
                👨‍💻
            </div>
        </div>
    </div>
</header>
