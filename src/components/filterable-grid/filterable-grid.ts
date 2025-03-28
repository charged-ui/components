import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { animate, stagger } from 'motion';
import styles from './filterable-grid.css?raw';

interface FilterItem {
  id: string;
  label: string;
}

interface GridItem {
  id: number;
  title: string;
  description: string;
  category: string;
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

    .grid-item.hidden {
      height: 0;
      margin: 0;
      padding: 0;
      overflow: hidden;
      visibility: hidden;
      position: absolute;
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
      category: 'design',
      image: 'https://placehold.co/300x200'
    },
    {
      id: 2,
      title: 'Mobile App',
      description: 'iOS and Android fitness app',
      category: 'apps',
      image: 'https://placehold.co/300x200'
    },
    {
      id: 3,
      title: 'Campaign Strategy',
      description: 'Q4 product launch campaign',
      category: 'marketing',
      image: 'https://placehold.co/300x200'
    },
    {
      id: 4,
      title: 'Sustainable Packaging',
      description: 'Eco-friendly product packaging',
      category: 'packaging',
      image: 'https://placehold.co/300x200'
    },
    {
      id: 5,
      title: 'Web Design',
      description: 'E-commerce website redesign',
      category: 'design',
      image: 'https://placehold.co/300x200'
    },
    {
      id: 6,
      title: 'Social Media Kit',
      description: 'Content templates for Instagram',
      category: 'marketing',
      image: 'https://placehold.co/300x200'
    },
    {
      id: 7,
      title: 'Dashboard UI',
      description: 'Analytics dashboard interface',
      category: 'design',
      image: 'https://placehold.co/300x200'
    },
    {
      id: 8,
      title: 'Plugin Development',
      description: 'Shopify integration tool',
      category: 'apps',
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
        this.activeFilter === 'all' || item.category === this.activeFilter
    );
  }

  // Instead of filtering items in the template, we'll keep all items
  // in the DOM and just hide/show them with CSS
  shouldItemBeVisible(category: string): boolean {
    return this.activeFilter === 'all' || category === this.activeFilter;
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

  render() {
    const hasVisibleItems = this.visibleItems.length > 0;

    return html`
      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-2 mb-8">
        ${this.filters.map(
          (filter) => html`
            <button
              @click=${() => this.setFilter(filter.id)}
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors ${this
                .activeFilter === filter.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}"
            >
              ${filter.label}
            </button>
          `
        )}
      </div>

      <!-- Grid with all items, hide/show with class -->
      <div class="${this.gridClasses}">
        ${this.items.map(
          (item) => html`
            <div
              class="grid-item bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg ${!this.shouldItemBeVisible(
                item.category
              )
                ? 'hidden'
                : ''}"
              data-item-id="${item.id}"
              data-category="${item.category}"
            >
              <div class="relative w-full h-48 bg-gray-200">
                <img
                  class="lazy-image w-full h-48 object-cover absolute inset-0 transition-opacity duration-500 ease-in"
                  data-src=${item.image}
                  alt=${item.title}
                />
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold mb-1">${item.title}</h3>
                <p class="text-gray-600 text-sm">${item.description}</p>
                <span
                  class="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  ${item.category}
                </span>
              </div>
            </div>
          `
        )}
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
