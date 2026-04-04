import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import { extractBaseStyles } from './utils/extract-base-styles';
import { extractComponentStyles } from './utils/extract-component-styles';

export default defineConfig({
	build: {
		lib: {
			entry: {
				index: resolve(__dirname, 'app/elements/index.ts'),
				'alert/index': resolve(__dirname, 'app/elements/alert/index.ts'),
				'aurora/index': resolve(__dirname, 'app/elements/aurora/index.ts'),
				'button/index': resolve(__dirname, 'app/elements/button/index.ts'),
				'card/index': resolve(__dirname, 'app/elements/card/index.ts'),
				'details/index': resolve(__dirname, 'app/elements/details/index.ts'),
				'dots/index': resolve(__dirname, 'app/elements/dots/index.ts'),
				'draggable/index': resolve(__dirname, 'app/elements/draggable/index.ts'),
				'droppable/index': resolve(__dirname, 'app/elements/droppable/index.ts'),
				'globe/index': resolve(__dirname, 'app/elements/globe/index.ts'),
				'icon/index': resolve(__dirname, 'app/elements/icon/index.ts'),
				'icon-selector/index': resolve(__dirname, 'app/elements/icon-selector/index.ts'),
				'meteors/index': resolve(__dirname, 'app/elements/meteors/index.ts'),
				'ripple/index': resolve(__dirname, 'app/elements/ripple/index.ts'),
				'spinner/index': resolve(__dirname, 'app/elements/spinner/index.ts'),
				'stat/index': resolve(__dirname, 'app/elements/stat/index.ts'),
				'text/index': resolve(__dirname, 'app/elements/text/index.ts'),
			},
			formats: ['es'],
		},
		outDir: 'dist',
		rollupOptions: {
			external: [],
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: (chunkInfo) => {
					if (chunkInfo.name === 'cobe') return 'cobe.js';
					if (chunkInfo.name === 'motion') return 'motion.js';
					if (chunkInfo.name === 'vendor') return 'vendor.js';
					return '[name].js';
				},
				manualChunks: (id) => {
					if (id.includes('node_modules/lit')) {
						return 'vendor/lit';
					}
					if (id.includes('node_modules/motion')) {
						return 'vendor/motion';
					}
				},
			},
		},
		cssCodeSplit: true,
	},
	plugins: [tailwindcss(), extractComponentStyles(), extractBaseStyles()],
});
