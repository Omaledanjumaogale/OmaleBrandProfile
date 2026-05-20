<script lang="ts">
	import { theme } from '$lib/stores/ui';
	import { reveal } from '$lib/utils/reveal';
</script>

<svelte:head>
	<title>Our Services — E-WIN Platform</title>
	<meta name="description" content="Explore the diverse range of services offered by E-WIN and Comrade Omale Danjuma Ogale." />
</svelte:head>

<section class="py-20 px-6">
	<div class="max-w-[1200px] mx-auto space-y-16">
		<div class="text-center space-y-4 reveal">
			<h1 class="font-['Bebas_Neue'] text-5xl sm:text-7xl tracking-widest text-[var(--gold)]">OUR SERVICES</h1>
			<p class="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
				Strategic solutions designed for impact. We combine expertise with a commitment to excellence.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each [
				{ title: 'Project Management', icon: '📊', desc: 'End-to-end oversight for complex initiatives, ensuring timelines and quality standards are met.' },
				{ title: 'Strategy & Consulting', icon: '💡', desc: 'Data-driven insights and strategic planning to help your organization navigate change.' },
				{ title: 'Public Advocacy', icon: '📢', desc: 'Amplifying voices and driving awareness for critical social and political causes.' },
				{ title: 'Digital Transformation', icon: '💻', desc: 'Modernizing workflows and adopting technologies to stay competitive in a digital age.' },
				{ title: 'Youth Empowerment', icon: '🚀', desc: 'Tailored programs designed to equip the next generation with leadership and technical skills.' },
				{ title: 'Community Engagement', icon: '🤝', desc: 'Building bridges between stakeholders to foster collaborative and sustainable growth.' }
			] as service}
				<div class="bg-[#0f0e0b] border border-[var(--gold)]/10 p-8 rounded-3xl hover:border-[var(--gold)]/30 transition-all group reveal">
					<div class="text-4xl mb-6">{service.icon}</div>
					<h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-white mb-4 group-hover:text-[var(--gold)] transition-colors">
						{service.title}
					</h3>
					<p class="text-white/40 text-sm leading-relaxed">
						{service.desc}
					</p>
				</div>
			{/each}
		</div>

		<div class="bg-[var(--gold)] rounded-3xl p-10 md:p-16 text-center space-y-8 reveal">
			<h2 class="font-['Bebas_Neue'] text-4xl sm:text-5xl text-[#0b0a07] tracking-widest">
				READY TO COLLABORATE?
			</h2>
			<p class="text-[#0b0a07]/70 max-w-xl mx-auto text-lg font-medium">
				Let's discuss how we can bring your vision to life.
			</p>
			<button 
				onclick={() => {
					const modal = document.getElementById('service-modal');
					if (modal instanceof HTMLDialogElement) modal.showModal();
				}}
				class="px-10 py-4 bg-[#0b0a07] text-[var(--gold)] font-bold rounded-xl uppercase tracking-widest hover:scale-105 transition-transform"
			>
				Request a Consultation
			</button>
		</div>
	</div>
</section>
