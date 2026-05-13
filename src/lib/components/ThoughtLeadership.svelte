<script lang="ts">
	const thoughts = [
		{
			slug: 'the-agentic-shift',
			tag: 'Featured Essay ✍️',
			title: 'The Agentic Shift: Why the Next Decade Belongs to AI-Augmented Founders 🤖',
			body: 'We are entering the most significant redistribution of productive capacity in human history. AI agents are not tools — they are leverage. And founders who learn to orchestrate them will operate at the velocity of entire teams.',
			featured: true
		},
		{
			slug: 'emerging-markets-ai-gap',
			tag: 'Analysis 📊',
			title: 'Emerging Markets & The AI Access Gap 🌍',
			body: 'The democratisation of AI is uneven. Without intentional infrastructure investment and localised model training, the gap between AI-enabled and AI-excluded economies will widen dramatically by 2030.',
			featured: false
		},
		{
			slug: 'building-for-dignity',
			tag: 'Framework 🏗️',
			title: 'Building for Dignity: A Sociological Framework for Ethical AI Product Design ⚖️',
			body: 'Ethical AI is not about compliance checklists. It is about designing systems that preserve human dignity, expand agency, and distribute value fairly across all users — not just the most profitable segment.',
			featured: false
		}
	];
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