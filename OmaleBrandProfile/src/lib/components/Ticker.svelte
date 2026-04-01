<script lang="ts">
	const items = [
		'E-WIN Project 🌍',
		'AI-Augmented Builder 🤖',
		'DealxHire 💼',
		'AkademyX 🎓',
		'Workforce Innovation 🚀',
		'Nigeria Tech Founder 🇳🇬',
		'Learn · Work · Earn 💰'
	];
</script>

<div class="overflow-hidden py-3 bg-gold relative z-[2] border-y border-gold-line">
	<div class="flex whitespace-nowrap animate-[ticker_30s_linear_infinite] group">
		{#each Array(4) as _}
			{#each items as item}
				<span class="font-['Bebas_Neue'] text-[14px] tracking-[3px] text-bg px-12 relative flex items-center gap-12">
					{item} <span class="text-bg opacity-50">✦</span>
				</span>
			{/each}
		{/each}
	</div>
</div>

<style>
	@keyframes ticker {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}
</style>