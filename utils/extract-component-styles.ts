import type { Plugin } from 'vite';
import type { NormalizedOutputOptions, OutputBundle } from 'rollup';

export const extractComponentStyles = (): Plugin => {
	return {
		name: 'css-per-component',
		generateBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
			// Track CSS files and their imports
			const cssFiles: Record<string, string> = {};

			// First pass: identify CSS files and their sources
			for (const [fileName, chunk] of Object.entries(bundle)) {
				if (fileName.endsWith('.css') && chunk.type === 'asset') {
					// Store CSS content
					cssFiles[fileName] = chunk.source.toString();
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
