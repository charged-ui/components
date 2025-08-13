import { unsafeCSS as m, css as l, html as c } from "lit";
import { n, e as d, c as f } from "./vendor.js";
import { inView as h, animate as y } from "motion";
import { c as v } from "./registry-CBck5F9C.js";
import { s as b, U as N, v as x } from "./text-BO4etHbR.js";
var _ = Object.defineProperty, O = Object.getOwnPropertyDescriptor, s = (r, o, i, a) => {
  for (var e = a > 1 ? void 0 : a ? O(o, i) : o, p = r.length - 1, u; p >= 0; p--)
    (u = r[p]) && (e = (a ? u(o, i, e) : u(e)) || e);
  return a && e && _(o, i, e), e;
};
let t = class extends N {
  constructor() {
    super(...arguments), this.start = 0, this.end = 0, this.duration = 2, this.delay = 0;
  }
  firstUpdated() {
    h(this, () => (y(Number(this.start), Number(this.end), {
      delay: Number(this.delay),
      duration: Number(this.duration),
      ease: "circOut",
      onUpdate: (r) => {
        this.counter && (this.counter.innerHTML = `${Math.round(r)}`);
      }
    }), () => {
    }));
  }
  render() {
    const r = f("counter", x[this.variant]);
    return c`
      <div class="flex items-center">
        <slot name="prefix"></slot>
        <span class="${r}">${this.end}</span>
        <slot name="suffix"></slot>
      </div>
    `;
  }
};
t.styles = l`
    ${m(b)}
  `;
s([
  n({ type: Number })
], t.prototype, "start", 2);
s([
  n({ type: Number })
], t.prototype, "end", 2);
s([
  n({ type: Number })
], t.prototype, "duration", 2);
s([
  n({ type: Number })
], t.prototype, "delay", 2);
s([
  d(".counter")
], t.prototype, "counter", 2);
t = s([
  v("ui-stat")
], t);
export {
  t as UIStat
};
