import { writable } from 'svelte/store';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '$lib/services/firebase';

export const user = writable<User | null>(null);
export const loading = writable(true);
export { auth };

if (typeof window !== 'undefined' && auth) {
	onAuthStateChanged(auth, (u) => {
		user.set(u);
		loading.set(false);
	});
} else if (typeof window !== 'undefined') {
	loading.set(false);
}
