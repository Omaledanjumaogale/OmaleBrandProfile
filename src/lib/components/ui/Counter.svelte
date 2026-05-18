<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';

  let { target = 0, suffix = "", duration = 2000 } = $props();
  
  let displayedValue = spring(0, {
    stiffness: 0.05,
    damping: 0.3
  });

  let element: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        displayedValue.set(target);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(element);
    return () => observer.disconnect();
  });
</script>

<span bind:this={element}>
  {Math.floor($displayedValue)}{suffix}
</span>
