<script lang="ts">
    import AdminSidebar from '$lib/components/dashboard/AdminSidebar.svelte';
    import AdminTopBar from '$lib/components/dashboard/AdminTopBar.svelte';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    let { children } = $props();
    let sidebarOpen = $state(true);

    // Auto-collapse sidebar on smaller screens
    onMount(() => {
        if (window.innerWidth < 1024) {
            sidebarOpen = false;
        }
    });
</script>

<div class="min-h-screen bg-[#0b0a07] text-white selection:bg-[var(--gold)] selection:text-[#0b0a07]">
    <!-- Navigation Layer -->
    <AdminSidebar isOpen={sidebarOpen} />

    <!-- Content Layer -->
    <div 
        class="transition-all duration-300 min-h-screen flex flex-col"
        style="margin-left: {sidebarOpen ? '256px' : '80px'}"
    >
        <AdminTopBar bind:sidebarOpen />

        <main class="flex-grow p-6 lg:p-8" in:fade={{ duration: 400 }}>
            {@render children()}
        </main>

        <!-- Footer -->
        <footer class="p-8 border-t border-white/5 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-[10px] text-white/30 font-['Space_Mono'] uppercase tracking-widest">
                © 2026 E-WIN PROJECT · ENTERPRISE COMMAND CENTER V2.4
            </p>
            <div class="flex items-center gap-6">
                <a href="/admin/support" class="text-[10px] text-white/30 hover:text-[var(--gold)] uppercase tracking-widest transition-colors">Support</a>
                <a href="/admin/docs" class="text-[10px] text-white/30 hover:text-[var(--gold)] uppercase tracking-widest transition-colors">Documentation</a>
            </div>
        </footer>
    </div>
</div>

<style>
    :global(body) {
        overflow-x: hidden;
    }
</style>
