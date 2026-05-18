import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	server: {
		fs: {
			allow: [
				// Search up for workspace root
				searchForWorkspaceRoot(process.cwd()),
				// Explicitly allow convex directory
				'./convex'
			]
		}
	},
	plugins: [
		tailwindcss(),
		sveltekit(),
		VitePWA({
			// Cloudflare Pages compatibility — generates sw.js in build output
			strategies: 'generateSW',
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			manifest: false, // We use our own static/manifest.webmanifest
			workbox: {
				// Cache app shell
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
				// Network-first for API calls, cache-first for assets
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
						}
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'gstatic-fonts-cache',
							expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 }
						}
					},
					{
						// Never cache Convex API calls — always network first
						urlPattern: /^https:\/\/.*\.convex\.cloud\/.*/i,
						handler: 'NetworkOnly'
					},
					{
						// Never cache Firebase Auth — always network first
						urlPattern: /^https:\/\/.*\.firebaseapp\.com\/.*/i,
						handler: 'NetworkOnly'
					}
				],
				// Skip waiting to activate new SW immediately
				skipWaiting: true,
				clientsClaim: true,
				// Ignore 404s to prevent stale cache hijacking
				navigateFallback: null
			}
		})
	],
	build: {
		// Optimize build for enterprise scale
		target: 'esnext',
		minify: 'esbuild',
		reportCompressedSize: false,
		chunkSizeWarningLimit: 1000
	}
});
