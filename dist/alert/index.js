import { i as c, x as i } from "../vendor/lit.js";
import { c as m } from "../registry.js";
var v = Object.getOwnPropertyDescriptor, u = (e, o, a, t) => {
  for (var r = t > 1 ? void 0 : t ? v(o, a) : o, s = e.length - 1, n; s >= 0; s--)
    (n = e[s]) && (r = n(r) || r);
  return r;
}, d = /* @__PURE__ */ ((e) => (e.Success = "success", e.Error = "error", e.Warning = "warning", e.Info = "info", e))(d || {});
let l = class extends c {
  render() {
    return i`
			<div role="alert">
				<slot name="icon"></slot>
				<div>
					<slot name="heading"></slot>
					<slot name="message"></slot>
				</div>
			</div>
		`;
  }
};
l = u([
  m("ui-alert")
], l);
export {
  d as AlertVariant,
  l as UIAlert
};
