import { LitElement, html } from 'lit';
import { chargedCustomElement } from '../registry';
import './card.css';

export type CardProps = {} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-card')
export class UICard extends LitElement {
	render() {
		return html`
			<slot name="media"></slot>
			<slot name="header"></slot>
			<slot name="body"></slot>
			<slot name="footer"></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-card': UICard;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-card': CardProps;
		}
	}
}
