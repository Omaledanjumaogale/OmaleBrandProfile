<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	onMount(() => {
		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
	});
</script>

<div class="min-h-screen flex flex-col bg-bg selection:bg-gold selection:text-bg">
	<Header />
	<main class="flex-grow overflow-x-hidden">
		<slot />
	</main>
	<Footer />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>