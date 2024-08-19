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
  build: {
    lib: {
      entry: 'src/components/index.ts', // Ensure this is your main entry point exporting types
      formats: ['es', 'cjs']
    },
    outDir: 'dist',
    rollupOptions: {
      input: getComponentEntries(),
      output: {
        inlineDynamicImports: false,
        entryFileNames: '[name].js', // Customize this as needed
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        // Add a manual entry point rename if necessary
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'; // Group all node_modules into a vendor chunk
          }
        }
      }
    }
  }
});
