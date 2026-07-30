import { LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { chargedCustomElement } from '../../registry';
import './dialog.css';

/** Why the dialog closed, carried on the close events. */
export type DialogCloseReason =
  | 'close-button'
  | 'backdrop'
  | 'escape'
  | 'programmatic';

/** React props for `<ui-dialog>`. */
export type DialogProps = {
  /**
   * Whether the dialog is shown (controlled).
   * Reflects to the `open` attribute.
   * @default false
   */
  open?: boolean;
  /**
   * Whether clicking the backdrop closes the dialog.
   * @default false
   */
  'light-dismiss'?: boolean;
} & React.HTMLAttributes<HTMLElement>;

/** Detail payload of `ui-dialog-close` and `ui-dialog-request-close`. */
export interface UIDialogCloseEvent extends CustomEvent {
  detail: { reason: DialogCloseReason };
}

let instanceCount = 0;

/* ------------------------------------------------------------------ *
 * Body scroll lock — reference-counted so overlapping modals never double-lock
 * or prematurely restore the page state.
 * ------------------------------------------------------------------ */
let scrollLockCount = 0;
let scrollLockSnapshot: { overflow: string; padding: string } | null = null;

/** Locks background scroll. Only the first call mutates the document; pair
 *  every call with `unlockBodyScroll()`. */
function lockBodyScroll() {
  if (scrollLockCount === 0) {
    const root = document.documentElement;
    scrollLockSnapshot = {
      overflow: root.style.overflow,
      padding: root.style.paddingRight,
    };
    root.style.overflow = 'hidden';
    // Compensate for the vanishing scrollbar so the page doesn't shift.
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`;
  }
  scrollLockCount++;
}

/** Releases one hold on the scroll lock. Restores the page on the last release. */
function unlockBodyScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0 && scrollLockSnapshot) {
    const root = document.documentElement;
    root.style.overflow = scrollLockSnapshot.overflow;
    root.style.paddingRight = scrollLockSnapshot.padding;
    scrollLockSnapshot = null;
  }
}

/**
 * Accessible modal dialog built on the native `<dialog>` element. The component
 * only adds behaviour — focus management, scroll locking, light dismissal,
 * cancelable events — while the author's markup stays in light DOM, fully
 * styleable with Tailwind utilities or the `--ui-dialog-*` custom properties.
 *
 * ```html
 * <ui-dialog light-dismiss>
 *   <ui-button slot="trigger"><button>Open</button></ui-button>
 *   <dialog>
 *     <header slot="header">
 *       <h2 slot="title">Delete project</h2>
 *       <button slot="close" aria-label="Close">✕</button>
 *     </header>
 *     <div slot="body">This can’t be undone.</div>
 *     <footer slot="footer">
 *       <button data-dialog-close>Cancel</button>
 *       <ui-button data-variant="error"><button>Delete</button></ui-button>
 *     </footer>
 *   </dialog>
 * </ui-dialog>
 * ```
 */
@chargedCustomElement('ui-dialog')
export class UIDialog extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  open = false;

  @property({ type: Boolean, reflect: true, attribute: 'light-dismiss' })
  lightDismiss = false;

  /** Unique id per instance; ids live in light DOM, so they must be unique. */
  private readonly uid = `ui-dialog-${++instanceCount}`;

  /** The control that opened the dialog; restored to it on close. */
  private _previouslyFocused: HTMLElement | null = null;
  /** Reason carried by the *next* close event. Defaults to `'programmatic'`. */
  private _closeReason: DialogCloseReason = 'programmatic';
  /** Whether the dialog is currently presented. Guards single-shot teardown. */
  private _active = false;
  /** Whether this instance currently holds a scroll-lock reference. */
  private _scrollLocked = false;
  private _wireAbort = new AbortController();

  protected createRenderRoot() {
    return this;
  }

  protected render() {
    return nothing;
  }

  /* ------------------------------------------------------------------ *
   * Element resolution
   * ------------------------------------------------------------------ */

  /** The modal surface — a native `<dialog>` that is a direct child. */
  private get dialogEl(): HTMLDialogElement | null {
    return this.querySelector(':scope > dialog');
  }

  /** The optional trigger wrapper slotted next to the dialog. */
  private get triggerEl(): HTMLElement | null {
    return this.querySelector(':scope > [slot="trigger"]');
  }

  /** The focusable control inside the trigger: the trigger itself, or the first
   *  button/link/[tabindex] within it (so a `<ui-button>` wrapper works too). */
  private get controlEl(): HTMLElement | null {
    const trigger = this.triggerEl;
    if (!trigger) return null;
    return (
      trigger.querySelector<HTMLElement>('button, a[href], [tabindex]') ??
      trigger
    );
  }

  /* ------------------------------------------------------------------ *
   * Lifecycle
   * ------------------------------------------------------------------ */

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('slotchange', this._onSlotChange);
    // Listen at the host so every level of nesting is caught at once.
    this.addEventListener('ui-dialog-nested-change', this._recountNested);
  }

  /** Releases listeners and the scroll lock, and closes the native `<dialog>` if
   *  it was open (so it doesn't leak into the top layer). */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('slotchange', this._onSlotChange);
    this.removeEventListener('ui-dialog-nested-change', this._recountNested);
    this._wireAbort.abort();
    this._unlockScroll();
    this._active = false;
    if (this.dialogEl?.open) {
      this.dialogEl.close();
      this._notifyNestedChange();
    }
  }

  protected firstUpdated() {
    this._wire();
  }

  /** Reconciles the native `<dialog>` with the `open` property when it changes. */
  protected updated(changed: Map<string, unknown>) {
    if (changed.has('open')) this._syncOpen();
  }

  private _onSlotChange = () => this._wire();

  /* ------------------------------------------------------------------ *
   * Wiring
   * ------------------------------------------------------------------ */

  /** Attaches behaviour to the author's `<dialog>` and trigger. Idempotent:
   *  every call drops the previous wiring via a fresh `AbortController`. */
  private _wire() {
    this._wireAbort.abort();
    this._wireAbort = new AbortController();
    const { signal } = this._wireAbort;

    const dialog = this.dialogEl;
    if (!dialog) return;

    // The native `<dialog>` already exposes role="dialog" + aria-modal when
    // shown modally; we only wire up the labelling relationships.
    const title = dialog.querySelector<HTMLElement>('[slot="title"]');
    if (title) {
      title.id ||= `${this.uid}-title`;
      dialog.setAttribute('aria-labelledby', title.id);
    }
    const description = dialog.querySelector<HTMLElement>(
      '[slot="description"]',
    );
    if (description) {
      description.id ||= `${this.uid}-description`;
      dialog.setAttribute('aria-describedby', description.id);
    }

    // Intercept Esc so an author can veto it and the reason is reported.
    dialog.addEventListener('cancel', this._onCancel, { signal });
    // Catches closes we don't drive ourselves (form submit, dialog.close()).
    dialog.addEventListener('close', this._onNativeClose, { signal });
    // One delegated handler covers close controls + backdrop dismissal.
    dialog.addEventListener('click', this._onDialogClick, { signal });

    const control = this.controlEl;
    if (control) {
      control.setAttribute('aria-haspopup', 'dialog');
      control.setAttribute('aria-expanded', String(this.open));
      control.addEventListener('click', this._onTriggerClick, { signal });
    }

    // Flag nested dialogs once: their own backdrop is suppressed (see CSS).
    const nested = !!this.parentElement?.closest('ui-dialog');
    dialog.toggleAttribute('data-nested', nested);
    this._recountNested();

    /* Honour markup that shipped `open` (SSR/CMS) before we wired up. */
    if (this.open && !dialog.open) this._syncOpen();
  }

  /* ------------------------------------------------------------------ *
   * Open / close
   * ------------------------------------------------------------------ */

  /**
   * Opens the dialog. No-op if already open.
   *
   * @fires ui-dialog-open - After the dialog opens.
   */
  show() {
    if (this.open) return;
    this.open = true; // triggers _syncOpen via updated()
  }

  /**
   * Requests to close the dialog. The dialog stays open if the event is
   * prevented.
   *
   * @param reason - Why the dialog is closing. Defaults to `'programmatic'`.
   * @fires ui-dialog-request-close - Cancelable; prevent to keep the dialog open.
   * @fires ui-dialog-close - After the dialog closes (if not prevented).
   */
  close(reason: DialogCloseReason = 'programmatic') {
    this._requestClose(reason);
  }

  private _onTriggerClick = () => this.show();

  /**
   * Routes the native `cancel` (Esc) through the request-close flow so an
   * author can veto it and the reason is reported as `'escape'`.
   *
   * @param e - The native `cancel` event.
   */
  private _onCancel = (e: Event) => {
    e.preventDefault(); // stop the browser's own force-close
    this._requestClose('escape');
  };

  /**
   * Emits the cancelable `ui-dialog-request-close`; on proceed, records the
   * reason and sets `open` to false (leaving `_syncOpen` to do the close).
   *
   * @param reason - The close reason to attach to the event.
   */
  private _requestClose(reason: DialogCloseReason) {
    if (!this.open) return;
    const proceed = this.dispatchEvent(
      new CustomEvent('ui-dialog-request-close', {
        bubbles: true,
        cancelable: true,
        detail: { reason },
      }),
    );
    if (!proceed) return; // author vetoed
    this._closeReason = reason;
    this.open = false;
  }

  /** Reconciles the native `<dialog>` with the `open` property. */
  private _syncOpen() {
    const dialog = this.dialogEl;
    if (!dialog) return;
    this.controlEl?.setAttribute('aria-expanded', String(this.open));

    if (this.open && !dialog.open) {
      this._previouslyFocused =
        (document.activeElement as HTMLElement) ?? this.controlEl;
      dialog.showModal();
      this._lockScroll();
      this._active = true;
      this._notifyNestedChange();
      this.dispatchEvent(new CustomEvent('ui-dialog-open', { bubbles: true }));
    } else if (!this.open && dialog.open) {
      dialog.close();
      // Drive teardown ourselves; some engines don't fire `close` from close().
      this._teardown();
    }
  }

  /** Handles closes we didn't drive (form submit, a direct `dialog.close()`). */
  private _onNativeClose = () => this._teardown();

  /** Restores focus, releases the scroll lock, and emits `ui-dialog-close`.
   *  Runs at most once per open (guarded by `_active`). */
  private _teardown() {
    if (!this._active) return;
    this._active = false;
    this.open = false; // keep the property in step for external closes
    this._notifyNestedChange();
    this._unlockScroll();
    this.controlEl?.setAttribute('aria-expanded', 'false');
    this._previouslyFocused?.focus?.();
    this._previouslyFocused = null;
    this.dispatchEvent(
      new CustomEvent('ui-dialog-close', {
        bubbles: true,
        detail: { reason: this._closeReason },
      }),
    );
    this._closeReason = 'programmatic';
  }

  /**
   * Handles close-control clicks and, when `light-dismiss` is set, backdrop
   * clicks.
   *
   * @param e - The delegated click event from the dialog.
   */
  private _onDialogClick = (e: MouseEvent) => {
    const dialog = this.dialogEl;
    if (!dialog) return;

    const closer = (e.target as Element | null)?.closest(
      '[data-dialog-close], [slot="close"]',
    );
    // Only honour close controls in *this* dialog; a child's click bubbles up
    // but belongs to its own closest ui-dialog.
    if (closer && closer.closest('ui-dialog') === this) {
      e.preventDefault();
      this._requestClose('close-button');
      return;
    }

    if (!this.lightDismiss) return;
    if (e.button !== 0) return; // primary (left) button only
    // A backdrop click lands on the dialog element but outside its border box.
    if (e.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inside) this._requestClose('backdrop');
  };

  /* ------------------------------------------------------------------ *
   * Nested dialogs
   *
   * Native <dialog> already stacks nested showModal() calls in the top layer
   * and traps focus on the topmost. We only publish a live count of open
   * descendants as CSS theming hooks for the depth cue.
   * ------------------------------------------------------------------ */

  /** Bubbles a recount request up to every ancestor ui-dialog. */
  private _notifyNestedChange() {
    this.dispatchEvent(
      new CustomEvent('ui-dialog-nested-change', { bubbles: true }),
    );
  }

  /** Publishes the open-descendant count to CSS: `--nested-dialogs` (depth) and
   *  `data-nested-dialog-open` (present when any child is open). */
  private _recountNested = () => {
    const dialog = this.dialogEl;
    if (!dialog) return;
    const count = dialog.querySelectorAll('ui-dialog > dialog[open]').length;
    dialog.style.setProperty('--nested-dialogs', String(count));
    dialog.toggleAttribute('data-nested-dialog-open', count > 0);
  };

  /* ------------------------------------------------------------------ *
   * Body scroll lock
   * ------------------------------------------------------------------ */

  /** Acquires a scroll-lock reference for this dialog. */
  private _lockScroll() {
    if (this._scrollLocked) return;
    lockBodyScroll();
    this._scrollLocked = true;
  }

  /** Releases this dialog's scroll-lock reference. */
  private _unlockScroll() {
    if (!this._scrollLocked) return;
    unlockBodyScroll();
    this._scrollLocked = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-dialog': UIDialog;
  }
  interface GlobalEventHandlersEventMap {
    /** Fired after the dialog opens. */
    'ui-dialog-open': CustomEvent;
    /** Fired after the dialog closes, with `{ reason }`. */
    'ui-dialog-close': UIDialogCloseEvent;
    /** Fired before closing — cancelable to keep the dialog open. Carries `{ reason }`. */
    'ui-dialog-request-close': UIDialogCloseEvent;
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ui-dialog': DialogProps &
        React.Attributes & { children?: React.ReactNode };
    }
  }
}
