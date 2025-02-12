import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './button.css?raw';

@customElement('ui-button')
export class UIButton extends LitElement {
  @property({ type: String }) variant?: string;

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html` <button>Button</button> `;
  }
}
