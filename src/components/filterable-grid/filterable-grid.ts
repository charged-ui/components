import { LitElement, html, css, unsafeCSS, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { animate, stagger } from 'motion';
import styles from './filterable-grid.css?raw';

import '../button/button';
import '../card/card';
import '../icon/icon';

interface FilterItem {
  id: string;
  label: string;
}

interface GridItem {
  id: number;
  title: string;
  description: string;
  categories: string[]; // Changed from single category to an array of categories
  image: string;
}

@customElement('filterable-grid')
export class FilterableGrid extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}

    /* Add these styles to handle visibility */
    .grid-item {
      opacity: 0; /* Start hidden */
      transform: translateY(20px); /* Start offset */
      transition:
        height 0.3s,
        margin 0.3s,
        padding 0.3s;
    }
  `;

  @property({ type: Array })
  filters: FilterItem[] = [
    { id: 'all', label: 'All' },
    { id: 'design', label: 'Design' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'apps', label: 'Apps' },
    { id: 'packaging', label: 'Packaging' }
  ];

  @property({ type: Array })
  items: GridItem[] = [
    {
      id: 1,
      title: 'Brand Refresh',
      description: 'Modern rebrand for tech startup',
      categories: ['design', 'marketing'],
      image: 'https://placehold.co/300x200'
    },
    {
      id: 2,
      title: 'Mobile App',
      description: 'iOS and Android fitness app',
      categories: ['apps', 'design'],
      image: 'https://placehold.co/300x200'
    },
    {
      id: 3,
      title: 'Campaign Strategy',
      description: 'Q4 product launch campaign',
      categories: ['marketing'],
      image: 'https://placehold.co/300x200'
    },
    {
      id: 4,
      title: 'Sustainable Packaging',
      description: 'Eco-friendly product packaging',
      categories: ['packaging', 'design'],
      image: 'https://placehold.co/300x200'
    },
    {
      id: 5,
      title: 'Web Design',
      description: 'E-commerce website redesign',
      categories: ['design'],
      image: 'https://placehold.co/300x200'
    },
    {
      id: 6,
      title: 'Social Media Kit',
      description: 'Content templates for Instagram',
      categories: ['marketing', 'design'],
      image: 'https://placehold.co/300x200'
    },
    {
      id: 7,
      title: 'Dashboard UI',
      description: 'Analytics dashboard interface',
      categories: ['design', 'apps'],
      image: 'https://placehold.co/300x200'
    },
    {
      id: 8,
      title: 'Plugin Development',
      description: 'Shopify integration tool',
      categories: ['apps'],
      image: 'https://placehold.co/300x200'
    }
  ];

  @property({ type: Number })
  columns = 2;

  @state()
  activeFilter = 'all';

  private observer: IntersectionObserver | null = null;

  constructor() {
    super();
  }

  // Helper function to determine visible items
  get visibleItems(): GridItem[] {
    return this.items.filter(
      (item) =>
        this.activeFilter === 'all' ||
        item.categories.includes(this.activeFilter)
    );
  }

  // Instead of filtering items in the template, we'll keep all items
  // in the DOM and just hide/show them with CSS
  shouldItemBeVisible(categories: string[]): boolean {
    return (
      this.activeFilter === 'all' || categories.includes(this.activeFilter)
    );
  }

  // Get the appropriate grid classes based on column count
  get gridClasses(): string {
    return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${Math.min(this.columns, 4)} lg:grid-cols-${this.columns} gap-6`;
  }

  setFilter(filterId: string): void {
    this.activeFilter = filterId;
    // After DOM updates, apply animations
    this.updateComplete.then(() => {
      this.animateItems();
      this.setupLazyLoading();
    });
  }

  animateItems(): void {
    // Get all visible grid items in shadow DOM
    const gridItems = this.shadowRoot?.querySelectorAll(
      '.grid-item:not(.hidden)'
    );

    if (!gridItems || gridItems.length === 0) return;

    // Use stagger for animation delays
    animate(
      gridItems,
      { opacity: [0, 1], scale: [0.8, 1] },
      {
        delay: stagger(0.05, {
          ease: [0.4, 0.0, 0.2, 1] // Easing applied to the staggered delay timing
        })
      }
    );
  }

  setupLazyLoading(): void {
    // Same as before
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
      },
      {
        rootMargin: '200px',
        threshold: 0
      }
    );

    this.updateComplete.then(() => {
      const lazyImages = this.shadowRoot?.querySelectorAll('img[data-src]');
      if (lazyImages) {
        lazyImages.forEach((img) => this.observer?.observe(img));
      }
    });
  }

  firstUpdated(): void {
    this.animateItems();
    this.setupLazyLoading();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  updated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ) {
    super.updated(changedProperties);
    if (changedProperties.has('activeFilter')) {
      // Force a re-render when the activeFilter changes to ensure visibility is updated
      this.requestUpdate();
    }
  }

  render() {
    const hasVisibleItems = this.visibleItems.length > 0;

    return html`
      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-2 mb-8">
        ${this.filters.map(
          (filter) => html`
            <ui-button
              @click=${() => this.setFilter(filter.id)}
              size="small"
              variant=${this.activeFilter === filter.id
                ? 'primary'
                : 'secondary'}
              shape="rounded"
            >
              <div slot="value">${filter.label}</div>
            </ui-button>
          `
        )}
      </div>

      <!-- Grid with all items, hide/show with class -->
      <div class="${this.gridClasses}">
        ${this.items.map((item) => {
          const isVisible = this.shouldItemBeVisible(item.categories);
          return html`
            <ui-card
              class="grid-item transition-all group cursor-pointer ${isVisible
                ? ''
                : 'hidden'}"
              data-item-id="${item.id}"
              data-categories="${item.categories.join(',')}"
            >
              <!-- Image with rounded corners -->
              <img
                class="lazy-image group-hover:scale-105 duration-500 transition-all"
                data-src=${item.image}
                alt=${item.title}
                slot="media"
              />
              <div
                slot="footer"
                class="bg-white relative z-1 flex items-center p-4 font-medium"
              >
                ${item.title}
                <ui-icon
                  name="arrow-top-right-on-square"
                  class="ml-auto opacity-0 group-hover:opacity-100 duration-500 transition-all"
                />
              </div>
            </ui-card>
          `;
        })}
      </div>

      ${!hasVisibleItems
        ? html`
            <div class="text-center py-12 text-gray-500">
              No items found for this filter.
            </div>
          `
        : ''}
    `;
  }
}
