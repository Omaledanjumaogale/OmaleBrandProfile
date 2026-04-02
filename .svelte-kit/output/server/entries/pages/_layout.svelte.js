import { g as getContext, a as attr_class, e as ensure_array_like, b as attr, c as escape_html, s as store_get, d as unsubscribe_stores, f as stringify, h as derived } from "../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
import { u as user } from "../../chunks/auth.js";
import { w as writable } from "../../chunks/index2.js";
import { S as ServiceRequestForm } from "../../chunks/ServiceRequestForm.js";
import "../../chunks/convex.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const isServiceModalOpen = writable(false);
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const navLinks = [
      { name: "About", href: "/#about", icon: "👤" },
      { name: "Services", href: "/#services", icon: "🛠️" },
      { name: "Expertise", href: "/#expertise", icon: "🧠" },
      { name: "Career", href: "/#career", icon: "💼" },
      { name: "E-WIN", href: "/#ecosystem", icon: "🌍" },
      { name: "Insights", href: "/#thought", icon: "💡" }
    ];
    const authLinks = [{ name: "Admin Portal", href: "/admin", icon: "🛡️" }];
    $$renderer2.push(`<nav id="nav"${attr_class(
      `fixed top-0 left-0 right-0 z-[1000] px-6 lg:px-12 py-6 transition-all duration-400 flex items-center justify-between ${stringify("")}`,
      "svelte-1elxaub"
    )}><a href="/#hero" class="text-2xl font-['Bebas_Neue'] tracking-widest text-text flex items-center gap-1"><span class="text-gold italic font-normal">O</span>MALE OGALE ProfileX</a> <button class="flex flex-col gap-[6px] cursor-pointer z-[1001] p-3 hover:opacity-70 transition-opacity bg-gold/10 rounded-lg border border-gold/20" aria-label="Toggle Menu"><span${attr_class(`w-[28px] h-[2.5px] bg-gold shadow-[0_0_8px_rgba(201,168,76,0.5)] transition-all duration-300 ${stringify("")}`)}></span> <span${attr_class(`w-[28px] h-[2.5px] bg-gold shadow-[0_0_8px_rgba(201,168,76,0.5)] transition-all duration-300 ${stringify("")}`)}></span> <span${attr_class(`w-[28px] h-[2.5px] bg-gold shadow-[0_0_8px_rgba(201,168,76,0.5)] transition-all duration-300 ${stringify("")}`)}></span></button></nav> <div${attr_class(`fixed inset-0 bg-[#060608eb] backdrop-blur-xl z-[999] transition-all duration-500 ${stringify("opacity-0 pointer-events-none")}`)} role="button" tabindex="0" aria-label="Close Menu Overlay"><div${attr_class(`absolute right-0 top-0 h-full w-full max-w-[400px] bg-surface border-l border-border shadow-2xl p-12 pt-32 flex flex-col gap-8 transition-transform duration-500 ${stringify("translate-x-full")}`)} role="menu" tabindex="-1"><div class="flex flex-col gap-6 w-full"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-muted mb-4">Navigation 🧭</div> <!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<a${attr("href", link.href)} class="font-['Bebas_Neue'] text-4xl tracking-[3px] text-text hover:text-gold transition-colors duration-200 flex items-center gap-4 group"><span class="text-2xl group-hover:scale-110 transition-transform">${escape_html(link.icon)}</span> ${escape_html(link.name)}</a>`);
    }
    $$renderer2.push(`<!--]--> <div class="h-[1px] w-full bg-border my-4"></div> <div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-muted mb-4">Portal &amp; Contact 🛡️</div> `);
    if (store_get($$store_subs ??= {}, "$user", user)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(authLinks);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let link = each_array_1[$$index_1];
        $$renderer2.push(`<a${attr("href", link.href)} class="font-['Bebas_Neue'] text-4xl tracking-[3px] text-gold hover:text-gold2 transition-colors duration-200 flex items-center gap-4 group"><span class="text-2xl group-hover:scale-110 transition-transform">${escape_html(link.icon)}</span> ${escape_html(link.name)}</a>`);
      }
      $$renderer2.push(`<!--]--> <button class="font-['Bebas_Neue'] text-4xl tracking-[3px] text-red-400 hover:text-red-500 transition-colors duration-200 flex items-center gap-4 group text-left"><span class="text-2xl group-hover:scale-110 transition-transform">🚪</span> Logout</button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<a href="/admin/login" class="font-['Bebas_Neue'] text-4xl tracking-[3px] text-text hover:text-gold transition-colors duration-200 flex items-center gap-4 group"><span class="text-2xl group-hover:scale-110 transition-transform">🗝️</span> Admin Login</a>`);
    }
    $$renderer2.push(`<!--]--> <button class="mt-6 w-full py-4 bg-gold text-bg text-[11px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 hover:translate-y-[-2px] transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-3"><span>🤝</span> Connect Now</button></div> <div class="mt-auto pt-10 border-t border-border"><p class="text-[11px] text-muted leading-relaxed">© 2026 Danjuma Omale-Ogale<br/> E-WIN Project · Build for Impact 🌍</p></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer) {
  $$renderer.push(`<footer class="px-6 lg:px-12 py-8 border-t border-border flex items-center justify-between flex-wrap gap-4 bg-bg"><div class="font-['Bebas_Neue'] text-[18px] tracking-[2px] text-text"><span class="text-gold">E</span>-WIN PROJECT</div> <div class="font-['Space_Mono'] text-[9px] text-muted tracking-[1px] text-center sm:text-left">© 2026 Danjuma Umar Omale Ogale &amp; E-WIN Project. All rights reserved. 🇳🇬</div> <div class="flex gap-6"><a href="/#about" class="text-[10px] tracking-[1.5px] uppercase text-muted hover:text-gold transition-colors duration-200 font-medium">About 👤</a> <a href="/#ecosystem" class="text-[10px] tracking-[1.5px] uppercase text-muted hover:text-gold transition-colors duration-200 font-medium">Platforms 🌍</a> <a href="/admin/login" class="text-[10px] tracking-[1.5px] uppercase text-gold hover:text-gold2 transition-colors duration-200 font-bold">Admin 🛡️</a> <a href="/#contact" class="text-[10px] tracking-[1.5px] uppercase text-muted hover:text-gold transition-colors duration-200 font-medium">Contact 🤝</a></div></footer>`);
}
function ServiceRequestModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    if (store_get($$store_subs ??= {}, "$isServiceModalOpen", isServiceModalOpen)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-[#060608eb] backdrop-blur-xl svelte-19mwcjl" role="dialog" aria-modal="true" tabindex="-1"><div class="relative w-full max-w-[650px] max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-3xl shadow-2xl p-2 sm:p-4 svelte-19mwcjl"><button class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-bg border border-border text-muted hover:text-gold hover:border-gold transition-all z-10" aria-label="Close Modal">✕</button> <div class="p-4 sm:p-8 pt-10 svelte-19mwcjl"><div class="mb-8 text-center svelte-19mwcjl"><div class="font-['Space_Mono'] text-[10px] tracking-[3px] uppercase text-gold mb-3 svelte-19mwcjl">Professional Service Inquiry 🛠️</div> <h2 class="font-['Bebas_Neue'] text-4xl tracking-widest text-text">Ready to Collaborate? 🤝</h2> <p class="text-[13px] text-muted2 font-light mt-2 max-w-[400px] mx-auto">Fill out the form below, and I will get back to you with a comprehensive proposal for your project.</p></div> `);
      ServiceRequestForm($$renderer2);
      $$renderer2.push(`<!----></div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    let isAdminRoute = derived(() => store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/admin"));
    $$renderer2.push(`<div class="min-h-screen flex flex-col bg-bg selection:bg-gold selection:text-bg">`);
    if (!isAdminRoute()) {
      $$renderer2.push("<!--[0-->");
      Header($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <main class="flex-grow overflow-x-hidden">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    if (!isAdminRoute()) {
      $$renderer2.push("<!--[0-->");
      Footer($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    ServiceRequestModal($$renderer2);
    $$renderer2.push(`<!----></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
