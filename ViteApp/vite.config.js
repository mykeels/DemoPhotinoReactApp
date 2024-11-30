import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

// Load env file based on mode
const env = loadEnv(process.env.NODE_ENV, process.cwd(), '')
process.env = { ...process.env, ...env }

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true
  },
  server: {
    port: Number(process.env.PORT) || 3456
  }
})
