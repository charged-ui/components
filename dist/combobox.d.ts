import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit-html';

export declare class UICombobox extends LitElement {
    placeholder: string;
    private currentFocus;
    private expanded;
    static styles: CSSResult;
    handleFocus(): void;
    handleBlur(): void;
    handleKeyDown(e: KeyboardEvent): void;
    handleSlotChange(): void;
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
