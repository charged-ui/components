!function(e,o){"object"==typeof exports&&"undefined"!=typeof module?o(require("lit")):"function"==typeof define&&define.amd?define(["lit"],o):o((e="undefined"!=typeof globalThis?globalThis:e||self).lit)}(this,(function(e){"use strict";class o extends e.LitElement{render(){return e.html`<div>Icon Box</div>`}}o.styles=e.css`
    :host {
      display: block;
      padding: 16px;
      background-color: var(--another-component-bg-color, lightgrey);
    }
  `,customElements.define("ui-icon-box",o)}));
