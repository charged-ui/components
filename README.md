# @charged/ui

A collection of universal web components built with Lit that work seamlessly in any environment.

## Features

- 🌐 **Universal**: Works in any JavaScript framework or no framework at all
- 🎨 **Styled with Tailwind**: Beautiful, responsive components out of the box
- 📦 **Tree-shakeable**: Import only what you need
- 🔷 **TypeScript**: Full type definitions included
- ⚡ **Lightweight**: Built on Lit for minimal bundle size
- 🎯 **SSR Compatible**: Works with server-side rendering

## Installation

```bash
npm install @charged/ui
```

### Alpha/Beta versions

```bash
# Install latest alpha version
npm install @charged/ui@alpha

# Install specific alpha version
npm install @charged/ui@0.0.0-alpha.1

# Install latest beta version
npm install @charged/ui@beta
```

## Usage

### React 19+

React 19 has excellent native web component support:

```tsx
import '@charged/ui/alert';
import { AlertVariant } from '@charged/ui/alert';

function App() {
	return (
		<ui-alert data-variant={AlertVariant.Success}>
			<span slot="icon">✅</span>
			<span slot="heading">Success!</span>
			<span slot="message">Your changes have been saved.</span>
		</ui-alert>
	);
}
```

### Vanilla HTML

```html
<!DOCTYPE html>
<html>
	<head>
		<script
			type="module"
			src="https://unpkg.com/@charged/ui/dist/alert/index.js"
		></script>
	</head>
	<body>
		<ui-alert data-variant="error">
			<span slot="icon">❌</span>
			<span slot="heading">Vanilla HTML</span>
			<span slot="message">No framework required!</span>
		</ui-alert>
	</body>
</html>
```

## Available Components

- **[Alert](./app/elements/alert/README.md)** - Display contextual feedback messages
- **[Button](./app/elements/button/README.md)** - Customizable button component
- **[Details](./app/elements/details/README.md)** - Expandable accordion component
- **[Icon](./app/elements/icon/README.md)** - Display Heroicons
- **[Spinner](./app/elements/spinner/README.md)** - Animated loading spinner
- **[Text](./app/elements/text/README.md)** - Typography component with consistent styling

See individual component READMEs for detailed documentation, props, and examples.

## Import Patterns

### Import all components at once

```typescript
import '@charged/ui';
```

### Import individual components

```typescript
import '@charged/ui/alert';
import '@charged/ui/button';
import '@charged/ui/text';
```

### Import with TypeScript types

```typescript
import '@charged/ui/alert';
import { AlertVariant, type AlertProps } from '@charged/ui/alert';
```

## Browser Support

These components work in all modern browsers that support:

- Custom Elements v1
- Shadow DOM v1
- ES2022+ modules

## Development

This repository contains both the component library and a documentation site built with React Router.

### Component Library Development

```bash
# Install dependencies
npm install

# Build the library
npm run build:lib

# Watch mode for library development
npm run dev:lib

# Type checking
npm run typecheck
```

### Documentation Site Development

```bash
# Run the docs site
npm run dev

# Build the docs site
npm run build:app

# Start production docs server
npm start
```

## Publishing

### Alpha/Beta Releases

```bash
# Publish alpha version
npm run publish:alpha

# Publish beta version
npm run publish:beta
```

### Stable Releases

```bash
# Publish stable version
npm run publish:stable
```

## Project Structure

```
charged-ui/
├── app/
│   ├── elements/          # Component source files
│   │   ├── alert/
│   │   ├── button/
│   │   ├── text/
│   │   └── index.ts       # Main entry point
│   └── routes/            # Documentation site routes
├── dist/                  # Built library (generated)
├── public/               # Documentation site assets
├── vite.config.lib.ts    # Library build config
├── vite.config.ts        # Docs site build config
└── tsconfig.lib.json     # Library TypeScript config
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Links

- [Documentation](https://charged.dev)
- [GitHub](https://github.com/yourusername/charged-ui)
- [npm](https://www.npmjs.com/package/@charged/ui)
- [Issues](https://github.com/yourusername/charged-ui/issues)
