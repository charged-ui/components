import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import clsx from 'clsx';
import styles from './avatar.css?raw';

// Define an enum for the variants
export enum AvatarVariant {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}

@customElement('ui-avatar')
export class UIAvatar extends LitElement {
  @property({ type: AvatarVariant }) variant: AvatarVariant =
    AvatarVariant.Info;

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

const variantClasses: Record<AvatarVariant, string> = {
  [AvatarVariant.Success]: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  [AvatarVariant.Error]: 'bg-red-50 border-red-200 text-red-700',
  [AvatarVariant.Warning]: 'bg-orange-50 border-orange-200 text-orange-700',
  [AvatarVariant.Info]: 'bg-sky-50 border-sky-200 text-sky-700'
};
