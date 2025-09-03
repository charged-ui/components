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
	interface DocumentEventMap {
		'ui-details-toggle': CustomEvent;
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
	@property({ type: Boolean, reflect: true, attribute: 'open' })
	open: boolean = false;

	@property({ type: String, reflect: true, attribute: 'name' })
	name: String = '';

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener('ui-details-toggle', this.handleToggle);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener('ui-details-toggle', this.handleToggle);
	}

	private handleClick(event: Event) {
		const summary = event.target as HTMLElement;
		const details = summary.parentElement as HTMLDetailsElement;
		// const content = details.querySelector('#content') as HTMLElement;
		// const height = content.clientHeight;

		// Prevent <details> toggle event
		event.preventDefault();

		// Check if <details> has name attribute
		const name = details.getAttribute('name');

		// Dispatch ui-details-toggle event
		this.dispatchEvent(
			new CustomEvent('ui-details-toggle', {
				bubbles: true,
				detail: { name },
			})
		);
	}

	private handleToggle = (event: CustomEvent) => {
		const details = this.shadowRoot?.querySelector(
			'details'
		) as HTMLDetailsElement;
		const content = details?.querySelector('#content') as HTMLElement;
		const height = content?.clientHeight;
		const name = event.detail.name;

		if (this === event.target) {
			if (!details.open) {
				this.expand(details, content, height);
			} else {
				this.collapse(details, content, height);
			}
		} else if (details.name === name) {
			this.collapse(details, content, height);
		}
	};

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
			<details name="${this.name}">
				<summary
					aria-expanded=${this.open}
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
