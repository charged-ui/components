import { CSSResult } from 'lit';
import { LitElement } from 'lit';
import { TemplateResult } from 'lit-html';

declare interface HeroIcon {
    name: string;
    size: number;
    style: string;
    path: string;
    filename: string;
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

export { }
