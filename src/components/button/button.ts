import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import clsx from 'clsx';
import styles from './button.css?raw';

// Define an enum for the sizes
export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large'
}

export enum ButtonShape {
  Square = 'square',
  Rounded = 'rounded'
}

// Define an enum for the variants
export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
  Info = 'info'
}

@customElement('ui-button')
export class UIButton extends LitElement {
  @property({ type: ButtonSize }) size: ButtonSize = ButtonSize.Medium;
  @property({ type: ButtonShape }) shape: ButtonShape = ButtonShape.Square;
  @property({ type: ButtonVariant }) variant: ButtonVariant =
    ButtonVariant.Primary;

  static styles = css`
    ${unsafeCSS(styles)}
    ::slotted([slot='value']) {
      font-family: 'Inter';
    }
  `;

  render() {
    const classes = clsx(
      'flex',
      'gap-2',
      'cursor-pointer',
      'font-medium',
      'border',
      'border-solid',
      'transition',
      'leading-none',
      sizeClasses[this.size],
      shapeClasses[this.shape],
      variantClasses[this.variant]
    );

    return html`<button class=${classes}>
      <slot name="value"></slot>
    </button> `;
  }
}

const sizeClasses: Record<ButtonSize, string> = {
  [ButtonSize.Small]: 'text-sm px-3 py-2',
  [ButtonSize.Medium]: 'text-sm px-4 py-3',
  [ButtonSize.Large]: 'text-base px-5 py-4'
};

const shapeClasses: Record<ButtonShape, string> = {
  [ButtonShape.Square]: 'rounded-lg',
  [ButtonShape.Rounded]: 'rounded-full shadow-sm'
};

const variantClasses: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]:
    'bg-zinc-900 hover:bg-zinc-700 border-zinc-900 text-white',
  [ButtonVariant.Secondary]:
    'bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-900',
  [ButtonVariant.Tertiary]:
    'bg-transparent border-transparent hover:bg-zinc-200 text-zinc-900',
  [ButtonVariant.Warning]:
    'bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-white',
  [ButtonVariant.Error]:
    'bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-white',
  [ButtonVariant.Success]:
    'bg-emerald-500 hover:bg-emerald-600 border-emerald-500 hover:border-emerald-600 text-white',
  [ButtonVariant.Info]:
    'bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600 text-white'
};
