/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import analog from '@analogjs/platform';
import { resolve } from 'path';

const aliases = {
  '@lib': resolve(import.meta.dirname, './src/app/lib'),
  '@components': resolve(import.meta.dirname, './src/app/components')
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
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
      preset: 'netlify-edge',
      alias: aliases
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
      __FIREBASE_CONFIG__: JSON.stringify(env.VITE_FIREBASE_CONFIG ?? ''),
    },
  };
});
