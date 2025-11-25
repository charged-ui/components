import { a as p, n as h, r as l, i as f, o as u } from "../vendor/lit.js";
import { c as m } from "../registry.js";
var v = Object.defineProperty, y = Object.getOwnPropertyDescriptor, i = (e, r, s, t) => {
  for (var n = t > 1 ? void 0 : t ? y(r, s) : r, a = e.length - 1, c; a >= 0; a--)
    (c = e[a]) && (n = (t ? c(r, s, n) : c(n)) || n);
  return t && n && v(r, s, n), n;
};
let o = class extends f {
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
    const e = "https://cdn.jsdelivr.net/npm/heroicons@latest", r = this.variant === "solid" ? "solid" : "outline", s = `${e}/${this.size}/${r}/${this.name}.svg`;
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
      return u(this.content);
  }
};
o.styles = p`
		:host {
			display: block;
			width: 24px;
			height: 24px;
		}
	`;
i([
  h({ type: String })
], o.prototype, "name", 2);
i([
  h({ type: String })
], o.prototype, "variant", 2);
i([
  h({ type: String })
], o.prototype, "size", 2);
i([
  l()
], o.prototype, "content", 2);
o = i([
  m("ui-icon")
], o);
export {
  o as UIIcon
};
