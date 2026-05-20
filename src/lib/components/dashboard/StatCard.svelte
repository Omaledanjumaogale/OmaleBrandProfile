<script lang="ts">
	type StatCardColor = 'gold' | 'teal' | 'blue';

	let {
		label,
		value,
		trend,
		icon,
		color = 'gold'
	}: {
		label: string;
		value: string;
		trend: string;
		icon: string;
		color?: StatCardColor;
	} = $props();

	const accentClasses: Record<StatCardColor, string> = {
		gold: 'border-gold/20 bg-gold/5 text-gold',
		teal: 'border-teal2/20 bg-teal2/5 text-teal2',
		blue: 'border-blue-400/20 bg-blue-400/5 text-blue-300'
	};
</script>

<article class="rounded-[var(--radius)] border border-border bg-surface p-6 shadow-2xl">
	<div class="mb-5 flex items-start justify-between gap-4">
		<div>
			<p class="text-[10px] font-['Space_Mono'] uppercase tracking-[0.3em] text-muted">
				{label}
			</p>
			<p class="mt-3 font-['Bebas_Neue'] text-4xl tracking-[0.14em] text-text">
				{value}
			</p>
		</div>
		<div class={`rounded-2xl border px-4 py-3 text-2xl ${accentClasses[color]}`}>
			{icon}
		</div>
	</div>

	<div class="inline-flex rounded-full border border-border bg-bg/70 px-3 py-1">
		<span class="text-[10px] font-['Space_Mono'] uppercase tracking-[0.3em] text-muted">
			{trend}
		</span>
	</div>
</article>
