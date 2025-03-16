import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property } from 'lit/decorators.js';

export class AuroraBackground extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--background-color, #ffffff);
      color: var(--text-color, #000000);
    }

    .aurora {
      position: absolute;
      inset: -10px;
      opacity: 0.5;
      pointer-events: none;
      will-change: transform;
      filter: blur(10px);
      z-index: 1; /* Ensure the aurora is above the background */
    }

    .aurora::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: var(--white-gradient), var(--aurora-gradient);
      background-size: 300%, 200%;
      background-position:
        50% 50%,
        50% 50%;
      animation: aurora-animation 60s linear infinite;
      background-attachment: fixed;
      mix-blend-mode: difference;
    }

    .dark .aurora {
      filter: blur(10px);
    }

    .dark .aurora::after {
      background-image: var(--dark-gradient), var(--aurora-gradient);
    }

    .radial-mask .aurora::after {
      -webkit-mask-image: radial-gradient(
        ellipse at 100% 0%,
        black 10%,
        transparent 70%
      );
      mask-image: radial-gradient(
        ellipse at 100% 0%,
        black 10%,
        transparent 70%
      );
    }

    @keyframes aurora-animation {
      from {
        background-position:
          50% 50%,
          50% 50%;
      }
      to {
        background-position:
          350% 50%,
          350% 50%;
      }
    }
  `;

  @property({ type: Boolean }) showRadialGradient = true;
  @property({ type: Boolean }) darkMode = false;

  render() {
    const classes = {
      aurora: true,
      'radial-mask': this.showRadialGradient,
      dark: this.darkMode
    };

    return html`
      <style>
        :host {
          --white: white;
          --black: black;
          --transparent: transparent;

          /* Tailwind Colors */
          --blue-500: #3b82f6;
          --indigo-300: #a5b4fc;
          --blue-300: #93c5fd;
          --violet-200: #c4b5fd;
          --blue-400: #60a5fa;

          --white-gradient: repeating-linear-gradient(
            100deg,
            var(--white) 0%,
            var(--white) 7%,
            var(--transparent) 10%,
            var(--transparent) 12%,
            var(--white) 16%
          );

          --dark-gradient: repeating-linear-gradient(
            100deg,
            var(--black) 0%,
            var(--black) 7%,
            var(--transparent) 10%,
            var(--transparent) 12%,
            var(--black) 16%
          );

          --aurora-gradient: repeating-linear-gradient(
            100deg,
            var(--blue-500) 10%,
            var(--indigo-300) 15%,
            var(--blue-300) 20%,
            var(--violet-200) 25%,
            var(--blue-400) 30%
          );
        }
      </style>
      <div class="container">
        <div class=${classMap(classes)}>
          <div class="aurora"></div>
        </div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('aurora-background', AuroraBackground);
