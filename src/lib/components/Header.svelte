<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { openServiceModal } from '$lib/stores/ui';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	// ── Svelte 5 Runes ──────────────────────────────────────────────
	let scrolled = $state(false);
	let menuOpen = $state(false);
	let drawerEl: HTMLElement | null = null;
	let prevFocusEl: HTMLElement | null = null;

	// ── Navigation links ─────────────────────────────────────────────
	const navLinks = [
		{ name: 'About',      href: '/#about',        icon: '👤', section: 'about' },
		{ name: 'Services',   href: '/services',      icon: '🛠️',  section: null },
		{ name: 'Expertise',  href: '/#expertise',    icon: '🧠', section: 'expertise' },
		{ name: 'Career',     href: '/#career',       icon: '💼', section: 'career' },
		{ name: 'E-WIN',      href: '/#ecosystem',    icon: '🌍', section: 'ecosystem' },
		{ name: 'Blog',       href: '/blog',           icon: '✍️',  section: null },
		{ name: 'Login',      href: '/login',          icon: '🔑', section: null },
		{ name: 'Apply',      href: '/apply',          icon: '🚀', section: null, cta: true },
	];


	// ── Open / close helpers ─────────────────────────────────────────
	function openMenu() {
		menuOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
			prevFocusEl = document.activeElement as HTMLElement;
			// Focus the first interactive element in the drawer after a tick
			setTimeout(() => {
				const firstFocusable = drawerEl?.querySelector<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);
				firstFocusable?.focus();
			}, 50);
		}
	}

	function closeMenu() {
		menuOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
			// Restore focus to the element that opened the menu
			setTimeout(() => prevFocusEl?.focus(), 50);
		}
	}

	function toggleMenu() {
		if (menuOpen) closeMenu();
		else openMenu();
	}

	// ── Smart navigation: handles both same-page hash scroll and cross-page nav ──
	async function handleNavClick(event: MouseEvent, href: string, section: string | null) {
		event.preventDefault();
		closeMenu();

		if (!section) {
			// External page — let SvelteKit handle it
			await goto(href);
			return;
		}

		const isOnHome = $page.url.pathname === '/';

		if (isOnHome) {
			// Already on home — smooth scroll to section
			const el = document.getElementById(section);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		} else {
			// Navigate to home first, then scroll after transition
			await goto('/');
			setTimeout(() => {
				const el = document.getElementById(section);
				if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 400);
		}
	}

	// ── Keyboard trap inside drawer ───────────────────────────────────
	function handleDrawerKeydown(event: KeyboardEvent) {
		if (!menuOpen) return;
		if (event.key === 'Escape') { closeMenu(); return; }

		if (event.key === 'Tab' && drawerEl) {
			const focusable = Array.from(
				drawerEl.querySelectorAll<HTMLElement>(
					'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				)
			);
			if (!focusable.length) return;
			const first = focusable[0];
			const last  = focusable[focusable.length - 1];
			if (event.shiftKey) {
				if (document.activeElement === first) {
					event.preventDefault();
					last.focus();
				}
			} else {
				if (document.activeElement === last) {
					event.preventDefault();
					first.focus();
				}
			}
		}
	}

	// ── Scroll detection ──────────────────────────────────────────────
	onMount(() => {
		const onScroll = () => { scrolled = window.scrollY > 50; };
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<!-- ── Top navbar ──────────────────────────────────────────────────── -->
<nav
	id="nav"
	class="fixed top-0 left-0 right-0 z-[1001] transition-all duration-300
	       pt-[env(safe-area-inset-top,0px)]
	       {scrolled ? 'bg-[var(--bg)]/95 backdrop-blur-2xl border-b border-[var(--border)] shadow-sm' : ''}"
	aria-label="Main navigation"
>
	<div class="px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between gap-3">
		<!-- Brand logo -->
		<a
			href="/"
			onclick={(e) => handleNavClick(e, '/', null)}
			class="font-['Bebas_Neue'] text-2xl tracking-widest text-[var(--text)] flex items-center gap-1 shrink-0 hover:text-[var(--gold)] transition-colors"
			aria-label="Omale Danjuma Ogale — Home"
		>
			<span class="text-[var(--gold)]">O</span>MALE
			<span class="text-[13px] text-[var(--muted)] tracking-[3px] ml-1 hidden sm:inline">PROFILEX</span>
		</a>

		<div class="flex items-center gap-2">
			<!-- Theme toggle -->
			<ThemeToggle />

			<!-- Hamburger toggle button -->
			<button
				id="menu-toggle"
				type="button"
				onclick={toggleMenu}
				aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={menuOpen}
				aria-controls="nav-drawer"
				class="relative flex flex-col justify-center items-center gap-[6px] cursor-pointer
				       p-3 min-h-[44px] min-w-[44px]
				       bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20
				       rounded-xl border border-[var(--gold)]/30
				       transition-all duration-200 active:scale-95"
			>
				<span
					class="block w-6 h-[2px] bg-[var(--gold)] rounded-full transition-all duration-300 origin-center"
					class:rotate-45={menuOpen}
					class:translate-y-2={menuOpen}
					aria-hidden="true"
				></span>
				<span
					class="block w-6 h-[2px] bg-[var(--gold)] rounded-full transition-all duration-300"
					class:opacity-0={menuOpen}
					class:scale-x-0={menuOpen}
					aria-hidden="true"
				></span>
				<span
					class="block w-6 h-[2px] bg-[var(--gold)] rounded-full transition-all duration-300 origin-center"
					class:-rotate-45={menuOpen}
					class:-translate-y-2={menuOpen}
					aria-hidden="true"
				></span>
			</button>
		</div>
	</div>
</nav>

<!-- ── Overlay backdrop ────────────────────────────────────────────── -->
<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div
	class="fixed inset-0 z-[1002] transition-opacity duration-300"
	class:opacity-0={!menuOpen}
	class:pointer-events-none={!menuOpen}
	class:bg-black={menuOpen}
	style:opacity={menuOpen ? '0.5' : '0'}
	onclick={closeMenu}
	aria-hidden="true"
></div>

<!-- ── Slide-in drawer ─────────────────────────────────────────────── -->
<div
	id="nav-drawer"
	bind:this={drawerEl}
	role="dialog"
	aria-modal="true"
	aria-label="Site navigation"
	aria-hidden={!menuOpen}
	onkeydown={handleDrawerKeydown}
	class="fixed right-0 top-0 bottom-0 z-[1003]
	       w-[min(300px,88vw)]
	       bg-[var(--surface)] border-l border-[var(--border)] shadow-2xl
	       flex flex-col
	       pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]
	       transition-transform duration-300 ease-out
	       will-change-transform"
	class:translate-x-0={menuOpen}
	class:translate-x-full={!menuOpen}
	class:pointer-events-none={!menuOpen}
>
	<!-- Drawer header -->
	<div class="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] shrink-0">
		<span class="font-['Bebas_Neue'] text-xl tracking-widest text-[var(--gold)]">NAVIGATION</span>
		<button
			type="button"
			onclick={closeMenu}
			class="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl
			       hover:bg-[var(--surface2)] transition-colors
			       text-[var(--muted)] hover:text-[var(--text)]
			       active:scale-95"
			aria-label="Close navigation"
		>
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
				<path d="M2 2L16 16M16 2L2 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			</svg>
		</button>
	</div>

	<!-- Nav section links -->
	<nav class="flex-grow overflow-y-auto px-4 py-4 space-y-1 scroll-container" aria-label="Site sections">
		<p class="font-['Space_Mono'] text-[9px] tracking-[3px] uppercase text-[var(--muted)] mb-3 px-3" aria-hidden="true">
			Sections
		</p>
		{#each navLinks as link}
			{#if link.cta}
				<a
					href={link.href}
					onclick={(e) => handleNavClick(e, link.href, link.section)}
					class="font-['Bebas_Neue'] text-xl tracking-[2px]
					       bg-[var(--gold)] text-[var(--bg)]
					       transition-all duration-200
					       flex items-center justify-center gap-3
					       px-3 py-2 rounded-xl
					       hover:bg-[var(--gold2)]
					       min-h-[48px] mt-2
					       active:scale-[0.98] shadow-lg shadow-[var(--gold)]/20"
				>
					<span class="text-xl w-8 text-center" aria-hidden="true">{link.icon}</span>
					{link.name}
				</a>
			{:else}
				<a
					href={link.href}
					onclick={(e) => handleNavClick(e, link.href, link.section)}
					class="font-['Bebas_Neue'] text-xl tracking-[2px]
					       text-[var(--text)] hover:text-[var(--gold)]
					       transition-all duration-200
					       flex items-center gap-3 group
					       px-3 py-2 rounded-xl
					       hover:bg-[var(--gold)]/5
					       min-h-[48px]
					       active:scale-[0.98] active:bg-[var(--gold)]/10"
				>
					<span class="text-xl group-hover:scale-110 transition-transform duration-200 w-8 text-center" aria-hidden="true">
						{link.icon}
					</span>
					{link.name}
				</a>
			{/if}
		{/each}

	</nav>

	<!-- Connect CTA -->
	<div class="p-4 border-t border-[var(--border)] shrink-0">
		<button
			type="button"
			onclick={() => { closeMenu(); openServiceModal(); }}
			class="w-full py-3 min-h-[48px]
			       bg-[var(--gold)] text-[var(--bg)]
			       text-[11px] font-bold tracking-[2px] uppercase
			       rounded-xl
			       hover:bg-[var(--gold2)] hover:-translate-y-0.5
			       active:scale-[0.98]
			       transition-all duration-200
			       shadow-lg shadow-[var(--gold)]/20
			       flex items-center justify-center gap-2"
		>
			<span aria-hidden="true">🤝</span> Connect Now
		</button>
		<p class="text-[9px] text-[var(--muted)] font-['Space_Mono'] text-center mt-3 tracking-widest uppercase">
			© 2026 Omale Danjuma Ogale
		</p>
	</div>
</div>

<style>
	/* Custom scrollbar for nav drawer */
	.scroll-container::-webkit-scrollbar       { width: 4px; }
	.scroll-container::-webkit-scrollbar-track { background: transparent; }
	.scroll-container::-webkit-scrollbar-thumb { background: rgba(160,120,32,0.3); border-radius: 10px; }
	.scroll-container::-webkit-scrollbar-thumb:hover { background: rgba(160,120,32,0.5); }
</style>
