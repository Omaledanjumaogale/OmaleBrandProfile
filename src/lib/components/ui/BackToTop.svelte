<script lang="ts">
	let visible = $state(false);

	function handleScroll() {
		visible = window.scrollY > 600;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	$effect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

{#if visible}
	<button
		onclick={scrollToTop}
		class="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gold text-bg rounded-xl shadow-lg flex items-center justify-center text-xl font-bold hover:bg-gold2 hover:scale-110 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 min-h-[44px] min-w-[44px]"
		aria-label="Back to top"
		title="Back to top"
	>
		↑
	</button>
{/if}
