<script lang="ts">
	let { data } = $props();
	const post = data.post;
</script>

<svelte:head>
	<title>{post.title} — Insights — Omale Danjuma Ogale</title>
	<meta name="description" content={post.excerpt} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:type" content="article" />
</svelte:head>

<article class="pt-32 pb-24 px-6">
	<div class="max-w-3xl mx-auto">
		<!-- Back link -->
		<a href="/insights" class="inline-flex items-center gap-2 text-gold font-['Space_Mono'] text-[10px] tracking-[2px] uppercase mb-12 hover:gap-4 transition-all duration-300">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
			Back to Insights
		</a>

		<!-- Header -->
		<header class="reveal mb-16">
			<div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-6">
				{post.tag}
			</div>
			<h1 class="font-['Bebas_Neue'] text-[clamp(40px,6vw,80px)] tracking-[1px] leading-[0.95] mb-8">
				{post.title}
			</h1>
			
			<div class="flex items-center gap-6 pt-8 border-t border-border">
				<div class="flex flex-col">
					<span class="text-[10px] text-muted tracking-widest uppercase">Published</span>
					<span class="text-sm text-text font-normal mt-1">{post.date}</span>
				</div>
				<div class="w-px h-8 bg-border"></div>
				<div class="flex flex-col">
					<span class="text-[10px] text-muted tracking-widest uppercase">Reading Time</span>
					<span class="text-sm text-text font-normal mt-1">{post.readTime}</span>
				</div>
				<div class="w-px h-8 bg-border"></div>
				<div class="flex flex-col">
					<span class="text-[10px] text-muted tracking-widest uppercase">Author</span>
					<span class="text-sm text-text font-normal mt-1">{post.author}</span>
				</div>
			</div>
		</header>

		<!-- Content -->
		<div class="reveal prose prose-invert prose-gold max-w-none 
		            prose-p:text-muted2 prose-p:leading-[1.8] prose-p:text-lg prose-p:font-normal
		            prose-h3:font-['Bebas_Neue'] prose-h3:text-3xl prose-h3:tracking-[1px] prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-text
		            prose-strong:text-gold prose-strong:font-bold">
			{@html post.content}
		</div>

		<!-- Footer / Share -->
		<footer class="mt-24 pt-12 border-t border-border reveal">
			<div class="flex flex-col items-center text-center">
				<p class="text-muted text-sm font-normal mb-8">
					Thank you for reading. This essay is part of an ongoing exploration into orchestrating the future.
				</p>
				<button 
					onclick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
					class="px-8 py-4 bg-gold/10 text-gold font-['Bebas_Neue'] text-lg tracking-[2px] rounded-xl hover:bg-gold hover:text-bg transition-all duration-300"
				>
					Share this Perspective 🐦
				</button>
			</div>
		</footer>
	</div>
</article>

<style>
	/* Custom prose tweaks for the brand */
	:global(.prose p) {
		margin-bottom: 1.5rem;
	}
</style>
