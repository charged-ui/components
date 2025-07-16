import { LitElement, html, css, CSSResultGroup, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import styles from './ripple.css?raw';

@customElement('ui-bg-ripple')
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
      --ripple-bg-color: oklch(55.2% 0.016 285.938 / 0.25); /* gray-900/25 */
      --ripple-border-color: oklch(55.1% 0.027 264.364); /* gray-300 */
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
    'ripple-component': RippleBackground;
  }
}

// import { LitElement, html, css, CSSResultGroup } from 'lit';
// import { customElement, property } from 'lit/decorators.js';
// import { styleMap } from 'lit/directives/style-map.js';
// import { repeat } from 'lit/directives/repeat.js';

// @customElement('ui-bg-ripple')
// export class RippleBackground extends LitElement {
//   @property({ type: Number })
//   mainCircleSize = 210;

//   @property({ type: Number })
//   mainCircleOpacity = 0.24;

//   @property({ type: Number })
//   numCircles = 8;

//   @property({ type: String })
//   className = '';

//   static styles: CSSResultGroup = css`
//     :host {
//       display: block;
//     }

//     .ripple-container {
//       pointer-events: none;
//       position: absolute;
//       inset: 0;
//       user-select: none;
//       mask-image: linear-gradient(to bottom, white, transparent);
//     }

//     .ripple-circle {
//       position: absolute;
//       border-radius: 50%;
//       border: 1px solid;
//       background: rgba(var(--foreground-rgb, 0, 0, 0), 0.25);
//       box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%) scale(1);
//       animation: ripple 3.4s ease-out infinite;
//     }

//     @keyframes ripple {
//       0%,
//       100% {
//         transform: translate(-50%, -50%) scale(1);
//       }
//       50% {
//         transform: translate(-50%, -50%) scale(1.06);
//       }
//     }
//   `;

//   private generateCircles() {
//     return Array.from({ length: this.numCircles }, (_, i) => {
//       const size = this.mainCircleSize + i * 70;
//       const opacity = this.mainCircleOpacity - i * 0.03;
//       const animationDelay = `${i * 0.06}s`;

//       const styles = {
//         width: `${size}px`,
//         height: `${size}px`,
//         opacity: opacity.toString(),
//         animationDelay,
//         borderColor: 'var(--foreground, #000)',
//         '--i': i.toString()
//       };

//       return { id: i, styles };
//     });
//   }

//   render() {
//     const circles = this.generateCircles();

//     return html`
//       <div class="ripple-container ${this.className}">
//         ${repeat(
//           circles,
//           (circle) => circle.id,
//           (circle) => html`
//             <div class="ripple-circle" style=${styleMap(circle.styles)}></div>
//           `
//         )}
//       </div>
//     `;
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'ripple-component': RippleBackground;
//   }
// }
