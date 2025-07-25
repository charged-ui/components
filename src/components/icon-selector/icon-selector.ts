import { LitElement, html, css, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { safeCustomElement } from '../registry';
import styles from './icon-selector.css?raw';

// Define interface for icon objects
interface HeroIcon {
  name: string;
  size: number;
  style: string;
  path: string;
  filename: string;
}

// Create a type declaration for the JSON import
import flattenedHeroicons from './heroicons-flattened.json';

@safeCustomElement('ui-icon-selector')
export class UIIconSelector extends LitElement {
  @property({ type: Array }) icons: HeroIcon[] = [];
  @property({ type: String }) selectedIcon: string = '';
  @property({ type: Number }) size: number = 24;
  @property({ type: String }) variant: string = 'outline';
  @state() private searchQuery: string = '';
  @state() private filteredIcons: HeroIcon[] = [];
  @property({ type: Boolean })
  modalOpen = false;

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  // Handle the modal close event
  handleModalClose() {
    this.modalOpen = false;
  }

  static styles = css`
    :host {
      width: 100%;
    }
    ${unsafeCSS(styles)}
  `;

  constructor() {
    super();
    this.filterIcons();
  }

  filterIcons(): void {
    // Filter icons based on the selected size and variant
    this.icons = (flattenedHeroicons as HeroIcon[]).filter(
      (icon) => icon.size === this.size && icon.style === this.variant
    );
    this.applySearchFilter();
  }

  applySearchFilter(): void {
    if (!this.searchQuery) {
      this.filteredIcons = this.icons;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredIcons = this.icons.filter((icon) =>
        icon.name.toLowerCase().includes(query)
      );
    }
  }

  handleSearch(e: Event): void {
    this.searchQuery = (e.target as HTMLInputElement).value;
    this.applySearchFilter();
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('size') || changedProperties.has('variant')) {
      this.filterIcons();
    }
  }

  handleIconSelect(iconName: string): void {
    this.selectedIcon = iconName;
    this.closeModal(); // Close modal when icon is selected
    this.dispatchEvent(
      new CustomEvent('icon-selected', {
        detail: {
          name: iconName,
          size: this.size,
          variant: this.variant
          // path: this.getIconPath(iconName),
          // svg: this.iconSvgMap.get(iconName) || null
        },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <div class="bg-white divide-y divide-y-solid divide-zinc-200">
        <div class="p-4">
          <input
            class="border border-solid rounded-lg border-zinc-200 px-2 h-8"
            type="text"
            placeholder="Search for an icon"
            @input=${this.handleSearch}
            .value=${this.searchQuery}
          />
          <select
            class="border-zinc-200 rounded-lg px-2 h-9"
            @change=${(e: Event) =>
              (this.variant = (e.target as HTMLSelectElement).value)}
          >
            <option value="outline" ?selected=${this.variant === 'outline'}>
              Outline
            </option>
            <option value="solid" ?selected=${this.variant === 'solid'}>
              Solid
            </option>
          </select>
        </div>

        <div
          class="flex flex-wrap gap-4 p-4 justify-center max-h-96 overflow-auto border-t border-zinc-200"
        >
          ${this.filteredIcons.map(
            (icon) =>
              html`<div
                class="flex items-center justify-center w-12 h-12 border border-dashed border-zinc-200 rounded-xl hover:bg-emerald-100 cursor-pointer"
                @click=${() => this.handleIconSelect(icon.name)}
              >
                <ui-icon name="${icon.name}" variant="${this.variant}" />
              </div>`
          )}
        </div>
      </div>
    `;
  }
}
