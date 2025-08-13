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
        'ui-bg-ripple': RippleBackground;
    }
}
