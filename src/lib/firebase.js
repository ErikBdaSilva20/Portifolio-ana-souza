
import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredKeys = ["apiKey", "projectId", "messagingSenderId", "appId"];
const missingKeys = requiredKeys.filter((k) => !firebaseConfig[k]);
if (missingKeys.length > 0) {
  throw new Error(`[Firebase] Variáveis de ambiente ausentes: ${missingKeys.join(", ")}. Verifique o arquivo .env`);
}

const app = initializeApp(firebaseConfig);

export { app };

export async function getFirebaseMessaging() {
  if (typeof window === "undefined") return null;

  const supported = await isSupported();
  if (!supported) return null;

  return getMessaging(app);
}

export async function sendTokenToSheet(token) {
  const url = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL
  if (!url) return
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ token }),
    })
  } catch {
    // silencioso — envio de token é best-effort
  }
}

export async function getFCMToken() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const messaging = await getFirebaseMessaging();
  if (!messaging) return null;

  const swRegistration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js"
  );

  const { getToken } = await import("firebase/messaging");

  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });
    return token || null;
  } catch {
    return null;
  }
}
