import { LitElement, css, html, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { chargedCustomElement } from '../registry';
import clsx from 'clsx';
import styles from './combobox.css?raw';

@chargedCustomElement('ui-combobox')
export class UICombobox extends LitElement {
  @property({ type: String }) placeholder: string = 'Search for anything';
  @state() private currentFocus: number = -1;
  @state() private expanded: boolean = false;

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  handleFocus() {
    this.expanded = true;
  }

  handleBlur() {
    this.expanded = false;
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const direction = e.key === 'ArrowDown' ? 1 : -1;
      // this.currentFocus =
      //   (this.currentFocus + direction + options.length) % options.length;
      // this.updateActivedescendant();
    } else if (e.key === 'Enter' && this.currentFocus !== -1) {
      e.preventDefault();
      // if (options[this.currentFocus]) {
      //   this.handleOptionClick(options[this.currentFocus], this.currentFocus);
      // }
    } else if (e.key === 'Escape') {
      this.expanded = false;
      // this.input.blur();
      // this.requestUpdate();
    }
  }

  handleSlotChange(): void {}

  render() {
    return html`
      <div class="relative">
        <label for="combo-input" class="sr-only">Search or use commands</label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute top-3.5 left-4 h-5 w-5 text-gray-400"
          aria-hidden="true"
        >
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
          <path d="M21 21l-6 -6"></path>
        </svg>
        <input
          type="text"
          id="combo-input"
          class="h-10 pl-11 pr-4 bg-white border border-solid border-zinc-200 rounded-lg appearance-none text-sm"
          placeholder="${this.placeholder}"
          role="combobox"
          aria-expanded="${this.expanded}"
          aria-controls="combo-menu"
          aria-activedescendant=""
          aria-autocomplete="list"
          @focus="${this.handleFocus}"
          @blur="${this.handleBlur}"
          @keydown="${this.handleKeyDown}"
        />
        <ul
          id="combo-menu"
          class="${this.expanded
            ? 'absolute'
            : 'hidden'} w-full mt-2 pl-0 overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200 top-full z-10 border border-solid border-zinc-200"
          role="listbox"
          aria-label="Command options"
        >
          <slot @slotchange=${() => this.handleSlotChange()}></slot>
        </ul>
      </div>
    `;
  }
}
