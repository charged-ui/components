# Globe

An interactive 3D globe component powered by the COBE library. Perfect for visualizing global data, locations, or creating engaging geographical interfaces.

<script setup>
import './globe';
import '../icon/icon';
</script>

## Basic Example

<div class="p-12 bg-preview flex justify-center rounded-xl">
  <ui-globe 
    width="400" 
    height="400"
    dark="0"
    :baseColor="[1,1,1]"
    :markers="[
      { location: [37.7595, -122.4367], size: 0.05 },
      { location: [51.5074, -0.1278], size: 0.03 },
      { location: [35.6762, 139.6503], size: 0.04 }
    ]"
  />
</div>

```html
<ui-globe
  width="400"
  height="400"
  .markers=${[
    { location: [37.7595, -122.4367], size: 0.05 },
    { location: [51.5074, -0.1278], size: 0.03 },
    { location: [35.6762, 139.6503], size: 0.04 }
  ]}
/>
```

## Properties

### Required Properties

| Property | Type | Description                           |
| -------- | ---- | ------------------------------------- |
| _None_   | -    | All properties have sensible defaults |

_Note: The COBE library requires a canvas element, but this is handled internally by the component._

### Optional Properties

#### Canvas & Rendering

| Property           | Type     | Default | Description                         |
| ------------------ | -------- | ------- | ----------------------------------- |
| `width`            | `number` | `300`   | Canvas width in pixels              |
| `height`           | `number` | `300`   | Canvas height in pixels             |
| `devicePixelRatio` | `number` | `2`     | Pixel density for high-DPI displays |

#### Globe Positioning & Animation

| Property          | Type      | Default | Description                                        |
| ----------------- | --------- | ------- | -------------------------------------------------- |
| `phi`             | `number`  | `0`     | Initial rotation around vertical axis (longitude)  |
| `theta`           | `number`  | `0`     | Initial rotation around horizontal axis (latitude) |
| `autoRotate`      | `boolean` | `true`  | Enable automatic rotation                          |
| `autoRotateSpeed` | `number`  | `0.01`  | Speed of automatic rotation                        |

#### Visual Styling

| Property        | Type                       | Default           | Description                                     |
| --------------- | -------------------------- | ----------------- | ----------------------------------------------- |
| `dark`          | `number`                   | `1`               | Dark/light theme (0-1 range)                    |
| `diffuse`       | `number`                   | `1.2`             | Diffuse lighting intensity                      |
| `scale`         | `number`                   | `1`               | Globe scale factor                              |
| `mapSamples`    | `number`                   | `16000`           | Surface detail quality (higher = more detailed) |
| `mapBrightness` | `number`                   | `6`               | Brightness of land masses                       |
| `baseColor`     | `[number, number, number]` | `[0.3, 0.3, 0.3]` | RGB color of the globe base (0-1 range)         |
| `markerColor`   | `[number, number, number]` | `[0.1, 0.8, 1]`   | RGB color of markers                            |
| `glowColor`     | `[number, number, number]` | `[1, 1, 1]`       | RGB color of the globe's glow                   |
| `offset`        | `[number, number]`         | `[0, 0]`          | Globe position offset [x, y]                    |

#### Other Properties

| Property  | Type            | Default | Description                              |
| --------- | --------------- | ------- | ---------------------------------------- |
| `markers` | `GlobeMarker[]` | `[]`    | Array of markers to display on the globe |

## Performance Tips

1. **mapSamples**: Lower values (8000-12000) for better performance on mobile devices
2. **devicePixelRatio**: Set to 1 on lower-end devices to improve performance
3. **autoRotateSpeed**: Slower speeds (0.005-0.01) are smoother and less resource-intensive
4. **Responsive**: Use `minSize` and `maxSize` to prevent very small or very large globes
5. **Square Format**: 1:1 aspect ratio provides optimal visual quality for globes

## Coordinate System

- **Longitude**: -180 to 180 (West to East)
- **Latitude**: -90 to 90 (South to North)
- **Marker Size**: Typically 0.01 to 0.1 (larger values may overlap)

## Common Use Cases

- **Data Visualization**: Show global metrics, user locations, or network nodes
- **Geographic Interfaces**: Interactive maps for travel, shipping, or regional data
- **Presentations**: Eye-catching backgrounds for landing pages or dashboards
- **Educational Tools**: Geography learning applications or world exploration

## Browser Support

The component uses WebGL and requires modern browser support:

- Chrome 56+
- Firefox 51+
- Safari 11+
- Edge 79+

## Credits

This component is powered by [COBE](https://github.com/shuding/cobe), a lightweight 5kB WebGL globe library created by Shu Ding.
