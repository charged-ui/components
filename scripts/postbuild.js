import { resolve, dirname } from 'path';
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
  mkdirSync,
  existsSync,
} from 'fs';

const distDir = resolve(
  dirname(import.meta.url.replace('file://', '')),
  '..',
  'dist',
);

const componentNames = [
  'alert',
  'aurora',
  'button',
  'card',
  'code-block',
  'details',
  'dots',
  'icon',
  'menu',
  'meteors',
  'nav-menu',
  'ripple',
  'tabs',
  'text',
];

function organizeCss() {
  const files = readdirSync(distDir);
  const cssFiles = files.filter((f) => f.endsWith('.css'));

  if (cssFiles.length === 0) {
    console.log('No CSS files to organize');
    return;
  }

  let allCss = '';
  for (const cssFile of cssFiles) {
    const filePath = resolve(distDir, cssFile);
    allCss += '\n' + readFileSync(filePath, 'utf-8');
    unlinkSync(filePath);
  }

  const clean = allCss.replace(/\/\*![\s\S]*?\*\//g, '').trim();
  const chunks = clean.split(/(?<=^|\})(?=ui-|@property\s)/);

  const propertyDefs = [];
  const componentStyles = new Map();
  for (const name of componentNames) componentStyles.set(name, []);

  for (const chunk of chunks) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;

    if (/^@property\s/.test(trimmed)) {
      propertyDefs.push(trimmed);
      continue;
    }

    if (/^ui-/.test(trimmed)) {
      for (const name of componentNames) {
        if (
          trimmed.includes(`ui-${name}`) ||
          trimmed.includes(`ui-bg-${name}`)
        ) {
          componentStyles.get(name).push(trimmed);
          break;
        }
      }
    }
  }

  for (const [name, styles] of componentStyles) {
    if (styles.length === 0) continue;
    const targetDir = resolve(distDir, name);
    if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });
    writeFileSync(resolve(targetDir, `${name}.css`), styles.join('\n'));
  }

  if (propertyDefs.length > 0) {
    writeFileSync(
      resolve(distDir, 'base.css'),
      `/*! @charged/ui base styles */\n${propertyDefs.join('\n')}`,
    );
  }

  const withCss = componentNames.filter(
    (name) => componentStyles.get(name)?.length > 0,
  );
  console.log(
    `CSS organized: ${withCss.length}/${componentNames.length} components have CSS`,
  );
  if (propertyDefs.length > 0)
    console.log(`  base.css: ${propertyDefs.length} @property declarations`);
}

organizeCss();
