import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/",
  build: {
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false, 
    cssCodeSplit: true, 

    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['framer-motion'],
          'ui-components': ['@tremor/react', 'lucide-react'],
        },
      },
    },
  },

  server: {
    port: 3000,
    strictPort: true,
  }
});