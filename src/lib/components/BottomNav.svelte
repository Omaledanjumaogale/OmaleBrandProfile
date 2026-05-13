<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const navLinks = [
		{ name: 'Home',     href: '/',           icon: '🏠',  section: null },
		{ name: 'Services', href: '/#services',  icon: '🛠️',  section: 'services' },
		{ name: 'E-WIN',    href: '/#ecosystem', icon: '🌍',  section: 'ecosystem' },
		{ name: 'Connect',  href: '/#contact',   icon: '🤝',  section: 'contact' },
	];

	function isActive(href: string): boolean {
		const path = $page.url.pathname;
		if (href === '/') return path === '/';
		return path === href;
	}

	async function handleNavClick(event: MouseEvent, href: string, section: string | null) {
		event.preventDefault();

		if (!section) {
			// Simple page navigation
			await goto(href);
			return;
		}

		const isOnHome = $page.url.pathname === '/';

		if (isOnHome) {
			// Already on home — just smooth-scroll to the section
			const el = document.getElementById(section);
			if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else {
			// Navigate home first, then scroll
			await goto('/');
			setTimeout(() => {
				const el = document.getElementById(section);
				if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 400);
		}
	}
</script>

<nav
	class="fixed bottom-0 left-0 right-0 z-[1000]
	       bg-[var(--bg)]/95 backdrop-blur-2xl
	       border-t border-[var(--border)]
	       px-2 pt-2 pb-[max(12px,env(safe-area-inset-bottom,12px))]
	       sm:hidden flex items-center justify-around"
	aria-label="Mobile navigation bar"
>
	{#each navLinks as link}
		<a
			href={link.href}
			onclick={(e) => handleNavClick(e, link.href, link.section)}
			aria-current={isActive(link.href) ? 'page' : undefined}
			aria-label="Navigate to {link.name}"
			class="flex flex-col items-center gap-1 transition-all duration-200
			       min-w-[60px] min-h-[48px] justify-center rounded-xl px-2
			       active:scale-95
			       {isActive(link.href)
			         ? 'text-[var(--gold)] bg-[var(--gold)]/5'
			         : 'text-[var(--muted)] hover:text-[var(--text)]'}"
		>
			<span class="text-xl leading-none" aria-hidden="true">{link.icon}</span>
			<span class="text-[10px] font-['Space_Mono'] uppercase tracking-widest font-bold leading-none">
				{link.name}
			</span>
		</a>
	{/each}
</nav>
