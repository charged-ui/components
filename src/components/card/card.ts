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
        class="flex flex-col bg-white border border-solid border-neutral-200 rounded-xl relative overflow-hidden shadow-sm"
      >
        <slot name="media"></slot>
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }
}
