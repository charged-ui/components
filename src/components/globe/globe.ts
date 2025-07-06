import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import createGlobe from 'cobe';
import styles from './globe.css?raw';

export interface GlobeMarker {
  location: [number, number]; // [longitude, latitude]
  size: number;
}

@customElement('ui-globe')
export class UIGlobe extends LitElement {
  // Globe positioning
  @property({ type: Number }) phi = 0;
  @property({ type: Number }) theta = 0;
  @property({ type: Number }) autoRotateSpeed = 0.01;

  // Visual styling
  @property({ type: Number }) dark = 1;
  @property({ type: Number }) diffuse = 1.2;
  @property({ type: Number }) mapSamples = 16000;
  @property({ type: Number }) mapBrightness = 6;
  @property({ type: Array }) baseColor: [number, number, number] = [
    0.3, 0.3, 0.3
  ];
  @property({ type: Array }) markerColor: [number, number, number] = [
    0.1, 0.8, 1
  ];
  @property({ type: Array }) glowColor: [number, number, number] = [1, 1, 1];

  // Scaling and positioning
  @property({ type: Number }) aspectRatio = 1; // width/height ratio
  @property({ type: Number }) scale = 1;
  @property({ type: Array }) offset: [number, number] = [0, 0];

  // Interactive elements
  @property({ type: Array }) markers: GlobeMarker[] = [];

  // Internal state
  @state() private globe: any = null;
  @state() private animationPhi = 0;
  @state() private containerWidth = 0;
  @state() private containerHeight = 0;

  @query('canvas') private canvas!: HTMLCanvasElement;
  @query('.globe-container') private container!: HTMLElement;

  static styles = css`
    ${unsafeCSS(styles)}
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

  firstUpdated() {
    this.updateAspectRatio();
    this.updateContainerSize();
    this.initializeGlobe();
    this.setupResizeObserver();

    // Fade in the canvas
    setTimeout(() => {
      if (this.canvas) {
        this.canvas.style.opacity = '1';
      }
    }, 100);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.globe) {
      this.globe.destroy?.();
    }
  }

  private updateAspectRatio() {
    this.style.setProperty('--aspect-ratio', this.aspectRatio.toString());
  }

  private updateContainerSize() {
    if (!this.container) return;

    const containerRect = this.container.getBoundingClientRect();
    this.containerWidth = containerRect.width;
    this.containerHeight = containerRect.height;
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') return;

    const resizeObserver = new ResizeObserver(() => {
      this.updateContainerSize();
      this.updateGlobeSize();
    });

    resizeObserver.observe(this.container);
  }

  private updateGlobeSize() {
    if (!this.globe || !this.containerWidth || !this.containerHeight) return;

    // Update globe configuration with new dimensions
    this.globe.updateConfig({
      width: this.containerWidth * 2,
      height: this.containerHeight * 2,
      scale: this.scale,
      offset: this.offset
    });
  }

  private initializeGlobe() {
    if (!this.canvas || !this.containerWidth || !this.containerHeight) return;

    this.animationPhi = this.phi;

    this.globe = createGlobe(this.canvas, {
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
      onRender: (state: any) => {
        this.animationPhi += this.autoRotateSpeed;
        state.phi = this.animationPhi;
        state.theta = this.theta;
        state.width = this.containerWidth * 2;
        state.height = this.containerHeight * 2;
      }
    });
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('aspectRatio')) {
      this.updateAspectRatio();
    }

    if (changedProperties.has('scale') || changedProperties.has('offset')) {
      this.updateGlobeSize();
    }

    // Update globe properties that don't require recreation
    if (this.globe) {
      const globeProps = [
        'phi',
        'theta',
        'dark',
        'diffuse',
        'mapSamples',
        'mapBrightness',
        'baseColor',
        'markerColor',
        'glowColor',
        'markers',
        'autoRotateSpeed'
      ];

      const shouldUpdate = globeProps.some((prop) =>
        changedProperties.has(prop)
      );

      if (shouldUpdate) {
        // For most properties, we need to recreate the globe
        this.globe.destroy?.();
        this.initializeGlobe();
      }
    }
  }

  render() {
    return html`
      <div class="globe-container">
        <canvas></canvas>
        <slot name="overlay"></slot>
      </div>
    `;
  }
}
