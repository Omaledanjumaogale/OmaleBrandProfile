import { ConvexClient } from "convex/browser";
import { env } from "$env/dynamic/public";

const CONVEX_URL = env.PUBLIC_CONVEX_URL;

// ── Convex Client Singleton ──────────────────────────────────────────
// We check for the presence of the URL. If missing, we don't initialize
// the real client to prevent "Couldn't parse deployment name" fatal errors.
function createConvexClient() {
    if (!CONVEX_URL || CONVEX_URL.includes("placeholder")) {
        console.warn("[convex] Missing or invalid PUBLIC_CONVEX_URL. Backend features will be disabled.");
        // Return a proxy that logs errors instead of crashing
        return new Proxy({}, {
            get: (target, prop) => {
                return () => {
                    console.error(`[convex] Attempted to call ${String(prop)} but Convex is not configured.`);
                    return Promise.resolve(null);
                };
            }
        }) as ConvexClient;
    }
    return new ConvexClient(CONVEX_URL);
}

export const convex = createConvexClient();

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
