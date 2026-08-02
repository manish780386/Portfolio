import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
   plugins: [
    tailwindcss(),react()],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react":  ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-router": ["react-router-dom"],
          "vendor-ui":     ["lucide-react"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
