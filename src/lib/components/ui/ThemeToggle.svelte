<script lang="ts">
	import { theme } from '$lib/stores/ui';
</script>

<button
	id="theme-toggle"
	onclick={() => theme.toggle()}
	class="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-[var(--border)] hover:border-[var(--gold-line)] hover:bg-[var(--gold-dim)] transition-all duration-300 group"
	aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	title={$theme === 'dark' ? 'Light mode' : 'Dark mode'}
>
	{#if $theme === 'dark'}
		<!-- Sun icon -->
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
			class="text-[var(--gold)] group-hover:rotate-45 transition-transform duration-300">
			<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
			<line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			<line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			<line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			<line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
		</svg>
	{:else}
		<!-- Moon icon -->
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
			class="text-[var(--gold)] group-hover:-rotate-12 transition-transform duration-300">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
				stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	{/if}
</button>
