import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { animate } from 'motion/mini';
import { chargedCustomElement } from '../registry';
import './details.css';

export type DetailsProps = {
	'data-expanded'?: boolean;
	name?: String;
} & React.HTMLAttributes<HTMLElement>;

declare global {
	interface HTMLElementTagNameMap {
		'ui-details': UIDetails;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-details': DetailsProps & { children?: React.ReactNode };
		}
	}
}

@chargedCustomElement('ui-details')
export class UIDetails extends LitElement {
	@property({ type: Boolean, reflect: true, attribute: 'aria-expanded' })
	expanded: boolean = false;

	private handleClick(event: Event) {
		const summary = event.target as HTMLElement;
		const details = summary.parentElement as HTMLDetailsElement;
		const content = details.querySelector('#content') as HTMLElement;
		const height = content.clientHeight;

		// Prevent <details> from opening
		event.preventDefault();

		if (!details.open) {
			// Expand animation
			content.style.height = '0px';
			content.style.overflow = 'hidden';
			details.open = true;
			animate(content, { height }, { duration: 0.3 }).then(() => {
				content.style.height = 'auto';
				content.style.overflow = '';
			});
		} else {
			// Collapse Animation
			content.style.height = height + 'px';
			content.style.overflow = 'hidden';
			animate(content, { height: 0 }, { duration: 0.3 }).then(() => {
				details.open = false;
				content.style.height = 'auto';
				content.style.overflow = '';
			});
		}
	}

	render() {
		return html`
			<details>
				<summary
					data-expanded=${this.expanded}
					data-controls="content"
					@click=${this.handleClick}
				>
					<slot name="summary" />
				</summary>
				<div id="content">
					<slot name="content" />
				</div>
			</details>
		`;
	}
}
