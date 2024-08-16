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
      <div class="bg-white border-solid border-zinc-100 rounded-xl p-8">
        <slot name="one"></slot>
        <slot name="two"></slot>
      </div>
    `;
  }
}
