# Button

This page demonstrates some of the built-in markdown extensions provided by VitePress.

<script setup>
import './button';
import '../icon/icon'
</script>

## Sizes

<div class="p-12 bg-preview flex gap-4 justify-center items-center rounded-xl">
  <ui-button size="small">
    <div slot="value">Small</div>
  </ui-button>
  <ui-button>
    <div slot="value">Medium</div>
  </ui-button>
  <ui-button size="large">
    <div slot="value">Large</div>
  </ui-button>
</div>

```html
<ui-button size="small">
	<div slot="value">Small</div>
</ui-button>
<ui-button>
	<div slot="value">Medium</div>
</ui-button>
<ui-button size="large">
	<div slot="value">Large</div>
</ui-button>
```

## Variants

<div class="p-12 bg-preview flex flex-wrap gap-4 justify-center rounded-xl">
  <ui-button variant="primary">
    <div slot="value">Primary</div>
  </ui-button>
  <ui-button variant="secondary">
    <div slot="value">Secondary</div>
  </ui-button>
  <ui-button variant="tertiary">
    <div slot="value">Tertiary</div>
  </ui-button>
  <ui-button variant="warning">
    <div slot="value">Warning</div>
  </ui-button>
  <ui-button variant="error">
    <div slot="value">Error</div>
  </ui-button>
  <ui-button variant="success">
    <div slot="value">Success</div>
  </ui-button>
  <ui-button variant="info">
    <div slot="value">Info</div>
  </ui-button>
</div>

```html
<ui-button variant="primary">
	<div slot="value">Primary</div>
</ui-button>
<ui-button variant="secondary">
	<div slot="value">Secondary</div>
</ui-button>
<ui-button variant="tertiary">
	<div slot="value">Tertiary</div>
</ui-button>
<ui-button variant="warning">
	<div slot="value">Warning</div>
</ui-button>
<ui-button variant="error">
	<div slot="value">Error</div>
</ui-button>
<ui-button variant="success">
	<div slot="value">Success</div>
</ui-button>
<ui-button variant="info">
	<div slot="value">Info</div>
</ui-button>
```

## Shape

<div class="p-12 bg-preview flex gap-4 justify-center items-center rounded-xl">
  <ui-button shape="rounded" variant="secondary">
    <div slot="value">Rounded</div>
  </ui-button>
  <ui-button>
    <div slot="value">Square</div>
  </ui-button>
</div>

```html
<ui-button shape="rounded">
	<div slot="value">Rounded</div>
</ui-button>
<ui-button>
	<div slot="value">Square</div>
</ui-button>
```
