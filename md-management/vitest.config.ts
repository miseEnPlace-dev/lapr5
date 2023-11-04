import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    coverage: {
      exclude: ['src/loaders/**', 'src/core/**', 'src/repos/**']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
