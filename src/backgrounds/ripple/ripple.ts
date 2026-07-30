import { LitElement, html, css } from 'lit';
import type { CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { chargedCustomElement } from '../../registry';
import './ripple.css';

export type RippleProps = {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-bg-ripple')
export class RippleBackground extends LitElement {
  @property({ type: Number })
  mainCircleSize = 210;

  @property({ type: Number })
  mainCircleOpacity = 0.24;

  @property({ type: Number })
  numCircles = 8;

  static styles: CSSResultGroup = css`
    :host {
      display: contents;

      --ripple-bg-color: oklch(55.2% 0.016 285.938 / 0.25);
      --ripple-border-color: oklch(55.1% 0.027 264.364);
      --ripple-animation-duration: 2s;
      --ripple-animation-timing: ease-out;
    }

    @keyframes ripple {
      0%,
      100% {
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        transform: translate(-50%, -50%) scale(1.06);
      }
    }

    .ripple-container {
      pointer-events: none;
      position: absolute;
      inset: 0;
      user-select: none;
      mask-image: linear-gradient(to bottom, white, transparent);
    }

    .animate-ripple {
      animation: ripple var(--ripple-animation-duration)
        var(--ripple-animation-timing) infinite;
      background-color: var(--ripple-bg-color);
      border-color: var(--ripple-border-color);
      position: absolute;
      border-radius: 9999px;
      border: 1px solid;
      box-shadow:
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 8px 10px -6px rgba(0, 0, 0, 0.1);
    }
  `;

  private generateCircles() {
    return Array.from({ length: this.numCircles }, (_, i) => {
      const size = this.mainCircleSize + i * 70;
      const opacity = this.mainCircleOpacity - i * 0.03;
      const animationDelay = `${i * 0.06}s`;

      const styles = {
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity.toString(),
        animationDelay,
        '--i': i.toString(),
      };

      return { id: i, styles };
    });
  }

  render() {
    const circles = this.generateCircles();

    return html`
      <div class="ripple-container" aria-hidden="true">
        ${repeat(
          circles,
          (circle) => circle.id,
          (circle) => html`
            <div
              class="animate-ripple"
              style=${styleMap({
                ...circle.styles,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1)',
              })}
            ></div>
          `,
        )}
      </div>
    `;
  }
}
