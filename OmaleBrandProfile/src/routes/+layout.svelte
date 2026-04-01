<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ServiceRequestModal from '$lib/components/ServiceRequestModal.svelte';
	import { refreshStats } from '$lib/stores/convex';

	import { page } from '$app/stores';

	let { children } = $props();

	function setupRevealObserver() {
		if (typeof document === 'undefined') return;
		
		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						revealObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		const elements = document.querySelectorAll('.reveal:not(.visible)');
		elements.forEach((el) => revealObserver.observe(el));
	}

	onMount(() => {
		try {
			refreshStats();
		} catch (e) {
			console.error("refreshStats failed:", e);
		}
		
		// Initial setup
		try {
			setupRevealObserver();
		} catch (e) {
			console.error("setupRevealObserver failed:", e);
		}
		
		// Periodic check to catch elements that might have been added late
		const interval = setInterval(setupRevealObserver, 1000);
		
		// Emergency fallback: make everything visible if observer fails
		const fallback = setTimeout(() => {
			document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
		}, 3000);
		
		return () => {
			clearInterval(interval);
			clearTimeout(fallback);
		};
	});

	// Re-run observer on page navigation
	$effect(() => {
		$page.url.pathname;
		if (typeof document !== 'undefined') {
			// Small timeout to ensure DOM is updated
			setTimeout(setupRevealObserver, 100);
		}
	});

	let isAdminRoute = $derived($page.url.pathname.startsWith('/admin'));
</script>

<div class="min-h-screen flex flex-col bg-bg selection:bg-gold selection:text-bg">
	{#if !isAdminRoute}
		<Header />
	{/if}
	<main class="flex-grow overflow-x-hidden">
		{@render children()}
	</main>
	{#if !isAdminRoute}
		<Footer />
	{/if}
	<ServiceRequestModal />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
