<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let { title = 'Dashboard', isAdmin = false, children } = $props();

	let isSidebarOpen = $state(false);

	const openSidebar  = () => { isSidebarOpen = true;  document.body.style.overflow = 'hidden'; };
	const closeSidebar = () => { isSidebarOpen = false; document.body.style.overflow = ''; };

	const navItems = $derived(
		isAdmin
			? [
					{ label: 'Overview',  href: '/admin',          icon: '📊' },
					{ label: 'Users',     href: '/admin/users',    icon: '👥' },
					{ label: 'Audit Logs', href: '/admin/audit',    icon: '📋' },
					{ label: 'Settings',  href: '/admin/settings', icon: '⚙️' }
				]
			: [
					{ label: 'My Hub',    href: '/dashboard',         icon: '🏠' },
					{ label: 'Profile',   href: '/dashboard/profile', icon: '👤' }
				]
	);

	const displayName = $derived(
		$user?.displayName?.split(' ')?.[0] ??
		$user?.email?.split('@')?.[0] ??
		'User'
	);

	async function handleLogout() {
		try {
			await fetch('/api/session', { method: 'DELETE' });
			// Also sign out of Firebase on the client
			const { auth } = await import('$lib/services/firebase');
			if (auth) await auth.signOut();
		} catch { /* ignore */ }
		goto('/', { invalidateAll: true });
	}

	function isCurrentRoute(href: string) {
		return $page.url.pathname === href;
	}
</script>

<div class="min-h-screen bg-(--bg) flex text-(--text) font-sans">

	<!-- ── Sidebar overlay (mobile) ───────────────────────────────── -->
	{#if isSidebarOpen}
		<button
			class="fixed inset-0 bg-(--bg)/80 backdrop-blur-sm z-40 lg:hidden w-full h-full border-none cursor-default"
			onclick={closeSidebar}
			aria-label="Close sidebar"
		></button>
	{/if}

	<!-- ── Sidebar ─────────────────────────────────────────────────── -->
	<aside
		class="fixed inset-y-0 left-0 z-50 w-72 bg-(--surface) border-r border-(--border) flex flex-col transition-transform duration-300
		       {isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0"
		aria-label="Sidebar navigation"
	>
		<!-- Logo row -->
		<div class="p-6 border-b border-(--border) flex items-center justify-between shrink-0">
			<a href="/" class="font-['Bebas_Neue'] text-2xl tracking-widest text-(--text)">
				<span class="text-(--gold)">E</span>-WIN
				<span class="text-[13px] tracking-[3px] ml-1 text-(--muted)">{isAdmin ? 'ADMIN' : 'DASH'}</span>
			</a>
			<button
				class="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-(--muted) hover:text-(--gold) transition-colors rounded-lg"
				onclick={closeSidebar}
				aria-label="Close sidebar"
			>✕</button>
		</div>

		<!-- Nav links -->
		<nav class="p-4 space-y-1 grow" aria-label="Dashboard navigation">
			{#each navItems as item}
				<a
					href={item.href}
					onclick={() => { if (isSidebarOpen) closeSidebar(); }}
					class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
					       {isCurrentRoute(item.href)
					         ? 'bg-(--gold-dim) border border-(--gold-line) text-(--gold)'
					         : 'hover:bg-(--surface2) hover:text-(--gold) border border-transparent'}"
					aria-current={isCurrentRoute(item.href) ? 'page' : undefined}
				>
					<span class="text-xl transition-transform group-hover:scale-110" aria-hidden="true">{item.icon}</span>
					<span class="font-['Space_Mono'] text-[11px] tracking-[2px] uppercase font-bold">{item.label}</span>
				</a>
			{/each}
		</nav>

		<!-- User + Logout row -->
		<div class="p-4 border-t border-(--border) bg-(--surface2)/50 shrink-0">
			{#if $user}
				<div class="flex items-center gap-3 px-2 mb-3">
					<div class="w-9 h-9 rounded-full bg-(--gold-dim) border border-(--gold-line) flex items-center justify-center text-(--gold) font-bold text-sm shrink-0">
						{displayName.charAt(0).toUpperCase()}
					</div>
					<div class="min-w-0">
						<div class="text-[12px] font-bold text-(--text) truncate">{displayName}</div>
						<div class="text-[10px] text-(--gold) font-['Space_Mono']">{isAdmin ? 'ADMIN' : 'MEMBER'}</div>
					</div>
				</div>
			{/if}
			<button
				onclick={handleLogout}
				class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all border border-transparent hover:border-red-400/20 text-[10px] tracking-widest font-bold uppercase font-['Space_Mono']"
			>
				<span aria-hidden="true">🚪</span> Sign Out
			</button>
		</div>
	</aside>

	<!-- ── Main content ────────────────────────────────────────────── -->
	<div class="flex-grow lg:ml-72 flex flex-col min-w-0 min-h-screen">

		<!-- Top bar -->
		<header class="h-16 sm:h-20 bg-(--surface)/70 backdrop-blur-xl border-b border-(--border) flex items-center justify-between px-4 sm:px-6 lg:px-10 sticky top-0 z-40 shrink-0">
			<!-- Hamburger (mobile only) -->
			<button
				class="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-(--gold) hover:bg-(--gold-dim) rounded-lg transition-colors"
				onclick={openSidebar}
				aria-label="Open navigation menu"
				aria-expanded={isSidebarOpen}
			>
				<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
					<rect y="3" width="22" height="2" rx="1" fill="currentColor"/>
					<rect y="10" width="22" height="2" rx="1" fill="currentColor"/>
					<rect y="17" width="22" height="2" rx="1" fill="currentColor"/>
				</svg>
			</button>

			<h1 class="font-['Bebas_Neue'] text-2xl sm:text-3xl tracking-widest uppercase text-(--text)">{title}</h1>

			<!-- User badge -->
			<div class="flex items-center gap-3">
				<div class="hidden sm:flex flex-col items-end">
					<span class="text-[11px] font-bold text-(--text) uppercase tracking-widest">{displayName}</span>
					<span class="text-[10px] text-(--gold) font-['Space_Mono']">{isAdmin ? 'ADMIN PORTAL' : 'ELITE MEMBER'}</span>
				</div>
				<div class="w-9 h-9 rounded-full bg-(--gold-dim) border border-(--gold-line) flex items-center justify-center text-(--gold) font-bold text-sm">
					{displayName.charAt(0).toUpperCase()}
				</div>
			</div>
		</header>

		<!-- Page content -->
		<main class="p-4 sm:p-6 lg:p-10 grow max-w-[1400px] mx-auto w-full overflow-x-hidden">
			{@render children()}
		</main>

		<!-- Dashboard footer -->
		<footer class="px-6 py-5 border-t border-(--border) text-center shrink-0">
			<p class="text-[10px] font-['Space_Mono'] tracking-widest text-(--muted) uppercase">
				© 2026 E-WIN Project · Secure Enterprise Infrastructure
			</p>
		</footer>
	</div>
</div>
