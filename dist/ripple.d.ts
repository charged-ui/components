import { CSSResultGroup } from 'lit';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit-html';

export declare class RippleBackground extends LitElement {
    mainCircleSize: number;
    mainCircleOpacity: number;
    numCircles: number;
    static styles: CSSResultGroup;
    private generateCircles;
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
