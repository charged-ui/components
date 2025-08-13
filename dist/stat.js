import { b as m, a as l, n as i, e as c, c as d, k as h } from "./vendor.js";
import { c as f } from "./registry-CBck5F9C.js";
import { s as y, U as b, v } from "./text-CcSUFUXZ.js";
import { i as N, a as x } from "./motion.js";
var _ = Object.defineProperty, O = Object.getOwnPropertyDescriptor, r = (s, a, n, o) => {
  for (var e = o > 1 ? void 0 : o ? O(a, n) : a, p = s.length - 1, u; p >= 0; p--)
    (u = s[p]) && (e = (o ? u(a, n, e) : u(e)) || e);
  return o && e && _(a, n, e), e;
};
let t = class extends b {
  constructor() {
    super(...arguments), this.start = 0, this.end = 0, this.duration = 2, this.delay = 0;
  }
  firstUpdated() {
    N(this, () => (x(Number(this.start), Number(this.end), {
      delay: Number(this.delay),
      duration: Number(this.duration),
      ease: "circOut",
      onUpdate: (s) => {
        this.counter && (this.counter.innerHTML = `${Math.round(s)}`);
      }
    }), () => {
    }));
  }
  render() {
    const s = d("counter", v[this.variant]);
    return h`
      <div class="flex items-center">
        <slot name="prefix"></slot>
        <span class="${s}">${this.end}</span>
        <slot name="suffix"></slot>
      </div>
    `;
  }
};
t.styles = l`
    ${m(y)}
  `;
r([
  i({ type: Number })
], t.prototype, "start", 2);
r([
  i({ type: Number })
], t.prototype, "end", 2);
r([
  i({ type: Number })
], t.prototype, "duration", 2);
r([
  i({ type: Number })
], t.prototype, "delay", 2);
r([
  c(".counter")
], t.prototype, "counter", 2);
t = r([
  f("ui-stat")
], t);
export {
  t as UIStat
};
