<script lang="ts">
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    const handleScroll = () => {
      visible = window.scrollY > 400;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<button
  onclick={scrollToTop}
  class="fixed bottom-24 sm:bottom-8 right-4 sm:right-8 z-50 p-4 rounded-full bg-surface border border-border text-text shadow-2xl transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-1 {visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'}"
  aria-label="Back to top of page"
>
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7 7 7M12 3v18" />
  </svg>

  <!-- Subtle ring animation -->
  <span class="absolute inset-0 rounded-full border border-gold animate-ping opacity-20" aria-hidden="true"></span>
</button>
