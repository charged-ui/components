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

  const entries = {
    // IMPORTANT: Main entry that will create index.js
    index: resolve(__dirname, 'src/components/index.ts')
  };

  // Add individual component entries
  componentFolders.forEach((folder) => {
    const componentPath = resolve(componentsDir, folder, `${folder}.ts`);
    if (fs.existsSync(componentPath)) {
      entries[folder] = componentPath;
    }
  });

  console.log('Entry points:', entries); // Debug log
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
      entry: getComponentEntries(),
      formats: ['es']
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'cobe') return 'cobe.js';
          if (chunkInfo.name === 'motion') return 'motion.js';
          if (chunkInfo.name === 'vendor') return 'vendor.js';
          return '[name]-[hash].js';
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('cobe')) return 'cobe';
            if (id.includes('motion') || id.includes('framer-motion'))
              return 'motion';
            return 'vendor';
          }
          return undefined;
        }
      }
    }
  }
});
