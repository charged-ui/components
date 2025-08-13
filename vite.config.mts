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
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  },
  build: {
    lib: {
      entry: 'src/components/index.ts',
      formats: ['es']
    },
    outDir: 'dist',
    rollupOptions: {
      input: getComponentEntries(),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'cobe') return 'cobe.js';
          if (chunkInfo.name === 'motion') return 'motion.js';
          if (chunkInfo.name === 'vendor') return 'vendor.js';
          return '[name]-[hash].js';
        },
        manualChunks: (id) => {
          // Only chunk node_modules, keep your source code together
          if (id.includes('node_modules')) {
            if (id.includes('cobe')) return 'cobe';
            if (id.includes('motion') || id.includes('framer-motion'))
              return 'motion';
            return 'vendor'; // Everything else from node_modules
          }
          // Don't chunk your own source files - let them stay in their entry points
          return undefined;
        }
      }
    }
  }
});
