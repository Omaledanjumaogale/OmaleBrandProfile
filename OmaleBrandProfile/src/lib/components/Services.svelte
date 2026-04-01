<script lang="ts">
	import { openServiceModal } from '$lib/stores/ui';

	const services = [
		{
			title: 'App Development 📱',
			desc: 'Architecting high-performance web and mobile applications with SvelteKit, React Native, and robust backend infrastructures.',
			icon: '💻',
			tags: ['Web', 'Mobile', 'Full-Stack']
		},
		{
			title: 'AI Consultancy 🤖',
			desc: 'AI-augmented knowledge facilitation and strategic consultancy to integrate Generative AI into your business workflows.',
			icon: '🧠',
			tags: ['GenAI', 'Prompt Engineering', 'Strategy']
		},
		{
			title: 'Business Advisory 💼',
			desc: 'Expert business strategy and operational advisory for startups and established corporations seeking scalable growth.',
			icon: '📈',
			tags: ['Strategy', 'Advisory', 'Growth']
		},
		{
			title: 'Academic Writing 🎓',
			desc: 'Professional assistance for final year projects, Master’s theses, and Doctorate dissertations with rigorous research standards.',
			icon: '📜',
			tags: ['Theses', 'Research', 'Dissertations']
		},
		{
			title: 'Corporate Writing ✍️',
			desc: 'Crafting high-impact business plans, proposals, grant applications, and comprehensive technical reports for any sector.',
			icon: '📄',
			tags: ['Proposals', 'Grants', 'Plans']
		},
		{
			title: 'Branding & Design 🎨',
			desc: 'End-to-end corporate identity design, professional branding, and high-quality printing services for your business.',
			icon: '✨',
			tags: ['Branding', 'Design', 'Printing']
		}
	];
</script>

<section id="services" class="bg-bg px-6 lg:px-12 py-24 relative overflow-hidden">
	<!-- Decorative background elements -->
	<div class="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse,rgba(201,168,76,0.04)_0%,transparent_70%)] pointer-events-none"></div>
	<div class="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse,rgba(60,179,113,0.03)_0%,transparent_70%)] pointer-events-none"></div>

	<div class="max-w-[1200px] mx-auto relative z-10">
		<div class="text-center mb-16 reveal">
			<div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-gold mb-4">
				Professional Services 🛠️
			</div>
			<h2 class="font-['Bebas_Neue'] text-[clamp(45px,6vw,84px)] tracking-[2px] leading-[0.9] mb-6">
				Strategic Solutions.<br /><span class="text-gold">Expert Implementation.</span>
			</h2>
			<p class="text-[15px] leading-[1.8] text-muted2 max-w-[600px] mx-auto font-light">
				Leveraging a decade of interdisciplinary expertise to deliver high-impact results across technology, business, and research sectors. 🌍
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each services as service, i}
				<div class="bg-surface border border-border p-8 rounded-[var(--radius)] group hover:border-gold-line transition-all duration-400 relative overflow-hidden flex flex-col h-full reveal delay-{i * 100}">
					<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-teal2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
					
					<div class="w-14 h-14 bg-bg border border-border rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:border-gold-line transition-all duration-300">
						{service.icon}
					</div>

					<h3 class="font-['Bebas_Neue'] text-2xl tracking-[1.5px] text-text mb-3">
						{service.title}
					</h3>
					
					<p class="text-[13px] leading-[1.7] text-muted2 font-light mb-8 flex-grow">
						{service.desc}
					</p>

					<div class="flex flex-wrap gap-2 pt-6 border-t border-border mt-auto">
						{#each service.tags as tag}
							<span class="text-[9px] font-['Space_Mono'] tracking-[1px] uppercase text-muted border border-border2 px-2 py-0.5 rounded group-hover:border-gold-line/30 group-hover:text-gold/80 transition-colors">
								{tag}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-20 p-10 bg-surface border border-gold-line/20 rounded-[var(--radius)] text-center reveal">
			<h4 class="font-['Bebas_Neue'] text-3xl tracking-[2px] mb-4">Ready to start a project? 🤝</h4>
			<p class="text-[14px] text-muted2 mb-8 max-w-[500px] mx-auto font-light">
				Whether you need a full-scale enterprise application or a comprehensive business plan, I am ready to bring your vision to life.
			</p>
			<button 
				onclick={openServiceModal}
				class="inline-block px-10 py-4 bg-gold text-bg text-[11px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 hover:translate-y-[-2px] transition-all shadow-lg shadow-gold/20"
			>
				Consult with Me 🚀
			</button>
		</div>
	</div>
</section>
