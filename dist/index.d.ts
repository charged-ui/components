import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit-html';

export declare const alignmentClasses: Record<TextAlignment, string>;

export declare enum TextAlignment {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right",
    JUSTIFY = "justify"
}

export declare enum TextVariant {
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

export declare class UICard extends LitElement {
    variant?: string;
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export declare class UIText extends LitElement {
    variant: TextVariant;
    align: TextAlignment;
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export declare const variantClasses: Record<TextVariant, string>;

export { }


declare global {
    interface HTMLElementTagNameMap {
        'ui-combobox': UICombobox;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'ui-modal': UIModal;
    }
}
