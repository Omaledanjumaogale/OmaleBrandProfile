<script lang="ts">
	const timeline = [
		{
			period: 'June 2025 – Present',
			role: 'Head of Administration / General Secretary 📻',
			org: 'Triming Radio 105.9 FM · Kano State 🇳🇬',
			desc: 'Overseeing institutional administration, broadcast governance, and operational systems for one of northern Nigeria\'s leading FM radio stations.'
		},
		{
			period: '2020 – 2023',
			role: 'Admin Manager · Quality & Safety · Consultant ✈️',
			org: 'Private Flyers International Limited · Kaduna (Aviation) 🛩️',
			desc: 'Triple-role tenure spanning administrative management, DATS-certified quality and safety systems, and strategic business consulting for aerial aviation and flight training operations.'
		},
		{
			period: '2018 – 2020',
			role: 'CESMP, HSE & HR Manager Asst. 🏗️',
			org: 'CGC-CHWE Joint Venture · World Bank / TRIMING Project · Zamfara 💧',
			desc: 'Embedded with a World Bank-funded irrigation management project — managing community relations, environmental social management plans, health & safety, and human resources for a large-scale infrastructure programme.'
		},
		{
			period: '2015 – 2018',
			role: 'Administrative Assistant to the Honourable Member 🏛️',
			org: 'Kaduna State House of Assembly · Lord Lugard Complex 📜',
			desc: 'Legislative and administrative support for a sitting member of the Kaduna State Assembly, building deep knowledge of governance systems and institutional processes.'
		},
		{
			period: '2013 – 2014',
			role: 'Senior Class Teacher (NYSC) 👨‍🏫',
			org: 'G.S.S. Gurara · Niger State 📚',
			desc: 'National service as a senior-level educator — an experience that deepened conviction in the transformative power of knowledge transfer and education systems.'
		}
	];
</script>

<section id="career" class="bg-surface border-y border-border px-6 lg:px-12 py-20">
	<div class="reveal mb-14">
		<div
			class="font-['Space_Mono'] text-sm md:text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"
		>
			<span class="w-6 h-[1px] bg-gold"></span> Professional Journey 💼
		</div>
		<h2 class="font-['Bebas_Neue'] text-[clamp(36px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">
			Twelve years.<br />Multiple sectors.
		</h2>
		<p class="text-sm md:text-[15px] text-muted2 leading-[1.8] font-light max-w-[540px]">
			From legislative chambers to aviation operations to radio broadcasting — a career defined by range, resilience, and relentless forward motion. 🚀
		</p>
	</div>

	<div class="relative pl-8 border-l border-gold/20 ml-4 space-y-10">
		{#each timeline as item, i}
			<div class="relative reveal delay-{i * 100}">
				<div
					class="absolute -left-[41px] top-[6px] w-4 h-4 bg-gold border-4 border-surface rounded-full shadow-[0_0_0_4px_rgba(201,168,76,0.1)]"
				></div>
				<div class="font-['Space_Mono'] text-sm md:text-[9px] tracking-[2px] text-gold uppercase mb-1.5">
					{item.period}
				</div>
				<div class="font-['Bebas_Neue'] text-xl sm:text-2xl tracking-[1px] text-text mb-1">
					{item.role}
				</div>
				<div class="text-sm md:text-[13px] text-muted2 font-light italic">
					{item.org}
				</div>
				<div class="text-sm md:text-[12px] text-muted leading-[1.7] mt-2 font-light max-w-2xl">
					{item.desc}
				</div>
			</div>
		{/each}
	</div>
</section>