import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/e-commerce-uas/",
  plugins: [react()],
  server: {
    host: true, // Listen on all addresses
    port: 5173, // Default port
    open: true, // Auto open browser
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
})