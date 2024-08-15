import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-card')
export class UICard extends LitElement {
  @property({ type: String }) variant?: string;

  render() {
    return html`
      <link rel="stylesheet" href="./card.css" />
      <div class="text-xl font-bold bg-yellow-100">
        <slot name="one"></slot>
        <slot name="two"></slot>
      </div>
    `;
  }
}
