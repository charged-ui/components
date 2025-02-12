import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './icon.css?raw';

@customElement('ui-icon')
export class UIIcon extends LitElement {
  @property({ type: String }) variant?: string;

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html` <div>Icon</div> `;
  }
}
