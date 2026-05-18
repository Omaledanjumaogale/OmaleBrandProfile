<script lang="ts">
    import { onMount } from 'svelte';
    import { convex } from '$lib/convex';
    import { api } from '$convex/_generated/api';
    import { ui } from '$lib/stores/ui';
    import { fade, fly } from 'svelte/transition';
    import Tooltip from '$lib/components/ui/Tooltip.svelte';

    let settings = $state({
        registrationOpen: true,
        maintenanceMode: false,
        emailNotifications: true,
        smsGateways: false,
        apiKey: 'sk_live_••••••••••••••••••••'
    });

    let loading = $state(true);

    onMount(() => {
        // Load initial settings from Convex
        const loadSettings = async () => {
            const keys = ['registrationOpen', 'maintenanceMode', 'emailNotifications'];
            for (const key of keys) {
                const val = await convex.query(api.functions.getSetting, { key });
                if (val !== null) {
                    // @ts-ignore
                    settings[key] = val;
                }
            }
            loading = false;
        };
        loadSettings();
    });

    async function handleToggle(key: string) {
        // @ts-ignore
        const newValue = !settings[key];
        
        try {
            await convex.mutation(api.functions.updateSetting, {
                key,
                value: newValue,
                adminEmail: 'super-admin'
            });
            // @ts-ignore
            settings[key] = newValue;
            ui.success(`Global setting "${key}" updated.`, "System Configured");
        } catch (e: any) {
            ui.error(e.message || "Failed to update setting");
        }
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
            Manage global feature flags and infrastructure policies
        </p>
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
                        onclick={() => handleToggle('registrationOpen')}
                        disabled={loading}
                        aria-label="Toggle Public Registration"
                        class="w-14 h-7 rounded-full transition-all relative {settings.registrationOpen ? 'bg-[var(--gold)]' : 'bg-white/10'} {loading ? 'opacity-50 cursor-not-allowed' : ''}"
                    >
                        <div class="absolute top-1 left-1 w-5 h-5 bg-[#0b0a07] rounded-full transition-all {settings.registrationOpen ? 'translate-x-7' : 'translate-x-0'}"></div>
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
                        onclick={() => handleToggle('maintenanceMode')}
                        disabled={loading}
                        aria-label="Toggle Maintenance Mode"
                        class="w-14 h-7 rounded-full transition-all relative {settings.maintenanceMode ? 'bg-red-500' : 'bg-white/10'} {loading ? 'opacity-50 cursor-not-allowed' : ''}"
                    >
                        <div class="absolute top-1 left-1 w-5 h-5 bg-[#0b0a07] rounded-full transition-all {settings.maintenanceMode ? 'translate-x-7' : 'translate-x-0'}"></div>
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
                            <p class="text-[12px] text-white/30">Enable system-triggered transactional emails via SendGrid.</p>
                        </div>
                    </div>
                    <button 
                        onclick={() => handleToggle('emailNotifications')}
                        disabled={loading}
                        aria-label="Toggle Email Notifications"
                        class="w-14 h-7 rounded-full transition-all relative {settings.emailNotifications ? 'bg-[var(--gold)]' : 'bg-white/10'} {loading ? 'opacity-50 cursor-not-allowed' : ''}"
                    >
                        <div class="absolute top-1 left-1 w-5 h-5 bg-[#0b0a07] rounded-full transition-all {settings.emailNotifications ? 'translate-x-7' : 'translate-x-0'}"></div>
                    </button>
                </div>
            </div>
        </section>

        <!-- API & Security -->
        <section class="space-y-4">
            <h2 class="text-[11px] font-bold font-['Space_Mono'] uppercase tracking-[3px] text-[var(--gold)] ml-1">Infrastructure Secrets</h2>
            <div class="bg-[#0f0e0b] border border-white/5 rounded-2xl p-8 space-y-6">
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <label for="convex-key" class="text-[10px] font-bold font-['Space_Mono'] uppercase tracking-widest text-white/40">Convex Management Key</label>
                        <Tooltip text="This key grants full programmatic access to your database. Never share it." />
                    </div>
                    <div class="flex gap-2">
                        <input 
                            id="convex-key"
                            type="password" 
                            readonly 
                            value={settings.apiKey}
                            class="flex-grow bg-[#0b0a07] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white/60 font-mono outline-none"
                        />
                        <button 
                            aria-label="Rotate Convex Management Key"
                            class="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                            Rotate
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
