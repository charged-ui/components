import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit-html';

export declare class UIGallery extends LitElement {
    static styles: CSSResult;
    columns: number;
    allLabel?: string;
    activeFilter: string;
    private filters;
    get gridClasses(): string;
    detectFiltersFromChildren(): void;
    formatCategoryLabel(category: string): string;
    setFilter(filterId: string): void;
    updateVisibility(): void;
    animateItems(): void;
    handleSlotChange(): void;
    firstUpdated(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    render(): TemplateResult<1>;
}

export { }


declare global {
    interface HTMLElementTagNameMap {
        'ui-combobox': UICombobox;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'ui-bg-meteors': MeteorsComponent;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'ui-bg-dots': DotsBackground;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'ui-modal': UIModal;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'ui-bg-ripple': RippleBackground;
    }
}
