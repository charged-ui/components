import { b as d, a as b, n as o, r as c, e as l, h as w, k as f } from "./vendor.js";
import { c as m } from "./registry-CBck5F9C.js";
import { p as y } from "./cobe.js";
const u = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.static{position:static}.relative{position:relative}.block{display:block}.hidden{display:none}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}";
var g = Object.defineProperty, x = Object.getOwnPropertyDescriptor, e = (i, s, n, r) => {
  for (var a = r > 1 ? void 0 : r ? x(s, n) : s, p = i.length - 1, h; p >= 0; p--)
    (h = i[p]) && (a = (r ? h(s, n, a) : h(a)) || a);
  return r && a && g(s, n, a), a;
};
let t = class extends w {
  constructor() {
    super(...arguments), this.phi = 0, this.theta = 0, this.autoRotateSpeed = 0.01, this.dark = 1, this.diffuse = 1.2, this.mapSamples = 8e3, this.mapBrightness = 6, this.baseColor = [0.3, 0.3, 0.3], this.markerColor = [0.1, 0.8, 1], this.glowColor = [1, 1, 1], this.aspectRatio = 1, this.scale = 1, this.offset = [0, 0], this.size = 400, this.markers = [], this.globe = null, this.animationPhi = 0, this.containerWidth = 0, this.containerHeight = 0, this.scaledOffset = [0, 0];
  }
  firstUpdated() {
    this.updateSizeStyles(), this.updateAspectRatio(), this.updateContainerSize(), this.initializeGlobe(), this.setupResizeObserver(), setTimeout(() => {
      this.canvas && (this.canvas.style.opacity = "1");
    }, 100);
  }
  updated(i) {
    i.has("size") && (this.updateSizeStyles(), this.updateContainerSize()), i.has("aspectRatio") && this.updateAspectRatio(), i.has("offset") && this.updateContainerSize();
  }
  disconnectedCallback() {
    var i, s;
    super.disconnectedCallback(), this.globe && ((s = (i = this.globe).destroy) == null || s.call(i));
  }
  updateSizeStyles() {
    this.size > 0 ? (this.style.setProperty("--globe-size", `${this.size}px`), this.style.setProperty("--globe-max-size", `${this.size}px`)) : (this.style.removeProperty("--globe-size"), this.style.removeProperty("--globe-max-size"));
  }
  updateAspectRatio() {
    this.style.setProperty("--aspect-ratio", this.aspectRatio.toString());
  }
  updateContainerSize() {
    if (!this.container) return;
    const i = this.container.getBoundingClientRect();
    if (this.containerWidth = i.width, this.containerHeight = i.height, this.size > 0) {
      const s = this.containerWidth / this.size;
      let n = this.offset[0] * s, r = this.offset[1] * s;
      const a = this.size / this.aspectRatio;
      this.offset[0] / this.size, this.offset[1] / a;
      const p = this.containerWidth * 0.9, h = this.containerHeight * 0.9;
      Math.abs(r) > h && (r = Math.sign(r) * h), Math.abs(n) > p && (n = Math.sign(n) * p), this.scaledOffset = [n, r];
    } else
      this.scaledOffset = [...this.offset];
  }
  setupResizeObserver() {
    if (typeof ResizeObserver > "u") return;
    new ResizeObserver(() => {
      this.updateContainerSize();
    }).observe(this.container);
  }
  initializeGlobe() {
    !this.canvas || !this.containerWidth || !this.containerHeight || (this.animationPhi = this.phi, this.globe = y(this.canvas, {
      devicePixelRatio: 2,
      width: this.containerWidth * 2,
      height: this.containerHeight * 2,
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
      scale: this.scale,
      offset: this.scaledOffset,
      onRender: (i) => {
        this.animationPhi += this.autoRotateSpeed, i.phi = this.animationPhi, i.theta = this.theta, i.width = this.containerWidth * 2, i.height = this.containerHeight * 2;
      }
    }));
  }
  render() {
    return f`
      <div class="globe-container">
        <canvas></canvas>
        <slot name="overlay"></slot>
      </div>
    `;
  }
};
t.styles = b`
    ${d(u)}
    :host {
      display: block;
      width: var(--globe-size, 100%);
      min-width: 200px;
      max-width: var(--globe-max-size, 800px);
      /* Ensure the component itself can scale down */
      max-width: min(var(--globe-max-size, 800px), 100vw);
    }

    .globe-container {
      position: relative;
      width: 100%;
      aspect-ratio: var(--aspect-ratio, 1);
      overflow: hidden;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 1s ease;
      contain: layout paint size;
    }
  `;
e([
  o({ type: Number })
], t.prototype, "phi", 2);
e([
  o({ type: Number })
], t.prototype, "theta", 2);
e([
  o({ type: Number, attribute: "auto-rotate-speed" })
], t.prototype, "autoRotateSpeed", 2);
e([
  o({ type: Number })
], t.prototype, "dark", 2);
e([
  o({ type: Number })
], t.prototype, "diffuse", 2);
e([
  o({ type: Number, attribute: "map-samples" })
], t.prototype, "mapSamples", 2);
e([
  o({ type: Number, attribute: "map-brightness" })
], t.prototype, "mapBrightness", 2);
e([
  o({ type: Array, attribute: "base-color" })
], t.prototype, "baseColor", 2);
e([
  o({ type: Array, attribute: "marker-color" })
], t.prototype, "markerColor", 2);
e([
  o({ type: Array, attribute: "glow-color" })
], t.prototype, "glowColor", 2);
e([
  o({ type: Number, attribute: "aspect-ratio" })
], t.prototype, "aspectRatio", 2);
e([
  o({ type: Number })
], t.prototype, "scale", 2);
e([
  o({ type: Array })
], t.prototype, "offset", 2);
e([
  o({ type: Number })
], t.prototype, "size", 2);
e([
  o({ type: Array })
], t.prototype, "markers", 2);
e([
  c()
], t.prototype, "globe", 2);
e([
  c()
], t.prototype, "animationPhi", 2);
e([
  c()
], t.prototype, "containerWidth", 2);
e([
  c()
], t.prototype, "containerHeight", 2);
e([
  c()
], t.prototype, "scaledOffset", 2);
e([
  l("canvas")
], t.prototype, "canvas", 2);
e([
  l(".globe-container")
], t.prototype, "container", 2);
t = e([
  m("ui-globe")
], t);
export {
  t as UIGlobe
};
