<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { openServiceModal } from '$lib/stores/ui';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	let scrolled = $state(false);
	let menuOpen = $state(false);

	const toggleMenu = () => {
		menuOpen = !menuOpen;
		document.body.style.overflow = menuOpen ? 'hidden' : '';
	};

	const closeMenu = () => {
		menuOpen = false;
		document.body.style.overflow = '';
	};

	onMount(() => {
		const handleScroll = () => { scrolled = window.scrollY > 50; };
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const navLinks = [
		{ name: 'About',     href: '/#about',         icon: '👤' },
		{ name: 'Services',  href: '/#services',       icon: '🛠️' },
		{ name: 'Expertise', href: '/#expertise',      icon: '🧠' },
		{ name: 'Career',    href: '/#career',         icon: '💼' },
		{ name: 'E-WIN',     href: '/#ecosystem',      icon: '🌍' },
		{ name: 'Blog',      href: '/blog',            icon: '✍️' }
	];
</script>

<nav
	id="nav"
	class="fixed top-0 left-0 right-0 z-[1000] transition-all duration-400
	       pt-[env(safe-area-inset-top,0px)]
	       {scrolled ? 'bg-[var(--bg)]/95 backdrop-blur-2xl border-b border-[var(--border)] shadow-sm' : ''}"
	aria-label="Main navigation"
>
	<div class="px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between gap-3">
		<!-- Brand -->
		<a href="/#hero" class="font-['Bebas_Neue'] text-2xl tracking-widest text-[var(--text)] flex items-center gap-1 shrink-0" aria-label="Omale Danjuma Ogale — Personal Brand home">
			<span class="text-[var(--gold)]">O</span>MALE<span class="text-[13px] text-[var(--muted)] tracking-[3px] ml-1 hidden sm:inline">PROFILEX</span>
		</a>

		<div class="flex items-center gap-2">
			<!-- Theme toggle -->
			<ThemeToggle />

			<!-- Hamburger -->
			<button
				id="menu-toggle"
				class="flex flex-col gap-[6px] cursor-pointer z-[1001] p-2 min-h-[44px] min-w-[44px] items-center justify-center hover:opacity-80 transition-opacity bg-[var(--gold)]/10 rounded-xl border border-[var(--gold)]/20"
				onclick={toggleMenu}
				aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={menuOpen}
				aria-controls="nav-drawer"
			>
				<span class="w-[24px] h-[2px] bg-[var(--gold)] transition-all duration-300 {menuOpen ? 'rotate-45 translate-y-[8px]' : ''}" aria-hidden="true"></span>
				<span class="w-[24px] h-[2px] bg-[var(--gold)] transition-all duration-300 {menuOpen ? 'opacity-0 w-0' : ''}" aria-hidden="true"></span>
				<span class="w-[24px] h-[2px] bg-[var(--gold)] transition-all duration-300 {menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}" aria-hidden="true"></span>
			</button>
		</div>
	</div>
</nav>

<!-- Overlay backdrop -->
<div
	class="fixed inset-0 z-[999] transition-all duration-500 {menuOpen
		? 'bg-black/50 backdrop-blur-sm opacity-100 pointer-events-auto'
		: 'opacity-0 pointer-events-none'}"
	onclick={closeMenu}
	onkeydown={(e) => e.key === 'Escape' && closeMenu()}
	role="button"
	tabindex="-1"
	aria-label="Close navigation overlay"
>
</div>

<!-- Drawer -->
<div
	id="nav-drawer"
	role="dialog"
	aria-modal="true"
	aria-label="Navigation drawer"
	class="fixed right-0 top-0 bottom-0 z-[1000] w-[min(300px,88vw)] bg-[var(--surface)] border-l border-[var(--border)] shadow-2xl
	       flex flex-col transition-transform duration-300 ease-out
	       pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]
	       {menuOpen ? 'translate-x-0' : 'translate-x-full'}"
>
	<!-- Drawer header -->
	<div class="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0">
		<span class="font-['Bebas_Neue'] text-xl tracking-widest text-[var(--gold)]">NAVIGATION</span>
		<button
			onclick={closeMenu}
			class="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-[var(--surface2)] transition-colors text-[var(--muted)] hover:text-[var(--text)]"
			aria-label="Close navigation drawer"
		>
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
				<path d="M2 2L16 16M16 2L2 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			</svg>
		</button>
	</div>

	<!-- Nav links -->
	<nav class="flex-grow overflow-y-auto px-4 py-4 space-y-1 scroll-container" aria-label="Site sections">
		<div class="font-['Space_Mono'] text-[9px] tracking-[3px] uppercase text-[var(--muted)] mb-3 px-3" aria-hidden="true">Sections</div>
		{#each navLinks as link}
			<a
				href={link.href}
				onclick={closeMenu}
				class="font-['Bebas_Neue'] text-xl tracking-[2px] text-[var(--text)] hover:text-[var(--gold)] transition-colors duration-200 flex items-center gap-3 group px-3 py-2 rounded-xl hover:bg-[var(--gold)]/5 min-h-[44px]"
			>
				<span class="text-xl group-hover:scale-110 transition-transform" aria-hidden="true">{link.icon}</span>
				{link.name}
			</a>
		{/each}
	</nav>

	<!-- CTA -->
	<div class="p-4 border-t border-[var(--border)] shrink-0">
		<button
			onclick={() => { closeMenu(); openServiceModal(); }}
			class="w-full py-3 bg-[var(--gold)] text-[var(--bg)] text-[11px] font-bold tracking-[2px] uppercase rounded-xl hover:bg-[var(--gold2)] hover:-translate-y-0.5 transition-all shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
		>
			<span aria-hidden="true">🤝</span> Connect Now
		</button>
		<p class="text-[9px] text-[var(--muted)] font-['Space_Mono'] text-center mt-3 tracking-widest uppercase">
			© 2026 Omale Danjuma Ogale
		</p>
	</div>
</div>

<style>
	.scroll-container::-webkit-scrollbar { width: 4px; }
	.scroll-container::-webkit-scrollbar-track { background: transparent; }
	.scroll-container::-webkit-scrollbar-thumb { background: rgba(160,120,32,0.3); border-radius: 10px; }
	.scroll-container::-webkit-scrollbar-thumb:hover { background: rgba(160,120,32,0.5); }
</style>
