import { LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { chargedCustomElement } from '../../registry';
import './menu.css';

export type MenuPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

export type MenuProps = {
  /** Whether the panel is open (controlled). Reflects to the `open` attribute. */
  open?: boolean;
  /** Preferred placement of the panel relative to the trigger. */
  placement?: MenuPlacement;
  /** Gap (px) between the panel and the trigger. */
  distance?: number;
  /** Whether selecting an item closes the panel. */
  closeOnClick?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type MenuItemProps = {
  /** Disables the item: removes it from keyboard nav and blocks activation. */
  disabled?: boolean;
  /** Whether the panel closes when this item is activated. */
  closeOnClick?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export type MenuLabelProps = React.HTMLAttributes<HTMLElement>;

export type MenuSeparatorProps = React.HTMLAttributes<HTMLElement>;

let instanceCount = 0;

/**
 * Accessible menu.
 *
 * Renders into light DOM and never re-parents its children: the
 * `[slot="trigger"]` element and the `[slot="menu"]` panel you write are the
 * exact elements on the page, so they can be styled directly with Tailwind
 * utilities (or themed via the --ui-menu-* custom properties). The component
 * only adds behaviour — the ARIA menu pattern, keyboard navigation with a
 * roving tabindex, open/close, and positioning.
 *
 * Positioning uses native CSS Anchor Positioning + the Popover API (top layer,
 * no portal, free flip/shift on overflow). On browsers that predate the Anchor
 * Positioning baseline it falls back to a self-contained
 * `getBoundingClientRect` + scroll/resize listener — no external dependency.
 *
 * Slot a trigger into `trigger` and the menu panel into `menu`. Fill the panel
 * with `ui-menu-item`s (optionally grouped with `ui-menu-label` and separated
 * by `ui-menu-separator`). The component marks the `[slot="menu"]` element
 * `role="menu"`. A future `ui-context-menu` reuses these same
 * item/label/separator primitives and differs only in its trigger.
 */
@chargedCustomElement('ui-menu')
export class UIMenu extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  open = false;

  @property({ reflect: true })
  placement: MenuPlacement = 'bottom-end';

  @property({ type: Number })
  distance = 8;

  @property({ type: Boolean, attribute: 'close-on-click' })
  closeOnClick = true;

  /* Unique anchor name + ids. Anchor positioning + aria-controls both need
	   document-unique values, and ids now live in light DOM (no shadow scope). */
  private readonly uid = `ui-menu-${++instanceCount}`;
  private readonly anchorName = `--${this.uid}`;
  private readonly panelId = `${this.uid}-panel`;

  /* JS-fallback positioning state (only used where anchor() is unsupported). */
  private _fallbackCleanup: (() => void) | null = null;
  private _wireAbort = new AbortController();

  protected createRenderRoot() {
    return this;
  }

  protected render() {
    return nothing;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('pointerdown', this._onPointerDown);
    document.addEventListener('keydown', this._onDocumentKeydown, {
      capture: true,
    });
    this.addEventListener('slotchange', this._onSlotChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('pointerdown', this._onPointerDown);
    document.removeEventListener('keydown', this._onDocumentKeydown, {
      capture: true,
    });
    this.removeEventListener('slotchange', this._onSlotChange);
    this._wireAbort.abort();
    this._stopFallback();
    if (this.open) this._closePopover();
  }

  protected firstUpdated() {
    this._wire();
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('open')) this._syncOpen();
    if (changed.has('placement') || changed.has('distance')) {
      this._applyPlacement();
    }
  }

  /* ------------------------------------------------------------------ *
   * Wiring
   * ------------------------------------------------------------------ */

  private _onSlotChange = () => this._wire();

  /** The slotted trigger wrapper — the anchor element for positioning. This is
   *  either the focusable control itself (e.g. `<button slot="trigger">`) or a
   *  wrapper around it (e.g. `<ui-button slot="trigger"><button/></ui-button>`). */
  private get triggerEl(): HTMLElement | null {
    return this.querySelector(':scope > [slot="trigger"]');
  }

  /** The actual focusable control: the trigger itself, or the first <button>,
   *  <a>, or [tabindex] descendant inside it. This is what receives ARIA,
   *  keyboard listeners, and focus. Resolving it lets authors use either a bare
   *  control or a styled wrapper (like ui-button) as the trigger. */
  private get controlEl(): HTMLElement | null {
    const trigger = this.triggerEl;
    if (!trigger) return null;
    const inner = trigger.querySelector<HTMLElement>(
      'button, a[href], [tabindex]',
    );
    return inner ?? trigger;
  }

  /** The panel is the element slotted into `menu`. */
  private get panelEl(): HTMLElement | null {
    return this.querySelector(':scope > [slot="menu"]');
  }

  private _wire() {
    this._wireAbort.abort();
    this._wireAbort = new AbortController();
    const { signal } = this._wireAbort;

    const trigger = this.triggerEl; /* the anchor wrapper */
    const control = this.controlEl; /* the focusable button/control */
    const panel = this.panelEl;
    if (!trigger || !control || !panel) return;

    /* Panel: declare it a menu + bind the anchor. (Wired before the control
		   attributes so aria-controls can reference the panel's real id — the
		   author may have supplied one, which we honor.) */
    panel.setAttribute('role', 'menu');
    panel.setAttribute('aria-orientation', 'vertical');
    panel.id ||= this.panelId;
    /* Native popover → top layer, escapes overflow:hidden and z-index. */
    if (panel.popover !== 'manual') panel.popover = 'manual';
    panel.style.setProperty('position-anchor', this.anchorName);

    /* Control: mark as the menu's button. aria-haspopup/expanded/controls live
		   on the focusable control, not the styling wrapper. */
    control.setAttribute('aria-haspopup', 'menu');
    control.setAttribute('aria-expanded', String(this.open));
    control.setAttribute('aria-controls', panel.id);
    control.id ||= `${this.uid}-trigger`;
    panel.setAttribute('aria-labelledby', control.id);

    /* The anchor is the trigger wrapper: it bounds the panel whether the
		   control is the wrapper or a descendant. CSS Anchor Positioning —
		   typed as setProperty because the TS DOM lib doesn't yet know
		   anchor-name / position-anchor. */
    trigger.style.setProperty('anchor-name', this.anchorName);

    control.addEventListener('click', this._toggleFromTrigger, { signal });
    control.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          /* Open if closed; otherwise (focus still on the control after a
					   click-open) move focus into the menu so arrow keys work
					   even before the user has tabbed in. */
          e.preventDefault();
          if (!this.open) {
            this._open(e.key === 'ArrowUp' ? 'last' : 'first');
          } else {
            this._focusItem(e.key === 'ArrowUp' ? 'last' : 'first');
          }
        }
      },
      { signal },
    );

    this._applyPlacement();
    this._wireItems(panel, signal);

    /* Keep aria-expanded in sync when the popover is dismissed by other
		   means (Esc handled natively by the browser for top-layer popovers). */
    panel.addEventListener('toggle', this._onPopoverToggle, { signal });

    if (this.open) this._syncOpen();
  }

  private _wireItems(panel: HTMLElement, signal: AbortSignal) {
    const items = this._items(panel);
    items.forEach((item, i) => {
      item.setAttribute('role', 'menuitem');
      item.tabIndex = -1; /* roving tabindex — host manages which is 0 */
      item.addEventListener('click', this._onItemClick, { signal });
      item.addEventListener('keydown', this._onItemKeydown, { signal });
      item.addEventListener('pointerenter', () => this._highlight(i), {
        signal,
      });
    });
    if (items.length && !items.some((it) => it.dataset.active === 'true')) {
      this._setActiveItem(0, false);
    }
  }

  private _items(panel = this.panelEl): HTMLElement[] {
    if (!panel) return [];
    /* Direct menu-item candidates, excluding any nested inside another item
       (keeps the list flat for roving-tabindex navigation). */
    return Array.from(
      panel.querySelectorAll<HTMLElement>('ui-menu-item, [role="menuitem"]'),
    ).filter((el) => el.closest('ui-menu-item, [role="menuitem"]') === el);
  }

  private _enabledItems(panel = this.panelEl): HTMLElement[] {
    return this._items(panel).filter(
      (it) =>
        !it.hasAttribute('disabled') &&
        it.getAttribute('aria-disabled') !== 'true',
    );
  }

  /* ------------------------------------------------------------------ *
   * Open / close
   * ------------------------------------------------------------------ */

  private _toggleFromTrigger = () => {
    if (this.open) this._close();
    else this._open('first');
  };

  /* Intent set when opening; consumed after the popover is actually shown in
	   _syncOpen(). We can't focus an item synchronously with `this.open = true`
	   because showPopover() runs in updated() a microtask later — focusing a
	   still-hidden menu item is a no-op. */
  private _pendingFocus: 'first' | 'last' | null = null;

  private _syncOpen() {
    const panel = this.panelEl;
    if (!panel) return;
    if (this.open) {
      this._showPopover(panel);
      this._maybeStartFallback();
      if (this._pendingFocus) {
        const which = this._pendingFocus;
        this._pendingFocus = null;
        /* rAF so the popover has painted before we steal focus into it. */
        requestAnimationFrame(() => this._focusItem(which));
      }
    } else {
      this._hidePopover(panel);
      this._stopFallback();
    }
    this.controlEl?.setAttribute('aria-expanded', String(this.open));
  }

  private _open(focus: 'first' | 'last') {
    if (this.open) return;
    this._pendingFocus = focus;
    this.open = true; /* triggers _syncOpen via updated() */
  }

  private _close(returnFocus = true) {
    if (!this.open) return;
    this.open = false; /* triggers _syncOpen */
    this._stopFallback();
    if (returnFocus) this.controlEl?.focus();
  }

  private _showPopover(panel: HTMLElement) {
    try {
      panel.showPopover();
    } catch {
      /* not a popover if the attr was reset; fall back to class toggle */
      panel.classList.add('ui-menu-open');
    }
  }

  private _hidePopover(panel: HTMLElement) {
    try {
      panel.hidePopover();
    } catch {
      panel.classList.remove('ui-menu-open');
    }
  }

  private _closePopover() {
    this.panelEl?.hidePopover?.();
  }

  private _onPopoverToggle = (e: Event) => {
    const newState = (e as ToggleEvent).newState;
    const isOpen = newState === 'open';
    if (isOpen !== this.open) {
      this.open = isOpen;
      this.controlEl?.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) this._maybeStartFallback();
      else this._stopFallback();
    }
  };

  /* ------------------------------------------------------------------ *
   * Keyboard navigation (roving tabindex)
   * ------------------------------------------------------------------ */

  private _onItemKeydown = (e: KeyboardEvent) => {
    const items = this._enabledItems();
    const len = items.length;
    if (!len) return;
    const current = items.indexOf(e.target as HTMLElement);
    let next = current;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = (current + 1) % len;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        next = (current - 1 + len) % len;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = len - 1;
        break;
      case 'Tab':
        e.preventDefault();
        this._close(true);
        return;
      case 'Escape':
        e.preventDefault();
        this._close(true);
        return;
      case 'Enter':
      case ' ':
        e.preventDefault();
        (e.target as HTMLElement).click();
        return;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) {
          this._typeahead(e.key);
        }
        return;
    }

    e.preventDefault();
    this._highlight(next);
    items[next]?.focus();
  };

  /** Escape / arrow-from-trigger close handling delegated at the document. */
  private _onDocumentKeydown = (e: KeyboardEvent) => {
    if (!this.open) return;
    /* Only act if the focus is inside this menu. */
    const active = document.activeElement;
    if (!active || !this.contains(active)) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      this._close(true);
    }
  };

  private _highlight(index: number) {
    this._setActiveItem(index, false);
  }

  private _setActiveItem(index: number, focus: boolean) {
    const items = this._items();
    items.forEach((it, i) => {
      const active = i === index;
      it.tabIndex = active ? 0 : -1;
      it.dataset.active = String(active);
    });
    if (focus) items[index]?.focus();
  }

  private _focusItem(which: 'first' | 'last') {
    const items = this._enabledItems();
    if (!items.length) return;
    const idx = which === 'first' ? 0 : items.length - 1;
    const real = this._items().indexOf(items[idx]);
    this._setActiveItem(real >= 0 ? real : 0, true);
  }

  /** Simple single-pass typeahead: jump to the next enabled item whose
	   label starts with the typed character, cycling from the current one. */
  private _typeahead(char: string) {
    const lower = char.toLowerCase();
    const items = this._enabledItems();
    if (!items.length) return;
    const start = Math.max(
      0,
      items.indexOf(document.activeElement as HTMLElement) + 1,
    );
    for (let i = 0; i < items.length; i++) {
      const item = items[(start + i) % items.length];
      const label = (item.textContent || '').trim().toLowerCase();
      if (label.startsWith(lower)) {
        this._setActiveItem(this._items().indexOf(item), true);
        return;
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * Item activation + dismissal
   * ------------------------------------------------------------------ */

  private _onItemClick = (e: Event) => {
    const item = e.currentTarget as HTMLElement;
    if (
      item.hasAttribute('disabled') ||
      item.getAttribute('aria-disabled') === 'true'
    ) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const close = item.getAttribute('close-on-click');
    const shouldClose = close === null ? this.closeOnClick : close !== 'false';
    if (shouldClose) this._close(true);
  };

  /** Outside-click dismissal. The panel is in the top layer, so a pointerdown
	   inside it is still inside this host's composed tree. */
  private _onPointerDown = (e: PointerEvent) => {
    if (!this.open) return;
    const path = e.composedPath();
    if (path.includes(this)) return;
    this._close(false);
  };

  /* ------------------------------------------------------------------ *
   * Placement
   * ------------------------------------------------------------------ */

  private _applyPlacement() {
    const panel = this.panelEl;
    if (!panel) return;
    panel.dataset.placement = this.placement;
    /* Apply the gap on the block axis only (the side facing the trigger) so
		   the panel aligns flush to the trigger's left/right edges. */
    panel.style.marginTop = `${this.distance}px`;
    panel.style.marginBottom = `${this.distance}px`;
    /* Native CSS Anchor Positioning handles the rest declaratively in the
		   stylesheet (position-area + position-try-fallbacks). The JS fallback
		   re-reads data-placement to compute fixed coordinates. */
    if (this._fallbackCleanup) this._positionFallback();
  }

  /* ------------------------------------------------------------------ *
   * JS positioning fallback for pre-Baseline browsers
   * ------------------------------------------------------------------ */

  private _supportsAnchor(): boolean {
    return (
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('anchor-name: --x')
    );
  }

  private _maybeStartFallback() {
    if (this._supportsAnchor() || this._fallbackCleanup) return;
    this._positionFallback();
    const onScroll = () => this._positionFallback();
    window.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener('resize', onScroll);
    this._fallbackCleanup = () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
    };
  }

  private _stopFallback() {
    this._fallbackCleanup?.();
    this._fallbackCleanup = null;
  }

  private _positionFallback() {
    const trigger = this.triggerEl;
    const panel = this.panelEl;
    if (!trigger || !panel) return;
    const tr = trigger.getBoundingClientRect();
    const pr = panel.getBoundingClientRect();
    const gap = this.distance;
    const placement = this.placement;
    let top: number;
    let left: number;

    const below = tr.bottom + gap;
    const above = tr.top - gap - pr.height;
    const openDown = placement.startsWith('bottom') || placement === 'bottom';
    const useDown = openDown
      ? below + pr.height <= window.innerHeight || above < 0
      : !(above >= 0 || below + pr.height > window.innerHeight);
    top = useDown ? below : above;

    const align = placement.endsWith('-start')
      ? 'start'
      : placement.endsWith('-end')
        ? 'end'
        : 'center';
    if (align === 'start') left = tr.left;
    else if (align === 'end') left = tr.right - pr.width;
    else left = tr.left + tr.width / 2 - pr.width / 2;

    /* Clamp into the viewport. */
    left = Math.max(8, Math.min(left, window.innerWidth - pr.width - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - pr.height - 8));

    panel.style.position = 'fixed';
    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
    panel.style.inset = 'auto';
  }
}

/**
 * A single selectable entry inside a `ui-menu`. Gets `role="menuitem"`,
 * joins keyboard navigation, and (by default) closes the panel on click.
 * Reused by any menu-style component (e.g. a future ui-context-menu).
 */
@chargedCustomElement('ui-menu-item')
export class UIMenuItem extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, attribute: 'close-on-click', reflect: true })
  closeOnClick: boolean | null = null;

  protected createRenderRoot() {
    return this;
  }

  protected render() {
    return nothing;
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
      this.tabIndex = this.disabled ? -1 : this.tabIndex;
    }
  }
}

/**
 * A label for a group of items. Renders as a non-interactive header; pair it
 * with a wrapper carrying `role="group"` and `aria-labelledby` if you want a
 * formal optgroup.
 */
@chargedCustomElement('ui-menu-label')
export class UIMenuLabel extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  protected firstUpdated() {
    this.setAttribute('role', 'presentation');
  }

  protected render() {
    return nothing;
  }
}

/** A visual + semantic divider between items. Gets `role="separator"`. */
@chargedCustomElement('ui-menu-separator')
export class UIMenuSeparator extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  protected firstUpdated() {
    this.setAttribute('role', 'separator');
  }

  protected render() {
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-menu': UIMenu;
    'ui-menu-item': UIMenuItem;
    'ui-menu-label': UIMenuLabel;
    'ui-menu-separator': UIMenuSeparator;
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ui-menu': MenuProps & React.Attributes & { children?: React.ReactNode };
      'ui-menu-item': MenuItemProps &
        React.Attributes & { children?: React.ReactNode };
      'ui-menu-label': MenuLabelProps & { children?: React.ReactNode };
      'ui-menu-separator': MenuSeparatorProps;
    }
  }
}
