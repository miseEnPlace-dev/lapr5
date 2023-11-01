import path from 'path';

/** @type {import('vitest').UserConfig} */
export default {
  plugins: [],
  test: {
    globals: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
};
