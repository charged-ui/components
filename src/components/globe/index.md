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

## Scaled Globe Example

Create a wide, cinematic globe view perfect for hero sections or banners:

<div class="p-12 bg-preview flex justify-center rounded-xl">
  <ui-globe 
    aspectRatio="2/1"
    scale="2"
    :offset="[0, 300]"
    dark="1"
    diffuse="3"
    mapBrightness="1.2"
    :baseColor="[1,1,1]"
    :markerColor="[251/255, 100/255, 21/255]"
    :glowColor="[1.2,1.2,1.2]"
    :markers="[
      { location: [37.7595, -122.4367], size: 0.05 },
      { location: [51.5074, -0.1278], size: 0.03 },
      { location: [35.6762, 139.6503], size: 0.04 },
      { location: [40.7128, -74.0060], size: 0.04 },
      { location: [48.8566, 2.3522], size: 0.03 }
    ]"
  />
</div>

```html
<ui-globe
  aspectRatio="2/1"
  scale="2"
  :offset="[0, 200]"
  dark="0"
  diffuse="3"
  mapBrightness="1.2"
  :baseColor="[1,1,1]"
  :markerColor="[251/255, 100/255, 21/255]"
  :glowColor="[1.2,1.2,1.2]"
  :markers="[
      { location: [37.7595, -122.4367], size: 0.05 },
      { location: [51.5074, -0.1278], size: 0.03 },
      { location: [35.6762, 139.6503], size: 0.04 },
      { location: [40.7128, -74.0060], size: 0.04 },
      { location: [48.8566, 2.3522], size: 0.03 }
    ]"
/>
```

## Properties

### Canvas & Rendering

| Property           | Type     | Default | Description                         |
| ------------------ | -------- | ------- | ----------------------------------- |
| `width`            | `number` | `300`   | Canvas width in pixels              |
| `height`           | `number` | `300`   | Canvas height in pixels             |
| `devicePixelRatio` | `number` | `2`     | Pixel density for high-DPI displays |

### Globe Positioning & Animation

| Property          | Type      | Default | Description                                        |
| ----------------- | --------- | ------- | -------------------------------------------------- |
| `phi`             | `number`  | `0`     | Initial rotation around vertical axis (longitude)  |
| `theta`           | `number`  | `0`     | Initial rotation around horizontal axis (latitude) |
| `autoRotate`      | `boolean` | `true`  | Enable automatic rotation                          |
| `autoRotateSpeed` | `number`  | `0.01`  | Speed of automatic rotation                        |

### Visual Styling

| Property        | Type                       | Default           | Description                                     |
| --------------- | -------------------------- | ----------------- | ----------------------------------------------- |
| `dark`          | `number`                   | `1`               | Dark/light theme (0-1 range)                    |
| `diffuse`       | `number`                   | `1.2`             | Diffuse lighting intensity                      |
| `mapSamples`    | `number`                   | `16000`           | Surface detail quality (higher = more detailed) |
| `mapBrightness` | `number`                   | `6`               | Brightness of land masses                       |
| `baseColor`     | `[number, number, number]` | `[0.3, 0.3, 0.3]` | RGB color of the globe base (0-1 range)         |
| `markerColor`   | `[number, number, number]` | `[0.1, 0.8, 1]`   | RGB color of markers                            |
| `glowColor`     | `[number, number, number]` | `[1, 1, 1]`       | RGB color of the globe's glow                   |

### Scaling & Positioning

| Property      | Type               | Default  | Description                                |
| ------------- | ------------------ | -------- | ------------------------------------------ |
| `aspectRatio` | `number`           | `1`      | Width to height ratio of the container     |
| `scale`       | `number`           | `1`      | Globe scale factor                         |
| `offset`      | `[number, number]` | `[0, 0]` | Globe position offset [x, y] within canvas |

### Other Properties

| Property  | Type            | Default | Description                              |
| --------- | --------------- | ------- | ---------------------------------------- |
| `markers` | `GlobeMarker[]` | `[]`    | Array of markers to display on the globe |

## Scaling & Aspect Ratios

The globe component supports flexible aspect ratios and scaling, making it perfect for different layouts:

### Common Configurations

**Square Globe (default)**

```html
<ui-globe aspectRatio="1" scale="1" />
```

**Wide Cinematic View**

```html
<ui-globe aspectRatio="2.5" scale="2.5" .offset="${[0," 120]} />
```

**Tall Portrait**

```html
<ui-globe aspectRatio="0.7" scale="1.5" .offset="${[0," -50]} />
```

**Hero Section**

```html
<ui-globe aspectRatio="3" scale="3" .offset="${[0," 200]} />
```

### How Scaling Works

- **`aspectRatio`**: Controls the container's width-to-height ratio
- **`scale`**: Scales the globe within the canvas (larger values = bigger globe)
- **`offset`**: Moves the globe's position within the canvas `[x, y]`

For wide aspect ratios, you typically want:

- Higher `scale` values (2-3) to make the globe fill the space
- Positive Y `offset` to move the globe up and show more of the bottom hemisphere

## Performance Tips

1. **mapSamples**: Lower values (8000-12000) for better performance on mobile devices
2. **devicePixelRatio**: Set to 1 on lower-end devices to improve performance
3. **autoRotateSpeed**: Slower speeds (0.005-0.01) are smoother and less resource-intensive
4. **Responsive**: The component automatically adapts to container size changes
5. **Aspect Ratios**: Wide aspect ratios (2.5+) work great for hero sections and banners

## Coordinate System

- **Longitude**: -180 to 180 (West to East)
- **Latitude**: -90 to 90 (South to North)
- **Marker Size**: Typically 0.01 to 0.1 (larger values may overlap)

## Browser Support

The component uses WebGL and requires modern browser support:

- Chrome 56+
- Firefox 51+
- Safari 11+
- Edge 79+

## Credits

This component is powered by [COBE](https://github.com/shuding/cobe), a lightweight 5kB WebGL globe library created by Shu Ding.
