import { LitElement, html, css } from 'lit';
import type { CSSResultGroup } from 'lit';
import { query, queryAssignedElements } from 'lit/decorators.js';
import { property } from 'lit/decorators.js';
import { chargedCustomElement } from '../../registry';
import './nav-menu.css';

export type NavMenuProps = {
  /** Edge padding (px) kept between the panel and the viewport sides. */
  gutter?: number;
  /** Hover-out delay (ms) before the panel closes. */
  closeDelay?: number;
} & React.HTMLAttributes<HTMLElement>;

/**
 * Nav menu with animated panel transitions.
 *
 * Ported one-to-one from the reference HTML prototype — the open/close,
 * slide-recenter and directional enter/exit animations are intentionally
 * untouched. Authors slot a trigger bar (any element containing
 * `[data-target]` buttons, or the buttons themselves) into
 * `slot="trigger"` and one panel per menu into `slot="content"`.
 *
 * The panels are light DOM, so their state styles (`.active`,
 * `[data-motion]` enter/exit animations) live in nav-menu.css — shadow
 * `static styles` can only reach the shadow-owned chrome (.nav-panel /
 * .viewport) and would never match slotted elements.
 *
 * Each `slot="content"` element may carry a `data-width` attribute (px)
 * declaring its panel width; it defaults to the element's own width.
 */
@chargedCustomElement('ui-nav-menu')
export class UINavMenu extends LitElement {
  @property({ type: Number, reflect: true, attribute: 'gutter' })
  gutter = 16;

  /** Hover-out delay (ms) before the panel closes. */
  @property({ type: Number })
  closeDelay = 150;

  @queryAssignedElements({ slot: 'trigger' })
  private _triggerSlotted!: HTMLElement[];

  @queryAssignedElements({ slot: 'content' })
  private _contents!: HTMLElement[];

  @query('.nav-panel')
  private _panel!: HTMLElement;

  @query('.viewport')
  private _viewport!: HTMLElement;

  /* Shadow-owned chrome only. Slotted panels are styled from
	   nav-menu.css (light DOM). */
  static styles: CSSResultGroup = css`
    :host {
      display: block;
    }

    .nav-panel {
      position: fixed;
      top: 57px; /* replaced with the host's live bottom edge on open */
      left: 0;
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-6px);
      transition:
        opacity 0.2s ease,
        visibility 0.2s ease,
        transform 0.2s ease,
        left 0.22s ease;
      pointer-events: none;
    }
    /* Applied for the styles-flush while opening from closed: position
		   and size snap into place under the hovered trigger so the panel
		   fades in there, instead of sliding from its last location. */
    .nav-panel.snap,
    .viewport.snap {
      transition: none;
    }
    .nav-panel.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }

    .viewport {
      position: relative;
      background: var(--ui-nav-menu-bg, #18181b);
      border: 1px solid var(--ui-nav-menu-border, #27272a);
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
      overflow: hidden;
      transition:
        width 0.22s ease,
        height 0.22s ease;
    }
  `;

  private _triggers: HTMLElement[] = [];
  private _active: string | null = null;
  private _activeIdx = -1;
  private _closeTimer: ReturnType<typeof setTimeout> | null = null;
  private _heights = new Map<string, number>();
  private _wireAbort = new AbortController();
  private _motionCleanups = new Map<HTMLElement, () => void>();

  /** Start a motion animation on a panel, first cancelling any stale
   * animationend listener from a previous motion. Without this, rapidly
   * hovering A → B → A leaves A's old exit listener attached; it fires
   * on the new enter animation's end and strips .active, blanking the
   * open panel. */
  private _setMotion(el: HTMLElement, motion: string, onEnd: () => void) {
    this._motionCleanups.get(el)?.();
    const handler = () => {
      this._motionCleanups.delete(el);
      onEnd();
    };
    this._motionCleanups.set(el, () =>
      el.removeEventListener('animationend', handler),
    );
    el.setAttribute('data-motion', motion);
    el.addEventListener('animationend', handler, { once: true });
  }

  private _clearMotion(el: HTMLElement) {
    this._motionCleanups.get(el)?.();
    this._motionCleanups.delete(el);
    el.removeAttribute('data-motion');
  }

  connectedCallback() {
    super.connectedCallback();
    /* The panel is a shadow descendant of the host, so hover boundary
		   events on the host cover the trigger bar and the open panel in
		   one subtree — same net behavior as the prototype's separate
		   navRoot/panel mouseenter/mouseleave pairs. */
    this.addEventListener('mouseenter', this._cancelClose);
    this.addEventListener('mouseleave', this._scheduleClose);
    this.addEventListener('keydown', this._onKeydown);
    document.addEventListener('click', this._onDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._cancelClose);
    this.removeEventListener('mouseleave', this._scheduleClose);
    this.removeEventListener('keydown', this._onKeydown);
    document.removeEventListener('click', this._onDocumentClick);
    this._wireAbort.abort();
    if (this._closeTimer) clearTimeout(this._closeTimer);
  }

  private _handleSlotChange() {
    this._wireTriggerEvents();
    /* We don't measure here — slot assignment can fire before the slotted
		   light DOM has rendered its own children. Measurement happens on the
		   first show(), with the content displayed. */
  }

  /** Triggers are the `[data-target]` elements: either slotted directly
   * or nested inside a slotted wrapper (e.g. a nav bar). */
  private _collectTriggers(): HTMLElement[] {
    const out: HTMLElement[] = [];
    for (const el of this._triggerSlotted) {
      if (el.dataset.target !== undefined) out.push(el);
      out.push(...el.querySelectorAll<HTMLElement>('[data-target]'));
    }
    return out;
  }

  private _wireTriggerEvents() {
    /* slotchange can fire repeatedly; re-wire from scratch each time so
		   listeners never stack. */
    this._wireAbort.abort();
    this._wireAbort = new AbortController();
    const { signal } = this._wireAbort;

    this._triggers = this._collectTriggers();
    this._triggers.forEach((t) => {
      t.addEventListener('mouseenter', () => this._show(t), { signal });
      t.addEventListener(
        'click',
        () => {
          const id = t.dataset.target || '';
          if (this._active === id) this._scheduleClose();
          else this._show(t);
        },
        { signal },
      );
      // Keyboard support (WCAG 2.1.1, 2.1.2): Enter/Space toggles
      // the panel for the focused trigger, same as click.
      t.addEventListener(
        'keydown',
        (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const id = t.dataset.target || '';
            if (this._active === id) this._scheduleClose();
            else this._show(t);
          }
        },
        { signal },
      );
      // ARIA: tell screen readers which panel this trigger controls.
      t.setAttribute('aria-expanded', 'false');
      t.setAttribute('aria-controls', t.dataset.target || '');
    });
  }

  /** Cache heights of the content panels. Direct port of the prototype's
   * window.load measurement loop: temporarily render each panel
   * off-screen, read its offsetHeight, then restore it. */
  private _measureHeights() {
    for (const el of this._contents) {
      const id = el.dataset.id || '';
      if (!id || this._heights.has(id)) continue;
      el.style.display = 'grid';
      el.style.position = 'fixed';
      el.style.top = '-9999px';
      el.style.visibility = 'hidden';
      this._heights.set(id, el.offsetHeight);
      el.style.display = '';
      el.style.position = '';
      el.style.top = '';
      el.style.visibility = '';
    }
  }

  /** Show the panel for a trigger. */
  private _show(trigger: HTMLElement) {
    this._cancelClose();

    const id = trigger.dataset.target || '';
    if (id === this._active) return;

    const index = this._triggers.indexOf(trigger);
    const prevIdx = this._activeIdx;
    const goRight = index > prevIdx;
    /* Directional slide/recenter only applies while the panel is open
		   (or still fading out mid-close counts as closed): a fresh open
		   snaps into place under the trigger and just fades in. */
    const isOpen = this._panel.classList.contains('open');

    this._measureHeights();

    // Exit current content.
    if (this._active) {
      const cur = this._contents.find(
        (c) => (c.dataset.id || '') === this._active,
      );
      if (cur) {
        if (isOpen) {
          this._setMotion(cur, goRight ? 'to-start' : 'to-end', () => {
            cur.classList.remove('active');
            cur.removeAttribute('data-motion');
          });
        } else {
          this._clearMotion(cur);
          cur.classList.remove('active');
        }
      }
    }

    // Enter next content.
    const next = this._contents.find((c) => (c.dataset.id || '') === id);
    if (next) {
      next.classList.add('active');
      if (this._active && isOpen) {
        this._setMotion(next, goRight ? 'from-end' : 'from-start', () =>
          next.removeAttribute('data-motion'),
        );
      } else {
        this._clearMotion(next);
      }
    }

    if (!isOpen) {
      this._panel.classList.add('snap');
      this._viewport?.classList.add('snap');
    }

    // Size viewport — measured height or live offsetHeight, else fallback.
    const h =
      (next && this._heights.get(id)) || (next && next.offsetHeight) || 300;
    const width = this._panelWidth(next);
    if (this._viewport) {
      this._viewport.style.width = width + 'px';
      this._viewport.style.height = h + 'px';
    }

    // Center panel under trigger.
    this._positionPanel(trigger, width);

    if (!isOpen) {
      /* Flush the new geometry with transitions off, then re-enable
			   them before .open lands so the fade/lift still animates. */
      this._panel.getBoundingClientRect();
      this._panel.classList.remove('snap');
      this._viewport?.classList.remove('snap');
    }

    // Trigger styles (color + chevron rotation live in nav-menu.css).
    this._triggers.forEach((t) => {
      const isActive = t === trigger;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-expanded', String(isActive));
    });

    this._panel.classList.add('open');
    this._active = id;
    this._activeIdx = index;
  }

  private _panelWidth(el: HTMLElement | undefined): number {
    if (!el) return 300;
    if (el.dataset.width) return parseInt(el.dataset.width, 10) || 300;
    return el.offsetWidth || 300;
  }

  private _positionPanel(trigger: HTMLElement, width: number) {
    if (!this._panel) return;
    /* The panel is position: fixed, so it works in viewport coordinates:
		   its top edge is the host's current bottom edge — the equivalent of
		   the prototype's fixed top: 57px under a sticky 57px nav. */
    const hostRect = this.getBoundingClientRect();
    this._panel.style.top = hostRect.bottom + 'px';

    /* Center under the trigger, clamped to the host nav's edges. The
		   prototype clamps to the window because its nav spans the window;
		   clamping to the host generalizes that to embedded nav bars. The
		   gutter shrinks when the panel barely fits. */
    const g = Math.max(0, Math.min(this.gutter, (hostRect.width - width) / 2));
    const tRect = trigger.getBoundingClientRect();
    let left = tRect.left + tRect.width / 2 - width / 2;
    left = Math.max(
      hostRect.left + g,
      Math.min(left, hostRect.right - width - g),
    );
    this._panel.style.left = left + 'px';
  }

  private _cancelClose = () => {
    if (this._closeTimer) {
      clearTimeout(this._closeTimer);
      this._closeTimer = null;
    }
  };

  private _scheduleClose = () => {
    this._cancelClose();
    this._closeTimer = setTimeout(() => {
      this._panel?.classList.remove('open');
      this._triggers.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-expanded', 'false');
      });
      setTimeout(() => {
        this._contents.forEach((c) => {
          this._clearMotion(c);
          c.classList.remove('active');
        });
        this._active = null;
        this._activeIdx = -1;
      }, 200);
    }, this.closeDelay);
  };

  private _onDocumentClick = (e: MouseEvent) => {
    const path = e.composedPath();
    if (!path.includes(this)) this._scheduleClose();
  };

  /** Escape closes the panel and returns focus to the active trigger
   * (WCAG 2.4.3 Focus Order). */
  private _onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this._active) {
      e.preventDefault();
      // Find the active trigger and return focus to it after closing.
      const activeTrigger = this._triggers.find(
        (t) => (t.dataset.target || '') === this._active,
      );
      this._scheduleClose();
      if (activeTrigger) (activeTrigger as HTMLElement).focus();
    }
  };

  render() {
    return html`
      <slot name="trigger" @slotchange=${this._handleSlotChange}></slot>
      <div class="nav-panel">
        <div class="viewport">
          <slot name="content" @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-nav-menu': UINavMenu;
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ui-nav-menu': NavMenuProps & {
        children?: React.ReactNode;
      };
    }
  }
}
