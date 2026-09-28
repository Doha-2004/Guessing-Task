import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local-dev-only workaround: the deployed backend doesn't currently send
// CORS headers, so the browser blocks direct requests from
// http://localhost:5173. Proxying /api/* through Vite's own dev server
// avoids that (the request leaves from Node, not the browser), so you can
// keep testing the frontend locally while the real fix — the backend
// adding Access-Control-Allow-Origin for this origin — gets sorted out.
// This proxy ONLY exists in `npm run dev`; it has no effect on
// `npm run build` / production, so the backend CORS fix is still required
// for the deployed frontend to work.
const BACKEND_URL = 'https://guessing-task-api.runasp.net'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: true,
        cookieDomainRewrite: 'localhost',
      },
    },
  },
})