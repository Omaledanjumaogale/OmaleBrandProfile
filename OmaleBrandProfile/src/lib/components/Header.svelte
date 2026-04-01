<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let scrolled = false;
	let menuOpen = false;

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
		{ name: 'Expertise', href: '/#expertise', icon: '🛠️' },
		{ name: 'Career', href: '/#career', icon: '💼' },
		{ name: 'E-WIN', href: '/#ecosystem', icon: '🌍' },
		{ name: 'Insights', href: '/#thought', icon: '💡' },
		{ name: 'User Dashboard', href: '/dashboard', icon: '📊' },
		{ name: 'Admin Portal', href: '/admin', icon: '🛡️' },
		{ name: 'Connect', href: '/#contact', icon: '🤝', cta: true }
	];
</script>

<nav
	id="nav"
	class="fixed top-0 left-0 right-0 z-[1000] px-6 lg:px-12 py-6 transition-all duration-400 flex items-center justify-between {scrolled
		? 'bg-[#060608eb] backdrop-blur-2xl border-b border-border py-4'
		: ''}"
>
	<a href="/#hero" class="text-2xl font-['Bebas_Neue'] tracking-widest text-text flex items-center gap-1">
		<span class="text-gold italic font-normal">E</span>-WIN PROJECT
	</a>

	<!-- Desktop Nav Links (Hidden on mobile) -->
	<ul class="hidden lg:flex items-center gap-9 list-none">
		{#each navLinks.filter(l => !l.cta) as link}
			<li>
				<a
					href={link.href}
					class="text-[11px] font-medium tracking-[2px] uppercase text-muted2 hover:text-gold transition-colors duration-200"
				>
					{link.name}
				</a>
			</li>
		{/each}
		<li>
			<a
				href="/#contact"
				class="px-[22px] py-[9px] border border-gold-line text-gold rounded-md hover:bg-gold hover:text-bg transition-all duration-250 text-[11px] font-medium tracking-[2px] uppercase"
			>
				Connect
			</a>
		</li>
	</ul>

	<!-- Hamburger Button -->
	<button
		class="lg:flex flex-col gap-[5px] cursor-pointer z-[1001] p-2"
		on:click={toggleMenu}
		aria-label="Toggle Menu"
	>
		<span
			class="w-[22px] h-[1.5px] bg-text transition-all duration-300 {menuOpen
				? 'rotate-45 translate-y-[6.5px]'
				: ''}"
		></span>
		<span
			class="w-[22px] h-[1.5px] bg-text transition-all duration-300 {menuOpen ? 'opacity-0' : ''}"
		></span>
		<span
			class="w-[22px] h-[1.5px] bg-text transition-all duration-300 {menuOpen
				? '-rotate-45 -translate-y-[6.5px]'
				: ''}"
		></span>
	</button>
</nav>

<!-- Mobile Menu Overlay -->
<div
	class="fixed inset-0 bg-[#060608fa] backdrop-blur-3xl z-[999] flex flex-col items-center justify-center gap-8 transition-all duration-500 {menuOpen
		? 'opacity-100 pointer-events-auto'
		: 'opacity-0 pointer-events-none'}"
>
	<div class="flex flex-col items-center gap-6 w-full max-w-md px-6">
		{#each navLinks as link}
			<a
				href={link.href}
				on:click={closeMenu}
				class="font-['Bebas_Neue'] text-4xl sm:text-5xl tracking-[3px] text-text hover:text-gold transition-colors duration-200 flex items-center gap-4"
			>
				<span class="text-3xl">{link.icon}</span>
				{link.name}
			</a>
		{/each}
	</div>
</div>

<style>
	#nav {
		transition: all 0.4s ease;
	}
</style>