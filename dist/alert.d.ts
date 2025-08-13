import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit-html';

export declare enum AlertVariant {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info"
}

export declare class UIAlert extends LitElement {
    variant: AlertVariant;
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export { }


declare global {
    interface HTMLElementTagNameMap {
        'ui-bg-ripple': RippleBackground;
    }
}
