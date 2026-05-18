<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import ServiceRequestModal from '$lib/components/ServiceRequestModal.svelte';
	import ToastProvider from '$lib/components/ui/ToastProvider.svelte';
	import BackToTop from '$lib/components/ui/BackToTop.svelte';
	import PageLoader from '$lib/components/ui/PageLoader.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { theme } from '$lib/stores/ui';
	import { initAuth } from '$lib/stores/auth';

	let { data, children } = $props();

	// Derived SEO data from page data — allows child pages to override layout metadata
	const seo = $derived(data.seo);

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
		theme.init();
		setupRevealObserver();
		const unsubscribeAuth = initAuth();

		const mutObs = new MutationObserver(() => setupRevealObserver());
		mutObs.observe(document.body, { childList: true, subtree: true });

		const fallback = setTimeout(() => {
			document.querySelectorAll<HTMLElement>('.reveal').forEach((el) =>
				el.classList.add('visible')
			);
		}, 3000);

		void (async () => {
			if ('serviceWorker' in navigator && 'PushManager' in window) {
				try {
					const registration = await navigator.serviceWorker.register('/service-worker.js', {
						type: 'module',
						scope: '/'
					});
					console.log('[PWA] Service Worker registered:', registration);
				} catch (err) {
					console.error('[PWA] Service Worker registration failed:', err);
				}
			}
		})();

		return () => {
			unsubscribeAuth();
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

<!-- AEO/GEO Optimized Metadata -->
<SEO meta={seo} />

<div class="min-h-screen flex flex-col bg-[var(--bg)] selection:bg-[var(--gold)] selection:text-[var(--bg)]">
	<!-- Page transition loader -->
	<PageLoader />

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
	<ToastProvider />
	<BackToTop />
</div>
