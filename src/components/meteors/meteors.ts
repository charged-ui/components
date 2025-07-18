import { LitElement, html, css, PropertyValues, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './meteors.css?raw';

interface MeteorStyle {
  angle: string;
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

@customElement('ui-bg-meteors')
export class MeteorsComponent extends LitElement {
  @property({ type: Number }) number = 20;
  @property({ type: Number }) minDelay = 0.2;
  @property({ type: Number }) maxDelay = 1.2;
  @property({ type: Number }) minDuration = 2;
  @property({ type: Number }) maxDuration = 10;
  @property({ type: Number }) angle = 60;

  @state() private meteorStyles: MeteorStyle[] = [];

  static styles = css`
    ${unsafeCSS(styles)}

    :host {
      display: block;
    }

    @keyframes meteor {
      0% {
        transform: rotate(var(--angle)) translateX(0);
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        transform: rotate(var(--angle)) translateX(-500px);
        opacity: 0;
      }
    }

    .meteor {
      animation: meteor linear infinite;
    }
  `;

  protected firstUpdated(): void {
    this.generateMeteorStyles();
  }

  protected updated(changedProperties: PropertyValues): void {
    if (
      changedProperties.has('number') ||
      changedProperties.has('minDelay') ||
      changedProperties.has('maxDelay') ||
      changedProperties.has('minDuration') ||
      changedProperties.has('maxDuration') ||
      changedProperties.has('angle')
    ) {
      this.generateMeteorStyles();
    }
  }

  private generateMeteorStyles(): void {
    const styles: MeteorStyle[] = [];

    for (let i = 0; i < this.number; i++) {
      styles.push({
        angle: `${-this.angle}deg`,
        top: '-5%',
        left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
        animationDelay: `${Math.random() * (this.maxDelay - this.minDelay) + this.minDelay}s`,
        animationDuration: `${Math.floor(Math.random() * (this.maxDuration - this.minDuration) + this.minDuration)}s`
      });
    }

    this.meteorStyles = styles;
  }

  render() {
    return html`
      ${this.meteorStyles.map(
        (style, idx) => html`
          <span
            class="meteor pointer-events-none absolute w-0.5 h-0.5 rounded-full bg-zinc-500 shadow-sm"
            style="
            --angle: ${style.angle};
            top: ${style.top};
            left: ${style.left};
            animation-delay: ${style.animationDelay};
            animation-duration: ${style.animationDuration};
            transform: rotate(var(--angle));
            box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
          "
          >
            <div
              class="pointer-events-none absolute top-1/2 -z-10 h-px w-12 -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent"
            ></div>
          </span>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-bg-meteors': MeteorsComponent;
  }
}
