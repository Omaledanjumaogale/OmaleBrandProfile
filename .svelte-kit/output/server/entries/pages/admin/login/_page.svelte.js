import { b as attr, c as escape_html } from "../../../../chunks/index.js";
import "../../../../chunks/auth.js";
import "firebase/auth";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    let loading = false;
    $$renderer2.push(`<div class="min-h-screen flex items-center justify-center bg-bg px-6 py-12 relative overflow-hidden"><div class="absolute inset-0 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 pointer-events-none"></div> <div class="w-full max-w-[450px] relative z-10"><div class="text-center mb-10"><a href="/" class="text-4xl font-['Bebas_Neue'] tracking-[4px] text-text mb-4 inline-block"><span class="text-gold italic font-normal">O</span>MALE OGALE</a> <div class="font-['Space_Mono'] text-[10px] tracking-[4px] uppercase text-gold">Admin Portal Access 🛡️</div></div> <div class="bg-surface border border-border p-10 rounded-3xl shadow-2xl backdrop-blur-xl">`);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form class="space-y-6"><div class="space-y-2"><label for="email" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Administrative Email</label> <input type="email" id="email"${attr("value", email)} required="" placeholder="admin@ewinproject.com" class="w-full bg-bg border border-border rounded-xl px-5 py-4 text-[13px] focus:border-gold outline-none transition-all"/></div> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="space-y-2"><div class="flex justify-between items-center"><label for="password" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Password</label> <button type="button" class="text-[9px] text-gold hover:underline uppercase tracking-widest">Forgot?</button></div> <input type="password" id="password"${attr("value", password)} required="" placeholder="••••••••" class="w-full bg-bg border border-border rounded-xl px-5 py-4 text-[13px] focus:border-gold outline-none transition-all"/></div>`);
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", loading, true)} class="w-full py-5 bg-gold text-bg text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 transition-all disabled:opacity-50 flex items-center justify-center gap-3">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`${escape_html("Enter Portal 🛡️")}`);
    }
    $$renderer2.push(`<!--]--></button> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></form></div> <div class="mt-10 text-center"><p class="text-[11px] text-muted leading-relaxed">Authorized access only. All sessions are logged and monitored.<br/> © 2026 Danjuma Omale-Ogale · E-WIN Project.</p></div></div></div>`);
  });
}
export {
  _page as default
};
