import { LitElement, css, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { animate } from 'motion/mini';
import { chargedCustomElement } from '../registry';
import './tabs.css';

export type TabsProps = {
	selectedIndex?: number;
} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-tabs')
export class UITabs extends LitElement {
	@property({ type: Number, reflect: true, attribute: 'selected-index' })
	selectedIndex = 0;

	@query('.tablist')
	private _tablist!: HTMLElement;

	@query('.underline')
	private _underline!: HTMLElement;

	@query('slot[name="tab"]')
	private _tabSlot!: HTMLSlotElement;

	@query('slot[name="panel"]')
	private _panelSlot!: HTMLSlotElement;

	private _activeAnimation: ReturnType<typeof animate> | null = null;
	private _abortController = new AbortController();

	static styles = css`
		:host {
			display: block;
		}

		.tablist {
			position: relative;
			display: flex;
			align-items: flex-end;
			gap: 0.25rem;
			box-shadow: inset 0 -1px 0 0
				var(--ui-tabs-border, rgba(0, 0, 0, 0.08));
		}

		.underline {
			position: absolute;
			bottom: -1px;
			height: 2px;
			background: var(
				--ui-tabs-indicator-color,
				var(--ui-tabs-fg, currentColor)
			);
			border-radius: 2px;
			will-change: left, width;
		}

		.panels {
			position: relative;
			flex: 1;
			overflow: hidden;
		}
	`;

	firstUpdated() {
		this._setupSlottedElements();
		requestAnimationFrame(() => {
			this._positionUnderline(false);
		});
	}

	updated(changed: Map<string, unknown>) {
		if (changed.has('selectedIndex')) {
			const oldIndex = (changed.get('selectedIndex') as number) ?? 0;
			this._updateTabAttributes();
			this._positionUnderline(true);
			this._animatePanelTransition(oldIndex, this.selectedIndex);
		}
	}

	disconnectedCallback() {
		this._abortController.abort();
		if (this._activeAnimation) {
			try {
				this._activeAnimation.stop();
			} catch {}
			this._activeAnimation = null;
		}
		super.disconnectedCallback();
	}

	private _getTabs(): HTMLElement[] {
		return (this._tabSlot?.assignedElements() ?? []) as HTMLElement[];
	}

	private _getPanels(): HTMLElement[] {
		return (this._panelSlot?.assignedElements() ?? []) as HTMLElement[];
	}

	private _setupSlottedElements() {
		this._abortController.abort();
		this._abortController = new AbortController();
		const { signal } = this._abortController;

		const tabs = this._getTabs();
		const panels = this._getPanels();

		tabs.forEach((tab, i) => {
			tab.setAttribute('role', 'tab');
			tab.id = `tab-${i}`;
			tab.setAttribute('aria-controls', `panel-${i}`);
			tab.setAttribute('aria-selected', String(i === this.selectedIndex));
			tab.tabIndex = i === this.selectedIndex ? 0 : -1;
			tab.addEventListener('click', () => this.selectTab(i), { signal });
			tab.addEventListener('keydown', this._handleKeydown, { signal });
		});

		panels.forEach((panel, i) => {
			panel.setAttribute('role', 'tabpanel');
			panel.id = `panel-${i}`;
			panel.setAttribute('aria-labelledby', `tab-${i}`);
			panel.tabIndex = 0;
			if (i === this.selectedIndex) {
				panel.removeAttribute('hidden');
			} else {
				panel.setAttribute('hidden', '');
			}
		});
	}

	private _updateTabAttributes() {
		const tabs = this._getTabs();
		tabs.forEach((tab, i) => {
			tab.setAttribute('aria-selected', String(i === this.selectedIndex));
			tab.tabIndex = i === this.selectedIndex ? 0 : -1;
		});
	}

	selectTab(index: number) {
		const tabs = this._getTabs();
		if (index >= 0 && index < tabs.length && index !== this.selectedIndex) {
			this.selectedIndex = index;
		}
	}

	private _positionUnderline(shouldAnimate: boolean) {
		const tabs = this._getTabs();
		const activeTab = tabs[this.selectedIndex];
		if (!activeTab || !this._underline || !this._tablist) return;

		const navRect = this._tablist.getBoundingClientRect();
		const tabRect = activeTab.getBoundingClientRect();
		const left = tabRect.left - navRect.left;
		const width = tabRect.width;

		if (shouldAnimate) {
			animate(
				this._underline,
				{ left, width },
				{ duration: 0.35, ease: [0.22, 1, 0.36, 1] },
			);
		} else {
			this._underline.style.left = `${left}px`;
			this._underline.style.width = `${width}px`;
		}
	}

	private _animatePanelTransition(oldIndex: number, newIndex: number) {
		if (oldIndex === newIndex) return;

		const panels = this._getPanels();
		const oldPanel = panels[oldIndex];
		const newPanel = panels[newIndex];

		// Hard cut — no content animation. The sliding underline still moves,
		// but the panel itself just swaps, which reads cleaner than a fade-slide.
		if (oldPanel) oldPanel.setAttribute('hidden', '');
		if (newPanel) newPanel.removeAttribute('hidden');
	}

	private _handleKeydown = (e: KeyboardEvent) => {
		const tabs = this._getTabs();
		const len = tabs.length;
		if (!len) return;

		let newIndex = this.selectedIndex;

		switch (e.key) {
			case 'ArrowRight':
			case 'ArrowDown':
				newIndex = (this.selectedIndex + 1) % len;
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				newIndex = (this.selectedIndex - 1 + len) % len;
				break;
			case 'Home':
				newIndex = 0;
				break;
			case 'End':
				newIndex = len - 1;
				break;
			default:
				return;
		}

		e.preventDefault();
		this.selectTab(newIndex);
		tabs[newIndex]?.focus();
	};

	private _handleSlotChange() {
		this._setupSlottedElements();
		this.updateComplete.then(() => {
			this._positionUnderline(false);
		});
	}

	render() {
		return html`
			<div class="tablist" role="tablist">
				<slot
					name="tab"
					@slotchange=${this._handleSlotChange}
				></slot>
				<div class="underline" aria-hidden="true"></div>
			</div>
			<div class="panels">
				<slot
					name="panel"
					@slotchange=${this._handleSlotChange}
				></slot>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-tabs': UITabs;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-tabs': TabsProps & { children?: React.ReactNode };
		}
	}
}
