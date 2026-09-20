/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { resolve } from 'path';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    alias: {
      '@services': resolve(import.meta.dirname, './src/app/services'),
      '@components': resolve(import.meta.dirname, './src/app/components')
    },
    mainFields: ['module'],
  },
  optimizeDeps: {
    exclude: ['@angular-devkit/core'],
  },
  plugins: [analog({
    nitro: {
      preset: 'netlify-edge'
    }
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
