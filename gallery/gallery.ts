import { LitElement, html, css, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { chargedCustomElement } from '../registry';
import styles from './gallery.css?inline';

type FilterItem = { id: string; label: string };

export type GalleryProps = {
	'data-columns'?: number;
	allLabel?: string;
} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-gallery')
export class UIGallery extends LitElement {
	static styles = css`
		${unsafeCSS(styles)}
	`;

	@property({ type: Number, attribute: 'data-columns', reflect: true })
	columns = 4;

	@property({ type: String })
	allLabel?: string;

	@state()
	activeFilter = 'all';

	@state()
	private filters: FilterItem[] = [];

	@state()
	private _buttonReady = false;

	private _buttonPromise: Promise<void> | null = null;

	private async ensureButton(): Promise<void> {
		if (this._buttonReady) return;
		if (!this._buttonPromise) {
			this._buttonPromise = import('../button').then(() => {
				this._buttonReady = true;
			});
		}
		await this._buttonPromise;
	}

	detectFiltersFromChildren(): void {
		const slot = this.shadowRoot?.querySelector('slot');
		if (!slot) return;

		const allCategories = new Set<string>();

		slot.assignedElements().forEach((child) => {
			const categories =
				child.getAttribute('data-categories')?.split(',') || [];
			categories.forEach((category) => {
				const trimmed = category.trim();
				if (trimmed) allCategories.add(trimmed);
			});
		});

		this.filters = [
			{ id: 'all', label: this.allLabel ?? 'All' },
			...Array.from(allCategories)
				.sort()
				.map((category) => ({
					id: category,
					label: this.formatCategoryLabel(category),
				})),
		];

		if (this.filters.length > 1) {
			this.ensureButton();
		}
	}

	formatCategoryLabel(category: string): string {
		return category
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	setFilter(filterId: string): void {
		this.activeFilter = filterId;
		this.updateComplete.then(() => {
			this.updateVisibility();
			this.animateItems();
		});
	}

	updateVisibility(): void {
		const slot = this.shadowRoot?.querySelector('slot');
		if (!slot) return;

		slot.assignedElements().forEach((child) => {
			const categories =
				child
					.getAttribute('data-categories')
					?.split(',')
					.map((c) => c.trim()) || [];
			const visible =
				this.activeFilter === 'all' || categories.includes(this.activeFilter);

			child.classList.toggle('hidden', !visible);
			child.classList.toggle('grid-item', visible);
		});
	}

	async animateItems(): Promise<void> {
		const visibleItems = this.shadowRoot
			?.querySelector('slot')
			?.assignedElements()
			.filter((el) => !el.classList.contains('hidden'));

		if (!visibleItems?.length) return;

		const { animate, stagger } = await import('motion');
		animate(
			visibleItems,
			{ opacity: [0, 1], scale: [0.8, 1] },
			{ delay: stagger(0.05, { ease: [0.4, 0.0, 0.2, 1] }) },
		);
	}

	handleSlotChange(): void {
		this.detectFiltersFromChildren();
		this.updateVisibility();
		if (this.filters.length > 1) {
			this.animateItems();
		}
	}

	firstUpdated(): void {
		this.detectFiltersFromChildren();
		this.updateVisibility();
	}

	updated(changedProperties: Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		if (changedProperties.has('activeFilter')) {
			this.updateVisibility();
		}
		if (changedProperties.has('allLabel')) {
			this.detectFiltersFromChildren();
		}
	}

	render() {
		return html`
			${this.filters.length > 1
				? html`
						<div class="gallery-filters">
							${this.filters.map(
								(filter) => html`
									<ui-button
										@click=${() => this.setFilter(filter.id)}
										data-size="small"
										data-variant=${this.activeFilter === filter.id
											? 'primary'
											: 'secondary'}
										data-shape="rounded"
									>
										<button>${filter.label}</button>
									</ui-button>
								`,
							)}
						</div>
					`
				: ''}

			<div class="gallery-grid">
				<slot @slotchange=${() => this.handleSlotChange()}></slot>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-gallery': UIGallery;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-gallery': GalleryProps;
		}
	}
}
