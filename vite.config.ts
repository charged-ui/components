import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

const entry = {
  registry: resolve(__dirname, 'registry.ts'),
  // primitives
  'alert/index': resolve(__dirname, 'primitives/alert/index.ts'),
  'button/index': resolve(__dirname, 'primitives/button/index.ts'),
  'card/index': resolve(__dirname, 'primitives/card/index.ts'),
  'details/index': resolve(__dirname, 'primitives/details/index.ts'),
  'icon/index': resolve(__dirname, 'primitives/icon/index.ts'),
  'logo/index': resolve(__dirname, 'primitives/logo/index.ts'),
  'nav-menu/index': resolve(__dirname, 'primitives/nav-menu/index.ts'),
  'spinner/index': resolve(__dirname, 'primitives/spinner/index.ts'),
  'tabs/index': resolve(__dirname, 'primitives/tabs/index.ts'),
  'text/index': resolve(__dirname, 'primitives/text/index.ts'),
  // backgrounds
  'aurora/index': resolve(__dirname, 'backgrounds/aurora/index.ts'),
  'dots/index': resolve(__dirname, 'backgrounds/dots/index.ts'),
  'meteors/index': resolve(__dirname, 'backgrounds/meteors/index.ts'),
  'ripple/index': resolve(__dirname, 'backgrounds/ripple/index.ts'),
};

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    minify: true,
    lib: {
      entry,
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: [],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
      },
    },
    cssCodeSplit: true,
  },
  plugins: [tailwindcss()],
});
