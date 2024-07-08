import { LitElement, html, css } from 'lit';

class ChargedAccordion extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      color: var(--my-component-text-color, black);
    }
  `;

  render() {
    return html`<div>Accordion</div>`;
  }
}

customElements.define('ui-accordion', ChargedAccordion);
