# @charged-ui/components

A collection of universal web components built with Lit that work seamlessly in React, Vue, Angular, and vanilla HTML.

## Installation

```bash
npm install @charged-ui/components
```

## Usage

### Import Individual Components

```typescript
// Import just the alert component
import '@charged-ui/components/alert';

// Now use it in your JSX/HTML
<charged-alert variant="success">
  <span slot="icon">✅</span>
  <span slot="heading">Success!</span>
  <span slot="message">Your action was completed successfully.</span>
</charged-alert>
```

### Import All Components

```typescript
// Import all components
import '@charged-ui/components';

// Or import types if needed
import { AlertVariant } from '@charged-ui/components';
```

## Components

### Alert (`<charged-alert>`)

A flexible alert component with support for different variants and slotted content.

#### Props

- `variant`: `'info' | 'success' | 'warning' | 'error'` (default: `'info'`)

#### Slots

- `icon`: Custom icon content
- `heading`: Alert title/heading
- `message`: Alert message content

#### Examples

```html
<!-- Basic info alert -->
<charged-alert variant="info">
	<span slot="message">This is an informational message.</span>
</charged-alert>

<!-- Success alert with icon and heading -->
<charged-alert variant="success">
	<span slot="icon">✅</span>
	<span slot="heading">Success!</span>
	<span slot="message">Your changes have been saved.</span>
</charged-alert>

<!-- Warning alert -->
<charged-alert variant="warning">
	<span slot="icon">⚠️</span>
	<span slot="heading">Warning</span>
	<span slot="message">Please review your input before continuing.</span>
</charged-alert>

<!-- Error alert -->
<charged-alert variant="error">
	<span slot="icon">❌</span>
	<span slot="heading">Error</span>
	<span slot="message">Something went wrong. Please try again.</span>
</charged-alert>
```

## Framework Integration

### React 19+

React 19 has excellent native web component support:

```tsx
import '@charged-ui/components/alert';

function App() {
	return (
		<charged-alert variant="success">
			<span slot="icon">✅</span>
			<span slot="heading">React Integration</span>
			<span slot="message">Works perfectly with React 19!</span>
		</charged-alert>
	);
}
```

### Vue 3

```vue
<template>
	<charged-alert variant="info">
		<span slot="icon">ℹ️</span>
		<span slot="heading">Vue Integration</span>
		<span slot="message">Works great with Vue!</span>
	</charged-alert>
</template>

<script setup>
import '@charged-ui/components/alert';
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@charged-ui/components/alert';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

```html
<!-- component.html -->
<charged-alert variant="warning">
	<span slot="icon">⚠️</span>
	<span slot="heading">Angular Integration</span>
	<span slot="message">Works with Angular too!</span>
</charged-alert>
```

### Vanilla HTML

```html
<!DOCTYPE html>
<html>
	<head>
		<script type="module">
			import '@charged-ui/components/alert';
		</script>
	</head>
	<body>
		<charged-alert variant="error">
			<span slot="icon">❌</span>
			<span slot="heading">Vanilla HTML</span>
			<span slot="message">No framework required!</span>
		</charged-alert>
	</body>
</html>
```

## TypeScript Support

Full TypeScript support is included. For React projects, JSX types are automatically available when you import the components.

```typescript
import { AlertVariant } from '@charged-ui/components';

const variant: AlertVariant = AlertVariant.Success;
```

## Browser Support

These components work in all modern browsers that support:

- Custom Elements v1
- Shadow DOM v1
- ES2015+

## License

MIT
