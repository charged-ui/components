/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, J = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Q = Symbol(), st = /* @__PURE__ */ new WeakMap();
let mt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (J && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = st.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && st.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Et = (s) => new mt(typeof s == "string" ? s : s + "", void 0, Q), te = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new mt(e, s, Q);
}, wt = (s, t) => {
  if (J) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = N.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, it = J ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Et(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: xt, defineProperty: Pt, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: Ot, getOwnPropertySymbols: Ct, getPrototypeOf: Tt } = Object, _ = globalThis, rt = _.trustedTypes, Mt = rt ? rt.emptyScript : "", D = _.reactiveElementPolyfillSupport, C = (s, t) => s, k = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Mt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, Z = (s, t) => !xt(s, t), nt = { attribute: !0, type: String, converter: k, reflect: !1, hasChanged: Z };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class x extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = nt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Pt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = Ut(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get() {
      return r == null ? void 0 : r.call(this);
    }, set(n) {
      const h = r == null ? void 0 : r.call(this);
      o.call(this, n), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = Tt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, i = [...Ot(e), ...Ct(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(it(r));
    } else t !== void 0 && e.push(it(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return wt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EC(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : k).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), h = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : k;
      this._$Em = r, this[r] = h.fromAttribute(e, n.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? Z)(this[t], e)) return;
      this.P(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, i) {
    this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, n] of r) n.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], n);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EU();
    } catch (r) {
      throw t = !1, this._$EU(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[C("elementProperties")] = /* @__PURE__ */ new Map(), x[C("finalized")] = /* @__PURE__ */ new Map(), D == null || D({ ReactiveElement: x }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, z = T.trustedTypes, ot = z ? z.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, gt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, yt = "?" + v, Rt = `<${yt}>`, E = document, M = () => E.createComment(""), R = (s) => s === null || typeof s != "object" && typeof s != "function", G = Array.isArray, Ht = (s) => G(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, at = /-->/g, ht = />/g, A = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), lt = /'/g, ct = /"/g, vt = /^(?:script|style|textarea|title)$/i, Nt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), ee = Nt(1), y = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), S = E.createTreeWalker(E, 129);
function _t(s, t) {
  if (!G(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(t) : t;
}
const jt = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = U;
  for (let h = 0; h < e; h++) {
    const a = s[h];
    let l, u, c = -1, p = 0;
    for (; p < a.length && (n.lastIndex = p, u = n.exec(a), u !== null); ) p = n.lastIndex, n === U ? u[1] === "!--" ? n = at : u[1] !== void 0 ? n = ht : u[2] !== void 0 ? (vt.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = A) : u[3] !== void 0 && (n = A) : n === A ? u[0] === ">" ? (n = r ?? U, c = -1) : u[1] === void 0 ? c = -2 : (c = n.lastIndex - u[2].length, l = u[1], n = u[3] === void 0 ? A : u[3] === '"' ? ct : lt) : n === ct || n === lt ? n = A : n === at || n === ht ? n = U : (n = A, r = void 0);
    const d = n === A && s[h + 1].startsWith("/>") ? " " : "";
    o += n === U ? a + Rt : c >= 0 ? (i.push(l), a.slice(0, c) + gt + a.slice(c) + v + d) : a + v + (c === -2 ? h : d);
  }
  return [_t(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class H {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [l, u] = jt(t, e);
    if (this.el = H.createElement(l, i), S.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = S.nextNode()) !== null && a.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(gt)) {
          const p = u[n++], d = r.getAttribute(c).split(v), $ = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: o, name: $[2], strings: d, ctor: $[1] === "." ? zt : $[1] === "?" ? Bt : $[1] === "@" ? Lt : L }), r.removeAttribute(c);
        } else c.startsWith(v) && (a.push({ type: 6, index: o }), r.removeAttribute(c));
        if (vt.test(r.tagName)) {
          const c = r.textContent.split(v), p = c.length - 1;
          if (p > 0) {
            r.textContent = z ? z.emptyScript : "";
            for (let d = 0; d < p; d++) r.append(c[d], M()), S.nextNode(), a.push({ type: 2, index: ++o });
            r.append(c[p], M());
          }
        }
      } else if (r.nodeType === 8) if (r.data === yt) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(v, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += v.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = E.createElement("template");
    return i.innerHTML = t, i;
  }
}
function P(s, t, e = s, i) {
  var n, h;
  if (t === y) return t;
  let r = i !== void 0 ? (n = e.o) == null ? void 0 : n[i] : e.l;
  const o = R(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((h = r == null ? void 0 : r._$AO) == null || h.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e.o ?? (e.o = []))[i] = r : e.l = r), r !== void 0 && (t = P(s, r._$AS(s, t.values), r, i)), t;
}
class kt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? E).importNode(e, !0);
    S.currentNode = r;
    let o = S.nextNode(), n = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let l;
        a.type === 2 ? l = new B(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new It(o, this, t)), this._$AV.push(l), a = i[++h];
      }
      n !== (a == null ? void 0 : a.index) && (o = S.nextNode(), n++);
    }
    return S.currentNode = E, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
let B = class At {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this.v;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this.v = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = P(this, t, e), R(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== y && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ht(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = H.createElement(_t(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new kt(r, this), h = n.u(this.options);
      n.p(e), this.T(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ut.get(t.strings);
    return e === void 0 && ut.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    G(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new At(this.O(M()), this.O(M()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this.v = t, (e = this._$AP) == null || e.call(this, t));
  }
};
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = P(this, t, e, 0), n = !R(t) || t !== this._$AH && t !== y, n && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = P(this, h[i + a], e, a), l === y && (l = this._$AH[a]), n || (n = !R(l) || l !== this._$AH[a]), l === f ? t = f : t !== f && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zt extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Bt extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Lt extends L {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? f) === y) return;
    const i = this._$AH, r = t === f && i !== f || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== f && (i === f || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class It {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const Dt = { I: B }, W = T.litHtmlPolyfillSupport;
W == null || W(H, B), (T.litHtmlVersions ?? (T.litHtmlVersions = [])).push("3.2.0");
const Vt = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new B(t.insertBefore(M(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class j extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this.o = Vt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this.o) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this.o) == null || t.setConnected(!1);
  }
  render() {
    return y;
  }
}
var $t;
j._$litElement$ = !0, j.finalized = !0, ($t = globalThis.litElementHydrateSupport) == null || $t.call(globalThis, { LitElement: j });
const q = globalThis.litElementPolyfillSupport;
q == null || q({ LitElement: j });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = { attribute: !0, type: String, converter: k, reflect: !1, hasChanged: Z }, qt = (s = Wt, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), o.set(e.name, s), i === "accessor") {
    const { name: n } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(n, a, s);
    }, init(h) {
      return h !== void 0 && this.P(n, void 0, s), h;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(h) {
      const a = this[n];
      t.call(this, h), this.requestUpdate(n, a, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Kt(s) {
  return (t, e) => typeof e == "object" ? qt(s, t, e) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, n ? { ...i, wrapped: !0 } : i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function se(s) {
  return Kt({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = (s, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(s, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ie(s, t) {
  return (e, i, r) => {
    const o = (n) => {
      var h;
      return ((h = n.renderRoot) == null ? void 0 : h.querySelector(s)) ?? null;
    };
    return Ft(e, i, { get() {
      return o(this);
    } });
  };
}
function bt(s) {
  var t, e, i = "";
  if (typeof s == "string" || typeof s == "number") i += s;
  else if (typeof s == "object") if (Array.isArray(s)) {
    var r = s.length;
    for (t = 0; t < r; t++) s[t] && (e = bt(s[t])) && (i && (i += " "), i += e);
  } else for (e in s) s[e] && (i && (i += " "), i += e);
  return i;
}
function re() {
  for (var s, t, e = 0, i = "", r = arguments.length; e < r; e++) (s = arguments[e]) && (t = bt(s)) && (i && (i += " "), i += t);
  return i;
}
var dt = ["x", "y", "z"], g = function(s) {
  Object.assign(this, { uniforms: {}, geometry: { vertices: [{ x: 0, y: 0, z: 0 }] }, mode: 0, modifiers: {}, attributes: [], multiplier: 1, buffers: [] }), Object.assign(this, s), this.prepareProgram(), this.prepareUniforms(), this.prepareAttributes();
};
g.prototype.compileShader = function(s, t) {
  var e = this.gl.createShader(s);
  return this.gl.shaderSource(e, t), this.gl.compileShader(e), e;
}, g.prototype.prepareProgram = function() {
  var s = this.gl, t = this.vertex, e = this.fragment, i = s.createProgram();
  s.attachShader(i, this.compileShader(35633, t)), s.attachShader(i, this.compileShader(35632, e)), s.linkProgram(i), s.useProgram(i), this.program = i;
}, g.prototype.prepareUniforms = function() {
  for (var s = Object.keys(this.uniforms), t = 0; t < s.length; t += 1) {
    var e = this.gl.getUniformLocation(this.program, s[t]);
    this.uniforms[s[t]].location = e;
  }
}, g.prototype.prepareAttributes = function() {
  this.geometry.vertices !== void 0 && this.attributes.push({ name: "aPosition", size: 3 }), this.geometry.normal !== void 0 && this.attributes.push({ name: "aNormal", size: 3 }), this.attributeKeys = [];
  for (var s = 0; s < this.attributes.length; s += 1) this.attributeKeys.push(this.attributes[s].name), this.prepareAttribute(this.attributes[s]);
}, g.prototype.prepareAttribute = function(s) {
  for (var t = this.geometry, e = this.multiplier, i = t.vertices, r = t.normal, o = new Float32Array(e * i.length * s.size), n = 0; n < e; n += 1) for (var h = s.data && s.data(n, e), a = n * i.length * s.size, l = 0; l < i.length; l += 1) for (var u = 0; u < s.size; u += 1) {
    var c = this.modifiers[s.name];
    o[a] = c !== void 0 ? c(h, l, u, this) : s.name === "aPosition" ? i[l][dt[u]] : s.name === "aNormal" ? r[l][dt[u]] : h[u], a += 1;
  }
  this.attributes[this.attributeKeys.indexOf(s.name)].data = o, this.prepareBuffer(this.attributes[this.attributeKeys.indexOf(s.name)]);
}, g.prototype.prepareBuffer = function(s) {
  var t = s.data, e = s.name, i = s.size, r = this.gl.createBuffer();
  this.gl.bindBuffer(34962, r), this.gl.bufferData(34962, t, 35044);
  var o = this.gl.getAttribLocation(this.program, e);
  this.gl.enableVertexAttribArray(o), this.gl.vertexAttribPointer(o, i, 5126, !1, 0, 0), this.buffers[this.attributeKeys.indexOf(s.name)] = { buffer: r, location: o, size: i };
}, g.prototype.render = function(s) {
  var t = this, e = this.uniforms, i = this.multiplier, r = this.gl;
  r.useProgram(this.program);
  for (var o = 0; o < this.buffers.length; o += 1) {
    var n = this.buffers[o], h = n.location, a = n.buffer, l = n.size;
    r.enableVertexAttribArray(h), r.bindBuffer(34962, a), r.vertexAttribPointer(h, l, 5126, !1, 0, 0);
  }
  Object.keys(s).forEach(function(u) {
    e[u].value = s[u].value;
  }), Object.keys(e).forEach(function(u) {
    var c = e[u];
    t.uniformMap[c.type](c.location, c.value);
  }), r.drawArrays(this.mode, 0, i * this.geometry.vertices.length), this.onRender && this.onRender(this);
}, g.prototype.destroy = function() {
  for (var s = 0; s < this.buffers.length; s += 1) this.gl.deleteBuffer(this.buffers[s].buffer);
  this.gl.deleteProgram(this.program), this.gl = null;
};
var w = function(s) {
  var t = this, e = s || {}, i = e.canvas;
  i === void 0 && (i = document.querySelector("canvas"));
  var r = e.context;
  r === void 0 && (r = {});
  var o = e.contextType;
  o === void 0 && (o = "experimental-webgl");
  var n = e.settings;
  n === void 0 && (n = {});
  var h = i.getContext(o, Object.assign({ alpha: !1, antialias: !1 }, r));
  Object.assign(this, { gl: h, canvas: i, uniforms: {}, instances: /* @__PURE__ */ new Map(), shouldRender: !0 }), Object.assign(this, { devicePixelRatio: 1, clearColor: [1, 1, 1, 1], position: { x: 0, y: 0, z: 2 }, clip: [1e-3, 100] }), Object.assign(this, n), this.uniformMap = { float: function(a, l) {
    return h.uniform1f(a, l);
  }, vec2: function(a, l) {
    return h.uniform2fv(a, l);
  }, vec3: function(a, l) {
    return h.uniform3fv(a, l);
  }, vec4: function(a, l) {
    return h.uniform4fv(a, l);
  }, mat2: function(a, l) {
    return h.uniformMatrix2fv(a, !1, l);
  }, mat3: function(a, l) {
    return h.uniformMatrix3fv(a, !1, l);
  }, mat4: function(a, l) {
    return h.uniformMatrix4fv(a, !1, l);
  } }, h.enable(h.DEPTH_TEST), h.depthFunc(h.LEQUAL), h.getContextAttributes().alpha === !1 && (h.clearColor.apply(h, this.clearColor), h.clearDepth(1)), this.onSetup && this.onSetup(h), window.addEventListener("resize", function() {
    return t.resize();
  }), this.resize(), this.render();
};
w.prototype.resize = function() {
  var s = this.gl, t = this.canvas, e = this.devicePixelRatio, i = this.position;
  t.width = t.clientWidth * e, t.height = t.clientHeight * e;
  var r = s.drawingBufferWidth, o = s.drawingBufferHeight, n = r / o;
  s.viewport(0, 0, r, o);
  var h = Math.tan(Math.PI / 180 * 22.5), a = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, i.x, i.y, (n < 1 ? 1 : n) * -i.z, 1];
  this.uniforms.uProjectionMatrix = { type: "mat4", value: [0.5 / h, 0, 0, 0, 0, n / h * 0.5, 0, 0, 0, 0, -(this.clip[1] + this.clip[0]) / (this.clip[1] - this.clip[0]), -1, 0, 0, -2 * this.clip[1] * (this.clip[0] / (this.clip[1] - this.clip[0])), 0] }, this.uniforms.uViewMatrix = { type: "mat4", value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }, this.uniforms.uModelMatrix = { type: "mat4", value: a };
}, w.prototype.toggle = function(s) {
  s !== this.shouldRender && (this.shouldRender = s !== void 0 ? s : !this.shouldRender, this.shouldRender && this.render());
}, w.prototype.render = function() {
  var s = this;
  this.gl.clear(16640), this.instances.forEach(function(t) {
    t.render(s.uniforms);
  }), this.onRender && this.onRender(this), this.shouldRender && requestAnimationFrame(function() {
    return s.render();
  });
}, w.prototype.add = function(s, t) {
  t === void 0 && (t = { uniforms: {} }), t.uniforms === void 0 && (t.uniforms = {}), Object.assign(t.uniforms, JSON.parse(JSON.stringify(this.uniforms))), Object.assign(t, { gl: this.gl, uniformMap: this.uniformMap });
  var e = new g(t);
  return this.instances.set(s, e), e;
}, w.prototype.remove = function(s) {
  var t = this.instances.get(s);
  t !== void 0 && (t.destroy(), this.instances.delete(s));
}, w.prototype.destroy = function() {
  var s = this;
  this.instances.forEach(function(t, e) {
    t.destroy(), s.instances.delete(e);
  }), this.toggle(!1);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = { ATTRIBUTE: 1, CHILD: 2 }, X = (s) => (...t) => ({ _$litDirective$: s, values: t });
class tt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this.t = t, this._$AM = e, this.i = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class F extends tt {
  constructor(t) {
    if (super(t), this.it = f, t.type !== Y.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === f || t == null) return this._t = void 0, this.it = t;
    if (t === y) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
F.directiveName = "unsafeHTML", F.resultType = 1;
const ne = X(F);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = "important", Jt = " !" + St, oe = X(class extends tt {
  constructor(s) {
    var t;
    if (super(s), s.type !== Y.ATTRIBUTE || s.name !== "style" || ((t = s.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return Object.keys(s).reduce((t, e) => {
      const i = s[e];
      return i == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(s, [t]) {
    const { style: e } = s.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft) t[i] == null && (this.ft.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = null);
    for (const i in t) {
      const r = t[i];
      if (r != null) {
        this.ft.add(i);
        const o = typeof r == "string" && r.endsWith(Jt);
        i.includes("-") || o ? e.setProperty(i, o ? r.slice(0, -11) : r, o ? St : "") : e[i] = r;
      }
    }
    return y;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Qt } = Dt, pt = () => document.createComment(""), O = (s, t, e) => {
  var o;
  const i = s._$AA.parentNode, r = t === void 0 ? s._$AB : t._$AA;
  if (e === void 0) {
    const n = i.insertBefore(pt(), r), h = i.insertBefore(pt(), r);
    e = new Qt(n, h, s, s.options);
  } else {
    const n = e._$AB.nextSibling, h = e._$AM, a = h !== s;
    if (a) {
      let l;
      (o = e._$AQ) == null || o.call(e, s), e._$AM = s, e._$AP !== void 0 && (l = s._$AU) !== h._$AU && e._$AP(l);
    }
    if (n !== r || a) {
      let l = e._$AA;
      for (; l !== n; ) {
        const u = l.nextSibling;
        i.insertBefore(l, r), l = u;
      }
    }
  }
  return e;
}, b = (s, t, e = s) => (s._$AI(t, e), s), Zt = {}, Gt = (s, t = Zt) => s._$AH = t, Yt = (s) => s._$AH, K = (s) => {
  var i;
  (i = s._$AP) == null || i.call(s, !1, !0);
  let t = s._$AA;
  const e = s._$AB.nextSibling;
  for (; t !== e; ) {
    const r = t.nextSibling;
    t.remove(), t = r;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = (s, t, e) => {
  const i = /* @__PURE__ */ new Map();
  for (let r = t; r <= e; r++) i.set(s[r], r);
  return i;
}, ae = X(class extends tt {
  constructor(s) {
    if (super(s), s.type !== Y.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(s, t, e) {
    let i;
    e === void 0 ? e = t : t !== void 0 && (i = t);
    const r = [], o = [];
    let n = 0;
    for (const h of s) r[n] = i ? i(h, n) : n, o[n] = e(h, n), n++;
    return { values: o, keys: r };
  }
  render(s, t, e) {
    return this.dt(s, t, e).values;
  }
  update(s, [t, e, i]) {
    const r = Yt(s), { values: o, keys: n } = this.dt(t, e, i);
    if (!Array.isArray(r)) return this.ut = n, o;
    const h = this.ut ?? (this.ut = []), a = [];
    let l, u, c = 0, p = r.length - 1, d = 0, $ = o.length - 1;
    for (; c <= p && d <= $; ) if (r[c] === null) c++;
    else if (r[p] === null) p--;
    else if (h[c] === n[d]) a[d] = b(r[c], o[d]), c++, d++;
    else if (h[p] === n[$]) a[$] = b(r[p], o[$]), p--, $--;
    else if (h[c] === n[$]) a[$] = b(r[c], o[$]), O(s, a[$ + 1], r[c]), c++, $--;
    else if (h[p] === n[d]) a[d] = b(r[p], o[d]), O(s, r[c], r[p]), p--, d++;
    else if (l === void 0 && (l = ft(n, d, $), u = ft(h, c, p)), l.has(h[c])) if (l.has(h[p])) {
      const m = u.get(n[d]), I = m !== void 0 ? r[m] : null;
      if (I === null) {
        const et = O(s, r[c]);
        b(et, o[d]), a[d] = et;
      } else a[d] = b(I, o[d]), O(s, r[c], I), r[m] = null;
      d++;
    } else K(r[p]), p--;
    else K(r[c]), c++;
    for (; d <= $; ) {
      const m = O(s, a[$ + 1]);
      b(m, o[d]), a[d++] = m;
    }
    for (; c <= p; ) {
      const m = r[c++];
      m !== null && K(m);
    }
    return this.ut = n, Gt(s, a), y;
  }
});
export {
  ae as Q,
  te as a,
  se as b,
  re as c,
  ne as d,
  ie as e,
  j as h,
  w as i,
  ee as k,
  Kt as n,
  Et as r,
  oe as s
};
