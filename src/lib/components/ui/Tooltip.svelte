<script lang="ts">
    import { fade, scale } from 'svelte/transition';
    
    let { text, position = 'top' } = $props<{ 
        text: string; 
        position?: 'top' | 'bottom' | 'left' | 'right' 
    }>();

    let visible = $state(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    const arrowClasses = {
        top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-[#c9a84c]/20 border-l-transparent border-r-transparent',
        bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-[#c9a84c]/20 border-l-transparent border-r-transparent',
        left: 'right-[-4px] top-1/2 -translate-y-1/2 border-l-[#c9a84c]/20 border-t-transparent border-b-transparent',
        right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-[#c9a84c]/20 border-t-transparent border-b-transparent'
    };
</script>

<div 
    class="relative inline-flex items-center group cursor-help outline-none"
    role="button"
    tabindex="0"
    onmouseenter={() => visible = true}
    onmouseleave={() => visible = false}
    onfocus={() => visible = true}
    onblur={() => visible = false}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') visible = !visible; }}
>
    <div class="text-[var(--gold)] opacity-40 group-hover:opacity-100 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    </div>

    {#if visible}
        <div 
            in:scale={{ duration: 150, start: 0.95 }}
            out:fade={{ duration: 100 }}
            class="absolute {positionClasses[position]} z-[50] w-max max-w-[200px] px-3 py-2 bg-[#0b0a07] border border-[#c9a84c]/20 rounded-lg shadow-2xl backdrop-blur-xl pointer-events-none"
        >
            <p class="text-[11px] font-['Space_Mono'] text-white/80 leading-relaxed text-center">
                {text}
            </p>
            <div class="absolute w-0 h-0 border-4 {arrowClasses[position]}"></div>
        </div>
    {/if}
</div>
