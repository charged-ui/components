import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit-html';

export declare enum ButtonShape {
    Square = "square",
    Rounded = "rounded"
}

export declare enum ButtonSize {
    Small = "small",
    Medium = "medium",
    Large = "large"
}

export declare enum ButtonVariant {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary",
    Warning = "warning",
    Error = "error",
    Success = "success",
    Info = "info"
}

export declare class UIButton extends LitElement {
    size: ButtonSize;
    shape: ButtonShape;
    variant: ButtonVariant;
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
