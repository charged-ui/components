import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import glob from 'glob';
import path from 'path';

// Get all component files in the src/components directory
const componentFiles = glob.sync('src/**/*.ts');

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
    plugins: [resolve(), typescript({ tsconfig: './tsconfig.json' }), terser()]
  };
});

export default configs;
