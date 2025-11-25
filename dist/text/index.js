import { i as g, x as D } from "../vendor/lit.js";
import { c as h } from "../registry.js";
var m = Object.getOwnPropertyDescriptor, r = (s, l, c, o) => {
  for (var p = o > 1 ? void 0 : o ? m(l, c) : l, d = s.length - 1, y; d >= 0; d--)
    (y = s[d]) && (p = y(p) || p);
  return p;
}, u = /* @__PURE__ */ ((s) => (s.H1 = "heading-1", s.H2 = "heading-2", s.H3 = "heading-3", s.H4 = "heading-4", s.H5 = "heading-5", s.H6 = "heading-6", s.D1 = "display-1", s.D2 = "display-2", s.D3 = "display-3", s.D4 = "display-4", s.D5 = "display-5", s.D6 = "display-6", s.XL = "copy-xl", s.LG = "copy-lg", s.MD = "copy-md", s.SM = "copy-sm", s.XS = "copy-xs", s))(u || {});
let e = class extends g {
  render() {
    return D`<slot />`;
  }
};
e = r([
  h("ui-text")
], e);
export {
  u as TextVariant,
  e as UIText
};
