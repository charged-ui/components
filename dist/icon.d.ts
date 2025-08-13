import { CSSResult } from 'lit';
import { DirectiveResult } from 'lit-html/directive';
import { LitElement } from 'lit';
import { UnsafeHTMLDirective } from 'lit-html/directives/unsafe-html';

export declare class UIIcon extends LitElement {
    name?: string;
    variant: 'outline' | 'solid';
    size: string;
    private content;
    static styles: CSSResult;
    /**
     * Checks for changes in 'name' or 'variant' and fetches the new icon.
     */
    updated(changedProperties: Map<string, any>): Promise<void>;
    /**
     * Fetches the SVG for the specified icon from the CDN.
     */
    fetchIcon(): Promise<void>;
    render(): DirectiveResult<UnsafeHTMLDirective> | undefined;
}

export { }


declare global {
    interface HTMLElementTagNameMap {
        'ui-bg-ripple': RippleBackground;
    }
}
