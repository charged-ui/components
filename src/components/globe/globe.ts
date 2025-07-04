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

  // Interactive elements
  @property({ type: Array }) markers: GlobeMarker[] = [];

  // Internal state
  @state() private globe: any = null;
  @state() private animationPhi = 0;

  @query('canvas') private canvas!: HTMLCanvasElement;

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

  firstUpdated() {
    this.initializeGlobe();
    this.updateScale();
    this.setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.globe) {
      this.globe.destroy?.();
    }
  }

  private updateScale() {
    const container = this.shadowRoot?.querySelector(
      '.globe-container'
    ) as HTMLElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const scale = containerRect.width / 600; // 600 is our fixed canvas size

    this.style.setProperty('--globe-scale', scale.toString());
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') return;

    const container = this.shadowRoot?.querySelector('.globe-container');
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      this.updateScale();
    });

    resizeObserver.observe(container);
  }

  private initializeGlobe() {
    if (!this.canvas) return;

    this.animationPhi = this.phi;

    this.globe = createGlobe(this.canvas, {
      devicePixelRatio: 2,
      width: 1200, // Fixed high resolution
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
      onRender: (state: any) => {
        this.animationPhi += this.autoRotateSpeed;
        state.phi = this.animationPhi;
        state.theta = this.theta;
      }
    });
  }

  render() {
    return html`
      <div class="globe-container">
        <div class="globe-canvas-wrapper">
          <canvas></canvas>
        </div>
        <slot name="overlay"></slot>
      </div>
    `;
  }
}
