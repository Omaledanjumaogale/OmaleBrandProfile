<script lang="ts">
	import { insights } from '$lib/data/insights';
	import { onMount } from 'svelte';

	onMount(() => {
		// Ensure animations work on this page
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>The Blog — Omale Danjuma Ogale</title>
	<meta name="description" content="Essays and analysis on the agentic shift, AI orchestration, and the future of technology in emerging markets." />
</svelte:head>

<section class="pt-32 pb-20 px-6 lg:px-12 min-h-screen">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="reveal mb-16">
			<div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-gold mb-4 flex items-center gap-3">
				<span class="w-8 h-px bg-gold"></span> THE BLOG ✍️
			</div>
			<h1 class="font-['Bebas_Neue'] text-[clamp(48px,8vw,96px)] tracking-[1px] leading-[0.9] mb-6">
				E-WIN<br />Official <span class="text-gold italic">Blog.</span>
			</h1>
			<p class="text-muted2 max-w-[600px] leading-[1.8] font-normal">
				Deep dives into the intersection of cognitive orchestration, social infrastructure, and the emerging agentic economy.
			</p>
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each insights as post, i}
				<article 
					class="reveal group flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5"
					style="transition-delay: {i * 100}ms"
				>
					<div class="p-8 flex flex-col flex-grow">
						<div class="font-['Space_Mono'] text-[9px] tracking-[2px] uppercase text-gold mb-6">
							{post.tag}
						</div>
						
						<h2 class="font-['Bebas_Neue'] text-2xl tracking-[0.5px] leading-tight mb-4 group-hover:text-gold transition-colors duration-300">
							<a href="/blog/{post.slug}">{post.title}</a>
						</h2>
						
						<p class="text-sm text-muted2 leading-relaxed font-normal mb-8 flex-grow">
							{post.excerpt}
						</p>
						
						<div class="flex items-center justify-between pt-6 border-t border-border mt-auto">
							<div class="flex flex-col">
								<span class="text-[10px] text-muted tracking-wider uppercase">{post.date}</span>
								<span class="text-[10px] text-gold tracking-wider uppercase mt-1">{post.readTime}</span>
							</div>
							<a 
								href="/blog/{post.slug}" 
								class="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-bg transition-all duration-300"
								aria-label="Read full essay: {post.title}"
							>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M5 12h14m-7-7 7 7-7 7"/>
								</svg>
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
