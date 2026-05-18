<svelte:head>
	<title>Page Not Found · Omale Danjuma Ogale</title>
</svelte:head>

<script lang="ts">
	import { page } from '$app/stores';

	const status = $derived($page.status);
	const message = $derived($page.error?.message ?? 'Something went wrong.');
	const errorId = $derived(($page.error as any)?.errorId);
</script>

<div class="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6 py-20 relative overflow-hidden">
	<!-- Background grid -->
	<div class="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 pointer-events-none" aria-hidden="true"></div>
	<div class="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-[radial-gradient(ellipse,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" aria-hidden="true"></div>

	<div class="relative z-10 text-center max-w-lg">
		<div class="font-['Bebas_Neue'] text-[clamp(80px,20vw,160px)] leading-none text-[var(--gold)] tracking-widest opacity-20 select-none" aria-hidden="true">
			{status}
		</div>

		<div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-[var(--gold)] mb-4 flex items-center justify-center gap-2 -mt-4">
			<span class="w-6 h-[1px] bg-[var(--gold)]" aria-hidden="true"></span>
			{status === 404 ? 'Page Not Found' : 'Something Went Wrong'}
			<span class="w-6 h-[1px] bg-[var(--gold)]" aria-hidden="true"></span>
		</div>

		<h1 class="font-['Bebas_Neue'] text-[clamp(28px,6vw,52px)] tracking-[2px] mb-4 text-[var(--text)]">
			{status === 404 ? "This page doesn't exist." : 'An error occurred.'}
		</h1>

		<p class="text-[15px] text-[var(--muted2)] leading-relaxed mb-2 font-normal">
			{message}
		</p>

		{#if errorId}
			<p class="font-['Space_Mono'] text-[10px] text-[var(--muted)] mb-8">
				Error ID: {errorId}
			</p>
		{/if}

		<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
			<a
				href="/"
				class="px-8 py-3.5 bg-[var(--gold)] text-[var(--bg)] text-[11px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-[var(--gold2)] transition-all min-h-[48px] flex items-center gap-2 shadow-[var(--shadow-gold)]"
			>
				<span aria-hidden="true">🏠</span> Back to Home
			</a>
			<button
				onclick={() => history.back()}
				class="px-8 py-3.5 border border-[var(--border2)] text-[var(--muted2)] text-[11px] font-medium tracking-[2px] uppercase rounded-xl hover:border-[var(--gold-line)] hover:text-[var(--gold)] transition-all min-h-[48px]"
			>
				← Go Back
			</button>
		</div>
	</div>
</div>
