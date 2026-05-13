<script lang="ts">
  import { onMount } from 'svelte';

  const testimonials = [
    {
      name: "Chukwuma Obi",
      role: "CEO, TechFlow Solutions",
      quote: "Omale's vision for the E-WIN ecosystem is truly transformative. His ability to bridge complex software architecture with real-world workforce problems is unmatched in the region.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chukwuma"
    },
    {
      name: "Sarah Alabi",
      role: "Operations Director, Innovate Lagos",
      quote: "Working with Omale on the workforce strategy was a game-changer for our hub. He doesn't just build software; he builds systems that empower people to thrive in the digital economy.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      name: "Dr. Emmanuel Kalu",
      role: "Senior Consultant, AFRI-Dev",
      quote: "A rare breed of leader who understands that technology is only as good as the impact it leaves on the common man. His commitment to nation-building is inspiring.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel"
    }
  ];

  let currentIndex = 0;
  let interval: any;

  function next() {
    currentIndex = (currentIndex + 1) % testimonials.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  }

  onMount(() => {
    interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  });
</script>

<section id="testimonials" class="relative py-24 overflow-hidden bg-[var(--surface)]">
  <!-- Decorative background elements -->
  <div class="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
  <div class="absolute bottom-0 left-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

  <div class="container mx-auto px-6 relative z-10">
    <div class="flex flex-col items-center text-center mb-16 reveal">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 mb-6">
        <span class="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse"></span>
        <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--gold)]">Social Proof</span>
      </div>
      <h2 class="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-6 tracking-tight">
        Trusted by <span class="text-gradient">Visionaries</span>
      </h2>
      <p class="text-[var(--text-muted2)] max-w-2xl text-lg font-medium leading-relaxed">
        Voices from the ecosystem — collaborators and leaders sharing their experiences of building with me.
      </p>
    </div>

    <div class="max-w-5xl mx-auto relative reveal">
      <!-- Testimonial Card -->
      <div class="relative min-h-[400px] md:min-h-[300px] flex items-center">
        {#each testimonials as testimonial, i}
          <div 
            class="absolute inset-0 flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ease-in-out"
            style="opacity: {currentIndex === i ? '1' : '0'}; visibility: {currentIndex === i ? 'visible' : 'hidden'}; transform: translateX({(i - currentIndex) * 50}px)"
          >
            <div class="w-24 h-24 md:w-48 md:h-48 flex-shrink-0 relative">
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--accent)] rotate-6 opacity-20"></div>
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                class="relative z-10 w-full h-full object-cover rounded-2xl border border-[var(--border)] bg-[var(--surface-bright)] shadow-xl"
              />
            </div>
            
            <div class="flex-1 text-center md:text-left">
              <div class="mb-6">
                <svg class="w-12 h-12 text-[var(--gold)] opacity-20 mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6.1c.5-2.2 2.4-4 4.7-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-7.9c.5-2.2 2.4-4 4.7-4V8z"/>
                </svg>
                <p class="text-xl md:text-2xl font-bold text-[var(--text-main)] leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
              <div>
                <h4 class="text-lg font-black text-[var(--text-main)]">{testimonial.name}</h4>
                <p class="text-[var(--gold)] font-bold text-sm uppercase tracking-wider">{testimonial.role}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Controls -->
      <div class="flex justify-center md:justify-end gap-4 mt-12">
        <button 
          on:click={prev}
          class="p-3 rounded-full border border-[var(--border)] bg-[var(--surface-bright)] text-[var(--text-main)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all group"
          aria-label="Previous testimonial"
        >
          <svg class="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          on:click={next}
          class="p-3 rounded-full border border-[var(--border)] bg-[var(--surface-bright)] text-[var(--text-main)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all group"
          aria-label="Next testimonial"
        >
          <svg class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Indicators -->
      <div class="flex justify-center gap-2 mt-8">
        {#each testimonials as _, i}
          <button 
            on:click={() => currentIndex = i}
            class="h-1.5 rounded-full transition-all duration-300 {currentIndex === i ? 'w-8 bg-[var(--gold)]' : 'w-2 bg-[var(--border)] hover:bg-[var(--gold)]/50'}"
            aria-label="Go to slide {i + 1}"
          ></button>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .text-gradient {
    background: linear-gradient(135deg, var(--gold) 0%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
