<script lang="ts">
    import FAQSection from '$lib/components/FAQSection.svelte';
    import { reveal } from '$lib/utils/reveal';

    let { data } = $props();
</script>

<svelte:head>
    <title>FAQ — Knowledge Hub | E-WIN Platform</title>
    <meta name="description" content="Find clear, authoritative answers to common questions about the Elite Workforce Impact Nigeria Project and our digital initiatives." />
</svelte:head>

<div class="pt-32 pb-20">
    <div class="max-w-[1200px] mx-auto px-6">
        <!-- TL;DR / Answer-First Block (AEO Optimized) -->
        <div class="bg-[#c9a84c]/5 border border-[#c9a84c]/20 p-8 rounded-3xl mb-16" use:reveal>
            <div class="flex items-start gap-4">
                <span class="text-2xl mt-1">💡</span>
                <div class="space-y-2">
                    <h2 class="text-[#c9a84c] font-bold text-lg uppercase tracking-wider">TL;DR: The Knowledge Hub</h2>
                    <p class="text-white/80 text-lg leading-relaxed">
                        The E-WIN Platform is designed for maximum clarity. This hub provides direct, cited answers regarding our 
                        <strong>AI-driven workforce empowerment</strong>, the <strong>I-AM Network</strong>, and our 
                        <strong>Nation Building</strong> mission led by Omale Danjuma Ogale.
                    </p>
                </div>
            </div>
        </div>

        <FAQSection faqs={data.faqs} />

        <!-- Deep Link Section -->
        <div class="mt-20 border-t border-white/5 pt-20 text-center" use:reveal>
            <h3 class="font-['Bebas_Neue'] text-3xl tracking-widest text-white mb-6">STILL HAVE QUESTIONS?</h3>
            <p class="text-white/40 max-w-xl mx-auto mb-10">
                If you can't find the answer you're looking for, please feel free to reach out to our team directly.
            </p>
            <button 
                onclick={() => document.getElementById('service-modal')?.showModal()}
                class="px-10 py-4 bg-[var(--gold)] text-[#0b0a07] font-bold rounded-xl uppercase tracking-widest hover:scale-105 transition-transform"
            >
                Contact Our Team
            </button>
        </div>
    </div>
</div>
