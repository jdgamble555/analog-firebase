/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import analog from '@analogjs/platform';
import { resolve } from 'path';

const aliases = {
  '@lib': resolve(import.meta.dirname, './src/app/lib'),
  '@components': resolve(import.meta.dirname, './src/app/components')
};

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    alias: aliases,
    mainFields: ['module'],
  },
  optimizeDeps: {
    exclude: ['@angular-devkit/core'],
  },
  plugins: [analog({
    nitro: {
      preset: 'netlify',
      alias: aliases,
    },
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
});
