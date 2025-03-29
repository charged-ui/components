import { LitElement, html, css, unsafeCSS, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { animate, stagger } from 'motion';
import styles from './gallery.css?raw';

import '../button/button';
import '../card/card';
import '../icon/icon';

interface FilterItem {
  id: string;
  label: string;
}

@customElement('ui-gallery')
export class UIGallery extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}

    .grid-item {
      opacity: 0; /* Start hidden */
      transform: translateY(20px); /* Start offset */
      transition:
        height 0.3s,
        margin 0.3s,
        padding 0.3s;
    }

    ::slotted(*) {
      display: block;
      transition: all 0.3s ease;
    }

    ::slotted(.hidden) {
      display: none !important;
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

  @property({ type: Number })
  columns = 2;

  @state()
  activeFilter = 'all';

  private observer: IntersectionObserver | null = null;
  private slottedChildren: Element[] = [];

  constructor() {
    super();
  }

  // Get the appropriate grid classes based on column count
  get gridClasses(): string {
    return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols- lg:grid-cols-2 gap-6`;
  }

  setFilter(filterId: string): void {
    this.activeFilter = filterId;
    // After DOM updates, apply animations
    this.updateComplete.then(() => {
      this.updateVisibleItems();
      this.animateItems();
      this.setupLazyLoading();
    });
  }

  updateVisibleItems(): void {
    // Get all slotted children
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;

    this.slottedChildren = slot.assignedElements();

    // Update visibility based on categories
    this.slottedChildren.forEach((child) => {
      const categories =
        child.getAttribute('data-categories')?.split(',') || [];
      const shouldBeVisible =
        this.activeFilter === 'all' || categories.includes(this.activeFilter);

      if (shouldBeVisible) {
        child.classList.remove('hidden');
        child.classList.add('grid-item');
      } else {
        child.classList.add('hidden');
        child.classList.remove('grid-item');
      }
    });
  }

  animateItems(): void {
    // Get all visible grid items
    const gridItems = this.shadowRoot
      ?.querySelector('slot')
      ?.assignedElements()
      .filter((el) => !el.classList.contains('hidden'));

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
        rootMargin: '0px',
        threshold: 0
      }
    );

    // Find all lazy images in slotted content
    this.slottedChildren.forEach((child) => {
      const lazyImages = child.querySelectorAll('img[data-src]');
      if (lazyImages) {
        lazyImages.forEach((img) => this.observer?.observe(img));
      }
    });
  }

  firstUpdated(): void {
    this.updateVisibleItems();
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
      this.updateVisibleItems();
    }
  }

  render() {
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

      <!-- Grid with slotted items -->
      <div class="${this.gridClasses}">
        <slot
          @slotchange=${() => {
            this.updateVisibleItems();
            this.animateItems();
            this.setupLazyLoading();
          }}
        ></slot>
      </div>
    `;
  }
}
