<script lang="ts">
	import { onMount } from 'svelte';
	import { getSessionId, convex } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';

	onMount(() => {
		const sessionId = getSessionId();
		if (api.functions?.orchestrateBackgroundTasks) {
			// NOTE: orchestrateBackgroundTasks is internalMutation — call via public wrapper if needed
		}
	});
</script>

<section id="hero" class="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden pb-20 lg:pb-0">
	<!-- Background grid -->
	<div class="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60 pointer-events-none" aria-hidden="true"></div>
	<div class="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-[radial-gradient(ellipse,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" aria-hidden="true"></div>

	<!-- Left: Text Content -->
	<div class="flex flex-col justify-center px-6 sm:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-[140px] pb-12 lg:pb-20 relative z-10 order-2 lg:order-1">
		<div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-[var(--gold)] mb-7 flex items-center gap-3 reveal">
			<span class="w-7 h-[1px] bg-[var(--gold)]" aria-hidden="true"></span>
			<span>AI-Augmented Developer &amp; Founder</span>
		</div>

		<h1 class="font-['Bebas_Neue'] text-[clamp(52px,12vw,108px)] leading-[0.92] tracking-[2px] mb-9 reveal delay-100">
			<span class="[-webkit-text-stroke:1px_var(--muted)] text-transparent">DANJUMA</span><br />
			<span class="text-[var(--gold)]">OMALE</span><br />
			<span class="text-[var(--text)]">OGALE</span>
		</h1>

		<p class="text-[15px] font-light leading-[1.8] text-[var(--muted2)] max-w-[440px] mb-12 reveal delay-200">
			Sociologist. Strategist. Builder. I architect systems that upskill Africa's workforce, close economic divides, and create sustainable livelihoods through the E-WIN Project ecosystem.
		</p>

		<div class="flex items-center gap-4 flex-wrap reveal delay-300">
			<a
				href="#ecosystem"
				class="px-7 py-3.5 bg-[var(--gold)] text-[var(--bg)] text-[11px] font-semibold tracking-[2px] uppercase rounded-[var(--radius)] hover:bg-[var(--gold2)] hover:translate-y-[-2px] hover:shadow-[var(--shadow-gold)] transition-all duration-250 min-h-[48px] flex items-center justify-center"
			>
				Explore E-WIN
			</a>
			<a
				href="#about"
				class="px-7 py-3.5 border border-[var(--border2)] text-[var(--muted2)] text-[11px] font-medium tracking-[2px] uppercase rounded-[var(--radius)] hover:border-[var(--gold-line)] hover:text-[var(--gold)] transition-all duration-250 min-h-[48px] flex items-center justify-center"
			>
				My Story
			</a>
		</div>

		<!-- Stats row -->
		<div class="flex gap-6 sm:gap-10 mt-14 pt-10 border-t border-[var(--border)] flex-wrap reveal delay-400">
			{#each [['25+','Platforms Built'],['13+','Years Experience'],['8+','Certifications']] as [num, label]}
				<div class="min-w-[100px]">
					<span class="font-['Bebas_Neue'] text-[36px] sm:text-[44px] text-[var(--gold)] tracking-widest block leading-none">{num}</span>
					<span class="text-[10px] tracking-[2px] uppercase text-[var(--muted)] mt-1 block">{label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Right: Hero image -->
	<div class="relative overflow-hidden order-1 lg:order-2 h-[50vw] min-h-[280px] max-h-[520px] lg:max-h-none lg:h-auto">
		<div class="absolute inset-0 bg-[#0a0a0e]">
			<img
				src="/danjuma-ogale.jpg"
				alt="Danjuma Umar Omale Ogale — Founder, E-WIN Project"
				loading="eager"
				decoding="async"
				fetchpriority="high"
				class="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.9] saturate-[0.95]"
			/>
			<!-- Gradient overlays for seamless blend -->
			<div class="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--bg)_100%)] lg:bg-[linear-gradient(to_right,var(--bg)_0%,rgba(6,6,8,0.2)_40%,transparent_70%),linear-gradient(to_top,var(--bg)_0%,transparent_30%)]" aria-hidden="true"></div>
		</div>

		<!-- Name card -->
		<div class="absolute bottom-6 right-4 sm:bottom-10 sm:right-8 bg-[#0d0d12e6] border border-[var(--border)] p-4 sm:p-5 rounded-[var(--radius)] backdrop-blur-md reveal delay-500 max-w-[200px] sm:max-w-none">
			<div class="font-['Bebas_Neue'] text-sm sm:text-base tracking-[2px] text-[var(--text)]">DANJUMA U. OMALE OGALE</div>
			<div class="font-['Space_Mono'] text-[9px] text-[var(--gold)] tracking-[1.5px] mt-1">Founder & CEO · E-WIN Project</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-20 hidden sm:flex" aria-hidden="true">
		<span class="font-['Space_Mono'] text-[9px] tracking-[2px] uppercase text-[var(--muted)] [writing-mode:vertical-rl]">Scroll</span>
		<div class="w-[1px] h-[60px] bg-[linear-gradient(to_bottom,transparent,var(--gold))] animate-[scrollBeat_2s_ease-in-out_infinite]"></div>
	</div>
</section>

<style>
	@keyframes scrollBeat {
		0%, 100% { opacity: 0.2; }
		50% { opacity: 1; }
	}
</style>
