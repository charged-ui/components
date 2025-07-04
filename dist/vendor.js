/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, Q = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = Symbol(), Y = /* @__PURE__ */ new WeakMap();
let dt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Q && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Y.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Y.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Rt = (s) => new dt(typeof s == "string" ? s : s + "", void 0, K), re = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[o + 1], s[0]);
  return new dt(e, s, K);
}, Tt = (s, t) => {
  if (Q) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = O.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, J = Q ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Rt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: zt, defineProperty: Ot, getOwnPropertyDescriptor: Ht, getOwnPropertyNames: Nt, getOwnPropertySymbols: kt, getPrototypeOf: Bt } = Object, v = globalThis, X = v.trustedTypes, Dt = X ? X.emptyScript : "", D = v.reactiveElementPolyfillSupport, P = (s, t) => s, N = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Dt : null;
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
} }, q = (s, t) => !zt(s, t), W = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: q };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class E extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = W) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Ot(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = Ht(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? W;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = Bt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, i = [...Nt(e), ...kt(e)];
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
      for (const r of i) e.unshift(J(r));
    } else t !== void 0 && e.push(J(t));
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
    return Tt(t, this.constructor.elementStyles), t;
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
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : N).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), h = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : N;
      this._$Em = r, this[r] = h.fromAttribute(e, n.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? q)(this[t], e)) return;
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
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[P("elementProperties")] = /* @__PURE__ */ new Map(), E[P("finalized")] = /* @__PURE__ */ new Map(), D == null || D({ ReactiveElement: E }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis, k = C.trustedTypes, Z = k ? k.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, ft = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, pt = "?" + m, jt = `<${pt}>`, b = document, M = () => b.createComment(""), U = (s) => s === null || typeof s != "object" && typeof s != "function", G = Array.isArray, It = (s) => G(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", j = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tt = /-->/g, et = />/g, A = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), it = /'/g, st = /"/g, gt = /^(?:script|style|textarea|title)$/i, Lt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), oe = Lt(1), _ = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), rt = /* @__PURE__ */ new WeakMap(), $ = b.createTreeWalker(b, 129);
function mt(s, t) {
  if (!G(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Z !== void 0 ? Z.createHTML(t) : t;
}
const Ft = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = w;
  for (let h = 0; h < e; h++) {
    const a = s[h];
    let l, u, c = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, u = n.exec(a), u !== null); ) f = n.lastIndex, n === w ? u[1] === "!--" ? n = tt : u[1] !== void 0 ? n = et : u[2] !== void 0 ? (gt.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = A) : u[3] !== void 0 && (n = A) : n === A ? u[0] === ">" ? (n = r ?? w, c = -1) : u[1] === void 0 ? c = -2 : (c = n.lastIndex - u[2].length, l = u[1], n = u[3] === void 0 ? A : u[3] === '"' ? st : it) : n === st || n === it ? n = A : n === tt || n === et ? n = w : (n = A, r = void 0);
    const g = n === A && s[h + 1].startsWith("/>") ? " " : "";
    o += n === w ? a + jt : c >= 0 ? (i.push(l), a.slice(0, c) + ft + a.slice(c) + m + g) : a + m + (c === -2 ? h : g);
  }
  return [mt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class R {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [l, u] = Ft(t, e);
    if (this.el = R.createElement(l, i), $.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = $.nextNode()) !== null && a.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(ft)) {
          const f = u[n++], g = r.getAttribute(c).split(m), z = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: z[2], strings: g, ctor: z[1] === "." ? Qt : z[1] === "?" ? Kt : z[1] === "@" ? qt : B }), r.removeAttribute(c);
        } else c.startsWith(m) && (a.push({ type: 6, index: o }), r.removeAttribute(c));
        if (gt.test(r.tagName)) {
          const c = r.textContent.split(m), f = c.length - 1;
          if (f > 0) {
            r.textContent = k ? k.emptyScript : "";
            for (let g = 0; g < f; g++) r.append(c[g], M()), $.nextNode(), a.push({ type: 2, index: ++o });
            r.append(c[f], M());
          }
        }
      } else if (r.nodeType === 8) if (r.data === pt) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(m, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += m.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = b.createElement("template");
    return i.innerHTML = t, i;
  }
}
function x(s, t, e = s, i) {
  var n, h;
  if (t === _) return t;
  let r = i !== void 0 ? (n = e.o) == null ? void 0 : n[i] : e.l;
  const o = U(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((h = r == null ? void 0 : r._$AO) == null || h.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e.o ?? (e.o = []))[i] = r : e.l = r), r !== void 0 && (t = x(s, r._$AS(s, t.values), r, i)), t;
}
class Vt {
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
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? b).importNode(e, !0);
    $.currentNode = r;
    let o = $.nextNode(), n = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let l;
        a.type === 2 ? l = new T(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new Gt(o, this, t)), this._$AV.push(l), a = i[++h];
      }
      n !== (a == null ? void 0 : a.index) && (o = $.nextNode(), n++);
    }
    return $.currentNode = b, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this.v;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this.v = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = x(this, t, e), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== _ && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : It(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = R.createElement(mt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new Vt(r, this), h = n.u(this.options);
      n.p(e), this.T(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = rt.get(t.strings);
    return e === void 0 && rt.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    G(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new T(this.O(M()), this.O(M()), this, this.options)) : i = e[r], i._$AI(o), r++;
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
}
let B = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = x(this, t, e, 0), n = !U(t) || t !== this._$AH && t !== _, n && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++) l = x(this, h[i + a], e, a), l === _ && (l = this._$AH[a]), n || (n = !U(l) || l !== this._$AH[a]), l === d ? t = d : t !== d && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
};
class Qt extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Kt extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class qt extends B {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? d) === _) return;
    const i = this._$AH, r = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== d && (i === d || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Gt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const I = C.litHtmlPolyfillSupport;
I == null || I(R, T), (C.litHtmlVersions ?? (C.litHtmlVersions = [])).push("3.2.0");
const Yt = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new T(t.insertBefore(M(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class H extends E {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this.o = Yt(e, this.renderRoot, this.renderOptions);
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
    return _;
  }
}
var ut;
H._$litElement$ = !0, H.finalized = !0, (ut = globalThis.litElementHydrateSupport) == null || ut.call(globalThis, { LitElement: H });
const L = globalThis.litElementPolyfillSupport;
L == null || L({ LitElement: H });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: q }, Xt = (s = Jt, t, e) => {
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
function Wt(s) {
  return (t, e) => typeof e == "object" ? Xt(s, t, e) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, n ? { ...i, wrapped: !0 } : i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function he(s) {
  return Wt({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = (s, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(s, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function le(s, t) {
  return (e, i, r) => {
    const o = (n) => {
      var h;
      return ((h = n.renderRoot) == null ? void 0 : h.querySelector(s)) ?? null;
    };
    return Zt(e, i, { get() {
      return o(this);
    } });
  };
}
function vt(s) {
  var t, e, i = "";
  if (typeof s == "string" || typeof s == "number") i += s;
  else if (typeof s == "object") if (Array.isArray(s)) {
    var r = s.length;
    for (t = 0; t < r; t++) s[t] && (e = vt(s[t])) && (i && (i += " "), i += e);
  } else for (e in s) s[e] && (i && (i += " "), i += e);
  return i;
}
function ce() {
  for (var s, t, e = 0, i = "", r = arguments.length; e < r; e++) (s = arguments[e]) && (t = vt(s)) && (i && (i += " "), i += t);
  return i;
}
var ot = ["x", "y", "z"], p = function(s) {
  Object.assign(this, { uniforms: {}, geometry: { vertices: [{ x: 0, y: 0, z: 0 }] }, mode: 0, modifiers: {}, attributes: [], multiplier: 1, buffers: [] }), Object.assign(this, s), this.prepareProgram(), this.prepareUniforms(), this.prepareAttributes();
};
p.prototype.compileShader = function(s, t) {
  var e = this.gl.createShader(s);
  return this.gl.shaderSource(e, t), this.gl.compileShader(e), e;
}, p.prototype.prepareProgram = function() {
  var s = this.gl, t = this.vertex, e = this.fragment, i = s.createProgram();
  s.attachShader(i, this.compileShader(35633, t)), s.attachShader(i, this.compileShader(35632, e)), s.linkProgram(i), s.useProgram(i), this.program = i;
}, p.prototype.prepareUniforms = function() {
  for (var s = Object.keys(this.uniforms), t = 0; t < s.length; t += 1) {
    var e = this.gl.getUniformLocation(this.program, s[t]);
    this.uniforms[s[t]].location = e;
  }
}, p.prototype.prepareAttributes = function() {
  this.geometry.vertices !== void 0 && this.attributes.push({ name: "aPosition", size: 3 }), this.geometry.normal !== void 0 && this.attributes.push({ name: "aNormal", size: 3 }), this.attributeKeys = [];
  for (var s = 0; s < this.attributes.length; s += 1) this.attributeKeys.push(this.attributes[s].name), this.prepareAttribute(this.attributes[s]);
}, p.prototype.prepareAttribute = function(s) {
  for (var t = this.geometry, e = this.multiplier, i = t.vertices, r = t.normal, o = new Float32Array(e * i.length * s.size), n = 0; n < e; n += 1) for (var h = s.data && s.data(n, e), a = n * i.length * s.size, l = 0; l < i.length; l += 1) for (var u = 0; u < s.size; u += 1) {
    var c = this.modifiers[s.name];
    o[a] = c !== void 0 ? c(h, l, u, this) : s.name === "aPosition" ? i[l][ot[u]] : s.name === "aNormal" ? r[l][ot[u]] : h[u], a += 1;
  }
  this.attributes[this.attributeKeys.indexOf(s.name)].data = o, this.prepareBuffer(this.attributes[this.attributeKeys.indexOf(s.name)]);
}, p.prototype.prepareBuffer = function(s) {
  var t = s.data, e = s.name, i = s.size, r = this.gl.createBuffer();
  this.gl.bindBuffer(34962, r), this.gl.bufferData(34962, t, 35044);
  var o = this.gl.getAttribLocation(this.program, e);
  this.gl.enableVertexAttribArray(o), this.gl.vertexAttribPointer(o, i, 5126, !1, 0, 0), this.buffers[this.attributeKeys.indexOf(s.name)] = { buffer: r, location: o, size: i };
}, p.prototype.render = function(s) {
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
}, p.prototype.destroy = function() {
  for (var s = 0; s < this.buffers.length; s += 1) this.gl.deleteBuffer(this.buffers[s].buffer);
  this.gl.deleteProgram(this.program), this.gl = null;
};
var y = function(s) {
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
y.prototype.resize = function() {
  var s = this.gl, t = this.canvas, e = this.devicePixelRatio, i = this.position;
  t.width = t.clientWidth * e, t.height = t.clientHeight * e;
  var r = s.drawingBufferWidth, o = s.drawingBufferHeight, n = r / o;
  s.viewport(0, 0, r, o);
  var h = Math.tan(Math.PI / 180 * 22.5), a = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, i.x, i.y, (n < 1 ? 1 : n) * -i.z, 1];
  this.uniforms.uProjectionMatrix = { type: "mat4", value: [0.5 / h, 0, 0, 0, 0, n / h * 0.5, 0, 0, 0, 0, -(this.clip[1] + this.clip[0]) / (this.clip[1] - this.clip[0]), -1, 0, 0, -2 * this.clip[1] * (this.clip[0] / (this.clip[1] - this.clip[0])), 0] }, this.uniforms.uViewMatrix = { type: "mat4", value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }, this.uniforms.uModelMatrix = { type: "mat4", value: a };
}, y.prototype.toggle = function(s) {
  s !== this.shouldRender && (this.shouldRender = s !== void 0 ? s : !this.shouldRender, this.shouldRender && this.render());
}, y.prototype.render = function() {
  var s = this;
  this.gl.clear(16640), this.instances.forEach(function(t) {
    t.render(s.uniforms);
  }), this.onRender && this.onRender(this), this.shouldRender && requestAnimationFrame(function() {
    return s.render();
  });
}, y.prototype.add = function(s, t) {
  t === void 0 && (t = { uniforms: {} }), t.uniforms === void 0 && (t.uniforms = {}), Object.assign(t.uniforms, JSON.parse(JSON.stringify(this.uniforms))), Object.assign(t, { gl: this.gl, uniformMap: this.uniformMap });
  var e = new p(t);
  return this.instances.set(s, e), e;
}, y.prototype.remove = function(s) {
  var t = this.instances.get(s);
  t !== void 0 && (t.destroy(), this.instances.delete(s));
}, y.prototype.destroy = function() {
  var s = this;
  this.instances.forEach(function(t, e) {
    t.destroy(), s.instances.delete(e);
  }), this.toggle(!1);
};
var At = "phi", yt = "theta", $t = "mapSamples", bt = "mapBrightness", _t = "baseColor", Et = "markerColor", xt = "glowColor", S = "markers", wt = "diffuse", nt = "devicePixelRatio", St = "dark", Pt = "offset", Ct = "scale", Mt = "opacity", Ut = "mapBaseBrightness", at = { [At]: "A", [yt]: "B", [$t]: "m", [bt]: "E", [_t]: "R", [Et]: "S", [xt]: "z", [wt]: "F", [St]: "G", [Pt]: "y", [Ct]: "C", [Mt]: "H", [Ut]: "I" }, { PI: F, sin: ht, cos: lt } = Math, ct = (s) => [].concat(...s.map((t) => {
  let [e, i] = t.location;
  e = e * F / 180, i = i * F / 180 - F;
  let r = lt(e), o = [-r * lt(i), ht(e), r * ht(i), t.size], n = t.color ? [...t.color, 1] : [0, 0, 0, 0];
  return [...o, ...n];
}), [0, 0, 0, 0, 0, 0, 0, 0]), ue = (s, t) => {
  let e = (o, n, h) => ({ type: o, value: typeof t[n] > "u" ? h : t[n] }), i = s.getContext("webgl2") ? "webgl2" : s.getContext("webgl") ? "webgl" : "experimental-webgl", r = new y({ canvas: s, contextType: i, context: { alpha: !0, stencil: !1, antialias: !0, depth: !1, preserveDrawingBuffer: !1, ...t.context }, settings: { [nt]: t[nt] || 1, onSetup: (o) => {
    let n = o.RGB, h = o.UNSIGNED_BYTE, a = o.TEXTURE_2D, l = o.createTexture();
    o.bindTexture(a, l), o.texImage2D(a, 0, n, 1, 1, 0, n, h, new Uint8Array([0, 0, 0, 0]));
    let u = new Image();
    u.onload = () => {
      o.bindTexture(a, l), o.texImage2D(a, 0, n, n, h, u), o.generateMipmap(a);
      let c = o.getParameter(o.CURRENT_PROGRAM), f = o.getUniformLocation(c, "J");
      o.texParameteri(a, o.TEXTURE_MIN_FILTER, o.NEAREST), o.texParameteri(a, o.TEXTURE_MAG_FILTER, o.NEAREST), o.uniform1i(f, 0);
    }, u.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAAAXNSR0IArs4c6QAABA5JREFUeNrV179uHEUAx/Hf3JpbF+E2VASBsmVKTBcpKJs3SMEDcDwBiVJAAewYEBUivIHT0uUBIt0YCovKD0CRjUC4QfHYh8hYXu+P25vZ2Zm9c66gMd/GJ/tz82d3bk8GN4SrByYF2366FNTACIAkivVAAazQdnf3MvAlbNUQfOPAdQDvSAimMWhwy4I2g4SU+Kp04ISLpPBAKLxPyic3O/CCi+Y7rUJbiodcpDOFY7CgxCEXmdYD2EYK2s5lApOx5pEDDYCUwM1XdJUwBV11QQMg59kePSCaPAASQMEL2hwo6TJFgxpg+TgC2ymXPbuvc40awr3D1QCFfbH9kcoqAOkZozpQo0aqAGQRKCog/+tjkgbNFEtg2FffBvBGlSxHoAaAa1u6X4PBAwDiR8FFsrQgeUhfJTSALaB9jy5NCybJPn1SVFiWk7ywN+KzhH1aKAuydhGkbEF4lWohLXDXavlyFgHY7LBnLRdlAP6BS5Cc8RfVDXbkwN/oIvmY+6obbNeBP0JwTuMGu9gTzy1Q4RS/cWpfzszeYwd+CAFrtBW/Hur0gLbJGlD+/OjVwe/drfBxkbbg63dndEDfiEBlAd7ac0BPe1D6Jd8dfbLH+RI0OzseFB5s01/M+gMdAeluLOCAuaUA9Lezo/vSgXoCX9rtEiXnp7Q1W/CNyWcd8DXoS6jH/YZ5vAJEWY2dXFQe2TUgaFaNejCzJ98g6HnlVrsE58sDcYqg+9XY75fPqdoh/kRQWiXKg8MWlJQxUFMPjqnyujhFBE7UxIMjyszk0QwQlFsezImsyvUYYYVED2pk6m0Tg8T04Fwjk2kdAwSACqlM6gRRt3vQYAFGX0Ah7Ebx1H+MDRI5ui0QldH4j7FGcm90XdxD2Jg1AOEAVAKhEFXSn4cKUELurIAKwJ3MArypPscQaLhJFICJ0ohjDySAdH8AhDtCiTuMycH8CXzhH9jUACAO5uMhoAwA5i+T6WAKmmAqnLy80wxHqIPFYpqCwxGaYLt4Dyievg5kEoVEUAhs6pqKgFtDQYOuaXypaWKQfIuwwoGSZgfLsu/XAtI8cGN+h7Cc1A5oLOMhwlIPXuhu48AIvsSBkvtV9wsJRKCyYLfq5lTrQMFd1a262oqBck9K1V0YjQg0iEYYgpS1A9GlXQV5cykwm4A7BzVsxQqo7E+zCegO7Ma7yKgsuOcfKbMBwLC8wvVNYDsANYalEpOAa6zpWjTeMKGwEwC1CiQewJc5EKfgy7GmRAZA4vUVGwE2dPM/g0xuAInE/yG5aZ8ISxWGfYigUVbdyBElTHh2uCwGdfCkOLGgQVBh3Ewp+/QK4CDlR5Ws/Zf7yhCf8pH7vinWAvoVCQ6zz0NX5V/6GkAVV+2/5qsJ/gU8bsxpM8IeAQAAAABJRU5ErkJggg==";
  } } });
  return r.add("", { vertex: "attribute vec3 aPosition;uniform mat4 uProjectionMatrix;uniform mat4 uModelMatrix;uniform mat4 uViewMatrix;void main(){gl_Position=uProjectionMatrix*uModelMatrix*uViewMatrix*vec4(aPosition,1.);}", fragment: "precision highp float;uniform vec2 t,y;uniform vec3 R,S,z;uniform vec4 v[64*2];uniform float A,B,m,C,D,E,F,G,H,I;uniform sampler2D J;float K=1./m;mat3 L(float a,float b){float c=cos(a),d=cos(b),e=sin(a),f=sin(b);return mat3(d,f*e,-f*c,0.,c,e,f,d*-e,d*c);}vec3 w(vec3 c,out float x){c=c.xzy;float p=max(2.,floor(log2(2.236068*m*3.141593*(1.-c.z*c.z))*.72021));vec2 g=floor(pow(1.618034,p)/2.236068*vec2(1.,1.618034)+.5),d=fract((g+1.)*.618034)*6.283185-3.883222,e=-2.*g,f=vec2(atan(c.y,c.x),c.z-1.),q=floor(vec2(e.y*f.x-d.y*(f.y*m+1.),-e.x*f.x+d.x*(f.y*m+1.))/(d.x*e.y-e.x*d.y));float n=3.141593;vec3 r;for(float h=0.;h<4.;h+=1.){vec2 s=vec2(mod(h,2.),floor(h*.5));float j=dot(g,q+s);if(j>m)continue;float a=j,b=0.;if(a>=524288.)a-=524288.,b+=.803894;if(a>=262144.)a-=262144.,b+=.901947;if(a>=131072.)a-=131072.,b+=.950973;if(a>=65536.)a-=65536.,b+=.475487;if(a>=32768.)a-=32768.,b+=.737743;if(a>=16384.)a-=16384.,b+=.868872;if(a>=8192.)a-=8192.,b+=.934436;if(a>=4096.)a-=4096.,b+=.467218;if(a>=2048.)a-=2048.,b+=.733609;if(a>=1024.)a-=1024.,b+=.866804;if(a>=512.)a-=512.,b+=.433402;if(a>=256.)a-=256.,b+=.216701;if(a>=128.)a-=128.,b+=.108351;if(a>=64.)a-=64.,b+=.554175;if(a>=32.)a-=32.,b+=.777088;if(a>=16.)a-=16.,b+=.888544;if(a>=8.)a-=8.,b+=.944272;if(a>=4.)a-=4.,b+=.472136;if(a>=2.)a-=2.,b+=.236068;if(a>=1.)a-=1.,b+=.618034;float k=fract(b)*6.283185,i=1.-2.*j*K,l=sqrt(1.-i*i);vec3 o=vec3(cos(k)*l,sin(k)*l,i);float u=length(c-o);if(u<n)n=u,r=o;}x=n;return r.xzy;}void main(){vec2 b=(gl_FragCoord.xy/t*2.-1.)/C-y*vec2(1.,-1.)/t;b.x*=t.x/t.y;float c=dot(b,b);vec4 x=vec4(0.);float n=0.;if(c<=.64){for(int g=0;g<2;g++){vec4 e=vec4(0.);float a;vec3 u=vec3(0.,0.,1.),h=normalize(vec3(b,sqrt(.64-c)));h.z*=g>0?-1.:1.,u.z*=g>0?-1.:1.;vec3 i=h*L(B,A),j=w(i,a);float o=asin(j.y),k=acos(-j.x/cos(o));k=j.z<0.?-k:k;float M=max(texture2D(J,vec2(k*.5/3.141593,-(o/3.141593+.5))).x,I),N=smoothstep(8e-3,0.,a),l=dot(h,u),p=pow(l,F)*E,q=M*N*p,T=mix((1.-q)*pow(l,.4),q,G)+.1;e+=vec4(R*T,1.);int U=int(D);float V=0.;for(int d=0;d<64;d++){if(d>=U)break;vec4 r=v[d*2],O=v[d*2+1];vec3 s=r.xyz,P=s-i;float f=r.w;if(dot(P,P)>f*f*4.)continue;vec3 W=w(s,a);a=length(W-i);if(a<f)V+=smoothstep(f*.5,0.,a),e.xyz=O.w>.5?mix(e.xyz,O.xyz,smoothstep(f*.5,0.,a)*p):mix(e.xyz,S,smoothstep(f*.5,0.,a)*p);}e.xyz+=pow(1.-l,4.)*z,x+=e*(1.+(g>0?-H:H))/2.;}n=pow(dot(normalize(vec3(-b,sqrt(1.-c))),vec3(0.,0.,1.)),4.)*smoothstep(0.,1.,.2/(c-.64));}else{float Q=sqrt(.2/(c-.64));n=smoothstep(.5,1.,Q/(Q+1.));}gl_FragColor=x+vec4(n*z,n);}", uniforms: { t: { type: "vec2", value: [t.width, t.height] }, A: e("float", At), B: e("float", yt), m: e("float", $t), E: e("float", bt), I: e("float", Ut), R: e("vec3", _t), S: e("vec3", Et), F: e("float", wt), z: e("vec3", xt), G: e("float", St), v: { type: "vec4", value: ct(t[S]) }, D: { type: "float", value: t[S].length }, y: e("vec2", Pt, [0, 0]), C: e("float", Ct, 1), H: e("float", Mt, 1) }, mode: 4, geometry: { vertices: [{ x: -100, y: 100, z: 0 }, { x: -100, y: -100, z: 0 }, { x: 100, y: 100, z: 0 }, { x: 100, y: -100, z: 0 }, { x: -100, y: -100, z: 0 }, { x: 100, y: 100, z: 0 }] }, onRender: ({ uniforms: o }) => {
    let n = {};
    if (t.onRender) {
      n = t.onRender(n) || n;
      for (let h in at) n[h] !== void 0 && (o[at[h]].value = n[h]);
      n[S] !== void 0 && (o.v.value = ct(n[S]), o.D.value = n[S].length), n.width && n.height && (o.t.value = [n.width, n.height]);
    }
  } }), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = { CHILD: 2 }, ee = (s) => (...t) => ({ _$litDirective$: s, values: t });
class ie {
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
class V extends ie {
  constructor(t) {
    if (super(t), this.it = d, t.type !== te.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === d || t == null) return this._t = void 0, this.it = t;
    if (t === _) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
V.directiveName = "unsafeHTML", V.resultType = 1;
const de = ee(V);
export {
  he as a,
  de as b,
  ce as c,
  le as e,
  H as h,
  re as i,
  oe as k,
  Wt as n,
  ue as p,
  Rt as r,
  ae as t
};
