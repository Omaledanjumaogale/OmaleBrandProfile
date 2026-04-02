<script lang="ts">
	const principles = [
		{
			num: '01',
			title: 'Systems over heroics 🏗️',
			text: 'Individual brilliance has a ceiling. Well-designed systems compound indefinitely. I build structures that work without my presence — and scale precisely because of that.'
		},
		{
			num: '02',
			title: 'Empathy before automation 🧠',
			text: 'Every AI system begins with a human problem clearly defined. Technology is the implementation, never the premise. Understanding people deeply is a competitive advantage.'
		},
		{
			num: '03',
			title: 'Ship, learn, sharpen 🚀',
			text: 'Perfectionism is the enemy of impact. I move fast with intention — releasing, observing, iterating. The market is the most honest feedback mechanism available.'
		},
		{
			num: '04',
			title: 'Equity as architecture ⚖️',
			text: 'Social impact is not a feature added at the end — it is baked into the business model from day one. If the economics don\'t serve underrepresented communities, the design is wrong.'
		},
		{
			num: '05',
			title: 'Compound everything 📈',
			text: 'Knowledge, relationships, capital, reputation — all assets that compound. Short-term thinking is the most expensive strategic mistake a founder can make.'
		}
	];
</script>

<section id="philosophy" class="bg-surface border-t border-border px-6 lg:px-12 py-20">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
		<div class="reveal">
			<div
				class="font-['Space_Mono'] text-sm md:text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"
			>
				<span class="w-6 h-[1px] bg-gold"></span> Operating Principles ⚖️
			</div>
			<h2 class="font-['Bebas_Neue'] text-[clamp(36px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">
				The code I<br />build by.
			</h2>
			<p class="text-sm md:text-[15px] text-muted2 leading-[1.8] font-light max-w-[540px] mt-4">
				Every product decision, every strategic choice flows from a deliberately constructed philosophical framework. These aren't slogans — they are constraints that produce better outcomes. 🏗️
			</p>
		</div>

		<div class="flex flex-col reveal delay-200">
			{#each principles as principle, i}
				<div class="py-7 border-b border-border last:border-b-0 flex gap-5 items-start transition-all duration-300 hover:pl-2 group">
					<span class="font-['Space_Mono'] text-sm md:text-[11px] text-gold pt-0.5 group-hover:scale-110 transition-transform">{principle.num}</span>
					<div>
						<div class="font-['Bebas_Neue'] text-xl tracking-[1px] mb-1.5 flex items-center gap-2">
							{principle.title}
						</div>
						<p class="text-sm md:text-[12px] leading-[1.75] text-muted2 font-light">
							{principle.text}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>