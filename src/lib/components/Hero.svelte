<script lang="ts">
	import { onMount } from 'svelte';
	import { getSessionId, convex } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';

	onMount(() => {
		// Silent background tracking
		const sessionId = getSessionId();
		if (api.functions?.orchestrateBackgroundTasks) {
			convex.mutation(api.functions.orchestrateBackgroundTasks, {
				type: "HERO_VIEWED",
				payload: { sessionId, timestamp: Date.now() }
			}).catch(e => console.error("Tracking failed", e));
		}
	});
</script>

<section id="hero" class="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
	<div class="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60 pointer-events-none"></div>
	<div class="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-[radial-gradient(ellipse,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none"></div>

	<div class="flex flex-col justify-center px-6 lg:px-12 pt-12 lg:pt-[140px] pb-20 relative z-10">
		<div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-7 flex items-center gap-3 reveal">
			<span class="w-7 h-[1px] bg-gold"></span> AI-Augmented Developer & Founder 🤖
		</div>
		<h1 class="font-['Bebas_Neue'] text-[clamp(48px,10vw,108px)] leading-[0.92] tracking-[2px] mb-9 reveal delay-100">
			<span class="[-webkit-text-stroke:1px_var(--muted)] text-transparent">DANJUMA</span><br />
			<span class="text-gold">OMALE</span><br />
			<span>OGALE</span>
		</h1>
		<p class="text-sm md:text-[15px] font-light leading-[1.8] text-muted2 max-w-[420px] mb-12 reveal delay-200">
			Sociologist. Strategist. Builder. I architect systems that upskill Africa's workforce, close economic divides, and create sustainable livelihoods through the E-WIN Project ecosystem. 🌍
		</p>
		<div class="flex items-center gap-5 flex-wrap reveal delay-300">
			<a
				href="#ecosystem"
				class="px-8 py-3.5 bg-gold text-bg text-sm md:text-[11px] font-semibold tracking-[2px] uppercase rounded-[var(--radius)] hover:bg-gold2 hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(201,168,76,0.25)] transition-all duration-250 min-h-[44px] flex items-center justify-center"
			>
				Explore E-WIN 🌍
			</a>
			<a
				href="#about"
				class="px-8 py-3.5 border border-border2 text-muted2 text-sm md:text-[11px] font-medium tracking-[2px] uppercase rounded-[var(--radius)] hover:border-gold-line hover:text-gold transition-all duration-250 min-h-[44px] flex items-center justify-center"
			>
				My Story 📖
			</a>
		</div>
		<div class="flex gap-6 sm:gap-9 mt-[60px] pt-10 border-t border-border flex-wrap sm:flex-nowrap reveal delay-400">
			<div class="min-w-[120px]">
				<span class="font-['Bebas_Neue'] text-[32px] sm:text-[40px] text-gold tracking-widest block leading-none">25+</span>
				<span class="text-sm md:text-[9px] sm:text-[10px] tracking-[2px] uppercase text-muted mt-1 block">Platforms Built 💻</span>
			</div>
			<div class="min-w-[120px]">
				<span class="font-['Bebas_Neue'] text-[32px] sm:text-[40px] text-gold tracking-widest block leading-none">13+</span>
				<span class="text-sm md:text-[9px] sm:text-[10px] tracking-[2px] uppercase text-muted mt-1 block">Years Experience 💼</span>
			</div>
			<div class="min-w-[120px]">
				<span class="font-['Bebas_Neue'] text-[32px] sm:text-[40px] text-gold tracking-widest block leading-none">8+</span>
				<span class="text-sm md:text-[9px] sm:text-[10px] tracking-[2px] uppercase text-muted mt-1 block">Certifications 📜</span>
			</div>
		</div>
	</div>

	<div class="relative overflow-hidden block h-[450px] sm:h-[550px] lg:h-auto order-first lg:order-none">
		<div class="absolute inset-0 bg-[#0a0a0e]">
			<img
				src="/danjuma-ogale.jpg"
				alt="Danjuma Umar Omale Ogale"
				loading="eager"
				decoding="async"
				fetchpriority="high"
				class="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.9] saturate-[0.95]"
			/>
			<div class="absolute inset-0 bg-[linear-gradient(to_right,var(--bg)_0%,rgba(6,6,8,0.3)_40%,transparent_70%),linear-gradient(to_top,var(--bg)_0%,transparent_30%)]"></div>
		</div>
		<div class="absolute bottom-10 right-8 bg-[#0d0d12e6] border border-border p-4 sm:p-5 rounded-[var(--radius)] backdrop-blur-md reveal delay-500">
			<div class="font-['Bebas_Neue'] text-base tracking-[2px] text-text">DANJUMA U. OMALE OGALE 🇳🇬</div>
			<div class="font-['Space_Mono'] text-[9px] text-gold tracking-[1.5px] mt-1">Founder & CEO · E-WIN Project 🚀</div>
		</div>
	</div>

	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
		<span class="font-['Space_Mono'] text-[9px] tracking-[2px] uppercase text-muted [writing-mode:vertical-rl]">Scroll</span>
		<div class="w-[1px] h-[60px] bg-[linear-gradient(to_bottom,transparent,var(--gold))] animate-[scrollBeat_2s_ease-in-out_infinite]"></div>
	</div>
</section>

<style>
	@keyframes scrollBeat {
		0%, 100% { opacity: 0.2; }
		50% { opacity: 1; }
	}
</style>
