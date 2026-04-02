import { writable } from 'svelte/store';

export const isServiceModalOpen = writable(false);

export function openServiceModal() {
	isServiceModalOpen.set(true);
}

export function closeServiceModal() {
	isServiceModalOpen.set(false);
}
