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

		// Close previously open <details> if grouped
		const name = details.getAttribute('name');

		// Start expand or collapse animation
		if (!details.open) {
			this.expand(details, content, height);
		} else {
			this.collapse(details, content, height);
		}
	}

	// Expand animation
	private expand(
		details: HTMLDetailsElement,
		content: HTMLElement,
		height: number
	) {
		content.style.height = '0px';
		content.style.overflow = 'hidden';
		details.open = true; // Open <details>
		animate(content, { height }, { duration: 0.3 }).then(() => {
			content.style.height = ''; // Reset height
			content.style.overflow = ''; // Reset overflow
		});
	}

	// Collapse animation
	private collapse(
		details: HTMLDetailsElement,
		content: HTMLElement,
		height: number
	) {
		content.style.height = height + 'px';
		content.style.overflow = 'hidden';
		animate(content, { height: 0 }, { duration: 0.3 }).then(() => {
			details.open = false; // Close <details>
			content.style.height = ''; // Reset height
			content.style.overflow = ''; // Reset overflow
		});
	}

	render() {
		return html`
			<details name="test">
				<summary
					aria-expanded=${this.expanded}
					aria-controls="content"
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
