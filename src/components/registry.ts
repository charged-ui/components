import { LitElement } from 'lit';

/**
 * Custom decorator for registering custom elements with the Charged UI prefix
 * This ensures consistent naming and prevents conflicts with other libraries
 */
export function chargedCustomElement(tagName: string) {
  return function <T extends new (...args: any[]) => LitElement>(
    constructor: T
  ) {
    // Only register if not already registered
    if (!customElements.get(tagName)) {
      customElements.define(tagName, constructor);
    }
    return constructor;
  };
}

/**
 * Utility function to check if a custom element is already registered
 */
export function isElementRegistered(tagName: string): boolean {
  return !!customElements.get(tagName);
}

/**
 * Utility function to get a custom element constructor
 */
export function getElementConstructor(
  tagName: string
): CustomElementConstructor | undefined {
  return customElements.get(tagName);
}
