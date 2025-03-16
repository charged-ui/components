import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import fs, { readdirSync } from 'fs';
import path, { resolve } from 'path';

// Function to dynamically generate entry points
const getComponentEntries = () => {
  const componentsDir = resolve(__dirname, 'src/components');
  const componentFolders = readdirSync(componentsDir).filter((file) =>
    fs.statSync(resolve(componentsDir, file)).isDirectory()
  );

  const entries = {};
  componentFolders.forEach((folder) => {
    const componentFiles = readdirSync(resolve(componentsDir, folder)).filter(
      (file) => file.endsWith('.ts')
    );
    componentFiles.forEach((file) => {
      const name = path.basename(file, '.ts');
      entries[name] = resolve(componentsDir, folder, file);
    });
  });

  return entries;
};

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      include: ['src/components/**/*.ts', 'src/vite-env.d.ts']
    })
  ],
  // Replace any process.env variables with their values
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify('production')
      // Add any other environment variables your code might use
    }
  },
  build: {
    lib: {
      entry: 'src/components/index.ts',
      formats: ['es'] // Only using ES modules
    },
    outDir: 'dist',
    // Ensure Vite doesn't try to polyfill node built-ins
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      input: getComponentEntries(),
      output: {
        inlineDynamicImports: false,
        entryFileNames: '[name].js',
        chunkFileNames: (chunkInfo) => {
          // If it's the 'vendor' chunk, name it 'vendor.js'
          if (chunkInfo.name === 'vendor') {
            return 'vendor.js';
          }
          // Otherwise, apply the default behavior with a hash for other chunks
          return '[name]-[hash].js';
        },
        assetFileNames: '[name][extname]',
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'; // All node_modules will be bundled into the 'vendor' chunk
          }
        }
      }
      // Explicitly tell Rollup to resolve certain Node.js APIs to empty objects
      // external: ['fs', 'path'] // Add any Node.js modules your code might import
    }
  }
});
