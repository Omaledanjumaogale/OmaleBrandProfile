import { j as head, e as ensure_array_like, k as spread_props, a as attr_class, f as stringify, b as attr, c as escape_html, h as derived } from "../../../chunks/index.js";
import { D as DashboardLayout } from "../../../chunks/DashboardLayout.js";
import { S as StatCard } from "../../../chunks/StatCard.js";
import "../../../chunks/convex.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let applications = [];
    let serviceRequests = [];
    let broadcastMsg = "";
    let metrics = derived(() => [
      {
        label: "Total Applicants 👥",
        value: applications.length.toString(),
        trend: "+12%",
        icon: "👥",
        color: "blue"
      },
      {
        label: "Service Requests 🛠️",
        value: serviceRequests.length.toString(),
        trend: "+5",
        icon: "📝",
        color: "teal"
      },
      {
        label: "Platform Health 🏥",
        value: "99.9%",
        trend: "STABLE",
        icon: "⚡",
        color: "gold"
      },
      {
        label: "Pending Apps 🛡️",
        value: applications.filter((a) => a.status === "pending").length.toString(),
        trend: "-5",
        icon: "📝",
        color: "gold"
      }
    ]);
    const alerts = [
      {
        type: "Critical 🚨",
        message: "New administrative access detected from unknown IP.",
        time: "2 mins ago"
      },
      {
        type: "Update 📢",
        message: "E-WIN Hub scheduled maintenance complete.",
        time: "1 hour ago"
      },
      {
        type: "Growth 🚀",
        message: "AkademyX reached 5,000 active students milestone!",
        time: "3 hours ago"
      }
    ];
    head("1jef3w8", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Admin Portal · E-WIN Project 🛡️</title>`);
      });
    });
    DashboardLayout($$renderer2, {
      title: "Admin Command Center 🛡️",
      isAdmin: true,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 reveal visible"><!--[-->`);
        const each_array = ensure_array_like(metrics());
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let metric = each_array[$$index];
          StatCard($$renderer3, spread_props([metric]));
        }
        $$renderer3.push(`<!--]--></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10"><div class="lg:col-span-3 bg-surface border border-border rounded-[var(--radius)] p-6 shadow-2xl reveal visible flex items-center justify-between gap-6"><div class="flex items-center gap-10"><div class="flex items-center gap-3"><span class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Maintenance Mode 🛡️</span> <button${attr_class(`w-12 h-6 rounded-full transition-all relative ${stringify("bg-muted/30")}`)}><span${attr_class(`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all ${stringify("translate-x-0")}`)}></span></button></div> <div class="flex items-center gap-3"><span class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">IAM Registration 🌍</span> <button${attr_class(`w-12 h-6 rounded-full transition-all relative ${stringify("bg-teal2")}`)}><span${attr_class(`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all ${stringify("translate-x-6")}`)}></span></button></div></div> <div class="flex-grow max-w-md flex items-center gap-3"><input type="text"${attr("value", broadcastMsg)} placeholder="Broadcast to all users... 📢" class="flex-grow bg-bg border border-border rounded-xl px-4 py-2 text-[12px] outline-none focus:border-gold"/> <button class="px-4 py-2 bg-gold text-bg text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gold2">Send 🚀</button></div></div> <div class="bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl reveal visible delay-100"><div class="p-6 border-b border-border bg-surface2/50 flex items-center justify-between"><h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">System Alerts 🚨</h3> <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span></div> <div class="p-6 space-y-4"><!--[-->`);
        const each_array_1 = ensure_array_like(alerts);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let alert = each_array_1[$$index_1];
          $$renderer3.push(`<div class="p-4 bg-bg border border-border rounded-xl hover:border-gold-line transition-all"><div class="flex justify-between mb-1"><span class="text-[10px] font-['Space_Mono'] tracking-widest text-gold uppercase">${escape_html(alert.type)}</span> <span class="text-[9px] text-muted">${escape_html(alert.time)}</span></div> <p class="text-[12px] text-text font-light">${escape_html(alert.message)}</p></div>`);
        }
        $$renderer3.push(`<!--]--></div></div> <div class="lg:col-span-2 bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl reveal visible delay-200"><div class="p-6 border-b border-border bg-surface2/50 flex items-center justify-between"><div class="flex gap-6 overflow-x-auto pb-2 scrollbar-hide"><button${attr_class(`font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap ${stringify("text-gold")}`)}>Requests 🛠️</button> <button${attr_class(`font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap ${stringify("text-muted hover:text-text")}`)}>IAM Apps 🌍</button> <button${attr_class(`font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap ${stringify("text-muted hover:text-text")}`)}>History 📦</button> <button${attr_class(`font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap ${stringify("text-muted hover:text-text")}`)}>Tasks 🎯</button> <button${attr_class(`font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap ${stringify("text-muted hover:text-text")}`)}>Audit Logs 📋</button> <button${attr_class(`font-['Bebas_Neue'] text-2xl tracking-widest transition-colors whitespace-nowrap ${stringify("text-muted hover:text-text")}`)}>Sessions 👥</button></div></div> <div class="p-6">`);
        {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div class="flex flex-col items-center justify-center py-20 gap-4"><div class="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div> <p class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Synchronizing Data...</p></div>`);
        }
        $$renderer3.push(`<!--]--></div></div></div> `);
        {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
  });
}
export {
  _page as default
};
