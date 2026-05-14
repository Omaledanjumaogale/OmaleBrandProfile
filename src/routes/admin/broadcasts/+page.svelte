<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '../../../../../convex/_generated/api';
	import { currentUser } from '$lib/stores/auth';
	import { ui } from '$lib/stores/ui';

	let broadcasts: any[] = $state([]);
	let loading   = $state(true);
	let message   = $state('');
	let sending   = $state(false);
	const MAX_CHARS = 500;

	onMount(() => {
		const unsub = convex.onUpdate(api.functions.getLatestBroadcasts, {}, (data) => {
			broadcasts = data ?? [];
			loading = false;
		});
		return unsub;
	});

	async function sendBroadcast() {
		if (!message.trim() || message.length > MAX_CHARS) return;
		sending = true;
		try {
			await convex.mutation(api.functions.createBroadcast, {
				message: message.trim(),
				sender: $currentUser?.email ?? 'admin',
			});
			ui.success('Broadcast sent to all ambassadors.');
			message = '';
		} catch (e: any) { ui.error(e.message ?? 'Failed to send broadcast.'); }
		finally { sending = false; }
	}

	const timeAgo = (ts: number) => {
		const diff = Date.now() - ts;
		const m = Math.floor(diff / 60000);
		if (m < 1)  return 'just now';
		if (m < 60) return `${m}m ago`;
		const h = Math.floor(m / 60);
		if (h < 24) return `${h}h ago`;
		return `${Math.floor(h / 24)}d ago`;
	};
</script>

<svelte:head><title>Broadcasts — Admin | E-WIN</title></svelte:head>

<div class="space-y-6 max-w-[860px] mx-auto">
	<div>
		<h1 class="font-['Bebas_Neue'] text-3xl tracking-widest text-white">Broadcasts</h1>
		<p class="text-[11px] text-white/40 font-['Space_Mono'] mt-0.5">Send platform-wide announcements to all I-AM ambassadors</p>
	</div>

	<!-- Compose panel -->
	<div class="bg-[#0f0e0b] border border-[#c9a84c]/15 rounded-2xl p-6 space-y-4">
		<h2 class="font-['Bebas_Neue'] text-xl tracking-widest text-[#c9a84c]">New Broadcast</h2>
		<div>
			<textarea bind:value={message} rows="5" maxlength={MAX_CHARS}
				placeholder="Write your broadcast message to all ambassadors..."
				class="w-full bg-[#0b0a07] border border-[#c9a84c]/15 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:border-[#c9a84c]/40 outline-none resize-none transition-colors leading-relaxed">
			</textarea>
			<div class="flex items-center justify-between mt-1.5">
				<p class="text-[11px] text-white/30 font-['Space_Mono']">
					Sent from: <span class="text-[#c9a84c]/70">{$currentUser?.email ?? 'admin'}</span>
				</p>
				<span class="text-[11px] font-['Space_Mono'] {message.length > MAX_CHARS * 0.9 ? 'text-amber-400' : 'text-white/30'}">
					{message.length} / {MAX_CHARS}
				</span>
			</div>
		</div>
		<button type="button" onclick={sendBroadcast} disabled={sending || !message.trim() || message.length > MAX_CHARS}
			class="px-8 py-3 min-h-[48px] bg-[#c9a84c] text-[#0b0a07] text-[12px] font-bold uppercase tracking-wider rounded-xl
			       hover:bg-[#a07820] disabled:opacity-40 disabled:cursor-not-allowed
			       transition-all active:scale-95 flex items-center gap-2">
			{#if sending}
				<span class="w-4 h-4 border-2 border-[#0b0a07]/30 border-t-[#0b0a07] rounded-full animate-spin"></span>
				Sending...
			{:else}
				📢 Send Broadcast
			{/if}
		</button>
	</div>

	<!-- Broadcast history -->
	<div class="bg-[#0f0e0b] border border-[#c9a84c]/10 rounded-2xl overflow-hidden">
		<div class="px-5 py-4 border-b border-[#c9a84c]/10">
			<h2 class="font-['Bebas_Neue'] text-lg tracking-widest text-[#c9a84c]">Recent Broadcasts</h2>
		</div>
		{#if loading}
			<div class="p-8 text-center text-white/30 text-[12px]">Loading...</div>
		{:else if broadcasts.length === 0}
			<div class="p-8 text-center text-white/30 text-[12px]">No broadcasts sent yet.</div>
		{:else}
			<div class="divide-y divide-[#c9a84c]/5">
				{#each broadcasts as bc}
					<div class="px-5 py-4">
						<div class="flex items-center justify-between mb-2">
							<span class="text-[11px] font-['Space_Mono'] text-[#c9a84c]/60">{bc.sender}</span>
							<span class="text-[11px] font-['Space_Mono'] text-white/30">{timeAgo(bc.timestamp)}</span>
						</div>
						<p class="text-[14px] text-white/80 leading-relaxed">{bc.message}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
