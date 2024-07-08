import { LitElement, html, css } from 'lit';

class ChargedTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: var(--another-component-bg-color, lightgrey);
    }
  `;

  render() {
    return html`<div>Tabs</div>`;
  }
}

customElements.define('ui-tabs', ChargedTabs);
