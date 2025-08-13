import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit-html';

export declare interface GlobeMarker {
    location: [number, number];
    size: number;
}

export declare class UIGlobe extends LitElement {
    phi: number;
    theta: number;
    autoRotateSpeed: number;
    dark: number;
    diffuse: number;
    mapSamples: number;
    mapBrightness: number;
    baseColor: [
    number,
    number,
    number
    ];
    markerColor: [
    number,
    number,
    number
    ];
    glowColor: [
    number,
    number,
    number
    ];
    aspectRatio: number;
    scale: number;
    offset: [number, number];
    size: number;
    markers: GlobeMarker[];
    private globe;
    private animationPhi;
    private containerWidth;
    private containerHeight;
    private scaledOffset;
    private canvas;
    private container;
    static styles: CSSResult;
    firstUpdated(): void;
    updated(changedProperties: Map<string, any>): void;
    disconnectedCallback(): void;
    private updateSizeStyles;
    private updateAspectRatio;
    private updateContainerSize;
    private setupResizeObserver;
    private initializeGlobe;
    render(): TemplateResult<1>;
}

export { }


declare global {
    interface HTMLElementTagNameMap {
        'ui-combobox': UICombobox;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'ui-bg-meteors': MeteorsComponent;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'ui-bg-dots': DotsBackground;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'ui-modal': UIModal;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'ui-bg-ripple': RippleBackground;
    }
}
