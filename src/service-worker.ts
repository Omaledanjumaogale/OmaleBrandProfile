/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

/**
 * Real-time Push Notifications & PWA Support (service-worker.ts)
 * Successfully enables silent injection points bridging standard navigator.serviceWorker.register 
 * logic sequentially linking to PushManager for real-time market resolution deliveries.
 */

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
    async function addFilesToCache() {
        const cache = await caches.open(CACHE);
        await cache.addAll(ASSETS);
    }
    event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
    async function deleteOldCaches() {
        for (const key of await caches.keys()) {
            if (key !== CACHE) await caches.delete(key);
        }
    }
    event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    async function respond() {
        const url = new URL(event.request.url);
        const cache = await caches.open(CACHE);

        // Serve build artifacts from cache
        if (ASSETS.includes(url.pathname)) {
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) return cachedResponse;
        }

        // Network first for everything else
        try {
            const response = await fetch(event.request);
            if (response.status === 200) {
                cache.put(event.request, response.clone());
            }
            return response;
        } catch {
            return cache.match(event.request);
        }
    }

    event.respondWith(respond());
});

/**
 * Handle Push Notifications
 */
self.addEventListener('push', (event) => {
    const data = event.data?.json() ?? {};
    const title = data.title ?? 'E-WIN Platform Notification';
    const options = {
        body: data.body ?? 'You have a new update from the platform.',
        icon: '/favicon.svg',
        badge: '/icons/badge.png',
        data: data.url ?? '/'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * Handle Notification Clicks
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const urlToOpen = event.notification.data;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            for (let client of windowClients) {
                if (client.url === urlToOpen && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow(urlToOpen);
        })
    );
});
