import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './icon-selector.css?raw';
import '../icon/icon';

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

@customElement('ui-icon-selector')
export class UIIconSelector extends LitElement {
  @property({ type: Array }) icons: HeroIcon[] = [];
  @property({ type: String }) selectedIcon: string = '';
  @property({ type: Number }) size: number = 24;
  @property({ type: String }) variant: string = 'outline';

  // Add a state property to store the loaded SVG content
  // @state() private iconSvgMap: Map<string, string> = new Map();

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
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('size') || changedProperties.has('variant')) {
      this.filterIcons();
    }
  }

  handleIconSelect(iconName: string): void {
    this.selectedIcon = iconName;
    this.dispatchEvent(
      new CustomEvent('icon-selected', {
        detail: {
          name: iconName,
          size: this.size,
          variant: this.variant,
          // path: this.getIconPath(iconName),
          svg: this.iconSvgMap.get(iconName) || null
        },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <div class="bg-white">
        <div class="p-4">
          <input type="text" />
          <select
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
          class="flex flex-wrap gap-4 p-4 justify-center max-h-96 overflow-auto"
        >
          ${this.icons.map(
            (icon) =>
              html`<div class="flex items-center justify-center w-12 h-12 border border-dashed rounded-xl hover:bg-emerald-100 cursor-pointer"><ui-icon name="${icon.name}""></ui-icon></div>`
          )}
        </div>
      </div>
    `;
  }
}
