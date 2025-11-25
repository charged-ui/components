import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { chargedCustomElement } from '../registry';
// import styles from './card.css?raw';

/* React props */
export type CardProps = {} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-card')
export class UICard extends LitElement {
	@property({ type: String }) variant?: string;

	// static styles = css`
	// 	${unsafeCSS(styles)}
	// `;

	render() {
		return html`
			<div
				class="flex flex-col bg-white border border-solid border-neutral-200 rounded-xl relative overflow-hidden shadow-sm"
			>
				<slot name="media"></slot>
				<slot name="header"></slot>
				<slot name="body"></slot>
				<slot name="footer"></slot>
			</div>
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
