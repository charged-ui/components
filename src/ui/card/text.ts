import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-text')
export class UIText extends LitElement {
  @property({ type: String }) value: string = '';

  render() {
    return html`<div>Card</div>`;
  }
}
