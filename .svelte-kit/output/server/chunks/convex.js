import { ConvexClient } from "convex/browser";
import { p as public_env } from "./shared-server.js";
const CONVEX_URL = public_env.PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud";
new ConvexClient(CONVEX_URL);
function getSessionId() {
  if (typeof window === "undefined") return "";
  let sessionId = localStorage.getItem("ewin_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("ewin_session_id", sessionId);
  }
  return sessionId;
}
export {
  getSessionId as g
};
