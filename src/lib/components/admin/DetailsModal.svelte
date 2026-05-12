<script lang="ts">
	import { onMount } from 'svelte';
	import type { ApplicationData, ServiceRequestData } from '$lib/constants';

	let {
		item,
		open = false,
		onClose
	}: {
		item: ApplicationData | ServiceRequestData | null;
		open: boolean;
		onClose: () => void;
	} = $props();

	let dialogEl: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (!dialogEl) return;
		if (open) {
			dialogEl.showModal();
		} else {
			dialogEl.close();
		}
	});

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === dialogEl) onClose();
	}

	const isApp = $derived(item && ('fullName' in item));

	function fmt(v: any) {
		if (!v) return '—';
		if (typeof v === 'boolean') return v ? 'Yes' : 'No';
		return String(v);
	}

	const appFields = [
		{ key: 'fullName', label: 'Full Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'mobileNumber', label: 'Mobile' },
		{ key: 'whatsappNumber', label: 'WhatsApp' },
		{ key: 'stateOfOrigin', label: 'State of Origin' },
		{ key: 'lgaOfOrigin', label: 'LGA of Origin' },
		{ key: 'stateOfResidence', label: 'State of Residence' },
		{ key: 'lgaOfResidence', label: 'LGA of Residence' },
		{ key: 'skills', label: 'Skills' },
		{ key: 'academicBackground', label: 'Academic Background' },
		{ key: 'workingExperience', label: 'Working Experience' },
		{ key: 'motivationalStatement', label: 'Motivation' },
		{ key: 'status', label: 'Status' }
	];
	
	const reqFields = [
		{ key: 'fullName', label: 'Full Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'serviceType', label: 'Service' },
		{ key: 'description', label: 'Description' },
		{ key: 'budget', label: 'Budget' },
		{ key: 'urgency', label: 'Urgency' },
		{ key: 'status', label: 'Status' }
	];
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialogEl}
	onclick={handleBackdropClick}
	onkeydown={(e) => e.key === 'Escape' && onClose()}
	class="w-full max-w-2xl rounded-2xl shadow-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-0 m-auto
	       backdrop:bg-black/60 backdrop:backdrop-blur-sm
	       open:animate-in"
	aria-label={isApp ? `Application details for ${item?.fullName}` : `Request details for ${('fullName' in (item || {})) ? (item as any).fullName : ''}`}
>
	{#if item}
		<!-- Modal header -->
		<div class="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
			<div>
				<div class="font-['Space_Mono'] text-[9px] tracking-[3px] uppercase text-[var(--gold)] mb-1">
					{isApp ? 'IAM Application' : 'Service Request'} 📋
				</div>
				<h2 class="font-['Bebas_Neue'] text-2xl tracking-widest">
					{item.fullName}
				</h2>
			</div>
			<button
				onclick={onClose}
				class="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-[var(--surface2)] transition-colors text-[var(--muted)] hover:text-[var(--text)]"
				aria-label="Close details modal"
			>
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
					<path d="M2 2L16 16M16 2L2 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
				</svg>
			</button>
		</div>

		<!-- Fields grid -->
		<div class="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-h-[65vh] overflow-y-auto scroll-container">
			{#each (isApp ? appFields : reqFields) as { key, label }}
				{#if fmt((item as any)[key]) !== '—'}
					<div class="flex flex-col gap-1">
						<span class="font-['Space_Mono'] text-[9px] tracking-[2px] uppercase text-[var(--muted)]">{label}</span>
						<span class="text-[13px] text-[var(--text)] leading-relaxed break-words">{fmt((item as any)[key])}</span>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Footer -->
		<div class="px-6 py-4 border-t border-[var(--border)] flex justify-end">
			<button
				onclick={onClose}
				class="min-h-[44px] px-6 py-2 bg-[var(--gold)] text-[var(--bg)] text-[10px] font-bold tracking-widest uppercase rounded-xl hover:bg-[var(--gold2)] transition-colors"
			>
				Close
			</button>
		</div>
	{/if}
</dialog>

<style>
	dialog[open] { animation: slide-in 0.2s ease-out; }
	@keyframes slide-in {
		from { opacity: 0; transform: translateY(-12px) scale(0.97); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
	}
	.scroll-container::-webkit-scrollbar { width: 4px; }
	.scroll-container::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 10px; }
</style>
