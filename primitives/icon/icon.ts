import { LitElement, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { chargedCustomElement } from '../../registry';

export type IconProps = {
  name?: string;
  variant?: 'outline' | 'solid';
  size?: string;
} & React.HTMLAttributes<HTMLDivElement>;

@chargedCustomElement('ui-icon')
export class UIIcon extends LitElement {
  @property({ type: String }) name?: string;
  @property({ type: String }) variant: 'outline' | 'solid' = 'outline';
  @property({ type: String }) size: string = '24';
  @state() private content: string = '';

  connectedCallback() {
    super.connectedCallback();
    // Expose the icon to assistive tech. If no aria-label is set by the
    // consumer, fall back to the icon name (better than silence).
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'img');
    }
    if (!this.hasAttribute('aria-label') && this.name) {
      this.setAttribute('aria-label', this.name);
    }
  }

  static styles = css`
    :host {
      display: block;
      width: 24px;
      height: 24px;
    }
  `;

  /**
   * Checks for changes in 'name' or 'variant' and fetches the new icon.
   */
  async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('name') || changedProperties.has('variant')) {
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

declare global {
  interface HTMLElementTagNameMap {
    'ui-icon': UIIcon;
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ui-icon': IconProps;
    }
  }
}
