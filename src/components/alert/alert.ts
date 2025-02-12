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
  @property({ type: String }) variant: AlertVariant = AlertVariant.Info;

  static styles = css`
    :host {
      width: -webkit-fill-available;
    }
    ${unsafeCSS(styles)}
  `;

  render() {
    const classList = clsx(
      'flex',
      'p-4',
      'border',
      'border-solid',
      'rounded-lg',
      {
        'bg-sky-50 border-sky-200 text-sky-700':
          this.variant === AlertVariant.Info,
        'bg-emerald-50 border-emerald-200 text-emerald-700':
          this.variant === AlertVariant.Success,
        'bg-orange-50 border-orange-200 text-yellow-700':
          this.variant === AlertVariant.Warning,
        'bg-red-50 border-red-200 text-red-700':
          this.variant === AlertVariant.Error
      }
    );

    return html`
      <div role="alert" class=${classList}>${this.getMessage()}</div>
    `;
  }

  private getMessage() {
    switch (this.variant) {
      case AlertVariant.Success:
        return 'Success! Operation completed successfully.';
      case AlertVariant.Error:
        return 'Error! Something went wrong.';
      case AlertVariant.Warning:
        return 'Warning! Please be cautious.';
      case AlertVariant.Info:
      default:
        return 'Info! Here is some information.';
    }
  }
}
