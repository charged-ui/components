# Components

## Publishing components

To publish your Lit component library to npm, you need to follow these steps:

### 1. Create an npm Account

If you don't have an npm account yet, create one at [npmjs.com](https://www.npmjs.com/signup).

### 2. Login to npm

Login to your npm account from your terminal:

```bash
npm login
```

You'll be prompted to enter your username, password, and email.

### 3. Prepare Your Package for Publishing

Ensure your `package.json` is correctly configured. Here’s an example:

#### `package.json`

```json
{
  "name": "my-lit-component-library",
  "version": "1.0.0",
  "description": "A library of Lit components",
  "main": "dist/my-component-library.js",
  "types": "dist/types/index.d.ts",
  "scripts": {
    "build": "rollup -c"
  },
  "keywords": ["lit", "web-components", "library"],
  "author": "Your Name",
  "license": "MIT",
  "files": ["dist/**/*"],
  "devDependencies": {
    "rollup": "^2.52.3",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-terser": "^7.0.2",
    "@rollup/plugin-typescript": "^8.2.1",
    "typescript": "^4.3.5"
  },
  "dependencies": {
    "lit": "^2.0.0"
  }
}
```

### 4. Build Your Library

Make sure your library is built and ready to publish:

```bash
npm run build
```

### 5. Publishing Your Library

To publish your library to npm, run the following command:

```bash
npm publish --access public
```

If you are publishing a scoped package (e.g., `@your-username/my-lit-component-library`), you need to add `--access public` to ensure it's publicly accessible.

### 6. Update Your Library

When you make changes to your library, increment the version number in `package.json` according to [semantic versioning](https://semver.org/), rebuild your library, and publish it again:

```bash
npm version patch  # or minor, major
npm run build
npm publish
```

### 7. Prerelease versioning

To version a prerelease, run the following command:

```bash
npm version prerelease --preid alpha
```

### Summary

By following these steps, you can publish your Lit component library to npm, making it available for others to use. Ensure your `package.json` is correctly configured, build your library, and use the `npm publish` command to publish your package.
