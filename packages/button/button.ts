import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './button.css';

@customElement('ui-button')
export class MyButton extends LitElement {
  render() {
    return html`<p>Hello from my template.</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-button': MyButton;
  }
}
