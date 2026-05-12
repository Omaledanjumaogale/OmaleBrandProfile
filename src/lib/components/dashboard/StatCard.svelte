<script lang="ts">
	import { onMount } from 'svelte';

	let { label, value, trend, icon, color = 'gold' } = $props();

	const colorMap: Record<string, { accent: string; glow: string }> = {
		gold: { accent: 'text-[var(--gold)] bg-[var(--gold-dim)] border-[var(--gold-line)]',   glow: 'var(--gold)' },
		teal: { accent: 'text-[var(--teal2)] bg-[var(--teal2)]/10 border-[var(--teal2)]/30',  glow: 'var(--teal2)' },
		blue: { accent: 'text-blue-400 bg-blue-400/10 border-blue-400/30',                     glow: '#60a5fa' }
	};

	const c = $derived(colorMap[color as string] ?? colorMap.gold);

	// Animated counter
	let displayValue = $state('0');
	let hasMounted = $state(false);

	function animateValue(target: string) {
		const num = parseFloat(target.replace(/[^0-9.]/g, ''));
		const suffix = target.replace(/^[\d.]+/, '');
		if (isNaN(num)) { displayValue = target; return; }

		const duration = 900;
		const start = performance.now();
		function step(now: number) {
			const progress = Math.min((now - start) / duration, 1);
			const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
			displayValue = Math.round(ease * num).toLocaleString() + suffix;
			if (progress < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}

	onMount(() => {
		hasMounted = true;
		animateValue(String(value));
	});

	$effect(() => {
		if (hasMounted) animateValue(String(value));
	});
</script>

<div
	class="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[var(--radius)] transition-all duration-300 group shadow-lg relative overflow-hidden
	       hover:border-[var(--gold-line)] hover:shadow-[0_0_24px_rgba(var(--glow-rgb,201,168,76),0.08)]"
	style="--glow-color: {c.glow}"
>
	<!-- Color accent bar on left -->
	<div
		class="absolute top-0 left-0 w-1 h-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-l-[var(--radius)]"
		style="background: {c.glow}"
		aria-hidden="true"
	></div>

	<div class="flex items-start justify-between mb-4">
		<!-- Icon badge -->
		<div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border transition-transform duration-300 group-hover:scale-110 {c.accent}" aria-hidden="true">
			{icon}
		</div>
		<!-- Trend badge -->
		<div class="text-[10px] font-['Space_Mono'] tracking-widest px-2 py-1 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] uppercase tabular-nums">
			{trend}
		</div>
	</div>

	<div class="text-[11px] font-['Space_Mono'] tracking-[2px] uppercase text-[var(--muted)] mb-1">
		{label}
	</div>
	<div class="font-['Bebas_Neue'] text-3xl tracking-widest text-[var(--text)] tabular-nums" aria-live="polite">
		{hasMounted ? displayValue : value}
	</div>
</div>
