import { LitElement, html } from 'lit';
import { chargedCustomElement } from '../registry';

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
	render() {
		return html`
			<slot name="icon"></slot>
			<slot name="heading"></slot>
			<slot name="message"></slot>
		`;
	}
}
