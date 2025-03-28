# Filterable Grid

A responsive, animated grid component with filtering capabilities and lazy-loaded images.

<script setup>
import './filterable-grid';
</script>

## Example

<div class="p-12 bg-preview rounded-xl flex justify-center">
  <filterable-grid class="w-full max-w-4xl"></filterable-grid>
</div>

## Features

- **Responsive Layout**: Automatically adjusts columns based on screen size
- **Category Filtering**: Filter items by category with animated transitions
- **Lazy Image Loading**: Images load only when they enter the viewport
- **Animation**: Smooth reveal animations for grid items
- **Customizable**: Configurable number of columns and filter categories

## Usage

```html
<filterable-grid></filterable-grid>
```

With custom properties:

```html
<filterable-grid
  :columns="3"
  :filters='[
    { "id": "all", "label": "All" },
    { "id": "design", "label": "Design" },
    { "id": "code", "label": "Code" }
  ]'
  :items='[
    { 
      "id": 1, 
      "title": "Project Title", 
      "description": "Project description", 
      "category": "design", 
      "image": "path/to/image.jpg" 
    }
  ]'
></filterable-grid>
```

## Properties

| Property  | Type   | Default | Description                                              |
| --------- | ------ | ------- | -------------------------------------------------------- |
| `columns` | Number | `4`     | Number of columns to display on desktop                  |
| `filters` | Array  | `[...]` | Array of filter objects with `id` and `label` properties |
| `items`   | Array  | `[...]` | Array of item objects                                    |

### Filter Object

```ts
interface FilterItem {
  id: string; // Unique identifier for the filter
  label: string; // Display text for the filter button
}
```

### Item Object

```ts
interface GridItem {
  id: number; // Unique identifier for the item
  title: string; // Item title
  description: string; // Item description
  category: string; // Category ID (should match a filter ID)
  image: string; // URL to the item's image
}
```

## Animation

The component uses the Motion API for animations. If the Motion API is not available, animations will be skipped gracefully.

```js{4-14}
animateItems() {
  if (!window.motion) return;

  const gridItems = this.shadowRoot?.querySelectorAll('.grid-item');
  if (!gridItems) return;

  gridItems.forEach((item, index) => {
    window.motion?.animate(
      item,
      {
        opacity: [0, 1],
        y: [20, 0]
      },
      {
        delay: index * 0.05,
        duration: 0.5,
        easing: [.22, .03, .26, 1]
      }
    );
  });
}
```

## Lazy Loading

The component implements lazy loading for images using the IntersectionObserver API:

```js{7-32}
setupLazyLoading() {
  if (this.observer) {
    this.observer.disconnect();
  }

  this.observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const imgElement = entry.target as HTMLImageElement;
        const dataSrc = imgElement.getAttribute('data-src');

        if (dataSrc) {
          imgElement.onload = () => {
            imgElement.classList.add('loaded');
          };

          imgElement.src = dataSrc;
          imgElement.removeAttribute('data-src');
          this.observer?.unobserve(imgElement);
        }
      }
    });
  }, {
    rootMargin: '200px',
    threshold: 0
  });

  this.updateComplete.then(() => {
    const lazyImages = this.shadowRoot?.querySelectorAll('img[data-src]');
    if (lazyImages) {
      lazyImages.forEach(img => this.observer?.observe(img));
    }
  });
}
```

::: info
Images are loaded when they are 200px from entering the viewport for a smoother user experience.
:::

## CSS Customization

You can customize the appearance using CSS variables:

```css
filterable-grid {
  --grid-gap: 1.5rem;
  --filter-active-bg: #4f46e5;
  --filter-active-text: white;
  --filter-inactive-bg: #e5e7eb;
  --filter-inactive-text: #1f2937;
}
```

::: tip
The component uses Tailwind CSS classes internally, but you can override styles using CSS variables or direct CSS selectors.
:::

## Responsive Behavior

The component is built with a mobile-first approach:

- Mobile: 1 column
- Tablet (sm): 2 columns
- Medium screens (md): Up to 4 columns
- Large screens (lg): Up to the number specified in the `columns` property

::: warning
Due to Tailwind's limitations, the maximum number of columns is 12.
:::

## Browser Support

This component uses modern web features:

- Custom Elements (Web Components)
- IntersectionObserver API
- CSS Grid
- ES6+ features

::: danger
For older browsers, polyfills may be required.
:::

## Performance Considerations

::: details
The component implements several performance optimizations:

- Lazy loading images only when needed
- Disconnecting the IntersectionObserver when the component is removed
- Efficient filtering without DOM rebuilding
- Animation only when elements are in view
  :::
