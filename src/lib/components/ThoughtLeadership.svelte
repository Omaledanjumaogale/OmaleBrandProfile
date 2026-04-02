<script lang="ts">
	const thoughts = [
		{
			tag: 'Featured Essay ✍️',
			title: 'The Agentic Shift: Why the Next Decade Belongs to AI-Augmented Founders 🤖',
			body: 'We are entering the most significant redistribution of productive capacity in human history. AI agents are not tools — they are leverage. And founders who learn to orchestrate them will operate at the velocity of entire teams. Here\'s what that means for how we build, what we build, and who gets to build it.',
			featured: true
		},
		{
			tag: 'Analysis 📊',
			title: 'Emerging Markets & The AI Access Gap 🌍',
			body: 'The democratisation of AI is uneven. Without intentional infrastructure investment and localised model training, the gap between AI-enabled and AI-excluded economies will widen dramatically by 2030. Approximately 26% of jobs in low-income countries are already exposed to AI displacement.',
			featured: false
		},
		{
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
			<span class="w-6 h-[1px] bg-gold"></span> AI Thought Leadership 🧠
		</div>
		<h2 class="font-['Bebas_Neue'] text-[clamp(36px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">
			Perspectives on<br />what's coming.
		</h2>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-[1px] bg-border border border-border rounded-[var(--radius)] overflow-hidden">
		{#each thoughts as thought, i}
			<div class="bg-surface p-9 transition-colors duration-300 hover:bg-surface2 group cursor-default {thought.featured ? 'lg:col-span-2 bg-surface2' : ''} reveal delay-{i * 100}">
				<div class="font-['Space_Mono'] text-sm md:text-[8px] tracking-[2px] uppercase text-gold mb-4">
					{thought.tag}
				</div>
				<h3 class="font-['Bebas_Neue'] text-xl sm:text-2xl tracking-[0.5px] leading-[1.1] mb-3 flex items-center gap-3">
					{thought.title}
				</h3>
				<p class="text-sm md:text-[12px] leading-[1.75] text-muted2 font-light">
					{thought.body}
				</p>
				<span class="block mt-6 text-xl text-gold transition-transform duration-250 group-hover:translate-x-1.5">
					→
				</span>
			</div>
		{/each}
	</div>
</section>