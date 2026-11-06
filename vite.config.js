import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-ht-${Date.now()}.js`,
        chunkFileNames: `assets/[name]-ht-${Date.now()}.js`,
        assetFileNames: `assets/[name]-ht-${Date.now()}.[ext]`
      }
    }
  }
})
