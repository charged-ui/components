import { LitElement, html, css } from 'lit';
import { property, query } from 'lit/decorators.js';
import { animate, inView } from 'motion';
import { chargedCustomElement } from '../registry';
import './stat.css';

export type StatProps = {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  variant?: string;
} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-stat')
export class UIStat extends LitElement {
  @property({ type: Number }) start = 0;
  @property({ type: Number }) end = 0;
  @property({ type: Number }) duration = 2;
  @property({ type: Number }) delay = 0;
  @property({ type: String, reflect: true }) variant = '';

  @query('.counter') private counter?: HTMLElement;

  static styles = css`
    :host {
      display: inline-block;
    }

    .wrapper {
      display: flex;
      align-items: center;
    }

    .counter {
      font-weight: 600;
      letter-spacing: -0.025em;
    }

    /* Heading variants */
    :host([variant='heading-1']) .counter { font-size: 4.5rem; }
    :host([variant='heading-2']) .counter { font-size: 3.75rem; }
    :host([variant='heading-3']) .counter { font-size: 3rem; }
    :host([variant='heading-4']) .counter { font-size: 2.25rem; }
    :host([variant='heading-5']) .counter { font-size: 1.875rem; }
    :host([variant='heading-6']) .counter { font-size: 1.5rem; }

    /* Display variants */
    :host([variant='display-1']) .counter { font-size: 4.5rem; font-weight: 300; }
    :host([variant='display-2']) .counter { font-size: 3.75rem; font-weight: 300; }
    :host([variant='display-3']) .counter { font-size: 3rem; font-weight: 300; }
    :host([variant='display-4']) .counter { font-size: 2.25rem; font-weight: 300; }
    :host([variant='display-5']) .counter { font-size: 1.875rem; font-weight: 300; }
    :host([variant='display-6']) .counter { font-size: 1.5rem; font-weight: 300; }

    /* Copy variants */
    :host([variant='copy-xl']) .counter { font-size: 1.25rem; font-weight: 500; }
    :host([variant='copy-lg']) .counter { font-size: 1.125rem; font-weight: 500; }
    :host([variant='copy-md']) .counter { font-size: 1rem; font-weight: 500; }
    :host([variant='copy-sm']) .counter { font-size: 0.875rem; font-weight: 500; }
    :host([variant='copy-xs']) .counter { font-size: 0.75rem; font-weight: 500; }
  `;

  firstUpdated(): void {
    inView(this, () => {
      animate(Number(this.start), Number(this.end), {
        delay: Number(this.delay),
        duration: Number(this.duration),
        ease: 'circOut',
        onUpdate: (latest) => {
          if (this.counter) {
            this.counter.innerHTML = `${Math.round(latest)}`;
          }
        },
      });

      return () => {};
    });
  }

  render() {
    return html`
      <div class="wrapper">
        <slot name="prefix"></slot>
        <span class="counter">${this.end}</span>
        <slot name="suffix"></slot>
      </div>
    `;
  }
}
