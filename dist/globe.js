import { r as d, a as w, n as o, b as h, e as l, h as b, k as f, t as m } from "./vendor.js";
import { p as y } from "./cobe.js";
const u = "*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.static{position:static}.relative{position:relative}.block{display:block}.hidden{display:none}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}";
var g = Object.defineProperty, k = Object.getOwnPropertyDescriptor, e = (i, r, s, n) => {
  for (var a = n > 1 ? void 0 : n ? k(r, s) : r, p = i.length - 1, c; p >= 0; p--)
    (c = i[p]) && (a = (n ? c(r, s, a) : c(a)) || a);
  return n && a && g(r, s, a), a;
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
    ], this.glowColor = [1, 1, 1], this.aspectRatio = 1, this.scale = 1, this.offset = [0, 0], this.markers = [], this.globe = null, this.animationPhi = 0, this.containerWidth = 0, this.containerHeight = 0;
  }
  firstUpdated() {
    this.updateAspectRatio(), this.updateContainerSize(), this.initializeGlobe(), this.setupResizeObserver(), setTimeout(() => {
      this.canvas && (this.canvas.style.opacity = "1");
    }, 100);
  }
  disconnectedCallback() {
    var i, r;
    super.disconnectedCallback(), this.globe && ((r = (i = this.globe).destroy) == null || r.call(i));
  }
  updateAspectRatio() {
    this.style.setProperty("--aspect-ratio", this.aspectRatio.toString());
  }
  updateContainerSize() {
    if (!this.container) return;
    const i = this.container.getBoundingClientRect();
    this.containerWidth = i.width, this.containerHeight = i.height;
  }
  setupResizeObserver() {
    if (typeof ResizeObserver > "u") return;
    new ResizeObserver(() => {
      this.updateContainerSize(), this.updateGlobeSize();
    }).observe(this.container);
  }
  updateGlobeSize() {
    !this.globe || !this.containerWidth || !this.containerHeight || this.globe.updateConfig({
      width: this.containerWidth * 2,
      height: this.containerHeight * 2,
      scale: this.scale,
      offset: this.offset
    });
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
      offset: this.offset,
      onRender: (i) => {
        this.animationPhi += this.autoRotateSpeed, i.phi = this.animationPhi, i.theta = this.theta, i.width = this.containerWidth * 2, i.height = this.containerHeight * 2;
      }
    }));
  }
  updated(i) {
    var r, s;
    i.has("aspectRatio") && this.updateAspectRatio(), (i.has("scale") || i.has("offset")) && this.updateGlobeSize(), this.globe && [
      "phi",
      "theta",
      "dark",
      "diffuse",
      "mapSamples",
      "mapBrightness",
      "baseColor",
      "markerColor",
      "glowColor",
      "markers",
      "autoRotateSpeed"
    ].some(
      (p) => i.has(p)
    ) && ((s = (r = this.globe).destroy) == null || s.call(r), this.initializeGlobe());
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
t.styles = w`
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
  o({ type: Number })
], t.prototype, "aspectRatio", 2);
e([
  o({ type: Number })
], t.prototype, "scale", 2);
e([
  o({ type: Array })
], t.prototype, "offset", 2);
e([
  o({ type: Array })
], t.prototype, "markers", 2);
e([
  h()
], t.prototype, "globe", 2);
e([
  h()
], t.prototype, "animationPhi", 2);
e([
  h()
], t.prototype, "containerWidth", 2);
e([
  h()
], t.prototype, "containerHeight", 2);
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
