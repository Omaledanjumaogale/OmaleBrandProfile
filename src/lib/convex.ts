import { ConvexClient } from "convex/browser";
import { env } from "$env/dynamic/public";

const CONVEX_URL = env.PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud";

export const convex = new ConvexClient(CONVEX_URL);

// Helper to get or create a session ID for tracking
export function getSessionId(): string {
    if (typeof window === 'undefined') return '';
    let sessionId = localStorage.getItem('omale_session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('omale_session_id', sessionId);
    }
    return sessionId;
}
