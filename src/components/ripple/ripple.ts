import { LitElement, html, css, CSSResultGroup, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { chargedCustomElement } from '../registry';
import styles from './ripple.css?raw';

@chargedCustomElement('ui-bg-ripple')
export class RippleBackground extends LitElement {
  @property({ type: Number })
  mainCircleSize = 210;

  @property({ type: Number })
  mainCircleOpacity = 0.24;

  @property({ type: Number })
  numCircles = 8;

  // Minimal styles - let Tailwind handle most styling
  static styles: CSSResultGroup = css`
    ${unsafeCSS(styles)}

    :host {
      display: contents;

      /* Design tokens - default values */
      --ripple-bg-color: oklch(55.2% 0.016 285.938 / 0.25); /* gray-600/25 */
      --ripple-border-color: oklch(55.1% 0.027 264.364); /* gray-400 */
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

    .animate-ripple {
      animation: ripple var(--ripple-animation-duration)
        var(--ripple-animation-timing) infinite;
      background-color: var(--ripple-bg-color);
      border-color: var(--ripple-border-color);
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
        '--i': i.toString()
      };

      return { id: i, styles };
    });
  }

  render() {
    const circles = this.generateCircles();

    return html`
      <div
        class="pointer-events-none absolute inset-0 select-none"
        style="mask-image: linear-gradient(to bottom, white, transparent)"
      >
        ${repeat(
          circles,
          (circle) => circle.id,
          (circle) => html`
            <div
              class="absolute animate-ripple rounded-full border border-solid shadow-xl"
              style=${styleMap({
                ...circle.styles,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1)'
              })}
            ></div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-bg-ripple': RippleBackground;
  }
}
