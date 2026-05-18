<script lang="ts">
	import { convex } from '$lib/convex';
	import { api } from '$convex/_generated/api';
	import { onMount } from 'svelte';

	let registrationOpen = $state(true);

	onMount(async () => {
		try {
			registrationOpen = await convex.query(api.functions.getSetting, { key: 'registration_open' });
		} catch { /* default true */ }
	});
</script>

<section id="iam-onboarding" class="bg-[var(--surface)] border-y border-[var(--border)] px-6 sm:px-8 lg:px-12 py-20 lg:py-28 relative overflow-hidden">
	<!-- Background radial -->
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,145,122,0.05)_0%,transparent_60%)] pointer-events-none" aria-hidden="true"></div>

	<div class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
		<!-- Left: Content -->
		<div class="reveal">
			<div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-[var(--gold)] mb-6 flex items-center gap-3">
				<span class="w-8 h-[1px] bg-[var(--gold)]" aria-hidden="true"></span>
				Join the Elite Network
			</div>
			<h2 class="font-['Bebas_Neue'] text-[clamp(36px,6vw,84px)] tracking-[2px] leading-[0.9] mb-8 text-[var(--text)]">
				Become an <span class="text-[var(--gold)]">Impact Ambassador.</span>
			</h2>
			<p class="text-[15px] leading-[1.8] text-[var(--muted2)] font-normal mb-10 max-w-[560px]">
				Onboard into the <strong class="text-[var(--text)]">I-AM Network</strong> and unlock the potential to work across the entire E-WIN Project ecosystem.
				<br /><br />
				<strong class="text-[var(--gold)]">Our target: 10,000,000+ youths, graduates, and skilled persons earning ₦200,000+ monthly across our platforms.</strong>
			</p>

			<!-- Feature points -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
				{#each [['💰','Multiple Income Streams','Earn from diverse platforms within the ecosystem.'],['📈','Skill Advancement','Exclusive access to AI-upskilling and mentor networks.']] as [icon, title, desc]}
					<div class="flex items-start gap-4 p-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl">
						<div class="text-2xl shrink-0" aria-hidden="true">{icon}</div>
						<div>
							<div class="text-[12px] font-bold text-[var(--text)] uppercase tracking-widest">{title}</div>
							<div class="text-[11px] text-[var(--muted)] mt-1">{desc}</div>
						</div>
					</div>
				{/each}
			</div>

			{#if registrationOpen}
				<a
					href="/apply"
					class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[var(--gold)] text-[var(--bg)] text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-[var(--gold2)] hover:translate-x-1 transition-all shadow-[var(--shadow-gold)] group min-h-[48px]"
				>
					Apply Now
					<span class="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
				</a>
			{:else}
				<div class="p-6 border border-[var(--gold-line)] bg-[var(--gold-dim)] rounded-2xl">
					<div class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-[var(--gold)] mb-2 flex items-center gap-2">
						<span aria-hidden="true">🛡️</span> Applications Currently Queued
					</div>
					<p class="text-[13px] text-[var(--muted2)] leading-relaxed mb-4">
						We are processing the current intake. Your application will be placed in our priority queue.
					</p>
					<a href="/apply" class="inline-flex items-center gap-2 px-8 py-3 border border-[var(--gold)] text-[var(--gold)] text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-[var(--gold)] hover:text-[var(--bg)] transition-all min-h-[44px]">
						Join the Queue
					</a>
				</div>
			{/if}
		</div>

		<!-- Right: Visual -->
		<div class="relative reveal delay-200">
			<div class="aspect-square rounded-[40px] border border-[var(--gold-line)]/20 bg-[var(--surface2)] relative overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/10 to-[var(--teal2)]/10" aria-hidden="true"></div>

				<div class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
					<div class="relative w-[78%] h-[78%] border border-[var(--border)] rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
						{#each [['🏢',0],['🛒',1],['🎓',2],['💰',3],['🛡️',4],['🌍',5]] as [icon, i]}
							<div
								class="absolute w-11 h-11 bg-[var(--surface)] border border-[var(--gold-line)] rounded-xl flex items-center justify-center text-xl shadow-lg"
								style="transform: rotate({(i as number) * 60}deg) translateY(-130px) rotate(-{(i as number) * 60}deg)"
							>
								{icon}
							</div>
						{/each}
					</div>
					<div class="absolute w-28 h-28 bg-[var(--gold)] text-[var(--bg)] font-['Bebas_Neue'] text-3xl flex items-center justify-center rounded-full shadow-2xl z-20">
						I-AM
					</div>
				</div>
			</div>

			<!-- Floating stats — positioned relative on mobile, absolute on lg+ -->
			<div class="hidden lg:block absolute -bottom-8 -left-8 p-5 bg-[var(--surface)]/95 border border-[var(--border)] rounded-2xl backdrop-blur-xl shadow-2xl reveal delay-400">
				<div class="font-['Bebas_Neue'] text-3xl text-[var(--gold)] tracking-widest">10,000,000+</div>
				<div class="text-[9px] text-[var(--muted)] uppercase tracking-widest mt-1">Goal: Impact Ambassadors</div>
			</div>
			<div class="hidden lg:block absolute -top-8 -right-8 p-5 bg-[var(--surface)]/95 border border-[var(--border)] rounded-2xl backdrop-blur-xl shadow-2xl reveal delay-500">
				<div class="font-['Bebas_Neue'] text-3xl text-[var(--teal2)] tracking-widest">6+</div>
				<div class="text-[9px] text-[var(--muted)] uppercase tracking-widest mt-1">Income Streams</div>
			</div>

			<!-- Mobile stats (inline instead of floating) -->
			<div class="flex lg:hidden gap-4 mt-6 justify-center">
				<div class="flex-1 p-4 bg-[var(--surface2)] border border-[var(--border)] rounded-xl text-center">
					<div class="font-['Bebas_Neue'] text-2xl text-[var(--gold)] tracking-widest">10M+</div>
					<div class="text-[9px] text-[var(--muted)] uppercase tracking-widest mt-1">Target</div>
				</div>
				<div class="flex-1 p-4 bg-[var(--surface2)] border border-[var(--border)] rounded-xl text-center">
					<div class="font-['Bebas_Neue'] text-2xl text-[var(--teal2)] tracking-widest">6+</div>
					<div class="text-[9px] text-[var(--muted)] uppercase tracking-widest mt-1">Income Streams</div>
				</div>
			</div>
		</div>
	</div>
</section>
