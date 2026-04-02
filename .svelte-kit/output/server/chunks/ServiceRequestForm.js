import { b as attr, e as ensure_array_like, c as escape_html } from "./index.js";
import "./convex.js";
function ServiceRequestForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let formData = {
      fullName: "",
      email: "",
      whatsappNumber: "",
      mobileNumber: "",
      address: "",
      stateOfResidence: "",
      lgaOfResidence: "",
      company: "",
      serviceType: "App Development 📱",
      description: "",
      budget: "",
      bestTimeToReach: "Morning (8AM - 12PM)",
      urgency: "Immediately ⚡",
      preferredCommunication: "WhatsApp 📱",
      needType: "Personal Need 👤"
    };
    let loading = false;
    const services = [
      "App Development 📱",
      "AI Consultancy 🤖",
      "Business Advisory 💼",
      "Academic Writing 🎓",
      "Corporate Writing ✍️",
      "Branding & Design 🎨",
      "Other"
    ];
    const timeSlots = [
      "Morning (8AM - 12PM)",
      "Afternoon (12PM - 4PM)",
      "Evening (4PM - 8PM)",
      "Anytime 🕒"
    ];
    const urgencyLevels = [
      "Immediately ⚡",
      "In 1 Day 🗓️",
      "In 3 Days ⏳",
      "In 1 Week 📅",
      "In 1 Month 🌙"
    ];
    const commMediums = [
      "WhatsApp 📱",
      "Email 📧",
      "Phone Call 📞",
      "Text Message 💬"
    ];
    const needTypes = ["Personal Need 👤", "Business Need 💼", "Official Need 🏛️"];
    $$renderer2.push(`<div class="w-full max-w-[600px] mx-auto relative overflow-hidden">`);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <form class="space-y-5"><div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><div class="space-y-2"><label for="fullName" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Full Name *</label> <input type="text" id="fullName"${attr("value", formData.fullName)} required="" placeholder="John Doe" class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"/></div> <div class="space-y-2"><label for="email" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Email Address *</label> <input type="email" id="email"${attr("value", formData.email)} required="" placeholder="john@example.com" class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"/></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><div class="space-y-2"><label for="whatsappNumber" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">WhatsApp Number *</label> <input type="tel" id="whatsappNumber"${attr("value", formData.whatsappNumber)} required="" placeholder="+234..." class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"/></div> <div class="space-y-2"><label for="mobileNumber" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Mobile Number *</label> <input type="tel" id="mobileNumber"${attr("value", formData.mobileNumber)} required="" placeholder="080..." class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"/></div></div> <div class="space-y-2"><label for="address" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Home/Office Address *</label> <input type="text" id="address"${attr("value", formData.address)} required="" placeholder="No. 123 Street Name..." class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"/></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><div class="space-y-2"><label for="stateOfResidence" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">State of Residence *</label> <input type="text" id="stateOfResidence"${attr("value", formData.stateOfResidence)} required="" placeholder="e.g. Lagos" class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"/></div> <div class="space-y-2"><label for="lgaOfResidence" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">LGA *</label> <input type="text" id="lgaOfResidence"${attr("value", formData.lgaOfResidence)} required="" placeholder="e.g. Ikeja" class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"/></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><div class="space-y-2"><label for="company" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Company (Optional)</label> <input type="text" id="company"${attr("value", formData.company)} placeholder="Acme Corp" class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"/></div> <div class="space-y-2"><label for="serviceType" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Service Category *</label> `);
    $$renderer2.select(
      {
        id: "serviceType",
        value: formData.serviceType,
        required: true,
        class: "w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors appearance-none"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(services);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let service = each_array[$$index];
          $$renderer3.option({ value: service }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(service)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><div class="space-y-2"><label for="urgency" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">When is this required? *</label> `);
    $$renderer2.select(
      {
        id: "urgency",
        value: formData.urgency,
        required: true,
        class: "w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors appearance-none"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(urgencyLevels);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let level = each_array_1[$$index_1];
          $$renderer3.option({ value: level }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(level)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="space-y-2"><label for="needType" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Type of Need *</label> `);
    $$renderer2.select(
      {
        id: "needType",
        value: formData.needType,
        required: true,
        class: "w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors appearance-none"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(needTypes);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let type = each_array_2[$$index_2];
          $$renderer3.option({ value: type }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(type)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><div class="space-y-2"><label for="bestTime" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Best Time to Reach You *</label> `);
    $$renderer2.select(
      {
        id: "bestTime",
        value: formData.bestTimeToReach,
        required: true,
        class: "w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors appearance-none"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_3 = ensure_array_like(timeSlots);
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let slot = each_array_3[$$index_3];
          $$renderer3.option({ value: slot }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(slot)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="space-y-2"><label for="preferredComm" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Preferred Medium *</label> `);
    $$renderer2.select(
      {
        id: "preferredComm",
        value: formData.preferredCommunication,
        required: true,
        class: "w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors appearance-none"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_4 = ensure_array_like(commMediums);
        for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
          let medium = each_array_4[$$index_4];
          $$renderer3.option({ value: medium }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(medium)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div class="space-y-2"><label for="budget" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted font-bold">Budget Estimate *</label> <input type="text" id="budget"${attr("value", formData.budget)} required="" placeholder="e.g. ₦500k - ₦1M" class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors"/></div> <div class="space-y-2"><label for="description" class="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-muted">Project Description *</label> <textarea id="description" required="" rows="4" placeholder="Tell me about your project, goals, and requirements..." class="w-full bg-bg border border-border rounded-lg px-4 py-3 text-[13px] focus:border-gold outline-none transition-colors resize-none">`);
    const $$body = escape_html(formData.description);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <button type="submit"${attr("disabled", loading, true)} class="w-full py-4 bg-gold text-bg text-[12px] font-bold tracking-[3px] uppercase rounded-xl hover:bg-gold2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`Submit Request 🚀`);
    }
    $$renderer2.push(`<!--]--></button></form></div>`);
  });
}
export {
  ServiceRequestForm as S
};
