import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './card.css?raw';

@customElement('ui-card')
export class UICard extends LitElement {
  @property({ type: String }) variant?: string;

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`
      <div
        class="bg-white border border-solid border-gray-200 rounded-xl inline-flex flex-col relative overflow-hidden shadow-sm"
      >
        <slot name="media"></slot>
        <div class="p-8">
          <slot name="header"></slot>
          <slot name="body"></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    `;
  }
}
