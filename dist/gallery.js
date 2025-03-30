import { i as m, r as g, n as p, a as w, h, k as d, t as u } from "./vendor.js";
import "./button.js";
import { a as f, s as b } from "./motion.js";
const y = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.\\!visible{visibility:visible!important}.visible{visibility:visible}.static{position:static}.mb-8{margin-bottom:2rem}.flex{display:flex}.grid{display:grid}.hidden{display:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.flex-wrap{flex-wrap:wrap}.gap-2{gap:.5rem}.gap-6{gap:1.5rem}.rounded{border-radius:.25rem}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}";
var v = Object.defineProperty, x = Object.getOwnPropertyDescriptor, n = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? x(e, i) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (r = (s ? l(e, i, r) : l(r)) || r);
  return s && r && v(e, i, r), r;
};
let o = class extends h {
  constructor() {
    super(...arguments), this.columns = 2, this.activeFilter = "all", this.filters = [];
  }
  get gridClasses() {
    return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols- lg:grid-cols-2 gap-6";
  }
  detectFiltersFromChildren() {
    var i;
    const t = (i = this.shadowRoot) == null ? void 0 : i.querySelector("slot");
    if (!t) return;
    const e = /* @__PURE__ */ new Set();
    t.assignedElements().forEach((s) => {
      var a;
      (((a = s.getAttribute("data-categories")) == null ? void 0 : a.split(",")) || []).forEach((l) => {
        const c = l.trim();
        c && e.add(c);
      });
    }), this.filters = [
      { id: "all", label: this.allLabel ?? "All" },
      ...Array.from(e).sort().map((s) => ({
        id: s,
        label: this.formatCategoryLabel(s)
      }))
    ];
  }
  formatCategoryLabel(t) {
    return t.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
  }
  setFilter(t) {
    this.activeFilter = t, this.updateComplete.then(() => {
      this.updateVisibility(), this.animateItems();
    });
  }
  updateVisibility() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("slot");
    t && t.assignedElements().forEach((i) => {
      var a;
      const s = ((a = i.getAttribute("data-categories")) == null ? void 0 : a.split(",").map((l) => l.trim())) || [], r = this.activeFilter === "all" || s.includes(this.activeFilter);
      i.classList.toggle("hidden", !r), i.classList.toggle("grid-item", r);
    });
  }
  animateItems() {
    var e, i;
    const t = (i = (e = this.shadowRoot) == null ? void 0 : e.querySelector("slot")) == null ? void 0 : i.assignedElements().filter((s) => !s.classList.contains("hidden"));
    t != null && t.length && f(
      t,
      { opacity: [0, 1], scale: [0.8, 1] },
      { delay: b(0.05, { ease: [0.4, 0, 0.2, 1] }) }
    );
  }
  handleSlotChange() {
    this.detectFiltersFromChildren(), this.updateVisibility(), this.animateItems();
  }
  firstUpdated() {
    this.detectFiltersFromChildren(), this.updateVisibility(), this.animateItems();
  }
  updated(t) {
    super.updated(t), t.has("activeFilter") && this.updateVisibility(), t.has("allLabel") && this.detectFiltersFromChildren();
  }
  render() {
    return d`
      ${this.filters.length > 1 ? d`
            <div class="flex flex-wrap gap-2 mb-8">
              ${this.filters.map(
      (t) => d`
                  <ui-button
                    @click=${() => this.setFilter(t.id)}
                    size="small"
                    variant=${this.activeFilter === t.id ? "primary" : "secondary"}
                    shape="rounded"
                  >
                    <div slot="value">${t.label}</div>
                  </ui-button>
                `
    )}
            </div>
          ` : ""}

      <div class="${this.gridClasses}">
        <slot @slotchange=${() => this.handleSlotChange()}></slot>
      </div>
    `;
  }
};
o.styles = m`
    ${g(y)}
  `;
n([
  p({ type: Number })
], o.prototype, "columns", 2);
n([
  p({ type: String })
], o.prototype, "allLabel", 2);
n([
  w()
], o.prototype, "activeFilter", 2);
n([
  w()
], o.prototype, "filters", 2);
o = n([
  u("ui-gallery")
], o);
export {
  o as UIGallery
};
