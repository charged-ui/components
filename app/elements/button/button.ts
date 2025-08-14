import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import clsx from 'clsx';
import { chargedCustomElement } from '../registry';
import styles from './button.css?raw';

// Define an enum for the sizes
export enum ButtonSize {
	Small = 'small',
	Medium = 'medium',
	Large = 'large',
}

export enum ButtonShape {
	Square = 'square',
	Rounded = 'rounded',
}

// Define an enum for the variants
export enum ButtonVariant {
	Primary = 'primary',
	Secondary = 'secondary',
	Tertiary = 'tertiary',
	Warning = 'warning',
	Error = 'error',
	Success = 'success',
	Info = 'info',
}

export type ButtonProps = {
	'data-shape': ButtonShape;
	'data-size': ButtonSize;
	'data-variant': ButtonVariant;
} & React.HTMLAttributes<HTMLButtonElement>;

@chargedCustomElement('ui-button')
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
		const classes = clsx();

		return html`<button>
			<slot></slot>
		</button> `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-button': UIButton;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-button': ButtonProps;
		}
	}
}
