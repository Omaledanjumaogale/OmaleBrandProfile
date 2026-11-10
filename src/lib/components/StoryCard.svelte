<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	let { image, alt, title, text, href, label }: {
		image: string; alt: string; title: string; text: string; href: string; label: string;
	} = $props();
</script>

<article class="mx-auto my-8 grid max-w-[1200px] overflow-hidden rounded-lg border border-border bg-surface text-text md:grid-cols-2">
	<img src="/campaign/{image}.webp" {alt} width="800" height="450" loading="lazy" decoding="async" class="h-full w-full object-cover" />
	<div class="self-center p-6 md:p-10">
		<h2 class="font-['Bebas_Neue'] text-4xl">{title}</h2>
		<p class="mt-2 max-w-[36ch]">{text}</p>
		<a {href} class="mt-2 inline-flex min-h-[44px] items-center gap-2 underline">{label} <ArrowRight size={17} aria-hidden="true" /></a>
	</div>
</article>
