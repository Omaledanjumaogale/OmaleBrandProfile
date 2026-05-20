<script lang="ts">
	import { platforms } from '$lib/data/platforms';
</script>

<section id="ecosystem" class="bg-bg px-6 lg:px-12 py-20">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-14">
		<div class="reveal">
			<div class="font-['Space_Mono'] text-[10px] md:text-xs tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]">
				<span class="w-6 h-[1px] bg-gold" aria-hidden="true"></span> E-WIN Ecosystem
			</div>
			<h2 class="font-['Bebas_Neue'] text-[clamp(36px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6 text-text">
				Unified platforms.<br />One mission.
			</h2>
		</div>
		<div class="text-sm md:text-[15px] leading-[1.8] text-text font-normal reveal delay-100">
			<p>
				The E-WIN Project is an interconnected ecosystem of digital platforms united by a single conviction: that <strong>Africa's workforce gap is solvable</strong> through intelligent, scalable systems built by Africans for Africans.<br /><br />Tagline: <strong class="text-gold">Learn. Work. Earn.</strong>
			</p>
		</div>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
		{#each platforms.slice(0, 12) as platform, i}
			<div class="bg-surface border border-border rounded-[var(--radius)] relative overflow-hidden transition-all duration-300 hover:border-gold-line hover:translate-y-[-4px] hover:shadow-xl group flex flex-col reveal delay-{(i % 8) * 50}">
				<div class="h-[2px] bg-gradient-to-r from-gold to-teal2 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" aria-hidden="true"></div>
				<div class="p-5 sm:p-6 flex flex-col flex-grow">
					<div class="inline-flex items-center gap-2 font-['Space_Mono'] text-[9px] tracking-[2px] uppercase px-2.5 py-1 border border-border2 text-muted rounded-[4px] mb-4 transition-all duration-250 group-hover:border-gold-line group-hover:text-gold self-start">
						{platform.badge}
					</div>

					<div class="flex items-center gap-3 mb-3">
						<div class="w-10 h-10 bg-gold-dim border border-gold-line rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true">
							{platform.icon}
						</div>
						<h3 class="font-['Bebas_Neue'] text-xl md:text-[22px] tracking-[1px] text-text leading-tight">
							{platform.name}
						</h3>
					</div>

					<p class="text-[12px] md:text-[13px] leading-[1.7] text-muted2 font-normal mb-5 flex-grow">
						{platform.overview}
					</p>

					<a
						href={platform.href}
						target={platform.external ? '_blank' : '_self'}
						rel={platform.external ? 'noopener noreferrer' : ''}
						data-sveltekit-reload={platform.external ? undefined : ''}
						class="w-full py-2.5 bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold tracking-[2px] uppercase rounded-xl hover:bg-gold hover:text-white transition-all duration-300 min-h-[44px] flex items-center justify-center gap-2 group/btn mt-auto"
					>
						{platform.external ? 'Visit Platform' : 'Open Platform'}
						<span class="transition-transform group-hover/btn:translate-x-1" aria-hidden="true">→</span>
					</a>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 reveal">
		{#each [[`${platforms.length}`,'Integrated Platforms'],['6+','Sectors Covered'],['10M+','Youth Targeted'],['∞','Impact Potential']] as [num, label]}
			<div class="bg-surface border border-border rounded-xl p-4 text-center">
				<div class="font-['Bebas_Neue'] text-[28px] sm:text-[36px] text-gold tracking-widest leading-none">{num}</div>
				<div class="text-[9px] font-bold tracking-[2px] uppercase text-text mt-1">{label}</div>
			</div>
		{/each}
	</div>

	<div class="mt-8 reveal text-center">
		<a
			href="/platforms"
			class="inline-flex items-center justify-center min-h-[44px] rounded-xl border border-[var(--gold-line)] bg-[var(--gold-dim)] px-6 py-3 text-[11px] font-bold uppercase tracking-[3px] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg)] transition-colors"
		>
			Open Full Platform Explorer
		</a>
	</div>
</section>
