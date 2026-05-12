<script lang="ts">
	import { APPLICATION_STATUS_COLORS } from '$lib/constants';
	import type { ApplicationData } from '$lib/constants';

	let {
		application,
		onViewDetails,
		onStatusChange
	}: {
		application: ApplicationData;
		onViewDetails: (a: ApplicationData) => void;
		onStatusChange: (id: string, status: string) => void;
	} = $props();

</script>

<article class="p-5 sm:p-6 bg-(--bg) border border-(--border) rounded-2xl group hover:border-(--gold-line) transition-all">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
		<div class="min-w-0">
			<h4 class="font-['Bebas_Neue'] text-xl tracking-widest text-(--text) truncate">{application.fullName}</h4>
			<p class="text-[11px] text-(--muted) mt-0.5">{application.email} · {application.mobileNumber}</p>
			<p class="text-[11px] text-(--muted2) mt-0.5">{application.stateOfResidence} · {application.lgaOfResidence}</p>
		</div>
		<span class="shrink-0 text-[10px] font-['Space_Mono'] tracking-widest uppercase px-3 py-1 rounded-full border {APPLICATION_STATUS_COLORS[application.status] ?? APPLICATION_STATUS_COLORS.pending}">
			{application.status}
		</span>
	</div>

	<!-- Brief preview -->
	{#if application.motivationalStatement}
		<p class="text-[13px] text-(--text) font-light mb-4 line-clamp-2 leading-relaxed">
			{application.motivationalStatement}
		</p>
	{/if}

	<!-- Actions -->
	<div class="flex flex-wrap gap-2 pt-4 border-t border-(--border)">
		<button
			onclick={() => onViewDetails(application)}
			class="flex-1 sm:flex-none min-h-[44px] px-4 py-2 bg-(--gold)/10 text-(--gold) text-[10px] font-bold uppercase tracking-widest rounded-lg border border-(--gold)/20 hover:bg-(--gold)/20 transition-colors"
			aria-label="View form for {application.fullName}"
		>
			View Form 📄
		</button>
		<div class="flex-1 sm:flex-none">
			<label for="app-status-{application._id}" class="sr-only">Change status for {application.fullName}</label>
			<select
				id="app-status-{application._id}"
				value={application.status}
				onchange={(e) => { if (application._id) onStatusChange(application._id, (e.target as HTMLSelectElement).value); }}
				class="w-full h-[44px] bg-(--surface) border border-(--border) text-[10px] font-bold uppercase tracking-widest rounded-lg px-3 py-2 outline-none focus-visible:border-(--gold) focus-visible:ring-2 focus-visible:ring-(--gold)/30 text-(--text) cursor-pointer"
			>
				<option value="pending">Pending</option>
				<option value="approved">Approved</option>
				<option value="declined">Declined</option>
			</select>
		</div>
	</div>
</article>
