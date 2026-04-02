<script lang="ts">
	const expertise = [
		{
			num: '01',
			title: 'AI Development 🤖',
			desc: 'Prompt engineering, context design, agentic workflows, and AI-augmented product development. IBM certified in Generative AI.',
			icon: '🤖'
		},
		{
			num: '02',
			title: 'Platform Building 💻',
			desc: 'Full-stack web & mobile application development. Four live platforms within the E-WIN ecosystem including E-Deals, AkademyX, and DealxHire.',
			icon: '💻'
		},
		{
			num: '03',
			title: 'Business Strategy 📈',
			desc: 'Blue ocean modelling, RaaS frameworks, decentralised workforce architecture, and stakeholder value mapping across multiple sectors.',
			icon: '📈'
		},
		{
			num: '04',
			title: 'HR & Administration 🏢',
			desc: 'PMP and HR certified. Head of Administration at Triming Radio. Managed CESMP, HSE & HR at World Bank-funded irrigation project.',
			icon: '🏢'
		},
		{
			num: '05',
			title: 'Sociological Analysis 🧠',
			desc: 'Applied sociology underpins every product decision — understanding communities, inequalities, and the behavioural economics of emerging market users.',
			icon: '🧠'
		}
	];
</script>

<section id="expertise" class="bg-bg px-6 lg:px-12 py-20">
	<div class="flex justify-between items-end mb-14 gap-10 flex-wrap">
		<div class="reveal">
			<div
				class="font-['Space_Mono'] text-sm md:text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"
			>
				<span class="w-6 h-[1px] bg-gold"></span> Core Competencies 🛠️
			</div>
			<h2 class="font-['Bebas_Neue'] text-[clamp(36px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">
				Five layers<br />of leverage.
			</h2>
		</div>
		<p class="text-sm md:text-[15px] text-muted2 leading-[1.8] font-light max-w-[540px] reveal delay-100">
			Each domain reinforces the other — creating a compounding advantage that no single-skill practitioner can replicate. 🚀
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[1px] bg-border border border-border rounded-[var(--radius)] overflow-hidden">
		{#each expertise as item}
			<div class="bg-bg p-9 transition-colors duration-300 hover:bg-surface2 group cursor-default border-border">
				<div class="font-['Space_Mono'] text-sm md:text-[9px] text-gold tracking-widest mb-3 opacity-70">
					{item.num}
				</div>
				<div class="w-10 h-10 bg-gold-dim border border-gold-line rounded-[10px] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#c9a84c33] group-hover:border-gold text-2xl">
					{item.icon}
				</div>
				<h3 class="font-['Bebas_Neue'] text-xl tracking-[1px] mb-[10px]">
					{item.title}
				</h3>
				<p class="text-sm md:text-[12px] leading-[1.7] text-muted2 font-light">
					{item.desc}
				</p>
			</div>
		{/each}
	</div>
</section>