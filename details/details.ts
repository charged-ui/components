import { LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { animate } from 'motion/mini';
import { chargedCustomElement } from '../registry';
import './details.css';

export type DetailsProps = {
	name?: string;
	open?: boolean;
} & React.HTMLAttributes<HTMLDetailsElement>;

export interface UIDetailsToggleEvent extends CustomEvent {
	detail: {
		name: string;
		source: UIDetails;
	};
}

let instanceCount = 0;

/**
 * Disclosure / accordion behavior for author-owned markup.
 *
 * Renders into light DOM and never re-parents or replaces its children:
 * the `[slot="summary"]` and `[slot="content"]` elements you write are
 * the exact elements on the page, so they can be styled directly with
 * Tailwind utilities (or themed via the --ui-details-* custom properties
 * from a CMS block setting). The component only adds behavior — the ARIA
 * disclosure pattern, keyboard support, exclusive groups via `name`, and
 * the open/close animation. Keeping the author's DOM intact also keeps
 * SSR/prerender hydration (React, Twig, etc.) conflict-free.
 */
@chargedCustomElement('ui-details')
export class UIDetails extends LitElement {
	@property({ type: Boolean, reflect: true, attribute: 'open' })
	open: boolean = false;

	@property({ type: String, reflect: true, attribute: 'name' })
	name: string = '';

	/* ids live in the document now (no shadow scope), so they must be
	   unique per instance for aria-controls to stay valid. */
	private readonly uid = `ui-details-${++instanceCount}`;

	protected createRenderRoot() {
		return this;
	}

	protected render() {
		return nothing;
	}

	private get summaryEl(): HTMLElement | null {
		return this.querySelector(':scope > [slot="summary"]');
	}

	private get contentEl(): HTMLElement | null {
		return this.querySelector(':scope > [slot="content"]');
	}

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener('ui-details-toggle', this.handleToggle);
		/* Delegated on the host so wiring doesn't depend on when the
		   children parse or hydrate. */
		this.addEventListener('click', this.handleActivate);
		this.addEventListener('keydown', this.handleKeydown);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener('ui-details-toggle', this.handleToggle);
		this.removeEventListener('click', this.handleActivate);
		this.removeEventListener('keydown', this.handleKeydown);
	}

	/* Wire the ARIA disclosure pattern onto the author's elements.
	   NOTE for React SSR/prerender consumers: this runs before hydration,
	   so add `suppressHydrationWarning` to the [slot="summary"] and
	   [slot="content"] elements (or render the ARIA attributes yourself —
	   existing ids are honored) to keep React's dev-mode hydration diff
	   quiet. */
	protected firstUpdated() {
		this.wireAria();
	}

	private wireAria() {
		const summary = this.summaryEl;
		const content = this.contentEl;
		if (summary) {
			summary.setAttribute('role', 'button');
			summary.setAttribute('tabindex', '0');
			summary.setAttribute('aria-controls', `${this.uid}-content`);
		}
		if (content) {
			content.id ||= `${this.uid}-content`;
			content.setAttribute('role', 'region');
			if (summary) {
				summary.id ||= `${this.uid}-summary`;
				content.setAttribute('aria-labelledby', summary.id);
			}
		}
		this.syncAria();
	}

	protected updated(changed: Map<string, unknown>) {
		if (changed.has('open')) this.syncAria();
	}

	private syncAria() {
		this.summaryEl?.setAttribute('aria-expanded', String(this.open));
	}

	private isSummaryEvent(event: Event): boolean {
		const el = (event.target as Element | null)?.closest('[slot="summary"]');
		return !!el && el.parentElement === this;
	}

	private handleActivate = (event: Event) => {
		if (!this.isSummaryEvent(event)) return;
		this.requestToggle();
	};

	private handleKeydown = (event: KeyboardEvent) => {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		if (!this.isSummaryEvent(event)) return;
		event.preventDefault(); // keep Space from scrolling the page
		this.requestToggle();
	};

	private requestToggle() {
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
		} else if (this.name && this.name === name && this.open) {
			/* Exclusive group: another member opened, so this one closes.
			   Unnamed instances never group (name is ''). */
			this.collapse();
		}
	};

	/* The animated element is the author's own content element, which
	   (unlike the old shadow wrapper) carries its padding and divider
	   border. With border-box sizing a height of 0 can never shrink past
	   the padding, so padding and top border must animate to zero along
	   with the height — otherwise the box stalls at padding height and
	   snaps when the closed-state display:none lands. */

	private get animationDuration(): number {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches
			? 0
			: 0.3;
	}

	private static clearAnimationStyles(content: HTMLElement) {
		content.style.display = '';
		content.style.height = '';
		content.style.paddingTop = '';
		content.style.paddingBottom = '';
		content.style.borderTopWidth = '';
		content.style.overflow = '';
	}

	private expand() {
		const content = this.contentEl;
		if (!content) {
			this.open = true;
			return;
		}
		/* Inline display overrides the closed-state display:none so the
		   natural size can be measured and animated; [open] takes over
		   once the inline styles are cleared. No paint happens between
		   the measurement and the zeroed start values below. */
		content.style.display = 'block';
		this.open = true;
		const height = content.getBoundingClientRect().height;
		const cs = getComputedStyle(content);
		const target = {
			height,
			paddingTop: cs.paddingTop,
			paddingBottom: cs.paddingBottom,
			borderTopWidth: cs.borderTopWidth,
		};
		content.style.height = '0px';
		content.style.paddingTop = '0px';
		content.style.paddingBottom = '0px';
		content.style.borderTopWidth = '0px';
		content.style.overflow = 'hidden';
		animate(content, target, { duration: this.animationDuration }).then(
			() => {
				UIDetails.clearAnimationStyles(content);
			}
		);
	}

	private collapse() {
		const content = this.contentEl;
		if (!content) {
			this.open = false;
			return;
		}
		/* Keep the content visible while [open] is removed, animate to
		   zero, then let the closed-state CSS hide it. */
		content.style.height = content.getBoundingClientRect().height + 'px';
		content.style.display = 'block';
		content.style.overflow = 'hidden';
		this.open = false;
		animate(
			content,
			{ height: 0, paddingTop: 0, paddingBottom: 0, borderTopWidth: 0 },
			{ duration: this.animationDuration }
		).then(() => {
			UIDetails.clearAnimationStyles(content);
		});
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
			'ui-details': DetailsProps &
				React.Attributes & { children?: React.ReactNode };
		}
	}
}
