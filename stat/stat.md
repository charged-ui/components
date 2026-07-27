# Stat

`<ui-stat>` animates smoothly from a start number to an end number when it scrolls into view, powered by [Motion](https://motion.dev).

## Count Up

```html
<ui-stat variant="display-2" start="0" end="500"></ui-stat>
```

## Count Down

```html
<ui-stat variant="display-2" start="500" end="0"></ui-stat>
```

## With Prefix & Suffix

```html
<ui-stat variant="display-2" start="0" end="500">
  <ui-text slot="prefix" data-variant="display-2">$</ui-text>
  <ui-text slot="suffix" data-variant="display-2">+</ui-text>
</ui-stat>
```

## Properties

| Property   | Type     | Default | Description                              |
| ---------- | -------- | ------- | ---------------------------------------- |
| `start`    | `number` | `0`     | Starting value                           |
| `end`      | `number` | `0`     | Ending value                             |
| `duration` | `number` | `2`     | Animation duration in seconds            |
| `delay`    | `number` | `0`     | Animation delay in seconds               |
| `variant`  | `string` | `''`    | Typography variant (same as `ui-text`)   |

## Slots

| Slot     | Description              |
| -------- | ------------------------ |
| `prefix` | Content before the number |
| `suffix` | Content after the number  |
