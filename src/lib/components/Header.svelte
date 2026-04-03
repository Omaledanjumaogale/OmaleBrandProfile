<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { user, auth } from '$lib/stores/auth';
	import { openServiceModal } from '$lib/stores/ui';

	let scrolled = $state(false);
	let menuOpen = $state(false);

	const toggleMenu = () => {
		menuOpen = !menuOpen;
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	};

	const closeMenu = () => {
		menuOpen = false;
		document.body.style.overflow = '';
	};

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const navLinks = [
		{ name: 'About', href: '/#about', icon: '👤' },
		{ name: 'Services', href: '/#services', icon: '🛠️' },
		{ name: 'Expertise', href: '/#expertise', icon: '🧠' },
		{ name: 'Career', href: '/#iam-onboarding', icon: '💼' },
		{ name: 'E-WIN', href: '/#ecosystem', icon: '🌍' },
		{ name: 'Insights', href: '/#thought', icon: '💡' }
	];

	// Authenticated Links (Only shown when logged in)
	const authLinks = [
		{ name: 'Admin Portal', href: '/admin', icon: '🛡️' }
	];

	const handleLogout = async () => {
		if (!auth) return;
		try {
			await auth.signOut();
			closeMenu();
			goto('/');
		} catch (e) {
			console.error('Logout failed:', e);
		}
	};
</script>

<nav
	id="nav"
	class="fixed top-0 left-0 right-0 z-[1000] px-6 lg:px-12 py-6 transition-all duration-400 flex items-center justify-between {scrolled
		? 'bg-[#060608eb] backdrop-blur-2xl border-b border-border py-4'
		: ''}"
>
	<a href="/#hero" class="text-2xl font-['Bebas_Neue'] tracking-widest text-text flex items-center gap-1">
		<span class="text-gold italic font-normal">O</span>MALE OGALE ProfileX
	</a>

	<!-- Hamburger Button (Always Visible) -->
	<button
		class="flex flex-col gap-[6px] cursor-pointer z-[1001] p-4 min-h-[44px] min-w-[44px] items-center justify-center hover:opacity-70 transition-opacity bg-gold/10 rounded-lg border border-gold/20"
		onclick={toggleMenu}
		aria-label="Toggle Menu"
	>
		<span
			class="w-[28px] h-[2.5px] bg-gold shadow-[0_0_8px_rgba(201,168,76,0.5)] transition-all duration-300 {menuOpen
				? 'rotate-45 translate-y-[8.5px]'
				: ''}"
		></span>
		<span
			class="w-[28px] h-[2.5px] bg-gold shadow-[0_0_8px_rgba(201,168,76,0.5)] transition-all duration-300 {menuOpen ? 'opacity-0' : ''}"
		></span>
		<span
			class="w-[28px] h-[2.5px] bg-gold shadow-[0_0_8px_rgba(201,168,76,0.5)] transition-all duration-300 {menuOpen
				? '-rotate-45 -translate-y-[8.5px]'
				: ''}"
		></span>
	</button>
</nav>

<!-- Drop-down Navigation Menu -->
<div
	class="fixed inset-0 z-[999] transition-all duration-500 {menuOpen
		? 'bg-black/40 backdrop-blur-sm opacity-100 pointer-events-auto'
		: 'opacity-0 pointer-events-none'}"
	onclick={closeMenu}
	onkeydown={(e) => e.key === 'Escape' && closeMenu()}
	role="button"
	tabindex="0"
	aria-label="Close Menu Overlay"
>
	<div 
		class="absolute right-6 top-24 w-[300px] sm:w-[350px] h-fit max-h-[75vh] bg-surface border border-border shadow-2xl rounded-2xl p-6 pt-10 flex flex-col gap-6 transition-all duration-500 overflow-y-auto scroll-container {menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
		role="menu"
		tabindex="-1"
	>
		<div class="flex flex-col gap-4 w-full">
			<div class="font-['Space_Mono'] text-[9px] tracking-[3px] uppercase text-muted mb-2 px-2">Navigation 🧭</div>
			
			{#each navLinks as link}
				<a
					href={link.href}
					onclick={closeMenu}
					class="font-['Bebas_Neue'] text-2xl tracking-[2px] text-text hover:text-gold transition-colors duration-200 flex items-center gap-3 group px-2 py-1 rounded-lg hover:bg-gold/5 min-h-[44px]"
				>
					<span class="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
					{link.name}
				</a>
			{/each}

			<div class="h-[1px] w-full bg-border my-2"></div>
			<div class="font-['Space_Mono'] text-[9px] tracking-[3px] uppercase text-muted mb-2 px-2">Portal & Contact 🛡️</div>

			{#if $user}
				{#each authLinks as link}
					<a
						href={link.href}
					onclick={closeMenu}
					class="font-['Bebas_Neue'] text-2xl tracking-[2px] text-gold hover:text-gold2 transition-colors duration-200 flex items-center gap-3 group px-2 py-1 rounded-lg hover:bg-gold/5 min-h-[44px]"
				>
						<span class="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
						{link.name}
					</a>
				{/each}
				<button
					onclick={handleLogout}
					class="font-['Bebas_Neue'] text-2xl tracking-[2px] text-red-400 hover:text-red-500 transition-colors duration-200 flex items-center gap-3 group text-left px-2 py-1 rounded-lg hover:bg-red-400/5 min-h-[44px]"
				>
					<span class="text-xl group-hover:scale-110 transition-transform">🚪</span>
					Logout
				</button>
			{:else}
				<a
					href="/admin/login"
					onclick={closeMenu}
					class="font-['Bebas_Neue'] text-2xl tracking-[2px] text-text hover:text-gold transition-colors duration-200 flex items-center gap-3 group px-2 py-1 rounded-lg hover:bg-gold/5 min-h-[44px]"
				>
					<span class="text-xl group-hover:scale-110 transition-transform">🗝️</span>
					Admin Login
				</a>
			{/if}

			<button
				onclick={() => { closeMenu(); openServiceModal(); }}
				class="mt-4 w-full py-3 bg-gold text-bg text-[10px] font-bold tracking-[2px] uppercase rounded-xl hover:bg-gold2 hover:translate-y-[-2px] transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2 min-h-[44px]"
			>
				<span>🤝</span> Connect Now
			</button>
		</div>

		<div class="mt-4 pt-6 border-t border-border px-2 pb-2">
			<p class="text-[10px] text-muted leading-relaxed">
				© 2026 Danjuma Omale-Ogale<br />
				E-WIN Project · Build for Impact 🌍
			</p>
		</div>
	</div>
</div>


<style>
	#nav {
		transition: all 0.4s ease;
	}

	.scroll-container::-webkit-scrollbar {
		width: 4px;
	}

	.scroll-container::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.02);
		border-radius: 10px;
	}

	.scroll-container::-webkit-scrollbar-thumb {
		background: rgba(201, 168, 76, 0.3);
		border-radius: 10px;
	}

	.scroll-container::-webkit-scrollbar-thumb:hover {
		background: rgba(201, 168, 76, 0.5);
	}
</style>
