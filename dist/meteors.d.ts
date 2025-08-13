import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { PropertyValues } from 'lit';
import { TemplateResult } from 'lit-html';

export declare class MeteorsComponent extends LitElement {
    number: number;
    minDelay: number;
    maxDelay: number;
    minDuration: number;
    maxDuration: number;
    angle: number;
    private meteorStyles;
    static styles: CSSResult;
    protected firstUpdated(): void;
    protected updated(changedProperties: PropertyValues): void;
    private generateMeteorStyles;
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
