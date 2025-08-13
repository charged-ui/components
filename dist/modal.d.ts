import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit-html';

export declare class UIModal extends LitElement {
    isOpen: boolean;
    title: string;
    closeOnBackdrop: boolean;
    closeOnEscape: boolean;
    size: string;
    private _portalContainer;
    static styles: CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _createPortalContainer;
    private _cleanupPortalContainer;
    private _bindEvents;
    private _unbindEvents;
    private _handleKeydown;
    private _handleBackdropClick;
    private _getSizeClasses;
    open(): void;
    close(): void;
    private _preventBodyScroll;
    private _restoreBodyScroll;
    updated(changedProperties: Map<string, any>): void;
    private _restoreContent;
    private _renderToPortal;
    render(): TemplateResult<1>;
}

export { }
