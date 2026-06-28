import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Base path must match the GitHub Pages repo name.
export default defineConfig({
  plugins: [vue()],
  base: '/Curriculum-Carlos-Gallardo/',
})
