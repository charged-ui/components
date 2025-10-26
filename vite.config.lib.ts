import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

// Plugin to extract and deduplicate CSS properties
const extractBaseStylesPlugin = () => {
	return {
		name: 'extract-base-styles',
		generateBundle(options, bundle) {
			const propertyDefinitions = new Set();
			const componentStyles = new Map();

			// First pass: collect all CSS content and separate properties from styles
			for (const [fileName, chunk] of Object.entries(bundle)) {
				if (fileName.endsWith('.css') && chunk.type === 'asset') {
					const css = chunk.source.toString();
					const styles = [];

					// Split by @property rules and component rules
					const parts = css.split(/(?=@property|ui-)/);

					for (const part of parts) {
						if (part.trim()) {
							if (part.includes('@property')) {
								// This is a property definition
								propertyDefinitions.add(part.trim());
							} else if (part.includes('ui-')) {
								// This is a component style
								styles.push(part.trim());
							}
						}
					}

					// Store component styles
					if (styles.length > 0) {
						componentStyles.set(fileName, styles.join('\n'));
					}
				}
			}

			// Second pass: create base.css with all property definitions
			if (propertyDefinitions.size > 0) {
				const baseContent = `/*! @charged/ui base styles */\n${Array.from(propertyDefinitions).join('\n')}`;
				bundle['base.css'] = {
					fileName: 'base.css',
					name: 'base.css',
					source: baseContent,
					type: 'asset',
					needsCodeReference: false,
				};
			}

			// Third pass: update component CSS files with their styles (without properties)
			for (const [fileName, styles] of componentStyles) {
				if (bundle[fileName]) {
					bundle[fileName].source = styles;
				}
			}
		},
	};
};

// Your existing cssPerComponentPlugin...
const cssPerComponentPlugin = () => {
	return {
		name: 'css-per-component',
		generateBundle(options, bundle) {
			// Track CSS files and their imports
			const cssFiles = {};

			// First pass: identify CSS files and their sources
			for (const [fileName, chunk] of Object.entries(bundle)) {
				if (fileName.endsWith('.css') && chunk.type === 'asset') {
					// Store CSS content
					cssFiles[fileName] = chunk.source;
				}
			}

			// Second pass: redistribute CSS to component folders
			for (const [fileName, chunk] of Object.entries(bundle)) {
				if (fileName.endsWith('.js') && chunk.type === 'chunk') {
					// Check which component this JS file belongs to
					const componentMatch = fileName.match(
						/^(alert|button|details|text|icon|spinner)\/index\.js$/
					);
					if (componentMatch) {
						const componentName = componentMatch[1];

						// Find CSS that imports this component's styles
						for (const [cssFileName, cssContent] of Object.entries(cssFiles)) {
							if (cssContent.includes(`ui-${componentName}`)) {
								// Create new CSS file in component directory
								const newCssFileName = `${componentName}/${componentName}.css`;
								bundle[newCssFileName] = {
									fileName: newCssFileName,
									name: `${componentName}.css`,
									source: cssContent,
									type: 'asset',
									needsCodeReference: false,
								};

								// Remove the original CSS file
								delete bundle[cssFileName];
							}
						}
					}
				}
			}
		},
	};
};

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
	plugins: [
		tailwindcss(),
		cssPerComponentPlugin(),
		extractBaseStylesPlugin(), // This runs after component plugin
	],
});
