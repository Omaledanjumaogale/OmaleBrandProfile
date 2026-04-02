import { j as head, b as attr, c as escape_html } from "../../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
import { g as getSessionId } from "../../../../chunks/convex.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let form = {
      fullName: "",
      email: "",
      mobileNumber: "",
      whatsappNumber: "",
      stateOfOrigin: "",
      lgaOfOrigin: "",
      stateOfResidence: "",
      lgaOfResidence: "",
      nin: "",
      academicBackground: "",
      workingExperience: "",
      skills: "",
      motivationalStatement: "",
      monthlyEarningsTarget: "",
      sessionId: getSessionId()
    };
    let loading = false;
    head("yoc918", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>I-AM Network Registration · Omale Ogale ProfileX 🌍</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-bg flex flex-col items-center py-20 px-6 relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none"></div> <div class="w-full max-w-4xl relative z-10"><div class="text-center mb-16 reveal visible"><a href="/" class="text-3xl font-['Bebas_Neue'] tracking-widest text-text mb-2 inline-block"><span class="text-gold italic">O</span>MALE OGALE ProfileX</a> <h1 class="font-['Bebas_Neue'] text-5xl tracking-[2px] text-text uppercase">I-AM Network Registration 🌍</h1> <p class="text-[11px] font-['Space_Mono'] tracking-widest text-muted uppercase mt-3">Onboard into the E-WIN Project Ecosystem 🛡️</p></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form class="bg-surface border border-border p-8 md:p-12 rounded-3xl shadow-2xl relative"><div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-teal2 rounded-t-3xl"></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="space-y-6"><h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-gold uppercase border-b border-border pb-2">Personal Details 👤</h3> <div class="space-y-2"><label for="fullName" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Full Name 📝</label> <input id="fullName" type="text"${attr("value", form.fullName)} required="" placeholder="Enter full name" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="space-y-2"><label for="email" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Email Address 📧</label> <input id="email" type="email"${attr("value", form.email)} required="" placeholder="email@example.com" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div> <div class="space-y-2"><label for="mobileNumber" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Mobile Number 📱</label> <input id="mobileNumber" type="tel"${attr("value", form.mobileNumber)} required="" placeholder="+234..." class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="space-y-2"><label for="whatsappNumber" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">WhatsApp Number 💬</label> <input id="whatsappNumber" type="tel"${attr("value", form.whatsappNumber)} required="" placeholder="+234..." class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div> <div class="space-y-2"><label for="nin" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">NIN Number 🛡️</label> <input id="nin" type="text"${attr("value", form.nin)} required="" placeholder="National ID Number" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="space-y-2"><label for="stateOfOrigin" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">State of Origin 🇳🇬</label> <input id="stateOfOrigin" type="text"${attr("value", form.stateOfOrigin)} required="" placeholder="State" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div> <div class="space-y-2"><label for="lgaOfOrigin" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">LGA of Origin 📍</label> <input id="lgaOfOrigin" type="text"${attr("value", form.lgaOfOrigin)} required="" placeholder="Local Gov Area" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="space-y-2"><label for="stateOfResidence" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">State of Residence 🏠</label> <input id="stateOfResidence" type="text"${attr("value", form.stateOfResidence)} required="" placeholder="State" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div> <div class="space-y-2"><label for="lgaOfResidence" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">LGA of Residence 🏘️</label> <input id="lgaOfResidence" type="text"${attr("value", form.lgaOfResidence)} required="" placeholder="Local Gov Area" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div></div></div> <div class="space-y-6"><h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-gold uppercase border-b border-border pb-2">Academic &amp; Career 💼</h3> <div class="space-y-2"><label for="academicBackground" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Academic Background 🎓</label> <input id="academicBackground" type="text"${attr("value", form.academicBackground)} required="" placeholder="Degree/Course of Study" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div> <div class="space-y-2"><label for="workingExperience" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Working Experience 💼</label> <textarea id="workingExperience" required="" rows="3" placeholder="Describe previous experience (or mention 'No Experience')" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all resize-none">`);
    const $$body = escape_html(form.workingExperience);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="space-y-2"><label for="skills" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Skills (Soft/Digital/Marketing) ⚡</label> <textarea id="skills" required="" rows="3" placeholder="List your digital skills, knowledge sharing, or business development expertise" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all resize-none">`);
    const $$body_1 = escape_html(form.skills);
    if ($$body_1) {
      $$renderer2.push(`${$$body_1}`);
    }
    $$renderer2.push(`</textarea></div> <div class="space-y-2"><label for="motivationalStatement" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Motivational Statement 🚀</label> <textarea id="motivationalStatement" required="" rows="4" placeholder="Why do you want to work with the E-WIN Project?" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all resize-none">`);
    const $$body_2 = escape_html(form.motivationalStatement);
    if ($$body_2) {
      $$renderer2.push(`${$$body_2}`);
    }
    $$renderer2.push(`</textarea></div> <div class="space-y-2"><label for="monthlyEarningsTarget" class="text-[10px] font-['Space_Mono'] tracking-widest text-muted uppercase ml-2">Monthly Earnings Target 💰</label> <input id="monthlyEarningsTarget" type="text"${attr("value", form.monthlyEarningsTarget)} required="" placeholder="How much would you like to earn monthly? (e.g. ₦150,000)" class="w-full bg-bg border border-border p-4 rounded-xl text-text text-sm focus:border-gold outline-none transition-all"/></div></div></div> <div class="mt-12 pt-8 border-t border-border flex flex-col items-center"><p class="text-[11px] text-muted text-center mb-6 max-w-[500px] font-light italic">By submitting this application, you agree to the E-WIN Project terms of service and commit to the mission of impacting Nigeria's workforce through elite collaboration. 🛡️</p> <button type="submit"${attr("disabled", loading, true)} class="w-full max-w-md py-4 bg-gold text-bg text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 hover:translate-y-[-2px] transition-all shadow-xl shadow-gold/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">${escape_html("Submit IAM Application 🚀")} `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="text-xl">→</span>`);
    }
    $$renderer2.push(`<!--]--></button></div></form> <p class="mt-12 text-center text-[9px] font-['Space_Mono'] tracking-widest text-muted uppercase">Enterprise-Grade Onboarding Infrastructure · E-WIN Project © 2026 🛡️</p></div></div>`);
  });
}
export {
  _page as default
};
