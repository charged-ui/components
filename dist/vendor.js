/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Re = globalThis, ht = Re.ShadowRoot && (Re.ShadyCSS === void 0 || Re.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, dt = Symbol(), kt = /* @__PURE__ */ new WeakMap();
let xn = class {
  constructor(e, n, s) {
    if (this._$cssResult$ = !0, s !== dt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (ht && e === void 0) {
      const s = n !== void 0 && n.length === 1;
      s && (e = kt.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && kt.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ds = (t) => new xn(typeof t == "string" ? t : t + "", void 0, dt), ra = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[r + 1], t[0]);
  return new xn(n, t, dt);
}, Fs = (t, e) => {
  if (ht) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const s = document.createElement("style"), i = Re.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = n.cssText, t.appendChild(s);
  }
}, Kt = ht ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const s of e.cssRules) n += s.cssText;
  return Ds(n);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ns, defineProperty: Is, getOwnPropertyDescriptor: Bs, getOwnPropertyNames: Us, getOwnPropertySymbols: ks, getPrototypeOf: Ks } = Object, k = globalThis, Lt = k.trustedTypes, Ls = Lt ? Lt.emptyScript : "", Ge = k.reactiveElementPolyfillSupport, de = (t, e) => t, Fe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ls : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, ft = (t, e) => !Ns(t, e), Ht = { attribute: !0, type: String, converter: Fe, reflect: !1, hasChanged: ft };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), k.litPropertyMetadata ?? (k.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class X extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Ht) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.elementProperties.set(e, n), !n.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, n);
      i !== void 0 && Is(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, s) {
    const { get: i, set: r } = Bs(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(o) {
      const a = i == null ? void 0 : i.call(this);
      r.call(this, o), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(de("elementProperties"))) return;
    const e = Ks(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(de("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(de("properties"))) {
      const n = this.properties, s = [...Us(n), ...ks(n)];
      for (const i of s) this.createProperty(i, n[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [s, i] of n) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, s] of this.elementProperties) {
      const i = this._$Eu(n, s);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) n.unshift(Kt(i));
    } else e !== void 0 && n.push(Kt(e));
    return n;
  }
  static _$Eu(e, n) {
    const s = n.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((n) => n(this));
  }
  addController(e) {
    var n;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((n = e.hostConnected) == null || n.call(e));
  }
  removeController(e) {
    var n;
    (n = this._$EO) == null || n.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const s of n.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Fs(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((n) => {
      var s;
      return (s = n.hostConnected) == null ? void 0 : s.call(n);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var s;
      return (s = n.hostDisconnected) == null ? void 0 : s.call(n);
    });
  }
  attributeChangedCallback(e, n, s) {
    this._$AK(e, s);
  }
  _$EC(e, n) {
    var r;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : Fe).toAttribute(n, s.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, n) {
    var r;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), a = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : Fe;
      this._$Em = i, this[i] = a.fromAttribute(n, o.type), this._$Em = null;
    }
  }
  requestUpdate(e, n, s) {
    if (e !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(e)), !(s.hasChanged ?? ft)(this[e], n)) return;
      this.P(e, n, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(e, n, s) {
    this._$AL.has(e) || this._$AL.set(e, n), s.reflect === !0 && this._$Em !== e && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(e);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
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
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, o] of i) o.wrapped !== !0 || this._$AL.has(r) || this[r] === void 0 || this.P(r, this[r], o);
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), (s = this._$EO) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
      }), this.update(n)) : this._$EU();
    } catch (i) {
      throw e = !1, this._$EU(), i;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var n;
    (n = this._$EO) == null || n.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
    this._$Ej && (this._$Ej = this._$Ej.forEach((n) => this._$EC(n, this[n]))), this._$EU();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
X.elementStyles = [], X.shadowRootOptions = { mode: "open" }, X[de("elementProperties")] = /* @__PURE__ */ new Map(), X[de("finalized")] = /* @__PURE__ */ new Map(), Ge == null || Ge({ ReactiveElement: X }), (k.reactiveElementVersions ?? (k.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis, Ne = fe.trustedTypes, jt = Ne ? Ne.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Vn = "$lit$", U = `lit$${Math.random().toFixed(9).slice(2)}$`, _n = "?" + U, Hs = `<${_n}>`, q = document, ge = () => q.createComment(""), ye = (t) => t === null || typeof t != "object" && typeof t != "function", pt = Array.isArray, js = (t) => pt(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", qe = `[ 	
\f\r]`, ce = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wt = /-->/g, zt = />/g, j = RegExp(`>|${qe}(?:([^\\s"'>=/]+)(${qe}*=${qe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gt = /'/g, qt = /"/g, Mn = /^(?:script|style|textarea|title)$/i, Ws = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), oa = Ws(1), Y = Symbol.for("lit-noChange"), M = Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), W = q.createTreeWalker(q, 129);
function En(t, e) {
  if (!pt(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return jt !== void 0 ? jt.createHTML(e) : e;
}
const zs = (t, e) => {
  const n = t.length - 1, s = [];
  let i, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = ce;
  for (let a = 0; a < n; a++) {
    const l = t[a];
    let c, u, h = -1, d = 0;
    for (; d < l.length && (o.lastIndex = d, u = o.exec(l), u !== null); ) d = o.lastIndex, o === ce ? u[1] === "!--" ? o = Wt : u[1] !== void 0 ? o = zt : u[2] !== void 0 ? (Mn.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = j) : u[3] !== void 0 && (o = j) : o === j ? u[0] === ">" ? (o = i ?? ce, h = -1) : u[1] === void 0 ? h = -2 : (h = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? j : u[3] === '"' ? qt : Gt) : o === qt || o === Gt ? o = j : o === Wt || o === zt ? o = ce : (o = j, i = void 0);
    const f = o === j && t[a + 1].startsWith("/>") ? " " : "";
    r += o === ce ? l + Hs : h >= 0 ? (s.push(c), l.slice(0, h) + Vn + l.slice(h) + U + f) : l + U + (h === -2 ? a : f);
  }
  return [En(t, r + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class ve {
  constructor({ strings: e, _$litType$: n }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, l = this.parts, [c, u] = zs(e, n);
    if (this.el = ve.createElement(c, s), W.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = W.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Vn)) {
          const d = u[o++], f = i.getAttribute(h).split(U), p = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: r, name: p[2], strings: f, ctor: p[1] === "." ? qs : p[1] === "?" ? Ys : p[1] === "@" ? Zs : Le }), i.removeAttribute(h);
        } else h.startsWith(U) && (l.push({ type: 6, index: r }), i.removeAttribute(h));
        if (Mn.test(i.tagName)) {
          const h = i.textContent.split(U), d = h.length - 1;
          if (d > 0) {
            i.textContent = Ne ? Ne.emptyScript : "";
            for (let f = 0; f < d; f++) i.append(h[f], ge()), W.nextNode(), l.push({ type: 2, index: ++r });
            i.append(h[d], ge());
          }
        }
      } else if (i.nodeType === 8) if (i.data === _n) l.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(U, h + 1)) !== -1; ) l.push({ type: 7, index: r }), h += U.length - 1;
      }
      r++;
    }
  }
  static createElement(e, n) {
    const s = q.createElement("template");
    return s.innerHTML = e, s;
  }
}
function ee(t, e, n = t, s) {
  var o, a;
  if (e === Y) return e;
  let i = s !== void 0 ? (o = n.o) == null ? void 0 : o[s] : n.l;
  const r = ye(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), r === void 0 ? i = void 0 : (i = new r(t), i._$AT(t, n, s)), s !== void 0 ? (n.o ?? (n.o = []))[s] = i : n.l = i), i !== void 0 && (e = ee(t, i._$AS(t, e.values), i, s)), e;
}
class Gs {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? q).importNode(n, !0);
    W.currentNode = i;
    let r = W.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new $e(r, r.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (c = new Xs(r, this, e)), this._$AV.push(c), l = s[++a];
      }
      o !== (l == null ? void 0 : l.index) && (r = W.nextNode(), o++);
    }
    return W.currentNode = q, i;
  }
  p(e) {
    let n = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, n), n += s.strings.length - 2) : s._$AI(e[n])), n++;
  }
}
class $e {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this.v;
  }
  constructor(e, n, s, i) {
    this.type = 2, this._$AH = M, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = s, this.options = i, this.v = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = ee(this, e, n), ye(e) ? e === M || e == null || e === "" ? (this._$AH !== M && this._$AR(), this._$AH = M) : e !== this._$AH && e !== Y && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : js(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== M && ye(this._$AH) ? this._$AA.nextSibling.data = e : this.T(q.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: n, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = ve.createElement(En(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i) this._$AH.p(n);
    else {
      const o = new Gs(i, this), a = o.u(this.options);
      o.p(n), this.T(a), this._$AH = o;
    }
  }
  _$AC(e) {
    let n = Yt.get(e.strings);
    return n === void 0 && Yt.set(e.strings, n = new ve(e)), n;
  }
  k(e) {
    pt(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let s, i = 0;
    for (const r of e) i === n.length ? n.push(s = new $e(this.O(ge()), this.O(ge()), this, this.options)) : s = n[i], s._$AI(r), i++;
    i < n.length && (this._$AR(s && s._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, n); e && e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    var n;
    this._$AM === void 0 && (this.v = e, (n = this._$AP) == null || n.call(this, e));
  }
}
class Le {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, s, i, r) {
    this.type = 1, this._$AH = M, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = M;
  }
  _$AI(e, n = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = ee(this, e, n, 0), o = !ye(e) || e !== this._$AH && e !== Y, o && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = r[0], l = 0; l < r.length - 1; l++) c = ee(this, a[s + l], n, l), c === Y && (c = this._$AH[l]), o || (o = !ye(c) || c !== this._$AH[l]), c === M ? e = M : e !== M && (e += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === M ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class qs extends Le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === M ? void 0 : e;
  }
}
class Ys extends Le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== M);
  }
}
class Zs extends Le {
  constructor(e, n, s, i, r) {
    super(e, n, s, i, r), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = ee(this, e, n, 0) ?? M) === Y) return;
    const s = this._$AH, i = e === M && s !== M || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, r = e !== M && (s === M || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Xs {
  constructor(e, n, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ee(this, e);
  }
}
const Ye = fe.litHtmlPolyfillSupport;
Ye == null || Ye(ve, $e), (fe.litHtmlVersions ?? (fe.litHtmlVersions = [])).push("3.2.0");
const Js = (t, e, n) => {
  const s = (n == null ? void 0 : n.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (n == null ? void 0 : n.renderBefore) ?? null;
    s._$litPart$ = i = new $e(e.insertBefore(ge(), r), r, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Oe extends X {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this.o = void 0;
  }
  createRenderRoot() {
    var n;
    const e = super.createRenderRoot();
    return (n = this.renderOptions).renderBefore ?? (n.renderBefore = e.firstChild), e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this.o = Js(n, this.renderRoot, this.renderOptions);
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
    return Y;
  }
}
var wn;
Oe._$litElement$ = !0, Oe.finalized = !0, (wn = globalThis.litElementHydrateSupport) == null || wn.call(globalThis, { LitElement: Oe });
const Ze = globalThis.litElementPolyfillSupport;
Ze == null || Ze({ LitElement: Oe });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const aa = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qs = { attribute: !0, type: String, converter: Fe, reflect: !1, hasChanged: ft }, ei = (t = Qs, e, n) => {
  const { kind: s, metadata: i } = n;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), r.set(n.name, t), s === "accessor") {
    const { name: o } = n;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, l, t);
    }, init(a) {
      return a !== void 0 && this.P(o, void 0, t), a;
    } };
  }
  if (s === "setter") {
    const { name: o } = n;
    return function(a) {
      const l = this[o];
      e.call(this, a), this.requestUpdate(o, l, t);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ti(t) {
  return (e, n) => typeof n == "object" ? ei(t, e, n) : ((s, i, r) => {
    const o = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, o ? { ...s, wrapped: !0 } : s), o ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(t, e, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function la(t) {
  return ti({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ni = (t, e, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, n), n);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ua(t, e) {
  return (n, s, i) => {
    const r = (o) => {
      var a;
      return ((a = o.renderRoot) == null ? void 0 : a.querySelector(t)) ?? null;
    };
    return ni(n, s, { get() {
      return r(this);
    } });
  };
}
function Pn(t) {
  var e, n, s = "";
  if (typeof t == "string" || typeof t == "number") s += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var i = t.length;
    for (e = 0; e < i; e++) t[e] && (n = Pn(t[e])) && (s && (s += " "), s += n);
  } else for (n in t) t[n] && (s && (s += " "), s += n);
  return s;
}
function ca() {
  for (var t, e, n = 0, s = "", i = arguments.length; n < i; n++) (t = arguments[n]) && (e = Pn(t)) && (s && (s += " "), s += e);
  return s;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const si = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, ii = (t) => (...e) => ({ _$litDirective$: t, values: e });
class ri {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, n, s) {
    this.t = e, this._$AM = n, this.i = s;
  }
  _$AS(e, n) {
    return this.update(e, n);
  }
  update(e, n) {
    return this.render(...n);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class et extends ri {
  constructor(e) {
    if (super(e), this.it = M, e.type !== si.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === M || e == null) return this._t = void 0, this.it = e;
    if (e === Y) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it) return this._t;
    this.it = e;
    const n = [e];
    return n.raw = n, this._t = { _$litType$: this.constructor.resultType, strings: n, values: [] };
  }
}
et.directiveName = "unsafeHTML", et.resultType = 1;
const ha = ii(et);
function Cn(t, e, n) {
  var s;
  if (t instanceof Element)
    return [t];
  if (typeof t == "string") {
    let i = document;
    const r = (s = n == null ? void 0 : n[t]) !== null && s !== void 0 ? s : i.querySelectorAll(t);
    return r ? Array.from(r) : [];
  }
  return Array.from(t);
}
const L = /* @__NO_SIDE_EFFECTS__ */ (t) => t;
let we = L, H = L;
process.env.NODE_ENV !== "production" && (we = (t, e) => {
  !t && typeof console < "u" && console.warn(e);
}, H = (t, e) => {
  if (!t)
    throw new Error(e);
});
const He = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s === 0 ? 1 : (n - t) / s;
};
// @__NO_SIDE_EFFECTS__
function mt(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const oi = /* @__PURE__ */ mt(() => window.ScrollTimeline !== void 0);
class ai {
  constructor(e) {
    this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((e) => "finished" in e ? e.finished : e));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(e) {
    return this.animations[0][e];
  }
  setAll(e, n) {
    for (let s = 0; s < this.animations.length; s++)
      this.animations[s][e] = n;
  }
  attachTimeline(e, n) {
    const s = this.animations.map((i) => {
      if (oi() && i.attachTimeline)
        return i.attachTimeline(e);
      if (typeof n == "function")
        return n(i);
    });
    return () => {
      s.forEach((i, r) => {
        i && i(), this.animations[r].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(e) {
    this.setAll("time", e);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(e) {
    this.setAll("speed", e);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let e = 0;
    for (let n = 0; n < this.animations.length; n++)
      e = Math.max(e, this.animations[n].duration);
    return e;
  }
  runAll(e) {
    this.animations.forEach((n) => n[e]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
class Rn extends ai {
  then(e, n) {
    return Promise.all(this.animations).then(e).catch(n);
  }
}
const D = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, N = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3, Ie = 2e4;
function gt(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < Ie; )
    e += n, s = t.next(e);
  return e >= Ie ? 1 / 0 : e;
}
const On = (t, e, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(e / n), 2);
  for (let r = 0; r < i; r++)
    s += t(/* @__PURE__ */ He(0, i - 1, r)) + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, Z = (t, e, n) => n > e ? e : n < t ? t : n;
function Dn(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const li = 5;
function Fn(t, e, n) {
  const s = Math.max(e - li, 0);
  return Dn(n - t(s), e - s);
}
const w = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, Zt = 1e-3;
function ui({ duration: t = w.duration, bounce: e = w.bounce, velocity: n = w.velocity, mass: s = w.mass }) {
  let i, r;
  we(t <= /* @__PURE__ */ D(w.maxDuration), "Spring duration must be 10 seconds or less");
  let o = 1 - e;
  o = Z(w.minDamping, w.maxDamping, o), t = Z(w.minDuration, w.maxDuration, /* @__PURE__ */ N(t)), o < 1 ? (i = (c) => {
    const u = c * o, h = u * t, d = u - n, f = tt(c, o), p = Math.exp(-h);
    return Zt - d / f * p;
  }, r = (c) => {
    const h = c * o * t, d = h * n + n, f = Math.pow(o, 2) * Math.pow(c, 2) * t, p = Math.exp(-h), b = tt(Math.pow(c, 2), o);
    return (-i(c) + Zt > 0 ? -1 : 1) * ((d - f) * p) / b;
  }) : (i = (c) => {
    const u = Math.exp(-c * t), h = (c - n) * t + 1;
    return -1e-3 + u * h;
  }, r = (c) => {
    const u = Math.exp(-c * t), h = (n - c) * (t * t);
    return u * h;
  });
  const a = 5 / t, l = hi(i, r, a);
  if (t = /* @__PURE__ */ D(t), isNaN(l))
    return {
      stiffness: w.stiffness,
      damping: w.damping,
      duration: t
    };
  {
    const c = Math.pow(l, 2) * s;
    return {
      stiffness: c,
      damping: o * 2 * Math.sqrt(s * c),
      duration: t
    };
  }
}
const ci = 12;
function hi(t, e, n) {
  let s = n;
  for (let i = 1; i < ci; i++)
    s = s - t(s) / e(s);
  return s;
}
function tt(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const di = ["duration", "bounce"], fi = ["stiffness", "damping", "mass"];
function Xt(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function pi(t) {
  let e = {
    velocity: w.velocity,
    stiffness: w.stiffness,
    damping: w.damping,
    mass: w.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Xt(t, fi) && Xt(t, di))
    if (t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, r = 2 * Z(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = {
        ...e,
        mass: w.mass,
        stiffness: i,
        damping: r
      };
    } else {
      const n = ui(t);
      e = {
        ...e,
        ...n,
        mass: w.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function yt(t = w.visualDuration, e = w.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: i } = n;
  const r = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: c, mass: u, duration: h, velocity: d, isResolvedFromDuration: f } = pi({
    ...n,
    velocity: -/* @__PURE__ */ N(n.velocity || 0)
  }), p = d || 0, b = c / (2 * Math.sqrt(l * u)), A = o - r, g = /* @__PURE__ */ N(Math.sqrt(l / u)), T = Math.abs(A) < 5;
  s || (s = T ? w.restSpeed.granular : w.restSpeed.default), i || (i = T ? w.restDelta.granular : w.restDelta.default);
  let V;
  if (b < 1) {
    const y = tt(g, b);
    V = (S) => {
      const _ = Math.exp(-b * g * S);
      return o - _ * ((p + b * g * A) / y * Math.sin(y * S) + A * Math.cos(y * S));
    };
  } else if (b === 1)
    V = (y) => o - Math.exp(-g * y) * (A + (p + g * A) * y);
  else {
    const y = g * Math.sqrt(b * b - 1);
    V = (S) => {
      const _ = Math.exp(-b * g * S), v = Math.min(y * S, 300);
      return o - _ * ((p + b * g * A) * Math.sinh(v) + y * A * Math.cosh(v)) / y;
    };
  }
  const x = {
    calculatedDuration: f && h || null,
    next: (y) => {
      const S = V(y);
      if (f)
        a.done = y >= h;
      else {
        let _ = 0;
        b < 1 && (_ = y === 0 ? /* @__PURE__ */ D(p) : Fn(V, y, S));
        const v = Math.abs(_) <= s, $ = Math.abs(o - S) <= i;
        a.done = v && $;
      }
      return a.value = a.done ? o : S, a;
    },
    toString: () => {
      const y = Math.min(gt(x), Ie), S = On((_) => x.next(y * _).value, y, 30);
      return y + "ms " + S;
    }
  };
  return x;
}
function mi(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), i = Math.min(gt(s), Ie);
  return {
    type: "keyframes",
    ease: (r) => s.next(i * r).value / e,
    duration: /* @__PURE__ */ N(i)
  };
}
function je(t) {
  return typeof t == "function";
}
const gi = (t, e, n) => {
  const s = e - t;
  return ((n - t) % s + s) % s + t;
}, Nn = (t) => Array.isArray(t) && typeof t[0] != "number";
function In(t, e) {
  return Nn(t) ? t[gi(0, t.length, e)] : t;
}
const xe = (t, e, n) => t + (e - t) * n;
function Bn(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = /* @__PURE__ */ He(0, e, s);
    t.push(xe(n, 1, i));
  }
}
function Un(t) {
  const e = [0];
  return Bn(e, t.length - 1), e;
}
const P = (t) => !!(t && t.getVelocity);
function vt(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function kn(t, e, n, s) {
  return typeof t == "string" && vt(e) ? Cn(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t : [t];
}
function yi(t, e, n) {
  return t * (e + 1);
}
function Jt(t, e, n, s) {
  var i;
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : (i = s.get(e)) !== null && i !== void 0 ? i : t;
}
function vi(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Kn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function bi(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const i = t[s];
    i.at > e && i.at < n && (Kn(t, i), s--);
  }
}
function Ai(t, e, n, s, i, r) {
  bi(t, i, r);
  for (let o = 0; o < e.length; o++)
    t.push({
      value: e[o],
      at: xe(i, r, s[o]),
      easing: In(n, o)
    });
}
function Ti(t, e) {
  for (let n = 0; n < t.length; n++)
    t[n] = t[n] / (e + 1);
}
function Si(t, e) {
  return t.at === e.at ? t.value === null ? 1 : e.value === null ? -1 : 0 : t.at - e.at;
}
const $i = "easeInOut", wi = 20;
function xi(t, { defaultTransition: e = {}, ...n } = {}, s, i) {
  const r = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, c = /* @__PURE__ */ new Map();
  let u = 0, h = 0, d = 0;
  for (let f = 0; f < t.length; f++) {
    const p = t[f];
    if (typeof p == "string") {
      c.set(p, h);
      continue;
    } else if (!Array.isArray(p)) {
      c.set(p.name, Jt(h, p.at, u, c));
      continue;
    }
    let [b, A, g = {}] = p;
    g.at !== void 0 && (h = Jt(h, g.at, u, c));
    let T = 0;
    const V = (x, y, S, _ = 0, v = 0) => {
      const $ = Vi(x), { delay: C = 0, times: O = Un($), type: ze = "keyframes", repeat: oe, repeatType: na, repeatDelay: sa = 0, ...Os } = y;
      let { ease: I = e.ease || "easeOut", duration: R } = y;
      const Dt = typeof C == "function" ? C(_, v) : C, Ft = $.length, Nt = je(ze) ? ze : i == null ? void 0 : i[ze];
      if (Ft <= 2 && Nt) {
        let ae = 100;
        if (Ft === 2 && Ei($)) {
          const le = $[1] - $[0];
          ae = Math.abs(le);
        }
        const Me = { ...Os };
        R !== void 0 && (Me.duration = /* @__PURE__ */ D(R));
        const Ee = mi(Me, ae, Nt);
        I = Ee.ease, R = Ee.duration;
      }
      R ?? (R = r);
      const It = h + Dt;
      O.length === 1 && O[0] === 0 && (O[1] = 1);
      const Bt = O.length - $.length;
      if (Bt > 0 && Bn(O, Bt), $.length === 1 && $.unshift(null), oe) {
        H(oe < wi, "Repeat count too high, must be less than 20"), R = yi(R, oe);
        const ae = [...$], Me = [...O];
        I = Array.isArray(I) ? [...I] : [I];
        const Ee = [...I];
        for (let le = 0; le < oe; le++) {
          $.push(...ae);
          for (let ue = 0; ue < ae.length; ue++)
            O.push(Me[ue] + (le + 1)), I.push(ue === 0 ? "linear" : In(Ee, ue - 1));
        }
        Ti(O, oe);
      }
      const Ut = It + R;
      Ai(S, $, I, O, It, Ut), T = Math.max(Dt + R, T), d = Math.max(Ut, d);
    };
    if (P(b)) {
      const x = Qt(b, a);
      V(A, g, en("default", x));
    } else {
      const x = kn(b, A, s, l), y = x.length;
      for (let S = 0; S < y; S++) {
        A = A, g = g;
        const _ = x[S], v = Qt(_, a);
        for (const $ in A)
          V(A[$], _i(g, $), en($, v), S, y);
      }
    }
    u = h, h += T;
  }
  return a.forEach((f, p) => {
    for (const b in f) {
      const A = f[b];
      A.sort(Si);
      const g = [], T = [], V = [];
      for (let y = 0; y < A.length; y++) {
        const { at: S, value: _, easing: v } = A[y];
        g.push(_), T.push(/* @__PURE__ */ He(0, d, S)), V.push(v || "easeOut");
      }
      T[0] !== 0 && (T.unshift(0), g.unshift(g[0]), V.unshift($i)), T[T.length - 1] !== 1 && (T.push(1), g.push(null)), o.has(p) || o.set(p, {
        keyframes: {},
        transition: {}
      });
      const x = o.get(p);
      x.keyframes[b] = g, x.transition[b] = {
        ...e,
        duration: d,
        ease: V,
        times: T,
        ...n
      };
    }
  }), o;
}
function Qt(t, e) {
  return !e.has(t) && e.set(t, {}), e.get(t);
}
function en(t, e) {
  return e[t] || (e[t] = []), e[t];
}
function Vi(t) {
  return Array.isArray(t) ? t : [t];
}
function _i(t, e) {
  return t && t[e] ? {
    ...t,
    ...t[e]
  } : { ...t };
}
const Mi = (t) => typeof t == "number", Ei = (t) => t.every(Mi), be = /* @__PURE__ */ new WeakMap();
function Ln(t, e) {
  return t ? t[e] || t.default || t : void 0;
}
const ne = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], se = new Set(ne), Hn = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...ne
]), Pi = (t) => Array.isArray(t), Ci = (t) => Pi(t) ? t[t.length - 1] || 0 : t, Ri = {
  skipAnimations: !1,
  useManualTiming: !1
}, Pe = [
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Oi(t, e) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), i = !1, r = !1;
  const o = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(u) {
    o.has(u) && (c.schedule(u), t()), u(a);
  }
  const c = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (u, h = !1, d = !1) => {
      const p = d && i ? n : s;
      return h && o.add(u), p.has(u) || p.add(u), u;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (u) => {
      s.delete(u), o.delete(u);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (u) => {
      if (a = u, i) {
        r = !0;
        return;
      }
      i = !0, [n, s] = [s, n], n.forEach(l), n.clear(), i = !1, r && (r = !1, c.process(u));
    }
  };
  return c;
}
const Di = 40;
function Fi(t, e) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, o = Pe.reduce((g, T) => (g[T] = Oi(r), g), {}), { read: a, resolveKeyframes: l, update: c, preRender: u, render: h, postRender: d } = o, f = () => {
    const g = performance.now();
    n = !1, i.delta = s ? 1e3 / 60 : Math.max(Math.min(g - i.timestamp, Di), 1), i.timestamp = g, i.isProcessing = !0, a.process(i), l.process(i), c.process(i), u.process(i), h.process(i), d.process(i), i.isProcessing = !1, n && e && (s = !1, t(f));
  }, p = () => {
    n = !0, s = !0, i.isProcessing || t(f);
  };
  return { schedule: Pe.reduce((g, T) => {
    const V = o[T];
    return g[T] = (x, y = !1, S = !1) => (n || p(), V.schedule(x, y, S)), g;
  }, {}), cancel: (g) => {
    for (let T = 0; T < Pe.length; T++)
      o[Pe[T]].cancel(g);
  }, state: i, steps: o };
}
const { schedule: F, cancel: nt, state: Be, steps: da } = Fi(typeof requestAnimationFrame < "u" ? requestAnimationFrame : L, !0);
let De;
function Ni() {
  De = void 0;
}
const K = {
  now: () => (De === void 0 && K.set(Be.isProcessing || Ri.useManualTiming ? Be.timestamp : performance.now()), De),
  set: (t) => {
    De = t, queueMicrotask(Ni);
  }
};
class jn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return vi(this.subscriptions, e), () => Kn(this.subscriptions, e);
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](e, n, s);
      else
        for (let r = 0; r < i; r++) {
          const o = this.subscriptions[r];
          o && o(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const tn = /* @__PURE__ */ new Set();
function bt(t, e, n) {
  t || tn.has(e) || (console.warn(e), tn.add(e));
}
const nn = 30, Ii = (t) => !isNaN(parseFloat(t));
class Bi {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(e, n = {}) {
    this.version = "12.4.3", this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s, i = !0) => {
      const r = K.now();
      this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && this.events.change && this.events.change.notify(this.current), i && this.events.renderRequest && this.events.renderRequest.notify(this.current);
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = K.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Ii(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return process.env.NODE_ENV !== "production" && bt(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new jn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), F.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e, n = !0) {
    !n || !this.passiveEffect ? this.updateAndNotify(e, n) : this.passiveEffect(e, this.updateAndNotify);
  }
  setWithVelocity(e, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = K.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > nn)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, nn);
    return Dn(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Ae(t, e) {
  return new Bi(t, e);
}
function sn(t) {
  const e = [{}, {}];
  return t == null || t.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function Wn(t, e, n, s) {
  if (typeof e == "function") {
    const [i, r] = sn(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [i, r] = sn(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  return e;
}
function Ui(t, e, n) {
  const s = t.getProps();
  return Wn(s, e, s.custom, t);
}
function ki(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, Ae(n));
}
function Ki(t, e) {
  const n = Ui(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...r } = n || {};
  r = { ...r, ...s };
  for (const o in r) {
    const a = Ci(r[o]);
    ki(t, o, a);
  }
}
function Li(t) {
  return !!(P(t) && t.add);
}
function Hi(t, e) {
  const n = t.getValue("willChange");
  if (Li(n))
    return n.add(e);
}
const At = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), ji = "framerAppearId", Wi = "data-" + At(ji);
function zi(t) {
  return t.props[Wi];
}
function rn(t, e) {
  t.timeline = e, t.onfinish = null;
}
const Tt = (t) => Array.isArray(t) && typeof t[0] == "number", Gi = {
  linearEasing: void 0
};
function qi(t, e) {
  const n = /* @__PURE__ */ mt(t);
  return () => {
    var s;
    return (s = Gi[e]) !== null && s !== void 0 ? s : n();
  };
}
const Ue = /* @__PURE__ */ qi(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing");
function zn(t) {
  return !!(typeof t == "function" && Ue() || !t || typeof t == "string" && (t in st || Ue()) || Tt(t) || Array.isArray(t) && t.every(zn));
}
const he = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, st = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ he([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ he([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ he([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ he([0.33, 1.53, 0.69, 0.99])
};
function Gn(t, e) {
  if (t)
    return typeof t == "function" && Ue() ? On(t, e) : Tt(t) ? he(t) : Array.isArray(t) ? t.map((n) => Gn(n, e) || st.easeOut) : st[t];
}
const qn = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, Yi = 1e-7, Zi = 12;
function Xi(t, e, n, s, i) {
  let r, o, a = 0;
  do
    o = e + (n - e) / 2, r = qn(o, s, i) - t, r > 0 ? n = o : e = o;
  while (Math.abs(r) > Yi && ++a < Zi);
  return o;
}
function Ve(t, e, n, s) {
  if (t === e && n === s)
    return L;
  const i = (r) => Xi(r, 0, 1, t, n);
  return (r) => r === 0 || r === 1 ? r : qn(i(r), e, s);
}
const Yn = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, Zn = (t) => (e) => 1 - t(1 - e), Xn = /* @__PURE__ */ Ve(0.33, 1.53, 0.69, 0.99), St = /* @__PURE__ */ Zn(Xn), Jn = /* @__PURE__ */ Yn(St), Qn = (t) => (t *= 2) < 1 ? 0.5 * St(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), $t = (t) => 1 - Math.sin(Math.acos(t)), Ji = Zn($t), es = Yn($t), ts = (t) => /^0[^.\s]+$/u.test(t);
function Qi(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || ts(t) : !0;
}
const ie = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Te = {
  ...ie,
  transform: (t) => Z(0, 1, t)
}, Ce = {
  ...ie,
  default: 1
}, pe = (t) => Math.round(t * 1e5) / 1e5, wt = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function er(t) {
  return t == null;
}
const tr = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, xt = (t, e) => (n) => !!(typeof n == "string" && tr.test(n) && n.startsWith(t) || e && !er(n) && Object.prototype.hasOwnProperty.call(n, e)), ns = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, r, o, a] = s.match(wt);
  return {
    [t]: parseFloat(i),
    [e]: parseFloat(r),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, nr = (t) => Z(0, 255, t), Xe = {
  ...ie,
  transform: (t) => Math.round(nr(t))
}, z = {
  test: /* @__PURE__ */ xt("rgb", "red"),
  parse: /* @__PURE__ */ ns("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Xe.transform(t) + ", " + Xe.transform(e) + ", " + Xe.transform(n) + ", " + pe(Te.transform(s)) + ")"
};
function sr(t) {
  let e = "", n = "", s = "", i = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const it = {
  test: /* @__PURE__ */ xt("#"),
  parse: sr,
  transform: z.transform
}, _e = (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), B = /* @__PURE__ */ _e("deg"), Q = /* @__PURE__ */ _e("%"), m = /* @__PURE__ */ _e("px"), ir = /* @__PURE__ */ _e("vh"), rr = /* @__PURE__ */ _e("vw"), on = {
  ...Q,
  parse: (t) => Q.parse(t) / 100,
  transform: (t) => Q.transform(t * 100)
}, J = {
  test: /* @__PURE__ */ xt("hsl", "hue"),
  parse: /* @__PURE__ */ ns("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + Q.transform(pe(e)) + ", " + Q.transform(pe(n)) + ", " + pe(Te.transform(s)) + ")"
}, E = {
  test: (t) => z.test(t) || it.test(t) || J.test(t),
  parse: (t) => z.test(t) ? z.parse(t) : J.test(t) ? J.parse(t) : it.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? z.transform(t) : J.transform(t)
}, or = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function ar(t) {
  var e, n;
  return isNaN(t) && typeof t == "string" && (((e = t.match(wt)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match(or)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const ss = "number", is = "color", lr = "var", ur = "var(", an = "${}", cr = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Se(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let r = 0;
  const a = e.replace(cr, (l) => (E.test(l) ? (s.color.push(r), i.push(is), n.push(E.parse(l))) : l.startsWith(ur) ? (s.var.push(r), i.push(lr), n.push(l)) : (s.number.push(r), i.push(ss), n.push(parseFloat(l))), ++r, an)).split(an);
  return { values: n, split: a, indexes: s, types: i };
}
function rs(t) {
  return Se(t).values;
}
function os(t) {
  const { split: e, types: n } = Se(t), s = e.length;
  return (i) => {
    let r = "";
    for (let o = 0; o < s; o++)
      if (r += e[o], i[o] !== void 0) {
        const a = n[o];
        a === ss ? r += pe(i[o]) : a === is ? r += E.transform(i[o]) : r += i[o];
      }
    return r;
  };
}
const hr = (t) => typeof t == "number" ? 0 : t;
function dr(t) {
  const e = rs(t);
  return os(t)(e.map(hr));
}
const re = {
  test: ar,
  parse: rs,
  createTransformer: os,
  getAnimatableNone: dr
}, fr = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function pr(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(wt) || [];
  if (!s)
    return t;
  const i = n.replace(s, "");
  let r = fr.has(e) ? 1 : 0;
  return s !== n && (r *= 100), e + "(" + r + i + ")";
}
const mr = /\b([a-z-]*)\(.*?\)/gu, rt = {
  ...re,
  getAnimatableNone: (t) => {
    const e = t.match(mr);
    return e ? e.map(pr).join(" ") : t;
  }
}, gr = {
  // Border props
  borderWidth: m,
  borderTopWidth: m,
  borderRightWidth: m,
  borderBottomWidth: m,
  borderLeftWidth: m,
  borderRadius: m,
  radius: m,
  borderTopLeftRadius: m,
  borderTopRightRadius: m,
  borderBottomRightRadius: m,
  borderBottomLeftRadius: m,
  // Positioning props
  width: m,
  maxWidth: m,
  height: m,
  maxHeight: m,
  top: m,
  right: m,
  bottom: m,
  left: m,
  // Spacing props
  padding: m,
  paddingTop: m,
  paddingRight: m,
  paddingBottom: m,
  paddingLeft: m,
  margin: m,
  marginTop: m,
  marginRight: m,
  marginBottom: m,
  marginLeft: m,
  // Misc
  backgroundPositionX: m,
  backgroundPositionY: m
}, yr = {
  rotate: B,
  rotateX: B,
  rotateY: B,
  rotateZ: B,
  scale: Ce,
  scaleX: Ce,
  scaleY: Ce,
  scaleZ: Ce,
  skew: B,
  skewX: B,
  skewY: B,
  distance: m,
  translateX: m,
  translateY: m,
  translateZ: m,
  x: m,
  y: m,
  z: m,
  perspective: m,
  transformPerspective: m,
  opacity: Te,
  originX: on,
  originY: on,
  originZ: m
}, ln = {
  ...ie,
  transform: Math.round
}, Vt = {
  ...gr,
  ...yr,
  zIndex: ln,
  size: m,
  // SVG
  fillOpacity: Te,
  strokeOpacity: Te,
  numOctaves: ln
}, vr = {
  ...Vt,
  // Color props
  color: E,
  backgroundColor: E,
  outlineColor: E,
  fill: E,
  stroke: E,
  // Border props
  borderColor: E,
  borderTopColor: E,
  borderRightColor: E,
  borderBottomColor: E,
  borderLeftColor: E,
  filter: rt,
  WebkitFilter: rt
}, _t = (t) => vr[t];
function as(t, e) {
  let n = _t(t);
  return n !== rt && (n = re), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const br = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Ar(t, e, n) {
  let s = 0, i;
  for (; s < t.length && !i; ) {
    const r = t[s];
    typeof r == "string" && !br.has(r) && Se(r).values.length && (i = t[s]), s++;
  }
  if (i && n)
    for (const r of e)
      t[r] = as(n, i);
}
const un = (t) => t === ie || t === m, cn = (t, e) => parseFloat(t.split(", ")[e]), hn = (t, e) => (n, { transform: s }) => {
  if (s === "none" || !s)
    return 0;
  const i = s.match(/^matrix3d\((.+)\)$/u);
  if (i)
    return cn(i[1], e);
  {
    const r = s.match(/^matrix\((.+)\)$/u);
    return r ? cn(r[1], t) : 0;
  }
}, Tr = /* @__PURE__ */ new Set(["x", "y", "z"]), Sr = ne.filter((t) => !Tr.has(t));
function $r(t) {
  const e = [];
  return Sr.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const te = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: hn(4, 13),
  y: hn(5, 14)
};
te.translateX = te.x;
te.translateY = te.y;
const G = /* @__PURE__ */ new Set();
let ot = !1, at = !1;
function ls() {
  if (at) {
    const t = Array.from(G).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const i = $r(s);
      i.length && (n.set(s, i), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([r, o]) => {
        var a;
        (a = s.getValue(r)) === null || a === void 0 || a.set(o);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  at = !1, ot = !1, G.forEach((t) => t.complete()), G.clear();
}
function us() {
  G.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (at = !0);
  });
}
function wr() {
  us(), ls();
}
class Mt {
  constructor(e, n, s, i, r, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = i, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? (G.add(this), ot || (ot = !0, F.read(us), F.resolveKeyframes(ls))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: s, motionValue: i } = this;
    for (let r = 0; r < e.length; r++)
      if (e[r] === null)
        if (r === 0) {
          const o = i == null ? void 0 : i.get(), a = e[e.length - 1];
          if (o !== void 0)
            e[0] = o;
          else if (s && n) {
            const l = s.readValue(n, a);
            l != null && (e[0] = l);
          }
          e[0] === void 0 && (e[0] = a), i && o === void 0 && i.set(e[0]);
        } else
          e[r] = e[r - 1];
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete() {
    this.isComplete = !0, this.onComplete(this.unresolvedKeyframes, this.finalKeyframe), G.delete(this);
  }
  cancel() {
    this.isComplete || (this.isScheduled = !1, G.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const cs = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), hs = (t) => (e) => typeof e == "string" && e.startsWith(t), ds = /* @__PURE__ */ hs("--"), xr = /* @__PURE__ */ hs("var(--"), Et = (t) => xr(t) ? Vr.test(t.split("/*")[0].trim()) : !1, Vr = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, _r = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Mr(t) {
  const e = _r.exec(t);
  if (!e)
    return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
const Er = 4;
function fs(t, e, n = 1) {
  H(n <= Er, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`);
  const [s, i] = Mr(t);
  if (!s)
    return;
  const r = window.getComputedStyle(e).getPropertyValue(s);
  if (r) {
    const o = r.trim();
    return cs(o) ? parseFloat(o) : o;
  }
  return Et(i) ? fs(i, e, n + 1) : i;
}
const ps = (t) => (e) => e.test(t), Pr = {
  test: (t) => t === "auto",
  parse: (t) => t
}, ms = [ie, m, Q, B, rr, ir, Pr], dn = (t) => ms.find(ps(t));
class gs extends Mt {
  constructor(e, n, s, i, r) {
    super(e, n, s, i, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let c = e[l];
      if (typeof c == "string" && (c = c.trim(), Et(c))) {
        const u = fs(c, n.current);
        u !== void 0 && (e[l] = u), l === e.length - 1 && (this.finalKeyframe = c);
      }
    }
    if (this.resolveNoneKeyframes(), !Hn.has(s) || e.length !== 2)
      return;
    const [i, r] = e, o = dn(i), a = dn(r);
    if (o !== a)
      if (un(o) && un(a))
        for (let l = 0; l < e.length; l++) {
          const c = e[l];
          typeof c == "string" && (e[l] = parseFloat(c));
        }
      else
        this.needsMeasurement = !0;
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, s = [];
    for (let i = 0; i < e.length; i++)
      Qi(e[i]) && s.push(i);
    s.length && Ar(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = te[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    var e;
    const { element: n, name: s, unresolvedKeyframes: i } = this;
    if (!n || !n.current)
      return;
    const r = n.getValue(s);
    r && r.jump(this.measuredOrigin, !1);
    const o = i.length - 1, a = i[o];
    i[o] = te[s](n.measureViewportBox(), window.getComputedStyle(n.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), !((e = this.removedTransforms) === null || e === void 0) && e.length && this.removedTransforms.forEach(([l, c]) => {
      n.getValue(l).set(c);
    }), this.resolveNoneKeyframes();
  }
}
const fn = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(re.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Cr(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function Rr(t, e, n, s) {
  const i = t[0];
  if (i === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const r = t[t.length - 1], o = fn(i, e), a = fn(r, e);
  return we(o === a, `You are trying to animate ${e} from "${i}" to "${r}". ${i} is not an animatable value - to enable this animation set ${i} to a value animatable to ${r} via the \`style\` property.`), !o || !a ? !1 : Cr(t) || (n === "spring" || je(n)) && s;
}
const Or = (t) => t !== null;
function We(t, { repeat: e, repeatType: n = "loop" }, s) {
  const i = t.filter(Or), r = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
  return !r || s === void 0 ? i[r] : s;
}
const Dr = 40;
class ys {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: r = 0, repeatType: o = "loop", ...a }) {
    this.isStopped = !1, this.hasAttemptedResolve = !1, this.createdAt = K.now(), this.options = {
      autoplay: e,
      delay: n,
      type: s,
      repeat: i,
      repeatDelay: r,
      repeatType: o,
      ...a
    }, this.updateFinishedPromise();
  }
  /**
   * This method uses the createdAt and resolvedAt to calculate the
   * animation startTime. *Ideally*, we would use the createdAt time as t=0
   * as the following frame would then be the first frame of the animation in
   * progress, which would feel snappier.
   *
   * However, if there's a delay (main thread work) between the creation of
   * the animation and the first commited frame, we prefer to use resolvedAt
   * to avoid a sudden jump into the animation.
   */
  calcStartTime() {
    return this.resolvedAt ? this.resolvedAt - this.createdAt > Dr ? this.resolvedAt : this.createdAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && wr(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(e, n) {
    this.resolvedAt = K.now(), this.hasAttemptedResolve = !0;
    const { name: s, type: i, velocity: r, delay: o, onComplete: a, onUpdate: l, isGenerator: c } = this.options;
    if (!c && !Rr(e, s, i, r))
      if (o)
        this.options.duration = 0;
      else {
        l && l(We(e, this.options, n)), a && a(), this.resolveFinishedPromise();
        return;
      }
    const u = this.initPlayback(e, n);
    u !== !1 && (this._resolved = {
      keyframes: e,
      finalKeyframe: n,
      ...u
    }, this.onPostResolved());
  }
  onPostResolved() {
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.currentFinishedPromise.then(e, n);
  }
  flatten() {
    this.options.type = "keyframes", this.options.ease = "linear";
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((e) => {
      this.resolveFinishedPromise = e;
    });
  }
}
function Je(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Fr({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let i = 0, r = 0, o = 0;
  if (!e)
    i = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    i = Je(l, a, t + 1 / 3), r = Je(l, a, t), o = Je(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function ke(t, e) {
  return (n) => n > 0 ? e : t;
}
const Qe = (t, e, n) => {
  const s = t * t, i = n * (e * e - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, Nr = [it, z, J], Ir = (t) => Nr.find((e) => e.test(t));
function pn(t) {
  const e = Ir(t);
  if (we(!!e, `'${t}' is not an animatable color. Use the equivalent color code instead.`), !e)
    return !1;
  let n = e.parse(t);
  return e === J && (n = Fr(n)), n;
}
const mn = (t, e) => {
  const n = pn(t), s = pn(e);
  if (!n || !s)
    return ke(t, e);
  const i = { ...n };
  return (r) => (i.red = Qe(n.red, s.red, r), i.green = Qe(n.green, s.green, r), i.blue = Qe(n.blue, s.blue, r), i.alpha = xe(n.alpha, s.alpha, r), z.transform(i));
}, Br = (t, e) => (n) => e(t(n)), Pt = (...t) => t.reduce(Br), lt = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ur(t, e) {
  return lt.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function kr(t, e) {
  return (n) => xe(t, e, n);
}
function Ct(t) {
  return typeof t == "number" ? kr : typeof t == "string" ? Et(t) ? ke : E.test(t) ? mn : Hr : Array.isArray(t) ? vs : typeof t == "object" ? E.test(t) ? mn : Kr : ke;
}
function vs(t, e) {
  const n = [...t], s = n.length, i = t.map((r, o) => Ct(r)(r, e[o]));
  return (r) => {
    for (let o = 0; o < s; o++)
      n[o] = i[o](r);
    return n;
  };
}
function Kr(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = Ct(t[i])(t[i], e[i]));
  return (i) => {
    for (const r in s)
      n[r] = s[r](i);
    return n;
  };
}
function Lr(t, e) {
  var n;
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const o = e.types[r], a = t.indexes[o][i[o]], l = (n = t.values[a]) !== null && n !== void 0 ? n : 0;
    s[r] = l, i[o]++;
  }
  return s;
}
const Hr = (t, e) => {
  const n = re.createTransformer(e), s = Se(t), i = Se(e);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? lt.has(t) && !i.values.length || lt.has(e) && !s.values.length ? Ur(t, e) : Pt(vs(Lr(s, i), i.values), n) : (we(!0, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`), ke(t, e));
};
function bs(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? xe(t, e, n) : Ct(t)(t, e);
}
function gn({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: c = 0.5, restSpeed: u }) {
  const h = t[0], d = {
    done: !1,
    value: h
  }, f = (v) => a !== void 0 && v < a || l !== void 0 && v > l, p = (v) => a === void 0 ? l : l === void 0 || Math.abs(a - v) < Math.abs(l - v) ? a : l;
  let b = n * e;
  const A = h + b, g = o === void 0 ? A : o(A);
  g !== A && (b = g - h);
  const T = (v) => -b * Math.exp(-v / s), V = (v) => g + T(v), x = (v) => {
    const $ = T(v), C = V(v);
    d.done = Math.abs($) <= c, d.value = d.done ? g : C;
  };
  let y, S;
  const _ = (v) => {
    f(d.value) && (y = v, S = yt({
      keyframes: [d.value, p(d.value)],
      velocity: Fn(V, v, d.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: r,
      restDelta: c,
      restSpeed: u
    }));
  };
  return _(0), {
    calculatedDuration: null,
    next: (v) => {
      let $ = !1;
      return !S && y === void 0 && ($ = !0, x(v), _(v)), y !== void 0 && v >= y ? S.next(v - y) : (!$ && x(v), d);
    }
  };
}
const jr = /* @__PURE__ */ Ve(0.42, 0, 1, 1), Wr = /* @__PURE__ */ Ve(0, 0, 0.58, 1), As = /* @__PURE__ */ Ve(0.42, 0, 0.58, 1), yn = {
  linear: L,
  easeIn: jr,
  easeInOut: As,
  easeOut: Wr,
  circIn: $t,
  circInOut: es,
  circOut: Ji,
  backIn: St,
  backInOut: Jn,
  backOut: Xn,
  anticipate: Qn
}, vn = (t) => {
  if (Tt(t)) {
    H(t.length === 4, "Cubic bezier arrays must contain four numerical values.");
    const [e, n, s, i] = t;
    return Ve(e, n, s, i);
  } else if (typeof t == "string")
    return H(yn[t] !== void 0, `Invalid easing type '${t}'`), yn[t];
  return t;
};
function zr(t, e, n) {
  const s = [], i = n || bs, r = t.length - 1;
  for (let o = 0; o < r; o++) {
    let a = i(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || L : e;
      a = Pt(l, a);
    }
    s.push(a);
  }
  return s;
}
function Gr(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const r = t.length;
  if (H(r === e.length, "Both input and output ranges must be the same length"), r === 1)
    return () => e[0];
  if (r === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = zr(e, s, i), l = a.length, c = (u) => {
    if (o && u < t[0])
      return e[0];
    let h = 0;
    if (l > 1)
      for (; h < t.length - 2 && !(u < t[h + 1]); h++)
        ;
    const d = /* @__PURE__ */ He(t[h], t[h + 1], u);
    return a[h](d);
  };
  return n ? (u) => c(Z(t[0], t[r - 1], u)) : c;
}
function qr(t, e) {
  return t.map((n) => n * e);
}
function Yr(t, e) {
  return t.map(() => e || As).splice(0, t.length - 1);
}
function me({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const i = Nn(s) ? s.map(vn) : vn(s), r = {
    done: !1,
    value: e[0]
  }, o = qr(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : Un(e),
    t
  ), a = Gr(o, e, {
    ease: Array.isArray(i) ? i : Yr(e, i)
  });
  return {
    calculatedDuration: t,
    next: (l) => (r.value = a(l), r.done = l >= t, r)
  };
}
const Zr = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: () => F.update(e, !0),
    stop: () => nt(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Be.isProcessing ? Be.timestamp : K.now()
  };
}, Xr = {
  decay: gn,
  inertia: gn,
  tween: me,
  keyframes: me,
  spring: yt
}, Jr = (t) => t / 100;
class Rt extends ys {
  constructor(e) {
    super(e), this.holdTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this.pendingPlayState = "running", this.startTime = null, this.state = "idle", this.stop = () => {
      if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
        return;
      this.teardown();
      const { onStop: l } = this.options;
      l && l();
    };
    const { name: n, motionValue: s, element: i, keyframes: r } = this.options, o = (i == null ? void 0 : i.KeyframeResolver) || Mt, a = (l, c) => this.onKeyframesResolved(l, c);
    this.resolver = new o(r, a, n, s, i), this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(), this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
  }
  initPlayback(e) {
    const { type: n = "keyframes", repeat: s = 0, repeatDelay: i = 0, repeatType: r, velocity: o = 0 } = this.options, a = je(n) ? n : Xr[n] || me;
    let l, c;
    process.env.NODE_ENV !== "production" && a !== me && H(e.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${e}`), a !== me && typeof e[0] != "number" && (l = Pt(Jr, bs(e[0], e[1])), e = [0, 100]);
    const u = a({ ...this.options, keyframes: e });
    r === "mirror" && (c = a({
      ...this.options,
      keyframes: [...e].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = gt(u));
    const { calculatedDuration: h } = u, d = h + i, f = d * (s + 1) - i;
    return {
      generator: u,
      mirroredGenerator: c,
      mapPercentToKeyframes: l,
      calculatedDuration: h,
      resolvedDuration: d,
      totalDuration: f
    };
  }
  onPostResolved() {
    const { autoplay: e = !0 } = this.options;
    this.play(), this.pendingPlayState === "paused" || !e ? this.pause() : this.state = this.pendingPlayState;
  }
  tick(e, n = !1) {
    const { resolved: s } = this;
    if (!s) {
      const { keyframes: v } = this.options;
      return { done: !0, value: v[v.length - 1] };
    }
    const { finalKeyframe: i, generator: r, mirroredGenerator: o, mapPercentToKeyframes: a, keyframes: l, calculatedDuration: c, totalDuration: u, resolvedDuration: h } = s;
    if (this.startTime === null)
      return r.next(0);
    const { delay: d, repeat: f, repeatType: p, repeatDelay: b, onUpdate: A } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - u / this.speed, this.startTime)), n ? this.currentTime = e : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(e - this.startTime) * this.speed;
    const g = this.currentTime - d * (this.speed >= 0 ? 1 : -1), T = this.speed >= 0 ? g < 0 : g > u;
    this.currentTime = Math.max(g, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = u);
    let V = this.currentTime, x = r;
    if (f) {
      const v = Math.min(this.currentTime, u) / h;
      let $ = Math.floor(v), C = v % 1;
      !C && v >= 1 && (C = 1), C === 1 && $--, $ = Math.min($, f + 1), !!($ % 2) && (p === "reverse" ? (C = 1 - C, b && (C -= b / h)) : p === "mirror" && (x = o)), V = Z(0, 1, C) * h;
    }
    const y = T ? { done: !1, value: l[0] } : x.next(V);
    a && (y.value = a(y.value));
    let { done: S } = y;
    !T && c !== null && (S = this.speed >= 0 ? this.currentTime >= u : this.currentTime <= 0);
    const _ = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
    return _ && i !== void 0 && (y.value = We(l, this.options, i)), A && A(y.value), _ && this.finish(), y;
  }
  get duration() {
    const { resolved: e } = this;
    return e ? /* @__PURE__ */ N(e.calculatedDuration) : 0;
  }
  get time() {
    return /* @__PURE__ */ N(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ D(e), this.currentTime = e, this.holdTime !== null || this.speed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ N(this.currentTime));
  }
  play() {
    if (this.resolver.isScheduled || this.resolver.resume(), !this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped)
      return;
    const { driver: e = Zr, onPlay: n, startTime: s } = this.options;
    this.driver || (this.driver = e((r) => this.tick(r))), n && n();
    const i = this.driver.now();
    this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime ? this.state === "finished" && (this.startTime = i) : this.startTime = s ?? this.calcStartTime(), this.state === "finished" && this.updateFinishedPromise(), this.cancelTime = this.startTime, this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    var e;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    this.state = "paused", this.holdTime = (e = this.currentTime) !== null && e !== void 0 ? e : 0;
  }
  complete() {
    this.state !== "running" && this.play(), this.pendingPlayState = this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.teardown(), this.state = "finished";
    const { onComplete: e } = this.options;
    e && e();
  }
  cancel() {
    this.cancelTime !== null && this.tick(this.cancelTime), this.teardown(), this.updateFinishedPromise();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.resolveFinishedPromise(), this.updateFinishedPromise(), this.startTime = this.cancelTime = null, this.resolver.cancel();
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
}
const Qr = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function eo(t, e, n, { delay: s = 0, duration: i = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeInOut", times: l } = {}) {
  const c = { [e]: n };
  l && (c.offset = l);
  const u = Gn(a, i);
  return Array.isArray(u) && (c.easing = u), t.animate(c, {
    delay: s,
    duration: i,
    easing: Array.isArray(u) ? "linear" : u,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  });
}
const to = /* @__PURE__ */ mt(() => Object.hasOwnProperty.call(Element.prototype, "animate")), Ke = 10, no = 2e4;
function so(t) {
  return je(t.type) || t.type === "spring" || !zn(t.ease);
}
function io(t, e) {
  const n = new Rt({
    ...e,
    keyframes: t,
    repeat: 0,
    delay: 0,
    isGenerator: !0
  });
  let s = { done: !1, value: t[0] };
  const i = [];
  let r = 0;
  for (; !s.done && r < no; )
    s = n.sample(r), i.push(s.value), r += Ke;
  return {
    times: void 0,
    keyframes: i,
    duration: r - Ke,
    ease: "linear"
  };
}
const Ts = {
  anticipate: Qn,
  backInOut: Jn,
  circInOut: es
};
function ro(t) {
  return t in Ts;
}
class bn extends ys {
  constructor(e) {
    super(e);
    const { name: n, motionValue: s, element: i, keyframes: r } = this.options;
    this.resolver = new gs(r, (o, a) => this.onKeyframesResolved(o, a), n, s, i), this.resolver.scheduleResolve();
  }
  initPlayback(e, n) {
    let { duration: s = 300, times: i, ease: r, type: o, motionValue: a, name: l, startTime: c } = this.options;
    if (!a.owner || !a.owner.current)
      return !1;
    if (typeof r == "string" && Ue() && ro(r) && (r = Ts[r]), so(this.options)) {
      const { onComplete: h, onUpdate: d, motionValue: f, element: p, ...b } = this.options, A = io(e, b);
      e = A.keyframes, e.length === 1 && (e[1] = e[0]), s = A.duration, i = A.times, r = A.ease, o = "keyframes";
    }
    const u = eo(a.owner.current, l, e, { ...this.options, duration: s, times: i, ease: r });
    return u.startTime = c ?? this.calcStartTime(), this.pendingTimeline ? (rn(u, this.pendingTimeline), this.pendingTimeline = void 0) : u.onfinish = () => {
      const { onComplete: h } = this.options;
      a.set(We(e, this.options, n)), h && h(), this.cancel(), this.resolveFinishedPromise();
    }, {
      animation: u,
      duration: s,
      times: i,
      type: o,
      ease: r,
      keyframes: e
    };
  }
  get duration() {
    const { resolved: e } = this;
    if (!e)
      return 0;
    const { duration: n } = e;
    return /* @__PURE__ */ N(n);
  }
  get time() {
    const { resolved: e } = this;
    if (!e)
      return 0;
    const { animation: n } = e;
    return /* @__PURE__ */ N(n.currentTime || 0);
  }
  set time(e) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: s } = n;
    s.currentTime = /* @__PURE__ */ D(e);
  }
  get speed() {
    const { resolved: e } = this;
    if (!e)
      return 1;
    const { animation: n } = e;
    return n.playbackRate;
  }
  set speed(e) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: s } = n;
    s.playbackRate = e;
  }
  get state() {
    const { resolved: e } = this;
    if (!e)
      return "idle";
    const { animation: n } = e;
    return n.playState;
  }
  get startTime() {
    const { resolved: e } = this;
    if (!e)
      return null;
    const { animation: n } = e;
    return n.startTime;
  }
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(e) {
    if (!this._resolved)
      this.pendingTimeline = e;
    else {
      const { resolved: n } = this;
      if (!n)
        return L;
      const { animation: s } = n;
      rn(s, e);
    }
    return L;
  }
  play() {
    if (this.isStopped)
      return;
    const { resolved: e } = this;
    if (!e)
      return;
    const { animation: n } = e;
    n.playState === "finished" && this.updateFinishedPromise(), n.play();
  }
  pause() {
    const { resolved: e } = this;
    if (!e)
      return;
    const { animation: n } = e;
    n.pause();
  }
  stop() {
    if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
      return;
    this.resolveFinishedPromise(), this.updateFinishedPromise();
    const { resolved: e } = this;
    if (!e)
      return;
    const { animation: n, keyframes: s, duration: i, type: r, ease: o, times: a } = e;
    if (n.playState === "idle" || n.playState === "finished")
      return;
    if (this.time) {
      const { motionValue: c, onUpdate: u, onComplete: h, element: d, ...f } = this.options, p = new Rt({
        ...f,
        keyframes: s,
        duration: i,
        type: r,
        ease: o,
        times: a,
        isGenerator: !0
      }), b = /* @__PURE__ */ D(this.time);
      c.setWithVelocity(p.sample(b - Ke).value, p.sample(b).value, Ke);
    }
    const { onStop: l } = this.options;
    l && l(), this.cancel();
  }
  complete() {
    const { resolved: e } = this;
    e && e.animation.finish();
  }
  cancel() {
    const { resolved: e } = this;
    e && e.animation.cancel();
  }
  static supports(e) {
    const { motionValue: n, name: s, repeatDelay: i, repeatType: r, damping: o, type: a } = e;
    if (!n || !n.owner || !(n.owner.current instanceof HTMLElement))
      return !1;
    const { onUpdate: l, transformTemplate: c } = n.owner.getProps();
    return to() && s && Qr.has(s) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !l && !c && !i && r !== "mirror" && o !== 0 && a !== "inertia";
  }
}
const oo = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, ao = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), lo = {
  type: "keyframes",
  duration: 0.8
}, uo = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, co = (t, { keyframes: e }) => e.length > 2 ? lo : se.has(t) ? t.startsWith("scale") ? ao(e[1]) : oo : uo;
function ho({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: r, repeatType: o, repeatDelay: a, from: l, elapsed: c, ...u }) {
  return !!Object.keys(u).length;
}
const Ss = (t, e, n, s = {}, i, r) => (o) => {
  const a = Ln(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: c = 0 } = s;
  c = c - /* @__PURE__ */ D(l);
  let u = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -c,
    onUpdate: (d) => {
      e.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: r ? void 0 : i
  };
  ho(a) || (u = {
    ...u,
    ...co(t, u)
  }), u.duration && (u.duration = /* @__PURE__ */ D(u.duration)), u.repeatDelay && (u.repeatDelay = /* @__PURE__ */ D(u.repeatDelay)), u.from !== void 0 && (u.keyframes[0] = u.from);
  let h = !1;
  if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (u.duration = 0, u.delay === 0 && (h = !0)), h && !r && e.get() !== void 0) {
    const d = We(u.keyframes, a);
    if (d !== void 0)
      return F.update(() => {
        u.onUpdate(d), u.onComplete();
      }), new Rn([]);
  }
  return !r && bn.supports(u) ? new bn(u) : new Rt(u);
};
function fo({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function po(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  var r;
  let { transition: o = t.getDefaultTransition(), transitionEnd: a, ...l } = e;
  s && (o = s);
  const c = [], u = i && t.animationState && t.animationState.getState()[i];
  for (const h in l) {
    const d = t.getValue(h, (r = t.latestValues[h]) !== null && r !== void 0 ? r : null), f = l[h];
    if (f === void 0 || u && fo(u, h))
      continue;
    const p = {
      delay: n,
      ...Ln(o || {}, h)
    };
    let b = !1;
    if (window.MotionHandoffAnimation) {
      const g = zi(t);
      if (g) {
        const T = window.MotionHandoffAnimation(g, h, F);
        T !== null && (p.startTime = T, b = !0);
      }
    }
    Hi(t, h), d.start(Ss(h, d, f, t.shouldReduceMotion && Hn.has(h) ? { type: !1 } : p, t, b));
    const A = d.animation;
    A && c.push(A);
  }
  return a && Promise.all(c).then(() => {
    F.update(() => {
      a && Ki(t, a);
    });
  }), c;
}
function mo(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
const An = () => ({ min: 0, max: 0 }), Ot = () => ({
  x: An(),
  y: An()
}), Tn = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, ut = {};
for (const t in Tn)
  ut[t] = {
    isEnabled: (e) => Tn[t].some((n) => !!e[n])
  };
const go = typeof window < "u", ct = { current: null }, $s = { current: !1 };
function yo() {
  if ($s.current = !0, !!go)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => ct.current = t.matches;
      t.addListener(e), e();
    } else
      ct.current = !1;
}
const vo = [...ms, E, re], bo = (t) => vo.find(ps(t));
function Ao(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function To(t) {
  return typeof t == "string" || Array.isArray(t);
}
const So = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], $o = ["initial", ...So];
function ws(t) {
  return Ao(t.animate) || $o.some((e) => To(t[e]));
}
function wo(t) {
  return !!(ws(t) || t.variants);
}
function xo(t, e, n) {
  for (const s in e) {
    const i = e[s], r = n[s];
    if (P(i))
      t.addValue(s, i), process.env.NODE_ENV === "development" && bt(i.version === "12.4.3", `Attempting to mix Motion versions ${i.version} with 12.4.3 may not work as expected.`);
    else if (P(r))
      t.addValue(s, Ae(i, { owner: t }));
    else if (r !== i)
      if (t.hasValue(s)) {
        const o = t.getValue(s);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i);
      } else {
        const o = t.getStaticValue(s);
        t.addValue(s, Ae(o !== void 0 ? o : i, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const Sn = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class xs {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, s) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: i, blockInitialAnimation: r, visualState: o }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Mt, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const f = K.now();
      this.renderScheduledAt < f && (this.renderScheduledAt = f, F.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: c, onUpdate: u } = o;
    this.onUpdate = u, this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = c, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = ws(n), this.isVariantNode = wo(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: h, ...d } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const f in d) {
      const p = d[f];
      l[f] !== void 0 && P(p) && p.set(l[f], !1);
    }
  }
  mount(e) {
    this.current = e, be.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), $s.current || yo(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : ct.current, process.env.NODE_ENV !== "production" && bt(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected."), this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), nt(this.notifyUpdate), nt(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  bindToMotionValue(e, n) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const s = se.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (a) => {
      this.latestValues[e] = a, this.props.onUpdate && F.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0);
    }), r = n.on("renderRequest", this.scheduleRender);
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      i(), r(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in ut) {
      const n = ut[e];
      if (!n)
        continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[e] && i && s(this.props) && (this.features[e] = new i(this)), this.features[e]) {
        const r = this.features[e];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Ot();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < Sn.length; s++) {
      const i = Sn[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const r = "on" + i, o = e[r];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    this.prevMotionValues = xo(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue(), this.onUpdate && this.onUpdate(this);
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const s = this.values.get(e);
    n !== s && (s && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let s = this.values.get(e);
    return s === void 0 && n !== void 0 && (s = Ae(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    var s;
    let i = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : (s = this.getBaseTargetFromProps(this.props, e)) !== null && s !== void 0 ? s : this.readValueFromInstance(this.current, e, this.options);
    return i != null && (typeof i == "string" && (cs(i) || ts(i)) ? i = parseFloat(i) : !bo(i) && re.test(n) && (i = as(e, n)), this.setBaseTarget(e, P(i) ? i.get() : i)), P(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    var n;
    const { initial: s } = this.props;
    let i;
    if (typeof s == "string" || typeof s == "object") {
      const o = Wn(this.props, s, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom);
      o && (i = o[e]);
    }
    if (s && i !== void 0)
      return i;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !P(r) ? r : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new jn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class Vs extends xs {
  constructor() {
    super(...arguments), this.KeyframeResolver = gs;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    delete n[e], delete s[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    P(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
const _s = (t, e) => e && typeof t == "number" ? e.transform(t) : t, Vo = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, _o = ne.length;
function Mo(t, e, n) {
  let s = "", i = !0;
  for (let r = 0; r < _o; r++) {
    const o = ne[r], a = t[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const c = _s(a, Vt[o]);
      if (!l) {
        i = !1;
        const u = Vo[o] || o;
        s += `${u}(${c}) `;
      }
      n && (e[o] = c);
    }
  }
  return s = s.trim(), n ? s = n(e, i ? "" : s) : i && (s = "none"), s;
}
function Ms(t, e, n) {
  const { style: s, vars: i, transformOrigin: r } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const c = e[l];
    if (se.has(l)) {
      o = !0;
      continue;
    } else if (ds(l)) {
      i[l] = c;
      continue;
    } else {
      const u = _s(c, Vt[l]);
      l.startsWith("origin") ? (a = !0, r[l] = u) : s[l] = u;
    }
  }
  if (e.transform || (o || n ? s.transform = Mo(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: c = "50%", originZ: u = 0 } = r;
    s.transformOrigin = `${l} ${c} ${u}`;
  }
}
const Eo = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Po = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Co(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const r = i ? Eo : Po;
  t[r.offset] = m.transform(-s);
  const o = m.transform(e), a = m.transform(n);
  t[r.array] = `${o} ${a}`;
}
function $n(t, e, n) {
  return typeof t == "string" ? t : m.transform(e + n * t);
}
function Ro(t, e, n) {
  const s = $n(e, t.x, t.width), i = $n(n, t.y, t.height);
  return `${s} ${i}`;
}
function Oo(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  originX: i,
  originY: r,
  pathLength: o,
  pathSpacing: a = 1,
  pathOffset: l = 0,
  // This is object creation, which we try to avoid per-frame.
  ...c
}, u, h) {
  if (Ms(t, c, h), u) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: d, style: f, dimensions: p } = t;
  d.transform && (p && (f.transform = d.transform), delete d.transform), p && (i !== void 0 || r !== void 0 || f.transform) && (f.transformOrigin = Ro(p, i !== void 0 ? i : 0.5, r !== void 0 ? r : 0.5)), e !== void 0 && (d.x = e), n !== void 0 && (d.y = n), s !== void 0 && (d.scale = s), o !== void 0 && Co(d, o, a, l, !1);
}
const Es = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), Do = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Fo(t, e) {
  try {
    e.dimensions = typeof t.getBBox == "function" ? t.getBBox() : t.getBoundingClientRect();
  } catch {
    e.dimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
}
function Ps(t, { style: e, vars: n }, s, i) {
  Object.assign(t.style, e, i && i.getProjectionStyles(s));
  for (const r in n)
    t.style.setProperty(r, n[r]);
}
function No(t, e, n, s) {
  Ps(t, e, void 0, s);
  for (const i in e.attrs)
    t.setAttribute(Es.has(i) ? i : At(i), e.attrs[i]);
}
const Io = {};
function Bo(t, { layout: e, layoutId: n }) {
  return se.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!Io[t] || t === "opacity");
}
function Cs(t, e, n) {
  var s;
  const { style: i } = t, r = {};
  for (const o in i)
    (P(i[o]) || e.style && P(e.style[o]) || Bo(o, t) || ((s = n == null ? void 0 : n.getValue(o)) === null || s === void 0 ? void 0 : s.liveStyle) !== void 0) && (r[o] = i[o]);
  return r;
}
function Uo(t, e, n) {
  const s = Cs(t, e, n);
  for (const i in t)
    if (P(t[i]) || P(e[i])) {
      const r = ne.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[r] = t[i];
    }
  return s;
}
class ko extends Vs {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Ot, this.updateDimensions = () => {
      this.current && !this.renderState.dimensions && Fo(this.current, this.renderState);
    };
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (se.has(n)) {
      const s = _t(n);
      return s && s.default || 0;
    }
    return n = Es.has(n) ? n : At(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Uo(e, n, s);
  }
  onBindTransform() {
    this.current && !this.renderState.dimensions && F.postRender(this.updateDimensions);
  }
  build(e, n, s) {
    Oo(e, n, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(e, n, s, i) {
    No(e, n, s, i);
  }
  mount(e) {
    this.isSVGTag = Do(e.tagName), super.mount(e);
  }
}
function Ko({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function Lo(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), s = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function Ho(t, e) {
  return Ko(Lo(t.getBoundingClientRect(), e));
}
function jo(t) {
  return window.getComputedStyle(t);
}
class Wo extends Vs {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Ps;
  }
  readValueFromInstance(e, n) {
    if (se.has(n)) {
      const s = _t(n);
      return s && s.default || 0;
    } else {
      const s = jo(e), i = (ds(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return Ho(e, n);
  }
  build(e, n, s) {
    Ms(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Cs(e, n, s);
  }
}
function zo(t, e) {
  return t in e;
}
class Go extends xs {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(e, n) {
    if (zo(n, e)) {
      const s = e[n];
      if (typeof s == "string" || typeof s == "number")
        return s;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(e, n) {
    delete n.output[e];
  }
  measureInstanceViewportBox() {
    return Ot();
  }
  build(e, n) {
    Object.assign(e.output, n);
  }
  renderInstance(e, { output: n }) {
    Object.assign(e, n);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
function qo(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  }, n = mo(t) ? new ko(e) : new Wo(e);
  n.mount(t), be.set(t, n);
}
function Yo(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new Go(e);
  n.mount(t), be.set(t, n);
}
function Zo(t, e, n) {
  const s = P(t) ? t : Ae(t);
  return s.start(Ss("", s, e, n)), s.animation;
}
function Xo(t, e) {
  return P(t) || typeof t == "number" || typeof t == "string" && !vt(e);
}
function Rs(t, e, n, s) {
  const i = [];
  if (Xo(t, e))
    i.push(Zo(t, vt(e) && e.default || e, n && (n.default || n)));
  else {
    const r = kn(t, e, s), o = r.length;
    H(!!o, "No valid elements provided.");
    for (let a = 0; a < o; a++) {
      const l = r[a], c = l instanceof Element ? qo : Yo;
      be.has(l) || c(l);
      const u = be.get(l), h = { ...n };
      "delay" in h && typeof h.delay == "function" && (h.delay = h.delay(a, o)), i.push(...po(u, { ...e, transition: h }, {}));
    }
  }
  return i;
}
function Jo(t, e, n) {
  const s = [];
  return xi(t, e, n, { spring: yt }).forEach(({ keyframes: r, transition: o }, a) => {
    s.push(...Rs(a, r, o));
  }), s;
}
function Qo(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function ea(t) {
  function e(n, s, i) {
    let r = [];
    return Qo(n) ? r = Jo(n, s, t) : r = Rs(n, s, i, t), new Rn(r);
  }
  return e;
}
const fa = ea(), ta = {
  some: 0,
  all: 1
};
function pa(t, e, { root: n, margin: s, amount: i = "some" } = {}) {
  const r = Cn(t), o = /* @__PURE__ */ new WeakMap(), a = (c) => {
    c.forEach((u) => {
      const h = o.get(u.target);
      if (u.isIntersecting !== !!h)
        if (u.isIntersecting) {
          const d = e(u.target, u);
          typeof d == "function" ? o.set(u.target, d) : l.unobserve(u.target);
        } else typeof h == "function" && (h(u), o.delete(u.target));
    });
  }, l = new IntersectionObserver(a, {
    root: n,
    rootMargin: s,
    threshold: typeof i == "number" ? i : ta[i]
  });
  return r.forEach((c) => l.observe(c)), () => l.disconnect();
}
export {
  la as a,
  ha as b,
  ca as c,
  pa as d,
  ua as e,
  fa as f,
  Oe as h,
  ra as i,
  oa as k,
  ti as n,
  Ds as r,
  aa as t
};
