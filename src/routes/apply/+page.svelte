<script lang="ts">
	import IAMApplicationForm from '$lib/components/IAMApplicationForm.svelte';
</script>

<svelte:head>
	<title>Apply to I-AM Network — E-WIN Project | Comrade Omale Danjuma Ogale</title>
	<meta name="description" content="Apply to join the I-AM Network — the Impact Ambassador Programme of the E-WIN Project. Build multiple income streams and join 10 million+ youths earning ₦200,000+ monthly." />
	<meta property="og:title" content="Apply to I-AM Network — E-WIN Project" />
	<meta property="og:url" content="https://omaledanjumaogale.ewinproject.org/apply" />
</svelte:head>

<main id="main-content" class="min-h-screen bg-[var(--bg)] pt-20">
	<!-- Hero Banner -->
	<div class="bg-[var(--surface)] border-b border-[var(--border)] px-6 sm:px-8 lg:px-12 py-12 text-center">
		<div class="max-w-[800px] mx-auto">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-full mb-6">
				<span class="w-2 h-2 bg-[var(--gold)] rounded-full animate-pulse"></span>
				<span class="text-[10px] font-['Space_Mono'] uppercase tracking-[3px] text-[var(--gold)]">Applications Open</span>
			</div>
			<h1 class="font-['Bebas_Neue'] text-[clamp(40px,7vw,96px)] tracking-[2px] leading-[0.9] text-[var(--text)] mb-4">
				Join the <span class="text-[var(--gold)]">I-AM Network</span>
			</h1>
			<p class="text-[15px] text-[var(--muted2)] leading-relaxed max-w-[600px] mx-auto">
				The <strong class="text-[var(--text)]">Impact Ambassador Model (I-AM)</strong> programme gives you access to 
				multiple income streams across the entire E-WIN Project ecosystem. Our target: 
				<strong class="text-[var(--gold)]">10,000,000+ youths earning ₦200,000+ monthly.</strong>
			</p>

			<!-- 3 key benefits -->
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left max-w-[720px] mx-auto">
				{#each [
					['💰', 'Multiple Income Streams', 'Earn across 6+ E-WIN platforms simultaneously.'],
					['📈', 'AI Upskilling', 'Access to exclusive AI-powered skill training programs.'],
					['🌍', 'National Network', 'Connect with ambassadors in all 36 states + FCT.']
				] as [icon, title, desc]}
					<div class="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-2xl flex items-start gap-3">
						<span class="text-2xl shrink-0" aria-hidden="true">{icon}</span>
						<div>
							<div class="text-[12px] font-bold text-[var(--text)] uppercase tracking-widest mb-1">{title}</div>
							<div class="text-[11px] text-[var(--muted)] leading-relaxed">{desc}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Application Form -->
	<IAMApplicationForm />
</main>
