function ns(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Ue(e, t) {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
const U = (e, t, n) => n > t ? t : n < e ? e : n;
function Dt(e, t) {
  return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
let ft = () => {
}, N = () => {
};
process.env.NODE_ENV !== "production" && (ft = (e, t, n) => {
  !e && typeof console < "u" && console.warn(Dt(t, n));
}, N = (e, t, n) => {
  if (!e)
    throw new Error(Dt(t, n));
});
const k = {}, Ye = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function ss(e) {
  return typeof e == "object" && e !== null;
}
const ze = (e) => /^0[^.\s]+$/u.test(e);
// @__NO_SIDE_EFFECTS__
function Yt(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
const q = /* @__NO_SIDE_EFFECTS__ */ (e) => e, is = (e, t) => (n) => t(e(n)), zt = (...e) => e.reduce(is), Xt = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
  const s = t - e;
  return s === 0 ? 1 : (n - e) / s;
};
class Xe {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return ns(this.subscriptions, t), () => Ue(this.subscriptions, t);
  }
  notify(t, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](t, n, s);
      else
        for (let r = 0; r < i; r++) {
          const a = this.subscriptions[r];
          a && a(t, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const E = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, O = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3;
function qe(e, t) {
  return t ? e * (1e3 / t) : 0;
}
const be = /* @__PURE__ */ new Set();
function He(e, t, n) {
  e || be.has(t) || (console.warn(Dt(t, n)), be.add(t));
}
const rs = (e, t, n) => {
  const s = t - e;
  return ((n - e) % s + s) % s + e;
}, Ze = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, as = 1e-7, os = 12;
function ls(e, t, n, s, i) {
  let r, a, o = 0;
  do
    a = t + (n - t) / 2, r = Ze(a, s, i) - e, r > 0 ? n = a : t = a;
  while (Math.abs(r) > as && ++o < os);
  return a;
}
function ht(e, t, n, s) {
  if (e === t && n === s)
    return q;
  const i = (r) => ls(r, 0, 1, e, n);
  return (r) => r === 0 || r === 1 ? r : Ze(i(r), t, s);
}
const Je = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, Qe = (e) => (t) => 1 - e(1 - t), tn = /* @__PURE__ */ ht(0.33, 1.53, 0.69, 0.99), qt = /* @__PURE__ */ Qe(tn), en = /* @__PURE__ */ Je(qt), nn = (e) => (e *= 2) < 1 ? 0.5 * qt(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))), Ht = (e) => 1 - Math.sin(Math.acos(e)), us = Qe(Ht), sn = Je(Ht), cs = /* @__PURE__ */ ht(0.42, 0, 1, 1), fs = /* @__PURE__ */ ht(0, 0, 0.58, 1), rn = /* @__PURE__ */ ht(0.42, 0, 0.58, 1), an = (e) => Array.isArray(e) && typeof e[0] != "number";
function on(e, t) {
  return an(e) ? e[rs(0, e.length, t)] : e;
}
const ln = (e) => Array.isArray(e) && typeof e[0] == "number", Te = {
  linear: q,
  easeIn: cs,
  easeInOut: rn,
  easeOut: fs,
  circIn: Ht,
  circInOut: sn,
  circOut: us,
  backIn: qt,
  backInOut: en,
  backOut: tn,
  anticipate: nn
}, hs = (e) => typeof e == "string", Ft = (e) => {
  if (ln(e)) {
    N(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [t, n, s, i] = e;
    return ht(t, n, s, i);
  } else if (hs(e))
    return N(Te[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), Te[e];
  return e;
}, yt = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function ds(e, t) {
  let n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), i = !1, r = !1;
  const a = /* @__PURE__ */ new WeakSet();
  let o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function u(l) {
    a.has(l) && (c.schedule(l), e()), l(o);
  }
  const c = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (l, f = !1, h = !1) => {
      const y = h && i ? n : s;
      return f && a.add(l), y.has(l) || y.add(l), l;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (l) => {
      s.delete(l), a.delete(l);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (l) => {
      if (o = l, i) {
        r = !0;
        return;
      }
      i = !0, [n, s] = [s, n], n.forEach(u), n.clear(), i = !1, r && (r = !1, c.process(l));
    }
  };
  return c;
}
const ps = 40;
function un(e, t) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, a = yt.reduce((w, S) => (w[S] = ds(r), w), {}), { setup: o, read: u, resolveKeyframes: c, preUpdate: l, update: f, preRender: h, render: d, postRender: y } = a, g = () => {
    const w = k.useManualTiming ? i.timestamp : performance.now();
    n = !1, k.useManualTiming || (i.delta = s ? 1e3 / 60 : Math.max(Math.min(w - i.timestamp, ps), 1)), i.timestamp = w, i.isProcessing = !0, o.process(i), u.process(i), c.process(i), l.process(i), f.process(i), h.process(i), d.process(i), y.process(i), i.isProcessing = !1, n && t && (s = !1, e(g));
  }, b = () => {
    n = !0, s = !0, i.isProcessing || e(g);
  };
  return { schedule: yt.reduce((w, S) => {
    const m = a[S];
    return w[S] = (V, C = !1, T = !1) => (n || b(), m.schedule(V, C, T)), w;
  }, {}), cancel: (w) => {
    for (let S = 0; S < yt.length; S++)
      a[yt[S]].cancel(w);
  }, state: i, steps: a };
}
const { schedule: B, cancel: Rt, state: vt } = /* @__PURE__ */ un(typeof requestAnimationFrame < "u" ? requestAnimationFrame : q, !0);
let Tt;
function ms() {
  Tt = void 0;
}
const P = {
  now: () => (Tt === void 0 && P.set(vt.isProcessing || k.useManualTiming ? vt.timestamp : performance.now()), Tt),
  set: (e) => {
    Tt = e, queueMicrotask(ms);
  }
}, cn = (e) => (t) => typeof t == "string" && t.startsWith(e), fn = /* @__PURE__ */ cn("--"), gs = /* @__PURE__ */ cn("var(--"), Zt = (e) => gs(e) ? ys.test(e.split("/*")[0].trim()) : !1, ys = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, H = {
  test: (e) => typeof e == "number",
  parse: parseFloat,
  transform: (e) => e
}, at = {
  ...H,
  transform: (e) => U(0, 1, e)
}, bt = {
  ...H,
  default: 1
}, rt = (e) => Math.round(e * 1e5) / 1e5, Jt = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function bs(e) {
  return e == null;
}
const Ts = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Qt = (e, t) => (n) => !!(typeof n == "string" && Ts.test(n) && n.startsWith(e) || t && !bs(n) && Object.prototype.hasOwnProperty.call(n, t)), hn = (e, t, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, r, a, o] = s.match(Jt);
  return {
    [e]: parseFloat(i),
    [t]: parseFloat(r),
    [n]: parseFloat(a),
    alpha: o !== void 0 ? parseFloat(o) : 1
  };
}, vs = (e) => U(0, 255, e), xt = {
  ...H,
  transform: (e) => Math.round(vs(e))
}, L = {
  test: /* @__PURE__ */ Qt("rgb", "red"),
  parse: /* @__PURE__ */ hn("red", "green", "blue"),
  transform: ({ red: e, green: t, blue: n, alpha: s = 1 }) => "rgba(" + xt.transform(e) + ", " + xt.transform(t) + ", " + xt.transform(n) + ", " + rt(at.transform(s)) + ")"
};
function Vs(e) {
  let t = "", n = "", s = "", i = "";
  return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), s = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), s = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, s += s, i += i), {
    red: parseInt(t, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const Et = {
  test: /* @__PURE__ */ Qt("#"),
  parse: Vs,
  transform: L.transform
}, dt = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
  test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${e}`
}), W = /* @__PURE__ */ dt("deg"), X = /* @__PURE__ */ dt("%"), p = /* @__PURE__ */ dt("px"), ws = /* @__PURE__ */ dt("vh"), Ss = /* @__PURE__ */ dt("vw"), ve = {
  ...X,
  parse: (e) => X.parse(e) / 100,
  transform: (e) => X.transform(e * 100)
}, Y = {
  test: /* @__PURE__ */ Qt("hsl", "hue"),
  parse: /* @__PURE__ */ hn("hue", "saturation", "lightness"),
  transform: ({ hue: e, saturation: t, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(e) + ", " + X.transform(rt(t)) + ", " + X.transform(rt(n)) + ", " + rt(at.transform(s)) + ")"
}, D = {
  test: (e) => L.test(e) || Et.test(e) || Y.test(e),
  parse: (e) => L.test(e) ? L.parse(e) : Y.test(e) ? Y.parse(e) : Et.parse(e),
  transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? L.transform(e) : Y.transform(e),
  getAnimatableNone: (e) => {
    const t = D.parse(e);
    return t.alpha = 0, D.transform(t);
  }
}, xs = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function As(e) {
  var t, n;
  return isNaN(e) && typeof e == "string" && (((t = e.match(Jt)) == null ? void 0 : t.length) || 0) + (((n = e.match(xs)) == null ? void 0 : n.length) || 0) > 0;
}
const dn = "number", pn = "color", Ms = "var", Cs = "var(", Ve = "${}", Ds = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ot(e) {
  const t = e.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let r = 0;
  const o = t.replace(Ds, (u) => (D.test(u) ? (s.color.push(r), i.push(pn), n.push(D.parse(u))) : u.startsWith(Cs) ? (s.var.push(r), i.push(Ms), n.push(u)) : (s.number.push(r), i.push(dn), n.push(parseFloat(u))), ++r, Ve)).split(Ve);
  return { values: n, split: o, indexes: s, types: i };
}
function mn(e) {
  return ot(e).values;
}
function gn(e) {
  const { split: t, types: n } = ot(e), s = t.length;
  return (i) => {
    let r = "";
    for (let a = 0; a < s; a++)
      if (r += t[a], i[a] !== void 0) {
        const o = n[a];
        o === dn ? r += rt(i[a]) : o === pn ? r += D.transform(i[a]) : r += i[a];
      }
    return r;
  };
}
const Fs = (e) => typeof e == "number" ? 0 : D.test(e) ? D.getAnimatableNone(e) : e;
function Rs(e) {
  const t = mn(e);
  return gn(e)(t.map(Fs));
}
const Z = {
  test: As,
  parse: mn,
  createTransformer: gn,
  getAnimatableNone: Rs
};
function At(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Es({ hue: e, saturation: t, lightness: n, alpha: s }) {
  e /= 360, t /= 100, n /= 100;
  let i = 0, r = 0, a = 0;
  if (!t)
    i = r = a = n;
  else {
    const o = n < 0.5 ? n * (1 + t) : n + t - n * t, u = 2 * n - o;
    i = At(u, o, e + 1 / 3), r = At(u, o, e), a = At(u, o, e - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(r * 255),
    blue: Math.round(a * 255),
    alpha: s
  };
}
function Vt(e, t) {
  return (n) => n > 0 ? t : e;
}
const pt = (e, t, n) => e + (t - e) * n, Mt = (e, t, n) => {
  const s = e * e, i = n * (t * t - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, Ps = [Et, L, Y], Os = (e) => Ps.find((t) => t.test(e));
function we(e) {
  const t = Os(e);
  if (ft(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t)
    return !1;
  let n = t.parse(e);
  return t === Y && (n = Es(n)), n;
}
const Se = (e, t) => {
  const n = we(e), s = we(t);
  if (!n || !s)
    return Vt(e, t);
  const i = { ...n };
  return (r) => (i.red = Mt(n.red, s.red, r), i.green = Mt(n.green, s.green, r), i.blue = Mt(n.blue, s.blue, r), i.alpha = pt(n.alpha, s.alpha, r), L.transform(i));
}, Pt = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ns(e, t) {
  return Pt.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
function Is(e, t) {
  return (n) => pt(e, t, n);
}
function te(e) {
  return typeof e == "number" ? Is : typeof e == "string" ? Zt(e) ? Vt : D.test(e) ? Se : Bs : Array.isArray(e) ? yn : typeof e == "object" ? D.test(e) ? Se : Ks : Vt;
}
function yn(e, t) {
  const n = [...e], s = n.length, i = e.map((r, a) => te(r)(r, t[a]));
  return (r) => {
    for (let a = 0; a < s; a++)
      n[a] = i[a](r);
    return n;
  };
}
function Ks(e, t) {
  const n = { ...e, ...t }, s = {};
  for (const i in n)
    e[i] !== void 0 && t[i] !== void 0 && (s[i] = te(e[i])(e[i], t[i]));
  return (i) => {
    for (const r in s)
      n[r] = s[r](i);
    return n;
  };
}
function ks(e, t) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < t.values.length; i++) {
    const r = t.types[i], a = e.indexes[r][s[r]], o = e.values[a] ?? 0;
    n[i] = o, s[r]++;
  }
  return n;
}
const Bs = (e, t) => {
  const n = Z.createTransformer(t), s = ot(e), i = ot(t);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? Pt.has(e) && !i.values.length || Pt.has(t) && !s.values.length ? Ns(e, t) : zt(yn(ks(s, i), i.values), n) : (ft(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Vt(e, t));
};
function bn(e, t, n) {
  return typeof e == "number" && typeof t == "number" && typeof n == "number" ? pt(e, t, n) : te(e)(e, t);
}
const $s = (e) => {
  const t = ({ timestamp: n }) => e(n);
  return {
    start: (n = !0) => B.update(t, n),
    stop: () => Rt(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => vt.isProcessing ? vt.timestamp : P.now()
  };
}, Tn = (e, t, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(t / n), 2);
  for (let r = 0; r < i; r++)
    s += Math.round(e(r / (i - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, wt = 2e4;
function ee(e) {
  let t = 0;
  const n = 50;
  let s = e.next(t);
  for (; !s.done && t < wt; )
    t += n, s = e.next(t);
  return t >= wt ? 1 / 0 : t;
}
function vn(e, t = 100, n) {
  const s = n({ ...e, keyframes: [0, t] }), i = Math.min(ee(s), wt);
  return {
    type: "keyframes",
    ease: (r) => s.next(i * r).value / t,
    duration: /* @__PURE__ */ O(i)
  };
}
const Ws = 5;
function Vn(e, t, n) {
  const s = Math.max(t - Ws, 0);
  return qe(n - e(s), t - s);
}
const M = {
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
}, Ct = 1e-3;
function Ls({ duration: e = M.duration, bounce: t = M.bounce, velocity: n = M.velocity, mass: s = M.mass }) {
  let i, r;
  ft(e <= /* @__PURE__ */ E(M.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let a = 1 - t;
  a = U(M.minDamping, M.maxDamping, a), e = U(M.minDuration, M.maxDuration, /* @__PURE__ */ O(e)), a < 1 ? (i = (c) => {
    const l = c * a, f = l * e, h = l - n, d = Ot(c, a), y = Math.exp(-f);
    return Ct - h / d * y;
  }, r = (c) => {
    const f = c * a * e, h = f * n + n, d = Math.pow(a, 2) * Math.pow(c, 2) * e, y = Math.exp(-f), g = Ot(Math.pow(c, 2), a);
    return (-i(c) + Ct > 0 ? -1 : 1) * ((h - d) * y) / g;
  }) : (i = (c) => {
    const l = Math.exp(-c * e), f = (c - n) * e + 1;
    return -Ct + l * f;
  }, r = (c) => {
    const l = Math.exp(-c * e), f = (n - c) * (e * e);
    return l * f;
  });
  const o = 5 / e, u = js(i, r, o);
  if (e = /* @__PURE__ */ E(e), isNaN(u))
    return {
      stiffness: M.stiffness,
      damping: M.damping,
      duration: e
    };
  {
    const c = Math.pow(u, 2) * s;
    return {
      stiffness: c,
      damping: a * 2 * Math.sqrt(s * c),
      duration: e
    };
  }
}
const _s = 12;
function js(e, t, n) {
  let s = n;
  for (let i = 1; i < _s; i++)
    s = s - e(s) / t(s);
  return s;
}
function Ot(e, t) {
  return e * Math.sqrt(1 - t * t);
}
const Gs = ["duration", "bounce"], Us = ["stiffness", "damping", "mass"];
function xe(e, t) {
  return t.some((n) => e[n] !== void 0);
}
function Ys(e) {
  let t = {
    velocity: M.velocity,
    stiffness: M.stiffness,
    damping: M.damping,
    mass: M.mass,
    isResolvedFromDuration: !1,
    ...e
  };
  if (!xe(e, Us) && xe(e, Gs))
    if (e.visualDuration) {
      const n = e.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, r = 2 * U(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
      t = {
        ...t,
        mass: M.mass,
        stiffness: i,
        damping: r
      };
    } else {
      const n = Ls(e);
      t = {
        ...t,
        ...n,
        mass: M.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function lt(e = M.visualDuration, t = M.bounce) {
  const n = typeof e != "object" ? {
    visualDuration: e,
    keyframes: [0, 1],
    bounce: t
  } : e;
  let { restSpeed: s, restDelta: i } = n;
  const r = n.keyframes[0], a = n.keyframes[n.keyframes.length - 1], o = { done: !1, value: r }, { stiffness: u, damping: c, mass: l, duration: f, velocity: h, isResolvedFromDuration: d } = Ys({
    ...n,
    velocity: -/* @__PURE__ */ O(n.velocity || 0)
  }), y = h || 0, g = c / (2 * Math.sqrt(u * l)), b = a - r, v = /* @__PURE__ */ O(Math.sqrt(u / l)), A = Math.abs(b) < 5;
  s || (s = A ? M.restSpeed.granular : M.restSpeed.default), i || (i = A ? M.restDelta.granular : M.restDelta.default);
  let w;
  if (g < 1) {
    const m = Ot(v, g);
    w = (V) => {
      const C = Math.exp(-g * v * V);
      return a - C * ((y + g * v * b) / m * Math.sin(m * V) + b * Math.cos(m * V));
    };
  } else if (g === 1)
    w = (m) => a - Math.exp(-v * m) * (b + (y + v * b) * m);
  else {
    const m = v * Math.sqrt(g * g - 1);
    w = (V) => {
      const C = Math.exp(-g * v * V), T = Math.min(m * V, 300);
      return a - C * ((y + g * v * b) * Math.sinh(T) + m * b * Math.cosh(T)) / m;
    };
  }
  const S = {
    calculatedDuration: d && f || null,
    next: (m) => {
      const V = w(m);
      if (d)
        o.done = m >= f;
      else {
        let C = m === 0 ? y : 0;
        g < 1 && (C = m === 0 ? /* @__PURE__ */ E(y) : Vn(w, m, V));
        const T = Math.abs(C) <= s, x = Math.abs(a - V) <= i;
        o.done = T && x;
      }
      return o.value = o.done ? a : V, o;
    },
    toString: () => {
      const m = Math.min(ee(S), wt), V = Tn((C) => S.next(m * C).value, m, 30);
      return m + "ms " + V;
    },
    toTransition: () => {
    }
  };
  return S;
}
lt.applyToOptions = (e) => {
  const t = vn(e, 100, lt);
  return e.ease = t.ease, e.duration = /* @__PURE__ */ E(t.duration), e.type = "keyframes", e;
};
function Nt({ keyframes: e, velocity: t = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: r = 500, modifyTarget: a, min: o, max: u, restDelta: c = 0.5, restSpeed: l }) {
  const f = e[0], h = {
    done: !1,
    value: f
  }, d = (T) => o !== void 0 && T < o || u !== void 0 && T > u, y = (T) => o === void 0 ? u : u === void 0 || Math.abs(o - T) < Math.abs(u - T) ? o : u;
  let g = n * t;
  const b = f + g, v = a === void 0 ? b : a(b);
  v !== b && (g = v - f);
  const A = (T) => -g * Math.exp(-T / s), w = (T) => v + A(T), S = (T) => {
    const x = A(T), R = w(T);
    h.done = Math.abs(x) <= c, h.value = h.done ? v : R;
  };
  let m, V;
  const C = (T) => {
    d(h.value) && (m = T, V = lt({
      keyframes: [h.value, y(h.value)],
      velocity: Vn(w, T, h.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: r,
      restDelta: c,
      restSpeed: l
    }));
  };
  return C(0), {
    calculatedDuration: null,
    next: (T) => {
      let x = !1;
      return !V && m === void 0 && (x = !0, S(T), C(T)), m !== void 0 && T >= m ? V.next(T - m) : (!x && S(T), h);
    }
  };
}
function zs(e, t, n) {
  const s = [], i = n || k.mix || bn, r = e.length - 1;
  for (let a = 0; a < r; a++) {
    let o = i(e[a], e[a + 1]);
    if (t) {
      const u = Array.isArray(t) ? t[a] || q : t;
      o = zt(u, o);
    }
    s.push(o);
  }
  return s;
}
function Xs(e, t, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const r = e.length;
  if (N(r === t.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => t[0];
  if (r === 2 && t[0] === t[1])
    return () => t[1];
  const a = e[0] === e[1];
  e[0] > e[r - 1] && (e = [...e].reverse(), t = [...t].reverse());
  const o = zs(t, s, i), u = o.length, c = (l) => {
    if (a && l < e[0])
      return t[0];
    let f = 0;
    if (u > 1)
      for (; f < e.length - 2 && !(l < e[f + 1]); f++)
        ;
    const h = /* @__PURE__ */ Xt(e[f], e[f + 1], l);
    return o[f](h);
  };
  return n ? (l) => c(U(e[0], e[r - 1], l)) : c;
}
function wn(e, t) {
  const n = e[e.length - 1];
  for (let s = 1; s <= t; s++) {
    const i = /* @__PURE__ */ Xt(0, t, s);
    e.push(pt(n, 1, i));
  }
}
function Sn(e) {
  const t = [0];
  return wn(t, e.length - 1), t;
}
function qs(e, t) {
  return e.map((n) => n * t);
}
function Hs(e, t) {
  return e.map(() => t || rn).splice(0, e.length - 1);
}
function z({ duration: e = 300, keyframes: t, times: n, ease: s = "easeInOut" }) {
  const i = an(s) ? s.map(Ft) : Ft(s), r = {
    done: !1,
    value: t[0]
  }, a = qs(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === t.length ? n : Sn(t),
    e
  ), o = Xs(a, t, {
    ease: Array.isArray(i) ? i : Hs(t, i)
  });
  return {
    calculatedDuration: e,
    next: (u) => (r.value = o(u), r.done = u >= e, r)
  };
}
const Zs = (e) => e !== null;
function ne(e, { repeat: t, repeatType: n = "loop" }, s, i = 1) {
  const r = e.filter(Zs), o = i < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : r.length - 1;
  return !o || s === void 0 ? r[o] : s;
}
const Js = {
  decay: Nt,
  inertia: Nt,
  tween: z,
  keyframes: z,
  spring: lt
};
function xn(e) {
  typeof e.type == "string" && (e.type = Js[e.type]);
}
class se {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
}
const Qs = (e) => e / 100;
class ie extends se {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      var s, i;
      const { motionValue: n } = this.options;
      n && n.updatedAt !== P.now() && this.tick(P.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (i = (s = this.options).onStop) == null || i.call(s));
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    xn(t);
    const { type: n = z, repeat: s = 0, repeatDelay: i = 0, repeatType: r, velocity: a = 0 } = t;
    let { keyframes: o } = t;
    const u = n || z;
    process.env.NODE_ENV !== "production" && u !== z && N(o.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${o}`, "spring-two-frames"), u !== z && typeof o[0] != "number" && (this.mixKeyframes = zt(Qs, bn(o[0], o[1])), o = [0, 100]);
    const c = u({ ...t, keyframes: o });
    r === "mirror" && (this.mirroredGenerator = u({
      ...t,
      keyframes: [...o].reverse(),
      velocity: -a
    })), c.calculatedDuration === null && (c.calculatedDuration = ee(c));
    const { calculatedDuration: l } = c;
    this.calculatedDuration = l, this.resolvedDuration = l + i, this.totalDuration = this.resolvedDuration * (s + 1) - i, this.generator = c;
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(t, n = !1) {
    const { generator: s, totalDuration: i, mixKeyframes: r, mirroredGenerator: a, resolvedDuration: o, calculatedDuration: u } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: c = 0, keyframes: l, repeat: f, repeatType: h, repeatDelay: d, type: y, onUpdate: g, finalKeyframe: b } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - i / this.speed, this.startTime)), n ? this.currentTime = t : this.updateTime(t);
    const v = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), A = this.playbackSpeed >= 0 ? v < 0 : v > i;
    this.currentTime = Math.max(v, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
    let w = this.currentTime, S = s;
    if (f) {
      const T = Math.min(this.currentTime, i) / o;
      let x = Math.floor(T), R = T % 1;
      !R && T >= 1 && (R = 1), R === 1 && x--, x = Math.min(x, f + 1), !!(x % 2) && (h === "reverse" ? (R = 1 - R, d && (R -= d / o)) : h === "mirror" && (S = a)), w = U(0, 1, R) * o;
    }
    const m = A ? { done: !1, value: l[0] } : S.next(w);
    r && (m.value = r(m.value));
    let { done: V } = m;
    !A && u !== null && (V = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
    const C = this.holdTime === null && (this.state === "finished" || this.state === "running" && V);
    return C && y !== Nt && (m.value = ne(l, this.options, b, this.speed)), g && g(m.value), C && this.finish(), m;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, n) {
    return this.finished.then(t, n);
  }
  get duration() {
    return /* @__PURE__ */ O(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ O(t);
  }
  get time() {
    return /* @__PURE__ */ O(this.currentTime);
  }
  set time(t) {
    var n;
    t = /* @__PURE__ */ E(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), (n = this.driver) == null || n.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    this.updateTime(P.now());
    const n = this.playbackSpeed !== t;
    this.playbackSpeed = t, n && (this.time = /* @__PURE__ */ O(this.currentTime));
  }
  play() {
    var i, r;
    if (this.isStopped)
      return;
    const { driver: t = $s, startTime: n } = this.options;
    this.driver || (this.driver = t((a) => this.tick(a))), (r = (i = this.options).onPlay) == null || r.call(i);
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = n ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(P.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var t, n;
    this.notifyFinished(), this.teardown(), this.state = "finished", (n = (t = this.options).onComplete) == null || n.call(t);
  }
  cancel() {
    var t, n;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (n = (t = this.options).onCancel) == null || n.call(t);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    var n;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (n = this.driver) == null || n.stop(), t.observe(this);
  }
}
function An(e) {
  for (let t = 1; t < e.length; t++)
    e[t] ?? (e[t] = e[t - 1]);
}
const _ = (e) => e * 180 / Math.PI, It = (e) => {
  const t = _(Math.atan2(e[1], e[0]));
  return Kt(t);
}, ti = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
  rotate: It,
  rotateZ: It,
  skewX: (e) => _(Math.atan(e[1])),
  skewY: (e) => _(Math.atan(e[2])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Kt = (e) => (e = e % 360, e < 0 && (e += 360), e), Ae = It, Me = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), Ce = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), ei = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Me,
  scaleY: Ce,
  scale: (e) => (Me(e) + Ce(e)) / 2,
  rotateX: (e) => Kt(_(Math.atan2(e[6], e[5]))),
  rotateY: (e) => Kt(_(Math.atan2(-e[2], e[0]))),
  rotateZ: Ae,
  rotate: Ae,
  skewX: (e) => _(Math.atan(e[4])),
  skewY: (e) => _(Math.atan(e[1])),
  skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function kt(e) {
  return e.includes("scale") ? 1 : 0;
}
function Bt(e, t) {
  if (!e || e === "none")
    return kt(t);
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, i;
  if (n)
    s = ei, i = n;
  else {
    const o = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = ti, i = o;
  }
  if (!i)
    return kt(t);
  const r = s[t], a = i[1].split(",").map(si);
  return typeof r == "function" ? r(a) : a[r];
}
const ni = (e, t) => {
  const { transform: n = "none" } = getComputedStyle(e);
  return Bt(n, t);
};
function si(e) {
  return parseFloat(e.trim());
}
const J = [
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
], Q = new Set(J), De = (e) => e === H || e === p, ii = /* @__PURE__ */ new Set(["x", "y", "z"]), ri = J.filter((e) => !ii.has(e));
function ai(e) {
  const t = [];
  return ri.forEach((n) => {
    const s = e.getValue(n);
    s !== void 0 && (t.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), t;
}
const j = {
  // Dimensions
  width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0" }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  // Transform
  x: (e, { transform: t }) => Bt(t, "x"),
  y: (e, { transform: t }) => Bt(t, "y")
};
j.translateX = j.x;
j.translateY = j.y;
const G = /* @__PURE__ */ new Set();
let $t = !1, Wt = !1, Lt = !1;
function Mn() {
  if (Wt) {
    const e = Array.from(G).filter((s) => s.needsMeasurement), t = new Set(e.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    t.forEach((s) => {
      const i = ai(s);
      i.length && (n.set(s, i), s.render());
    }), e.forEach((s) => s.measureInitialState()), t.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([r, a]) => {
        var o;
        (o = s.getValue(r)) == null || o.set(a);
      });
    }), e.forEach((s) => s.measureEndState()), e.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  Wt = !1, $t = !1, G.forEach((e) => e.complete(Lt)), G.clear();
}
function Cn() {
  G.forEach((e) => {
    e.readKeyframes(), e.needsMeasurement && (Wt = !0);
  });
}
function oi() {
  Lt = !0, Cn(), Mn(), Lt = !1;
}
class re {
  constructor(t, n, s, i, r, a = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = s, this.motionValue = i, this.element = r, this.isAsync = a;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (G.add(this), $t || ($t = !0, B.read(Cn), B.resolveKeyframes(Mn))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: s, motionValue: i } = this;
    if (t[0] === null) {
      const r = i == null ? void 0 : i.get(), a = t[t.length - 1];
      if (r !== void 0)
        t[0] = r;
      else if (s && n) {
        const o = s.readValue(n, a);
        o != null && (t[0] = o);
      }
      t[0] === void 0 && (t[0] = a), i && r === void 0 && i.set(t[0]);
    }
    An(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), G.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (G.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Dn = (e) => e.startsWith("--");
function li(e, t, n) {
  Dn(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
const ui = /* @__PURE__ */ Yt(() => window.ScrollTimeline !== void 0), ci = {};
function fi(e, t) {
  const n = /* @__PURE__ */ Yt(e);
  return () => ci[t] ?? n();
}
const Fn = /* @__PURE__ */ fi(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), it = ([e, t, n, s]) => `cubic-bezier(${e}, ${t}, ${n}, ${s})`, Fe = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ it([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ it([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ it([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ it([0.33, 1.53, 0.69, 0.99])
};
function Rn(e, t) {
  if (e)
    return typeof e == "function" ? Fn() ? Tn(e, t) : "ease-out" : ln(e) ? it(e) : Array.isArray(e) ? e.map((n) => Rn(n, t) || Fe.easeOut) : Fe[e];
}
function hi(e, t, n, { delay: s = 0, duration: i = 300, repeat: r = 0, repeatType: a = "loop", ease: o = "easeOut", times: u } = {}, c = void 0) {
  const l = {
    [t]: n
  };
  u && (l.offset = u);
  const f = Rn(o, i);
  Array.isArray(f) && (l.easing = f);
  const h = {
    delay: s,
    duration: i,
    easing: Array.isArray(f) ? "linear" : f,
    fill: "both",
    iterations: r + 1,
    direction: a === "reverse" ? "alternate" : "normal"
  };
  return c && (h.pseudoElement = c), e.animate(l, h);
}
function ae(e) {
  return typeof e == "function" && "applyToOptions" in e;
}
function di({ type: e, ...t }) {
  return ae(e) && Fn() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class En extends se {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !t)
      return;
    const { element: n, name: s, keyframes: i, pseudoElement: r, allowFlatten: a = !1, finalKeyframe: o, onComplete: u } = t;
    this.isPseudoElement = !!r, this.allowFlatten = a, this.options = t, N(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const c = di(t);
    this.animation = hi(n, s, i, c, r), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const l = ne(i, this.options, o, this.speed);
        this.updateMotionValue ? this.updateMotionValue(l) : li(n, s, l), this.animation.cancel();
      }
      u == null || u(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var t, n;
    (n = (t = this.animation).finish) == null || n.call(t);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var t, n;
    this.isPseudoElement || (n = (t = this.animation).commitStyles) == null || n.call(t);
  }
  get duration() {
    var n, s;
    const t = ((s = (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) == null ? void 0 : s.call(n).duration) || 0;
    return /* @__PURE__ */ O(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ O(t);
  }
  get time() {
    return /* @__PURE__ */ O(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ E(t);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(t) {
    this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, observe: n }) {
    var s;
    return this.allowFlatten && ((s = this.animation.effect) == null || s.updateTiming({ easing: "linear" })), this.animation.onfinish = null, t && ui() ? (this.animation.timeline = t, q) : n(this);
  }
}
const Pn = {
  anticipate: nn,
  backInOut: en,
  circInOut: sn
};
function pi(e) {
  return e in Pn;
}
function mi(e) {
  typeof e.ease == "string" && pi(e.ease) && (e.ease = Pn[e.ease]);
}
const Re = 10;
class gi extends En {
  constructor(t) {
    mi(t), xn(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const { motionValue: n, onUpdate: s, onComplete: i, element: r, ...a } = this.options;
    if (!n)
      return;
    if (t !== void 0) {
      n.set(t);
      return;
    }
    const o = new ie({
      ...a,
      autoplay: !1
    }), u = /* @__PURE__ */ E(this.finishedTime ?? this.time);
    n.setWithVelocity(o.sample(u - Re).value, o.sample(u).value, Re), o.stop();
  }
}
const Ee = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && // It's animatable if we have a string
(Z.test(e) || e === "0") && // And it contains numbers and/or colors
!e.startsWith("url("));
function yi(e) {
  const t = e[0];
  if (e.length === 1)
    return !0;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t)
      return !0;
}
function bi(e, t, n, s) {
  const i = e[0];
  if (i === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const r = e[e.length - 1], a = Ee(i, t), o = Ee(r, t);
  return ft(a === o, `You are trying to animate ${t} from "${i}" to "${r}". "${a ? r : i}" is not an animatable value.`, "value-not-animatable"), !a || !o ? !1 : yi(e) || (n === "spring" || ae(n)) && s;
}
function _t(e) {
  e.duration = 0, e.type = "keyframes";
}
const Ti = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), vi = /* @__PURE__ */ Yt(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Vi(e) {
  var l;
  const { motionValue: t, name: n, repeatDelay: s, repeatType: i, damping: r, type: a } = e;
  if (!(((l = t == null ? void 0 : t.owner) == null ? void 0 : l.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: u, transformTemplate: c } = t.owner.getProps();
  return vi() && n && Ti.has(n) && (n !== "transform" || !c) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !u && !s && i !== "mirror" && r !== 0 && a !== "inertia";
}
const wi = 40;
class Si extends se {
  constructor({ autoplay: t = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: r = 0, repeatType: a = "loop", keyframes: o, name: u, motionValue: c, element: l, ...f }) {
    var y;
    super(), this.stop = () => {
      var g, b;
      this._animation && (this._animation.stop(), (g = this.stopTimeline) == null || g.call(this)), (b = this.keyframeResolver) == null || b.cancel();
    }, this.createdAt = P.now();
    const h = {
      autoplay: t,
      delay: n,
      type: s,
      repeat: i,
      repeatDelay: r,
      repeatType: a,
      name: u,
      motionValue: c,
      element: l,
      ...f
    }, d = (l == null ? void 0 : l.KeyframeResolver) || re;
    this.keyframeResolver = new d(o, (g, b, v) => this.onKeyframesResolved(g, b, h, !v), u, c, l), (y = this.keyframeResolver) == null || y.scheduleResolve();
  }
  onKeyframesResolved(t, n, s, i) {
    this.keyframeResolver = void 0;
    const { name: r, type: a, velocity: o, delay: u, isHandoff: c, onUpdate: l } = s;
    this.resolvedAt = P.now(), bi(t, r, a, o) || ((k.instantAnimations || !u) && (l == null || l(ne(t, s, n))), t[0] = t[t.length - 1], _t(s), s.repeat = 0);
    const h = {
      startTime: i ? this.resolvedAt ? this.resolvedAt - this.createdAt > wi ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...s,
      keyframes: t
    }, d = !c && Vi(h) ? new gi({
      ...h,
      element: h.motionValue.owner.current
    }) : new ie(h);
    d.finished.then(() => this.notifyFinished()).catch(q), this.pendingTimeline && (this.stopTimeline = d.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = d;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    var t;
    return this._animation || ((t = this.keyframeResolver) == null || t.resume(), oi()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var t;
    this._animation && this.animation.cancel(), (t = this.keyframeResolver) == null || t.cancel();
  }
}
class xi {
  constructor(t) {
    this.stop = () => this.runAll("stop"), this.animations = t.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((t) => t.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, n) {
    for (let s = 0; s < this.animations.length; s++)
      this.animations[s][t] = n;
  }
  attachTimeline(t) {
    const n = this.animations.map((s) => s.attachTimeline(t));
    return () => {
      n.forEach((s, i) => {
        s && s(), this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return Pe(this.animations, "duration");
  }
  get iterationDuration() {
    return Pe(this.animations, "iterationDuration");
  }
  runAll(t) {
    this.animations.forEach((n) => n[t]());
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
function Pe(e, t) {
  let n = 0;
  for (let s = 0; s < e.length; s++) {
    const i = e[s][t];
    i !== null && i > n && (n = i);
  }
  return n;
}
class On extends xi {
  then(t, n) {
    return this.finished.finally(t).then(() => {
    });
  }
}
const Oe = /* @__PURE__ */ new WeakMap(), Ai = (e, t = "") => `${e}:${t}`;
function Mi(e) {
  const t = Oe.get(e) || /* @__PURE__ */ new Map();
  return Oe.set(e, t), t;
}
const Ci = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Di(e) {
  const t = Ci.exec(e);
  if (!t)
    return [,];
  const [, n, s, i] = t;
  return [`--${n ?? s}`, i];
}
const Fi = 4;
function Nn(e, t, n = 1) {
  N(n <= Fi, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, i] = Di(e);
  if (!s)
    return;
  const r = window.getComputedStyle(t).getPropertyValue(s);
  if (r) {
    const a = r.trim();
    return Ye(a) ? parseFloat(a) : a;
  }
  return Zt(i) ? Nn(i, t, n + 1) : i;
}
function oe(e, t) {
  return (e == null ? void 0 : e[t]) ?? (e == null ? void 0 : e.default) ?? e;
}
const In = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...J
]), Ri = {
  test: (e) => e === "auto",
  parse: (e) => e
}, Kn = (e) => (t) => t.test(e), kn = [H, p, X, W, Ss, ws, Ri], Ne = (e) => kn.find(Kn(e));
function Ei(e) {
  return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || ze(e) : !0;
}
const Pi = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Oi(e) {
  const [t, n] = e.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return e;
  const [s] = n.match(Jt) || [];
  if (!s)
    return e;
  const i = n.replace(s, "");
  let r = Pi.has(t) ? 1 : 0;
  return s !== n && (r *= 100), t + "(" + r + i + ")";
}
const Ni = /\b([a-z-]*)\(.*?\)/gu, jt = {
  ...Z,
  getAnimatableNone: (e) => {
    const t = e.match(Ni);
    return t ? t.map(Oi).join(" ") : e;
  }
}, Ie = {
  ...H,
  transform: Math.round
}, Ii = {
  rotate: W,
  rotateX: W,
  rotateY: W,
  rotateZ: W,
  scale: bt,
  scaleX: bt,
  scaleY: bt,
  scaleZ: bt,
  skew: W,
  skewX: W,
  skewY: W,
  distance: p,
  translateX: p,
  translateY: p,
  translateZ: p,
  x: p,
  y: p,
  z: p,
  perspective: p,
  transformPerspective: p,
  opacity: at,
  originX: ve,
  originY: ve,
  originZ: p
}, le = {
  // Border props
  borderWidth: p,
  borderTopWidth: p,
  borderRightWidth: p,
  borderBottomWidth: p,
  borderLeftWidth: p,
  borderRadius: p,
  radius: p,
  borderTopLeftRadius: p,
  borderTopRightRadius: p,
  borderBottomRightRadius: p,
  borderBottomLeftRadius: p,
  // Positioning props
  width: p,
  maxWidth: p,
  height: p,
  maxHeight: p,
  top: p,
  right: p,
  bottom: p,
  left: p,
  // Spacing props
  padding: p,
  paddingTop: p,
  paddingRight: p,
  paddingBottom: p,
  paddingLeft: p,
  margin: p,
  marginTop: p,
  marginRight: p,
  marginBottom: p,
  marginLeft: p,
  // Misc
  backgroundPositionX: p,
  backgroundPositionY: p,
  ...Ii,
  zIndex: Ie,
  // SVG
  fillOpacity: at,
  strokeOpacity: at,
  numOctaves: Ie
}, Ki = {
  ...le,
  // Color props
  color: D,
  backgroundColor: D,
  outlineColor: D,
  fill: D,
  stroke: D,
  // Border props
  borderColor: D,
  borderTopColor: D,
  borderRightColor: D,
  borderBottomColor: D,
  borderLeftColor: D,
  filter: jt,
  WebkitFilter: jt
}, Bn = (e) => Ki[e];
function $n(e, t) {
  let n = Bn(e);
  return n !== jt && (n = Z), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
const ki = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Bi(e, t, n) {
  let s = 0, i;
  for (; s < e.length && !i; ) {
    const r = e[s];
    typeof r == "string" && !ki.has(r) && ot(r).values.length && (i = e[s]), s++;
  }
  if (i && n)
    for (const r of t)
      e[r] = $n(n, i);
}
class $i extends re {
  constructor(t, n, s, i, r) {
    super(t, n, s, i, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let u = 0; u < t.length; u++) {
      let c = t[u];
      if (typeof c == "string" && (c = c.trim(), Zt(c))) {
        const l = Nn(c, n.current);
        l !== void 0 && (t[u] = l), u === t.length - 1 && (this.finalKeyframe = c);
      }
    }
    if (this.resolveNoneKeyframes(), !In.has(s) || t.length !== 2)
      return;
    const [i, r] = t, a = Ne(i), o = Ne(r);
    if (a !== o)
      if (De(a) && De(o))
        for (let u = 0; u < t.length; u++) {
          const c = t[u];
          typeof c == "string" && (t[u] = parseFloat(c));
        }
      else j[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this, s = [];
    for (let i = 0; i < t.length; i++)
      (t[i] === null || Ei(t[i])) && s.push(i);
    s.length && Bi(t, s, n);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: s } = this;
    if (!t || !t.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = j[s](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && t.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    var o;
    const { element: t, name: n, unresolvedKeyframes: s } = this;
    if (!t || !t.current)
      return;
    const i = t.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const r = s.length - 1, a = s[r];
    s[r] = j[n](t.measureViewportBox(), window.getComputedStyle(t.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), (o = this.removedTransforms) != null && o.length && this.removedTransforms.forEach(([u, c]) => {
      t.getValue(u).set(c);
    }), this.resolveNoneKeyframes();
  }
}
const Wi = /* @__PURE__ */ new Set([
  // Border props
  "borderWidth",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRadius",
  "radius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius",
  // Positioning props
  "width",
  "maxWidth",
  "height",
  "maxHeight",
  "top",
  "right",
  "bottom",
  "left",
  // Spacing props
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  // Misc
  "backgroundPositionX",
  "backgroundPositionY"
]);
function Li(e, t) {
  for (let n = 0; n < e.length; n++)
    typeof e[n] == "number" && Wi.has(t) && (e[n] = e[n] + "px");
}
function Wn(e, t, n) {
  if (e instanceof EventTarget)
    return [e];
  if (typeof e == "string") {
    let s = document;
    const i = (n == null ? void 0 : n[e]) ?? s.querySelectorAll(e);
    return i ? Array.from(i) : [];
  }
  return Array.from(e);
}
const Ln = (e, t) => t && typeof e == "number" ? t.transform(e) : e, Ke = 30, _i = (e) => !isNaN(parseFloat(e));
class ji {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      var r;
      const i = P.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && ((r = this.events.change) == null || r.notify(this.current), this.dependents))
        for (const a of this.dependents)
          a.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = P.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = _i(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
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
  onChange(t) {
    return process.env.NODE_ENV !== "production" && He(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", t);
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new Xe());
    const s = this.events[t].add(n);
    return t === "change" ? () => {
      s(), B.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, n) {
    this.passiveEffect = t, this.stopPassiveEffect = n;
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
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
  }
  setWithVelocity(t, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, n = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var t;
    (t = this.events.change) == null || t.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
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
    const t = P.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Ke)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Ke);
    return qe(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
   */
  start(t) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify();
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
    var t, n;
    (t = this.dependents) == null || t.clear(), (n = this.events.destroy) == null || n.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function ut(e, t) {
  return new ji(e, t);
}
const { schedule: Gi } = /* @__PURE__ */ un(queueMicrotask, !1);
function ke(e, t) {
  const n = window.getComputedStyle(e);
  return Dn(t) ? n.getPropertyValue(t) : n[t];
}
function _n(e) {
  return ss(e) && "ownerSVGElement" in e;
}
function Ui(e) {
  return _n(e) && e.tagName === "svg";
}
function Yi(e, t) {
  if (e === "first")
    return 0;
  {
    const n = t - 1;
    return e === "last" ? n : n / 2;
  }
}
function ha(e = 0.1, { startDelay: t = 0, from: n = 0, ease: s } = {}) {
  return (i, r) => {
    const a = typeof n == "number" ? n : Yi(n, r), o = Math.abs(a - i);
    let u = e * o;
    if (s) {
      const c = r * e;
      u = Ft(s)(u / c) * c;
    }
    return t + u;
  };
}
const F = (e) => !!(e && e.getVelocity), zi = [...kn, D, Z], Xi = (e) => zi.find(Kn(e));
function ue(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function jn(e, t, n, s) {
  return typeof e == "string" && ue(t) ? Wn(e, n, s) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e : [e];
}
function qi(e, t, n) {
  return e * (t + 1);
}
function Be(e, t, n, s) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : s.get(t) ?? e;
}
function Hi(e, t, n) {
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    i.at > t && i.at < n && (Ue(e, i), s--);
  }
}
function Zi(e, t, n, s, i, r) {
  Hi(e, i, r);
  for (let a = 0; a < t.length; a++)
    e.push({
      value: t[a],
      at: pt(i, r, s[a]),
      easing: on(n, a)
    });
}
function Ji(e, t) {
  for (let n = 0; n < e.length; n++)
    e[n] = e[n] / (t + 1);
}
function Qi(e, t) {
  return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
const tr = "easeInOut", er = 20;
function nr(e, { defaultTransition: t = {}, ...n } = {}, s, i) {
  const r = t.duration || 0.3, a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), u = {}, c = /* @__PURE__ */ new Map();
  let l = 0, f = 0, h = 0;
  for (let d = 0; d < e.length; d++) {
    const y = e[d];
    if (typeof y == "string") {
      c.set(y, f);
      continue;
    } else if (!Array.isArray(y)) {
      c.set(y.name, Be(f, y.at, l, c));
      continue;
    }
    let [g, b, v = {}] = y;
    v.at !== void 0 && (f = Be(f, v.at, l, c));
    let A = 0;
    const w = (S, m, V, C = 0, T = 0) => {
      const x = sr(S), { delay: R = 0, times: I = Sn(x), type: St = "keyframes", repeat: tt, repeatType: ca, repeatDelay: fa = 0, ...es } = m;
      let { ease: $ = t.ease || "easeOut", duration: K } = m;
      const he = typeof R == "function" ? R(C, T) : R, de = x.length, pe = ae(St) ? St : i == null ? void 0 : i[St || "keyframes"];
      if (de <= 2 && pe) {
        let et = 100;
        if (de === 2 && ar(x)) {
          const nt = x[1] - x[0];
          et = Math.abs(nt);
        }
        const mt = { ...es };
        K !== void 0 && (mt.duration = /* @__PURE__ */ E(K));
        const gt = vn(mt, et, pe);
        $ = gt.ease, K = gt.duration;
      }
      K ?? (K = r);
      const me = f + he;
      I.length === 1 && I[0] === 0 && (I[1] = 1);
      const ge = I.length - x.length;
      if (ge > 0 && wn(I, ge), x.length === 1 && x.unshift(null), tt) {
        N(tt < er, "Repeat count too high, must be less than 20", "repeat-count-high"), K = qi(K, tt);
        const et = [...x], mt = [...I];
        $ = Array.isArray($) ? [...$] : [$];
        const gt = [...$];
        for (let nt = 0; nt < tt; nt++) {
          x.push(...et);
          for (let st = 0; st < et.length; st++)
            I.push(mt[st] + (nt + 1)), $.push(st === 0 ? "linear" : on(gt, st - 1));
        }
        Ji(I, tt);
      }
      const ye = me + K;
      Zi(V, x, $, I, me, ye), A = Math.max(he + K, A), h = Math.max(ye, h);
    };
    if (F(g)) {
      const S = $e(g, o);
      w(b, v, We("default", S));
    } else {
      const S = jn(g, b, s, u), m = S.length;
      for (let V = 0; V < m; V++) {
        b = b, v = v;
        const C = S[V], T = $e(C, o);
        for (const x in b)
          w(b[x], ir(v, x), We(x, T), V, m);
      }
    }
    l = f, f += A;
  }
  return o.forEach((d, y) => {
    for (const g in d) {
      const b = d[g];
      b.sort(Qi);
      const v = [], A = [], w = [];
      for (let m = 0; m < b.length; m++) {
        const { at: V, value: C, easing: T } = b[m];
        v.push(C), A.push(/* @__PURE__ */ Xt(0, h, V)), w.push(T || "easeOut");
      }
      A[0] !== 0 && (A.unshift(0), v.unshift(v[0]), w.unshift(tr)), A[A.length - 1] !== 1 && (A.push(1), v.push(null)), a.has(y) || a.set(y, {
        keyframes: {},
        transition: {}
      });
      const S = a.get(y);
      S.keyframes[g] = v, S.transition[g] = {
        ...t,
        duration: h,
        ease: w,
        times: A,
        ...n
      };
    }
  }), a;
}
function $e(e, t) {
  return !t.has(e) && t.set(e, {}), t.get(e);
}
function We(e, t) {
  return t[e] || (t[e] = []), t[e];
}
function sr(e) {
  return Array.isArray(e) ? e : [e];
}
function ir(e, t) {
  return e && e[t] ? {
    ...e,
    ...e[t]
  } : { ...e };
}
const rr = (e) => typeof e == "number", ar = (e) => e.every(rr);
function or(e, t, n, s) {
  const i = Wn(e), r = i.length;
  N(!!r, "No valid elements provided.", "no-valid-elements");
  const a = [];
  for (let u = 0; u < r; u++) {
    const c = i[u], l = { ...n };
    typeof l.delay == "function" && (l.delay = l.delay(u, r));
    for (const f in t) {
      let h = t[f];
      Array.isArray(h) || (h = [h]);
      const d = {
        ...oe(l, f)
      };
      d.duration && (d.duration = /* @__PURE__ */ E(d.duration)), d.delay && (d.delay = /* @__PURE__ */ E(d.delay));
      const y = Mi(c), g = Ai(f, d.pseudoElement || ""), b = y.get(g);
      b && b.stop(), a.push({
        map: y,
        key: g,
        unresolvedKeyframes: h,
        options: {
          ...d,
          element: c,
          name: f,
          allowFlatten: !l.type && !l.ease
        }
      });
    }
  }
  for (let u = 0; u < a.length; u++) {
    const { unresolvedKeyframes: c, options: l } = a[u], { element: f, name: h, pseudoElement: d } = l;
    !d && c[0] === null && (c[0] = ke(f, h)), An(c), Li(c, h), !d && c.length < 2 && c.unshift(ke(f, h)), l.keyframes = c;
  }
  const o = [];
  for (let u = 0; u < a.length; u++) {
    const { map: c, key: l, options: f } = a[u], h = new En(f);
    c.set(l, h), h.finished.finally(() => c.delete(l)), o.push(h);
  }
  return o;
}
const lr = (e) => {
  function t(n, s, i) {
    return new On(or(n, s, i));
  }
  return t;
}, da = /* @__PURE__ */ lr(), ct = /* @__PURE__ */ new WeakMap(), ur = (e) => Array.isArray(e);
function Le(e) {
  const t = [{}, {}];
  return e == null || e.values.forEach((n, s) => {
    t[0][s] = n.get(), t[1][s] = n.getVelocity();
  }), t;
}
function Gn(e, t, n, s) {
  if (typeof t == "function") {
    const [i, r] = Le(s);
    t = t(n !== void 0 ? n : e.custom, i, r);
  }
  if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
    const [i, r] = Le(s);
    t = t(n !== void 0 ? n : e.custom, i, r);
  }
  return t;
}
function cr(e, t, n) {
  const s = e.getProps();
  return Gn(s, t, s.custom, e);
}
function fr(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, ut(n));
}
function hr(e) {
  return ur(e) ? e[e.length - 1] || 0 : e;
}
function dr(e, t) {
  const n = cr(e, t);
  let { transitionEnd: s = {}, transition: i = {}, ...r } = n || {};
  r = { ...r, ...s };
  for (const a in r) {
    const o = hr(r[a]);
    fr(e, a, o);
  }
}
function pr(e) {
  return !!(F(e) && e.add);
}
function mr(e, t) {
  const n = e.getValue("willChange");
  if (pr(n))
    return n.add(t);
  if (!n && k.WillChange) {
    const s = new k.WillChange("auto");
    e.addValue("willChange", s), s.add(t);
  }
}
const ce = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), gr = "framerAppearId", yr = "data-" + ce(gr);
function br(e) {
  return e.props[yr];
}
const Tr = (e) => e !== null;
function vr(e, { repeat: t, repeatType: n = "loop" }, s) {
  const i = e.filter(Tr), r = t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
  return i[r];
}
const Vr = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, wr = (e) => ({
  type: "spring",
  stiffness: 550,
  damping: e === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Sr = {
  type: "keyframes",
  duration: 0.8
}, xr = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Ar = (e, { keyframes: t }) => t.length > 2 ? Sr : Q.has(e) ? e.startsWith("scale") ? wr(t[1]) : Vr : xr;
function Mr({ when: e, delay: t, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: r, repeatType: a, repeatDelay: o, from: u, elapsed: c, ...l }) {
  return !!Object.keys(l).length;
}
const Un = (e, t, n, s = {}, i, r) => (a) => {
  const o = oe(s, e) || {}, u = o.delay || s.delay || 0;
  let { elapsed: c = 0 } = s;
  c = c - /* @__PURE__ */ E(u);
  const l = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...o,
    delay: -c,
    onUpdate: (h) => {
      t.set(h), o.onUpdate && o.onUpdate(h);
    },
    onComplete: () => {
      a(), o.onComplete && o.onComplete();
    },
    name: e,
    motionValue: t,
    element: r ? void 0 : i
  };
  Mr(o) || Object.assign(l, Ar(e, l)), l.duration && (l.duration = /* @__PURE__ */ E(l.duration)), l.repeatDelay && (l.repeatDelay = /* @__PURE__ */ E(l.repeatDelay)), l.from !== void 0 && (l.keyframes[0] = l.from);
  let f = !1;
  if ((l.type === !1 || l.duration === 0 && !l.repeatDelay) && (_t(l), l.delay === 0 && (f = !0)), (k.instantAnimations || k.skipAnimations) && (f = !0, _t(l), l.delay = 0), l.allowFlatten = !o.type && !o.ease, f && !r && t.get() !== void 0) {
    const h = vr(l.keyframes, o);
    if (h !== void 0) {
      B.update(() => {
        l.onUpdate(h), l.onComplete();
      });
      return;
    }
  }
  return o.isSync ? new ie(l) : new Si(l);
};
function Cr({ protectedKeys: e, needsAnimating: t }, n) {
  const s = e.hasOwnProperty(n) && t[n] !== !0;
  return t[n] = !1, s;
}
function Dr(e, t, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  let { transition: r = e.getDefaultTransition(), transitionEnd: a, ...o } = t;
  s && (r = s);
  const u = [], c = i && e.animationState && e.animationState.getState()[i];
  for (const l in o) {
    const f = e.getValue(l, e.latestValues[l] ?? null), h = o[l];
    if (h === void 0 || c && Cr(c, l))
      continue;
    const d = {
      delay: n,
      ...oe(r || {}, l)
    }, y = f.get();
    if (y !== void 0 && !f.isAnimating && !Array.isArray(h) && h === y && !d.velocity)
      continue;
    let g = !1;
    if (window.MotionHandoffAnimation) {
      const v = br(e);
      if (v) {
        const A = window.MotionHandoffAnimation(v, l, B);
        A !== null && (d.startTime = A, g = !0);
      }
    }
    mr(e, l), f.start(Un(l, f, h, e.shouldReduceMotion && In.has(l) ? { type: !1 } : d, e, g));
    const b = f.animation;
    b && u.push(b);
  }
  return a && Promise.all(u).then(() => {
    B.update(() => {
      a && dr(e, a);
    });
  }), u;
}
function Fr({ top: e, left: t, right: n, bottom: s }) {
  return {
    x: { min: t, max: n },
    y: { min: e, max: s }
  };
}
function Rr(e, t) {
  if (!t)
    return e;
  const n = t({ x: e.left, y: e.top }), s = t({ x: e.right, y: e.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function Er(e, t) {
  return Fr(Rr(e.getBoundingClientRect(), t));
}
const _e = {
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
}, Gt = {};
for (const e in _e)
  Gt[e] = {
    isEnabled: (t) => _e[e].some((n) => !!t[n])
  };
const je = () => ({ min: 0, max: 0 }), fe = () => ({
  x: je(),
  y: je()
}), Pr = typeof window < "u", Ut = { current: null }, Yn = { current: !1 };
function Or() {
  if (Yn.current = !0, !!Pr)
    if (window.matchMedia) {
      const e = window.matchMedia("(prefers-reduced-motion)"), t = () => Ut.current = e.matches;
      e.addEventListener("change", t), t();
    } else
      Ut.current = !1;
}
function Nr(e) {
  return e !== null && typeof e == "object" && typeof e.start == "function";
}
function Ir(e) {
  return typeof e == "string" || Array.isArray(e);
}
const Kr = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], kr = ["initial", ...Kr];
function zn(e) {
  return Nr(e.animate) || kr.some((t) => Ir(e[t]));
}
function Br(e) {
  return !!(zn(e) || e.variants);
}
function $r(e, t, n) {
  for (const s in t) {
    const i = t[s], r = n[s];
    if (F(i))
      e.addValue(s, i);
    else if (F(r))
      e.addValue(s, ut(i, { owner: e }));
    else if (r !== i)
      if (e.hasValue(s)) {
        const a = e.getValue(s);
        a.liveStyle === !0 ? a.jump(i) : a.hasAnimated || a.set(i);
      } else {
        const a = e.getStaticValue(s);
        e.addValue(s, ut(a !== void 0 ? a : i, { owner: e }));
      }
  }
  for (const s in n)
    t[s] === void 0 && e.removeValue(s);
  return t;
}
const Ge = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Xn {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, n, s) {
    return {};
  }
  constructor({ parent: t, props: n, presenceContext: s, reducedMotionConfig: i, blockInitialAnimation: r, visualState: a }, o = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = re, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const h = P.now();
      this.renderScheduledAt < h && (this.renderScheduledAt = h, B.render(this.render, !1, !0));
    };
    const { latestValues: u, renderState: c } = a;
    this.latestValues = u, this.baseTarget = { ...u }, this.initialValues = n.initial ? { ...u } : {}, this.renderState = c, this.parent = t, this.props = n, this.presenceContext = s, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = i, this.options = o, this.blockInitialAnimation = !!r, this.isControllingVariants = zn(n), this.isVariantNode = Br(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: l, ...f } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const h in f) {
      const d = f[h];
      u[h] !== void 0 && F(d) && d.set(u[h]);
    }
  }
  mount(t) {
    var n;
    this.current = t, ct.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, i) => this.bindToMotionValue(i, s)), Yn.current || Or(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : Ut.current, process.env.NODE_ENV !== "production" && He(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), (n = this.parent) == null || n.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    var t;
    this.projection && this.projection.unmount(), Rt(this.notifyUpdate), Rt(this.render), this.valueSubscriptions.forEach((n) => n()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
    for (const n in this.events)
      this.events[n].clear();
    for (const n in this.features) {
      const s = this.features[n];
      s && (s.unmount(), s.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
    const s = Q.has(t);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (a) => {
      this.latestValues[t] = a, this.props.onUpdate && B.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let r;
    window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
      i(), r && r(), n.owner && n.stop();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in Gt) {
      const n = Gt[t];
      if (!n)
        continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[t] && i && s(this.props) && (this.features[t] = new i(this)), this.features[t]) {
        const r = this.features[t];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : fe();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, n) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < Ge.length; s++) {
      const i = Ge[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const r = "on" + i, a = t[r];
      a && (this.propEventSubscriptions[i] = this.on(i, a));
    }
    this.prevMotionValues = $r(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
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
  addVariantChild(t) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, n) {
    const s = this.values.get(t);
    n !== s && (s && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const n = this.valueSubscriptions.get(t);
    n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let s = this.values.get(t);
    return s === void 0 && n !== void 0 && (s = ut(n === null ? void 0 : n, { owner: this }), this.addValue(t, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, n) {
    let s = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return s != null && (typeof s == "string" && (Ye(s) || ze(s)) ? s = parseFloat(s) : !Xi(s) && Z.test(n) && (s = $n(t, n)), this.setBaseTarget(t, F(s) ? s.get() : s)), F(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, n) {
    this.baseTarget[t] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    var r;
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const a = Gn(this.props, n, (r = this.presenceContext) == null ? void 0 : r.custom);
      a && (s = a[t]);
    }
    if (n && s !== void 0)
      return s;
    const i = this.getBaseTargetFromProps(this.props, t);
    return i !== void 0 && !F(i) ? i : this.initialValues[t] !== void 0 && s === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, n) {
    return this.events[t] || (this.events[t] = new Xe()), this.events[t].add(n);
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n);
  }
  scheduleRenderMicrotask() {
    Gi.render(this.render);
  }
}
class qn extends Xn {
  constructor() {
    super(...arguments), this.KeyframeResolver = $i;
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0;
  }
  removeValueFromRenderState(t, { vars: n, style: s }) {
    delete n[t], delete s[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    F(t) && (this.childSubscription = t.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
const Wr = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Lr = J.length;
function _r(e, t, n) {
  let s = "", i = !0;
  for (let r = 0; r < Lr; r++) {
    const a = J[r], o = e[a];
    if (o === void 0)
      continue;
    let u = !0;
    if (typeof o == "number" ? u = o === (a.startsWith("scale") ? 1 : 0) : u = parseFloat(o) === 0, !u || n) {
      const c = Ln(o, le[a]);
      if (!u) {
        i = !1;
        const l = Wr[a] || a;
        s += `${l}(${c}) `;
      }
      n && (t[a] = c);
    }
  }
  return s = s.trim(), n ? s = n(t, i ? "" : s) : i && (s = "none"), s;
}
function Hn(e, t, n) {
  const { style: s, vars: i, transformOrigin: r } = e;
  let a = !1, o = !1;
  for (const u in t) {
    const c = t[u];
    if (Q.has(u)) {
      a = !0;
      continue;
    } else if (fn(u)) {
      i[u] = c;
      continue;
    } else {
      const l = Ln(c, le[u]);
      u.startsWith("origin") ? (o = !0, r[u] = l) : s[u] = l;
    }
  }
  if (t.transform || (a || n ? s.transform = _r(t, e.transform, n) : s.transform && (s.transform = "none")), o) {
    const { originX: u = "50%", originY: c = "50%", originZ: l = 0 } = r;
    s.transformOrigin = `${u} ${c} ${l}`;
  }
}
function Zn(e, { style: t, vars: n }, s, i) {
  const r = e.style;
  let a;
  for (a in t)
    r[a] = t[a];
  i == null || i.applyProjectionStyles(r, s);
  for (a in n)
    r.setProperty(a, n[a]);
}
const jr = {};
function Gr(e, { layout: t, layoutId: n }) {
  return Q.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!jr[e] || e === "opacity");
}
function Jn(e, t, n) {
  var r;
  const { style: s } = e, i = {};
  for (const a in s)
    (F(s[a]) || t.style && F(t.style[a]) || Gr(a, e) || ((r = n == null ? void 0 : n.getValue(a)) == null ? void 0 : r.liveStyle) !== void 0) && (i[a] = s[a]);
  return i;
}
function Ur(e) {
  return window.getComputedStyle(e);
}
class Yr extends qn {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Zn;
  }
  readValueFromInstance(t, n) {
    var s;
    if (Q.has(n))
      return (s = this.projection) != null && s.isProjecting ? kt(n) : ni(t, n);
    {
      const i = Ur(t), r = (fn(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Er(t, n);
  }
  build(t, n, s) {
    Hn(t, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, n, s) {
    return Jn(t, n, s);
  }
}
function zr(e, t) {
  return e in t;
}
class Xr extends Xn {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, n) {
    if (zr(n, t)) {
      const s = t[n];
      if (typeof s == "string" || typeof s == "number")
        return s;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(t, n) {
    delete n.output[t];
  }
  measureInstanceViewportBox() {
    return fe();
  }
  build(t, n) {
    Object.assign(t.output, n);
  }
  renderInstance(t, { output: n }) {
    Object.assign(t, n);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const qr = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Hr = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Zr(e, t, n = 1, s = 0, i = !0) {
  e.pathLength = 1;
  const r = i ? qr : Hr;
  e[r.offset] = p.transform(-s);
  const a = p.transform(t), o = p.transform(n);
  e[r.array] = `${a} ${o}`;
}
function Jr(e, {
  attrX: t,
  attrY: n,
  attrScale: s,
  pathLength: i,
  pathSpacing: r = 1,
  pathOffset: a = 0,
  // This is object creation, which we try to avoid per-frame.
  ...o
}, u, c, l) {
  if (Hn(e, o, c), u) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  e.attrs = e.style, e.style = {};
  const { attrs: f, style: h } = e;
  f.transform && (h.transform = f.transform, delete f.transform), (h.transform || f.transformOrigin) && (h.transformOrigin = f.transformOrigin ?? "50% 50%", delete f.transformOrigin), h.transform && (h.transformBox = (l == null ? void 0 : l.transformBox) ?? "fill-box", delete f.transformBox), t !== void 0 && (f.x = t), n !== void 0 && (f.y = n), s !== void 0 && (f.scale = s), i !== void 0 && Zr(f, i, r, a, !1);
}
const Qn = /* @__PURE__ */ new Set([
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
]), Qr = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function ta(e, t, n, s) {
  Zn(e, t, void 0, s);
  for (const i in t.attrs)
    e.setAttribute(Qn.has(i) ? i : ce(i), t.attrs[i]);
}
function ea(e, t, n) {
  const s = Jn(e, t, n);
  for (const i in e)
    if (F(e[i]) || F(t[i])) {
      const r = J.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[r] = e[i];
    }
  return s;
}
class na extends qn {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = fe;
  }
  getBaseTargetFromProps(t, n) {
    return t[n];
  }
  readValueFromInstance(t, n) {
    if (Q.has(n)) {
      const s = Bn(n);
      return s && s.default || 0;
    }
    return n = Qn.has(n) ? n : ce(n), t.getAttribute(n);
  }
  scrapeMotionValuesFromProps(t, n, s) {
    return ea(t, n, s);
  }
  build(t, n, s) {
    Jr(t, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(t, n, s, i) {
    ta(t, n, s, i);
  }
  mount(t) {
    this.isSVGTag = Qr(t.tagName), super.mount(t);
  }
}
function sa(e) {
  const t = {
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
  }, n = _n(e) && !Ui(e) ? new na(t) : new Yr(t);
  n.mount(e), ct.set(e, n);
}
function ia(e) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new Xr(t);
  n.mount(e), ct.set(e, n);
}
function ra(e, t, n) {
  const s = F(e) ? e : ut(e);
  return s.start(Un("", s, t, n)), s.animation;
}
function aa(e, t) {
  return F(e) || typeof e == "number" || typeof e == "string" && !ue(t);
}
function ts(e, t, n, s) {
  const i = [];
  if (aa(e, t))
    i.push(ra(e, ue(t) && t.default || t, n && (n.default || n)));
  else {
    const r = jn(e, t, s), a = r.length;
    N(!!a, "No valid elements provided.", "no-valid-elements");
    for (let o = 0; o < a; o++) {
      const u = r[o];
      N(u !== null, "You're trying to perform an animation on null. Ensure that selectors are correctly finding elements and refs are correctly hydrated.", "animate-null");
      const c = u instanceof Element ? sa : ia;
      ct.has(u) || c(u);
      const l = ct.get(u), f = { ...n };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(o, a)), i.push(...Dr(l, { ...t, transition: f }, {}));
    }
  }
  return i;
}
function oa(e, t, n) {
  const s = [];
  return nr(e, t, n, { spring: lt }).forEach(({ keyframes: r, transition: a }, o) => {
    s.push(...ts(o, r, a));
  }), s;
}
function la(e) {
  return Array.isArray(e) && e.some(Array.isArray);
}
function ua(e) {
  function t(n, s, i) {
    let r = [], a;
    if (la(n))
      r = oa(n, s, e);
    else {
      const { onComplete: u, ...c } = i || {};
      typeof u == "function" && (a = u), r = ts(n, s, c, e);
    }
    const o = new On(r);
    return a && o.finished.then(a), o;
  }
  return t;
}
const pa = ua();
export {
  da as a,
  pa as b,
  ha as s
};
