import { r as w, a as p, n as c, b as l, h, k as b } from "./vendor.js";
import { c as u } from "./registry-CBck5F9C.js";
const g = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.static{position:static}.absolute{position:absolute}.relative{position:relative}.left-4{left:1rem}.top-3\\.5{top:.875rem}.top-full{top:100%}.z-10{z-index:10}.mt-2{margin-top:.5rem}.hidden{display:none}.h-10{height:2.5rem}.h-5{height:1.25rem}.w-5{width:1.25rem}.w-full{width:100%}.appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}.overflow-hidden{overflow:hidden}.rounded-lg{border-radius:.5rem}.border{border-width:1px}.border-solid{border-style:solid}.border-gray-200{--tw-border-opacity:1;border-color:rgb(229 231 235/var(--tw-border-opacity))}.border-zinc-200{--tw-border-opacity:1;border-color:rgb(228 228 231/var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.pl-0{padding-left:0}.pl-11{padding-left:2.75rem}.pr-4{padding-right:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-gray-400{--tw-text-opacity:1;color:rgb(156 163 175/var(--tw-text-opacity))}.shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}";
var f = Object.defineProperty, m = Object.getOwnPropertyDescriptor, s = (t, o, i, a) => {
  for (var e = a > 1 ? void 0 : a ? m(o, i) : o, n = t.length - 1, d; n >= 0; n--)
    (d = t[n]) && (e = (a ? d(o, i, e) : d(e)) || e);
  return a && e && f(o, i, e), e;
};
let r = class extends h {
  constructor() {
    super(...arguments), this.placeholder = "Search for anything", this.currentFocus = -1, this.expanded = !1;
  }
  handleFocus() {
    this.expanded = !0;
  }
  handleBlur() {
    this.expanded = !1;
  }
  handleKeyDown(t) {
    t.key === "ArrowDown" || t.key === "ArrowUp" ? (t.preventDefault(), t.key) : t.key === "Enter" && this.currentFocus !== -1 ? t.preventDefault() : t.key === "Escape" && (this.expanded = !1);
  }
  handleSlotChange() {
  }
  render() {
    return b`
      <div class="relative">
        <label for="combo-input" class="sr-only">Search or use commands</label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute top-3.5 left-4 h-5 w-5 text-gray-400"
          aria-hidden="true"
        >
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
          <path d="M21 21l-6 -6"></path>
        </svg>
        <input
          type="text"
          id="combo-input"
          class="h-10 pl-11 pr-4 bg-white border border-solid border-zinc-200 rounded-lg appearance-none text-sm"
          placeholder="${this.placeholder}"
          role="combobox"
          aria-expanded="${this.expanded}"
          aria-controls="combo-menu"
          aria-activedescendant=""
          aria-autocomplete="list"
          @focus="${this.handleFocus}"
          @blur="${this.handleBlur}"
          @keydown="${this.handleKeyDown}"
        />
        <ul
          id="combo-menu"
          class="${this.expanded ? "absolute" : "hidden"} w-full mt-2 pl-0 overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200 top-full z-10 border border-solid border-zinc-200"
          role="listbox"
          aria-label="Command options"
        >
          <slot @slotchange=${() => this.handleSlotChange()}></slot>
        </ul>
      </div>
    `;
  }
};
r.styles = p`
    ${w(g)}
  `;
s([
  c({ type: String })
], r.prototype, "placeholder", 2);
s([
  l()
], r.prototype, "currentFocus", 2);
s([
  l()
], r.prototype, "expanded", 2);
r = s([
  u("ui-combobox")
], r);
export {
  r as UICombobox
};
