import { j as head, e as ensure_array_like, k as spread_props, c as escape_html, h as derived } from "../../../chunks/index.js";
import { D as DashboardLayout } from "../../../chunks/DashboardLayout.js";
import { S as StatCard } from "../../../chunks/StatCard.js";
import "../../../chunks/convex.js";
import "../../../chunks/auth.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tasks = [];
    let broadcasts = [];
    let metrics = derived(() => [
      {
        label: "Active Tasks 🎯",
        value: tasks.filter((t) => t.status !== "completed").length.toString(),
        trend: "ASSIGNED",
        icon: "🎯",
        color: "gold"
      },
      {
        label: "Completed 🏆",
        value: tasks.filter((t) => t.status === "completed").length.toString(),
        trend: "TOTAL",
        icon: "🏆",
        color: "teal"
      },
      {
        label: "Trust Score 🛡️",
        value: "98%",
        trend: "ELITE",
        icon: "🛡️",
        color: "blue"
      },
      {
        label: "Earnings 💰",
        value: "₦0.00",
        trend: "PENDING",
        icon: "💰",
        color: "gold"
      }
    ]);
    head("x1i5gj", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>IAM Member Dashboard · E-WIN Project 🌍</title>`);
      });
    });
    DashboardLayout($$renderer2, {
      title: "Member Command Center 🌍",
      isAdmin: false,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 reveal visible"><!--[-->`);
        const each_array = ensure_array_like(metrics());
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let metric = each_array[$$index];
          StatCard($$renderer3, spread_props([metric]));
        }
        $$renderer3.push(`<!--]--></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10"><div class="bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl reveal visible delay-100"><div class="p-6 border-b border-border bg-surface2/50 flex items-center justify-between"><h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">Broadcasts 📢</h3> <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span></div> <div class="p-6 space-y-4">`);
        if (broadcasts.length === 0) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<p class="text-center py-10 text-muted text-[12px]">No broadcasts yet.</p>`);
        } else {
          $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(broadcasts);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let b = each_array_1[$$index_1];
            $$renderer3.push(`<div class="p-4 bg-bg border border-border rounded-xl hover:border-gold-line transition-all"><div class="flex justify-between mb-1"><span class="text-[10px] font-['Space_Mono'] tracking-widest text-gold uppercase">${escape_html(b.sender)}</span> <span class="text-[9px] text-muted">${escape_html(new Date(b.timestamp).toLocaleDateString())}</span></div> <p class="text-[12px] text-text font-light">${escape_html(b.message)}</p></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></div></div> <div class="lg:col-span-2 bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl reveal visible delay-200"><div class="p-6 border-b border-border bg-surface2/50"><h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">Assigned Strategic Tasks 🎯</h3></div> <div class="p-6">`);
        {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div class="flex flex-col items-center justify-center py-20 gap-4"><div class="w-8 h-8 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div> <p class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Synchronizing Tasks...</p></div>`);
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
