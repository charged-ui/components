import { i as p, r as h, n as w, a as l, h as d, b as f, t as u } from "./vendor.js";
const y = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.static{position:static}.outline{outline-style:solid}";
var g = Object.defineProperty, b = Object.getOwnPropertyDescriptor, i = (e, n, s, t) => {
  for (var o = t > 1 ? void 0 : t ? b(n, s) : n, a = e.length - 1, c; a >= 0; a--)
    (c = e[a]) && (o = (t ? c(n, s, o) : c(o)) || o);
  return t && o && g(n, s, o), o;
};
let r = class extends d {
  constructor() {
    super(...arguments), this.variant = "outline", this.size = "24", this.content = "";
  }
  /**
   * Checks for changes in 'name' or 'variant' and fetches the new icon.
   */
  async updated(e) {
    (e.has("name") || e.has("variant")) && await this.fetchIcon();
  }
  /**
   * Fetches the SVG for the specified icon from the CDN.
   */
  async fetchIcon() {
    if (!this.name) return;
    const e = "https://cdn.jsdelivr.net/npm/heroicons@latest", n = this.variant === "solid" ? "solid" : "outline", s = `${e}/${this.size}/${n}/${this.name}.svg`;
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
r.styles = p`
    ${h(y)}
    :host {
      width: 24px;
      height: 24px;
    }
  `;
i([
  w({ type: String })
], r.prototype, "name", 2);
i([
  w({ type: String })
], r.prototype, "variant", 2);
i([
  w({ type: String })
], r.prototype, "size", 2);
i([
  l()
], r.prototype, "content", 2);
r = i([
  u("ui-icon")
], r);
export {
  r as UIIcon
};
