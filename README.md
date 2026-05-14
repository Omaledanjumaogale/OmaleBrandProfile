# OmaleBrandProfile 🏢

Enterprise-grade personal branding and workforce innovation platform for **Danjuma Omale-Ogale**.

## Tech Stack 🚀

- **Framework**: SvelteKit 5 (Svelte 5) with Runes
- **Styling**: Tailwind CSS v4
- **Backend**: Hardened Convex Infrastructure
- **Auth**: Firebase Authentication with ACID-compliant session tracking
- **Push**: Real-time Web Push Notifications via Service Worker
- **Deployment**: Cloudflare Pages

## Core Infrastructure Hardening (Convex) 🛡️

- **Token-Bucket Rate Limiter**: Sophisticated ACID-compliant logic gating generic reads and critical writes to prevent API abuse.
- **Distributed Session Bindings**: Robust tracking logic tying heartbeat signals to client lifecycles mapping closely against Firebase UIDs.
- **Continuous Zod Validation**: 100% type-safe edge validators guaranteeing schema enforcement prior to database modification.
- **Zero-Latency Lifecycle Triggers**: Emulated SQL row-level auditing triggers for high-sensitivity operations tracking.
- **Autonomous Garbage Collection**: Auto-purging mechanics rigorously deleting obsolete sessions to prevent DB bloat.

## UI/UX Upgrades (Svelte 5) ✨

- **Global Reactive Toasts**: Unified notification system using Svelte 5 Runes, replacing redundant HTML blocks for clean user feedback.
- **Informational Tooltips**: Premium trailing tooltip mechanic with knowledge icons systematically injected across the Dashboard.
- **Progressive Web Push**: Fully functional PWA hooks linking navigator.serviceWorker to PushManager for real-time market resolution deliveries.
- **AEO/GEO Optimization**: Advanced metadata architecture with JSON-LD @graph schemas, `llms.txt` indexing, and dynamic sitemap generation for AI search discovery.

## Super Admin Command Center (v2.0) 🕹️

- **Real-Time System Broadcasts**: Instant global notification deployment via Convex WebSockets, enabling emergency alerts and maintenance schedules.
- **Enterprise Audit Logging**: High-fidelity forensic trail of all administrative actions, from credential verification to system-wide transmissions.
- **Advanced Data Management**: Modular dashboards for managing I-AM applications, service requests, and task boards with zero-latency updates.
- **Secure Session Gating**: Triple-layer authentication combining Firebase, Convex environment secrets, and cryptographic session signing.
- **WCAG 2.2 AA+ Compliance**: Systematically remediated all administrative routes for perfect accessibility, including ARIA semantic roles, keyboard-navigable tooltips, and screen-reader optimized interfaces.
- **Enterprise Build Hardening**: Optimized Vite/SvelteKit compilation pipeline for Cloudflare Edge, resolving complex module resolution issues and ensuring 100% build reliability.

## Getting Started 🏗️

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Environment Setup**:
   Create a `.env.local` file with your Convex and Firebase credentials.

3. **Development**:
   ```bash
   pnpm dev
   ```

4. **Build**:
   ```bash
   pnpm build
   ```

---
© 2026 Danjuma Omale-Ogale · E-WIN Project. Built for Impact. 🌍
