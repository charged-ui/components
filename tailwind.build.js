const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const chokidar = require('chokidar');
const glob = require('glob');

// Function to generate TailwindCSS for a specific Lit component
const buildCSSForComponent = (componentPath) => {
  const componentDir = path.dirname(componentPath);
  const componentName = path.basename(componentPath, '.ts');
  const outputPath = path.join(componentDir, `${componentName}.css`);
  const tempConfigPath = path.join(componentDir, 'tailwind.config.js');

  fs.writeFileSync(
    tempConfigPath,
    `
    module.exports = { 
      content: ['${componentPath}'],
      theme: {},
      corePlugins: {
        preflight: false,
      },
    };
  `
  );

  exec(
    `npx tailwindcss -c ${tempConfigPath} -o ${outputPath} --minify`,
    (err) => {
      if (err) {
        console.error(`Error generating CSS for ${componentPath}: ${err}`);
        return;
      }

      fs.unlinkSync(tempConfigPath);
      console.log(`Generated CSS for ${componentPath} at ${outputPath}`);
    }
  );
};

// Watch and build CSS when .ts files change
const watchCSS = () => {
  chokidar.watch('./src/components/*/*.ts').on('change', (filePath) => {
    if (filePath.endsWith('.ts')) {
      buildCSSForComponent(filePath);
    }
  });

  console.log('Watching for changes in .ts files...');
};

const args = process.argv.slice(2);

if (args.includes('--watch')) {
  watchCSS();
} else {
  glob
    .sync('./src/components/*/*.ts', './src/components/*/*.md')
    .forEach(buildCSSForComponent);
}
