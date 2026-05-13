<script lang="ts">
  const projects = [
    {
      id: "ewin-core",
      title: "E-WIN Core Ecosystem",
      category: "Nation Building / Fintech",
      description: "A multi-platform workforce innovation ecosystem designed to create sustainable income pathways for 1M+ Nigerians through decentralized trade and training.",
      impact: "Architecture & Strategy",
      metrics: ["3 Platforms", "Edge Deployment", "Decentralized"],
      color: "from-[#1a5c3a] to-[#2d8a5c]"
    },
    {
      id: "iam-network",
      title: "I-AM Network",
      category: "Identity & Governance",
      description: "A decentralized identity and resource management system for the E-WIN ecosystem, ensuring secure access and verified workforce credentials.",
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

<section id="projects" class="py-24 bg-[var(--surface-bright)] border-y border-[var(--border)]">
  <div class="container mx-auto px-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 reveal">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 mb-6">
          <span class="w-2 h-2 rounded-full bg-[var(--gold)]"></span>
          <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--gold)]">Case Studies</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-6 tracking-tight">
          Featured <span class="text-gradient">Case Studies</span>
        </h2>
        <p class="text-[var(--text-muted2)] text-lg font-medium leading-relaxed">
          Deep dives into the systems and strategies I've engineered to solve large-scale socio-economic challenges through technology.
        </p>
      </div>
      <div class="mt-8 md:mt-0">
        <a href="/blog" class="group flex items-center gap-3 text-[var(--text-main)] font-black uppercase tracking-widest text-xs">
          View All Insights
          <div class="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:text-white transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {#each projects as project, i}
        <div class="group relative flex flex-col h-full bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden hover:shadow-2xl hover:border-[var(--gold)]/30 transition-all duration-500 reveal" style="transition-delay: {i * 100}ms">
          <!-- Card Header / Image Area -->
          <div class="relative h-48 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br {project.color} opacity-80 group-hover:scale-110 transition-transform duration-700"></div>
            <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-white/20 text-6xl font-black">{project.title.charAt(0)}</span>
            </div>
            <div class="absolute top-6 left-6">
              <span class="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                {project.category}
              </span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="flex-1 p-8 flex flex-col">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-2xl font-black text-[var(--text-main)] leading-tight">{project.title}</h3>
              <span class="text-[var(--gold)] font-black text-[10px] uppercase tracking-tighter">{project.impact}</span>
            </div>
            <p class="text-[var(--text-muted2)] font-medium mb-8 line-clamp-3">
              {project.description}
            </p>

            <div class="mt-auto pt-6 border-t border-[var(--border)]">
              <div class="flex flex-wrap gap-2">
                {#each project.metrics as metric}
                  <span class="text-[10px] font-bold text-[var(--text-muted1)] bg-[var(--surface-bright)] px-2 py-1 rounded-md border border-[var(--border)]">
                    {metric}
                  </span>
                {/each}
              </div>
            </div>
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-[var(--gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center justify-center p-8 text-center z-20">
            <h4 class="text-white text-2xl font-black mb-4">Explore {project.title}</h4>
            <p class="text-white/80 font-medium mb-8">View full architecture breakdown and impact metrics.</p>
            <a href="/blog/{project.id}" class="px-8 py-4 bg-white text-[var(--text-main)] font-black rounded-full hover:scale-105 transition-transform uppercase tracking-widest text-xs shadow-xl">
              View Case Study
            </a>
          </div>
        </div>
      {/each}
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
