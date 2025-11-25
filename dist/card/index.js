import { i, x as m, n as f } from "../vendor/lit.js";
import { c as p } from "../registry.js";
var v = Object.defineProperty, c = Object.getOwnPropertyDescriptor, n = (d, r, t, o) => {
  for (var e = o > 1 ? void 0 : o ? c(r, t) : r, l = d.length - 1, s; l >= 0; l--)
    (s = d[l]) && (e = (o ? s(r, t, e) : s(e)) || e);
  return o && e && v(r, t, e), e;
};
let a = class extends i {
  // static styles = css`
  // 	${unsafeCSS(styles)}
  // `;
  render() {
    return m`
			<div
				class="flex flex-col bg-white border border-solid border-neutral-200 rounded-xl relative overflow-hidden shadow-sm"
			>
				<slot name="media"></slot>
				<slot name="header"></slot>
				<slot name="body"></slot>
				<slot name="footer"></slot>
			</div>
		`;
  }
};
n([
  f({ type: String })
], a.prototype, "variant", 2);
a = n([
  p("ui-card")
], a);
export {
  a as UICard
};
