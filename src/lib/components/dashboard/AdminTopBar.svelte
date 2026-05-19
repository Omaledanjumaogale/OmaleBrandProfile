<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { toast } from '$lib/stores/toast.svelte';
    import Tooltip from '$lib/components/ui/Tooltip.svelte';
    import { subscribeToPush } from '$lib/push';
    
    let { sidebarOpen = $bindable() } = $props<{ sidebarOpen: boolean }>();
    let searchTerm = $state('');

    const adminDestinations = [
        { label: 'Overview', href: '/admin' },
        { label: 'Applications', href: '/admin/applications' },
        { label: 'Service Requests', href: '/admin/service-requests' },
        { label: 'User Directory', href: '/admin/users' },
        { label: 'Task Board', href: '/admin/tasks' },
        { label: 'Broadcasts', href: '/admin/broadcasts' },
        { label: 'Monitoring', href: '/admin/monitoring' },
        { label: 'Audit Logs', href: '/admin/audit' },
        { label: 'Settings', href: '/admin/settings' }
    ];

    async function handleActivatePush() {
        const sub = await subscribeToPush();
        if (sub) {
            toast.success("Real-time push notifications activated for this device.", "Push Active");
        } else {
            toast.info("Push subscription pending VAPID configuration.", "Push Protocol Status");
        }
    }

    function handleRouteSearch(event: SubmitEvent) {
        event.preventDefault();
        const query = searchTerm.trim().toLowerCase();
        if (!query) return;

        const match = adminDestinations.find((item) =>
            item.label.toLowerCase().includes(query) || item.href.toLowerCase().includes(query)
        );

        if (!match) {
            toast.info(`No admin route matched "${searchTerm}".`, 'Route Search');
            return;
        }

        goto(match.href);
        searchTerm = '';
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

        <form onsubmit={handleRouteSearch} class="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-xl">
            <span class="text-sm">🔍</span>
            <input 
                type="text" 
                bind:value={searchTerm}
                placeholder="Jump to routes, tools, or logs" 
                class="bg-transparent border-none outline-none text-[13px] text-white/60 w-64 placeholder:text-white/20"
            />
        </form>
    </div>

    <div class="flex items-center gap-4">
        <!-- System Health -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#22917a]/10 border border-[#22917a]/20 rounded-lg">
            <div class="w-2 h-2 rounded-full bg-[#22917a] animate-pulse"></div>
            <span class="text-[10px] font-['Space_Mono'] text-[#22917a] uppercase tracking-wider font-bold">Live Admin Telemetry</span>
            <Tooltip text="Operational state is derived from live Convex activity, queue pressure, and environment readiness." position="bottom" />
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
                <div class="text-[12px] font-bold text-white leading-none mb-1">{$page.data.adminEmail ?? 'Admin Session'}</div>
                <div class="text-[10px] text-[var(--gold)] font-medium uppercase tracking-tighter">Protected Control Plane</div>
            </div>
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#b89844] flex items-center justify-center text-xl shadow-lg shadow-[#c9a84c]/20">
                👨‍💻
            </div>
        </div>
    </div>
</header>
