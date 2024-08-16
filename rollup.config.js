import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import glob from 'glob';
import path from 'path';
import fs from 'fs';

function cssToString() {
  return {
    name: 'css-to-string',
    transform(code, id) {
      if (id.endsWith('.css')) {
        const cssContent = fs.readFileSync(id, 'utf8');
        return {
          code: `export default ${JSON.stringify(cssContent)};`,
          map: { mappings: '' } // No need for source maps for CSS strings
        };
      }
      return null;
    }
  };
}

// Get all component files in the src/components directory
const componentFiles = glob.sync('src/components/**/*.ts');

const configs = componentFiles.map((file) => {
  const fileName = path.basename(file, path.extname(file));
  return {
    input: file,
    external: ['lit'],
    output: {
      file: `dist/${fileName}.js`,
      format: 'umd',
      name: fileName,
      globals: {
        lit: 'lit'
      }
    },
    plugins: [
      resolve(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      postcss({
        extract: false, // Do not extract CSS into separate file
        inject: false, // Inject CSS into HTML
        minimize: true // Minify CSS
      }),
      url({
        include: ['**/*.css'],
        limit: Infinity, // Handle all files regardless of size
        emitFiles: false, // Prevent the plugin from emitting files
        namedExports: false // Ensure CSS imports are treated as strings
      })
    ]
  };
});

export default configs;
