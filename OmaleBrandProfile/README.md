# OmaleBrandProfile 🏢

Enterprise-grade personal branding and workforce innovation platform for **Danjuma Omale-Ogale**.

## Tech Stack 🚀

- **Framework**: SvelteKit 5 (Svelte 5)
- **Styling**: Tailwind CSS v4
- **Backend**: Convex (Real-time DB & Functions)
- **Auth**: Firebase Authentication
- **Deployment**: Cloudflare Pages
- **Icons**: Colorful Emoji-based Icons ✨

## Features 🛠️

- **Elite Landing Page**: High-performance, SEO-optimized personal brand portal.
- **E-WIN Ecosystem**: Integration with 6 core platforms (E-Deals, AkademyX, DealxHire, etc.).
- **User Dashboard**: Secure portal for workforce participants to track earnings and projects.
- **Admin Command Center**: Advanced infrastructure management and system audit tools.
- **Mobile Responsive**: 100% responsive design with global anti-overflow protection.

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

## Architecture 🏗️

The application follows a modular architecture:
- `src/lib/components`: Reusable UI components (Hero, Ticker, etc.)
- `src/lib/components/dashboard`: Dashboard-specific layouts and cards
- `src/lib/stores`: Svelte stores for Auth and Global State
- `convex/`: Backend schema and serverless functions
- `src/routes/`: File-based routing for Landing, Dashboards, and Portals

---
© 2026 Danjuma Omale-Ogale · E-WIN Project. Built for Impact. 🌍
