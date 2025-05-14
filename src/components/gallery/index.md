# Gallery

A responsive, animated gallery component with filtering capabilities.

<script setup>
import './gallery';
import '../card/card';
import '../icon/icon';
</script>

## Example

<div class="p-12 bg-preview rounded-xl flex justify-center">
<ui-gallery grid-tablet="2" grid-desktop="2">
  <!-- Card 1 -->
  <ui-card data-categories="design,marketing" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" 
      alt="Brand Refresh" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Brand Refresh
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 2 -->
  <ui-card data-categories="apps,design" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" 
      alt="Mobile App" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Mobile App
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 3 -->
  <ui-card data-categories="marketing" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" 
      alt="Campaign Strategy" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Campaign Strategy
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 4 -->
  <ui-card data-categories="packaging,design" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" 
      alt="Sustainable Packaging" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Sustainable Packaging
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 5 -->
  <ui-card data-categories="design" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" 
      alt="Web Design" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Web Design
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 6 -->
  <ui-card data-categories="marketing,design" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" 
      alt="Social Media Kit" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Social Media Kit
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 7 -->
  <ui-card data-categories="design,apps" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" 
      alt="Dashboard UI" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Dashboard UI
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 8 -->
  <ui-card data-categories="apps" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" 
      alt="Plugin Development" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Plugin Development
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 9 -->
  <ui-card data-categories="marketing,packaging" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" 
      alt="Product Launch" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Product Launch
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 10 -->
  <ui-card data-categories="design,apps" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" 
      alt="UX Research" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      UX Research
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 11 -->
  <ui-card data-categories="packaging" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" 
      alt="Retail Packaging" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
    />
    <div slot="footer" class="bg-white relative z-1 flex items-center p-4 font-medium">
      Retail Packaging
      <ui-icon name="arrow-top-right-on-square" class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all" />
    </div>
  </ui-card>
  
  <!-- Card 12 -->
  <ui-card data-categories="marketing,apps" class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer">
    <img 
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" 
      alt="Marketing Automation" 
      slot="media"
      class="group-hover:scale-105 duration-300 ease-out transition-all"
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
- **Auto-Detected Category Filtering**: Filters are automatically generated based on the `data-categories` attributes of the child elements
- **Animation**: Smooth reveal animations for grid items
- **Customizable**: Configurable number of columns and internationalization options

## Usage

Basic usage with auto-detected categories:

```html
<ui-gallery>
  <ui-card data-categories="design,marketing">
    <!-- Card content -->
  </ui-card>
  <ui-card data-categories="apps">
    <!-- Card content -->
  </ui-card>
</ui-gallery>
```

With internationalized "All" label:

```html
<ui-gallery allLabel="Todos">
  <!-- Cards with data-categories -->
</ui-gallery>
```

## Properties

| Property   | Type   | Default | Description                                 |
| ---------- | ------ | ------- | ------------------------------------------- |
| `columns`  | Number | `2`     | Number of columns to display on desktop     |
| `allLabel` | String | `'All'` | Text to display for the "All" filter button |

## Using with Card Components

Each child element should have a `data-categories` attribute containing a comma-separated list of categories:

```html
<ui-card data-categories="design,marketing">
  <!-- Content -->
</ui-card>
```

The component will automatically extract these categories and create filter buttons for them.

## Animation

The component uses the Motion API for animations, applying staggered reveal animations to grid items:

```js
animate(
  visibleItems,
  { opacity: [0, 1], scale: [0.8, 1] },
  { delay: stagger(0.05, { ease: [0.4, 0.0, 0.2, 1] }) }
);
```

## Internationalization

You can customize the "All" filter button text for different languages:

```html
<!-- Spanish -->
<ui-gallery allLabel="Todos"></ui-gallery>

<!-- French -->
<ui-gallery allLabel="Tous"></ui-gallery>

<!-- German -->
<ui-gallery allLabel="Alle"></ui-gallery>
```

For use with Drupal's translation system:

```html
<ui-gallery allLabel="${Drupal.t('All')}"></ui-gallery>
```

## CSS Customization

The component uses Tailwind CSS classes internally. You can override styles using standard CSS selectors or by modifying the component's internal styles.

## Responsive Behavior

The component is built with a mobile-first approach:

- Mobile: 1 column
- Tablet (sm): 2 columns
- Medium screens (md): Variable columns based on config
- Large screens (lg): Variable columns based on config

## Browser Support

This component uses modern web features:

- Custom Elements (Web Components)
- CSS Grid
- ES6+ features
- Motion API for animations

For older browsers, polyfills may be required.

## Implementation Notes

- The component auto-detects categories from child elements
- Filter labels are automatically formatted with proper capitalization
- No lazy loading logic is included in the component; use native `loading="lazy"` on images
- The component avoids re-creating DOM elements when filtering, instead toggling class names for better performance
