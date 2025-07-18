import { r as m, a as d, n, b as c, h, k as l, t as y } from "./vendor.js";
const g = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.pointer-events-none{pointer-events:none}.static{position:static}.absolute{position:absolute}.top-1\\/2{top:50%}.-z-10{z-index:-10}.block{display:block}.h-0\\.5{height:.125rem}.h-px{height:1px}.w-0\\.5{width:.125rem}.w-12{width:3rem}.-translate-y-1\\/2{--tw-translate-y:-50%}.-translate-y-1\\/2,.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rounded-full{border-radius:9999px}.bg-zinc-500{--tw-bg-opacity:1;background-color:rgb(113 113 122/var(--tw-bg-opacity))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.from-zinc-500{--tw-gradient-from:#71717a var(--tw-gradient-from-position);--tw-gradient-to:#71717a00 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.to-transparent{--tw-gradient-to:#0000 var(--tw-gradient-to-position)}.shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";
var u = Object.defineProperty, b = Object.getOwnPropertyDescriptor, r = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? b(e, s) : e, w = t.length - 1, p; w >= 0; w--)
    (p = t[w]) && (o = (i ? p(e, s, o) : p(o)) || o);
  return i && o && u(e, s, o), o;
};
let a = class extends h {
  constructor() {
    super(...arguments), this.number = 20, this.minDelay = 0.2, this.maxDelay = 1.2, this.minDuration = 2, this.maxDuration = 10, this.angle = 60, this.meteorStyles = [];
  }
  firstUpdated() {
    this.generateMeteorStyles();
  }
  updated(t) {
    (t.has("number") || t.has("minDelay") || t.has("maxDelay") || t.has("minDuration") || t.has("maxDuration") || t.has("angle")) && this.generateMeteorStyles();
  }
  generateMeteorStyles() {
    const t = [];
    for (let e = 0; e < this.number; e++)
      t.push({
        angle: `${-this.angle}deg`,
        top: "-5%",
        left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
        animationDelay: `${Math.random() * (this.maxDelay - this.minDelay) + this.minDelay}s`,
        animationDuration: `${Math.floor(Math.random() * (this.maxDuration - this.minDuration) + this.minDuration)}s`
      });
    this.meteorStyles = t;
  }
  render() {
    return l`
      ${this.meteorStyles.map(
      (t, e) => l`
          <span
            class="meteor pointer-events-none absolute w-0.5 h-0.5 rounded-full bg-zinc-500 shadow-sm"
            style="
            --angle: ${t.angle};
            top: ${t.top};
            left: ${t.left};
            animation-delay: ${t.animationDelay};
            animation-duration: ${t.animationDuration};
            transform: rotate(var(--angle));
            box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
          "
          >
            <div
              class="pointer-events-none absolute top-1/2 -z-10 h-px w-12 -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent"
            ></div>
          </span>
        `
    )}
    `;
  }
};
a.styles = d`
    ${m(g)}

    :host {
      display: block;
    }

    @keyframes meteor {
      0% {
        transform: rotate(var(--angle)) translateX(0);
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        transform: rotate(var(--angle)) translateX(-500px);
        opacity: 0;
      }
    }

    .meteor {
      animation: meteor linear infinite;
    }
  `;
r([
  n({ type: Number })
], a.prototype, "number", 2);
r([
  n({ type: Number })
], a.prototype, "minDelay", 2);
r([
  n({ type: Number })
], a.prototype, "maxDelay", 2);
r([
  n({ type: Number })
], a.prototype, "minDuration", 2);
r([
  n({ type: Number })
], a.prototype, "maxDuration", 2);
r([
  n({ type: Number })
], a.prototype, "angle", 2);
r([
  c()
], a.prototype, "meteorStyles", 2);
a = r([
  y("ui-bg-meteors")
], a);
export {
  a as MeteorsComponent
};
