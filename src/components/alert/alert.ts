import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import clsx from 'clsx';
import styles from './alert.css?raw';

// Define an enum for the variants
export enum AlertVariant {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}

@customElement('ui-alert')
export class UIAlert extends LitElement {
  @property({ type: AlertVariant }) variant: AlertVariant = AlertVariant.Info;

  static styles = css`
    ${unsafeCSS(styles)}
    :host {
      width: -webkit-fill-available;
    }
    ::slotted([slot='heading']) {
      font-weight: 600;
    }
    ::slotted([slot='message']) {
      font-size: 14px;
    }
  `;

  render() {
    const classes = clsx(
      'flex',
      'gap-2',
      'p-4',
      'border',
      'border-solid',
      'rounded-lg',
      variantClasses[this.variant]
    );

    return html`
      <div role="alert" class=${classes}>
        <slot name="icon"></slot>
        <div>
          <slot name="heading"></slot>
          <slot name="message"></slot>
        </div>
      </div>
    `;
  }
}

const variantClasses: Record<AlertVariant, string> = {
  [AlertVariant.Success]: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  [AlertVariant.Error]: 'bg-red-50 border-red-200 text-red-700',
  [AlertVariant.Warning]: 'bg-orange-50 border-orange-200 text-orange-700',
  [AlertVariant.Info]: 'bg-sky-50 border-sky-200 text-sky-700'
};
