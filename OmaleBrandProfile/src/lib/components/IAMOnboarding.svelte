<script lang="ts">
	import { convex } from '$lib/convex';
	import { api } from '../../../convex/_generated/api';
	import { onMount } from 'svelte';

	let registrationOpen = $state(true);

	onMount(async () => {
		registrationOpen = await convex.query(api.functions.getSetting, { key: 'registration_open' });
	});
</script>

<section id="iam-onboarding" class="bg-surface border-y border-border px-6 lg:px-12 py-24 relative overflow-hidden">
	<!-- Background decoration -->
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(60,179,113,0.05)_0%,transparent_60%)] pointer-events-none"></div>
	
	<div class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
		<div class="reveal">
			<div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-gold mb-6 flex items-center gap-3">
				<span class="w-8 h-[1px] bg-gold"></span> Join the Elite Network 🌍
			</div>
			<h2 class="font-['Bebas_Neue'] text-[clamp(45px,6vw,84px)] tracking-[2px] leading-[0.9] mb-8">
				Become an <span class="text-gold">Impact Ambassador.</span>
			</h2>
			<p class="text-[16px] leading-[1.8] text-muted2 font-light mb-10 max-w-[600px]">
				Onboard into the <strong>I-AM Network</strong> and unlock the potential to work across the entire E-WIN Project ecosystem. Access multiple income streams, collaborate on high-impact platforms, and become a leader in Africa's digital transformation. 🚀
				<br /><br />
				<strong class="text-gold">We are committed to onboarding at least 10,000,000 youths, unemployed graduates, skilled persons, persons with disabilities and students, empowering them and providing employment opportunities that enable them to earn ₦200,000+ monthly across our platforms and impacting others and their communities across Africa.</strong>
			</p>
			
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
				<div class="flex items-start gap-4 p-4 bg-bg border border-border rounded-xl">
					<div class="text-2xl">💰</div>
					<div>
						<div class="text-[12px] font-bold text-text uppercase tracking-widest">Multiple Income Streams</div>
						<div class="text-[10px] text-muted mt-1">Earn from diverse platforms within the ecosystem.</div>
					</div>
				</div>
				<div class="flex items-start gap-4 p-4 bg-bg border border-border rounded-xl">
					<div class="text-2xl">📈</div>
					<div>
						<div class="text-[12px] font-bold text-text uppercase tracking-widest">Skill Advancement</div>
						<div class="text-[10px] text-muted mt-1">Exclusive access to AI-upskilling and mentor networks.</div>
					</div>
				</div>
			</div>

			{#if registrationOpen}
				<a 
					href="/register/iam" 
					class="inline-flex items-center gap-4 px-10 py-4 bg-gold text-bg text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 hover:translate-x-2 transition-all shadow-xl shadow-gold/20 group"
				>
					Submit Application 🚀
					<span class="text-xl transition-transform group-hover:translate-x-1">→</span>
				</a>
			{:else}
				<div class="p-6 border border-gold/30 bg-gold/5 rounded-2xl">
					<div class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-gold mb-2 flex items-center gap-2">
						<span>🛡️</span> Application Pool Paused
					</div>
					<p class="text-[13px] text-muted leading-relaxed">
						We are currently processing the latest batch of Elite Ambassadors. You can still submit your application, but it will be placed in our **Strategic Queue** for high-priority review when registration re-opens.
					</p>
					<a 
						href="/register/iam" 
						class="mt-6 inline-flex items-center gap-4 px-10 py-4 border border-gold text-gold text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold hover:text-bg transition-all group"
					>
						Submit to Queue 📑
					</a>
				</div>
			{/if}
		</div>

		<div class="relative reveal delay-200">
			<div class="aspect-square rounded-[40px] border border-gold-line/20 bg-surface2 relative overflow-hidden group">
				<div class="absolute inset-0 bg-gradient-to-br from-gold/10 to-teal2/10"></div>
				<!-- Creative placeholder or visual for IAM Network -->
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="relative w-[80%] h-[80%] border border-border rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
						{#each Array(6) as _, i}
							<div 
								class="absolute w-12 h-12 bg-surface border border-gold-line rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-gold/10"
								style="transform: rotate({i * 60}deg) translateY(-140px) rotate(-{i * 60}deg)"
							>
								{['🏢', '🛒', '🎓', '💰', '🛡️', '🌍'][i]}
							</div>
						{/each}
					</div>
					<div class="absolute w-32 h-32 bg-gold text-bg font-['Bebas_Neue'] text-3xl flex items-center justify-center rounded-full shadow-2xl shadow-gold/40 z-20">
						I-AM
					</div>
				</div>
			</div>
			
			<!-- Floating stats -->
			<div class="absolute -bottom-8 -left-8 p-6 bg-[#0d0d12e6] border border-border rounded-2xl backdrop-blur-xl shadow-2xl reveal delay-400">
				<div class="font-['Bebas_Neue'] text-3xl text-gold tracking-widest">10,000,000+</div>
				<div class="text-[9px] text-muted uppercase tracking-widest mt-1">Goal for Impact Ambassadors 🇳🇬</div>
			</div>
			<div class="absolute -top-8 -right-8 p-6 bg-[#0d0d12e6] border border-border rounded-2xl backdrop-blur-xl shadow-2xl reveal delay-500">
				<div class="font-['Bebas_Neue'] text-3xl text-teal2 tracking-widest">6+</div>
				<div class="text-[9px] text-muted uppercase tracking-widest mt-1">Income Streams 💸</div>
			</div>
		</div>
	</div>
</section>
