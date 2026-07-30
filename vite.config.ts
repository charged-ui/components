import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

const entry = {
  registry: resolve(__dirname, 'src/registry.ts'),
  // primitives
  'alert/index': resolve(__dirname, 'src/primitives/alert/index.ts'),
  'button/index': resolve(__dirname, 'src/primitives/button/index.ts'),
  'card/index': resolve(__dirname, 'src/primitives/card/index.ts'),
  'details/index': resolve(__dirname, 'src/primitives/details/index.ts'),
  'dialog/index': resolve(__dirname, 'src/primitives/dialog/index.ts'),
  'icon/index': resolve(__dirname, 'src/primitives/icon/index.ts'),
  'menu/index': resolve(__dirname, 'src/primitives/menu/index.ts'),
  'nav-menu/index': resolve(__dirname, 'src/primitives/nav-menu/index.ts'),
  'tabs/index': resolve(__dirname, 'src/primitives/tabs/index.ts'),
  'text/index': resolve(__dirname, 'src/primitives/text/index.ts'),
  // backgrounds
  'aurora/index': resolve(__dirname, 'src/backgrounds/aurora/index.ts'),
  'dots/index': resolve(__dirname, 'src/backgrounds/dots/index.ts'),
  'meteors/index': resolve(__dirname, 'src/backgrounds/meteors/index.ts'),
  'ripple/index': resolve(__dirname, 'src/backgrounds/ripple/index.ts'),
  // utilities
  'code-block/index': resolve(__dirname, 'src/utilities/code-block/index.ts'),
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
