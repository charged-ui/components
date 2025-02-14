import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { animate, inView } from 'motion';
import clsx from 'clsx';
import styles from './stat.css?raw';

@customElement('ui-stat')
export class UIStat extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
    :host {
      width: -webkit-fill-available;
    }
  `;

  firstUpdated(): void {
    inView(this, (element) => {
      if (element instanceof HTMLElement) {
        console.log('fade in');

        return () => console.log('fade out');
      }
    });
  }

  render() {
    const classes = clsx(
      'flex',
      'gap-2',
      'p-4',
      'border',
      'border-solid',
      'rounded-lg'
    );

    return html`
      <div class=${classes}>
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `;
  }
}
