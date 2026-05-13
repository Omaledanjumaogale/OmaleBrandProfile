<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import ServiceRequestModal from '$lib/components/ServiceRequestModal.svelte';
	import Toast from '$lib/components/ui/Toast.svelte';
	import { theme } from '$lib/stores/ui';

	let { children } = $props();

	// ── Scroll-reveal observer ──────────────────────────────────────
	let revealObserver: IntersectionObserver | null = null;

	function setupRevealObserver() {
		if (typeof document === 'undefined') return;
		if (!revealObserver) {
			revealObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('visible');
							revealObserver?.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
			);
		}
		document.querySelectorAll<HTMLElement>('.reveal:not(.visible)').forEach((el) =>
			revealObserver!.observe(el)
		);
	}

	onMount(() => {
		// Initialise theme from localStorage / system preference
		theme.init();
		setupRevealObserver();

		// Catch dynamically added .reveal elements
		const mutObs = new MutationObserver(() => setupRevealObserver());
		mutObs.observe(document.body, { childList: true, subtree: true });

		// Fallback: reveal all after 3s if animations are blocked
		const fallback = setTimeout(() => {
			document.querySelectorAll<HTMLElement>('.reveal').forEach((el) =>
				el.classList.add('visible')
			);
		}, 3000);

		return () => {
			revealObserver?.disconnect();
			mutObs.disconnect();
			clearTimeout(fallback);
		};
	});

	// Re-observe after navigation
	$effect(() => {
		$page.url.pathname;
		if (typeof document !== 'undefined') {
			setTimeout(setupRevealObserver, 150);
		}
	});
</script>

<div class="min-h-screen flex flex-col bg-[var(--bg)] selection:bg-[var(--gold)] selection:text-[var(--bg)]">
	<!-- Skip to main content for keyboard users -->
	<a 
		href="#main-content" 
		class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-gold focus:text-bg focus:font-bold focus:rounded-xl focus:shadow-2xl transition-all"
	>
		Skip to content
	</a>

	<Header />

	<main id="main-content" class="flex-grow overflow-x-hidden">
		{@render children()}
	</main>

	<Footer />
	<BottomNav />

	<!-- Service request modal — visitors can request Omale's services -->
	<ServiceRequestModal />
	<Toast />
	<BackToTop />
</div>
