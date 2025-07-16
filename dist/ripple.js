import { r as w, a as d, n as p, h as b, Q as u, s as m, k as c, t as y } from "./vendor.js";
const h = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.pointer-events-none{pointer-events:none}.static{position:static}.absolute{position:absolute}.inset-0{inset:0}.block{display:block}.contents{display:contents}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-solid{border-style:solid}.shadow-xl{--tw-shadow:0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a;--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}";
var g = Object.defineProperty, f = Object.getOwnPropertyDescriptor, n = (s, t, r, a) => {
  for (var e = a > 1 ? void 0 : a ? f(t, r) : t, i = s.length - 1, l; i >= 0; i--)
    (l = s[i]) && (e = (a ? l(t, r, e) : l(e)) || e);
  return a && e && g(t, r, e), e;
};
let o = class extends b {
  constructor() {
    super(...arguments), this.mainCircleSize = 210, this.mainCircleOpacity = 0.24, this.numCircles = 8;
  }
  generateCircles() {
    return Array.from({ length: this.numCircles }, (s, t) => {
      const r = this.mainCircleSize + t * 70, a = this.mainCircleOpacity - t * 0.03, e = `${t * 0.06}s`, i = {
        width: `${r}px`,
        height: `${r}px`,
        opacity: a.toString(),
        animationDelay: e,
        "--i": t.toString()
      };
      return { id: t, styles: i };
    });
  }
  render() {
    const s = this.generateCircles();
    return c`
      <div
        class="pointer-events-none absolute inset-0 select-none"
        style="mask-image: linear-gradient(to bottom, white, transparent)"
      >
        ${u(
      s,
      (t) => t.id,
      (t) => c`
            <div
              class="absolute animate-ripple rounded-full border border-solid shadow-xl"
              style=${m({
        ...t.styles,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(1)"
      })}
            ></div>
          `
    )}
      </div>
    `;
  }
};
o.styles = d`
    ${w(h)}

    :host {
      display: contents;

      /* Design tokens - default values */
      --ripple-bg-color: oklch(55.2% 0.016 285.938 / 0.25); /* gray-900/25 */
      --ripple-border-color: oklch(55.1% 0.027 264.364); /* gray-300 */
      --ripple-animation-duration: 2s;
      --ripple-animation-timing: ease-out;
    }

    @keyframes ripple {
      0%,
      100% {
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        transform: translate(-50%, -50%) scale(1.06);
      }
    }

    .animate-ripple {
      animation: ripple var(--ripple-animation-duration)
        var(--ripple-animation-timing) infinite;
      background-color: var(--ripple-bg-color);
      border-color: var(--ripple-border-color);
    }
  `;
n([
  p({ type: Number })
], o.prototype, "mainCircleSize", 2);
n([
  p({ type: Number })
], o.prototype, "mainCircleOpacity", 2);
n([
  p({ type: Number })
], o.prototype, "numCircles", 2);
o = n([
  y("ui-bg-ripple")
], o);
export {
  o as RippleBackground
};
