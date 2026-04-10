# Ripple

An animated ripple effect typically placed behind a focal element to draw attention to it.

## Example

```html
<div style="position: relative; overflow: hidden; height: 500px; display: flex; align-items: center; justify-content: center;">
  <p style="z-index: 10;">Ripple</p>
  <ui-bg-ripple></ui-bg-ripple>
</div>
```

## Properties

| Property              | Type     | Default | Description                                   |
| --------------------- | -------- | ------- | --------------------------------------------- |
| `main-circle-size`    | `number` | `210`   | Diameter of the innermost circle in px        |
| `main-circle-opacity` | `number` | `0.24`  | Opacity of the innermost circle               |
| `num-circles`         | `number` | `8`     | Number of concentric ripple circles           |

## CSS Custom Properties

| Property                      | Default                        | Description                  |
| ----------------------------- | ------------------------------ | ---------------------------- |
| `--ripple-bg-color`           | `gray-600/25`                  | Circle fill color            |
| `--ripple-border-color`       | `gray-400`                     | Circle border color          |
| `--ripple-animation-duration` | `2s`                           | Duration of one ripple cycle |
| `--ripple-animation-timing`   | `ease-out`                     | Animation easing function    |

## Credits

Inspired by [Magic UI](https://magicui.design/docs/components/ripple).
