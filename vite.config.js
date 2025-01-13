import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],

  server: {
    proxy: {
      '/api': {
        target: 'http://43.201.37.36:8080',
        changeOrigin: true,
        ws: false,
      },
      '/greenp': {
        target: 'https://api.greenp.kr',
        changeOrigin: true,
        ws: false,
        rewrite: (path) => path.replace(/^\/greenp/, '')
      }
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },  
});
