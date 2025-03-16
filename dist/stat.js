import { i as l, r as d, n as i, e as c, d as m, c as f, k as h, t as y, f as b } from "./vendor.js";
import { U as v, v as N, s as x } from "./text-MzYcllip.js";
var _ = Object.defineProperty, O = Object.getOwnPropertyDescriptor, r = (s, a, o, n) => {
  for (var e = n > 1 ? void 0 : n ? O(a, o) : a, u = s.length - 1, p; u >= 0; u--)
    (p = s[u]) && (e = (n ? p(a, o, e) : p(e)) || e);
  return n && e && _(a, o, e), e;
};
let t = class extends v {
  constructor() {
    super(...arguments), this.start = 0, this.end = 0, this.duration = 2, this.delay = 0;
  }
  firstUpdated() {
    m(this, () => (b(Number(this.start), Number(this.end), {
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
    const s = f("counter", N[this.variant]);
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
    ${d(x)}
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
  y("ui-stat")
], t);
export {
  t as UIStat
};
