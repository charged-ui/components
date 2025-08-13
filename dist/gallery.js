import { b as g, a as w, n as c, r as p, h, c as u, k as d } from "./vendor.js";
import { c as f } from "./registry-CBck5F9C.js";
import "./button.js";
import { a as b, s as y } from "./motion.js";
const v = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.\\!visible{visibility:visible!important}.visible{visibility:visible}.static{position:static}.mb-8{margin-bottom:2rem}.flex{display:flex}.grid{display:grid}.hidden{display:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}.flex-wrap{flex-wrap:wrap}.gap-2{gap:.5rem}.gap-6{gap:1.5rem}.rounded{border-radius:.25rem}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:768px){.md\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}@media (min-width:1024px){.lg\\:grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.lg\\:grid-cols-6{grid-template-columns:repeat(6,minmax(0,1fr))}}";
var x = Object.defineProperty, C = Object.getOwnPropertyDescriptor, n = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? C(e, i) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (s = (r ? l(e, i, s) : l(s)) || s);
  return r && s && x(e, i, s), s;
};
let o = class extends h {
  constructor() {
    super(...arguments), this.columns = 4, this.activeFilter = "all", this.filters = [];
  }
  get gridClasses() {
    const t = Math.min(this.columns, 2), e = Math.min(this.columns, 3), i = this.columns;
    return `grid grid-cols-1 ${u({
      // Mobile (sm) - max 2 columns
      "sm:grid-cols-1": t === 1,
      "sm:grid-cols-2": t === 2,
      // Tablet (md) - max 3 columns
      "md:grid-cols-1": e === 1,
      "md:grid-cols-2": e === 2,
      "md:grid-cols-3": e === 3,
      // Desktop (lg) - user-specified columns
      "lg:grid-cols-1": i === 1,
      "lg:grid-cols-2": i === 2,
      "lg:grid-cols-3": i === 3,
      "lg:grid-cols-4": i === 4,
      "lg:grid-cols-5": i === 5,
      "lg:grid-cols-6": i === 6
    })} gap-6`;
  }
  detectFiltersFromChildren() {
    var i;
    const t = (i = this.shadowRoot) == null ? void 0 : i.querySelector("slot");
    if (!t) return;
    const e = /* @__PURE__ */ new Set();
    t.assignedElements().forEach((r) => {
      var a;
      (((a = r.getAttribute("data-categories")) == null ? void 0 : a.split(",")) || []).forEach((l) => {
        const m = l.trim();
        m && e.add(m);
      });
    }), this.filters = [
      { id: "all", label: this.allLabel ?? "All" },
      ...Array.from(e).sort().map((r) => ({
        id: r,
        label: this.formatCategoryLabel(r)
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
      const r = ((a = i.getAttribute("data-categories")) == null ? void 0 : a.split(",").map((l) => l.trim())) || [], s = this.activeFilter === "all" || r.includes(this.activeFilter);
      i.classList.toggle("hidden", !s), i.classList.toggle("grid-item", s);
    });
  }
  animateItems() {
    var e, i;
    const t = (i = (e = this.shadowRoot) == null ? void 0 : e.querySelector("slot")) == null ? void 0 : i.assignedElements().filter((r) => !r.classList.contains("hidden"));
    t != null && t.length && b(
      t,
      { opacity: [0, 1], scale: [0.8, 1] },
      { delay: y(0.05, { ease: [0.4, 0, 0.2, 1] }) }
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
o.styles = w`
    ${g(v)}
  `;
n([
  c({ type: Number })
], o.prototype, "columns", 2);
n([
  c({ type: String })
], o.prototype, "allLabel", 2);
n([
  p()
], o.prototype, "activeFilter", 2);
n([
  p()
], o.prototype, "filters", 2);
o = n([
  f("ui-gallery")
], o);
export {
  o as UIGallery
};
