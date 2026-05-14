<script lang="ts">
	import { insights } from '$lib/data/insights';
	
	// Display the 3 most recent/significant insights
	const thoughts = insights.slice(0, 3).map(i => ({
		slug: i.slug,
		tag: i.tag,
		title: i.title,
		body: i.excerpt
	}));
</script>

<section id="thought" class="bg-bg border-t border-border px-6 lg:px-12 py-20">
	<div class="reveal mb-14">
		<div
			class="font-['Space_Mono'] text-sm md:text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"
		>
			<span class="w-6 h-px bg-gold"></span> AI Thought Leadership 🧠
		</div>
		<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
			<h2 class="font-['Bebas_Neue'] text-[clamp(36px,5vw,72px)] tracking-[1px] leading-[0.95]">
				Perspectives on<br />what's coming.
			</h2>
			<a href="/blog" class="font-['Bebas_Neue'] text-xl tracking-[2px] text-gold hover:text-text transition-colors flex items-center gap-2 pb-2">
				Explore All Articles →
			</a>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
		{#each thoughts as thought, i}
			<a 
				href="/blog/{thought.slug}"
				class="group bg-bg p-8 flex flex-col transition-all duration-500 hover:bg-surface reveal"
				style="transition-delay: {i * 100}ms"
			>
				<div class="font-['Space_Mono'] text-[9px] tracking-[2px] uppercase text-gold mb-6">
					{thought.tag}
				</div>
				<h3 class="font-['Bebas_Neue'] text-xl sm:text-2xl tracking-[0.5px] leading-[1.1] mb-3 flex items-center gap-3">
					{thought.title}
				</h3>
				<p class="text-sm md:text-[12px] leading-[1.75] text-muted2 font-normal">
					{thought.body}
				</p>
				<span class="block mt-6 text-xl text-gold transition-transform duration-250 group-hover:translate-x-1.5" aria-hidden="true">
					→
				</span>
			</a>
		{/each}
	</div>
</section>