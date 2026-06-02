import { ConvexClient } from "convex/browser";
import { env } from "$env/dynamic/public";

// ── Convex Client Singleton ──────────────────────────────────────────
let _client: ConvexClient | null = null;

function getConvexClient(): ConvexClient {
    if (_client) return _client;

    const convexUrl = env.PUBLIC_CONVEX_URL;
    if (!convexUrl || convexUrl.includes("placeholder")) {
        console.warn("[convex] Missing or invalid PUBLIC_CONVEX_URL. Backend features will be disabled.");
        _client = new Proxy({}, {
            get: (target, prop) => {
                return () => {
                    console.error(`[convex] Attempted to call ${String(prop)} but Convex is not configured.`);
                    return Promise.resolve(null);
                };
            }
        }) as ConvexClient;
    } else {
        _client = new ConvexClient(convexUrl);
    }
    return _client;
}

export const convex = new Proxy({}, {
    get(target, prop) {
        const client = getConvexClient();
        const value = Reflect.get(client, prop);
        if (typeof value === 'function') {
            return value.bind(client);
        }
        return value;
    }
}) as ConvexClient;

/**
 * Helper to get or create a persistent session ID for tracking
 * user interactions and analytics.
 */
export function getSessionId(): string {
    if (typeof window === 'undefined') return '';
    let sessionId = localStorage.getItem('omale_session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('omale_session_id', sessionId);
    }
    return sessionId;
}

export function getClientSessionContext() {
    return {
        sessionId: getSessionId(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
    };
}
