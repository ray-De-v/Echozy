import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vitePrerender from 'vite-plugin-prerender'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerender({
      staticDir: 'dist',
      routes: ['/', '/login', '/about-prerender'],
    }),
  ],
})
