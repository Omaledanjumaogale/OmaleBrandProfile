<script lang="ts">
	import { toast } from '$lib/stores/toast.svelte';

	// Auto-dismiss individual toasts
	function dismiss(id: string) {
		toast.remove(id);
	}

	const iconMap: Record<string, string> = {
		success: '✅',
		error:   '❌',
		info:    'ℹ️',
		warning: '⚠️'
	};

	const colorMap: Record<string, string> = {
		success: 'border-[var(--teal2)]/30 bg-[var(--teal2)]/8',
		error:   'border-red-500/30 bg-red-500/8',
		info:    'border-[var(--gold-line)] bg-[var(--gold-dim)]',
		warning: 'border-amber-400/30 bg-amber-400/8'
	};

	const textMap: Record<string, string> = {
		success: 'text-[var(--teal2)]',
		error:   'text-red-400',
		info:    'text-[var(--gold)]',
		warning: 'text-amber-400'
	};
</script>

{#if toast.toasts.length > 0}
	<div
		class="fixed bottom-24 sm:bottom-8 right-4 z-[9999] flex flex-col gap-3 max-w-[calc(100vw-2rem)] sm:max-w-sm"
		aria-live="polite"
		aria-label="Notifications"
	>
		{#each toast.toasts as item (item.id)}
			<div
				class="flex items-start gap-3 p-4 pr-5 border rounded-xl backdrop-blur-lg shadow-2xl
				       {colorMap[item.type] ?? colorMap.info}
				       animate-[slideIn_0.25s_ease-out_forwards]"
				role="alert"
			>
				<span class="text-xl shrink-0 mt-0.5" aria-hidden="true">{iconMap[item.type] ?? '💬'}</span>
				<div class="flex-grow min-w-0">
					{#if item.title}
						<div class="text-[12px] font-bold tracking-widest uppercase {textMap[item.type] ?? ''} mb-0.5">{item.title}</div>
					{/if}
					<div class="text-[12px] text-[var(--muted2)] leading-relaxed break-words">{item.message}</div>
				</div>
				<button
					onclick={() => dismiss(item.id)}
					class="shrink-0 text-[var(--muted)] hover:text-[var(--text)] transition-colors mt-0.5 min-w-[24px] min-h-[24px] flex items-center justify-center"
					aria-label="Dismiss notification"
				>✕</button>
			</div>
		{/each}
	</div>
{/if}

<style>
	@keyframes slideIn {
		from { opacity: 0; transform: translateX(1rem); }
		to   { opacity: 1; transform: translateX(0); }
	}
</style>
