!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("lit")):"function"==typeof define&&define.amd?define(["lit"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).lit)}(this,(function(e){"use strict";class t extends e.LitElement{render(){return e.html`<div>Accordion</div>`}}t.styles=e.css`
    :host {
      display: block;
      padding: 16px;
      color: var(--my-component-text-color, black);
    }
  `,customElements.define("ui-accordion",t)}));
