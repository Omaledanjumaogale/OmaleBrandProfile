<script lang="ts">
	import { REQUEST_STATUS_COLORS } from '$lib/constants';
	import type { ServiceRequestData } from '$lib/constants';

	let {
		request,
		onViewDetails,
		onStatusChange
	}: {
		request: ServiceRequestData;
		onViewDetails: (r: ServiceRequestData) => void;
		onStatusChange: (id: string, status: string) => void;
	} = $props();

</script>

<article class="p-5 sm:p-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl group hover:border-[var(--gold-line)] transition-all">
	<!-- Header row -->
	<div class="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
		<div class="min-w-0">
			<h4 class="font-['Bebas_Neue'] text-xl tracking-widest text-[var(--text)] truncate">{request.fullName}</h4>
			<p class="text-[11px] text-[var(--muted)] mt-0.5">{request.email} · {request.serviceType}</p>
		</div>
		<span class="shrink-0 text-[10px] font-['Space_Mono'] tracking-widest uppercase px-3 py-1 rounded-full border {REQUEST_STATUS_COLORS[request.status] ?? REQUEST_STATUS_COLORS.archived}">
			{request.status}
		</span>
	</div>

	<!-- Description preview -->
	<p class="text-[13px] text-[var(--text)] font-light mb-4 line-clamp-2 leading-relaxed">
		{request.description}
	</p>

	<!-- Actions -->
	<div class="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
		<button
			onclick={() => onViewDetails(request)}
			class="flex-1 sm:flex-none min-h-[44px] px-4 py-2 bg-[var(--gold)]/10 text-[var(--gold)] text-[10px] font-bold uppercase tracking-widest rounded-lg border border-[var(--gold)]/20 hover:bg-[var(--gold)]/20 transition-colors"
			aria-label="View details for {request.fullName}'s request"
		>
			View Details 📑
		</button>
		<div class="flex-1 sm:flex-none">
			<label for="request-status-{request._id}" class="sr-only">Change status for {request.fullName}</label>
			<select
				id="request-status-{request._id}"
				value={request.status}
				onchange={(e) => { if (request._id) onStatusChange(request._id, (e.target as HTMLSelectElement).value); }}
				class="w-full h-[44px] bg-[var(--surface)] border border-[var(--border)] text-[10px] font-bold uppercase tracking-widest rounded-lg px-3 py-2 outline-none focus-visible:border-[var(--gold)] focus-visible:ring-2 focus-visible:ring-[var(--gold)]/30 text-[var(--text)] cursor-pointer"
			>
				<option value="pending">Pending</option>
				<option value="contacted">Contacted</option>
				<option value="completed">Completed</option>
				<option value="archived">Archived</option>
			</select>
		</div>
	</div>
</article>
