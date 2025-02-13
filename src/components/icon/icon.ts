import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import styles from './icon.css?raw';

@customElement('ui-icon')
export class UIIcon extends LitElement {
  @property({ type: String }) name?: string; // The icon name, e.g., "arrow-right"
  @property({ type: String }) variant: 'outline' | 'solid' = 'outline'; // Heroicons type
  @property({ type: String }) size: string = '24'; // Default icon size
  @state() private content: string = ''; // Store the fetched SVG

  static styles = css`
    ${unsafeCSS(styles)}
    :host {
      width: 24px;
      height: 24px;
    }
  `;

  /**
   * Checks for changes in 'name' or 'variant' and fetches the new icon.
   */
  async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('name') || changedProperties.has('style')) {
      await this.fetchIcon();
    }
  }

  /**
   * Fetches the SVG for the specified icon from the CDN.
   */
  async fetchIcon() {
    if (!this.name) return;

    // Heroicons CDN URL
    const cdn = 'https://cdn.jsdelivr.net/npm/heroicons@latest';

    // Determine icon style path
    const path = this.variant === 'solid' ? 'solid' : 'outline';

    // Construct URL
    const url = `${cdn}/${this.size}/${path}/${this.name}.svg`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Icon not found');

      this.content = await response.text();
    } catch (error) {
      console.error(`Failed to fetch icon: ${error}`);
      this.content = ''; // Fallback in case of failure
    }
  }

  render() {
    if (!this.content) return; // Skip rendering if no SVG content
    return unsafeHTML(this.content);
  }
}
