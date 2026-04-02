import { w as writable } from "./index2.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";
const PUBLIC_FIREBASE_API_KEY = "AIzaSyC1Em0ygfFxOr2Ir96u9wsun1J4jw2y1Dg";
const PUBLIC_FIREBASE_AUTH_DOMAIN = "ewinproject-6e400.firebaseapp.com";
const PUBLIC_FIREBASE_PROJECT_ID = "ewinproject-6e400";
const PUBLIC_FIREBASE_STORAGE_BUCKET = "ewinproject-6e400.firebasestorage.app";
const PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "278848886110";
const PUBLIC_FIREBASE_APP_ID = "1:278848886110:web:724071ac5a4cd1c734abcf";
const PUBLIC_FIREBASE_MEASUREMENT_ID = "G-GVLBS930QP";
const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID,
  measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
};
let app;
let auth;
if (typeof window !== "undefined" && firebaseConfig.apiKey) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
  } catch (e) {
    console.error("Firebase initialization failed:", e);
  }
}
const user = writable(null);
const loading = writable(true);
if (typeof window !== "undefined" && auth) {
  onAuthStateChanged(auth, (u) => {
    user.set(u);
    loading.set(false);
  });
} else if (typeof window !== "undefined") {
  loading.set(false);
}
export {
  user as u
};
