<script lang="ts">
	import { page } from '$app/stores';

	const navLinks = [
		{ name: 'Home',     href: '/',           icon: '🏠' },
		{ name: 'Services', href: '/#services',  icon: '🛠️' },
		{ name: 'E-WIN',    href: '/#ecosystem', icon: '🌍' },
		{ name: 'Connect',  href: '/#contact',   icon: '🤝' }
	];

	function isActive(href: string) {
		const path = $page.url.pathname;
		if (href === '/') return path === '/';
		return path === href || $page.url.hash === href.replace('/', '');
	}
</script>

<nav
	class="fixed bottom-0 left-0 right-0 z-[1000] bg-[var(--bg)]/95 backdrop-blur-2xl border-t border-[var(--border)] px-2 pt-2 pb-[max(12px,env(safe-area-inset-bottom,12px))] sm:hidden flex items-center justify-around"
	aria-label="Mobile navigation"
>
	{#each navLinks as link}
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
