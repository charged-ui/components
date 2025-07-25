import { LitElement, html, css, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { safeCustomElement } from '../registry';
import createGlobe from 'cobe';
import styles from './globe.css?raw';

export interface GlobeMarker {
  location: [number, number]; // [longitude, latitude]
  size: number;
}

@safeCustomElement('ui-globe')
export class UIGlobe extends LitElement {
  // Globe positioning - explicit attribute names for CMS compatibility
  @property({ type: Number }) phi = 0;
  @property({ type: Number }) theta = 0;
  @property({ type: Number, attribute: 'auto-rotate-speed' }) autoRotateSpeed =
    0.01;

  // Visual styling - explicit attribute names for multi-word properties
  @property({ type: Number }) dark = 1;
  @property({ type: Number }) diffuse = 1.2;
  @property({ type: Number, attribute: 'map-samples' }) mapSamples = 8000;
  @property({ type: Number, attribute: 'map-brightness' }) mapBrightness = 6;
  @property({ type: Array, attribute: 'base-color' }) baseColor: [
    number,
    number,
    number
  ] = [0.3, 0.3, 0.3];
  @property({ type: Array, attribute: 'marker-color' }) markerColor: [
    number,
    number,
    number
  ] = [0.1, 0.8, 1];
  @property({ type: Array, attribute: 'glow-color' }) glowColor: [
    number,
    number,
    number
  ] = [1, 1, 1];

  // Scaling and positioning
  @property({ type: Number, attribute: 'aspect-ratio' }) aspectRatio = 1;
  @property({ type: Number }) scale = 1;
  @property({ type: Array }) offset: [number, number] = [0, 0];

  // Size control - new property
  @property({ type: Number }) size = 400;

  // Interactive elements
  @property({ type: Array }) markers: GlobeMarker[] = [];

  // Internal state
  @state() private globe: any = null;
  @state() private animationPhi = 0;
  @state() private containerWidth = 0;
  @state() private containerHeight = 0;
  @state() private scaledOffset: [number, number] = [0, 0];

  @query('canvas') private canvas!: HTMLCanvasElement;
  @query('.globe-container') private container!: HTMLElement;

  static styles = css`
    ${unsafeCSS(styles)}
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

  firstUpdated() {
    this.updateSizeStyles();
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

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('size')) {
      this.updateSizeStyles();
      // Recalculate scaled offset when size changes
      this.updateContainerSize();
    }
    if (changedProperties.has('aspectRatio')) {
      this.updateAspectRatio();
    }
    if (changedProperties.has('offset')) {
      // Recalculate scaled offset when offset changes
      this.updateContainerSize();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.globe) {
      this.globe.destroy?.();
    }
  }

  private updateSizeStyles() {
    if (this.size > 0) {
      this.style.setProperty('--globe-size', `${this.size}px`);
      this.style.setProperty('--globe-max-size', `${this.size}px`);
    } else {
      this.style.removeProperty('--globe-size');
      this.style.removeProperty('--globe-max-size');
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

    // Calculate scaled offset based on container size vs intended size
    if (this.size > 0) {
      const scaleFactor = this.containerWidth / this.size;
      let scaledX = this.offset[0] * scaleFactor;
      let scaledY = this.offset[1] * scaleFactor;

      // Calculate the intended globe size at the original dimensions
      const intendedGlobeHeight = this.size / this.aspectRatio;

      // Calculate what percentage of the globe the original offset represents
      const offsetPercentageX = this.offset[0] / this.size;
      const offsetPercentageY = this.offset[1] / intendedGlobeHeight;

      // For responsive behavior, maintain the same visual relationship
      // but ensure the globe doesn't get pushed completely out of view

      // If the offset would push more than 90% of the globe out of view,
      // cap it to show at least 10% of the globe
      const maxHiddenX = this.containerWidth * 0.9;
      const maxHiddenY = this.containerHeight * 0.9;

      // Apply the caps while trying to maintain the visual intent
      if (Math.abs(scaledY) > maxHiddenY) {
        // Maintain the direction but cap the amount
        scaledY = Math.sign(scaledY) * maxHiddenY;
      }

      if (Math.abs(scaledX) > maxHiddenX) {
        scaledX = Math.sign(scaledX) * maxHiddenX;
      }

      this.scaledOffset = [scaledX, scaledY];
    } else {
      this.scaledOffset = [...this.offset];
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') return;

    const resizeObserver = new ResizeObserver(() => {
      this.updateContainerSize();
    });

    resizeObserver.observe(this.container);
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
      offset: this.scaledOffset,
      onRender: (state: any) => {
        this.animationPhi += this.autoRotateSpeed;
        state.phi = this.animationPhi;
        state.theta = this.theta;
        state.width = this.containerWidth * 2;
        state.height = this.containerHeight * 2;
      }
    });
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
