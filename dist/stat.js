import { i as l, r as c, n as i, e as d, c as m, k as f, t as h } from "./vendor.js";
import { U as y, v as b, s as v } from "./text-Cm9wxC7m.js";
import { i as N, a as x } from "./motion.js";
var _ = Object.defineProperty, O = Object.getOwnPropertyDescriptor, r = (s, a, o, n) => {
  for (var e = n > 1 ? void 0 : n ? O(a, o) : a, p = s.length - 1, u; p >= 0; p--)
    (u = s[p]) && (e = (n ? u(a, o, e) : u(e)) || e);
  return n && e && _(a, o, e), e;
};
let t = class extends y {
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
    const s = m("counter", b[this.variant]);
    return f`
      <div class="flex items-center">
        <slot name="prefix"></slot>
        <span class="${s}">${this.end}</span>
        <slot name="suffix"></slot>
      </div>
    `;
  }
};
t.styles = l`
    ${c(v)}
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
  d(".counter")
], t.prototype, "counter", 2);
t = r([
  h("ui-stat")
], t);
export {
  t as UIStat
};
