import { LitElement } from 'lit';
import './button.css';
export declare class MyButton extends LitElement {
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ui-button': MyButton;
    }
}
