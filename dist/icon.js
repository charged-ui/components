import { b as p, a as l, n as w, r as h, h as d, d as f } from "./vendor.js";
import { c as u } from "./registry-CBck5F9C.js";
const y = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.static{position:static}.block{display:block}.outline{outline-style:solid}";
var b = Object.defineProperty, g = Object.getOwnPropertyDescriptor, a = (o, n, s, t) => {
  for (var r = t > 1 ? void 0 : t ? g(n, s) : n, i = o.length - 1, c; i >= 0; i--)
    (c = o[i]) && (r = (t ? c(n, s, r) : c(r)) || r);
  return t && r && b(n, s, r), r;
};
let e = class extends d {
  constructor() {
    super(...arguments), this.variant = "outline", this.size = "24", this.content = "";
  }
  /**
   * Checks for changes in 'name' or 'variant' and fetches the new icon.
   */
  async updated(o) {
    (o.has("name") || o.has("variant")) && await this.fetchIcon();
  }
  /**
   * Fetches the SVG for the specified icon from the CDN.
   */
  async fetchIcon() {
    if (!this.name) return;
    const o = "https://cdn.jsdelivr.net/npm/heroicons@latest", n = this.variant === "solid" ? "solid" : "outline", s = `${o}/${this.size}/${n}/${this.name}.svg`;
    try {
      const t = await fetch(s);
      if (!t.ok) throw new Error("Icon not found");
      this.content = await t.text();
    } catch (t) {
      console.error(`Failed to fetch icon: ${t}`), this.content = "";
    }
  }
  render() {
    if (this.content)
      return f(this.content);
  }
};
e.styles = l`
    ${p(y)}
    :host {
      display: block;
      width: 24px;
      height: 24px;
    }
  `;
a([
  w({ type: String })
], e.prototype, "name", 2);
a([
  w({ type: String })
], e.prototype, "variant", 2);
a([
  w({ type: String })
], e.prototype, "size", 2);
a([
  h()
], e.prototype, "content", 2);
e = a([
  u("ui-icon")
], e);
export {
  e as UIIcon
};
