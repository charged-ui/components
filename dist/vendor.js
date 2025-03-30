/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, B = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, D = Symbol(), q = /* @__PURE__ */ new WeakMap();
let se = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== D) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (B && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = q.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && q.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ae = (i) => new se(typeof i == "string" ? i : i + "", void 0, D), Re = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((s, n, o) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + i[o + 1], i[0]);
  return new se(t, i, D);
}, le = (i, e) => {
  if (B) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), n = O.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = t.cssText, i.appendChild(s);
  }
}, K = B ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return ae(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ce, defineProperty: de, getOwnPropertyDescriptor: ue, getOwnPropertyNames: pe, getOwnPropertySymbols: fe, getPrototypeOf: $e } = Object, _ = globalThis, Z = _.trustedTypes, _e = Z ? Z.emptyScript : "", k = _.reactiveElementPolyfillSupport, w = (i, e) => i, H = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? _e : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, V = (i, e) => !ce(i, e), F = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: V };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class E extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = F) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(e, s, t);
      n !== void 0 && de(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: n, set: o } = ue(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get() {
      return n == null ? void 0 : n.call(this);
    }, set(r) {
      const a = n == null ? void 0 : n.call(this);
      o.call(this, r), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? F;
  }
  static _$Ei() {
    if (this.hasOwnProperty(w("elementProperties"))) return;
    const e = $e(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const t = this.properties, s = [...pe(t), ...fe(t)];
      for (const n of s) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, n] of t) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const n = this._$Eu(t, s);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const n of s) t.unshift(K(n));
    } else e !== void 0 && t.push(K(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return le(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostConnected) == null ? void 0 : s.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$EC(e, t) {
    var o;
    const s = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, s);
    if (n !== void 0 && s.reflect === !0) {
      const r = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : H).toAttribute(t, s.type);
      this._$Em = e, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o;
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : H;
      this._$Em = n, this[n] = a.fromAttribute(t, r.type), this._$Em = null;
    }
  }
  requestUpdate(e, t, s) {
    if (e !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(e)), !(s.hasChanged ?? V)(this[e], t)) return;
      this.P(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, t, s) {
    this._$AL.has(e) || this._$AL.set(e, t), s.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, r] of n) r.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], r);
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(t)) : this._$EU();
    } catch (n) {
      throw e = !1, this._$EU(), n;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var n;
      return (n = s.hostUpdated) == null ? void 0 : n.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t) => this._$EC(t, this[t]))), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[w("elementProperties")] = /* @__PURE__ */ new Map(), E[w("finalized")] = /* @__PURE__ */ new Map(), k == null || k({ ReactiveElement: E }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, M = P.trustedTypes, J = M ? M.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ne = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, ie = "?" + $, Ae = `<${ie}>`, m = document, U = () => m.createComment(""), T = (i) => i === null || typeof i != "object" && typeof i != "function", W = Array.isArray, ge = (i) => W(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", L = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Y = /-->/g, G = />/g, A = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Q = /'/g, X = /"/g, re = /^(?:script|style|textarea|title)$/i, me = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), ke = me(1), y = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), ee = /* @__PURE__ */ new WeakMap(), g = m.createTreeWalker(m, 129);
function oe(i, e) {
  if (!W(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return J !== void 0 ? J.createHTML(e) : e;
}
const ye = (i, e) => {
  const t = i.length - 1, s = [];
  let n, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = S;
  for (let a = 0; a < t; a++) {
    const h = i[a];
    let d, u, l = -1, p = 0;
    for (; p < h.length && (r.lastIndex = p, u = r.exec(h), u !== null); ) p = r.lastIndex, r === S ? u[1] === "!--" ? r = Y : u[1] !== void 0 ? r = G : u[2] !== void 0 ? (re.test(u[2]) && (n = RegExp("</" + u[2], "g")), r = A) : u[3] !== void 0 && (r = A) : r === A ? u[0] === ">" ? (r = n ?? S, l = -1) : u[1] === void 0 ? l = -2 : (l = r.lastIndex - u[2].length, d = u[1], r = u[3] === void 0 ? A : u[3] === '"' ? X : Q) : r === X || r === Q ? r = A : r === Y || r === G ? r = S : (r = A, n = void 0);
    const f = r === A && i[a + 1].startsWith("/>") ? " " : "";
    o += r === S ? h + Ae : l >= 0 ? (s.push(d), h.slice(0, l) + ne + h.slice(l) + $ + f) : h + $ + (l === -2 ? a : f);
  }
  return [oe(i, o + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class v {
  constructor({ strings: e, _$litType$: t }, s) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const a = e.length - 1, h = this.parts, [d, u] = ye(e, t);
    if (this.el = v.createElement(d, s), g.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (n = g.nextNode()) !== null && h.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const l of n.getAttributeNames()) if (l.endsWith(ne)) {
          const p = u[r++], f = n.getAttribute(l).split($), x = /([.?@])?(.*)/.exec(p);
          h.push({ type: 1, index: o, name: x[2], strings: f, ctor: x[1] === "." ? be : x[1] === "?" ? Se : x[1] === "@" ? we : R }), n.removeAttribute(l);
        } else l.startsWith($) && (h.push({ type: 6, index: o }), n.removeAttribute(l));
        if (re.test(n.tagName)) {
          const l = n.textContent.split($), p = l.length - 1;
          if (p > 0) {
            n.textContent = M ? M.emptyScript : "";
            for (let f = 0; f < p; f++) n.append(l[f], U()), g.nextNode(), h.push({ type: 2, index: ++o });
            n.append(l[p], U());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ie) h.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = n.data.indexOf($, l + 1)) !== -1; ) h.push({ type: 7, index: o }), l += $.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const s = m.createElement("template");
    return s.innerHTML = e, s;
  }
}
function b(i, e, t = i, s) {
  var r, a;
  if (e === y) return e;
  let n = s !== void 0 ? (r = t.o) == null ? void 0 : r[s] : t.l;
  const o = T(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), o === void 0 ? n = void 0 : (n = new o(i), n._$AT(i, t, s)), s !== void 0 ? (t.o ?? (t.o = []))[s] = n : t.l = n), n !== void 0 && (e = b(i, n._$AS(i, e.values), n, s)), e;
}
class Ee {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? m).importNode(t, !0);
    g.currentNode = n;
    let o = g.nextNode(), r = 0, a = 0, h = s[0];
    for (; h !== void 0; ) {
      if (r === h.index) {
        let d;
        h.type === 2 ? d = new C(o, o.nextSibling, this, e) : h.type === 1 ? d = new h.ctor(o, h.name, h.strings, this, e) : h.type === 6 && (d = new Pe(o, this, e)), this._$AV.push(d), h = s[++a];
      }
      r !== (h == null ? void 0 : h.index) && (o = g.nextNode(), r++);
    }
    return g.currentNode = m, n;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class C {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this.v;
  }
  constructor(e, t, s, n) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = n, this.v = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = b(this, e, t), T(e) ? e === c || e == null || e === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : e !== this._$AH && e !== y && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ge(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== c && T(this._$AH) ? this._$AA.nextSibling.data = e : this.T(m.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = v.createElement(oe(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(t);
    else {
      const r = new Ee(n, this), a = r.u(this.options);
      r.p(t), this.T(a), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = ee.get(e.strings);
    return t === void 0 && ee.set(e.strings, t = new v(e)), t;
  }
  k(e) {
    W(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, n = 0;
    for (const o of e) n === t.length ? t.push(s = new C(this.O(U()), this.O(U()), this, this.options)) : s = t[n], s._$AI(o), n++;
    n < t.length && (this._$AR(s && s._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const n = e.nextSibling;
      e.remove(), e = n;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this.v = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, n, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(e, t = this, s, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) e = b(this, e, t, 0), r = !T(e) || e !== this._$AH && e !== y, r && (this._$AH = e);
    else {
      const a = e;
      let h, d;
      for (e = o[0], h = 0; h < o.length - 1; h++) d = b(this, a[s + h], t, h), d === y && (d = this._$AH[h]), r || (r = !T(d) || d !== this._$AH[h]), d === c ? e = c : e !== c && (e += (d ?? "") + o[h + 1]), this._$AH[h] = d;
    }
    r && !n && this.j(e);
  }
  j(e) {
    e === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class be extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === c ? void 0 : e;
  }
}
class Se extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== c);
  }
}
class we extends R {
  constructor(e, t, s, n, o) {
    super(e, t, s, n, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = b(this, e, t, 0) ?? c) === y) return;
    const s = this._$AH, n = e === c && s !== c || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== c && (s === c || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Pe {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    b(this, e);
  }
}
const j = P.litHtmlPolyfillSupport;
j == null || j(v, C), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.2.0");
const Ue = (i, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = n = new C(e.insertBefore(U(), o), o, void 0, t ?? {});
  }
  return n._$AI(i), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class N extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this.o = Ue(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this.o) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.o) == null || e.setConnected(!1);
  }
  render() {
    return y;
  }
}
var te;
N._$litElement$ = !0, N.finalized = !0, (te = globalThis.litElementHydrateSupport) == null || te.call(globalThis, { LitElement: N });
const I = globalThis.litElementPolyfillSupport;
I == null || I({ LitElement: N });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Te = { attribute: !0, type: String, converter: H, reflect: !1, hasChanged: V }, ve = (i = Te, e, t) => {
  const { kind: s, metadata: n } = t;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), o.set(t.name, i), s === "accessor") {
    const { name: r } = t;
    return { set(a) {
      const h = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(r, h, i);
    }, init(a) {
      return a !== void 0 && this.P(r, void 0, i), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = t;
    return function(a) {
      const h = this[r];
      e.call(this, a), this.requestUpdate(r, h, i);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Ce(i) {
  return (e, t) => typeof t == "object" ? ve(i, e, t) : ((s, n, o) => {
    const r = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r ? { ...s, wrapped: !0 } : s), r ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(i, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function je(i) {
  return Ce({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = (i, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(i, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ie(i, e) {
  return (t, s, n) => {
    const o = (r) => {
      var a;
      return ((a = r.renderRoot) == null ? void 0 : a.querySelector(i)) ?? null;
    };
    return xe(t, s, { get() {
      return o(this);
    } });
  };
}
function he(i) {
  var e, t, s = "";
  if (typeof i == "string" || typeof i == "number") s += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var n = i.length;
    for (e = 0; e < n; e++) i[e] && (t = he(i[e])) && (s && (s += " "), s += t);
  } else for (t in i) i[t] && (s && (s += " "), s += t);
  return s;
}
function ze() {
  for (var i, e, t = 0, s = "", n = arguments.length; t < n; t++) (i = arguments[t]) && (e = he(i)) && (s && (s += " "), s += e);
  return s;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ne = (i) => (...e) => ({ _$litDirective$: i, values: e });
class He {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, s) {
    this.t = e, this._$AM = t, this.i = s;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class z extends He {
  constructor(e) {
    if (super(e), this.it = c, e.type !== Oe.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === c || e == null) return this._t = void 0, this.it = e;
    if (e === y) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it) return this._t;
    this.it = e;
    const t = [e];
    return t.raw = t, this._t = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
}
z.directiveName = "unsafeHTML", z.resultType = 1;
const Be = Ne(z);
export {
  je as a,
  Be as b,
  ze as c,
  Ie as e,
  N as h,
  Re as i,
  ke as k,
  Ce as n,
  ae as r,
  Le as t
};
