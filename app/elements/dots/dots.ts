import { LitElement, html, css } from 'lit';
import { chargedCustomElement } from '../registry';
import './dots.css';

export type DotsProps = React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-bg-dots')
export class DotsBackground extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;

      --dot-bg-color: white;
      --dot-pattern-color: #d4d4d4;
      --dot-mask-bg-color: white;
    }

    :host(.dark) {
      --dot-bg-color: black;
      --dot-pattern-color: #404040;
      --dot-mask-bg-color: black;
    }

    .container {
      background-color: var(--dot-bg-color);
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .ui-bg-dots-pattern {
      background-size: 20px 20px;
      background-image: radial-gradient(
        var(--dot-pattern-color) 1px,
        transparent 1px
      );
      position: absolute;
      inset: 0;
    }

    .dot-mask-gradient {
      background-color: var(--dot-mask-bg-color);
      mask-image: radial-gradient(ellipse at center, transparent 20%, black);
      pointer-events: none;
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::slotted(*) {
      position: relative;
      z-index: 20;
    }
  `;

  render() {
    return html`
      <div class="container">
        <div class="ui-bg-dots-pattern"></div>
        <div class="dot-mask-gradient"></div>
        <slot></slot>
      </div>
    `;
  }
}
