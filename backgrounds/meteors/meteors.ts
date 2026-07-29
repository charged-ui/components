import { LitElement, html, css } from 'lit';
import type { PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { chargedCustomElement } from '../../registry';
import './meteors.css';

interface MeteorStyle {
  angle: string;
  top: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

export interface UIMeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
}

export type MeteorsProps = UIMeteorsProps & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-bg-meteors')
export class MeteorsComponent extends LitElement {
  @property({ type: Number }) number = 20;
  @property({ type: Number }) minDelay = 0.2;
  @property({ type: Number }) maxDelay = 1.2;
  @property({ type: Number }) minDuration = 2;
  @property({ type: Number }) maxDuration = 10;
  @property({ type: Number }) angle = 60;

  @state() private meteorStyles: MeteorStyle[] = [];

  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
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
      pointer-events: none;
      position: absolute;
      width: 0.125rem;
      height: 0.125rem;
      border-radius: 9999px;
      background-color: rgb(113 113 122);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
    }

    .meteor-tail {
      pointer-events: none;
      position: absolute;
      top: 50%;
      z-index: -10;
      height: 1px;
      width: 3rem;
      transform: translateY(-50%);
      background: linear-gradient(to right, rgb(113 113 122), transparent);
    }

    .content-slot {
      position: relative;
      z-index: 1;
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
        animationDuration: `${Math.floor(Math.random() * (this.maxDuration - this.minDuration) + this.minDuration)}s`,
      });
    }

    this.meteorStyles = styles;
  }

  render() {
    return html`
      <div aria-hidden="true">
        ${this.meteorStyles.map(
          (style) => html`
            <span
              class="meteor"
            style="
              --angle: ${style.angle};
              top: ${style.top};
              left: ${style.left};
              animation-delay: ${style.animationDelay};
              animation-duration: ${style.animationDuration};
              transform: rotate(var(--angle));
            "
          >
            <div class="meteor-tail"></div>
            </span>
          `,
        )}
      </div>
      <div class="content-slot">
        <slot></slot>
      </div>
    `;
  }
}
