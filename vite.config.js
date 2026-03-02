import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'      // if not added already
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
