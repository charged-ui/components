import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { chargedCustomElement } from '../registry';
import '../icon';
import './icon-selector.css';
import flattenedHeroicons from './heroicons-flattened.json';

interface HeroIcon {
  name: string;
  size: number;
  style: string;
  path: string;
  filename: string;
}

export type IconSelectorProps = {
  selectedIcon?: string;
  size?: number;
  variant?: string;
} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-icon-selector')
export class UIIconSelector extends LitElement {
  @property({ type: Array }) icons: HeroIcon[] = [];
  @property({ type: String }) selectedIcon: string = '';
  @property({ type: Number }) size: number = 24;
  @property({ type: String }) variant: string = 'outline';
  @state() private searchQuery: string = '';
  @state() private filteredIcons: HeroIcon[] = [];
  @property({ type: Boolean }) modalOpen = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .wrapper {
      background-color: white;
    }

    .controls {
      padding: 1rem;
      border-bottom: 1px solid rgb(228 228 231);
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .search-input {
      border: 1px solid rgb(228 228 231);
      border-radius: 0.5rem;
      padding: 0 0.5rem;
      height: 2rem;
      outline: none;
      font-size: 0.875rem;
    }

    .variant-select {
      border: 1px solid rgb(228 228 231);
      border-radius: 0.5rem;
      padding: 0 0.5rem;
      height: 2.25rem;
      font-size: 0.875rem;
    }

    .icon-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem;
      justify-content: center;
      max-height: 24rem;
      overflow: auto;
    }

    .icon-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border: 1px dashed rgb(228 228 231);
      border-radius: 0.75rem;
      cursor: pointer;
    }

    .icon-cell:hover {
      background-color: rgb(209 250 229);
    }
  `;

  constructor() {
    super();
    this.filterIcons();
  }

  filterIcons(): void {
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
    this.modalOpen = false;
    this.dispatchEvent(
      new CustomEvent('icon-selected', {
        detail: { name: iconName, size: this.size, variant: this.variant },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="controls">
          <input
            class="search-input"
            type="text"
            placeholder="Search for an icon"
            @input=${this.handleSearch}
            .value=${this.searchQuery}
          />
          <select
            class="variant-select"
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
        <div class="icon-grid">
          ${this.filteredIcons.map(
            (icon) =>
              html`<div
                class="icon-cell"
                @click=${() => this.handleIconSelect(icon.name)}
              >
                <ui-icon name="${icon.name}" variant="${this.variant}"></ui-icon>
              </div>`
          )}
        </div>
      </div>
    `;
  }
}
