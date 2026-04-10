# Globe

An interactive 3D globe component powered by the [COBE](https://github.com/shuding/cobe) library. Perfect for visualizing global data, locations, or creating engaging geographical interfaces.

## Basic Example

```html
<ui-globe size="400"></ui-globe>
```

## Scaled Globe

Create a wide, cinematic globe view perfect for hero sections or banners:

```html
<ui-globe
  size="600"
  aspect-ratio="2"
  scale="2"
  offset="[0, 300]"
  dark="1"
></ui-globe>
```

## Properties

### Globe Positioning & Animation

| Property            | Type     | Default | Description                            |
| ------------------- | -------- | ------- | -------------------------------------- |
| `phi`               | `number` | `0`     | Initial rotation around vertical axis  |
| `theta`             | `number` | `0`     | Initial tilt                           |
| `auto-rotate-speed` | `number` | `0.01`  | Speed of automatic rotation            |

### Visual Styling

| Property         | Type                       | Default           | Description                   |
| ---------------- | -------------------------- | ----------------- | ----------------------------- |
| `dark`           | `number`                   | `1`               | Dark/light theme (0–1)        |
| `diffuse`        | `number`                   | `1.2`             | Diffuse lighting intensity    |
| `map-samples`    | `number`                   | `8000`            | Surface detail quality        |
| `map-brightness` | `number`                   | `6`               | Brightness of land masses     |
| `base-color`     | `[number, number, number]` | `[0.3, 0.3, 0.3]` | RGB globe base color (0–1)    |
| `marker-color`   | `[number, number, number]` | `[0.1, 0.8, 1]`   | RGB marker color              |
| `glow-color`     | `[number, number, number]` | `[1, 1, 1]`       | RGB glow color                |

### Sizing & Layout

| Property       | Type               | Default  | Description                             |
| -------------- | ------------------ | -------- | --------------------------------------- |
| `size`         | `number`           | `400`    | Width in pixels (0 = fill container)    |
| `aspect-ratio` | `number`           | `1`      | Width-to-height ratio                   |
| `scale`        | `number`           | `1`      | Globe scale factor                      |
| `offset`       | `[number, number]` | `[0, 0]` | Globe position offset [x, y]            |

### Markers

| Property  | Type            | Default | Description                    |
| --------- | --------------- | ------- | ------------------------------ |
| `markers` | `GlobeMarker[]` | `[]`    | Array of `{ location, size }`  |

## Credits

Powered by [COBE](https://github.com/shuding/cobe) by Shu Ding.
