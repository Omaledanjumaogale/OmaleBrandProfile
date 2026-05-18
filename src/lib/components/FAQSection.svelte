<script lang="ts">
    import { reveal } from '$lib/utils/reveal';
    import type { FAQ } from '$lib/schema/types';

    let { faqs } = $props<{ faqs: FAQ[] }>();
    
    let activeIndex = $state<number | null>(null);

    function toggle(index: number) {
        activeIndex = activeIndex === index ? null : index;
    }
</script>

<section class="py-20 px-6">
    <div class="max-w-3xl mx-auto space-y-12">
        <div class="text-center space-y-4" use:reveal>
            <h2 class="font-['Bebas_Neue'] text-4xl sm:text-5xl tracking-widest text-white">
                FREQUENTLY ASKED QUESTIONS
            </h2>
            <p class="text-white/40 text-sm uppercase tracking-widest font-['Space_Mono']">
                Direct answers to common inquiries
            </p>
        </div>

        <div class="space-y-4">
            {#each faqs as faq, i}
                <div 
                    class="bg-[#0f0e0b] border rounded-2xl overflow-hidden transition-all duration-300 {activeIndex === i ? 'border-[#c9a84c]/30' : 'border-[#c9a84c]/10'}"
                    use:reveal={{ threshold: 0.1 }}
                >
                    <button 
                        class="w-full px-8 py-6 text-left flex items-center justify-between group"
                        onclick={() => toggle(i)}
                        aria-expanded={activeIndex === i}
                    >
                        <span class="font-['Bebas_Neue'] text-xl tracking-wider text-white group-hover:text-[var(--gold)] transition-colors">
                            {faq.question}
                        </span>
                        <span class="text-[var(--gold)] transition-transform duration-300" style:transform={activeIndex === i ? 'rotate(45deg)' : 'rotate(0deg)'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </span>
                    </button>
                    
                    {#if activeIndex === i}
                        <div class="px-8 pb-6 text-white/60 leading-relaxed text-[15px]">
                            {faq.answer}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</section>
