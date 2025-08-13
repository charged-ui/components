import { CSSResult } from 'lit';
import { CSSResultGroup } from 'lit';
import { DirectiveResult } from 'lit-html/directive';
import { LitElement } from 'lit';
import { PropertyValues } from 'lit';
import { TemplateResult } from 'lit-html';
import { UnsafeHTMLDirective } from 'lit-html/directives/unsafe-html';

declare enum AlertVariant {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info"
}

export declare class AuroraBackground extends LitElement {
    showRadialGradient: boolean;
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

declare enum ButtonShape {
    Square = "square",
    Rounded = "rounded"
}

declare enum ButtonSize {
    Small = "small",
    Medium = "medium",
    Large = "large"
}

declare enum ButtonVariant {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary",
    Warning = "warning",
    Error = "error",
    Success = "success",
    Info = "info"
}

export declare class DotsBackground extends LitElement {
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

declare interface GlobeMarker {
    location: [number, number];
    size: number;
}

declare interface HeroIcon {
    name: string;
    size: number;
    style: string;
    path: string;
    filename: string;
}

export declare class MeteorsComponent extends LitElement {
    number: number;
    minDelay: number;
    maxDelay: number;
    minDuration: number;
    maxDuration: number;
    angle: number;
    private meteorStyles;
    static styles: CSSResult;
    protected firstUpdated(): void;
    protected updated(changedProperties: PropertyValues): void;
    private generateMeteorStyles;
    render(): TemplateResult<1>;
}

export declare class RippleBackground extends LitElement {
    mainCircleSize: number;
    mainCircleOpacity: number;
    numCircles: number;
    static styles: CSSResultGroup;
    private generateCircles;
    render(): TemplateResult<1>;
}

declare enum TextAlignment {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right",
    JUSTIFY = "justify"
}

declare enum TextVariant {
    H1 = "heading-1",
    H2 = "heading-2",
    H3 = "heading-3",
    H4 = "heading-4",
    H5 = "heading-5",
    H6 = "heading-6",
    D1 = "display-1",
    D2 = "display-2",
    D3 = "display-3",
    D4 = "display-4",
    D5 = "display-5",
    D6 = "display-6",
    XL = "copy-xl",
    LG = "copy-lg",
    MD = "copy-md",
    SM = "copy-sm",
    XS = "copy-xs"
}

export declare class UIAlert extends LitElement {
    variant: AlertVariant;
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export declare class UIButton extends LitElement {
    size: ButtonSize;
    shape: ButtonShape;
    variant: ButtonVariant;
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export declare class UICard extends LitElement {
    variant?: string;
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export declare class UICombobox extends LitElement {
    placeholder: string;
    private currentFocus;
    private expanded;
    static styles: CSSResult;
    handleFocus(): void;
    handleBlur(): void;
    handleKeyDown(e: KeyboardEvent): void;
    handleSlotChange(): void;
    render(): TemplateResult<1>;
}

export declare class UIGallery extends LitElement {
    static styles: CSSResult;
    columns: number;
    allLabel?: string;
    activeFilter: string;
    private filters;
    get gridClasses(): string;
    detectFiltersFromChildren(): void;
    formatCategoryLabel(category: string): string;
    setFilter(filterId: string): void;
    updateVisibility(): void;
    animateItems(): void;
    handleSlotChange(): void;
    firstUpdated(): void;
    updated(changedProperties: Map<PropertyKey, unknown>): void;
    render(): TemplateResult<1>;
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

export declare class UIIcon extends LitElement {
    name?: string;
    variant: 'outline' | 'solid';
    size: string;
    private content;
    static styles: CSSResult;
    /**
     * Checks for changes in 'name' or 'variant' and fetches the new icon.
     */
    updated(changedProperties: Map<string, any>): Promise<void>;
    /**
     * Fetches the SVG for the specified icon from the CDN.
     */
    fetchIcon(): Promise<void>;
    render(): DirectiveResult<UnsafeHTMLDirective> | undefined;
}

export declare class UIIconSelector extends LitElement {
    icons: HeroIcon[];
    selectedIcon: string;
    size: number;
    variant: string;
    private searchQuery;
    private filteredIcons;
    modalOpen: boolean;
    openModal(): void;
    closeModal(): void;
    handleModalClose(): void;
    static styles: CSSResult;
    constructor();
    filterIcons(): void;
    applySearchFilter(): void;
    handleSearch(e: Event): void;
    updated(changedProperties: Map<string, unknown>): void;
    handleIconSelect(iconName: string): void;
    render(): TemplateResult<1>;
}

export declare class UIModal extends LitElement {
    isOpen: boolean;
    title: string;
    closeOnBackdrop: boolean;
    closeOnEscape: boolean;
    size: string;
    private _portalContainer;
    static styles: CSSResult;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _createPortalContainer;
    private _cleanupPortalContainer;
    private _bindEvents;
    private _unbindEvents;
    private _handleKeydown;
    private _handleBackdropClick;
    private _getSizeClasses;
    open(): void;
    close(): void;
    private _preventBodyScroll;
    private _restoreBodyScroll;
    updated(changedProperties: Map<string, any>): void;
    private _restoreContent;
    private _renderToPortal;
    render(): TemplateResult<1>;
}

export declare class UIStat extends UIText {
    start: number;
    end: number;
    duration: number;
    delay: number;
    private counter?;
    static styles: CSSResult;
    firstUpdated(): void;
    render(): TemplateResult<1>;
}

export declare class UIText extends LitElement {
    variant: TextVariant;
    align: TextAlignment;
    static styles: CSSResult;
    render(): TemplateResult<1>;
}

export { }


declare global {
    interface HTMLElementTagNameMap {
        'ui-bg-ripple': RippleBackground;
    }
}
