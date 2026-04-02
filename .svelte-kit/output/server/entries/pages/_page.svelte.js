import { e as ensure_array_like, c as escape_html, a as attr_class, f as stringify, i as attr_style, b as attr, j as head } from "../../chunks/index.js";
import "../../chunks/convex.js";
import { S as ServiceRequestForm } from "../../chunks/ServiceRequestForm.js";
function Hero($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section id="hero" class="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden svelte-1q37ri0"><div class="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60 pointer-events-none svelte-1q37ri0"></div> <div class="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-[radial-gradient(ellipse,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none svelte-1q37ri0"></div> <div class="flex flex-col justify-center px-6 lg:px-12 pt-[140px] pb-20 relative z-10 svelte-1q37ri0"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-7 flex items-center gap-3 reveal svelte-1q37ri0"><span class="w-7 h-[1px] bg-gold svelte-1q37ri0"></span> AI-Augmented Developer &amp; Founder 🤖</div> <h1 class="font-['Bebas_Neue'] text-[clamp(60px,7vw,108px)] leading-[0.92] tracking-[2px] mb-9 reveal delay-100 svelte-1q37ri0"><span class="[-webkit-text-stroke:1px_var(--muted)] text-transparent svelte-1q37ri0">DANJUMA</span><br class="svelte-1q37ri0"/> <span class="text-gold svelte-1q37ri0">OMALE</span><br class="svelte-1q37ri0"/> <span class="svelte-1q37ri0">OGALE</span></h1> <p class="text-[15px] font-light leading-[1.8] text-muted2 max-w-[420px] mb-12 reveal delay-200 svelte-1q37ri0">Sociologist. Strategist. Builder. I architect systems that upskill Africa's workforce, close economic divides, and create sustainable livelihoods through the E-WIN Project ecosystem. 🌍</p> <div class="flex items-center gap-5 flex-wrap reveal delay-300 svelte-1q37ri0"><a href="#ecosystem" class="px-8 py-3.5 bg-gold text-bg text-[11px] font-semibold tracking-[2px] uppercase rounded-[var(--radius)] hover:bg-gold2 hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(201,168,76,0.25)] transition-all duration-250 svelte-1q37ri0">Explore E-WIN 🌍</a> <a href="#about" class="px-8 py-3.5 border border-border2 text-muted2 text-[11px] font-medium tracking-[2px] uppercase rounded-[var(--radius)] hover:border-gold-line hover:text-gold transition-all duration-250 svelte-1q37ri0">My Story 📖</a></div> <div class="flex gap-9 mt-[60px] pt-10 border-t border-border reveal delay-400 svelte-1q37ri0"><div class="svelte-1q37ri0"><span class="font-['Bebas_Neue'] text-[40px] text-gold tracking-widest block leading-none svelte-1q37ri0">25+</span> <span class="text-[10px] tracking-[2px] uppercase text-muted mt-1 block svelte-1q37ri0">Platforms Built 💻</span></div> <div class="svelte-1q37ri0"><span class="font-['Bebas_Neue'] text-[40px] text-gold tracking-widest block leading-none svelte-1q37ri0">13+</span> <span class="text-[10px] tracking-[2px] uppercase text-muted mt-1 block svelte-1q37ri0">Years Experience 💼</span></div> <div class="svelte-1q37ri0"><span class="font-['Bebas_Neue'] text-[40px] text-gold tracking-widest block leading-none svelte-1q37ri0">8+</span> <span class="text-[10px] tracking-[2px] uppercase text-muted mt-1 block svelte-1q37ri0">Certifications 📜</span></div></div></div> <div class="relative overflow-hidden hidden lg:block svelte-1q37ri0"><div class="absolute inset-0 bg-[#0a0a0e] svelte-1q37ri0"><img src="/danjuma-ogale.jpg" alt="Danjuma Umar Omale Ogale" class="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.9] saturate-[0.95] svelte-1q37ri0"/> <div class="absolute inset-0 bg-[linear-gradient(to_right,var(--bg)_0%,rgba(6,6,8,0.3)_40%,transparent_70%),linear-gradient(to_top,var(--bg)_0%,transparent_30%)] svelte-1q37ri0"></div></div> <div class="absolute bottom-10 right-8 bg-[#0d0d12e6] border border-border p-4 sm:p-5 rounded-[var(--radius)] backdrop-blur-md reveal delay-500 svelte-1q37ri0"><div class="font-['Bebas_Neue'] text-base tracking-[2px] text-text svelte-1q37ri0">DANJUMA U. OMALE OGALE 🇳🇬</div> <div class="font-['Space_Mono'] text-[9px] text-gold tracking-[1.5px] mt-1 svelte-1q37ri0">Founder &amp; CEO · E-WIN Project 🚀</div></div></div> <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 svelte-1q37ri0"><span class="font-['Space_Mono'] text-[9px] tracking-[2px] uppercase text-muted [writing-mode:vertical-rl] svelte-1q37ri0">Scroll</span> <div class="w-[1px] h-[60px] bg-[linear-gradient(to_bottom,transparent,var(--gold))] animate-[scrollBeat_2s_ease-in-out_infinite] svelte-1q37ri0"></div></div></section>`);
  });
}
function Ticker($$renderer) {
  const items = [
    "E-WIN Project 🌍",
    "AI-Augmented Builder 🤖",
    "DealxHire 💼",
    "AkademyX 🎓",
    "Workforce Innovation 🚀",
    "Nigeria Tech Founder 🇳🇬",
    "Learn · Work · Earn 💰"
  ];
  $$renderer.push(`<div class="overflow-hidden py-3 bg-gold relative z-[2] border-y border-gold-line svelte-1lmn4fy"><div class="flex whitespace-nowrap animate-[ticker_30s_linear_infinite] group svelte-1lmn4fy"><!--[-->`);
  const each_array = ensure_array_like(Array(4));
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    each_array[$$index_1];
    $$renderer.push(`<!--[-->`);
    const each_array_1 = ensure_array_like(items);
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let item = each_array_1[$$index];
      $$renderer.push(`<span class="font-['Bebas_Neue'] text-[14px] tracking-[3px] text-bg px-12 relative flex items-center gap-12 svelte-1lmn4fy">${escape_html(item)} <span class="text-bg opacity-50 svelte-1lmn4fy">✦</span></span>`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]--></div></div>`);
}
function About($$renderer) {
  const stats = [
    { num: "10M+", label: "Youth Targeted 🎯" },
    { num: "25+", label: "Platforms Live & Coming Soon 💻" },
    { num: "∞", label: "Impact Potential 🚀" }
  ];
  const creds = [
    {
      title: "Ahmadu Bello University, Zaria 🎓",
      sub: "M.Sc Law Enforcement & Criminal Justice · B.Sc Sociology",
      icon: "🎓"
    },
    {
      title: "Kaduna Business School 💼",
      sub: "Diploma in Entrepreneurial Finance · ICT",
      icon: "📈"
    },
    {
      title: "Current Base 📍",
      sub: "Gwarinpa, Abuja · Nigeria 🇳🇬",
      icon: "📍"
    }
  ];
  $$renderer.push(`<section id="about" class="bg-surface border-y border-border px-6 lg:px-12 py-20"><div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"><div class="reveal"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"><span class="w-6 h-[1px] bg-gold"></span> Origin Story 📖</div> <h2 class="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">Built from<br/>conviction.</h2> <div class="grid grid-cols-3 gap-[1px] bg-border border border-border rounded-[var(--radius)] overflow-hidden mt-10"><!--[-->`);
  const each_array = ensure_array_like(stats);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let stat = each_array[$$index];
    $$renderer.push(`<div class="bg-bg p-5 sm:p-6 text-center"><div class="font-['Bebas_Neue'] text-[32px] sm:text-[44px] text-gold tracking-widest leading-none">${escape_html(stat.num)}</div> <div class="text-[9px] tracking-[2px] uppercase text-muted mt-[6px]">${escape_html(stat.label)}</div></div>`);
  }
  $$renderer.push(`<!--]--></div></div> <div class="reveal delay-200"><p class="text-[15px] leading-[1.85] text-muted2 font-light mb-5">I am <strong>Danjuma Umar Omale Ogale</strong> — a sociologist turned AI developer, business strategist, and serial founder operating from Abuja, Nigeria. My academic foundation at Ahmadu Bello University Zaria in Sociology and Law Enforcement gave me a deep lens through which I read systems, power, and human behaviour. 🇳🇬</p> <p class="text-[15px] leading-[1.85] text-muted2 font-light mb-5">That lens became the blueprint for the <strong>E-WIN Project</strong> — Elite Workforce Impact Nigeria — a decentralised ecosystem designed to upskill unemployed youth, create sustainable earning pathways, and disrupt the traditional service sector through technology, AI, and collaborative networking. 🚀</p> <p class="text-[15px] leading-[1.85] text-muted2 font-light mb-5">From aviation management to radio administration, from community liaison to prompt engineering, I have operated at the intersection of institutions and innovation — always with one guiding north star: <strong>empower people from within the system, not from outside it.</strong> 🏗️</p> <div class="flex flex-col gap-3 mt-8"><!--[-->`);
  const each_array_1 = ensure_array_like(creds);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let cred = each_array_1[$$index_1];
    $$renderer.push(`<div class="flex items-start gap-3 p-4 border-b border-border last:border-b-0 hover:bg-surface2 transition-colors duration-200 rounded-lg"><div class="w-8 h-8 bg-gold-dim border border-gold-line rounded-lg flex items-center justify-center shrink-0 text-gold text-lg">${escape_html(cred.icon)}</div> <div><div class="text-[13px] text-text font-medium">${escape_html(cred.title)}</div> <div class="text-[11px] text-muted mt-[2px] font-['Space_Mono'] tracking-[0.5px]">${escape_html(cred.sub)}</div></div></div>`);
  }
  $$renderer.push(`<!--]--></div></div></div></section>`);
}
function Services($$renderer) {
  const services = [
    {
      title: "App Development 📱",
      desc: "Architecting high-performance web and mobile applications with SvelteKit, React Native, and robust backend infrastructures.",
      icon: "💻",
      tags: ["Web", "Mobile", "Full-Stack"]
    },
    {
      title: "AI Consultancy 🤖",
      desc: "AI-augmented knowledge facilitation and strategic consultancy to integrate Generative AI into your business workflows.",
      icon: "🧠",
      tags: ["GenAI", "Prompt Engineering", "Strategy"]
    },
    {
      title: "Business Advisory 💼",
      desc: "Expert business strategy and operational advisory for startups and established corporations seeking scalable growth.",
      icon: "📈",
      tags: ["Strategy", "Advisory", "Growth"]
    },
    {
      title: "Academic Writing 🎓",
      desc: "Professional assistance for final year projects, Master’s theses, and Doctorate dissertations with rigorous research standards.",
      icon: "📜",
      tags: ["Theses", "Research", "Dissertations"]
    },
    {
      title: "Corporate Writing ✍️",
      desc: "Crafting high-impact business plans, proposals, grant applications, and comprehensive technical reports for any sector.",
      icon: "📄",
      tags: ["Proposals", "Grants", "Plans"]
    },
    {
      title: "Branding & Design 🎨",
      desc: "End-to-end corporate identity design, professional branding, and high-quality printing services for your business.",
      icon: "✨",
      tags: ["Branding", "Design", "Printing"]
    }
  ];
  $$renderer.push(`<section id="services" class="bg-bg px-6 lg:px-12 py-24 relative overflow-hidden"><div class="absolute top-0 right-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse,rgba(201,168,76,0.04)_0%,transparent_70%)] pointer-events-none"></div> <div class="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse,rgba(60,179,113,0.03)_0%,transparent_70%)] pointer-events-none"></div> <div class="max-w-[1200px] mx-auto relative z-10"><div class="text-center mb-16 reveal"><div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-gold mb-4">Professional Services 🛠️</div> <h2 class="font-['Bebas_Neue'] text-[clamp(45px,6vw,84px)] tracking-[2px] leading-[0.9] mb-6">Strategic Solutions.<br/><span class="text-gold">Expert Implementation.</span></h2> <p class="text-[15px] leading-[1.8] text-muted2 max-w-[600px] mx-auto font-light">Leveraging a decade of interdisciplinary expertise to deliver high-impact results across technology, business, and research sectors. 🌍</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
  const each_array = ensure_array_like(services);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let service = each_array[i];
    $$renderer.push(`<div${attr_class(`bg-surface border border-border p-8 rounded-[var(--radius)] group hover:border-gold-line transition-all duration-400 relative overflow-hidden flex flex-col h-full reveal delay-${stringify(i * 100)}`)}><div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-teal2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div> <div class="w-14 h-14 bg-bg border border-border rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:border-gold-line transition-all duration-300">${escape_html(service.icon)}</div> <h3 class="font-['Bebas_Neue'] text-2xl tracking-[1.5px] text-text mb-3">${escape_html(service.title)}</h3> <p class="text-[13px] leading-[1.7] text-muted2 font-light mb-8 flex-grow">${escape_html(service.desc)}</p> <div class="flex flex-wrap gap-2 pt-6 border-t border-border mt-auto"><!--[-->`);
    const each_array_1 = ensure_array_like(service.tags);
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let tag = each_array_1[$$index];
      $$renderer.push(`<span class="text-[9px] font-['Space_Mono'] tracking-[1px] uppercase text-muted border border-border2 px-2 py-0.5 rounded group-hover:border-gold-line/30 group-hover:text-gold/80 transition-colors">${escape_html(tag)}</span>`);
    }
    $$renderer.push(`<!--]--></div></div>`);
  }
  $$renderer.push(`<!--]--></div> <div class="mt-20 p-10 bg-surface border border-gold-line/20 rounded-[var(--radius)] text-center reveal"><h4 class="font-['Bebas_Neue'] text-3xl tracking-[2px] mb-4">Ready to start a project? 🤝</h4> <p class="text-[14px] text-muted2 mb-8 max-w-[500px] mx-auto font-light">Whether you need a full-scale enterprise application or a comprehensive business plan, I am ready to bring your vision to life.</p> <button class="inline-block px-10 py-4 bg-gold text-bg text-[11px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 hover:translate-y-[-2px] transition-all shadow-lg shadow-gold/20">Consult with Me 🚀</button></div></div></section>`);
}
function IAMOnboarding($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<section id="iam-onboarding" class="bg-surface border-y border-border px-6 lg:px-12 py-24 relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(60,179,113,0.05)_0%,transparent_60%)] pointer-events-none"></div> <div class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"><div class="reveal"><div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-gold mb-6 flex items-center gap-3"><span class="w-8 h-[1px] bg-gold"></span> Join the Elite Network 🌍</div> <h2 class="font-['Bebas_Neue'] text-[clamp(45px,6vw,84px)] tracking-[2px] leading-[0.9] mb-8">Become an <span class="text-gold">Impact Ambassador.</span></h2> <p class="text-[16px] leading-[1.8] text-muted2 font-light mb-10 max-w-[600px]">Onboard into the <strong>I-AM Network</strong> and unlock the potential to work across the entire E-WIN Project ecosystem. Access multiple income streams, collaborate on high-impact platforms, and become a leader in Africa's digital transformation. 🚀 <br/><br/> <strong class="text-gold">We are committed to onboarding at least 10,000,000 youths, unemployed graduates, skilled persons, persons with disabilities and students, empowering them and providing employment opportunities that enable them to earn ₦200,000+ monthly across our platforms and impacting others and their communities across Africa.</strong></p> <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"><div class="flex items-start gap-4 p-4 bg-bg border border-border rounded-xl"><div class="text-2xl">💰</div> <div><div class="text-[12px] font-bold text-text uppercase tracking-widest">Multiple Income Streams</div> <div class="text-[10px] text-muted mt-1">Earn from diverse platforms within the ecosystem.</div></div></div> <div class="flex items-start gap-4 p-4 bg-bg border border-border rounded-xl"><div class="text-2xl">📈</div> <div><div class="text-[12px] font-bold text-text uppercase tracking-widest">Skill Advancement</div> <div class="text-[10px] text-muted mt-1">Exclusive access to AI-upskilling and mentor networks.</div></div></div></div> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a href="/register/iam" class="inline-flex items-center gap-4 px-10 py-4 bg-gold text-bg text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 hover:translate-x-2 transition-all shadow-xl shadow-gold/20 group">Submit Application 🚀 <span class="text-xl transition-transform group-hover:translate-x-1">→</span></a>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="relative reveal delay-200"><div class="aspect-square rounded-[40px] border border-gold-line/20 bg-surface2 relative overflow-hidden group"><div class="absolute inset-0 bg-gradient-to-br from-gold/10 to-teal2/10"></div> <div class="absolute inset-0 flex items-center justify-center"><div class="relative w-[80%] h-[80%] border border-border rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]"><!--[-->`);
    const each_array = ensure_array_like(Array(6));
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      $$renderer2.push(`<div class="absolute w-12 h-12 bg-surface border border-gold-line rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-gold/10"${attr_style(`transform: rotate(${stringify(i * 60)}deg) translateY(-140px) rotate(-${stringify(i * 60)}deg)`)}>${escape_html(["🏢", "🛒", "🎓", "💰", "🛡️", "🌍"][i])}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="absolute w-32 h-32 bg-gold text-bg font-['Bebas_Neue'] text-3xl flex items-center justify-center rounded-full shadow-2xl shadow-gold/40 z-20">I-AM</div></div></div> <div class="absolute -bottom-8 -left-8 p-6 bg-[#0d0d12e6] border border-border rounded-2xl backdrop-blur-xl shadow-2xl reveal delay-400"><div class="font-['Bebas_Neue'] text-3xl text-gold tracking-widest">10,000,000+</div> <div class="text-[9px] text-muted uppercase tracking-widest mt-1">Goal for Impact Ambassadors 🇳🇬</div></div> <div class="absolute -top-8 -right-8 p-6 bg-[#0d0d12e6] border border-border rounded-2xl backdrop-blur-xl shadow-2xl reveal delay-500"><div class="font-['Bebas_Neue'] text-3xl text-teal2 tracking-widest">6+</div> <div class="text-[9px] text-muted uppercase tracking-widest mt-1">Income Streams 💸</div></div></div></div></section>`);
  });
}
function Expertise($$renderer) {
  const expertise = [
    {
      num: "01",
      title: "AI Development 🤖",
      desc: "Prompt engineering, context design, agentic workflows, and AI-augmented product development. IBM certified in Generative AI.",
      icon: "🤖"
    },
    {
      num: "02",
      title: "Platform Building 💻",
      desc: "Full-stack web & mobile application development. Four live platforms within the E-WIN ecosystem including E-Deals, AkademyX, and DealxHire.",
      icon: "💻"
    },
    {
      num: "03",
      title: "Business Strategy 📈",
      desc: "Blue ocean modelling, RaaS frameworks, decentralised workforce architecture, and stakeholder value mapping across multiple sectors.",
      icon: "📈"
    },
    {
      num: "04",
      title: "HR & Administration 🏢",
      desc: "PMP and HR certified. Head of Administration at Triming Radio. Managed CESMP, HSE & HR at World Bank-funded irrigation project.",
      icon: "🏢"
    },
    {
      num: "05",
      title: "Sociological Analysis 🧠",
      desc: "Applied sociology underpins every product decision — understanding communities, inequalities, and the behavioural economics of emerging market users.",
      icon: "🧠"
    }
  ];
  $$renderer.push(`<section id="expertise" class="bg-bg px-6 lg:px-12 py-20"><div class="flex justify-between items-end mb-14 gap-10 flex-wrap"><div class="reveal"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"><span class="w-6 h-[1px] bg-gold"></span> Core Competencies 🛠️</div> <h2 class="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">Five layers<br/>of leverage.</h2></div> <p class="text-[15px] text-muted2 leading-[1.8] font-light max-w-[540px] reveal delay-100">Each domain reinforces the other — creating a compounding advantage that no single-skill practitioner can replicate. 🚀</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[1px] bg-border border border-border rounded-[var(--radius)] overflow-hidden"><!--[-->`);
  const each_array = ensure_array_like(expertise);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$renderer.push(`<div class="bg-bg p-9 transition-colors duration-300 hover:bg-surface2 group cursor-default border-border"><div class="font-['Space_Mono'] text-[9px] text-gold tracking-widest mb-3 opacity-70">${escape_html(item.num)}</div> <div class="w-10 h-10 bg-gold-dim border border-gold-line rounded-[10px] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#c9a84c33] group-hover:border-gold text-2xl">${escape_html(item.icon)}</div> <h3 class="font-['Bebas_Neue'] text-xl tracking-[1px] mb-[10px]">${escape_html(item.title)}</h3> <p class="text-[12px] leading-[1.7] text-muted2 font-light">${escape_html(item.desc)}</p></div>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
}
function Career($$renderer) {
  const timeline = [
    {
      period: "June 2025 – Present",
      role: "Head of Administration / General Secretary 📻",
      org: "Triming Radio 105.9 FM · Kano State 🇳🇬",
      desc: "Overseeing institutional administration, broadcast governance, and operational systems for one of northern Nigeria's leading FM radio stations."
    },
    {
      period: "2020 – 2023",
      role: "Admin Manager · Quality & Safety · Consultant ✈️",
      org: "Private Flyers International Limited · Kaduna (Aviation) 🛩️",
      desc: "Triple-role tenure spanning administrative management, DATS-certified quality and safety systems, and strategic business consulting for aerial aviation and flight training operations."
    },
    {
      period: "2018 – 2020",
      role: "CESMP, HSE & HR Manager Asst. 🏗️",
      org: "CGC-CHWE Joint Venture · World Bank / TRIMING Project · Zamfara 💧",
      desc: "Embedded with a World Bank-funded irrigation management project — managing community relations, environmental social management plans, health & safety, and human resources for a large-scale infrastructure programme."
    },
    {
      period: "2015 – 2018",
      role: "Administrative Assistant to the Honourable Member 🏛️",
      org: "Kaduna State House of Assembly · Lord Lugard Complex 📜",
      desc: "Legislative and administrative support for a sitting member of the Kaduna State Assembly, building deep knowledge of governance systems and institutional processes."
    },
    {
      period: "2013 – 2014",
      role: "Senior Class Teacher (NYSC) 👨‍🏫",
      org: "G.S.S. Gurara · Niger State 📚",
      desc: "National service as a senior-level educator — an experience that deepened conviction in the transformative power of knowledge transfer and education systems."
    }
  ];
  $$renderer.push(`<section id="career" class="bg-surface border-y border-border px-6 lg:px-12 py-20"><div class="reveal mb-14"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"><span class="w-6 h-[1px] bg-gold"></span> Professional Journey 💼</div> <h2 class="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">Twelve years.<br/>Multiple sectors.</h2> <p class="text-[15px] text-muted2 leading-[1.8] font-light max-w-[540px]">From legislative chambers to aviation operations to radio broadcasting — a career defined by range, resilience, and relentless forward motion. 🚀</p></div> <div class="relative pl-8 border-l border-gold/20 ml-4 space-y-10"><!--[-->`);
  const each_array = ensure_array_like(timeline);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let item = each_array[i];
    $$renderer.push(`<div${attr_class(`relative reveal delay-${stringify(i * 100)}`)}><div class="absolute -left-[41px] top-[6px] w-4 h-4 bg-gold border-4 border-surface rounded-full shadow-[0_0_0_4px_rgba(201,168,76,0.1)]"></div> <div class="font-['Space_Mono'] text-[9px] tracking-[2px] text-gold uppercase mb-1.5">${escape_html(item.period)}</div> <div class="font-['Bebas_Neue'] text-2xl tracking-[1px] text-text mb-1">${escape_html(item.role)}</div> <div class="text-[13px] text-muted2 font-light italic">${escape_html(item.org)}</div> <div class="text-[12px] text-muted leading-[1.7] mt-2 font-light max-w-2xl">${escape_html(item.desc)}</div></div>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
}
function Ecosystem($$renderer) {
  const platforms = [
    {
      badge: "Headquarters 🏢",
      name: "E-WIN Hub 🌍",
      overview: "The central command platform for the Elite Workforce Impact Nigeria ecosystem — housing the mission, activator programmes, I-AM Network portal, and strategic intelligence for all sub-platforms.",
      link: "Explore Platform →",
      domain: "ewinproject.org",
      href: "https://ewinproject.org",
      icon: "🏢"
    },
    {
      badge: "Marketplace 🛒",
      name: "DealxHire 🤝",
      overview: "A domestic and professional services marketplace connecting vetted service providers to clients across Nigeria. The centralized hub for E-Deals mobile application platform — arbitraging supply and demand at scale.",
      link: "Explore Platform →",
      domain: "dealxhire.org",
      href: "https://dealxhire.org",
      icon: "🛒"
    },
    {
      badge: "Education 🎓",
      name: "AkademyX 🧠",
      overview: "An AI-powered upskilling and decentralised education platform delivering hyper-personalised skill development pathways in tech, business, and the digital economy — closing the knowledge gap for ambitious learners across Africa.",
      link: "Explore Platform →",
      domain: "akademyx.org",
      href: "https://akademyx.org",
      icon: "🎓"
    },
    {
      badge: "Alternative Ed 💡",
      name: "Alt AkademyX 🚀",
      overview: "The alternative education arm — offering non-traditional, outcomes-focused learning experiences that challenge conventional academic pathways and deliver real-world skills with immediate economic application.",
      link: "Explore Platform →",
      domain: "alternativeakademyx.org",
      href: "https://alternativeakademyx.org",
      icon: "💡"
    },
    {
      badge: "Community 👥",
      name: "I-AM Network 🌍",
      overview: "The Impact Ambassador Network — a decentralised workforce of vetted, trained professionals performing distributed work across the E-WIN ecosystem. Collaborative networking with distributive revenue sharing built in.",
      link: "Join Network →",
      domain: "Join I-AM 🚀",
      href: "/register/iam",
      icon: "👥"
    },
    {
      badge: "Intelligence 🧠",
      name: "DEALS Platform 📊",
      overview: "Digital Emerging Arbitrage and Leverage Services — the technological backbone of the E-WIN revenue model, powering white-label freelance marketplaces, service arbitrage, and the done-for-you business infrastructure for the ecosystem.",
      link: "Explore Platform →",
      domain: "DEALS · E-WIN 💼",
      href: "#",
      icon: "📈"
    },
    {
      badge: "Learning 📚",
      name: "AkademyX Draft 🎓",
      overview: "AI-powered lesson structures and interactive educational content for the E-WIN ecosystem.",
      link: "Open Draft →",
      domain: "AkademyX · E-WIN",
      href: "/platforms/AkademyxDraft.html",
      icon: "🎓"
    },
    {
      badge: "Analysis ⚽",
      name: "BetxPredicts 📈",
      overview: "Data-driven sports predictions and analytical modeling for informed decision making.",
      link: "Open Platform →",
      domain: "BetxPredicts · E-WIN",
      href: "/platforms/BetxPredicts.html",
      icon: "📈"
    },
    {
      badge: "Business 👔",
      name: "Biznex Draft 💼",
      overview: "Strategic business planning and operational modeling for emerging market enterprises.",
      link: "Open Draft →",
      domain: "Biznex · E-WIN",
      href: "/platforms/BiznexDraft.html",
      icon: "👔"
    },
    {
      badge: "Tertiary Ed 🏛️",
      name: "College CBT 🏫",
      overview: "Advanced computer-based testing infrastructure for higher education institutions.",
      link: "Open Platform →",
      domain: "CollegeCBT · E-WIN",
      href: "/platforms/CollegeCBT.html",
      icon: "🏛️"
    },
    {
      badge: "Finance 🏦",
      name: "Financial Auditor 💰",
      overview: "Automated financial auditing and verification systems for transparent economic activity.",
      link: "Open Platform →",
      domain: "Auditor · E-WIN",
      href: "/platforms/FinancialAuditor.html",
      icon: "🏦"
    },
    {
      badge: "Healthcare 🩺",
      name: "MedPharmRx 💊",
      overview: "Pharmaceutical supply chain tracking and medical inventory management solutions.",
      link: "Open Platform →",
      domain: "MedPharm · E-WIN",
      href: "/platforms/MedPharmRx.html",
      icon: "🩺"
    },
    {
      badge: "Mentorship 💡",
      name: "MentorMe 🤝",
      overview: "Peer-to-peer professional mentorship network connecting experienced leaders with emerging talent.",
      link: "Open Network →",
      domain: "MentorMe · E-WIN",
      href: "/platforms/MentorMe.html",
      icon: "💡"
    },
    {
      badge: "K-12 Ed 📖",
      name: "School CBT 🎒",
      overview: "Computer-based testing and digital assessment platform for primary and secondary schools.",
      link: "Open Platform →",
      domain: "SchoolCBT · E-WIN",
      href: "/platforms/SchoolCBT.html",
      icon: "📖"
    },
    {
      badge: "Media 📻",
      name: "TradexNews 📰",
      overview: "Real-time market news, economic analysis, and financial reporting for the African trade sector.",
      link: "Read News →",
      domain: "TradexNews · E-WIN",
      href: "/platforms/TradexNews.html",
      icon: "📻"
    },
    {
      badge: "Commerce 📦",
      name: "TradezMarket 🏪",
      overview: "Decentralized marketplace for physical and digital goods, powered by the E-WIN infrastructure.",
      link: "Shop Market →",
      domain: "Tradez · E-WIN",
      href: "/platforms/TradezMarket.html",
      icon: "📦"
    },
    {
      badge: "Strategy 🎯",
      name: "VantagePoint 🔭",
      overview: "High-level strategic insights and data visualization for ecosystem-wide performance monitoring.",
      link: "View Insights →",
      domain: "Vantage · E-WIN",
      href: "/platforms/VantagePoint.html",
      icon: "🎯"
    }
  ];
  $$renderer.push(`<section id="ecosystem" class="bg-bg px-6 lg:px-12 py-20"><div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end mb-14"><div class="reveal"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"><span class="w-6 h-[1px] bg-gold"></span> E-WIN Ecosystem 🌍</div> <h2 class="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">Seventeen platforms.<br/>One mission.</h2></div> <div class="text-[15px] leading-[1.8] text-muted2 font-light reveal delay-100"><p>The E-WIN Project is an interconnected ecosystem of digital platforms united by a single conviction: that <strong>Africa's workforce gap is solvable</strong> — not through charity, but through intelligent, scalable systems built by Africans for Africans. 🌍<br/><br/>Tagline: <strong>Learn. Work. Earn. 💰</strong></p></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"><!--[-->`);
  const each_array = ensure_array_like(platforms);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let platform = each_array[i];
    $$renderer.push(`<a${attr("href", platform.href)}${attr("target", platform.href.startsWith("http") ? "_blank" : "")}${attr_class(`bg-surface border border-border p-8 rounded-[var(--radius)] relative overflow-hidden transition-all duration-350 hover:border-gold-line hover:translate-y-[-4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] group reveal delay-${stringify(i % 6 * 100)}`)}><div class="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-350 group-hover:opacity-100"></div> <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-teal2 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100"></div> <div class="inline-block font-['Space_Mono'] text-[8px] tracking-[2px] uppercase px-2.5 py-1 border border-border2 text-muted rounded-[4px] mb-4 transition-all duration-250 group-hover:border-gold-line group-hover:text-gold flex items-center gap-2">${escape_html(platform.badge)}</div> <div class="font-['Bebas_Neue'] text-[26px] tracking-[1px] mb-2.5 flex items-center gap-3">${escape_html(platform.name)}</div> <p class="text-[12px] leading-[1.75] text-muted2 font-light mb-6">${escape_html(platform.overview)}</p> <div class="font-['Space_Mono'] text-[10px] tracking-[2px] uppercase text-gold flex items-center gap-2 transition-all duration-250 group-hover:gap-[14px]">${escape_html(platform.link)}</div> <div class="absolute bottom-6 right-6 font-['Space_Mono'] text-[9px] text-border2 tracking-[1px] transition-colors duration-250 group-hover:text-muted">${escape_html(platform.domain)}</div></a>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
}
function Philosophy($$renderer) {
  const principles = [
    {
      num: "01",
      title: "Systems over heroics 🏗️",
      text: "Individual brilliance has a ceiling. Well-designed systems compound indefinitely. I build structures that work without my presence — and scale precisely because of that."
    },
    {
      num: "02",
      title: "Empathy before automation 🧠",
      text: "Every AI system begins with a human problem clearly defined. Technology is the implementation, never the premise. Understanding people deeply is a competitive advantage."
    },
    {
      num: "03",
      title: "Ship, learn, sharpen 🚀",
      text: "Perfectionism is the enemy of impact. I move fast with intention — releasing, observing, iterating. The market is the most honest feedback mechanism available."
    },
    {
      num: "04",
      title: "Equity as architecture ⚖️",
      text: "Social impact is not a feature added at the end — it is baked into the business model from day one. If the economics don't serve underrepresented communities, the design is wrong."
    },
    {
      num: "05",
      title: "Compound everything 📈",
      text: "Knowledge, relationships, capital, reputation — all assets that compound. Short-term thinking is the most expensive strategic mistake a founder can make."
    }
  ];
  $$renderer.push(`<section id="philosophy" class="bg-surface border-t border-border px-6 lg:px-12 py-20"><div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"><div class="reveal"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"><span class="w-6 h-[1px] bg-gold"></span> Operating Principles ⚖️</div> <h2 class="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">The code I<br/>build by.</h2> <p class="text-[15px] text-muted2 leading-[1.8] font-light max-w-[540px] mt-4">Every product decision, every strategic choice flows from a deliberately constructed philosophical framework. These aren't slogans — they are constraints that produce better outcomes. 🏗️</p></div> <div class="flex flex-col reveal delay-200"><!--[-->`);
  const each_array = ensure_array_like(principles);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let principle = each_array[i];
    $$renderer.push(`<div class="py-7 border-b border-border last:border-b-0 flex gap-5 items-start transition-all duration-300 hover:pl-2 group"><span class="font-['Space_Mono'] text-[11px] text-gold pt-0.5 group-hover:scale-110 transition-transform">${escape_html(principle.num)}</span> <div><div class="font-['Bebas_Neue'] text-xl tracking-[1px] mb-1.5 flex items-center gap-2">${escape_html(principle.title)}</div> <p class="text-[12px] leading-[1.75] text-muted2 font-light">${escape_html(principle.text)}</p></div></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section>`);
}
function ThoughtLeadership($$renderer) {
  const thoughts = [
    {
      tag: "Featured Essay ✍️",
      title: "The Agentic Shift: Why the Next Decade Belongs to AI-Augmented Founders 🤖",
      body: "We are entering the most significant redistribution of productive capacity in human history. AI agents are not tools — they are leverage. And founders who learn to orchestrate them will operate at the velocity of entire teams. Here's what that means for how we build, what we build, and who gets to build it.",
      featured: true
    },
    {
      tag: "Analysis 📊",
      title: "Emerging Markets & The AI Access Gap 🌍",
      body: "The democratisation of AI is uneven. Without intentional infrastructure investment and localised model training, the gap between AI-enabled and AI-excluded economies will widen dramatically by 2030. Approximately 26% of jobs in low-income countries are already exposed to AI displacement.",
      featured: false
    },
    {
      tag: "Framework 🏗️",
      title: "Building for Dignity: A Sociological Framework for Ethical AI Product Design ⚖️",
      body: "Ethical AI is not about compliance checklists. It is about designing systems that preserve human dignity, expand agency, and distribute value fairly across all users — not just the most profitable segment.",
      featured: false
    }
  ];
  $$renderer.push(`<section id="thought" class="bg-bg border-t border-border px-6 lg:px-12 py-20"><div class="reveal mb-14"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"><span class="w-6 h-[1px] bg-gold"></span> AI Thought Leadership 🧠</div> <h2 class="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">Perspectives on<br/>what's coming.</h2></div> <div class="grid grid-cols-1 lg:grid-cols-4 gap-[1px] bg-border border border-border rounded-[var(--radius)] overflow-hidden"><!--[-->`);
  const each_array = ensure_array_like(thoughts);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let thought = each_array[i];
    $$renderer.push(`<div${attr_class(`bg-surface p-9 transition-colors duration-300 hover:bg-surface2 group cursor-default ${stringify(thought.featured ? "lg:col-span-2 bg-surface2" : "")} reveal delay-${stringify(i * 100)}`)}><div class="font-['Space_Mono'] text-[8px] tracking-[2px] uppercase text-gold mb-4">${escape_html(thought.tag)}</div> <h3 class="font-['Bebas_Neue'] text-2xl tracking-[0.5px] leading-[1.1] mb-3 flex items-center gap-3">${escape_html(thought.title)}</h3> <p class="text-[12px] leading-[1.75] text-muted2 font-light">${escape_html(thought.body)}</p> <span class="block mt-6 text-xl text-gold transition-transform duration-250 group-hover:translate-x-1.5">→</span></div>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
}
function Certifications($$renderer) {
  const certs = [
    {
      year: "2025",
      name: "Generative AI: Prompt Engineering 🤖",
      issuer: "IBM Developer Skills Network"
    },
    {
      year: "2024",
      name: "Professional Virtual Assistant 💼",
      issuer: "ALX Africa"
    },
    {
      year: "2024",
      name: "AI Augmented Professional Development 🚀",
      issuer: "ALX Africa"
    },
    {
      year: "2022",
      name: "Quality Management System ✈️",
      issuer: "Dornier Aviation Training School"
    },
    {
      year: "2022",
      name: "Safety Management System 🛡️",
      issuer: "Dornier Aviation Training School"
    },
    {
      year: "2017",
      name: "Project Management Professional (PMP) 📊",
      issuer: "Professional Certification Body"
    },
    {
      year: "2017",
      name: "Human Resource Management 👥",
      issuer: "Professional Certification"
    },
    {
      year: "2017",
      name: "Certificate in Management 🏢",
      issuer: "African Management Initiative · South Africa 🇿🇦"
    }
  ];
  $$renderer.push(`<section id="certifications" class="bg-surface border-t border-border px-6 lg:px-12 py-20"><div class="reveal mb-12"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-[14px] flex items-center gap-[10px]"><span class="w-6 h-[1px] bg-gold"></span> Credentials 📜</div> <h2 class="font-['Bebas_Neue'] text-[clamp(40px,5vw,72px)] tracking-[1px] leading-[0.95] mb-6">Built on<br/>verified mastery.</h2></div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-12"><!--[-->`);
  const each_array = ensure_array_like(certs);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let cert = each_array[i];
    $$renderer.push(`<div${attr_class(`bg-bg border border-border p-5 rounded-[var(--radius)] transition-all duration-300 hover:border-gold-line hover:bg-surface2 group reveal delay-${stringify(i * 50)}`)}><div class="font-['Space_Mono'] text-[9px] text-gold tracking-[2px] mb-2">${escape_html(cert.year)} 📅</div> <div class="text-[13px] text-text font-medium leading-[1.4] mb-1 group-hover:text-gold transition-colors">${escape_html(cert.name)}</div> <div class="text-[11px] text-muted font-light mt-1">${escape_html(cert.issuer)}</div></div>`);
  }
  $$renderer.push(`<!--]--></div></section>`);
}
function Contact($$renderer) {
  $$renderer.push(`<section id="contact" class="bg-bg border-t border-border px-6 lg:px-12 py-20"><div class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div class="text-left"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-5 reveal">Let's Build Together 🤝</div> <h2 class="font-['Bebas_Neue'] text-[clamp(45px,6vw,84px)] tracking-[2px] leading-[0.9] mb-6 reveal delay-100">Ready to<br/><span class="text-gold italic">collaborate?</span></h2> <p class="text-[15px] text-muted2 leading-[1.8] font-light mb-12 reveal delay-200 max-w-[500px]">Whether you are an investor, a partner, a talented builder, or someone who believes in the E-WIN mission — I want to hear from you. Great things are built in rooms where the right people have the courage to connect. 🚀</p> <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t border-border reveal delay-400"><div class="flex flex-col items-start gap-1.5"><span class="font-['Space_Mono'] text-[9px] tracking-[2px] uppercase text-muted">Email 📧</span> <a href="mailto:omaledanjumaogale@gmail.com" class="text-[13px] text-text hover:text-gold transition-colors">omaledanjumaogale@gmail.com</a></div> <div class="flex flex-col items-start gap-1.5"><span class="font-['Space_Mono'] text-[9px] tracking-[2px] uppercase text-muted">Mobile 📱</span> <a href="tel:+2349025152818" class="text-[13px] text-text hover:text-gold transition-colors">+234-902-515-2818</a></div> <div class="flex flex-col items-start gap-1.5"><span class="font-['Space_Mono'] text-[9px] tracking-[2px] uppercase text-muted">LinkedIn 🔗</span> <a href="https://linkedin.com/in/omaledanjumaogale" target="_blank" class="text-[13px] text-text hover:text-gold transition-colors">omaledanjumaogale</a></div> <div class="flex flex-col items-start gap-1.5"><span class="font-['Space_Mono'] text-[9px] tracking-[2px] uppercase text-muted">Base 📍</span> <span class="text-[13px] text-text">Gwarinpa, Abuja 🇳🇬</span></div></div></div> <div class="reveal delay-300 bg-surface border border-border p-8 rounded-[var(--radius)] shadow-2xl relative overflow-hidden"><div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-teal2"></div> <h3 class="font-['Bebas_Neue'] text-3xl tracking-widest text-text mb-6">Service Request Form 🛠️</h3> `);
  ServiceRequestForm($$renderer);
  $$renderer.push(`<!----></div></div></section>`);
}
function _page($$renderer) {
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Danjuma Umar Omale Ogale · E-WIN Project Founder</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Danjuma Umar Omale Ogale — AI-Augmented Developer, Sociologist, Business Strategist &amp; Founder of the E-WIN Project."/>`);
  });
  Hero($$renderer);
  $$renderer.push(`<!----> `);
  Ticker($$renderer);
  $$renderer.push(`<!----> `);
  About($$renderer);
  $$renderer.push(`<!----> `);
  Services($$renderer);
  $$renderer.push(`<!----> `);
  IAMOnboarding($$renderer);
  $$renderer.push(`<!----> `);
  Expertise($$renderer);
  $$renderer.push(`<!----> `);
  Career($$renderer);
  $$renderer.push(`<!----> `);
  Ecosystem($$renderer);
  $$renderer.push(`<!----> `);
  Philosophy($$renderer);
  $$renderer.push(`<!----> `);
  ThoughtLeadership($$renderer);
  $$renderer.push(`<!----> `);
  Certifications($$renderer);
  $$renderer.push(`<!----> `);
  Contact($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
