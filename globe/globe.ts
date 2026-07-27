import { LitElement, html, css } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { chargedCustomElement } from '../registry';
import createGlobe from 'cobe';
import './globe.css';

export interface GlobeMarker {
	location: [number, number]; // [longitude, latitude]
	size: number;
}

export type GlobeProps = {
	phi?: number;
	theta?: number;
	autoRotateSpeed?: number;
	dark?: number;
	diffuse?: number;
	mapSamples?: number;
	mapBrightness?: number;
	baseColor?: [number, number, number];
	markerColor?: [number, number, number];
	glowColor?: [number, number, number];
	aspectRatio?: number;
	scale?: number;
	offset?: [number, number];
	size?: number;
	markers?: GlobeMarker[];
} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-globe')
export class UIGlobe extends LitElement {
	// Globe positioning - explicit attribute names for CMS compatibility
	@property({ type: Number }) phi = 0;
	@property({ type: Number }) theta = 0;
	@property({ type: Number, attribute: 'auto-rotate-speed' }) autoRotateSpeed =
		0.01;

	// Visual styling - explicit attribute names for multi-word properties
	@property({ type: Number }) dark = 1;
	@property({ type: Number }) diffuse = 1.2;
	@property({ type: Number, attribute: 'map-samples' }) mapSamples = 4000;
	@property({ type: Number, attribute: 'map-brightness' }) mapBrightness = 6;
	@property({ type: Array, attribute: 'base-color' }) baseColor: [
		number,
		number,
		number,
	] = [0.3, 0.3, 0.3];
	@property({ type: Array, attribute: 'marker-color' }) markerColor: [
		number,
		number,
		number,
	] = [0.1, 0.8, 1];
	@property({ type: Array, attribute: 'glow-color' }) glowColor: [
		number,
		number,
		number,
	] = [1, 1, 1];

	// Scaling and positioning
	@property({ type: Number, attribute: 'aspect-ratio' }) aspectRatio = 1;
	@property({ type: Number }) scale = 1;
	@property({ type: Array }) offset: [number, number] = [0, 0];

	// Size control
	@property({ type: Number }) size = 400;

	// Interactive elements
	@property({ type: Array }) markers: GlobeMarker[] = [];

	// Internal state
	@state() private globe: any = null;
	@state() private animationPhi = 0;
	@state() private containerWidth = 0;
	@state() private containerHeight = 0;
	@state() private scaledOffset: [number, number] = [0, 0];

	private intersectionObserver?: IntersectionObserver;
	private isVisible = false;
	private prefersReducedMotion = false;

	@query('canvas') private canvas!: HTMLCanvasElement;
	@query('.globe-container') private container!: HTMLElement;

	static styles = css`
		:host {
			display: block;
			width: var(--globe-size, 100%);
			min-width: 200px;
			max-width: var(--globe-max-size, 800px);
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
		this.setupResizeObserver();

		this.prefersReducedMotion = matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		// Defer globe initialization until the element is on-screen AND the
		// browser has idle time. Keeps TBT clean during initial load.
		this.intersectionObserver = new IntersectionObserver(
			(entries) => {
				const wasVisible = this.isVisible;
				this.isVisible = entries[0]?.isIntersecting ?? false;

				if (this.isVisible && !this.globe) {
					const schedule: (cb: () => void) => void =
						'requestIdleCallback' in window
							? (cb) =>
									(window as any).requestIdleCallback(cb, { timeout: 2000 })
							: (cb) => window.setTimeout(cb, 1500);
					schedule(() => this.initializeGlobe());
				}

				if (!wasVisible && this.isVisible && this.canvas) {
					this.canvas.style.opacity = '1';
				}
			},
			{ rootMargin: '200px' },
		);
		this.intersectionObserver.observe(this);
	}

	updated(changedProperties: Map<string, any>) {
		if (changedProperties.has('size')) {
			this.updateSizeStyles();
			this.updateContainerSize();
		}
		if (changedProperties.has('aspectRatio')) {
			this.updateAspectRatio();
		}
		if (changedProperties.has('offset')) {
			this.updateContainerSize();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.intersectionObserver?.disconnect();
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
		if (this.size > 0) {
			const scaleFactor = this.containerWidth / this.size;
			let scaledX = this.offset[0] * scaleFactor;
			let scaledY = this.offset[1] * scaleFactor;
			const intendedGlobeHeight = this.size / this.aspectRatio;
			const offsetPercentageX = this.offset[0] / this.size;
			const offsetPercentageY = this.offset[1] / intendedGlobeHeight;
			const maxHiddenX = this.containerWidth * 0.9;
			const maxHiddenY = this.containerHeight * 0.9;
			if (Math.abs(scaledY) > maxHiddenY) {
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
		if (
			!this.canvas ||
			!this.containerWidth ||
			!this.containerHeight ||
			this.globe
		)
			return;
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
				if (this.isVisible && !this.prefersReducedMotion) {
					this.animationPhi += this.autoRotateSpeed;
				}
				state.phi = this.animationPhi;
				state.theta = this.theta;
				state.width = this.containerWidth * 2;
				state.height = this.containerHeight * 2;
			},
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
