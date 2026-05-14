<script lang="ts">
    import { toast } from '$lib/stores/toast.svelte';
    import { fly, fade } from 'svelte/transition';
    import { backOut } from 'svelte/easing';

    const icons = {
        success: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
    };

    const colors = {
        success: 'border-[#22917a] text-[#22917a] bg-[#22917a]/10',
        error: 'border-red-500 text-red-500 bg-red-500/10',
        info: 'border-blue-400 text-blue-400 bg-blue-400/10',
        warning: 'border-amber-500 text-amber-500 bg-amber-500/10'
    };
</script>

<div class="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
    {#each toast.toasts as t (t.id)}
        <div 
            in:fly={{ y: -20, duration: 400, easing: backOut }}
            out:fade={{ duration: 200 }}
            class="pointer-events-auto min-w-[320px] max-w-[450px] bg-[#0f0e0b] border-l-4 p-4 rounded-xl shadow-2xl flex items-start gap-4 {colors[t.type]} backdrop-blur-md"
            role="alert"
        >
            <div class="mt-1 shrink-0">
                {@html icons[t.type]}
            </div>
            <div class="flex-grow">
                {#if t.title}
                    <h4 class="font-['Bebas_Neue'] text-lg tracking-widest leading-none mb-1 text-white">
                        {t.title}
                    </h4>
                {/if}
                <p class="text-[13px] leading-relaxed text-white/70 font-medium">
                    {t.message}
                </p>
            </div>
            <button 
                onclick={() => toast.remove(t.id)}
                class="shrink-0 text-white/20 hover:text-white/60 transition-colors mt-1"
                aria-label="Dismiss notification"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
    {/each}
</div>
