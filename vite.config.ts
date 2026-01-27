import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   base: '/drugnaco/',
   build: {
    // บังคับให้ output ไปอยู่นอก project
    outDir: '../drugnaco',
    emptyOutDir: true
  }
})
