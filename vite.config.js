// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // bus‐arrival endpoint
      '/bus-arrival': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      // bus‐duration & any other /api routes
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
