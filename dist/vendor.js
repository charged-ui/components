/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, V = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), F = /* @__PURE__ */ new WeakMap();
let nt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== W) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ut = (i) => new nt(typeof i == "string" ? i : i + "", void 0, W), kt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new nt(e, i, W);
}, dt = (i, t) => {
  if (V) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = R.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, J = V ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ut(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: pt, defineProperty: ft, getOwnPropertyDescriptor: $t, getOwnPropertyNames: mt, getOwnPropertySymbols: gt, getPrototypeOf: vt } = Object, g = globalThis, Z = g.trustedTypes, yt = Z ? Z.emptyScript : "", k = g.reactiveElementPolyfillSupport, P = (i, t) => i, N = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? yt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, q = (i, t) => !pt(i, t), Q = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: q };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class S extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Q) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && ft(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: o } = $t(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get() {
      return r == null ? void 0 : r.call(this);
    }, set(n) {
      const h = r == null ? void 0 : r.call(this);
      o.call(this, n), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, s = [...mt(e), ...gt(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(J(r));
    } else t !== void 0 && e.push(J(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return dt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EC(t, e) {
    var o;
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : N).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), h = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : N;
      this._$Em = r, this[r] = h.fromAttribute(e, n.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? q)(this[t], e)) return;
      this.P(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
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
    var s;
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
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((r) => {
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
    (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostUpdated) == null ? void 0 : r.call(s);
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[P("elementProperties")] = /* @__PURE__ */ new Map(), S[P("finalized")] = /* @__PURE__ */ new Map(), k == null || k({ ReactiveElement: S }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis, z = x.trustedTypes, G = z ? z.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ot = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, at = "?" + m, _t = `<${at}>`, _ = document, O = () => _.createComment(""), U = (i) => i === null || typeof i != "object" && typeof i != "function", K = Array.isArray, At = (i) => K(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", L = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Y = /-->/g, X = />/g, v = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), tt = /'/g, et = /"/g, ht = /^(?:script|style|textarea|title)$/i, bt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), Lt = bt(1), A = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), st = /* @__PURE__ */ new WeakMap(), y = _.createTreeWalker(_, 129);
function lt(i, t) {
  if (!K(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return G !== void 0 ? G.createHTML(t) : t;
}
const St = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = w;
  for (let h = 0; h < e; h++) {
    const a = i[h];
    let l, u, c = -1, p = 0;
    for (; p < a.length && (n.lastIndex = p, u = n.exec(a), u !== null); ) p = n.lastIndex, n === w ? u[1] === "!--" ? n = Y : u[1] !== void 0 ? n = X : u[2] !== void 0 ? (ht.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = v) : u[3] !== void 0 && (n = v) : n === v ? u[0] === ">" ? (n = r ?? w, c = -1) : u[1] === void 0 ? c = -2 : (c = n.lastIndex - u[2].length, l = u[1], n = u[3] === void 0 ? v : u[3] === '"' ? et : tt) : n === et || n === tt ? n = v : n === Y || n === X ? n = w : (n = v, r = void 0);
    const $ = n === v && i[h + 1].startsWith("/>") ? " " : "";
    o += n === w ? a + _t : c >= 0 ? (s.push(l), a.slice(0, c) + ot + a.slice(c) + m + $) : a + m + (c === -2 ? h : $);
  }
  return [lt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class C {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [l, u] = St(t, e);
    if (this.el = C.createElement(l, s), y.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = y.nextNode()) !== null && a.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(ot)) {
          const p = u[n++], $ = r.getAttribute(c).split(m), T = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: o, name: T[2], strings: $, ctor: T[1] === "." ? wt : T[1] === "?" ? Pt : T[1] === "@" ? xt : j }), r.removeAttribute(c);
        } else c.startsWith(m) && (a.push({ type: 6, index: o }), r.removeAttribute(c));
        if (ht.test(r.tagName)) {
          const c = r.textContent.split(m), p = c.length - 1;
          if (p > 0) {
            r.textContent = z ? z.emptyScript : "";
            for (let $ = 0; $ < p; $++) r.append(c[$], O()), y.nextNode(), a.push({ type: 2, index: ++o });
            r.append(c[p], O());
          }
        }
      } else if (r.nodeType === 8) if (r.data === at) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(m, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += m.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = _.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(i, t, e = i, s) {
  var n, h;
  if (t === A) return t;
  let r = s !== void 0 ? (n = e.o) == null ? void 0 : n[s] : e.l;
  const o = U(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((h = r == null ? void 0 : r._$AO) == null || h.call(r, !1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, e, s)), s !== void 0 ? (e.o ?? (e.o = []))[s] = r : e.l = r), r !== void 0 && (t = E(i, r._$AS(i, t.values), r, s)), t;
}
class Et {
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
    const { el: { content: e }, parts: s } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? _).importNode(e, !0);
    y.currentNode = r;
    let o = y.nextNode(), n = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let l;
        a.type === 2 ? l = new M(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new Ot(o, this, t)), this._$AV.push(l), a = s[++h];
      }
      n !== (a == null ? void 0 : a.index) && (o = y.nextNode(), n++);
    }
    return y.currentNode = _, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class M {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this.v;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this.v = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = E(this, t, e), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : At(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = C.createElement(lt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new Et(r, this), h = n.u(this.options);
      n.p(e), this.T(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = st.get(t.strings);
    return e === void 0 && st.set(t.strings, e = new C(t)), e;
  }
  k(t) {
    K(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t) r === e.length ? e.push(s = new M(this.O(O()), this.O(O()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this.v = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = E(this, t, e, 0), n = !U(t) || t !== this._$AH && t !== A, n && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = E(this, h[s + a], e, a), l === A && (l = this._$AH[a]), n || (n = !U(l) || l !== this._$AH[a]), l === d ? t = d : t !== d && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class wt extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Pt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class xt extends j {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? d) === A) return;
    const s = this._$AH, r = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ot {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const B = x.litHtmlPolyfillSupport;
B == null || B(C, M), (x.litHtmlVersions ?? (x.litHtmlVersions = [])).push("3.2.0");
const Ut = (i, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = r = new M(t.insertBefore(O(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class H extends S {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this.o = Ut(e, this.renderRoot, this.renderOptions);
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
    return A;
  }
}
var rt;
H._$litElement$ = !0, H.finalized = !0, (rt = globalThis.litElementHydrateSupport) == null || rt.call(globalThis, { LitElement: H });
const D = globalThis.litElementPolyfillSupport;
D == null || D({ LitElement: H });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: q }, Mt = (i = Ct, t, e) => {
  const { kind: s, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), o.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(n, a, i);
    }, init(h) {
      return h !== void 0 && this.P(n, void 0, i), h;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(h) {
      const a = this[n];
      t.call(this, h), this.requestUpdate(n, a, i);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Tt(i) {
  return (t, e) => typeof e == "object" ? Mt(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, n ? { ...s, wrapped: !0 } : s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Dt(i) {
  return Tt({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = (i, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(i, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function It(i, t) {
  return (e, s, r) => {
    const o = (n) => {
      var h;
      return ((h = n.renderRoot) == null ? void 0 : h.querySelector(i)) ?? null;
    };
    return Rt(e, s, { get() {
      return o(this);
    } });
  };
}
function ct(i) {
  var t, e, s = "";
  if (typeof i == "string" || typeof i == "number") s += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var r = i.length;
    for (t = 0; t < r; t++) i[t] && (e = ct(i[t])) && (s && (s += " "), s += e);
  } else for (e in i) i[e] && (s && (s += " "), s += e);
  return s;
}
function Vt() {
  for (var i, t, e = 0, s = "", r = arguments.length; e < r; e++) (i = arguments[e]) && (t = ct(i)) && (s && (s += " "), s += t);
  return s;
}
var it = ["x", "y", "z"], f = function(i) {
  Object.assign(this, { uniforms: {}, geometry: { vertices: [{ x: 0, y: 0, z: 0 }] }, mode: 0, modifiers: {}, attributes: [], multiplier: 1, buffers: [] }), Object.assign(this, i), this.prepareProgram(), this.prepareUniforms(), this.prepareAttributes();
};
f.prototype.compileShader = function(i, t) {
  var e = this.gl.createShader(i);
  return this.gl.shaderSource(e, t), this.gl.compileShader(e), e;
}, f.prototype.prepareProgram = function() {
  var i = this.gl, t = this.vertex, e = this.fragment, s = i.createProgram();
  i.attachShader(s, this.compileShader(35633, t)), i.attachShader(s, this.compileShader(35632, e)), i.linkProgram(s), i.useProgram(s), this.program = s;
}, f.prototype.prepareUniforms = function() {
  for (var i = Object.keys(this.uniforms), t = 0; t < i.length; t += 1) {
    var e = this.gl.getUniformLocation(this.program, i[t]);
    this.uniforms[i[t]].location = e;
  }
}, f.prototype.prepareAttributes = function() {
  this.geometry.vertices !== void 0 && this.attributes.push({ name: "aPosition", size: 3 }), this.geometry.normal !== void 0 && this.attributes.push({ name: "aNormal", size: 3 }), this.attributeKeys = [];
  for (var i = 0; i < this.attributes.length; i += 1) this.attributeKeys.push(this.attributes[i].name), this.prepareAttribute(this.attributes[i]);
}, f.prototype.prepareAttribute = function(i) {
  for (var t = this.geometry, e = this.multiplier, s = t.vertices, r = t.normal, o = new Float32Array(e * s.length * i.size), n = 0; n < e; n += 1) for (var h = i.data && i.data(n, e), a = n * s.length * i.size, l = 0; l < s.length; l += 1) for (var u = 0; u < i.size; u += 1) {
    var c = this.modifiers[i.name];
    o[a] = c !== void 0 ? c(h, l, u, this) : i.name === "aPosition" ? s[l][it[u]] : i.name === "aNormal" ? r[l][it[u]] : h[u], a += 1;
  }
  this.attributes[this.attributeKeys.indexOf(i.name)].data = o, this.prepareBuffer(this.attributes[this.attributeKeys.indexOf(i.name)]);
}, f.prototype.prepareBuffer = function(i) {
  var t = i.data, e = i.name, s = i.size, r = this.gl.createBuffer();
  this.gl.bindBuffer(34962, r), this.gl.bufferData(34962, t, 35044);
  var o = this.gl.getAttribLocation(this.program, e);
  this.gl.enableVertexAttribArray(o), this.gl.vertexAttribPointer(o, s, 5126, !1, 0, 0), this.buffers[this.attributeKeys.indexOf(i.name)] = { buffer: r, location: o, size: s };
}, f.prototype.render = function(i) {
  var t = this, e = this.uniforms, s = this.multiplier, r = this.gl;
  r.useProgram(this.program);
  for (var o = 0; o < this.buffers.length; o += 1) {
    var n = this.buffers[o], h = n.location, a = n.buffer, l = n.size;
    r.enableVertexAttribArray(h), r.bindBuffer(34962, a), r.vertexAttribPointer(h, l, 5126, !1, 0, 0);
  }
  Object.keys(i).forEach(function(u) {
    e[u].value = i[u].value;
  }), Object.keys(e).forEach(function(u) {
    var c = e[u];
    t.uniformMap[c.type](c.location, c.value);
  }), r.drawArrays(this.mode, 0, s * this.geometry.vertices.length), this.onRender && this.onRender(this);
}, f.prototype.destroy = function() {
  for (var i = 0; i < this.buffers.length; i += 1) this.gl.deleteBuffer(this.buffers[i].buffer);
  this.gl.deleteProgram(this.program), this.gl = null;
};
var b = function(i) {
  var t = this, e = i || {}, s = e.canvas;
  s === void 0 && (s = document.querySelector("canvas"));
  var r = e.context;
  r === void 0 && (r = {});
  var o = e.contextType;
  o === void 0 && (o = "experimental-webgl");
  var n = e.settings;
  n === void 0 && (n = {});
  var h = s.getContext(o, Object.assign({ alpha: !1, antialias: !1 }, r));
  Object.assign(this, { gl: h, canvas: s, uniforms: {}, instances: /* @__PURE__ */ new Map(), shouldRender: !0 }), Object.assign(this, { devicePixelRatio: 1, clearColor: [1, 1, 1, 1], position: { x: 0, y: 0, z: 2 }, clip: [1e-3, 100] }), Object.assign(this, n), this.uniformMap = { float: function(a, l) {
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
b.prototype.resize = function() {
  var i = this.gl, t = this.canvas, e = this.devicePixelRatio, s = this.position;
  t.width = t.clientWidth * e, t.height = t.clientHeight * e;
  var r = i.drawingBufferWidth, o = i.drawingBufferHeight, n = r / o;
  i.viewport(0, 0, r, o);
  var h = Math.tan(Math.PI / 180 * 22.5), a = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, s.x, s.y, (n < 1 ? 1 : n) * -s.z, 1];
  this.uniforms.uProjectionMatrix = { type: "mat4", value: [0.5 / h, 0, 0, 0, 0, n / h * 0.5, 0, 0, 0, 0, -(this.clip[1] + this.clip[0]) / (this.clip[1] - this.clip[0]), -1, 0, 0, -2 * this.clip[1] * (this.clip[0] / (this.clip[1] - this.clip[0])), 0] }, this.uniforms.uViewMatrix = { type: "mat4", value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }, this.uniforms.uModelMatrix = { type: "mat4", value: a };
}, b.prototype.toggle = function(i) {
  i !== this.shouldRender && (this.shouldRender = i !== void 0 ? i : !this.shouldRender, this.shouldRender && this.render());
}, b.prototype.render = function() {
  var i = this;
  this.gl.clear(16640), this.instances.forEach(function(t) {
    t.render(i.uniforms);
  }), this.onRender && this.onRender(this), this.shouldRender && requestAnimationFrame(function() {
    return i.render();
  });
}, b.prototype.add = function(i, t) {
  t === void 0 && (t = { uniforms: {} }), t.uniforms === void 0 && (t.uniforms = {}), Object.assign(t.uniforms, JSON.parse(JSON.stringify(this.uniforms))), Object.assign(t, { gl: this.gl, uniformMap: this.uniformMap });
  var e = new f(t);
  return this.instances.set(i, e), e;
}, b.prototype.remove = function(i) {
  var t = this.instances.get(i);
  t !== void 0 && (t.destroy(), this.instances.delete(i));
}, b.prototype.destroy = function() {
  var i = this;
  this.instances.forEach(function(t, e) {
    t.destroy(), i.instances.delete(e);
  }), this.toggle(!1);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = { CHILD: 2 }, Nt = (i) => (...t) => ({ _$litDirective$: i, values: t });
class zt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this.t = t, this._$AM = e, this.i = s;
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
class I extends zt {
  constructor(t) {
    if (super(t), this.it = d, t.type !== Ht.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === d || t == null) return this._t = void 0, this.it = t;
    if (t === A) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
I.directiveName = "unsafeHTML", I.resultType = 1;
const Wt = Nt(I);
export {
  kt as a,
  Dt as b,
  Vt as c,
  Wt as d,
  It as e,
  H as h,
  b as i,
  Lt as k,
  Tt as n,
  ut as r,
  Bt as t
};
