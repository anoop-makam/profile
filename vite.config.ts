import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Root URLs for BrowserRouter (`/journey`, `/connect`). GitHub Pages
  // copies index.html to 404.html so those routes still resolve.
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 43180,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 43180,
    strictPort: true,
  },
})
