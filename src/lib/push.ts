import { api } from '$convex/_generated/api';
import { convex, getClientSessionContext } from './convex';

type PushPublicKeyResponse = {
	publicKey: string;
};

function urlBase64ToUint8Array(base64String: string) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

async function getPublicPushKey() {
	const response = await fetch('/api/push/public-key');
	if (!response.ok) {
		const payload = (await response.json().catch(() => ({}))) as { error?: string };
		throw new Error(payload.error ?? 'Push key is not available.');
	}
	const payload = (await response.json()) as PushPublicKeyResponse;
	if (!payload.publicKey) {
		throw new Error('Push public key is not configured.');
	}
	return payload.publicKey;
}

export async function subscribeToPush() {
	if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
		throw new Error('This browser does not support push notifications.');
	}

	const registration = await navigator.serviceWorker.ready;
	const publicKey = await getPublicPushKey();
	let subscription = await registration.pushManager.getSubscription();

	if (!subscription) {
		subscription = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(publicKey)
		});
	}

	await convex.mutation(api.functions.upsertPushSubscription, {
		subscription: subscription.toJSON() as {
			endpoint: string;
			keys: { p256dh: string; auth: string };
			expirationTime?: number | null;
		},
		...getClientSessionContext()
	});

	return subscription;
}

export async function unsubscribeFromPush() {
	if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
		return false;
	}

	const registration = await navigator.serviceWorker.ready;
	const subscription = await registration.pushManager.getSubscription();
	if (!subscription) {
		return false;
	}

	await convex.mutation(api.functions.removePushSubscription, {
		endpoint: subscription.endpoint
	});

	await subscription.unsubscribe();
	return true;
}
