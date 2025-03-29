import { i as h, r as x, n as d, h as f, k as p, c as w, t as y } from "./vendor.js";
const m = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.static{position:static}.inline{display:inline}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-justify{text-align:justify}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-4xl{font-size:2.25rem;line-height:2.5rem}.text-5xl{font-size:3rem;line-height:1}.text-6xl{font-size:3.75rem;line-height:1}.text-7xl{font-size:4.5rem;line-height:1}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-light{font-weight:300}.font-medium{font-weight:500}.font-semibold{font-weight:600}.tracking-tight{letter-spacing:-.025em}.underline{text-decoration-line:underline}.decoration-blue-500{text-decoration-color:#3b82f6}.decoration-emerald-500{text-decoration-color:#10b981}.decoration-orange-500{text-decoration-color:#f97316}.decoration-purple-500{text-decoration-color:#a855f7}.decoration-red-500{text-decoration-color:#ef4444}.decoration-solid{text-decoration-style:solid}.decoration-double{text-decoration-style:double}.decoration-dotted{text-decoration-style:dotted}.decoration-dashed{text-decoration-style:dashed}.decoration-wavy{text-decoration-style:wavy}.decoration-2{text-decoration-thickness:2px}.underline-offset-4{text-underline-offset:4px}";
var u = Object.defineProperty, b = Object.getOwnPropertyDescriptor, a = (t, o, r, n) => {
  for (var e = n > 1 ? void 0 : n ? b(o, r) : o, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (e = (n ? l(o, r, e) : l(e)) || e);
  return n && e && u(o, r, e), e;
}, c = /* @__PURE__ */ ((t) => (t.H1 = "heading-1", t.H2 = "heading-2", t.H3 = "heading-3", t.H4 = "heading-4", t.H5 = "heading-5", t.H6 = "heading-6", t.D1 = "display-1", t.D2 = "display-2", t.D3 = "display-3", t.D4 = "display-4", t.D5 = "display-5", t.D6 = "display-6", t.XL = "copy-xl", t.LG = "copy-lg", t.MD = "copy-md", t.SM = "copy-sm", t.XS = "copy-xs", t))(c || {}), g = /* @__PURE__ */ ((t) => (t.LEFT = "left", t.CENTER = "center", t.RIGHT = "right", t.JUSTIFY = "justify", t))(g || {});
let i = class extends f {
  constructor() {
    super(...arguments), this.variant = "copy-md", this.align = "left";
  }
  render() {
    return p`<slot
      class=${w(
      "inline",
      // 'underline-offset-4',
      // 'decoration-2',
      k[this.variant],
      v[this.align]
    )}
    />`;
  }
};
i.styles = h`
    :host {
      width: -webkit-fill-available;
    }
    ${x(m)}
  `;
a([
  d({ type: c })
], i.prototype, "variant", 2);
a([
  d({ type: g })
], i.prototype, "align", 2);
i = a([
  y("ui-text")
], i);
const k = {
  "heading-1": "text-7xl font-semibold tracking-tight",
  "heading-2": "text-6xl font-semibold tracking-tight",
  "heading-3": "text-5xl font-semibold tracking-tight",
  "heading-4": "text-4xl font-semibold tracking-tight",
  "heading-5": "text-3xl font-semibold tracking-tight",
  "heading-6": "text-2xl font-semibold tracking-tight",
  "display-1": "text-7xl font-light tracking-tight",
  "display-2": "text-6xl font-light tracking-tight",
  "display-3": "text-5xl font-light tracking-tight",
  "display-4": "text-4xl font-light tracking-tight",
  "display-5": "text-3xl font-light tracking-tight",
  "display-6": "text-2xl font-light tracking-tight",
  "copy-xl": "text-xl font-medium",
  "copy-lg": "text-lg font-medium",
  "copy-md": "text-md",
  "copy-sm": "text-sm",
  "copy-xs": "text-xs"
}, v = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify"
};
export {
  c as T,
  i as U,
  g as a,
  v as b,
  m as s,
  k as v
};
