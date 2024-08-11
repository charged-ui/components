import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-card')
export class UICard extends LitElement {
  @property({ type: String }) heading: string = '';
  @property({ type: String }) subheading: string = '';

  render() {
    return html`<div>Card</div>`;
  }
}
