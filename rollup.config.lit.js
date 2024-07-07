import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'node_modules/lit/index.js',
  output: {
    file: 'dist/lit.js',
    format: 'umd',
    name: 'lit'
  },
  plugins: [resolve(), terser()]
};
