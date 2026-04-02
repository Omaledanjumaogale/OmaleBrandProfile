<script lang="ts">
	let { label, value, trend, icon, color = 'gold' } = $props();

	const colorClasses = {
		gold: 'text-gold bg-gold/10 border-gold/20',
		teal: 'text-teal2 bg-teal2/10 border-teal2/20',
		blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20'
	};
</script>

<div class="bg-surface border border-border p-6 rounded-[var(--radius)] hover:border-gold-line transition-all duration-300 group shadow-lg relative overflow-hidden">
	<div class="absolute top-0 left-0 w-1 h-full bg-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
	
	<div class="flex items-start justify-between mb-4">
		<div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl {colorClasses[color as keyof typeof colorClasses]} border transition-transform group-hover:scale-110">
			{icon}
		</div>
		<div class="text-sm md:text-[10px] font-['Space_Mono'] tracking-widest px-2 py-1 rounded bg-bg border border-border text-muted uppercase">
			{trend}
		</div>
	</div>

	<div class="text-sm md:text-[11px] font-['Space_Mono'] tracking-[2px] uppercase text-muted mb-1">
		{label}
	</div>
	<div class="font-['Bebas_Neue'] text-3xl tracking-widest text-text">
		{value}
	</div>
</div>
