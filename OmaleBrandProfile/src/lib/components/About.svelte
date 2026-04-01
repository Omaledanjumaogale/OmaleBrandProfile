<script lang="ts">
	const stats = [
		{ num: '10M+', label: 'Youth Targeted 🎯' },
		{ num: '25+', label: 'Platforms Live & Coming Soon 💻' },
		{ num: '∞', label: 'Impact Potential 🚀' }
	];

	const creds = [
		{
			title: 'Ahmadu Bello University, Zaria 🎓',
			sub: 'M.Sc Law Enforcement & Criminal Justice · B.Sc Sociology',
			icon: '🎓'
		},
		{
			title: 'Kaduna Business School 💼',
			sub: 'Diploma in Entrepreneurial Finance · ICT',
			icon: '📈'
		},
		{
			title: 'Current Base 📍',
			sub: 'Gwarinpa, Abuja · Nigeria 🇳🇬',
			icon: '📍'
		}
	];
</script>

<section id="about" class="bg-surface border-y border-border px-6 lg:px-12 py-20">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
		<div class="reveal">
			<div
				class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"
			>
				<span class="w-6 h-[1px] bg-gold"></span> Origin Story 📖
			</div>
			<h2 class="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">
				Built from<br />conviction.
			</h2>
			<div class="grid grid-cols-3 gap-[1px] bg-border border border-border rounded-[var(--radius)] overflow-hidden mt-10">
				{#each stats as stat}
					<div class="bg-bg p-5 sm:p-6 text-center">
						<div class="font-['Bebas_Neue'] text-[32px] sm:text-[44px] text-gold tracking-widest leading-none">
							{stat.num}
						</div>
						<div class="text-[9px] tracking-[2px] uppercase text-muted mt-[6px]">
							{stat.label}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="reveal delay-200">
			<p class="text-[15px] leading-[1.85] text-muted2 font-light mb-5">
				I am <strong>Danjuma Umar Omale Ogale</strong> — a sociologist turned AI developer, business strategist, and serial founder operating from Abuja, Nigeria. My academic foundation at Ahmadu Bello University Zaria in Sociology and Law Enforcement gave me a deep lens through which I read systems, power, and human behaviour. 🇳🇬
			</p>
			<p class="text-[15px] leading-[1.85] text-muted2 font-light mb-5">
				That lens became the blueprint for the <strong>E-WIN Project</strong> — Elite Workforce Impact Nigeria — a decentralised ecosystem designed to upskill unemployed youth, create sustainable earning pathways, and disrupt the traditional service sector through technology, AI, and collaborative networking. 🚀
			</p>
			<p class="text-[15px] leading-[1.85] text-muted2 font-light mb-5">
				From aviation management to radio administration, from community liaison to prompt engineering, I have operated at the intersection of institutions and innovation — always with one guiding north star: <strong>empower people from within the system, not from outside it.</strong> 🏗️
			</p>
			<div class="flex flex-col gap-3 mt-8">
				{#each creds as cred}
					<div class="flex items-start gap-3 p-4 border-b border-border last:border-b-0 hover:bg-surface2 transition-colors duration-200 rounded-lg">
						<div class="w-8 h-8 bg-gold-dim border border-gold-line rounded-lg flex items-center justify-center shrink-0 text-gold text-lg">
							{cred.icon}
						</div>
						<div>
							<div class="text-[13px] text-text font-medium">{cred.title}</div>
							<div class="text-[11px] text-muted mt-[2px] font-['Space_Mono'] tracking-[0.5px]">
								{cred.sub}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>