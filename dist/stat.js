import { r as l, a as c, n as o, e as m, c as d, k as h, t as y } from "./vendor.js";
import { s as f, U as v, v as b } from "./text-Bsuq1Gj9.js";
import { i as N, a as x } from "./motion.js";
var _ = Object.defineProperty, O = Object.getOwnPropertyDescriptor, r = (s, a, n, i) => {
  for (var e = i > 1 ? void 0 : i ? O(a, n) : a, p = s.length - 1, u; p >= 0; p--)
    (u = s[p]) && (e = (i ? u(a, n, e) : u(e)) || e);
  return i && e && _(a, n, e), e;
};
let t = class extends v {
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
    const s = d("counter", b[this.variant]);
    return h`
      <div class="flex items-center">
        <slot name="prefix"></slot>
        <span class="${s}">${this.end}</span>
        <slot name="suffix"></slot>
      </div>
    `;
  }
};
t.styles = c`
    ${l(f)}
  `;
r([
  o({ type: Number })
], t.prototype, "start", 2);
r([
  o({ type: Number })
], t.prototype, "end", 2);
r([
  o({ type: Number })
], t.prototype, "duration", 2);
r([
  o({ type: Number })
], t.prototype, "delay", 2);
r([
  m(".counter")
], t.prototype, "counter", 2);
t = r([
  y("ui-stat")
], t);
export {
  t as UIStat
};
