import { LitElement, html } from 'lit';
import { chargedCustomElement } from '../registry';

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
	'data-shape'?: ButtonShape;
	'data-size'?: ButtonSize;
	'data-variant'?: ButtonVariant;
} & { children: React.ReactNode };

@chargedCustomElement('ui-button')
export class UIButton extends LitElement {
	render() {
		return html`<slot></slot>`;
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
			'ui-button': ButtonProps & {
				children: React.ReactElement<
					React.ButtonHTMLAttributes<HTMLButtonElement>
				>;
			};
		}
	}
}
