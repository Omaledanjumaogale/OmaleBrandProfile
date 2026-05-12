<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$lib/stores/auth';

	// Only show BottomNav on public-facing pages, never inside dashboard/admin shells
	const hideOnRoutes = $derived(
		$page.url.pathname.startsWith('/admin') ||
		$page.url.pathname.startsWith('/dashboard')
	);

	const navLinks = [
		{ name: 'Home', href: '/', icon: '🏠' },
		{ name: 'Services', href: '/#services', icon: '🛠️' },
		{ name: 'E-WIN', href: '/#ecosystem', icon: '🌍' }
	];

	const authLinks = $derived($user
		? [{ name: 'Dashboard', href: '/dashboard', icon: '👤' }]
		: [{ name: 'Login', href: '/admin/login', icon: '🗝️' }]
	);

	const allLinks = $derived([...navLinks, ...authLinks].slice(0, 4));

	function isActive(href: string) {
		const path = $page.url.pathname;
		if (href === '/') return path === '/';
		return path === href || $page.url.hash === href.replace('/', '');
	}
</script>

{#if !hideOnRoutes}
	<nav
		class="fixed bottom-0 left-0 right-0 z-[1000] bg-[var(--bg)] bg-opacity-95 backdrop-blur-2xl border-t border-[var(--border)] px-2 pt-2 pb-[max(12px,env(safe-area-inset-bottom,12px))] sm:hidden flex items-center justify-around"
		aria-label="Mobile navigation"
	>
		{#each allLinks as link}
			<a
				href={link.href}
				class="flex flex-col items-center gap-1 transition-colors min-w-[60px] min-h-[44px] justify-center rounded-xl px-2 {isActive(link.href) ? 'text-[var(--gold)]' : 'text-[var(--muted)] hover:text-[var(--text)]'}"
				aria-current={isActive(link.href) ? 'page' : undefined}
			>
				<span class="text-xl leading-none" aria-hidden="true">{link.icon}</span>
				<span class="text-[10px] font-['Space_Mono'] uppercase tracking-widest font-bold leading-none">{link.name}</span>
			</a>
		{/each}
	</nav>
{/if}
