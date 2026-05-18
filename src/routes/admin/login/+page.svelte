<script lang="ts">
    import { convex } from '$lib/convex';
    import { api } from '$convex/_generated/api';
    import { goto } from '$app/navigation';
    import { ui } from '$lib/stores/ui';
    import { fade, fly } from 'svelte/transition';

    let email = $state('');
    let password = $state('');
    let loading = $state(false);
    let error = $state('');

    async function handleLogin(e: Event) {
        e.preventDefault();
        if (loading) return;

        loading = true;
        error = '';

        try {
            const result = await convex.mutation(api.admin.verifyAdminCredentials, {
                email,
                password
            });

            if (result.success && result.token) {
                // Set the session cookie via a client-side trick or a simple fetch to an internal API
                // For simplicity and to follow the user request of "redirection if incorrect", 
                // we'll use document.cookie for this session-based auth.
                document.cookie = `admin_session=${result.token}; path=/; max-age=86400; SameSite=Strict`;
                
                ui.success("Welcome back, Super Admin.", "Access Granted");
                goto('/admin');
            } else {
                error = result.message || "Invalid credentials.";
                ui.error(error, "Access Denied");
                // User request: "only when the user doesnt have the correct admin login details that they will be redirected to the homepage"
                setTimeout(() => {
                    goto('/');
                }, 2000);
            }
        } catch (e: any) {
            error = "System error during authentication.";
            ui.error(error);
        } finally {
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Super Admin Login | E-WIN Platform</title>
</svelte:head>

<div class="min-h-screen bg-[#0b0a07] flex items-center justify-center px-6 py-12 relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--gold)] rounded-full blur-[120px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--gold)] rounded-full blur-[120px]"></div>
    </div>

    <div 
        in:fly={{ y: 20, duration: 800 }}
        class="w-full max-w-[440px] bg-[#0f0e0b] border border-[#c9a84c]/20 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
    >
        <!-- Logo/Header -->
        <div class="text-center mb-10">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 mb-6">
                <span class="text-3xl">🔑</span>
            </div>
            <h1 class="font-['Bebas_Neue'] text-4xl tracking-[3px] text-white leading-none mb-2">
                ADMIN <span class="text-[var(--gold)]">PORTAL</span>
            </h1>
            <p class="text-[11px] font-['Space_Mono'] uppercase tracking-[4px] text-white/40">
                Super Admin Authentication
            </p>
        </div>

        <!-- Login Form -->
        <form onsubmit={handleLogin} class="space-y-6">
            <div class="space-y-2">
                <label for="email" class="block text-[11px] font-bold font-['Space_Mono'] uppercase tracking-[2px] text-white/60 ml-1">
                    Email Address
                </label>
                <input 
                    id="email" 
                    type="email" 
                    bind:value={email}
                    required
                    placeholder="admin@ewinproject.org"
                    class="w-full bg-[#0b0a07] border border-[#c9a84c]/10 rounded-xl px-4 py-3 text-[14px] text-white focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20 outline-none transition-all"
                />
            </div>

            <div class="space-y-2">
                <label for="password" class="block text-[11px] font-bold font-['Space_Mono'] uppercase tracking-[2px] text-white/60 ml-1">
                    Security Password
                </label>
                <input 
                    id="password" 
                    type="password" 
                    bind:value={password}
                    required
                    placeholder="••••••••••••"
                    class="w-full bg-[#0b0a07] border border-[#c9a84c]/10 rounded-xl px-4 py-3 text-[14px] text-white focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20 outline-none transition-all"
                />
            </div>

            {#if error}
                <div 
                    transition:fade
                    class="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[12px] text-center font-medium"
                >
                    {error}
                </div>
            {/if}

            <button 
                type="submit" 
                disabled={loading}
                class="w-full bg-[var(--gold)] text-[#0b0a07] font-bold py-4 rounded-xl uppercase tracking-[3px] text-[12px] hover:bg-[#b89844] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(201,168,76,0.2)] flex items-center justify-center gap-3"
            >
                {#if loading}
                    <span class="w-4 h-4 border-2 border-[#0b0a07]/30 border-t-[#0b0a07] rounded-full animate-spin"></span>
                    VERIFYING...
                {:else}
                    AUTHORIZE ACCESS 🛡️
                {/if}
            </button>
        </form>

        <!-- Footer Note -->
        <div class="mt-10 pt-8 border-t border-white/5 text-center">
            <p class="text-[10px] text-white/30 font-['Space_Mono'] leading-relaxed uppercase tracking-wider">
                Unauthorized access attempts are logged <br /> and monitored via enterprise audit systems.
            </p>
        </div>
    </div>
</div>
