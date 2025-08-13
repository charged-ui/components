import { b as n, a as b, n as l, h as p, c as g, k as y } from "./vendor.js";
import { c as f } from "./registry-CBck5F9C.js";
const x = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.static{position:static}.flex{display:flex}.gap-2{gap:.5rem}.rounded-lg{border-radius:.5rem}.border{border-width:1px}.border-solid{border-style:solid}.border-emerald-200{--tw-border-opacity:1;border-color:rgb(167 243 208/var(--tw-border-opacity))}.border-orange-200{--tw-border-opacity:1;border-color:rgb(254 215 170/var(--tw-border-opacity))}.border-red-200{--tw-border-opacity:1;border-color:rgb(254 202 202/var(--tw-border-opacity))}.border-sky-200{--tw-border-opacity:1;border-color:rgb(186 230 253/var(--tw-border-opacity))}.bg-emerald-50{--tw-bg-opacity:1;background-color:rgb(236 253 245/var(--tw-bg-opacity))}.bg-orange-50{--tw-bg-opacity:1;background-color:rgb(255 247 237/var(--tw-bg-opacity))}.bg-red-50{--tw-bg-opacity:1;background-color:rgb(254 242 242/var(--tw-bg-opacity))}.bg-sky-50{--tw-bg-opacity:1;background-color:rgb(240 249 255/var(--tw-bg-opacity))}.p-4{padding:1rem}.text-emerald-700{--tw-text-opacity:1;color:rgb(4 120 87/var(--tw-text-opacity))}.text-orange-700{--tw-text-opacity:1;color:rgb(194 65 12/var(--tw-text-opacity))}.text-red-700{--tw-text-opacity:1;color:rgb(185 28 28/var(--tw-text-opacity))}.text-sky-700{--tw-text-opacity:1;color:rgb(3 105 161/var(--tw-text-opacity))}";
var u = Object.defineProperty, v = Object.getOwnPropertyDescriptor, w = (t, o, s, e) => {
  for (var r = e > 1 ? void 0 : e ? v(o, s) : o, i = t.length - 1, c; i >= 0; i--)
    (c = t[i]) && (r = (e ? c(o, s, r) : c(r)) || r);
  return e && r && u(o, s, r), r;
}, d = /* @__PURE__ */ ((t) => (t.Success = "success", t.Error = "error", t.Warning = "warning", t.Info = "info", t))(d || {});
let a = class extends p {
  constructor() {
    super(...arguments), this.variant = "info";
  }
  render() {
    const t = g(
      "flex",
      "gap-2",
      "p-4",
      "border",
      "border-solid",
      "rounded-lg",
      m[this.variant]
    );
    return y`
      <div role="alert" class=${t}>
        <slot name="icon"></slot>
        <div>
          <slot name="heading"></slot>
          <slot name="message"></slot>
        </div>
      </div>
    `;
  }
};
a.styles = b`
    ${n(x)}
    :host {
      width: -webkit-fill-available;
    }
    ::slotted([slot='heading']) {
      font-weight: 600;
    }
    ::slotted([slot='message']) {
      font-size: 14px;
    }
  `;
w([
  l({ type: d })
], a.prototype, "variant", 2);
a = w([
  f("ui-avatar")
], a);
const m = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-700",
  error: "bg-red-50 border-red-200 text-red-700",
  warning: "bg-orange-50 border-orange-200 text-orange-700",
  info: "bg-sky-50 border-sky-200 text-sky-700"
};
export {
  d as AvatarVariant,
  a as UIAvatar
};
