<script lang="ts">
  import { navigating } from '$app/stores';
</script>

{#if $navigating}
  <!-- Full-page progress bar during SvelteKit page transitions -->
  <div
    class="fixed top-0 left-0 right-0 z-[9999] h-[3px] overflow-hidden"
    role="progressbar"
    aria-label="Page loading"
    aria-valuetext="Loading..."
  >
    <div class="h-full bg-gradient-to-r from-gold via-gold2 to-teal2 animate-pageload"></div>
  </div>
{/if}

<style>
  @keyframes pageload {
    0%   { transform: translateX(-100%); }
    60%  { transform: translateX(-10%); }
    100% { transform: translateX(0%); }
  }
  .animate-pageload {
    animation: pageload 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
</style>
