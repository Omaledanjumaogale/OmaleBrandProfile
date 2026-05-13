// See https://kit.svelte.dev/docs/types#app

declare global {
	namespace App {
		interface Error {
			message: string;
			errorId?: string;
		}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
