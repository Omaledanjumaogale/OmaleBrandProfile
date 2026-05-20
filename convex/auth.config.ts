import type { AuthConfig } from "convex/server";

const firebaseProjectId = process.env.PUBLIC_FIREBASE_PROJECT_ID;

if (!firebaseProjectId) {
	throw new Error("PUBLIC_FIREBASE_PROJECT_ID must be set for Convex auth.");
}

export default {
	providers: [
		{
			domain: `https://securetoken.google.com/${firebaseProjectId}`,
			applicationID: firebaseProjectId,
		},
	],
} satisfies AuthConfig;
