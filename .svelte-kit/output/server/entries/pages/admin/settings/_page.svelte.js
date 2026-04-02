import { D as DashboardLayout } from "../../../../chunks/DashboardLayout.js";
import "../../../../chunks/convex.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    DashboardLayout($$renderer2, {
      title: "System Settings ⚙️",
      isAdmin: true,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="max-w-3xl space-y-8"><div class="bg-surface border border-border rounded-[var(--radius)] overflow-hidden shadow-2xl"><div class="p-8 border-b border-border bg-surface2/50"><h3 class="font-['Bebas_Neue'] text-2xl tracking-widest text-text">Global Infrastructure 🏗️</h3> <p class="text-[11px] text-muted uppercase tracking-widest mt-1">Configure platform-wide behaviors.</p></div> <div class="p-8 space-y-10">`);
        {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<div class="py-10 text-center text-muted uppercase tracking-widest text-[10px]">Loading Settings...</div>`);
        }
        $$renderer3.push(`<!--]--></div></div> <div class="p-6 bg-gold/5 border border-gold/20 rounded-2xl flex items-start gap-4"><span class="text-2xl">🛡️</span> <div><h4 class="font-bold text-gold text-xs uppercase tracking-widest mb-1">Security Protocol</h4> <p class="text-[11px] text-muted leading-relaxed">All changes to system settings are logged in the audit trail. Critical modifications may require multi-factor authentication in future updates.</p></div></div></div>`);
      }
    });
  });
}
export {
  _page as default
};
