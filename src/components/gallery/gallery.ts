import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { animate, stagger } from 'motion';
import styles from './gallery.css?raw';

import '../button/button';

type FilterItem = { id: string; label: string };

@customElement('ui-gallery')
export class UIGallery extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: Number })
  columns = 2;

  @property({ type: String })
  allLabel?: string;

  @state()
  activeFilter = 'all';

  @state()
  private filters: FilterItem[] = [];

  get gridClasses(): string {
    return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols- lg:grid-cols-2 gap-6`;
  }

  detectFiltersFromChildren(): void {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const allCategories = new Set<string>();

    // Collect all unique categories from children
    slot.assignedElements().forEach((child) => {
      const categories =
        child.getAttribute('data-categories')?.split(',') || [];
      categories.forEach((category) => {
        const trimmed = category.trim();
        if (trimmed) allCategories.add(trimmed);
      });
    });

    // Create filter items from unique categories
    this.filters = [
      { id: 'all', label: this.allLabel ?? 'All' },
      ...Array.from(allCategories)
        .sort()
        .map((category) => ({
          id: category,
          label: this.formatCategoryLabel(category)
        }))
    ];
  }

  formatCategoryLabel(category: string): string {
    // Convert category ID to title case with spaces preserved
    return category
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  setFilter(filterId: string): void {
    this.activeFilter = filterId;
    this.updateComplete.then(() => {
      this.updateVisibility();
      this.animateItems();
    });
  }

  updateVisibility(): void {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;

    slot.assignedElements().forEach((child) => {
      const categories =
        child
          .getAttribute('data-categories')
          ?.split(',')
          .map((c) => c.trim()) || [];
      const visible =
        this.activeFilter === 'all' || categories.includes(this.activeFilter);

      child.classList.toggle('hidden', !visible);
      child.classList.toggle('grid-item', visible);
    });
  }

  animateItems(): void {
    const visibleItems = this.shadowRoot
      ?.querySelector('slot')
      ?.assignedElements()
      .filter((el) => !el.classList.contains('hidden'));

    if (!visibleItems?.length) return;

    animate(
      visibleItems,
      { opacity: [0, 1], scale: [0.8, 1] },
      { delay: stagger(0.05, { ease: [0.4, 0.0, 0.2, 1] }) }
    );
  }

  handleSlotChange(): void {
    this.detectFiltersFromChildren();
    this.updateVisibility();
    this.animateItems();
  }

  firstUpdated(): void {
    this.detectFiltersFromChildren();
    this.updateVisibility();
    this.animateItems();
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('activeFilter')) {
      this.updateVisibility();
    }
    if (changedProperties.has('allLabel')) {
      this.detectFiltersFromChildren();
    }
  }

  render() {
    return html`
      ${this.filters.length > 1
        ? html`
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
          `
        : ''}

      <div class="${this.gridClasses}">
        <slot @slotchange=${() => this.handleSlotChange()}></slot>
      </div>
    `;
  }
}
