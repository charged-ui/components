import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-card')
export class UICard extends LitElement {
  @property({ type: String }) variant?: string;

  render() {
    return html`
      <link rel="stylesheet" href="./card.css" />
      <div class="bg-white border-solid border-zinc-100 rounded-xl p-8">
        <slot name="one"></slot>
        <slot name="two"></slot>
      </div>
    `;
  }
}
