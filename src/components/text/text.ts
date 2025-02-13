import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './text.css?raw';

export enum TextVariant {
  H1 = 'heading-1',
  H2 = 'heading-2',
  H3 = 'heading-3',
  H4 = 'heading-4',
  H5 = 'heading-5',
  H6 = 'heading-6',
  D1 = 'display-1',
  D2 = 'display-2',
  D3 = 'display-3',
  D4 = 'display-4',
  D5 = 'display-5',
  D6 = 'display-6',
  XL = 'copy-xl',
  LG = 'copy-lg',
  MD = 'copy-md',
  SM = 'copy-sm',
  XS = 'copy-xs'
}

@customElement('ui-text')
export class UIText extends LitElement {
  @property({ type: TextVariant }) variant: TextVariant = TextVariant.MD;

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`<slot class=${variantClasses[this.variant]} />`;
  }
}

const variantClasses: Record<TextVariant, string> = {
  [TextVariant.H1]: 'text-7xl font-semibold tracking-tight',
  [TextVariant.H2]: 'text-6xl font-semibold tracking-tight',
  [TextVariant.H3]: 'text-5xl font-semibold tracking-tight',
  [TextVariant.H4]: 'text-4xl font-semibold tracking-tight',
  [TextVariant.H5]: 'text-3xl font-semibold tracking-tight',
  [TextVariant.H6]: 'text-2xl font-semibold tracking-tight',
  [TextVariant.D1]: 'text-7xl font-light tracking-tight',
  [TextVariant.D2]: 'text-6xl font-light tracking-tight',
  [TextVariant.D3]: 'text-5xl font-light tracking-tight',
  [TextVariant.D4]: 'text-4xl font-light tracking-tight',
  [TextVariant.D5]: 'text-3xl font-light tracking-tight',
  [TextVariant.D6]: 'text-2xl font-light tracking-tight',
  [TextVariant.XL]: 'text-xl font-medium',
  [TextVariant.LG]: 'text-lg font-medium',
  [TextVariant.MD]: 'text-md',
  [TextVariant.SM]: 'text-sm',
  [TextVariant.XS]: 'text-xs'
};
