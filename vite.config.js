import { defineConfig } from 'vite';
import cssReloadPlugin from './.vitepress/plugins/lit-reload';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [cssReloadPlugin()]
});
