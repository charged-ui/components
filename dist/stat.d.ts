import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit-html';

declare enum TextAlignment {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right",
    JUSTIFY = "justify"
}

declare enum TextVariant {
    H1 = "heading-1",
    H2 = "heading-2",
    H3 = "heading-3",
    H4 = "heading-4",
    H5 = "heading-5",
    H6 = "heading-6",
    D1 = "display-1",
    D2 = "display-2",
    D3 = "display-3",
    D4 = "display-4",
    D5 = "display-5",
    D6 = "display-6",
    XL = "copy-xl",
    LG = "copy-lg",
    MD = "copy-md",
    SM = "copy-sm",
    XS = "copy-xs"
}

export declare class UIStat extends UIText {
    start: number;
    end: number;
    duration: number;
    delay: number;
    private counter?;
    static styles: CSSResult;
    firstUpdated(): void;
    render(): TemplateResult<1>;
}

declare class UIText extends LitElement {
    variant: TextVariant;
    align: TextAlignment;
    static styles: CSSResult;
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
