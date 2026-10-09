
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
  if (!url) {
    console.warn('[FCM] VITE_GOOGLE_APPS_SCRIPT_URL não configurada — token não enviado')
    return
  }
  try {
    console.log('[FCM] Enviando token para a planilha...')
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ token }),
    })
    console.log('[FCM] Token enviado para a planilha')
  } catch (err) {
    console.error('[FCM] Erro ao enviar token para a planilha:', err)
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
  console.log("[FCM] SW registrado:", swRegistration.scope, "| estado:", swRegistration.active?.state ?? "instalando");

  const { getToken } = await import("firebase/messaging");
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
  };
  const missing = Object.entries(config).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length > 0) console.warn("[FCM] Variáveis ausentes:", missing);
  else console.log("[FCM] Todas as chaves presentes:", Object.keys(config).join(", "));

  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });
    console.log('[FCM] getToken resultado:', token || 'vazio');
    return token;
  } catch (err) {
    console.error('[FCM] getToken erro:', err);
    return null;
  }
}
