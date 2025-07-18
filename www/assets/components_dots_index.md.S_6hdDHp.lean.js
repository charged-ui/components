import{i as c,h,k as p,t as k}from"./chunks/custom-element.bqZC5aEv.js";import{I as g,c as u,o as b,j as t,J as m,af as f,a as d}from"./chunks/framework.CB17hpbL.js";var v=Object.getOwnPropertyDescriptor,E=(i,o,e,a)=>{for(var s=a>1?void 0:a?v(o,e):o,n=i.length-1,l;n>=0;n--)(l=i[n])&&(s=l(s)||s);return s};let r=class extends h{render(){return p`
      <div class="container">
        <div class="ui-bg-dots-pattern"></div>
        <div class="dot-mask-gradient"></div>
        <slot></slot>
      </div>
    `}};r.styles=c`
    :host {
      /* Make the custom element a block element and allow it to fill its parent */
      display: block;
      width: 100%;
      height: 100%;
      position: relative; /* Ensure the host is relative for absolute children */

      /* CSS Variables for customization - Light Mode Defaults */
      --dot-bg-color: white;
      --dot-pattern-color: #d4d4d4; /* Tailwind neutral-300 */
      --dot-mask-bg-color: white;
      /* Text gradient variables are no longer needed in this background-only component */
    }

    /* Dark Mode Overrides (apply 'dark' class to the <ui-bg-dots> element) */
    :host(.dark) {
      --dot-bg-color: black;
      --dot-pattern-color: #404040; /* Tailwind neutral-700 */
      --dot-mask-bg-color: black;
    }

    .container {
      background-color: var(--dot-bg-color);
      position: absolute; /* Fill the host element */
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden; /* Hide overflow from the background patterns */
    }

    .ui-bg-dots-pattern {
      background-size: 20px 20px;
      background-image: radial-gradient(
        var(--dot-pattern-color) 1px,
        transparent 1px
      );
      position: absolute;
      inset: 0;
    }

    .dot-mask-gradient {
      background-color: var(--dot-mask-bg-color);
      mask-image: radial-gradient(ellipse at center, transparent 20%, black);
      pointer-events: none; /* Allow clicks to pass through the mask */
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Slot for content */
    ::slotted(*) {
      position: relative; /* Ensure slotted content is above the background */
      z-index: 20; /* Match the original z-index for content */
    }
  `;r=E([k("ui-bg-dots")],r);const w=JSON.parse('{"title":"Dotted Background","description":"","frontmatter":{},"headers":[],"relativePath":"components/dots/index.md","filePath":"components/dots/index.md"}'),y={name:"components/dots/index.md"},C=Object.assign(y,{setup(i){return(o,e)=>{const a=g("ui-bg-dots");return b(),u("div",null,[e[0]||(e[0]=t("h1",{id:"dotted-background",tabindex:"-1"},[d("Dotted Background "),t("a",{class:"header-anchor",href:"#dotted-background","aria-label":"Permalink to “Dotted Background”"},"​")],-1)),e[1]||(e[1]=t("p",null,"A dot pattern background effect.",-1)),e[2]||(e[2]=t("h2",{id:"example",tabindex:"-1"},[d("Example "),t("a",{class:"header-anchor",href:"#example","aria-label":"Permalink to “Example”"},"​")],-1)),m(a,{class:"relative h-96 w-full overflow-hidden rounded-lg border border-gray-200",style:{"--dot-bg-color":"#f5f5f5"}}),e[3]||(e[3]=f("",4))])}}});export{w as __pageData,C as default};
