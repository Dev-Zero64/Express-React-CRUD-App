import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': '@vitejs/plugin-react'
    }
  },
  server: {
    port: 3000, // Define a porta padrão como 3000
  },
});