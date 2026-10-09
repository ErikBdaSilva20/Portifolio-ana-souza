import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

function generateFirebaseSW(env, root) {
  const required = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
  ]
  const missing = required.filter((k) => !env[k])
  if (missing.length > 0) {
    throw new Error(`[vite] Variáveis ausentes para gerar o SW: ${missing.join(', ')}`)
  }

  const template = readFileSync(resolve(root, 'src/lib/firebase-messaging-sw.template.js'), 'utf-8')
  const sw = template
    .replace('__VITE_FIREBASE_API_KEY__', env.VITE_FIREBASE_API_KEY)
    .replace('__VITE_FIREBASE_AUTH_DOMAIN__', env.VITE_FIREBASE_AUTH_DOMAIN ?? '')
    .replace('__VITE_FIREBASE_PROJECT_ID__', env.VITE_FIREBASE_PROJECT_ID)
    .replace('__VITE_FIREBASE_STORAGE_BUCKET__', env.VITE_FIREBASE_STORAGE_BUCKET ?? '')
    .replace('__VITE_FIREBASE_MESSAGING_SENDER_ID__', env.VITE_FIREBASE_MESSAGING_SENDER_ID)
    .replace('__VITE_FIREBASE_APP_ID__', env.VITE_FIREBASE_APP_ID)
  writeFileSync(resolve(root, 'public/firebase-messaging-sw.js'), sw)
}

const root = new URL('.', import.meta.url).pathname

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, 'VITE_')

  return {
    plugins: [
      react(),
      {
        name: 'firebase-sw',
        buildStart() { generateFirebaseSW(env, root) },
        configureServer() { generateFirebaseSW(env, root) },
      },
    ],
  }
})
