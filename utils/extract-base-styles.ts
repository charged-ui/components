import type { Plugin } from 'vite';
import type { NormalizedOutputOptions, OutputBundle } from 'rollup';

export const extractBaseStyles = (): Plugin => {
	return {
		name: 'extract-base-styles',
		generateBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
			const propertyDefinitions = new Set<string>();
			const componentStyles = new Map<string, string>();

			// First pass: collect all CSS content and separate properties from styles
			for (const [fileName, chunk] of Object.entries(bundle)) {
				if (fileName.endsWith('.css') && chunk.type === 'asset') {
					const css = chunk.source.toString();
					const styles: string[] = [];

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
				};
			}

			// Third pass: update component CSS files with their styles (without properties)
			for (const [fileName, styles] of componentStyles) {
				const chunk = bundle[fileName];
				if (chunk && chunk.type === 'asset') {
					chunk.source = styles;
				}
			}
		},
	};
};
