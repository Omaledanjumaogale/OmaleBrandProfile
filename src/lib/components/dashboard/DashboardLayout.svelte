<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import { auth } from '$lib/services/firebase';
	import { goto } from '$app/navigation';

	let { title = 'Dashboard 📊', isAdmin = false, children } = $props();

	let isSidebarOpen = $state(false);

	const toggleSidebar = () => {
		isSidebarOpen = !isSidebarOpen;
	};

	const navItems = $derived(isAdmin ? [
		{ label: 'Overview 📊', href: '/admin', icon: '📈' },
		{ label: 'Settings ⚙️', href: '/admin/settings', icon: '⚙️' }
	] : [
		{ label: 'My Hub 🌍', href: '/dashboard', icon: '🏠' },
		{ label: 'Profile 👤', href: '/dashboard/profile', icon: '👤' }
	]);

	const handleLogout = async () => {
		if (!auth) return;
		try {
			await auth.signOut();
			goto('/');
		} catch (e) {
			console.error('Logout failed:', e);
		}
	};
</script>

<div class="min-h-screen bg-bg flex text-text font-sans">
	<!-- Sidebar -->
	<aside
		class="fixed inset-y-0 left-0 z-50 w-72 bg-surface border-r border-border transition-transform duration-300 transform lg:translate-x-0 {isSidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<div class="p-8 border-b border-border flex items-center justify-between">
			<a href="/" class="text-2xl font-['Bebas_Neue'] tracking-widest text-text">
				<span class="text-gold italic">E</span>-WIN {isAdmin ? 'ADMIN' : 'DASH'}
			</a>
			<button class="lg:hidden text-muted" onclick={toggleSidebar}>✕</button>
		</div>

		<nav class="p-6 space-y-2">
			{#each navItems as item}
				<a
					href={item.href}
					class="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-surface2 hover:text-gold group border border-transparent hover:border-gold-line"
				>
					<span class="text-2xl transition-transform group-hover:scale-125">{item.icon}</span>
					<span class="font-['Space_Mono'] text-[11px] tracking-[2px] uppercase font-bold">{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-surface2/50">
			<button
				onclick={handleLogout}
				class="w-full flex items-center gap-4 p-4 rounded-xl text-red-400 hover:bg-red-400/10 transition-all border border-transparent hover:border-red-400/20 uppercase text-[10px] tracking-widest font-bold"
			>
				<span>🚪</span> Logout
			</button>
		</div>
	</aside>

	<!-- Main Content -->
	<div class="flex-grow lg:ml-72 flex flex-col min-w-0">
		<!-- Top Bar -->
		<header class="h-20 bg-surface/50 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
			<button class="lg:hidden p-2 text-gold" onclick={toggleSidebar}>☰</button>
			<h1 class="font-['Bebas_Neue'] text-3xl tracking-widest uppercase">{title}</h1>

			<div class="flex items-center gap-6">
				<div class="hidden sm:flex flex-col items-end">
					<span class="text-xs font-bold text-text uppercase tracking-widest">Danjuma O.</span>
					<span class="text-[10px] text-gold font-['Space_Mono']">{isAdmin ? 'ADMIN PORTAL' : 'ELITE MEMBER'}</span>
				</div>
				<div class="w-10 h-10 rounded-full bg-gold-dim border border-gold-line flex items-center justify-center text-xl shadow-lg shadow-gold/10">
					👤
				</div>
			</div>
		</header>

		<!-- Dashboard Content -->
		<main class="p-6 lg:p-10 flex-grow max-w-[1400px] mx-auto w-full overflow-x-hidden">
			{@render children()}
		</main>

		<!-- Dashboard Footer -->
		<footer class="p-6 border-t border-border text-center">
			<p class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase">
				© 2026 OmaleBrandProfile · Secure Enterprise Infrastructure 🛡️
			</p>
		</footer>
	</div>
</div>

{#if isSidebarOpen}
	<button 
		class="fixed inset-0 bg-bg/80 backdrop-blur-sm z-40 lg:hidden w-full h-full border-none cursor-default" 
		onclick={toggleSidebar}
		aria-label="Close Sidebar"
	></button>
{/if}
