# Enterprise Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the root application and the `OmaleBrandProfile-1` variant into one enterprise-grade SvelteKit application with unified routing, PWA support, Firebase authentication, Convex-backed real-time workflows, admin surfaces, and integrated platform prototype discovery.

**Architecture:** Promote the richer `OmaleBrandProfile-1` application as the baseline for the active root app, then harden and reconcile it with the root repo’s assets, route expectations, and HTML platform artifacts. Keep the public experience, application workflows, and admin tooling inside one routed SvelteKit shell while treating legacy HTML files as integrated platform previews rather than separate apps.

**Tech Stack:** SvelteKit 2, Svelte 5, Tailwind CSS 4, Convex, Firebase Auth, Cloudflare Pages, Vite PWA plugin, TypeScript.

---

### Task 1: Baseline Consolidation

**Files:**
- Modify: `package.json`, `README.md`, `src/**`, `convex/**`, `static/**`, `src/app.css`, `src/app.html`, `src/hooks.server.ts`
- Reference: `OmaleBrandProfile-1/**`
- Keep: `E-WIN Platforms Artifacts/**`, `skill.md/**`, `docs/**`

- [ ] **Step 1: Promote the stronger app baseline into root**

Copy the enterprise-oriented root files from `OmaleBrandProfile-1` into the active root for:

```text
src/
convex/
static/
package.json
README.md
svelte.config.js
vite.config.ts
tsconfig.json
wrangler.jsonc
```

- [ ] **Step 2: Preserve non-app repo assets**

Do not overwrite:

```text
skill.md/
E-WIN Platforms Artifacts/
docs/
.git/
```

- [ ] **Step 3: Reinstall dependencies**

Run:

```bash
pnpm install
```

Expected:

```text
Lockfile updated for vite-plugin-pwa, workbox-window, sharp, and any enterprise baseline dependencies.
```

### Task 2: Type Safety and Runtime Repair

**Files:**
- Modify: `src/routes/+layout.svelte`
- Modify: `src/lib/components/ui/Tooltip.svelte`
- Modify: `src/lib/components/ui/Toast.svelte`
- Modify: `src/routes/services/+page.svelte`
- Modify: `src/routes/faq/+page.svelte`
- Modify: `src/routes/sitemap.xml/+server.ts`

- [ ] **Step 1: Fix `onMount` cleanup contract**

Ensure `onMount` is synchronous and moves async work into an inner function:

```ts
onMount(() => {
	let cleanup = () => {};

	const start = async () => {
		// async setup
		cleanup = () => {
			// teardown
		};
	};

	void start();
	return () => cleanup();
});
```

- [ ] **Step 2: Type tooltip positions**

Use an explicit union:

```ts
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
let { position = 'top' }: { position?: TooltipPosition } = $props();
```

- [ ] **Step 3: Point toast UI to the real toast store**

Replace stale `$ui` usage with the runes-backed `toast` store object and iterate directly over `toast.toasts`.

- [ ] **Step 4: Fix modal DOM typing**

Use `HTMLDialogElement` guards:

```ts
const modal = document.getElementById('service-modal');
if (modal instanceof HTMLDialogElement) modal.showModal();
```

- [ ] **Step 5: Fix sitemap route typing**

Use a typed page interface that includes `lastmod`:

```ts
type SitemapEntry = {
	loc: string;
	priority: string;
	changefreq: string;
	lastmod?: string;
};
```

### Task 3: Unified Platform Catalog

**Files:**
- Create: `src/lib/data/platforms.ts`
- Create: `src/routes/platforms/+page.svelte`
- Create: `src/routes/platforms/[slug]/+page.ts`
- Create: `src/routes/platforms/[slug]/+page.svelte`
- Modify: `src/lib/components/Ecosystem.svelte`
- Modify: `static/platforms/**`

- [ ] **Step 1: Centralize platform metadata**

Create a typed platform registry with:

```ts
export type PlatformRecord = {
	slug: string;
	name: string;
	category: string;
	description: string;
	status: 'live' | 'prototype' | 'internal';
	href: string;
	prototypePath?: string;
	external?: boolean;
};
```

- [ ] **Step 2: Replace direct HTML-link sprawl with app routes**

Point platform cards to:

```text
/platforms
/platforms/[slug]
```

instead of scattering visitors across standalone `.html` links.

- [ ] **Step 3: Build a routed platform explorer**

Each detail page should show:

```text
Overview
Category
Status
Capabilities
Prototype preview link
External/live destination when available
```

- [ ] **Step 4: Treat HTML files as integrated previews**

Legacy `.html` prototype files remain under `static/platforms/`, but the user enters them through the Svelte app via detail pages.

### Task 4: Enterprise Auth and RBAC Alignment

**Files:**
- Modify: `src/lib/firebase.ts`
- Modify: `src/lib/stores/auth.ts`
- Modify: `convex/schema.ts`
- Modify: `convex/functions.ts`
- Modify: `convex/admin.ts`
- Modify: `src/routes/admin/**`
- Modify: `src/routes/login/+page.svelte`

- [ ] **Step 1: Harden Firebase bootstrap**

Ensure the client degrades safely when env vars are missing and does not crash during SSR.

- [ ] **Step 2: Keep Convex user sync typed**

Replace stringly-typed mutation/query invocations with generated API references where possible.

- [ ] **Step 3: Expand role support**

Add an enterprise-ready role union:

```ts
v.union(
	v.literal("user"),
	v.literal("admin"),
	v.literal("auditor"),
	v.literal("superadmin")
)
```

- [ ] **Step 4: Remove hardcoded secrets from code**

Admin credentials and session secrets must only come from environment variables, with clear failure messaging if absent.

### Task 5: Public Workflow Hardening

**Files:**
- Modify: `src/lib/components/IAMApplicationForm.svelte`
- Modify: `src/lib/components/ServiceRequestForm.svelte`
- Modify: `convex/functions.ts`
- Modify: `convex/validators.ts`

- [ ] **Step 1: Reconcile form payloads with schema**

Ensure frontend fields match Convex mutation args exactly and remove dead fields or missing validators.

- [ ] **Step 2: Add shared sanitization and validation**

Move repeated checks into reusable helpers for:

```text
email validation
required string trimming
minimum lengths
safe optional fields
```

- [ ] **Step 3: Improve mutation responses**

Return structured success payloads rather than relying only on insert ids for enterprise UX flows.

### Task 6: PWA and App Shell Production Readiness

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Modify: `src/routes/+layout.svelte`
- Modify: `src/service-worker.ts`
- Modify: `static/manifest.webmanifest`
- Modify: `static/icons/**`

- [ ] **Step 1: Enable production PWA plugin configuration**

Include manifest, icons, service worker registration, and cache strategy aligned to the routed app.

- [ ] **Step 2: Keep registration non-blocking**

Service worker registration must not break first paint or SSR.

- [ ] **Step 3: Validate mobile responsiveness**

Keep:

```text
skip link
bottom nav
back-to-top
safe-area support
44px minimum touch targets
```

### Task 7: Verification and Regression Pass

**Files:**
- Verify: `src/**`, `convex/**`, `static/**`

- [ ] **Step 1: Run type checks**

Run:

```bash
pnpm check
```

Expected:

```text
0 errors
```

- [ ] **Step 2: Run production build**

Run:

```bash
pnpm build
```

Expected:

```text
vite build completes successfully
```

- [ ] **Step 3: Smoke-check key routes**

Verify:

```text
/
/apply
/services
/faq
/login
/admin/login
/platforms
/platforms/[slug]
```

- [ ] **Step 4: Commit after green verification**

```bash
git add .
git commit -m "feat: unify enterprise application baseline"
```
