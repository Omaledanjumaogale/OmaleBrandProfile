<script lang="ts">
  const projects = [
    {
      id: "ewin-core",
      title: "E-WIN Core Ecosystem",
      category: "Nation Building / Fintech",
      description: "A multi-platform workforce innovation ecosystem designed to create sustainable income pathways for 1M+ Nigerians through decentralised trade and training.",
      impact: "Architecture & Strategy",
      metrics: ["3 Platforms", "Edge Deployment", "Decentralised"],
      color: "from-[#1a5c3a] to-[#2d8a5c]"
    },
    {
      id: "iam-network",
      title: "I-AM Network",
      category: "Identity & Governance",
      description: "A decentralised identity and resource management system for the E-WIN ecosystem, ensuring secure access and verified workforce credentials.",
      impact: "Governance Layer",
      metrics: ["Role-Based Access", "Convex Backend", "Real-time Audits"],
      color: "from-[#c5a059] to-[#8a6d3b]"
    },
    {
      id: "marketintel",
      title: "MarketIntel Platform",
      category: "Data & Intelligence",
      description: "High-fidelity market intelligence engine providing real-time insights and predictive analysis for digital commodity trading across Africa.",
      impact: "Intelligence Layer",
      metrics: ["99.9% Uptime", "Low Latency", "Global Reach"],
      color: "from-[#1e1a12] to-[#3a352a]"
    }
  ];
</script>

<section id="projects" class="py-24 bg-surface border-y border-border">
  <div class="max-w-[1200px] mx-auto px-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
      <div class="max-w-2xl">
        <div class="badge-gold mb-6">
          <span class="w-2 h-2 rounded-full bg-gold"></span>
          Case Studies
        </div>
        <h2 class="font-['Bebas_Neue'] text-[clamp(36px,5vw,72px)] tracking-[1px] leading-[0.95] text-text mb-6">
          Featured <span class="text-gradient-gold">Case Studies</span>
        </h2>
        <p class="text-muted2 text-[15px] font-medium leading-relaxed">
          Deep dives into the systems and strategies I've engineered to solve large-scale socio-economic challenges through technology.
        </p>
      </div>
      <div class="mt-8 md:mt-0">
        <a href="/blog" class="group flex items-center gap-3 text-text font-bold uppercase tracking-widest text-xs hover:text-gold transition-colors">
          View All Articles
          <div class="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {#each projects as project, i}
        <div
          class="card card-hover group relative flex flex-col h-full rounded-3xl overflow-hidden reveal"
          style="transition-delay: {i * 100}ms"
        >
          <!-- Card Header -->
          <div class="relative h-48 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br {project.color} opacity-90 group-hover:scale-110 transition-transform duration-700"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-white/20 text-7xl font-black select-none">{project.title.charAt(0)}</span>
            </div>
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest">
                {project.category}
              </span>
            </div>
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 rounded-full bg-gold/80 text-white text-[9px] font-bold uppercase tracking-widest">
                {project.impact}
              </span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="flex-1 p-6 sm:p-8 flex flex-col">
            <h3 class="font-['Bebas_Neue'] text-2xl tracking-[1px] text-text leading-tight mb-3">
              {project.title}
            </h3>
            <p class="text-muted2 text-[13px] leading-[1.75] font-normal mb-6 flex-grow">
              {project.description}
            </p>

            <div class="mt-auto pt-5 border-t border-border">
              <div class="flex flex-wrap gap-2 mb-4">
                {#each project.metrics as metric}
                  <span class="text-[9px] font-bold tracking-[1px] uppercase text-muted bg-surface2 border border-border2 px-2.5 py-1 rounded-lg">
                    {metric}
                  </span>
                {/each}
              </div>
              <a
                href="/blog/{project.id}"
                class="w-full py-2.5 bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold tracking-[2px] uppercase rounded-xl hover:bg-gold hover:text-white transition-all duration-300 min-h-[44px] flex items-center justify-center gap-2 group/btn"
              >
                View Case Study
                <span class="transition-transform group-hover/btn:translate-x-1" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
