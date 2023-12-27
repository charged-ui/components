"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./accordion.css");
class ChargedAccordion extends HTMLElement {
    constructor() {
        super();
    }
    // Called when the element is added to the DOM.
    connectedCallback() {
        this.addEventListener('toggle', this.handleToggle, true);
    }
    // Called when the element is removed from the DOM.
    disconnectedCallback() {
        this.removeEventListener('toggle', this.handleToggle, true);
    }
    expand() { }
    collapse() { }
    // Called when a ToggleEvent occurs
    handleToggle(e) {
        // Target element
        const target = e.target;
        // If accordion is closed, stop execution
        if (!(target === null || target === void 0 ? void 0 : target.open))
            return;
        // Find open accordion items
        const open = this.querySelectorAll('details[open]');
        // Close previously open accordion items
        for (const child of open) {
            if (child === target)
                continue;
            child.removeAttribute('open');
        }
    }
}
customElements.define('ui-accordion', ChargedAccordion);
//# sourceMappingURL=accordion.js.map