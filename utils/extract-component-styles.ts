import type { Plugin } from 'vite';
import type { NormalizedOutputOptions, OutputBundle } from 'rollup';

export const extractComponentStyles = (): Plugin => {
  return {
    name: 'css-per-component',
    generateBundle(_options: NormalizedOutputOptions, bundle: OutputBundle) {
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk' || !chunk.isEntry) continue;

        // e.g. "button/index.js" -> "button"
        const match = fileName.match(/^([^/]+)\/index\.js$/);
        if (!match) continue;

        const componentName = match[1];

        // Vite annotates each chunk with the CSS assets it imports
        const importedCss: Set<string> | undefined = (chunk as any).viteMetadata
          ?.importedCss;
        if (!importedCss || importedCss.size === 0) continue;

        for (const cssFile of importedCss) {
          const cssChunk = bundle[cssFile];
          if (!cssChunk || cssChunk.type !== 'asset') continue;

          const newCssFileName = `${componentName}/${componentName}.css`;

          bundle[newCssFileName] = {
            ...cssChunk,
            fileName: newCssFileName,
            name: `${componentName}.css`,
          };

          delete bundle[cssFile];
        }
      }
    },
  };
};
