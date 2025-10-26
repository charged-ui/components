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
				'button/index': resolve(__dirname, 'app/elements/button/index.ts'),
				'details/index': resolve(__dirname, 'app/elements/details/index.ts'),
				'icon/index': resolve(__dirname, 'app/elements/icon/index.ts'),
				'spinner/index': resolve(__dirname, 'app/elements/spinner/index.ts'),
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
