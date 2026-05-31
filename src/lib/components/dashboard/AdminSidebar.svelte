<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { logout } from '$lib/stores/auth';
    import { fade, slide } from 'svelte/transition';

    type AdminRole = 'user' | 'admin' | 'auditor' | 'superadmin';

    let { isOpen = true, role = 'admin' as AdminRole } = $props<{ isOpen?: boolean; role?: AdminRole }>();

    const roleRank: Record<AdminRole, number> = {
        user: 0,
        admin: 1,
        auditor: 2,
        superadmin: 3
    };

    function getRoleLevel(candidate: AdminRole) {
        return roleRank[candidate];
    }

    const menuItems = [
        { group: 'Main', items: [
            { name: 'Overview', icon: '📊', href: '/admin', roles: ['admin', 'auditor', 'superadmin'] },
            { name: 'Applications', icon: '📋', href: '/admin/applications', roles: ['admin', 'auditor', 'superadmin'] },
            { name: 'Service Requests', icon: '📥', href: '/admin/service-requests', roles: ['admin', 'auditor', 'superadmin'] },
        ]},
        { group: 'Management', items: [
            { name: 'User Directory', icon: '👥', href: '/admin/users', roles: ['auditor', 'superadmin'] },
            { name: 'Task Board', icon: '⚡', href: '/admin/tasks', roles: ['admin', 'superadmin'] },
            { name: 'Broadcasts', icon: '📢', href: '/admin/broadcasts', roles: ['superadmin'] },
        ]},
        { group: 'System', items: [
            { name: 'Monitoring', icon: '🛠️', href: '/admin/monitoring', roles: ['auditor', 'superadmin'] },
            { name: 'Audit Logs', icon: '🛡️', href: '/admin/audit', roles: ['auditor', 'superadmin'] },
            { name: 'Settings', icon: '⚙️', href: '/admin/settings', roles: ['superadmin'] },
        ]}
    ];

    function canAccess(itemRoles: string[]) {
        return itemRoles.some((itemRole) => getRoleLevel(role as AdminRole) >= getRoleLevel(itemRole as AdminRole));
    }

    const isActive = (href: string) => $page.url.pathname === href;

    async function handleLogout() {
        await logout();
        await goto('/admin/logout');
    }
</script>

<aside 
    class="fixed left-0 top-0 h-full bg-[#0f0e0b] border-r border-[#c9a84c]/10 transition-all duration-300 z-[100] {isOpen ? 'w-64' : 'w-20'}"
>
    <!-- Brand -->
    <div class="h-20 flex items-center px-6 border-b border-[#c9a84c]/10 overflow-hidden">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[var(--gold)] flex items-center justify-center font-bold text-[#0b0a07]">E</div>
            {#if isOpen}
                <span in:fade={{ delay: 100 }} class="font-['Bebas_Neue'] text-xl tracking-[2px] text-white whitespace-nowrap">
                    ADMIN <span class="text-[var(--gold)]">PORTAL</span>
                </span>
            {/if}
        </div>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-8 overflow-y-auto h-[calc(100%-80px)] custom-scrollbar">
        {#each menuItems as group}
            <div>
                {#if isOpen}
                    <h3 in:fade class="text-[10px] font-['Space_Mono'] uppercase tracking-[3px] text-white/30 px-3 mb-4">
                        {group.group}
                    </h3>
                {/if}
                <div class="space-y-1">
                    {#each group.items.filter((item) => canAccess(item.roles)) as item}
                        <a 
                            href={item.href}
                            class="flex items-center gap-4 px-3 py-3 rounded-xl transition-all group
                                {isActive(item.href) 
                                    ? 'bg-[#c9a84c]/10 text-[var(--gold)]' 
                                    : 'text-white/50 hover:bg-white/5 hover:text-white'}"
                            title={!isOpen ? item.name : ''}
                        >
                            <span class="text-lg shrink-0 grayscale group-hover:grayscale-0 transition-all">
                                {item.icon}
                            </span>
                            {#if isOpen}
                                <span in:fade={{ delay: 50 }} class="text-[13px] font-medium whitespace-nowrap">
                                    {item.name}
                                </span>
                            {/if}
                            {#if isActive(item.href) && isOpen}
                                <div class="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--gold)] shadow-[0_0_8px_rgba(201,168,76,0.5)]"></div>
                            {/if}
                        </a>
                    {/each}
                </div>
            </div>
        {/each}
    </nav>

    <!-- Bottom Action -->
    <div class="absolute bottom-6 left-0 w-full px-4">
        <button 
            type="button"
            onclick={handleLogout}
            class="flex items-center gap-4 px-3 py-3 rounded-xl text-red-500/60 hover:bg-red-500/10 hover:text-red-500 transition-all"
        >
            <span class="text-lg shrink-0">🚪</span>
            {#if isOpen}
                <span in:fade class="text-[13px] font-bold uppercase tracking-[2px]">Logout</span>
            {/if}
        </button>
    </div>
</aside>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(201, 168, 76, 0.1);
        border-radius: 10px;
    }
</style>
