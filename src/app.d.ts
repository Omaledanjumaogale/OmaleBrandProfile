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
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
