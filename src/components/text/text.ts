import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import clsx from 'clsx';
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

// export enum TextDecoration {
//   Dashed = 'dashed',
//   Double = 'double',
//   Dotted = 'dotted',
//   Solid = 'solid',
//   Wavy = 'wavy'
// }

@customElement('ui-text')
export class UIText extends LitElement {
  @property({ type: TextVariant }) variant: TextVariant = TextVariant.MD;
  // @property({ type: TextDecoration }) decoration: TextDecoration =
  //   TextDecoration.Solid;

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    return html`<slot
      class=${clsx(
        'inline',
        'underline-offset-4',
        'decoration-2',
        variantClasses[this.variant]
      )}
    />`;
  }
}

// const decorationClasses: Record<TextDecoration, string> = {
//   [TextDecoration.Double]: 'underline decoration-orange-500 decoration-double',
//   [TextDecoration.Wavy]: 'underline decoration-blue-500 decoration-wavy',
//   [TextDecoration.Dashed]: 'underline decoration-emerald-500 decoration-dashed',
//   [TextDecoration.Dotted]: 'underline decoration-red-500 decoration-dotted',
//   [TextDecoration.Solid]: 'underline decoration-purple-500 decoration-solid'
// };

export const variantClasses: Record<TextVariant, string> = {
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
