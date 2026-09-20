import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative asset URLs work both locally and on GitHub project Pages
  // (https://<user>.github.io/<repo>/).
  base: './',
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
