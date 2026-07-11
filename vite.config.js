import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /* Absolute base: relative './' broke hard loads on nested routes
     (/services/dot-exams, /blog/:slug) — assets resolved against the
     subdirectory and the SPA rewrite served index.html as JS. */
  base: '/',
})
