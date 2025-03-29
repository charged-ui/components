# Gallery

A responsive, animated gallery component with filtering capabilities and lazy-loaded images.

<script setup>
import './gallery';
import '../card/card';
import '../icon/icon';
</script>

## Example

<div class="p-12 bg-preview rounded-xl flex justify-center">
<ui-gallery>
  <!-- Card 1 -->
  <ui-card data-categories="design,marketing" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" 
      alt="Brand Refresh" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Brand Refresh
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 2 -->
  <ui-card data-categories="apps,design" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" 
      alt="Mobile App" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Mobile App
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 3 -->
  <ui-card data-categories="marketing" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" 
      alt="Campaign Strategy" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Campaign Strategy
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 4 -->
  <ui-card data-categories="packaging,design" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" 
      alt="Sustainable Packaging" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Sustainable Packaging
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 5 -->
  <ui-card data-categories="design" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" 
      alt="Web Design" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Web Design
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 6 -->
  <ui-card data-categories="marketing,design" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" 
      alt="Social Media Kit" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Social Media Kit
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 7 -->
  <ui-card data-categories="design,apps" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" 
      alt="Dashboard UI" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Dashboard UI
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 8 -->
  <ui-card data-categories="apps" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" 
      alt="Plugin Development" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Plugin Development
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 9 -->
  <ui-card data-categories="marketing,packaging" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" 
      alt="Product Launch" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Product Launch
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 10 -->
  <ui-card data-categories="design,apps" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" 
      alt="UX Research" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      UX Research
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 11 -->
  <ui-card data-categories="packaging" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" 
      alt="Retail Packaging" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Retail Packaging
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 12 -->
  <ui-card data-categories="marketing,apps" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      data-src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" 
      alt="Marketing Automation" 
      slot="media"
      class="lazy-image group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Marketing Automation
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
</ui-gallery>
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
