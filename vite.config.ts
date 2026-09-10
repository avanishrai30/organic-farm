import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: path.resolve(__dirname, './js'),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, './js/react-entry.tsx'),
      name: 'ReactApp',
      formats: ['iife'],
      fileName: () => 'react-app.js',
    },
    rollupOptions: {
      // Ensure React is bundled inside, do NOT externalize
      external: [],
    },
  },
});
