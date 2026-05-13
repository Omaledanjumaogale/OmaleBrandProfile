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

  let currentIndex = $state(0);
  let interval: ReturnType<typeof setInterval>;

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

<section id="testimonials" class="relative py-24 overflow-hidden bg-bg border-t border-border">
  <!-- Decorative blobs -->
  <div class="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true"></div>
  <div class="absolute bottom-0 left-0 w-96 h-96 bg-teal2/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true"></div>

  <div class="max-w-[1200px] mx-auto px-6 relative z-10">
    <!-- Header -->
    <div class="flex flex-col items-center text-center mb-16 reveal">
      <div class="badge-gold mb-6">
        <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
        Social Proof
      </div>
      <h2 class="font-['Bebas_Neue'] text-[clamp(36px,5vw,72px)] tracking-[1px] leading-[0.95] text-text mb-6">
        Trusted by <span class="text-gradient-gold">Visionaries</span>
      </h2>
      <p class="text-muted2 max-w-2xl text-[15px] font-medium leading-relaxed">
        Voices from the ecosystem — collaborators and leaders sharing their experiences of building with me.
      </p>
    </div>

    <!-- Carousel -->
    <div class="max-w-5xl mx-auto relative reveal">
      <div class="relative min-h-[380px] md:min-h-[280px] flex items-center">
        {#each testimonials as testimonial, i}
          <div
            class="absolute inset-0 flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ease-in-out"
            style="opacity: {currentIndex === i ? '1' : '0'}; visibility: {currentIndex === i ? 'visible' : 'hidden'}; transform: translateX({(i - currentIndex) * 40}px)"
            aria-hidden={currentIndex !== i}
          >
            <!-- Avatar -->
            <div class="w-24 h-24 md:w-40 md:h-40 flex-shrink-0 relative">
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold to-teal2 rotate-6 opacity-20"></div>
              <img
                src={testimonial.image}
                alt="Portrait of {testimonial.name}"
                class="relative z-10 w-full h-full object-cover rounded-2xl border border-border bg-surface2 shadow-lg"
                loading="lazy"
              />
            </div>

            <!-- Quote -->
            <div class="flex-1 text-center md:text-left">
              <div class="mb-5">
                <svg class="w-10 h-10 text-gold opacity-25 mb-3 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6.1c.5-2.2 2.4-4 4.7-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-7.9c.5-2.2 2.4-4 4.7-4V8z"/>
                </svg>
                <p class="text-lg md:text-xl font-medium text-text leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
              <div>
                <h4 class="font-['Bebas_Neue'] text-xl tracking-[1px] text-text">{testimonial.name}</h4>
                <p class="text-gold font-bold text-[11px] uppercase tracking-wider mt-1">{testimonial.role}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Controls -->
      <div class="flex justify-center md:justify-end gap-4 mt-12">
        <button
          type="button"
          onclick={prev}
          class="p-3 rounded-full border border-border bg-surface text-text hover:border-gold hover:text-gold transition-all group min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
          aria-label="Previous testimonial"
        >
          <svg class="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onclick={next}
          class="p-3 rounded-full border border-border bg-surface text-text hover:border-gold hover:text-gold transition-all group min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
          aria-label="Next testimonial"
        >
          <svg class="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Indicators -->
      <div class="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial slides">
        {#each testimonials as _, i}
          <button
            type="button"
            onclick={() => { currentIndex = i; }}
            role="tab"
            aria-selected={currentIndex === i}
            class="h-1.5 rounded-full transition-all duration-300 {currentIndex === i ? 'w-8 bg-gold' : 'w-2 bg-border hover:bg-gold/50'}"
            aria-label="Go to slide {i + 1}"
          ></button>
        {/each}
      </div>
    </div>
  </div>
</section>
