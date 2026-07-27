import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

const entry = {
	registry: resolve(__dirname, 'registry.ts'),
	'alert/index': resolve(__dirname, 'alert/index.ts'),
	'aurora/index': resolve(__dirname, 'aurora/index.ts'),
	'button/index': resolve(__dirname, 'button/index.ts'),
	'card/index': resolve(__dirname, 'card/index.ts'),
	'details/index': resolve(__dirname, 'details/index.ts'),
	'dots/index': resolve(__dirname, 'dots/index.ts'),
	'draggable/index': resolve(__dirname, 'draggable/index.ts'),
	'droppable/index': resolve(__dirname, 'droppable/index.ts'),
	'gallery/index': resolve(__dirname, 'gallery/index.ts'),
	'globe/index': resolve(__dirname, 'globe/index.ts'),
	'icon/index': resolve(__dirname, 'icon/index.ts'),
	'icon-selector/index': resolve(__dirname, 'icon-selector/index.ts'),
	'logo/index': resolve(__dirname, 'logo/index.ts'),
	'nav-menu/index': resolve(__dirname, 'nav-menu/index.ts'),
	'meteors/index': resolve(__dirname, 'meteors/index.ts'),
	'ripple/index': resolve(__dirname, 'ripple/index.ts'),
	'spinner/index': resolve(__dirname, 'spinner/index.ts'),
	'stat/index': resolve(__dirname, 'stat/index.ts'),
	'tabs/index': resolve(__dirname, 'tabs/index.ts'),
	'text/index': resolve(__dirname, 'text/index.ts'),
	'code-block/index': resolve(__dirname, 'code-block/index.ts'),
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
