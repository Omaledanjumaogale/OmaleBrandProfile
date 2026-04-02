import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { env } from "$env/dynamic/public";

const firebaseConfig = {
  apiKey: env.PUBLIC_FIREBASE_API_KEY,
  authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.PUBLIC_FIREBASE_APP_ID,
  measurementId: env.PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;

if (typeof window !== 'undefined' && firebaseConfig.apiKey) {
	try {
		app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
		auth = getAuth(app);
	} catch (e) {
		console.error("Firebase initialization failed:", e);
	}
}

export { auth };
export default app;
