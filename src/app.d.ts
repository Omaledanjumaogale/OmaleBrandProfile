// See https://kit.svelte.dev/docs/types#app
import type { SessionPayload } from '$lib/server/session';

declare global {
	namespace App {
		interface Locals {
			user: SessionPayload | null;
		}
		interface Error {
			message: string;
			errorId?: string;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
