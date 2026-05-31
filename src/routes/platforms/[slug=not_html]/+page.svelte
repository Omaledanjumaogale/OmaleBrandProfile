<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.platform.name} — Platform Explorer</title>
	<meta name="description" content={data.platform.overview} />
</svelte:head>

<section class="pt-32 pb-20 px-6 lg:px-12 min-h-screen bg-[var(--bg)]">
	<div class="max-w-7xl mx-auto space-y-10">
		<div class="reveal max-w-4xl">
			<a href="/platforms" class="inline-flex items-center gap-2 text-[11px] uppercase tracking-[3px] font-bold text-[var(--gold)] mb-6 hover:opacity-80 transition-opacity">
				<span aria-hidden="true">←</span> Back to platform explorer
			</a>
			<div class="flex flex-wrap items-center gap-3 mb-4">
				<div class="badge-gold">{data.platform.badge}</div>
				<div class="badge-gold">{data.platform.category}</div>
				<div class="badge-gold">{data.platform.status}</div>
			</div>
			<h1 class="font-['Bebas_Neue'] text-[clamp(48px,8vw,96px)] tracking-[1px] leading-[0.9] text-[var(--text)] mb-4">
				{data.platform.name}
			</h1>
			<p class="body-text max-w-3xl">{data.platform.overview}</p>
		</div>

		<div class="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8">
			<div class="reveal card p-6 lg:p-8 space-y-6">
				<div class="flex items-center justify-between gap-4">
					<h2 class="font-['Bebas_Neue'] text-3xl tracking-[1px] text-[var(--text)]">Platform Summary</h2>
					<div class="text-4xl" aria-hidden="true">{data.platform.icon}</div>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{#each data.platform.highlights as highlight}
						<div class="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-4 text-[13px] leading-relaxed text-[var(--muted2)]">
							{highlight}
						</div>
					{/each}
				</div>

				<div class="flex flex-wrap gap-4">
					<a
						href={data.platform.external ? data.platform.href : data.platform.prototypePath ?? data.platform.href}
						target={data.platform.external ? '_blank' : '_self'}
						rel={data.platform.external ? 'noopener noreferrer' : undefined}
						class="inline-flex items-center justify-center min-h-[44px] rounded-xl bg-[var(--gold)] px-6 py-3 text-[12px] font-bold uppercase tracking-[3px] text-[var(--bg)] hover:opacity-90 transition-opacity"
					>
						{data.platform.external ? 'Visit Live Platform' : 'Open Prototype'}
					</a>
					{#if !data.platform.external}
						<a
							href="/apply"
							class="inline-flex items-center justify-center min-h-[44px] rounded-xl border border-[var(--gold-line)] bg-[var(--gold-dim)] px-6 py-3 text-[12px] font-bold uppercase tracking-[3px] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg)] transition-colors"
						>
							Start a Related Workflow
						</a>
					{/if}
				</div>
			</div>

			<div class="reveal card p-4 lg:p-6">
				<h2 class="font-['Bebas_Neue'] text-2xl tracking-[1px] text-[var(--text)] mb-4">Integrated Preview</h2>
				{#if data.platform.prototypePath}
					<iframe
						src={data.platform.prototypePath}
						title="{data.platform.name} prototype preview"
						class="h-[720px] w-full rounded-2xl border border-[var(--border)] bg-white"
						loading="lazy"
					></iframe>
				{:else}
					<div class="flex h-[720px] items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-8 text-center text-[14px] leading-relaxed text-[var(--muted2)]">
						This platform is represented by a live destination rather than a local prototype preview.
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
