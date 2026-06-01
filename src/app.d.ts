import type { PublicRuntimeFlags } from '$lib/server/platformRuntime';

// See https://kit.svelte.dev/docs/types#app

declare global {
	namespace App {
		interface Error {
			message: string;
			errorId?: string;
		}
		interface Locals {
			runtimeFlags: PublicRuntimeFlags;
		}
		// Cloudflare Workers environment bindings
		// All vars set in Cloudflare Pages dashboard are accessible via event.platform.env
		interface Platform {
			env: Record<string, string | undefined>;
			context: {
				waitUntil(promise: Promise<unknown>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
