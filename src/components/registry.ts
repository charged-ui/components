export function chargedCustomElement(tagName: string) {
  return function <T extends CustomElementConstructor>(constructor: T): T {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, constructor);
    }
    return constructor;
  };
}
