import { LitElement, css, html } from 'lit';
import { chargedCustomElement } from '../registry';
import { animate, stagger } from 'motion';

export type SpinnerProps = {} & React.HTMLAttributes<HTMLDivElement>;

@chargedCustomElement('ui-spinner')
export class UISpinner extends LitElement {
	private animationControls: any = null; // Store animation reference

	static styles = css`
		:host {
			display: block;
			width: 64px;
			height: 64px;
		}

		.segment use,
		.segment path {
			fill: #ccc;
			transform-origin: 100px 100px;
		}
	`;

	firstUpdated() {
		const segments = this.shadowRoot?.querySelectorAll('.segment');
		const numSegments = segments?.length;

		if (!numSegments) return;

		const offset = 0.1;
		const duration = numSegments * offset;

		this.animationControls = animate(
			segments,
			//@ts-expect-error (Motion library has incomplete type definitions for keyframes)
			{ opacity: [0, 1, 0] },
			{
				offset: [0, 0.1, 1],
				duration,
				delay: stagger(offset, { startDelay: -duration }),
				repeat: Infinity,
			}
		);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		// Clean up animation when component unmounts
		if (this.animationControls) {
			this.animationControls.stop();
			this.animationControls = null;
		}
	}

	render() {
		return html`
			<div>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
					<g class="segment">
						<path
							id="loading-path"
							d="M 94 25 C 94 21.686 96.686 19 100 19 L 100 19 C 103.314 19 106 21.686 106 25 L 106 50 C 106 53.314 103.314 56 100 56 L 100 56 C 96.686 56 94 53.314 94 50 Z"
						></path>
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(45deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(90deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(135deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(180deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(225deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(270deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(315deg)" />
					</g>
				</svg>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-spinner': UISpinner;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-spinner': SpinnerProps;
		}
	}
}
