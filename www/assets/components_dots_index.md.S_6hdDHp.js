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
  `;r=E([k("ui-bg-dots")],r);const w=JSON.parse('{"title":"Dotted Background","description":"","frontmatter":{},"headers":[],"relativePath":"components/dots/index.md","filePath":"components/dots/index.md"}'),y={name:"components/dots/index.md"},C=Object.assign(y,{setup(i){return(o,e)=>{const a=g("ui-bg-dots");return b(),u("div",null,[e[0]||(e[0]=t("h1",{id:"dotted-background",tabindex:"-1"},[d("Dotted Background "),t("a",{class:"header-anchor",href:"#dotted-background","aria-label":"Permalink to “Dotted Background”"},"​")],-1)),e[1]||(e[1]=t("p",null,"A dot pattern background effect.",-1)),e[2]||(e[2]=t("h2",{id:"example",tabindex:"-1"},[d("Example "),t("a",{class:"header-anchor",href:"#example","aria-label":"Permalink to “Example”"},"​")],-1)),m(a,{class:"relative h-96 w-full overflow-hidden rounded-lg border border-gray-200",style:{"--dot-bg-color":"#f5f5f5"}}),e[3]||(e[3]=f(`<h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to “Code”">​</a></h2><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ui-bg-dots</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;relative h-96 w-full overflow-hidden rounded-lg border border-gray-200&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;--dot-bg-color: #f5f5f5&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ui-bg-dots</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-label="Permalink to “Credits”">​</a></h2><p><a href="https://ui.aceternity.com/components/grid-and-dot-backgrounds" target="_blank" rel="noreferrer">https://ui.aceternity.com/components/grid-and-dot-backgrounds</a></p>`,4))])}}});export{w as __pageData,C as default};
