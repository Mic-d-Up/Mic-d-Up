import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: { outDir: path.join(__dirname, '..', 'public') },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3000/api',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
})