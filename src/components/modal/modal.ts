import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { safeCustomElement } from '../registry';

@safeCustomElement('ui-modal')
export class UIModal extends LitElement {
  @property({ type: Boolean, reflect: true }) isOpen = false;
  @property({ type: String }) title = '';
  @property({ type: Boolean }) closeOnBackdrop = true;
  @property({ type: Boolean }) closeOnEscape = true;
  @property({ type: String }) size = 'md'; // sm, md, lg, xl

  @state() private _portalContainer: HTMLElement | null = null;

  static styles = css`
    :host {
      display: contents;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._createPortalContainer();
    this._bindEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupPortalContainer();
    this._unbindEvents();
  }

  private _createPortalContainer() {
    if (!this._portalContainer) {
      this._portalContainer = document.createElement('div');
      this._portalContainer.id = `dialog-portal-${Math.random().toString(36).substr(2, 9)}`;
      document.body.appendChild(this._portalContainer);
    }
  }

  private _cleanupPortalContainer() {
    if (this._portalContainer && this._portalContainer.parentNode) {
      this._portalContainer.parentNode.removeChild(this._portalContainer);
      this._portalContainer = null;
    }
  }

  private _bindEvents() {
    if (this.closeOnEscape) {
      document.addEventListener('keydown', this._handleKeydown);
    }
  }

  private _unbindEvents() {
    document.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  };

  private _handleBackdropClick = (e: MouseEvent) => {
    if (this.closeOnBackdrop && e.target === e.currentTarget) {
      this.close();
    }
  };

  private _getSizeClasses() {
    const sizeMap = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl'
    };
    // return sizeMap[this.size] || sizeMap.md;
    return sizeMap.lg;
  }

  open() {
    this.isOpen = true;
    this._preventBodyScroll();
    this.dispatchEvent(new CustomEvent('dialog-opened', { bubbles: true }));
  }

  close() {
    this.isOpen = false;
    this._restoreBodyScroll();
    this.dispatchEvent(new CustomEvent('dialog-closed', { bubbles: true }));
  }

  private _preventBodyScroll() {
    document.body.style.overflow = 'hidden';
  }

  private _restoreBodyScroll() {
    document.body.style.overflow = '';
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('isOpen') && this._portalContainer) {
      if (this.isOpen) {
        this._renderToPortal();
      } else {
        this._restoreContent();
        this._portalContainer.innerHTML = '';
      }
    }
  }

  private _restoreContent() {
    if (!this._portalContainer) return;

    // Move content back to the original component when closing
    const contentContainer =
      this._portalContainer.querySelector('.modal-content');
    if (contentContainer) {
      const elements = Array.from(contentContainer.children);
      elements.forEach((element) => {
        this.appendChild(element);
      });
    }
  }

  private _renderToPortal() {
    if (!this._portalContainer) return;

    // Create the modal backdrop and container
    const backdrop = document.createElement('div');
    backdrop.className =
      'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm';
    backdrop.addEventListener('click', this._handleBackdropClick);

    const modalContainer = document.createElement('div');
    modalContainer.className = `relative w-full ${this._getSizeClasses()} bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-out`;
    modalContainer.setAttribute('role', 'dialog');
    modalContainer.setAttribute('aria-modal', 'true');
    if (this.title) {
      modalContainer.setAttribute('aria-labelledby', 'dialog-title');
    }

    // Create header if title exists
    if (this.title) {
      const header = document.createElement('div');
      header.className =
        'flex items-center justify-between p-4 border-b border-gray-200';

      const titleElement = document.createElement('h2');
      titleElement.id = 'dialog-title';
      titleElement.className = 'text-lg font-semibold text-gray-900';
      titleElement.textContent = this.title;

      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className =
        'text-gray-400 hover:text-gray-600 transition-colors';
      closeButton.setAttribute('aria-label', 'Close dialog');
      closeButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `;
      closeButton.addEventListener('click', () => this.close());

      header.appendChild(titleElement);
      header.appendChild(closeButton);
      modalContainer.appendChild(header);
    }

    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'modal-content';

    // Move the slotted content to the portal (preserve reactivity)
    const slottedElements = Array.from(this.children);
    slottedElements.forEach((element) => {
      contentContainer.appendChild(element);
    });

    modalContainer.appendChild(contentContainer);
    backdrop.appendChild(modalContainer);

    // Clear and add to portal
    this._portalContainer.innerHTML = '';
    this._portalContainer.appendChild(backdrop);
  }

  render() {
    // The actual rendering happens in the portal, so we return nothing here
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-modal': UIModal;
  }
}
