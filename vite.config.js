import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],

  server: {
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:8080',
        target: 'http://43.201.37.36:8080',
        changeOrigin: true,
        ws: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },  
});
