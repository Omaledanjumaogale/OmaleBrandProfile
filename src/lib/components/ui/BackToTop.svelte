<script lang="ts">
  import { onMount } from 'svelte';

  let visible = false;

  onMount(() => {
    const handleScroll = () => {
      visible = window.scrollY > 400;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<button
  on:click={scrollToTop}
  class="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[var(--surface-bright)] border border-[var(--border)] text-[var(--text-main)] shadow-2xl transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:-translate-y-2 {visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}"
  aria-label="Back to top"
>
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7 7 7M12 3v18" />
  </svg>
  
  <!-- Subtle ring animation -->
  <span class="absolute inset-0 rounded-full border border-[var(--gold)] animate-ping opacity-20"></span>
</button>
