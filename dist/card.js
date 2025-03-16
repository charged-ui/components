import { i as n, r as c, n as l, h as p, k as b, t as h } from "./vendor.js";
const f = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.static{position:static}.relative{position:relative}.overflow-hidden{overflow:hidden}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-solid{border-style:solid}.border-neutral-200{--tw-border-opacity:1;border-color:rgb(229 229 229/var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.p-8{padding:2rem}.shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";
var g = Object.defineProperty, v = Object.getOwnPropertyDescriptor, d = (i, r, a, o) => {
  for (var t = o > 1 ? void 0 : o ? v(r, a) : r, s = i.length - 1, w; s >= 0; s--)
    (w = i[s]) && (t = (o ? w(r, a, t) : w(t)) || t);
  return o && t && g(r, a, t), t;
};
let e = class extends p {
  render() {
    return b`
      <div
        class="bg-white border border-solid border-neutral-200 rounded-xl relative overflow-hidden shadow-sm"
      >
        <slot name="media"></slot>
        <div class="p-8">
          <slot name="header"></slot>
          <slot name="body"></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    `;
  }
};
e.styles = n`
    ${c(f)}
  `;
d([
  l({ type: String })
], e.prototype, "variant", 2);
e = d([
  h("ui-card")
], e);
export {
  e as UICard
};
