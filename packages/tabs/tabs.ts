import {
  LitElement,
  html
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Define a simple Lit component
class ChargedTabs extends LitElement {
  render() {
    return html` <p>Hello, Lit!</p> `;
  }
}

// Register the component with a custom element name
customElements.define('ui-tabs', ChargedTabs);
