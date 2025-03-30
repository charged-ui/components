function Kt(t, e, n) {
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
let le = L, _ = L;
le = (t, e) => {
  !t && typeof console < "u" && console.warn(e);
}, _ = (t, e) => {
  if (!t)
    throw new Error(e);
};
const Se = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s === 0 ? 1 : (n - t) / s;
};
// @__NO_SIDE_EFFECTS__
function _e(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const $n = /* @__PURE__ */ _e(() => window.ScrollTimeline !== void 0);
class Wn {
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
      if ($n() && i.attachTimeline)
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
class Nt extends Wn {
  then(e, n) {
    return Promise.all(this.animations).then(e).catch(n);
  }
}
const I = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, B = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3, ye = 2e4;
function $e(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < ye; )
    e += n, s = t.next(e);
  return e >= ye ? 1 / 0 : e;
}
const kt = (t, e, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(e / n), 2);
  for (let r = 0; r < i; r++)
    s += t(/* @__PURE__ */ Se(0, i - 1, r)) + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, U = (t, e, n) => n > e ? e : n < t ? t : n;
function Lt(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const Un = 5;
function _t(t, e, n) {
  const s = Math.max(e - Un, 0);
  return Lt(n - t(s), e - s);
}
const x = {
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
}, ct = 1e-3;
function Gn({ duration: t = x.duration, bounce: e = x.bounce, velocity: n = x.velocity, mass: s = x.mass }) {
  let i, r;
  le(t <= /* @__PURE__ */ I(x.maxDuration), "Spring duration must be 10 seconds or less");
  let o = 1 - e;
  o = U(x.minDamping, x.maxDamping, o), t = U(x.minDuration, x.maxDuration, /* @__PURE__ */ B(t)), o < 1 ? (i = (c) => {
    const u = c * o, f = u * t, h = u - n, y = Fe(c, o), g = Math.exp(-f);
    return ct - h / y * g;
  }, r = (c) => {
    const f = c * o * t, h = f * n + n, y = Math.pow(o, 2) * Math.pow(c, 2) * t, g = Math.exp(-f), b = Fe(Math.pow(c, 2), o);
    return (-i(c) + ct > 0 ? -1 : 1) * ((h - y) * g) / b;
  }) : (i = (c) => {
    const u = Math.exp(-c * t), f = (c - n) * t + 1;
    return -1e-3 + u * f;
  }, r = (c) => {
    const u = Math.exp(-c * t), f = (n - c) * (t * t);
    return u * f;
  });
  const a = 5 / t, l = zn(i, r, a);
  if (t = /* @__PURE__ */ I(t), isNaN(l))
    return {
      stiffness: x.stiffness,
      damping: x.damping,
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
const jn = 12;
function zn(t, e, n) {
  let s = n;
  for (let i = 1; i < jn; i++)
    s = s - t(s) / e(s);
  return s;
}
function Fe(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const qn = ["duration", "bounce"], Yn = ["stiffness", "damping", "mass"];
function ft(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Xn(t) {
  let e = {
    velocity: x.velocity,
    stiffness: x.stiffness,
    damping: x.damping,
    mass: x.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!ft(t, Yn) && ft(t, qn))
    if (t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, r = 2 * U(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = {
        ...e,
        mass: x.mass,
        stiffness: i,
        damping: r
      };
    } else {
      const n = Gn(t);
      e = {
        ...e,
        ...n,
        mass: x.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function We(t = x.visualDuration, e = x.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: i } = n;
  const r = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: c, mass: u, duration: f, velocity: h, isResolvedFromDuration: y } = Xn({
    ...n,
    velocity: -/* @__PURE__ */ B(n.velocity || 0)
  }), g = h || 0, b = c / (2 * Math.sqrt(l * u)), T = o - r, p = /* @__PURE__ */ B(Math.sqrt(l / u)), V = Math.abs(T) < 5;
  s || (s = V ? x.restSpeed.granular : x.restSpeed.default), i || (i = V ? x.restDelta.granular : x.restDelta.default);
  let M;
  if (b < 1) {
    const m = Fe(p, b);
    M = (S) => {
      const P = Math.exp(-b * p * S);
      return o - P * ((g + b * p * T) / m * Math.sin(m * S) + T * Math.cos(m * S));
    };
  } else if (b === 1)
    M = (m) => o - Math.exp(-p * m) * (T + (g + p * T) * m);
  else {
    const m = p * Math.sqrt(b * b - 1);
    M = (S) => {
      const P = Math.exp(-b * p * S), v = Math.min(m * S, 300);
      return o - P * ((g + b * p * T) * Math.sinh(v) + m * T * Math.cosh(v)) / m;
    };
  }
  const A = {
    calculatedDuration: y && f || null,
    next: (m) => {
      const S = M(m);
      if (y)
        a.done = m >= f;
      else {
        let P = 0;
        b < 1 && (P = m === 0 ? /* @__PURE__ */ I(g) : _t(M, m, S));
        const v = Math.abs(P) <= s, w = Math.abs(o - S) <= i;
        a.done = v && w;
      }
      return a.value = a.done ? o : S, a;
    },
    toString: () => {
      const m = Math.min($e(A), ye), S = kt((P) => A.next(m * P).value, m, 30);
      return m + "ms " + S;
    }
  };
  return A;
}
function Hn(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), i = Math.min($e(s), ye);
  return {
    type: "keyframes",
    ease: (r) => s.next(i * r).value / e,
    duration: /* @__PURE__ */ B(i)
  };
}
function we(t) {
  return typeof t == "function";
}
const Zn = (t, e, n) => {
  const s = e - t;
  return ((n - t) % s + s) % s + t;
}, $t = (t) => Array.isArray(t) && typeof t[0] != "number";
function Wt(t, e) {
  return $t(t) ? t[Zn(0, t.length, e)] : t;
}
const ue = (t, e, n) => t + (e - t) * n;
function Ut(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = /* @__PURE__ */ Se(0, e, s);
    t.push(ue(n, 1, i));
  }
}
function Gt(t) {
  const e = [0];
  return Ut(e, t.length - 1), e;
}
const F = (t) => !!(t && t.getVelocity);
function Ue(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function jt(t, e, n, s) {
  return typeof t == "string" && Ue(e) ? Kt(t, n, s) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t : [t];
}
function Qn(t, e, n) {
  return t * (e + 1);
}
function ht(t, e, n, s) {
  var i;
  return typeof e == "number" ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : e === "<" ? n : (i = s.get(e)) !== null && i !== void 0 ? i : t;
}
function Jn(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function zt(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function es(t, e, n) {
  for (let s = 0; s < t.length; s++) {
    const i = t[s];
    i.at > e && i.at < n && (zt(t, i), s--);
  }
}
function ts(t, e, n, s, i, r) {
  es(t, i, r);
  for (let o = 0; o < e.length; o++)
    t.push({
      value: e[o],
      at: ue(i, r, s[o]),
      easing: Wt(n, o)
    });
}
function ns(t, e) {
  for (let n = 0; n < t.length; n++)
    t[n] = t[n] / (e + 1);
}
function ss(t, e) {
  return t.at === e.at ? t.value === null ? 1 : e.value === null ? -1 : 0 : t.at - e.at;
}
const is = "easeInOut", rs = 20;
function os(t, { defaultTransition: e = {}, ...n } = {}, s, i) {
  const r = e.duration || 0.3, o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), l = {}, c = /* @__PURE__ */ new Map();
  let u = 0, f = 0, h = 0;
  for (let y = 0; y < t.length; y++) {
    const g = t[y];
    if (typeof g == "string") {
      c.set(g, f);
      continue;
    } else if (!Array.isArray(g)) {
      c.set(g.name, ht(f, g.at, u, c));
      continue;
    }
    let [b, T, p = {}] = g;
    p.at !== void 0 && (f = ht(f, p.at, u, c));
    let V = 0;
    const M = (A, m, S, P = 0, v = 0) => {
      const w = as(A), { delay: D = 0, times: E = Gt(w), type: Ae = "keyframes", repeat: Z, repeatType: Nr, repeatDelay: kr = 0, ..._n } = m;
      let { ease: K = e.ease || "easeOut", duration: R } = m;
      const it = typeof D == "function" ? D(P, v) : D, rt = w.length, ot = we(Ae) ? Ae : i == null ? void 0 : i[Ae];
      if (rt <= 2 && ot) {
        let Q = 100;
        if (rt === 2 && cs(w)) {
          const J = w[1] - w[0];
          Q = Math.abs(J);
        }
        const he = { ..._n };
        R !== void 0 && (he.duration = /* @__PURE__ */ I(R));
        const de = Hn(he, Q, ot);
        K = de.ease, R = de.duration;
      }
      R ?? (R = r);
      const at = f + it;
      E.length === 1 && E[0] === 0 && (E[1] = 1);
      const lt = E.length - w.length;
      if (lt > 0 && Ut(E, lt), w.length === 1 && w.unshift(null), Z) {
        _(Z < rs, "Repeat count too high, must be less than 20"), R = Qn(R, Z);
        const Q = [...w], he = [...E];
        K = Array.isArray(K) ? [...K] : [K];
        const de = [...K];
        for (let J = 0; J < Z; J++) {
          w.push(...Q);
          for (let ee = 0; ee < Q.length; ee++)
            E.push(he[ee] + (J + 1)), K.push(ee === 0 ? "linear" : Wt(de, ee - 1));
        }
        ns(E, Z);
      }
      const ut = at + R;
      ts(S, w, K, E, at, ut), V = Math.max(it + R, V), h = Math.max(ut, h);
    };
    if (F(b)) {
      const A = dt(b, a);
      M(T, p, pt("default", A));
    } else {
      const A = jt(b, T, s, l), m = A.length;
      for (let S = 0; S < m; S++) {
        T = T, p = p;
        const P = A[S], v = dt(P, a);
        for (const w in T)
          M(T[w], ls(p, w), pt(w, v), S, m);
      }
    }
    u = f, f += V;
  }
  return a.forEach((y, g) => {
    for (const b in y) {
      const T = y[b];
      T.sort(ss);
      const p = [], V = [], M = [];
      for (let m = 0; m < T.length; m++) {
        const { at: S, value: P, easing: v } = T[m];
        p.push(P), V.push(/* @__PURE__ */ Se(0, h, S)), M.push(v || "easeOut");
      }
      V[0] !== 0 && (V.unshift(0), p.unshift(p[0]), M.unshift(is)), V[V.length - 1] !== 1 && (V.push(1), p.push(null)), o.has(g) || o.set(g, {
        keyframes: {},
        transition: {}
      });
      const A = o.get(g);
      A.keyframes[b] = p, A.transition[b] = {
        ...e,
        duration: h,
        ease: M,
        times: V,
        ...n
      };
    }
  }), o;
}
function dt(t, e) {
  return !e.has(t) && e.set(t, {}), e.get(t);
}
function pt(t, e) {
  return e[t] || (e[t] = []), e[t];
}
function as(t) {
  return Array.isArray(t) ? t : [t];
}
function ls(t, e) {
  return t && t[e] ? {
    ...t,
    ...t[e]
  } : { ...t };
}
const us = (t) => typeof t == "number", cs = (t) => t.every(us), ie = /* @__PURE__ */ new WeakMap();
function qt(t, e) {
  return t ? t[e] || t.default || t : void 0;
}
const q = [
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
], Y = new Set(q), Yt = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...q
]), fs = (t) => Array.isArray(t), hs = (t) => fs(t) ? t[t.length - 1] || 0 : t, ds = {
  skipAnimations: !1,
  useManualTiming: !1
}, pe = [
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
function ps(t, e) {
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
    schedule: (u, f = !1, h = !1) => {
      const g = h && i ? n : s;
      return f && o.add(u), g.has(u) || g.add(u), u;
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
const ms = 40;
function gs(t, e) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, o = pe.reduce((p, V) => (p[V] = ps(r), p), {}), { read: a, resolveKeyframes: l, update: c, preRender: u, render: f, postRender: h } = o, y = () => {
    const p = performance.now();
    n = !1, i.delta = s ? 1e3 / 60 : Math.max(Math.min(p - i.timestamp, ms), 1), i.timestamp = p, i.isProcessing = !0, a.process(i), l.process(i), c.process(i), u.process(i), f.process(i), h.process(i), i.isProcessing = !1, n && e && (s = !1, t(y));
  }, g = () => {
    n = !0, s = !0, i.isProcessing || t(y);
  };
  return { schedule: pe.reduce((p, V) => {
    const M = o[V];
    return p[V] = (A, m = !1, S = !1) => (n || g(), M.schedule(A, m, S)), p;
  }, {}), cancel: (p) => {
    for (let V = 0; V < pe.length; V++)
      o[pe[V]].cancel(p);
  }, state: i, steps: o };
}
const { schedule: O, cancel: De, state: ve, steps: Lr } = gs(typeof requestAnimationFrame < "u" ? requestAnimationFrame : L, !0);
let ge;
function ys() {
  ge = void 0;
}
const k = {
  now: () => (ge === void 0 && k.set(ve.isProcessing || ds.useManualTiming ? ve.timestamp : performance.now()), ge),
  set: (t) => {
    ge = t, queueMicrotask(ys);
  }
};
class Xt {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Jn(this.subscriptions, e), () => zt(this.subscriptions, e);
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
const mt = /* @__PURE__ */ new Set();
function Ht(t, e, n) {
  t || mt.has(e) || (console.warn(e), mt.add(e));
}
const gt = 30, vs = (t) => !isNaN(parseFloat(t));
class bs {
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
      const r = k.now();
      this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && this.events.change && this.events.change.notify(this.current), i && this.events.renderRequest && this.events.renderRequest.notify(this.current);
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = k.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = vs(this.current));
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
    return Ht(!1, 'value.onChange(callback) is deprecated. Switch to value.on("change", callback).'), this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new Xt());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), O.read(() => {
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
    const e = k.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > gt)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, gt);
    return Lt(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
function re(t, e) {
  return new bs(t, e);
}
function yt(t) {
  const e = [{}, {}];
  return t == null || t.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function Zt(t, e, n, s) {
  if (typeof e == "function") {
    const [i, r] = yt(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [i, r] = yt(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  return e;
}
function Ts(t, e, n) {
  const s = t.getProps();
  return Zt(s, e, s.custom, t);
}
function Vs(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, re(n));
}
function Ss(t, e) {
  const n = Ts(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...r } = n || {};
  r = { ...r, ...s };
  for (const o in r) {
    const a = hs(r[o]);
    Vs(t, o, a);
  }
}
function ws(t) {
  return !!(F(t) && t.add);
}
function xs(t, e) {
  const n = t.getValue("willChange");
  if (ws(n))
    return n.add(e);
}
const Ge = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), As = "framerAppearId", Ms = "data-" + Ge(As);
function Ps(t) {
  return t.props[Ms];
}
function vt(t, e) {
  t.timeline = e, t.onfinish = null;
}
const je = (t) => Array.isArray(t) && typeof t[0] == "number", Cs = {
  linearEasing: void 0
};
function Fs(t, e) {
  const n = /* @__PURE__ */ _e(t);
  return () => {
    var s;
    return (s = Cs[e]) !== null && s !== void 0 ? s : n();
  };
}
const be = /* @__PURE__ */ Fs(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing");
function Qt(t) {
  return !!(typeof t == "function" && be() || !t || typeof t == "string" && (t in Re || be()) || je(t) || Array.isArray(t) && t.every(Qt));
}
const te = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, Re = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ te([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ te([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ te([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ te([0.33, 1.53, 0.69, 0.99])
};
function Jt(t, e) {
  if (t)
    return typeof t == "function" && be() ? kt(t, e) : je(t) ? te(t) : Array.isArray(t) ? t.map((n) => Jt(n, e) || Re.easeOut) : Re[t];
}
const en = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, Ds = 1e-7, Rs = 12;
function Es(t, e, n, s, i) {
  let r, o, a = 0;
  do
    o = e + (n - e) / 2, r = en(o, s, i) - t, r > 0 ? n = o : e = o;
  while (Math.abs(r) > Ds && ++a < Rs);
  return o;
}
function ce(t, e, n, s) {
  if (t === e && n === s)
    return L;
  const i = (r) => Es(r, 0, 1, t, n);
  return (r) => r === 0 || r === 1 ? r : en(i(r), e, s);
}
const tn = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, nn = (t) => (e) => 1 - t(1 - e), sn = /* @__PURE__ */ ce(0.33, 1.53, 0.69, 0.99), ze = /* @__PURE__ */ nn(sn), rn = /* @__PURE__ */ tn(ze), on = (t) => (t *= 2) < 1 ? 0.5 * ze(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), qe = (t) => 1 - Math.sin(Math.acos(t)), Is = nn(qe), an = tn(qe), ln = (t) => /^0[^.\s]+$/u.test(t);
function Os(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || ln(t) : !0;
}
const X = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, oe = {
  ...X,
  transform: (t) => U(0, 1, t)
}, me = {
  ...X,
  default: 1
}, ne = (t) => Math.round(t * 1e5) / 1e5, Ye = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Bs(t) {
  return t == null;
}
const Ks = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Xe = (t, e) => (n) => !!(typeof n == "string" && Ks.test(n) && n.startsWith(t) || e && !Bs(n) && Object.prototype.hasOwnProperty.call(n, e)), un = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, r, o, a] = s.match(Ye);
  return {
    [t]: parseFloat(i),
    [e]: parseFloat(r),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Ns = (t) => U(0, 255, t), Me = {
  ...X,
  transform: (t) => Math.round(Ns(t))
}, $ = {
  test: /* @__PURE__ */ Xe("rgb", "red"),
  parse: /* @__PURE__ */ un("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Me.transform(t) + ", " + Me.transform(e) + ", " + Me.transform(n) + ", " + ne(oe.transform(s)) + ")"
};
function ks(t) {
  let e = "", n = "", s = "", i = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const Ee = {
  test: /* @__PURE__ */ Xe("#"),
  parse: ks,
  transform: $.transform
}, fe = (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), N = /* @__PURE__ */ fe("deg"), j = /* @__PURE__ */ fe("%"), d = /* @__PURE__ */ fe("px"), Ls = /* @__PURE__ */ fe("vh"), _s = /* @__PURE__ */ fe("vw"), bt = {
  ...j,
  parse: (t) => j.parse(t) / 100,
  transform: (t) => j.transform(t * 100)
}, G = {
  test: /* @__PURE__ */ Xe("hsl", "hue"),
  parse: /* @__PURE__ */ un("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + j.transform(ne(e)) + ", " + j.transform(ne(n)) + ", " + ne(oe.transform(s)) + ")"
}, C = {
  test: (t) => $.test(t) || Ee.test(t) || G.test(t),
  parse: (t) => $.test(t) ? $.parse(t) : G.test(t) ? G.parse(t) : Ee.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? $.transform(t) : G.transform(t)
}, $s = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Ws(t) {
  var e, n;
  return isNaN(t) && typeof t == "string" && (((e = t.match(Ye)) === null || e === void 0 ? void 0 : e.length) || 0) + (((n = t.match($s)) === null || n === void 0 ? void 0 : n.length) || 0) > 0;
}
const cn = "number", fn = "color", Us = "var", Gs = "var(", Tt = "${}", js = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function ae(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let r = 0;
  const a = e.replace(js, (l) => (C.test(l) ? (s.color.push(r), i.push(fn), n.push(C.parse(l))) : l.startsWith(Gs) ? (s.var.push(r), i.push(Us), n.push(l)) : (s.number.push(r), i.push(cn), n.push(parseFloat(l))), ++r, Tt)).split(Tt);
  return { values: n, split: a, indexes: s, types: i };
}
function hn(t) {
  return ae(t).values;
}
function dn(t) {
  const { split: e, types: n } = ae(t), s = e.length;
  return (i) => {
    let r = "";
    for (let o = 0; o < s; o++)
      if (r += e[o], i[o] !== void 0) {
        const a = n[o];
        a === cn ? r += ne(i[o]) : a === fn ? r += C.transform(i[o]) : r += i[o];
      }
    return r;
  };
}
const zs = (t) => typeof t == "number" ? 0 : t;
function qs(t) {
  const e = hn(t);
  return dn(t)(e.map(zs));
}
const H = {
  test: Ws,
  parse: hn,
  createTransformer: dn,
  getAnimatableNone: qs
}, Ys = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Xs(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(Ye) || [];
  if (!s)
    return t;
  const i = n.replace(s, "");
  let r = Ys.has(e) ? 1 : 0;
  return s !== n && (r *= 100), e + "(" + r + i + ")";
}
const Hs = /\b([a-z-]*)\(.*?\)/gu, Ie = {
  ...H,
  getAnimatableNone: (t) => {
    const e = t.match(Hs);
    return e ? e.map(Xs).join(" ") : t;
  }
}, Zs = {
  // Border props
  borderWidth: d,
  borderTopWidth: d,
  borderRightWidth: d,
  borderBottomWidth: d,
  borderLeftWidth: d,
  borderRadius: d,
  radius: d,
  borderTopLeftRadius: d,
  borderTopRightRadius: d,
  borderBottomRightRadius: d,
  borderBottomLeftRadius: d,
  // Positioning props
  width: d,
  maxWidth: d,
  height: d,
  maxHeight: d,
  top: d,
  right: d,
  bottom: d,
  left: d,
  // Spacing props
  padding: d,
  paddingTop: d,
  paddingRight: d,
  paddingBottom: d,
  paddingLeft: d,
  margin: d,
  marginTop: d,
  marginRight: d,
  marginBottom: d,
  marginLeft: d,
  // Misc
  backgroundPositionX: d,
  backgroundPositionY: d
}, Qs = {
  rotate: N,
  rotateX: N,
  rotateY: N,
  rotateZ: N,
  scale: me,
  scaleX: me,
  scaleY: me,
  scaleZ: me,
  skew: N,
  skewX: N,
  skewY: N,
  distance: d,
  translateX: d,
  translateY: d,
  translateZ: d,
  x: d,
  y: d,
  z: d,
  perspective: d,
  transformPerspective: d,
  opacity: oe,
  originX: bt,
  originY: bt,
  originZ: d
}, Vt = {
  ...X,
  transform: Math.round
}, He = {
  ...Zs,
  ...Qs,
  zIndex: Vt,
  size: d,
  // SVG
  fillOpacity: oe,
  strokeOpacity: oe,
  numOctaves: Vt
}, Js = {
  ...He,
  // Color props
  color: C,
  backgroundColor: C,
  outlineColor: C,
  fill: C,
  stroke: C,
  // Border props
  borderColor: C,
  borderTopColor: C,
  borderRightColor: C,
  borderBottomColor: C,
  borderLeftColor: C,
  filter: Ie,
  WebkitFilter: Ie
}, Ze = (t) => Js[t];
function pn(t, e) {
  let n = Ze(t);
  return n !== Ie && (n = H), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const ei = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function ti(t, e, n) {
  let s = 0, i;
  for (; s < t.length && !i; ) {
    const r = t[s];
    typeof r == "string" && !ei.has(r) && ae(r).values.length && (i = t[s]), s++;
  }
  if (i && n)
    for (const r of e)
      t[r] = pn(n, i);
}
const St = (t) => t === X || t === d, wt = (t, e) => parseFloat(t.split(", ")[e]), xt = (t, e) => (n, { transform: s }) => {
  if (s === "none" || !s)
    return 0;
  const i = s.match(/^matrix3d\((.+)\)$/u);
  if (i)
    return wt(i[1], e);
  {
    const r = s.match(/^matrix\((.+)\)$/u);
    return r ? wt(r[1], t) : 0;
  }
}, ni = /* @__PURE__ */ new Set(["x", "y", "z"]), si = q.filter((t) => !ni.has(t));
function ii(t) {
  const e = [];
  return si.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const z = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: xt(4, 13),
  y: xt(5, 14)
};
z.translateX = z.x;
z.translateY = z.y;
const W = /* @__PURE__ */ new Set();
let Oe = !1, Be = !1;
function mn() {
  if (Be) {
    const t = Array.from(W).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const i = ii(s);
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
  Be = !1, Oe = !1, W.forEach((t) => t.complete()), W.clear();
}
function gn() {
  W.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Be = !0);
  });
}
function ri() {
  gn(), mn();
}
class Qe {
  constructor(e, n, s, i, r, o = !1) {
    this.isComplete = !1, this.isAsync = !1, this.needsMeasurement = !1, this.isScheduled = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = i, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.isScheduled = !0, this.isAsync ? (W.add(this), Oe || (Oe = !0, O.read(gn), O.resolveKeyframes(mn))) : (this.readKeyframes(), this.complete());
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
    this.isComplete = !0, this.onComplete(this.unresolvedKeyframes, this.finalKeyframe), W.delete(this);
  }
  cancel() {
    this.isComplete || (this.isScheduled = !1, W.delete(this));
  }
  resume() {
    this.isComplete || this.scheduleResolve();
  }
}
const yn = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), vn = (t) => (e) => typeof e == "string" && e.startsWith(t), bn = /* @__PURE__ */ vn("--"), oi = /* @__PURE__ */ vn("var(--"), Je = (t) => oi(t) ? ai.test(t.split("/*")[0].trim()) : !1, ai = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, li = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function ui(t) {
  const e = li.exec(t);
  if (!e)
    return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
const ci = 4;
function Tn(t, e, n = 1) {
  _(n <= ci, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`);
  const [s, i] = ui(t);
  if (!s)
    return;
  const r = window.getComputedStyle(e).getPropertyValue(s);
  if (r) {
    const o = r.trim();
    return yn(o) ? parseFloat(o) : o;
  }
  return Je(i) ? Tn(i, e, n + 1) : i;
}
const Vn = (t) => (e) => e.test(t), fi = {
  test: (t) => t === "auto",
  parse: (t) => t
}, Sn = [X, d, j, N, _s, Ls, fi], At = (t) => Sn.find(Vn(t));
class wn extends Qe {
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
      if (typeof c == "string" && (c = c.trim(), Je(c))) {
        const u = Tn(c, n.current);
        u !== void 0 && (e[l] = u), l === e.length - 1 && (this.finalKeyframe = c);
      }
    }
    if (this.resolveNoneKeyframes(), !Yt.has(s) || e.length !== 2)
      return;
    const [i, r] = e, o = At(i), a = At(r);
    if (o !== a)
      if (St(o) && St(a))
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
      Os(e[i]) && s.push(i);
    s.length && ti(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = z[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
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
    i[o] = z[s](n.measureViewportBox(), window.getComputedStyle(n.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), !((e = this.removedTransforms) === null || e === void 0) && e.length && this.removedTransforms.forEach(([l, c]) => {
      n.getValue(l).set(c);
    }), this.resolveNoneKeyframes();
  }
}
const Mt = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(H.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function hi(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function di(t, e, n, s) {
  const i = t[0];
  if (i === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const r = t[t.length - 1], o = Mt(i, e), a = Mt(r, e);
  return le(o === a, `You are trying to animate ${e} from "${i}" to "${r}". ${i} is not an animatable value - to enable this animation set ${i} to a value animatable to ${r} via the \`style\` property.`), !o || !a ? !1 : hi(t) || (n === "spring" || we(n)) && s;
}
const pi = (t) => t !== null;
function xe(t, { repeat: e, repeatType: n = "loop" }, s) {
  const i = t.filter(pi), r = e && n !== "loop" && e % 2 === 1 ? 0 : i.length - 1;
  return !r || s === void 0 ? i[r] : s;
}
const mi = 40;
class xn {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: r = 0, repeatType: o = "loop", ...a }) {
    this.isStopped = !1, this.hasAttemptedResolve = !1, this.createdAt = k.now(), this.options = {
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
    return this.resolvedAt ? this.resolvedAt - this.createdAt > mi ? this.resolvedAt : this.createdAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    return !this._resolved && !this.hasAttemptedResolve && ri(), this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(e, n) {
    this.resolvedAt = k.now(), this.hasAttemptedResolve = !0;
    const { name: s, type: i, velocity: r, delay: o, onComplete: a, onUpdate: l, isGenerator: c } = this.options;
    if (!c && !di(e, s, i, r))
      if (o)
        this.options.duration = 0;
      else {
        l && l(xe(e, this.options, n)), a && a(), this.resolveFinishedPromise();
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
function Pe(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function gi({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let i = 0, r = 0, o = 0;
  if (!e)
    i = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    i = Pe(l, a, t + 1 / 3), r = Pe(l, a, t), o = Pe(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function Te(t, e) {
  return (n) => n > 0 ? e : t;
}
const Ce = (t, e, n) => {
  const s = t * t, i = n * (e * e - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, yi = [Ee, $, G], vi = (t) => yi.find((e) => e.test(t));
function Pt(t) {
  const e = vi(t);
  if (le(!!e, `'${t}' is not an animatable color. Use the equivalent color code instead.`), !e)
    return !1;
  let n = e.parse(t);
  return e === G && (n = gi(n)), n;
}
const Ct = (t, e) => {
  const n = Pt(t), s = Pt(e);
  if (!n || !s)
    return Te(t, e);
  const i = { ...n };
  return (r) => (i.red = Ce(n.red, s.red, r), i.green = Ce(n.green, s.green, r), i.blue = Ce(n.blue, s.blue, r), i.alpha = ue(n.alpha, s.alpha, r), $.transform(i));
}, bi = (t, e) => (n) => e(t(n)), et = (...t) => t.reduce(bi), Ke = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ti(t, e) {
  return Ke.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function Vi(t, e) {
  return (n) => ue(t, e, n);
}
function tt(t) {
  return typeof t == "number" ? Vi : typeof t == "string" ? Je(t) ? Te : C.test(t) ? Ct : xi : Array.isArray(t) ? An : typeof t == "object" ? C.test(t) ? Ct : Si : Te;
}
function An(t, e) {
  const n = [...t], s = n.length, i = t.map((r, o) => tt(r)(r, e[o]));
  return (r) => {
    for (let o = 0; o < s; o++)
      n[o] = i[o](r);
    return n;
  };
}
function Si(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = tt(t[i])(t[i], e[i]));
  return (i) => {
    for (const r in s)
      n[r] = s[r](i);
    return n;
  };
}
function wi(t, e) {
  var n;
  const s = [], i = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const o = e.types[r], a = t.indexes[o][i[o]], l = (n = t.values[a]) !== null && n !== void 0 ? n : 0;
    s[r] = l, i[o]++;
  }
  return s;
}
const xi = (t, e) => {
  const n = H.createTransformer(e), s = ae(t), i = ae(e);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? Ke.has(t) && !i.values.length || Ke.has(e) && !s.values.length ? Ti(t, e) : et(An(wi(s, i), i.values), n) : (le(!0, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`), Te(t, e));
};
function Mn(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? ue(t, e, n) : tt(t)(t, e);
}
function Ft({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: c = 0.5, restSpeed: u }) {
  const f = t[0], h = {
    done: !1,
    value: f
  }, y = (v) => a !== void 0 && v < a || l !== void 0 && v > l, g = (v) => a === void 0 ? l : l === void 0 || Math.abs(a - v) < Math.abs(l - v) ? a : l;
  let b = n * e;
  const T = f + b, p = o === void 0 ? T : o(T);
  p !== T && (b = p - f);
  const V = (v) => -b * Math.exp(-v / s), M = (v) => p + V(v), A = (v) => {
    const w = V(v), D = M(v);
    h.done = Math.abs(w) <= c, h.value = h.done ? p : D;
  };
  let m, S;
  const P = (v) => {
    y(h.value) && (m = v, S = We({
      keyframes: [h.value, g(h.value)],
      velocity: _t(M, v, h.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: r,
      restDelta: c,
      restSpeed: u
    }));
  };
  return P(0), {
    calculatedDuration: null,
    next: (v) => {
      let w = !1;
      return !S && m === void 0 && (w = !0, A(v), P(v)), m !== void 0 && v >= m ? S.next(v - m) : (!w && A(v), h);
    }
  };
}
const Ai = /* @__PURE__ */ ce(0.42, 0, 1, 1), Mi = /* @__PURE__ */ ce(0, 0, 0.58, 1), Pn = /* @__PURE__ */ ce(0.42, 0, 0.58, 1), Dt = {
  linear: L,
  easeIn: Ai,
  easeInOut: Pn,
  easeOut: Mi,
  circIn: qe,
  circInOut: an,
  circOut: Is,
  backIn: ze,
  backInOut: rn,
  backOut: sn,
  anticipate: on
}, Ne = (t) => {
  if (je(t)) {
    _(t.length === 4, "Cubic bezier arrays must contain four numerical values.");
    const [e, n, s, i] = t;
    return ce(e, n, s, i);
  } else if (typeof t == "string")
    return _(Dt[t] !== void 0, `Invalid easing type '${t}'`), Dt[t];
  return t;
};
function Pi(t, e, n) {
  const s = [], i = n || Mn, r = t.length - 1;
  for (let o = 0; o < r; o++) {
    let a = i(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || L : e;
      a = et(l, a);
    }
    s.push(a);
  }
  return s;
}
function Ci(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const r = t.length;
  if (_(r === e.length, "Both input and output ranges must be the same length"), r === 1)
    return () => e[0];
  if (r === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = Pi(e, s, i), l = a.length, c = (u) => {
    if (o && u < t[0])
      return e[0];
    let f = 0;
    if (l > 1)
      for (; f < t.length - 2 && !(u < t[f + 1]); f++)
        ;
    const h = /* @__PURE__ */ Se(t[f], t[f + 1], u);
    return a[f](h);
  };
  return n ? (u) => c(U(t[0], t[r - 1], u)) : c;
}
function Fi(t, e) {
  return t.map((n) => n * e);
}
function Di(t, e) {
  return t.map(() => e || Pn).splice(0, t.length - 1);
}
function se({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const i = $t(s) ? s.map(Ne) : Ne(s), r = {
    done: !1,
    value: e[0]
  }, o = Fi(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : Gt(e),
    t
  ), a = Ci(o, e, {
    ease: Array.isArray(i) ? i : Di(e, i)
  });
  return {
    calculatedDuration: t,
    next: (l) => (r.value = a(l), r.done = l >= t, r)
  };
}
const Ri = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: () => O.update(e, !0),
    stop: () => De(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => ve.isProcessing ? ve.timestamp : k.now()
  };
}, Ei = {
  decay: Ft,
  inertia: Ft,
  tween: se,
  keyframes: se,
  spring: We
}, Ii = (t) => t / 100;
class nt extends xn {
  constructor(e) {
    super(e), this.holdTime = null, this.cancelTime = null, this.currentTime = 0, this.playbackSpeed = 1, this.pendingPlayState = "running", this.startTime = null, this.state = "idle", this.stop = () => {
      if (this.resolver.cancel(), this.isStopped = !0, this.state === "idle")
        return;
      this.teardown();
      const { onStop: l } = this.options;
      l && l();
    };
    const { name: n, motionValue: s, element: i, keyframes: r } = this.options, o = (i == null ? void 0 : i.KeyframeResolver) || Qe, a = (l, c) => this.onKeyframesResolved(l, c);
    this.resolver = new o(r, a, n, s, i), this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten(), this._resolved && Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
  }
  initPlayback(e) {
    const { type: n = "keyframes", repeat: s = 0, repeatDelay: i = 0, repeatType: r, velocity: o = 0 } = this.options, a = we(n) ? n : Ei[n] || se;
    let l, c;
    a !== se && _(e.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${e}`), a !== se && typeof e[0] != "number" && (l = et(Ii, Mn(e[0], e[1])), e = [0, 100]);
    const u = a({ ...this.options, keyframes: e });
    r === "mirror" && (c = a({
      ...this.options,
      keyframes: [...e].reverse(),
      velocity: -o
    })), u.calculatedDuration === null && (u.calculatedDuration = $e(u));
    const { calculatedDuration: f } = u, h = f + i, y = h * (s + 1) - i;
    return {
      generator: u,
      mirroredGenerator: c,
      mapPercentToKeyframes: l,
      calculatedDuration: f,
      resolvedDuration: h,
      totalDuration: y
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
    const { finalKeyframe: i, generator: r, mirroredGenerator: o, mapPercentToKeyframes: a, keyframes: l, calculatedDuration: c, totalDuration: u, resolvedDuration: f } = s;
    if (this.startTime === null)
      return r.next(0);
    const { delay: h, repeat: y, repeatType: g, repeatDelay: b, onUpdate: T } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - u / this.speed, this.startTime)), n ? this.currentTime = e : this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = Math.round(e - this.startTime) * this.speed;
    const p = this.currentTime - h * (this.speed >= 0 ? 1 : -1), V = this.speed >= 0 ? p < 0 : p > u;
    this.currentTime = Math.max(p, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = u);
    let M = this.currentTime, A = r;
    if (y) {
      const v = Math.min(this.currentTime, u) / f;
      let w = Math.floor(v), D = v % 1;
      !D && v >= 1 && (D = 1), D === 1 && w--, w = Math.min(w, y + 1), !!(w % 2) && (g === "reverse" ? (D = 1 - D, b && (D -= b / f)) : g === "mirror" && (A = o)), M = U(0, 1, D) * f;
    }
    const m = V ? { done: !1, value: l[0] } : A.next(M);
    a && (m.value = a(m.value));
    let { done: S } = m;
    !V && c !== null && (S = this.speed >= 0 ? this.currentTime >= u : this.currentTime <= 0);
    const P = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
    return P && i !== void 0 && (m.value = xe(l, this.options, i)), T && T(m.value), P && this.finish(), m;
  }
  get duration() {
    const { resolved: e } = this;
    return e ? /* @__PURE__ */ B(e.calculatedDuration) : 0;
  }
  get time() {
    return /* @__PURE__ */ B(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ I(e), this.currentTime = e, this.holdTime !== null || this.speed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.speed);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ B(this.currentTime));
  }
  play() {
    if (this.resolver.isScheduled || this.resolver.resume(), !this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped)
      return;
    const { driver: e = Ri, onPlay: n, startTime: s } = this.options;
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
const Oi = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);
function Bi(t, e, n, { delay: s = 0, duration: i = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeInOut", times: l } = {}) {
  const c = { [e]: n };
  l && (c.offset = l);
  const u = Jt(a, i);
  return Array.isArray(u) && (c.easing = u), t.animate(c, {
    delay: s,
    duration: i,
    easing: Array.isArray(u) ? "linear" : u,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  });
}
const Ki = /* @__PURE__ */ _e(() => Object.hasOwnProperty.call(Element.prototype, "animate")), Ve = 10, Ni = 2e4;
function ki(t) {
  return we(t.type) || t.type === "spring" || !Qt(t.ease);
}
function Li(t, e) {
  const n = new nt({
    ...e,
    keyframes: t,
    repeat: 0,
    delay: 0,
    isGenerator: !0
  });
  let s = { done: !1, value: t[0] };
  const i = [];
  let r = 0;
  for (; !s.done && r < Ni; )
    s = n.sample(r), i.push(s.value), r += Ve;
  return {
    times: void 0,
    keyframes: i,
    duration: r - Ve,
    ease: "linear"
  };
}
const Cn = {
  anticipate: on,
  backInOut: rn,
  circInOut: an
};
function _i(t) {
  return t in Cn;
}
class Rt extends xn {
  constructor(e) {
    super(e);
    const { name: n, motionValue: s, element: i, keyframes: r } = this.options;
    this.resolver = new wn(r, (o, a) => this.onKeyframesResolved(o, a), n, s, i), this.resolver.scheduleResolve();
  }
  initPlayback(e, n) {
    let { duration: s = 300, times: i, ease: r, type: o, motionValue: a, name: l, startTime: c } = this.options;
    if (!a.owner || !a.owner.current)
      return !1;
    if (typeof r == "string" && be() && _i(r) && (r = Cn[r]), ki(this.options)) {
      const { onComplete: f, onUpdate: h, motionValue: y, element: g, ...b } = this.options, T = Li(e, b);
      e = T.keyframes, e.length === 1 && (e[1] = e[0]), s = T.duration, i = T.times, r = T.ease, o = "keyframes";
    }
    const u = Bi(a.owner.current, l, e, { ...this.options, duration: s, times: i, ease: r });
    return u.startTime = c ?? this.calcStartTime(), this.pendingTimeline ? (vt(u, this.pendingTimeline), this.pendingTimeline = void 0) : u.onfinish = () => {
      const { onComplete: f } = this.options;
      a.set(xe(e, this.options, n)), f && f(), this.cancel(), this.resolveFinishedPromise();
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
    return /* @__PURE__ */ B(n);
  }
  get time() {
    const { resolved: e } = this;
    if (!e)
      return 0;
    const { animation: n } = e;
    return /* @__PURE__ */ B(n.currentTime || 0);
  }
  set time(e) {
    const { resolved: n } = this;
    if (!n)
      return;
    const { animation: s } = n;
    s.currentTime = /* @__PURE__ */ I(e);
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
      vt(s, e);
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
      const { motionValue: c, onUpdate: u, onComplete: f, element: h, ...y } = this.options, g = new nt({
        ...y,
        keyframes: s,
        duration: i,
        type: r,
        ease: o,
        times: a,
        isGenerator: !0
      }), b = /* @__PURE__ */ I(this.time);
      c.setWithVelocity(g.sample(b - Ve).value, g.sample(b).value, Ve);
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
    return Ki() && s && Oi.has(s) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !l && !c && !i && r !== "mirror" && o !== 0 && a !== "inertia";
  }
}
const $i = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Wi = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Ui = {
  type: "keyframes",
  duration: 0.8
}, Gi = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, ji = (t, { keyframes: e }) => e.length > 2 ? Ui : Y.has(t) ? t.startsWith("scale") ? Wi(e[1]) : $i : Gi;
function zi({ when: t, delay: e, delayChildren: n, staggerChildren: s, staggerDirection: i, repeat: r, repeatType: o, repeatDelay: a, from: l, elapsed: c, ...u }) {
  return !!Object.keys(u).length;
}
const Fn = (t, e, n, s = {}, i, r) => (o) => {
  const a = qt(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: c = 0 } = s;
  c = c - /* @__PURE__ */ I(l);
  let u = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -c,
    onUpdate: (h) => {
      e.set(h), a.onUpdate && a.onUpdate(h);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: r ? void 0 : i
  };
  zi(a) || (u = {
    ...u,
    ...ji(t, u)
  }), u.duration && (u.duration = /* @__PURE__ */ I(u.duration)), u.repeatDelay && (u.repeatDelay = /* @__PURE__ */ I(u.repeatDelay)), u.from !== void 0 && (u.keyframes[0] = u.from);
  let f = !1;
  if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (u.duration = 0, u.delay === 0 && (f = !0)), f && !r && e.get() !== void 0) {
    const h = xe(u.keyframes, a);
    if (h !== void 0)
      return O.update(() => {
        u.onUpdate(h), u.onComplete();
      }), new Nt([]);
  }
  return !r && Rt.supports(u) ? new Rt(u) : new nt(u);
};
function qi({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function Yi(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  var r;
  let { transition: o = t.getDefaultTransition(), transitionEnd: a, ...l } = e;
  s && (o = s);
  const c = [], u = i && t.animationState && t.animationState.getState()[i];
  for (const f in l) {
    const h = t.getValue(f, (r = t.latestValues[f]) !== null && r !== void 0 ? r : null), y = l[f];
    if (y === void 0 || u && qi(u, f))
      continue;
    const g = {
      delay: n,
      ...qt(o || {}, f)
    };
    let b = !1;
    if (window.MotionHandoffAnimation) {
      const p = Ps(t);
      if (p) {
        const V = window.MotionHandoffAnimation(p, f, O);
        V !== null && (g.startTime = V, b = !0);
      }
    }
    xs(t, f), h.start(Fn(f, h, y, t.shouldReduceMotion && Yt.has(f) ? { type: !1 } : g, t, b));
    const T = h.animation;
    T && c.push(T);
  }
  return a && Promise.all(c).then(() => {
    O.update(() => {
      a && Ss(t, a);
    });
  }), c;
}
function Xi(t) {
  return t instanceof SVGElement && t.tagName !== "svg";
}
const Et = () => ({ min: 0, max: 0 }), st = () => ({
  x: Et(),
  y: Et()
}), It = {
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
}, ke = {};
for (const t in It)
  ke[t] = {
    isEnabled: (e) => It[t].some((n) => !!e[n])
  };
const Hi = typeof window < "u", Le = { current: null }, Dn = { current: !1 };
function Zi() {
  if (Dn.current = !0, !!Hi)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => Le.current = t.matches;
      t.addListener(e), e();
    } else
      Le.current = !1;
}
const Qi = [...Sn, C, H], Ji = (t) => Qi.find(Vn(t));
function er(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function tr(t) {
  return typeof t == "string" || Array.isArray(t);
}
const nr = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], sr = ["initial", ...nr];
function Rn(t) {
  return er(t.animate) || sr.some((e) => tr(t[e]));
}
function ir(t) {
  return !!(Rn(t) || t.variants);
}
function rr(t, e, n) {
  for (const s in e) {
    const i = e[s], r = n[s];
    if (F(i))
      t.addValue(s, i);
    else if (F(r))
      t.addValue(s, re(i, { owner: t }));
    else if (r !== i)
      if (t.hasValue(s)) {
        const o = t.getValue(s);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i);
      } else {
        const o = t.getStaticValue(s);
        t.addValue(s, re(o !== void 0 ? o : i, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const Ot = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class En {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Qe, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const y = k.now();
      this.renderScheduledAt < y && (this.renderScheduledAt = y, O.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: c, onUpdate: u } = o;
    this.onUpdate = u, this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = c, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.options = a, this.blockInitialAnimation = !!r, this.isControllingVariants = Rn(n), this.isVariantNode = ir(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: f, ...h } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const y in h) {
      const g = h[y];
      l[y] !== void 0 && F(g) && g.set(l[y], !1);
    }
  }
  mount(e) {
    this.current = e, ie.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, s) => this.bindToMotionValue(s, n)), Dn.current || Zi(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : Le.current, Ht(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected."), this.parent && this.parent.children.add(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), De(this.notifyUpdate), De(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent && this.parent.children.delete(this);
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
    const s = Y.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (a) => {
      this.latestValues[e] = a, this.props.onUpdate && O.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0);
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
    for (e in ke) {
      const n = ke[e];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : st();
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
    for (let s = 0; s < Ot.length; s++) {
      const i = Ot[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const r = "on" + i, o = e[r];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    this.prevMotionValues = rr(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue(), this.onUpdate && this.onUpdate(this);
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
    return s === void 0 && n !== void 0 && (s = re(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    var s;
    let i = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : (s = this.getBaseTargetFromProps(this.props, e)) !== null && s !== void 0 ? s : this.readValueFromInstance(this.current, e, this.options);
    return i != null && (typeof i == "string" && (yn(i) || ln(i)) ? i = parseFloat(i) : !Ji(i) && H.test(n) && (i = pn(e, n)), this.setBaseTarget(e, F(i) ? i.get() : i)), F(i) ? i.get() : i;
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
      const o = Zt(this.props, s, (n = this.presenceContext) === null || n === void 0 ? void 0 : n.custom);
      o && (i = o[e]);
    }
    if (s && i !== void 0)
      return i;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !F(r) ? r : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new Xt()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
}
class In extends En {
  constructor() {
    super(...arguments), this.KeyframeResolver = wn;
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
    F(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
const On = (t, e) => e && typeof t == "number" ? e.transform(t) : t, or = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, ar = q.length;
function lr(t, e, n) {
  let s = "", i = !0;
  for (let r = 0; r < ar; r++) {
    const o = q[r], a = t[o];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (o.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const c = On(a, He[o]);
      if (!l) {
        i = !1;
        const u = or[o] || o;
        s += `${u}(${c}) `;
      }
      n && (e[o] = c);
    }
  }
  return s = s.trim(), n ? s = n(e, i ? "" : s) : i && (s = "none"), s;
}
function Bn(t, e, n) {
  const { style: s, vars: i, transformOrigin: r } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const c = e[l];
    if (Y.has(l)) {
      o = !0;
      continue;
    } else if (bn(l)) {
      i[l] = c;
      continue;
    } else {
      const u = On(c, He[l]);
      l.startsWith("origin") ? (a = !0, r[l] = u) : s[l] = u;
    }
  }
  if (e.transform || (o || n ? s.transform = lr(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: c = "50%", originZ: u = 0 } = r;
    s.transformOrigin = `${l} ${c} ${u}`;
  }
}
const ur = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, cr = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function fr(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const r = i ? ur : cr;
  t[r.offset] = d.transform(-s);
  const o = d.transform(e), a = d.transform(n);
  t[r.array] = `${o} ${a}`;
}
function Bt(t, e, n) {
  return typeof t == "string" ? t : d.transform(e + n * t);
}
function hr(t, e, n) {
  const s = Bt(e, t.x, t.width), i = Bt(n, t.y, t.height);
  return `${s} ${i}`;
}
function dr(t, {
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
}, u, f) {
  if (Bn(t, c, f), u) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: h, style: y, dimensions: g } = t;
  h.transform && (g && (y.transform = h.transform), delete h.transform), g && (i !== void 0 || r !== void 0 || y.transform) && (y.transformOrigin = hr(g, i !== void 0 ? i : 0.5, r !== void 0 ? r : 0.5)), e !== void 0 && (h.x = e), n !== void 0 && (h.y = n), s !== void 0 && (h.scale = s), o !== void 0 && fr(h, o, a, l, !1);
}
const Kn = /* @__PURE__ */ new Set([
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
]), pr = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function mr(t, e) {
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
function Nn(t, { style: e, vars: n }, s, i) {
  Object.assign(t.style, e, i && i.getProjectionStyles(s));
  for (const r in n)
    t.style.setProperty(r, n[r]);
}
function gr(t, e, n, s) {
  Nn(t, e, void 0, s);
  for (const i in e.attrs)
    t.setAttribute(Kn.has(i) ? i : Ge(i), e.attrs[i]);
}
const yr = {};
function vr(t, { layout: e, layoutId: n }) {
  return Y.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!yr[t] || t === "opacity");
}
function kn(t, e, n) {
  var s;
  const { style: i } = t, r = {};
  for (const o in i)
    (F(i[o]) || e.style && F(e.style[o]) || vr(o, t) || ((s = n == null ? void 0 : n.getValue(o)) === null || s === void 0 ? void 0 : s.liveStyle) !== void 0) && (r[o] = i[o]);
  return r;
}
function br(t, e, n) {
  const s = kn(t, e, n);
  for (const i in t)
    if (F(t[i]) || F(e[i])) {
      const r = q.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[r] = t[i];
    }
  return s;
}
class Tr extends In {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = st, this.updateDimensions = () => {
      this.current && !this.renderState.dimensions && mr(this.current, this.renderState);
    };
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (Y.has(n)) {
      const s = Ze(n);
      return s && s.default || 0;
    }
    return n = Kn.has(n) ? n : Ge(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return br(e, n, s);
  }
  onBindTransform() {
    this.current && !this.renderState.dimensions && O.postRender(this.updateDimensions);
  }
  build(e, n, s) {
    dr(e, n, this.isSVGTag, s.transformTemplate);
  }
  renderInstance(e, n, s, i) {
    gr(e, n, s, i);
  }
  mount(e) {
    this.isSVGTag = pr(e.tagName), super.mount(e);
  }
}
function Vr({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function Sr(t, e) {
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
function wr(t, e) {
  return Vr(Sr(t.getBoundingClientRect(), e));
}
function xr(t) {
  return window.getComputedStyle(t);
}
class Ar extends In {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Nn;
  }
  readValueFromInstance(e, n) {
    if (Y.has(n)) {
      const s = Ze(n);
      return s && s.default || 0;
    } else {
      const s = xr(e), i = (bn(n) ? s.getPropertyValue(n) : s[n]) || 0;
      return typeof i == "string" ? i.trim() : i;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return wr(e, n);
  }
  build(e, n, s) {
    Bn(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return kn(e, n, s);
  }
}
function Mr(t, e) {
  return t in e;
}
class Pr extends En {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(e, n) {
    if (Mr(n, e)) {
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
    return st();
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
function Cr(t) {
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
  }, n = Xi(t) ? new Tr(e) : new Ar(e);
  n.mount(t), ie.set(t, n);
}
function Fr(t) {
  const e = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, n = new Pr(e);
  n.mount(t), ie.set(t, n);
}
function Dr(t, e, n) {
  const s = F(t) ? t : re(t);
  return s.start(Fn("", s, e, n)), s.animation;
}
function Rr(t, e) {
  return F(t) || typeof t == "number" || typeof t == "string" && !Ue(e);
}
function Ln(t, e, n, s) {
  const i = [];
  if (Rr(t, e))
    i.push(Dr(t, Ue(e) && e.default || e, n && (n.default || n)));
  else {
    const r = jt(t, e, s), o = r.length;
    _(!!o, "No valid elements provided.");
    for (let a = 0; a < o; a++) {
      const l = r[a], c = l instanceof Element ? Cr : Fr;
      ie.has(l) || c(l);
      const u = ie.get(l), f = { ...n };
      "delay" in f && typeof f.delay == "function" && (f.delay = f.delay(a, o)), i.push(...Yi(u, { ...e, transition: f }, {}));
    }
  }
  return i;
}
function Er(t, e, n) {
  const s = [];
  return os(t, e, n, { spring: We }).forEach(({ keyframes: r, transition: o }, a) => {
    s.push(...Ln(a, r, o));
  }), s;
}
function Ir(t) {
  return Array.isArray(t) && t.some(Array.isArray);
}
function Or(t) {
  function e(n, s, i) {
    let r = [];
    return Ir(n) ? r = Er(n, s, t) : r = Ln(n, s, i, t), new Nt(r);
  }
  return e;
}
const _r = Or(), Br = {
  some: 0,
  all: 1
};
function $r(t, e, { root: n, margin: s, amount: i = "some" } = {}) {
  const r = Kt(t), o = /* @__PURE__ */ new WeakMap(), a = (c) => {
    c.forEach((u) => {
      const f = o.get(u.target);
      if (u.isIntersecting !== !!f)
        if (u.isIntersecting) {
          const h = e(u.target, u);
          typeof h == "function" ? o.set(u.target, h) : l.unobserve(u.target);
        } else typeof f == "function" && (f(u), o.delete(u.target));
    });
  }, l = new IntersectionObserver(a, {
    root: n,
    rootMargin: s,
    threshold: typeof i == "number" ? i : Br[i]
  });
  return r.forEach((c) => l.observe(c)), () => l.disconnect();
}
function Kr(t, e) {
  if (t === "first")
    return 0;
  {
    const n = e - 1;
    return t === "last" ? n : n / 2;
  }
}
function Wr(t = 0.1, { startDelay: e = 0, from: n = 0, ease: s } = {}) {
  return (i, r) => {
    const o = typeof n == "number" ? n : Kr(n, r), a = Math.abs(o - i);
    let l = t * a;
    if (s) {
      const c = r * t;
      l = Ne(s)(l / c) * c;
    }
    return e + l;
  };
}
export {
  _r as a,
  $r as i,
  Wr as s
};
