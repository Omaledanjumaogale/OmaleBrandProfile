<script lang="ts">
	import { isServiceModalOpen, closeServiceModal } from '$lib/stores/ui';
	import ServiceRequestForm from './ServiceRequestForm.svelte';
	import { fade, scale } from 'svelte/transition';

	function handleClose() {
		closeServiceModal();
	}

	function handleOutsideClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}
</script>

{#if $isServiceModalOpen}
	<div
		class="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#060608eb] backdrop-blur-xl"
		transition:fade={{ duration: 300 }}
		onclick={handleOutsideClick}
		onkeydown={handleKeyDown}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<div
			class="relative w-full max-w-[650px] max-h-[90vh] sm:max-h-[85vh] overflow-y-auto bg-surface border-t sm:border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl p-2 sm:p-4"
			transition:scale={{ duration: 400, start: 0.95 }}
		>
			<button
				onclick={handleClose}
				class="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-bg border border-border text-muted hover:text-gold hover:border-gold transition-all z-10"
				aria-label="Close Modal"
			>
				✕
			</button>

			<div class="p-4 sm:p-8 pt-12 sm:pt-10">
				<div class="mb-8 text-center">
					<div class="font-['Space_Mono'] text-sm md:text-[10px] tracking-[3px] uppercase text-gold mb-3">
						Professional Service Inquiry 🛠️
					</div>
					<h2 class="font-['Bebas_Neue'] text-3xl sm:text-4xl tracking-widest text-text">Ready to Collaborate? 🤝</h2>
					<p class="text-sm md:text-[13px] text-muted2 font-light mt-2 max-w-[400px] mx-auto">
						Fill out the form below, and I will get back to you with a comprehensive proposal for your project.
					</p>
				</div>

				<ServiceRequestForm />
			</div>
		</div>
	</div>
{/if}

<style>
	/* Custom scrollbar for the modal */
	div::-webkit-scrollbar {
		width: 6px;
	}
	div::-webkit-scrollbar-track {
		background: transparent;
	}
	div::-webkit-scrollbar-thumb {
		background: var(--border);
		border-radius: 10px;
	}
	div::-webkit-scrollbar-thumb:hover {
		background: var(--gold);
	}
</style>
