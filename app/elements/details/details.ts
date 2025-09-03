import { LitElement, css, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { animate } from 'motion/mini';
import { chargedCustomElement } from '../registry';
import './details.css';

export type DetailsProps = {
	'data-expanded'?: boolean;
	name?: string;
	open?: boolean;
} & React.HTMLAttributes<HTMLElement>;

// Better typing for the custom event
export interface UIDetailsToggleEvent extends CustomEvent {
	detail: {
		name: string;
		source: UIDetails;
	};
}

@chargedCustomElement('ui-details')
export class UIDetails extends LitElement {
	@property({ type: Boolean, reflect: true, attribute: 'open' })
	open: boolean = false;

	@property({ type: String, reflect: true, attribute: 'name' })
	name: string = '';

	@query('#content')
	content!: HTMLElement;

	static styles = css`
		:host {
		}

		details {
		}

		summary {
			display: flex;
			cursor: pointer;
		}
	`;

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener('ui-details-toggle', this.handleToggle);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener('ui-details-toggle', this.handleToggle);
	}

	private handleClick(event: Event) {
		// Prevent <details> toggle event
		event.preventDefault();

		// Dispatch ui-details-toggle event
		this.dispatchEvent(
			new CustomEvent('ui-details-toggle', {
				bubbles: true,
				detail: { name: this.name, source: this },
			})
		);
	}

	private handleToggle = (event: UIDetailsToggleEvent) => {
		const { name, source } = event.detail;

		if (this === source) {
			if (!this.open) {
				this.expand();
			} else {
				this.collapse();
			}
		} else if (this.name === name) {
			this.collapse();
		}
	};

	private expand() {
		// Get content height
		const height = this.content.clientHeight;
		// Set initial state
		this.content.style.height = '0px';
		this.content.style.overflow = 'hidden';
		// Open <details> element
		this.open = true;
		// Expand animation
		animate(this.content, { height }, { duration: 0.3 }).then(() => {
			this.content.style.height = ''; // Reset height
			this.content.style.overflow = ''; // Reset overflow
		});
	}

	private collapse() {
		// Set initial state
		this.content.style.height = this.content.clientHeight + 'px';
		this.content.style.overflow = 'hidden';
		// Collapse animation
		animate(this.content, { height: 0 }, { duration: 0.3 }).then(() => {
			this.open = false; // Close <details>
			this.content.style.height = ''; // Reset height
			this.content.style.overflow = ''; // Reset overflow
		});
	}

	render() {
		return html`
			<details name="${this.name}" ?open=${this.open}>
				<summary
					id="summary"
					aria-expanded=${this.open}
					aria-controls="content"
					@click=${this.handleClick}
				>
					<slot name="summary" />
				</summary>
				<div
					id="content"
					role="region"
					aria-labelledby="summary"
					aria-hidden="${!this.open}"
				>
					<slot name="content" />
				</div>
			</details>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-details': UIDetails;
	}
	interface DocumentEventMap {
		'ui-details-toggle': UIDetailsToggleEvent;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-details': DetailsProps & { children?: React.ReactNode };
		}
	}
}
