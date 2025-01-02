import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://43.201.37.36:8080',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
        ws: true,
      },
    },
  },
});
