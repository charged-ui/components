import { a as l, h as d, k as c, t as g } from "./vendor.js";
var p = Object.getOwnPropertyDescriptor, b = (a, r, s, n) => {
  for (var t = n > 1 ? void 0 : n ? p(r, s) : r, e = a.length - 1, i; e >= 0; e--)
    (i = a[e]) && (t = i(t) || t);
  return t;
};
let o = class extends d {
  render() {
    return c`
      <div class="container">
        <div class="ui-bg-dots-pattern"></div>
        <div class="dot-mask-gradient"></div>
        <slot></slot>
      </div>
    `;
  }
};
o.styles = l`
    :host {
      /* Make the custom element a block element and allow it to fill its parent */
      display: block;
      width: 100%;
      height: 100%;
      position: relative; /* Ensure the host is relative for absolute children */

      /* CSS Variables for customization - Light Mode Defaults */
      --dot-bg-color: white;
      --dot-pattern-color: #d4d4d4; /* Tailwind neutral-300 */
      --dot-mask-bg-color: white;
      /* Text gradient variables are no longer needed in this background-only component */
    }

    /* Dark Mode Overrides (apply 'dark' class to the <ui-bg-dots> element) */
    :host(.dark) {
      --dot-bg-color: black;
      --dot-pattern-color: #404040; /* Tailwind neutral-700 */
      --dot-mask-bg-color: black;
    }

    .container {
      background-color: var(--dot-bg-color);
      position: absolute; /* Fill the host element */
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden; /* Hide overflow from the background patterns */
    }

    .ui-bg-dots-pattern {
      background-size: 20px 20px;
      background-image: radial-gradient(
        var(--dot-pattern-color) 1px,
        transparent 1px
      );
      position: absolute;
      inset: 0;
    }

    .dot-mask-gradient {
      background-color: var(--dot-mask-bg-color);
      mask-image: radial-gradient(ellipse at center, transparent 20%, black);
      pointer-events: none; /* Allow clicks to pass through the mask */
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Slot for content */
    ::slotted(*) {
      position: relative; /* Ensure slotted content is above the background */
      z-index: 20; /* Match the original z-index for content */
    }
  `;
o = b([
  g("ui-bg-dots")
], o);
export {
  o as DotsBackground
};
