import { LitElement, html } from 'lit';
import { chargedCustomElement } from '../../registry';

export enum AlertVariant {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export type AlertProps = {
  'data-variant': AlertVariant;
} & React.HTMLAttributes<HTMLElement>;

declare global {
  interface HTMLElementTagNameMap {
    'ui-alert': UIAlert;
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ui-alert': AlertProps;
    }
  }
}

@chargedCustomElement('ui-alert')
export class UIAlert extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    // Announce as an alert to assistive technology (WCAG 4.1.3).
    // aria-live="polite" so screen readers announce changes without
    // interrupting the user. aria-atomic="true" so the full content
    // is read each time (not just the changed node).
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'alert');
    }
    if (!this.hasAttribute('aria-live')) {
      this.setAttribute('aria-live', 'polite');
    }
    if (!this.hasAttribute('aria-atomic')) {
      this.setAttribute('aria-atomic', 'true');
    }
  }

  render() {
    return html`
      <slot name="icon"></slot>
      <slot name="heading"></slot>
      <slot name="message"></slot>
    `;
  }
}
