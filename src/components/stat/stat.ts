import { html, css, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { animate, inView } from 'motion';
import clsx from 'clsx';
import { safeCustomElement } from '../registry';
import styles from '../text/text.css?raw';
import { UIText, variantClasses } from '../text/text';

@safeCustomElement('ui-stat')
export class UIStat extends UIText {
  @property({ type: Number }) start = 0;
  @property({ type: Number }) end = 0;
  @property({ type: Number }) duration = 2;
  @property({ type: Number }) delay = 0;
  @query('.counter') private counter?: HTMLElement;

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  firstUpdated(): void {
    inView(this, () => {
      // Animate in (Number Count Up)
      animate(Number(this.start), Number(this.end), {
        delay: Number(this.delay),
        duration: Number(this.duration),
        ease: 'circOut',
        onUpdate: (latest) => {
          if (this.counter) {
            this.counter.innerHTML = `${Math.round(latest)}`;
          }
        }
      });

      return () => {
        // Animate out
        // Cleanup function required by inView()
      };
    });
  }

  render() {
    const classes = clsx('counter', variantClasses[this.variant]);
    return html`
      <div class="flex items-center">
        <slot name="prefix"></slot>
        <span class="${classes}">${this.end}</span>
        <slot name="suffix"></slot>
      </div>
    `;
  }
}
