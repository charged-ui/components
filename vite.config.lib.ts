import { defineConfig } from 'vite';
import { resolve } from 'path';

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
			external: [
				'lit',
				'lit/decorators.js',
				'lit/directives/unsafe-html.js',
				'motion',
				'motion/mini',
			],
			output: {
				preserveModules: true,
				preserveModulesRoot: 'app/elements',
				entryFileNames: '[name].js',
			},
		},
	},
});
