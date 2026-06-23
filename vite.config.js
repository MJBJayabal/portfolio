import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project site at https://mjbjayabal.github.io/portfolio/
// so the build must be rooted at /portfolio/. For local dev `base` is irrelevant.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
