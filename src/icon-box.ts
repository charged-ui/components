import { LitElement, html, css } from 'lit';

class ChargedIconBox extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: var(--another-component-bg-color, lightgrey);
    }
  `;

  render() {
    return html`<div>Icon Box</div>`;
  }
}

customElements.define('ui-icon-box', ChargedIconBox);
