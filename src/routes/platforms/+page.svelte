<script lang="ts">
	import { platforms } from '$lib/data/platforms';
</script>

<svelte:head>
	<title>Platform Explorer — Danjuma Omale Ogale</title>
	<meta
		name="description"
		content="Explore the E-WIN platform ecosystem through one unified application, including live properties and prototype experiences."
	/>
</svelte:head>

<section class="pt-32 pb-20 px-6 lg:px-12 min-h-screen bg-[var(--bg)]">
	<div class="max-w-7xl mx-auto">
		<div class="reveal mb-14 max-w-3xl">
			<div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-gold mb-4 flex items-center gap-3">
				<span class="w-8 h-px bg-gold"></span> Unified Platform Explorer
			</div>
			<h1 class="font-['Bebas_Neue'] text-[clamp(48px,8vw,96px)] tracking-[1px] leading-[0.9] mb-6 text-[var(--text)]">
				One application.<br />Many platform visions.
			</h1>
			<p class="text-muted2 leading-[1.8] font-normal">
				This explorer brings the E-WIN ecosystem into a single routed experience. Each platform now has an in-app detail page with a unified overview and prototype access.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{#each platforms as platform, index}
				<article
					class="reveal card card-hover p-6 flex flex-col gap-4"
					style="transition-delay: {index * 50}ms"
				>
					<div class="flex items-start justify-between gap-4">
						<div>
							<div class="badge-gold mb-3">{platform.badge}</div>
							<h2 class="font-['Bebas_Neue'] text-3xl tracking-[1px] text-[var(--text)]">
								{platform.name}
							</h2>
						</div>
						<div class="text-3xl" aria-hidden="true">{platform.icon}</div>
					</div>

					<p class="body-text flex-grow">{platform.overview}</p>

					<div class="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[2px] font-['Space_Mono']">
						<span class="text-[var(--muted)]">{platform.category}</span>
						<span class="text-[var(--gold)]">{platform.status}</span>
					</div>

					<a
						href={platform.href}
						target={platform.external ? '_blank' : '_self'}
						rel={platform.external ? 'noopener noreferrer' : undefined}
						class="mt-2 inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-[var(--gold-line)] bg-[var(--gold-dim)] px-5 py-3 text-[11px] font-bold uppercase tracking-[3px] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg)] transition-colors"
					>
						{platform.external ? 'Visit Live Platform' : 'Open Platform Page'}
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>
