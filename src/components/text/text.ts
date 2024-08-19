import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './text.css?raw';

@customElement('ui-text')
export class UIText extends LitElement {
  @property({ type: String }) value: string = '';

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`<div>Text</div>`;
  }
}
