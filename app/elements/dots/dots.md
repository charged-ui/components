# Dots

A dot-pattern background with a radial gradient fade. Supports light and dark modes via CSS custom properties.

## Example

```html
<ui-bg-dots style="height: 400px; --dot-bg-color: #f5f5f5"></ui-bg-dots>
```

## Dark Mode

Add the `dark` class to the element:

```html
<ui-bg-dots class="dark" style="height: 400px"></ui-bg-dots>
```

## CSS Custom Properties

| Property              | Default    | Description                   |
| --------------------- | ---------- | ----------------------------- |
| `--dot-bg-color`      | `white`    | Background fill color         |
| `--dot-pattern-color` | `#d4d4d4`  | Dot color                     |
| `--dot-mask-bg-color` | `white`    | Radial mask overlay color     |

## Credits

Inspired by [Aceternity UI](https://ui.aceternity.com/components/grid-and-dot-backgrounds).
