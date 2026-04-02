<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$lib/stores/auth';

	const navLinks = [
		{ name: 'Home', href: '/', icon: '🏠' },
		{ name: 'Services', href: '/#services', icon: '🛠️' },
		{ name: 'E-WIN', href: '/#ecosystem', icon: '🌍' }
	];

	const authLinks = $derived($user ? [
		{ name: 'Admin', href: '/admin', icon: '🛡️' },
		{ name: 'Dashboard', href: '/dashboard', icon: '👤' }
	] : [
		{ name: 'Login', href: '/admin/login', icon: '🗝️' }
	]);

	const allLinks = $derived([...navLinks, ...authLinks].slice(0, 5));
</script>

<nav class="fixed bottom-0 left-0 right-0 z-[1000] bg-[#060608eb] backdrop-blur-2xl border-t border-border px-4 py-3 md:hidden flex items-center justify-around safe-area-bottom">
	{#each allLinks as link}
		<a 
			href={link.href}
			class="flex flex-col items-center gap-1 transition-colors min-w-[64px] min-h-[44px] justify-center {$page.url.pathname === link.href ? 'text-gold' : 'text-muted hover:text-text'}"
		>
			<span class="text-xl">{link.icon}</span>
			<span class="text-[10px] font-['Space_Mono'] uppercase tracking-widest font-bold">{link.name}</span>
		</a>
	{/each}
</nav>

<style>
	.safe-area-bottom {
		padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
	}
</style>
