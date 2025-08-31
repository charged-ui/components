import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { chargedCustomElement } from '../registry';

/* Text variants */
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
	XS = 'copy-xs',
}

/* React props */
export type TextProps = {
	variant?: TextVariant;
} & React.HTMLAttributes<HTMLElement>;

/* Custom element */
@chargedCustomElement('ui-text')
export class UIText extends LitElement {
	render() {
		return html`<slot />`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-text': UIText;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-text': TextProps;
		}
	}
}
