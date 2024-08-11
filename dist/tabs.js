!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("lit")):"function"==typeof define&&define.amd?define(["lit"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).lit)}(this,(function(e){"use strict";class t extends e.LitElement{render(){return e.html`<div>Tabs</div>`}}t.styles=e.css`
    :host {
      display: block;
      padding: 16px;
      background-color: var(--another-component-bg-color, lightgrey);
    }
  `,customElements.define("ui-tabs",t)}));
