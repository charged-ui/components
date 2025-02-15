# Stat

<code>&lt;ui-stat&gt;</code> is a dynamic web component that smoothly animates numbers over a specified duration.

<script setup>
import './stat';
import '../icon/icon';
import '../text/text';
</script>

## Count Up

<div class="p-12 bg-preview flex flex-col gap-4 justify-center rounded-xl">
  <ui-stat variant="display-2" start="0" end="500" />
</div>

```html
<ui-stat variant="display-2" start="0" end="500" />
```

## Count Down

<div class="p-12 bg-preview flex flex-col gap-4 justify-center rounded-xl">
  <ui-stat variant="display-2" start="500" end="0" />
</div>

```html
<ui-stat variant="display-2" start="500" end="0" />
```

## Prefix

<div class="p-12 bg-preview flex flex-col gap-4 justify-center rounded-xl">
  <ui-stat variant="display-2" start="10" end="500">
    <ui-text variant="display-2" slot="prefix">$</ui-text>
  </ui-stat>
</div>

```html
<ui-stat variant="display-2" start="10" end="500">
  <ui-text variant="display-2" slot="prefix">$</ui-text>
</ui-stat>
```

## Suffix

<div class="p-12 bg-preview flex flex-col gap-4 justify-center rounded-xl">
  <ui-stat variant="display-2" start="10" end="500">
    <ui-text variant="display-2" slot="suffix">+</ui-text>
  </ui-stat>
</div>

```html
<ui-stat variant="display-2" start="10" end="500">
  <ui-text variant="display-2" slot="suffix">+</ui-text>
</ui-stat>
```
