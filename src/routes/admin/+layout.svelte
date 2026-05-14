<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isAdmin, authReady, currentUser, logout } from '$lib/stores/auth';
	import { ui } from '$lib/stores/ui';

	let { children } = $props();

	// ── Admin route guard ─────────────────────────────────────────────
	// Wait for Firebase auth to resolve, then redirect non-admins
	$effect(() => {
		if ($authReady && !$isAdmin) {
			goto('/', { replaceState: true });
		}
	});

	// ── Nav items ─────────────────────────────────────────────────────
	const navItems = [
		{ label: 'Dashboard',    href: '/admin',                  icon: '📊' },
		{ label: 'Applications', href: '/admin/applications',     icon: '📋' },
		{ label: 'Requests',     href: '/admin/service-requests', icon: '📥' },
		{ label: 'Users',        href: '/admin/users',            icon: '👥' },
		{ label: 'Tasks',        href: '/admin/tasks',            icon: '✅' },
		{ label: 'Broadcasts',   href: '/admin/broadcasts',       icon: '📢' },
		{ label: 'Audit Log',    href: '/admin/audit',            icon: '🔍' },
		{ label: 'Settings',     href: '/admin/settings',         icon: '⚙️' },
	];

	let sidebarOpen = $state(false);

	async function handleLogout() {
		await logout();
		ui.success('Signed out successfully.');
		goto('/');
	}

	const isActive = (href: string) => {
		if (href === '/admin') return $page.url.pathname === '/admin';
		return $page.url.pathname.startsWith(href);
	};
</script>

<svelte:head>
	<title>Admin Portal — E-WIN Project</title>
</svelte:head>

{#if !$authReady}
	<!-- Loading state while auth resolves -->
	<div class="min-h-screen bg-[#0f0e0b] flex items-center justify-center">
		<div class="text-center">
			<div class="w-12 h-12 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin mx-auto mb-4"></div>
			<p class="text-[#c9a84c]/60 font-['Space_Mono'] text-[11px] uppercase tracking-widest">Verifying access...</p>
		</div>
	</div>

{:else if $isAdmin}
	<div class="min-h-screen bg-[#0b0a07] flex">

		<!-- ── Mobile overlay ──────────────────────────────────── -->
		<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
		{#if sidebarOpen}
			<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
			<div role="none" class="fixed inset-0 bg-black/60 z-40 lg:hidden" onclick={() => sidebarOpen = false}></div>
		{/if}

		<!-- ── Sidebar ─────────────────────────────────────────── -->
		<aside class="
			fixed top-0 left-0 bottom-0 z-50 w-64
			bg-[#0f0e0b] border-r border-[#c9a84c]/10
			flex flex-col
			transition-transform duration-300 ease-out
			lg:translate-x-0 lg:static lg:flex
			{sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
		">
			<!-- Brand -->
			<div class="px-5 py-5 border-b border-[#c9a84c]/10 shrink-0">
				<div class="font-['Bebas_Neue'] text-2xl tracking-widest text-[#c9a84c]">
					E-WIN<span class="text-white/60 text-lg ml-1">ADMIN</span>
				</div>
				<div class="text-[9px] font-['Space_Mono'] text-[#c9a84c]/40 uppercase tracking-widest mt-1">
					Secure Portal
				</div>
			</div>

			<!-- Nav items -->
			<nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Admin navigation">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={() => sidebarOpen = false}
						class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all min-h-[44px]
							{isActive(item.href)
								? 'bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/20'
								: 'text-white/50 hover:text-white hover:bg-white/5'}"
					>
						<span class="w-5 text-center shrink-0" aria-hidden="true">{item.icon}</span>
						{item.label}
						{#if isActive(item.href)}
							<span class="ml-auto w-1.5 h-1.5 bg-[#c9a84c] rounded-full"></span>
						{/if}
					</a>
				{/each}
			</nav>

			<!-- User + Logout -->
			<div class="p-4 border-t border-[#c9a84c]/10 shrink-0 space-y-3">
				<div class="flex items-center gap-3 px-2">
					<div class="w-8 h-8 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] text-sm font-bold shrink-0">
						{($currentUser?.displayName?.[0] ?? $currentUser?.email?.[0] ?? 'A').toUpperCase()}
					</div>
					<div class="min-w-0">
						<div class="text-[12px] text-white font-medium truncate">
							{$currentUser?.displayName ?? 'Admin'}
						</div>
						<div class="text-[10px] text-white/40 truncate">{$currentUser?.email ?? ''}</div>
					</div>
				</div>
				<button
					type="button"
					onclick={handleLogout}
					class="w-full flex items-center justify-center gap-2 py-2.5 min-h-[40px]
					       text-[12px] text-red-400 hover:text-red-300 font-medium
					       border border-red-500/20 hover:border-red-500/40
					       rounded-xl transition-all active:scale-95"
				>
					<span aria-hidden="true">🚪</span> Sign Out
				</button>
			</div>
		</aside>

		<!-- ── Main content ────────────────────────────────────── -->
		<div class="flex-1 flex flex-col min-w-0 lg:ml-0">
			<!-- Top bar (mobile only) -->
			<header class="lg:hidden flex items-center gap-3 px-4 py-3
			               bg-[#0f0e0b] border-b border-[#c9a84c]/10 shrink-0">
				<button
					type="button"
					onclick={() => sidebarOpen = !sidebarOpen}
					class="p-2 min-h-[44px] min-w-[44px] rounded-xl border border-[#c9a84c]/20
					       text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all flex items-center justify-center"
					aria-label="Open admin navigation"
				>
					<svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
						<rect width="18" height="2" rx="1" fill="currentColor"/>
						<rect y="6" width="14" height="2" rx="1" fill="currentColor"/>
						<rect y="12" width="18" height="2" rx="1" fill="currentColor"/>
					</svg>
				</button>
				<span class="font-['Bebas_Neue'] text-xl tracking-widest text-[#c9a84c]">ADMIN</span>
			</header>

			<main class="flex-1 overflow-auto p-4 sm:p-6">
				{@render children()}
			</main>
		</div>
	</div>
{/if}
