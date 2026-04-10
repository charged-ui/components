import { LitElement, html, css, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { chargedCustomElement } from '../registry';
import { animate, stagger } from 'motion';
import clsx from 'clsx';
import styles from './gallery.css?raw';

import '../button/index';

type FilterItem = { id: string; label: string };

export type GalleryProps = {
	columns?: number;
	allLabel?: string;
} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-gallery')
export class UIGallery extends LitElement {
	static styles = css`
		${unsafeCSS(styles)}
	`;

	@property({ type: Number })
	columns = 4;

	@property({ type: String })
	allLabel?: string;

	@state()
	activeFilter = 'all';

	@state()
	private filters: FilterItem[] = [];

	get gridClasses(): string {
		const mobileColumns = Math.min(this.columns, 2);
		const tabletColumns = Math.min(this.columns, 3);
		const desktopColumns = this.columns;

		const gridStyles = clsx({
			'sm:grid-cols-1': mobileColumns === 1,
			'sm:grid-cols-2': mobileColumns === 2,

			'md:grid-cols-1': tabletColumns === 1,
			'md:grid-cols-2': tabletColumns === 2,
			'md:grid-cols-3': tabletColumns === 3,

			'lg:grid-cols-1': desktopColumns === 1,
			'lg:grid-cols-2': desktopColumns === 2,
			'lg:grid-cols-3': desktopColumns === 3,
			'lg:grid-cols-4': desktopColumns === 4,
			'lg:grid-cols-5': desktopColumns === 5,
			'lg:grid-cols-6': desktopColumns === 6,
		});

		return `grid grid-cols-1 ${gridStyles} gap-6`;
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
	}

	formatCategoryLabel(category: string): string {
		return category
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.slice(0, 1)
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

	animateItems(): void {
		const visibleItems = this.shadowRoot
			?.querySelector('slot')
			?.assignedElements()
			.filter((el) => !el.classList.contains('hidden'));

		if (!visibleItems?.length) return;

		animate(
			visibleItems,
			{ opacity: [0, 1], scale: [0.8, 1] },
			{ delay: stagger(0.05, { ease: [0.4, 0.0, 0.2, 1] }) }
		);
	}

	handleSlotChange(): void {
		this.detectFiltersFromChildren();
		this.updateVisibility();
		this.animateItems();
	}

	firstUpdated(): void {
		this.detectFiltersFromChildren();
		this.updateVisibility();
		this.animateItems();
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
						<div class="flex flex-wrap gap-2 mb-8">
							${this.filters.map(
								(filter) => html`
									<ui-button
										@click=${() => this.setFilter(filter.id)}
										size="small"
										variant=${this.activeFilter === filter.id
											? 'primary'
											: 'secondary'}
										shape="rounded"
									>
										<div slot="value">${filter.label}</div>
									</ui-button>
								`
							)}
						</div>
					`
				: ''}

			<div class="${this.gridClasses}">
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
