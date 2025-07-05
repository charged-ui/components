import { r as d, a as h, n as o, b as l, e as w, h as b, k as m, t as y } from "./vendor.js";
import { p as f } from "./cobe.js";
const u = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.\\!container{width:100%!important}.container{width:100%}@media (min-width:640px){.\\!container{max-width:640px!important}.container{max-width:640px}}@media (min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media (min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media (min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media (min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.block{display:block}.hidden{display:none}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}";
var x = Object.defineProperty, g = Object.getOwnPropertyDescriptor, e = (r, i, a, s) => {
  for (var n = s > 1 ? void 0 : s ? g(i, a) : i, p = r.length - 1, c; p >= 0; p--)
    (c = r[p]) && (n = (s ? c(i, a, n) : c(n)) || n);
  return s && n && x(i, a, n), n;
};
let t = class extends b {
  constructor() {
    super(...arguments), this.phi = 0, this.theta = 0, this.autoRotateSpeed = 0.01, this.dark = 1, this.diffuse = 1.2, this.mapSamples = 16e3, this.mapBrightness = 6, this.baseColor = [
      0.3,
      0.3,
      0.3
    ], this.markerColor = [
      0.1,
      0.8,
      1
    ], this.glowColor = [1, 1, 1], this.markers = [], this.globe = null, this.animationPhi = 0;
  }
  firstUpdated() {
    this.initializeGlobe(), this.updateScale(), this.setupResizeObserver();
  }
  disconnectedCallback() {
    var r, i;
    super.disconnectedCallback(), this.globe && ((i = (r = this.globe).destroy) == null || i.call(r));
  }
  updateScale() {
    var s;
    const r = (s = this.shadowRoot) == null ? void 0 : s.querySelector(
      ".globe-container"
    );
    if (!r) return;
    const a = r.getBoundingClientRect().width / 600;
    this.style.setProperty("--globe-scale", a.toString());
  }
  setupResizeObserver() {
    var a;
    if (typeof ResizeObserver > "u") return;
    const r = (a = this.shadowRoot) == null ? void 0 : a.querySelector(".globe-container");
    if (!r) return;
    new ResizeObserver(() => {
      this.updateScale();
    }).observe(r);
  }
  initializeGlobe() {
    this.canvas && (this.animationPhi = this.phi, this.globe = f(this.canvas, {
      devicePixelRatio: 2,
      width: 1200,
      // Fixed high resolution
      height: 1200,
      phi: this.phi,
      theta: this.theta,
      dark: this.dark,
      diffuse: this.diffuse,
      mapSamples: this.mapSamples,
      mapBrightness: this.mapBrightness,
      baseColor: this.baseColor,
      markerColor: this.markerColor,
      glowColor: this.glowColor,
      markers: this.markers,
      onRender: (r) => {
        this.animationPhi += this.autoRotateSpeed, r.phi = this.animationPhi, r.theta = this.theta;
      }
    }));
  }
  render() {
    return m`
      <div class="globe-container">
        <div class="globe-canvas-wrapper">
          <canvas></canvas>
        </div>
        <slot name="overlay"></slot>
      </div>
    `;
  }
};
t.styles = h`
    ${d(u)}
    :host {
      display: block;
      width: 100%;
      min-width: 200px;
      max-width: 800px;
    }

    .globe-container {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      overflow: hidden;
    }

    .globe-canvas-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(var(--globe-scale, 1));
      transform-origin: center center;
      transition: transform 0.1s ease-out;
    }

    canvas {
      display: block;
      width: 600px;
      height: 600px;
    }
  `;
e([
  o({ type: Number })
], t.prototype, "phi", 2);
e([
  o({ type: Number })
], t.prototype, "theta", 2);
e([
  o({ type: Number })
], t.prototype, "autoRotateSpeed", 2);
e([
  o({ type: Number })
], t.prototype, "dark", 2);
e([
  o({ type: Number })
], t.prototype, "diffuse", 2);
e([
  o({ type: Number })
], t.prototype, "mapSamples", 2);
e([
  o({ type: Number })
], t.prototype, "mapBrightness", 2);
e([
  o({ type: Array })
], t.prototype, "baseColor", 2);
e([
  o({ type: Array })
], t.prototype, "markerColor", 2);
e([
  o({ type: Array })
], t.prototype, "glowColor", 2);
e([
  o({ type: Array })
], t.prototype, "markers", 2);
e([
  l()
], t.prototype, "globe", 2);
e([
  l()
], t.prototype, "animationPhi", 2);
e([
  w("canvas")
], t.prototype, "canvas", 2);
t = e([
  y("ui-globe")
], t);
export {
  t as UIGlobe
};
