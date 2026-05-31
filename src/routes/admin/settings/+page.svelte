<script lang="ts">
	import { onMount } from 'svelte';
	import { convex } from '$lib/convex';
	import { api } from '$convex/_generated/api';
	import { ui } from '$lib/stores/ui';
	import Tooltip from '$lib/components/ui/Tooltip.svelte';

	type SettingsSnapshot = {
		registration_open: boolean;
		maintenance_mode: boolean;
		email_notifications: boolean;
		updatedAt: number | null;
	};

	let { data } = $props<{
		data: {
			runtimeStatus: {
				adminAuth: boolean;
				convex: boolean;
				firebase: boolean;
				email: boolean;
				push: boolean;
				observability: boolean;
			};
		};
	}>();

	let settings = $state<SettingsSnapshot>({
		registration_open: true,
		maintenance_mode: false,
		email_notifications: true,
		updatedAt: null
	});

	let loading = $state(true);
	let activeToggle = $state<string | null>(null);

	onMount(() => {
		const unsubscribe = convex.onUpdate(api.functions.getAdminSettingsSnapshot, {}, (snapshot) => {
			if (snapshot) {
				settings = snapshot;
			}
			loading = false;
		});
		return unsubscribe;
	});

	async function handleToggle(key: keyof Omit<SettingsSnapshot, 'updatedAt'>) {
		const newValue = !settings[key];
		activeToggle = key;

		try {
			await convex.mutation(api.functions.updateSetting, {
				key,
				value: newValue
			});
			ui.success(`Global setting "${key}" updated.`, 'System Configured');
		} catch (e: any) {
			ui.error(e.message || 'Failed to update setting');
		} finally {
			activeToggle = null;
		}
	}

	function formatUpdatedAt(timestamp: number | null) {
		return timestamp ? new Date(timestamp).toLocaleString() : 'Defaults active';
	}
</script>

<svelte:head>
    <title>Platform Settings — Admin Portal | E-WIN</title>
</svelte:head>

<div class="max-w-4xl space-y-12">
    <!-- Header -->
    <div>
        <h1 class="font-['Bebas_Neue'] text-4xl tracking-widest text-white mb-2">Platform Configuration</h1>
        <p class="text-[12px] text-white/40 font-['Space_Mono'] uppercase tracking-widest">
            Manage live feature flags, access controls, and deployment readiness
        </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {#each [
            { label: 'Admin Auth', value: data.runtimeStatus.adminAuth, detail: 'Signed Firebase-derived admin sessions' },
            { label: 'Convex', value: data.runtimeStatus.convex, detail: 'Realtime data backend URL detected' },
            { label: 'Firebase Admin', value: data.runtimeStatus.firebase, detail: 'Server-side token verification configured' },
            { label: 'Email', value: data.runtimeStatus.email, detail: 'Transactional delivery configured' },
            { label: 'Push', value: data.runtimeStatus.push, detail: 'VAPID-backed device notifications configured' },
            { label: 'Observability', value: data.runtimeStatus.observability, detail: 'External incident reporting configured' }
        ] as integration}
            <div class="bg-[#0f0e0b] border border-white/5 rounded-2xl p-5">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-[10px] font-['Space_Mono'] uppercase tracking-[2px] text-white/40">{integration.label}</span>
                    <span class="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[2px] {integration.value ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20' : 'bg-amber-500/10 text-amber-200 border border-amber-500/20'}">
                        {integration.value ? 'Ready' : 'Attention'}
                    </span>
                </div>
                <p class="text-[12px] text-white/40 leading-relaxed">{integration.detail}</p>
            </div>
        {/each}
    </div>

    <!-- Setting Groups -->
    <div class="space-y-8">
        <!-- Access Control -->
        <section class="space-y-4">
            <h2 class="text-[11px] font-bold font-['Space_Mono'] uppercase tracking-[3px] text-[var(--gold)] ml-1">Access Control</h2>
            <div class="grid gap-4">
                <div class="bg-[#0f0e0b] border border-white/5 rounded-2xl p-6 flex items-center justify-between group">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">🚪</div>
                        <div>
                            <h3 class="text-[15px] font-bold text-white mb-1">Public Registration</h3>
                            <p class="text-[12px] text-white/30">Allow new users to create accounts on the I-AM platform.</p>
                        </div>
                    </div>
                    <button 
                        onclick={() => handleToggle('registration_open')}
                        disabled={loading || activeToggle !== null}
                        aria-label="Toggle Public Registration"
                        class="w-14 h-7 rounded-full transition-all relative {settings.registration_open ? 'bg-[var(--gold)]' : 'bg-white/10'} {loading || activeToggle !== null ? 'opacity-50 cursor-not-allowed' : ''}"
                    >
                        <div class="absolute top-1 left-1 w-5 h-5 bg-[#0b0a07] rounded-full transition-all {settings.registration_open ? 'translate-x-7' : 'translate-x-0'}"></div>
                    </button>
                </div>

                <div class="bg-[#0f0e0b] border border-white/5 rounded-2xl p-6 flex items-center justify-between group">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">🛠️</div>
                        <div>
                            <h3 class="text-[15px] font-bold text-white mb-1">Maintenance Mode</h3>
                            <p class="text-[12px] text-white/30">Display a "Under Construction" overlay to all non-admin users.</p>
                        </div>
                    </div>
                    <button 
                        onclick={() => handleToggle('maintenance_mode')}
                        disabled={loading || activeToggle !== null}
                        aria-label="Toggle Maintenance Mode"
                        class="w-14 h-7 rounded-full transition-all relative {settings.maintenance_mode ? 'bg-red-500' : 'bg-white/10'} {loading || activeToggle !== null ? 'opacity-50 cursor-not-allowed' : ''}"
                    >
                        <div class="absolute top-1 left-1 w-5 h-5 bg-[#0b0a07] rounded-full transition-all {settings.maintenance_mode ? 'translate-x-7' : 'translate-x-0'}"></div>
                    </button>
                </div>
            </div>
        </section>

        <!-- Communication Protocols -->
        <section class="space-y-4">
            <h2 class="text-[11px] font-bold font-['Space_Mono'] uppercase tracking-[3px] text-[var(--gold)] ml-1">Communication Protocols</h2>
            <div class="grid gap-4">
                <div class="bg-[#0f0e0b] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">📧</div>
                        <div>
                            <h3 class="text-[15px] font-bold text-white mb-1">Automated Email Notifications</h3>
                            <p class="text-[12px] text-white/30">Enable system-triggered transactional emails via the configured delivery provider.</p>
                        </div>
                    </div>
                    <button 
                        onclick={() => handleToggle('email_notifications')}
                        disabled={loading || activeToggle !== null}
                        aria-label="Toggle Email Notifications"
                        class="w-14 h-7 rounded-full transition-all relative {settings.email_notifications ? 'bg-[var(--gold)]' : 'bg-white/10'} {loading || activeToggle !== null ? 'opacity-50 cursor-not-allowed' : ''}"
                    >
                        <div class="absolute top-1 left-1 w-5 h-5 bg-[#0b0a07] rounded-full transition-all {settings.email_notifications ? 'translate-x-7' : 'translate-x-0'}"></div>
                    </button>
                </div>
            </div>
        </section>

        <!-- Runtime & Governance -->
        <section class="space-y-4">
            <h2 class="text-[11px] font-bold font-['Space_Mono'] uppercase tracking-[3px] text-[var(--gold)] ml-1">Runtime Governance</h2>
            <div class="bg-[#0f0e0b] border border-white/5 rounded-2xl p-8 space-y-6">
                <div class="flex items-start justify-between gap-6">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <div class="text-[10px] font-bold font-['Space_Mono'] uppercase tracking-widest text-white/40">Current Configuration State</div>
                            <Tooltip text="Secrets stay server-side. This panel exposes only environment readiness, not secret values." />
                        </div>
                        <p class="text-[13px] text-white/50 leading-relaxed max-w-2xl">
                            The unified application now exposes operational readiness instead of placeholder secrets. Use your deployment environment to rotate keys, then verify the live readiness cards above.
                        </p>
                    </div>
                    <div class="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 min-w-[220px]">
                        <div class="text-[10px] uppercase tracking-[2px] text-white/30 font-['Space_Mono'] mb-2">Last Settings Update</div>
                        <div class="text-[13px] text-white font-medium">{formatUpdatedAt(settings.updatedAt)}</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
