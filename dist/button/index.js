import { i as d, x as u } from "../vendor/lit.js";
import { c as v } from "../registry.js";
var g = Object.getOwnPropertyDescriptor, n = (r, l, a, m) => {
  for (var e = m > 1 ? void 0 : m ? g(l, a) : l, s = r.length - 1, c; s >= 0; s--)
    (c = r[s]) && (e = c(e) || e);
  return e;
}, y = /* @__PURE__ */ ((r) => (r.Small = "small", r.Medium = "medium", r.Large = "large", r))(y || {}), f = /* @__PURE__ */ ((r) => (r.Square = "square", r.Rounded = "rounded", r))(f || {}), p = /* @__PURE__ */ ((r) => (r.Primary = "primary", r.Secondary = "secondary", r.Tertiary = "tertiary", r.Warning = "warning", r.Error = "error", r.Success = "success", r.Info = "info", r))(p || {});
let o = class extends d {
  render() {
    return u`<slot></slot>`;
  }
};
o = n([
  v("ui-button")
], o);
export {
  f as ButtonShape,
  y as ButtonSize,
  p as ButtonVariant,
  o as UIButton
};
