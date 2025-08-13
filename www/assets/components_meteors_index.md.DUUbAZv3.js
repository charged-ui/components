import{r as c,i as w,h as g,k as h,c as k}from"./chunks/registry.DEgqvEkJ.js";import{n as l}from"./chunks/property.B9LzXozf.js";import{r as u}from"./chunks/state.RDa1mCCu.js";import{I as b,c as y,o as f,j as o,af as x,a as m,J as v}from"./chunks/framework.CB17hpbL.js";const E="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.pointer-events-none{pointer-events:none}.static{position:static}.absolute{position:absolute}.relative{position:relative}.top-1\\/2{top:50%}.-z-10{z-index:-10}.block{display:block}.hidden{display:none}.h-0\\.5{height:.125rem}.h-px{height:1px}.w-0\\.5{width:.125rem}.w-12{width:3rem}.-translate-y-1\\/2{--tw-translate-y:-50%}.-translate-y-1\\/2,.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rounded-full{border-radius:9999px}.bg-zinc-500{--tw-bg-opacity:1;background-color:rgb(113 113 122/var(--tw-bg-opacity))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.from-zinc-500{--tw-gradient-from:#71717a var(--tw-gradient-from-position);--tw-gradient-to:#71717a00 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.to-transparent{--tw-gradient-to:#0000 var(--tw-gradient-to-position)}.shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";var D=Object.defineProperty,_=Object.getOwnPropertyDescriptor,i=(t,s,e,n)=>{for(var r=n>1?void 0:n?_(s,e):s,p=t.length-1,d;p>=0;p--)(d=t[p])&&(r=(n?d(s,e,r):d(r))||r);return n&&r&&D(s,e,r),r};let a=class extends g{constructor(){super(...arguments),this.number=20,this.minDelay=.2,this.maxDelay=1.2,this.minDuration=2,this.maxDuration=10,this.angle=60,this.meteorStyles=[]}firstUpdated(){this.generateMeteorStyles()}updated(t){(t.has("number")||t.has("minDelay")||t.has("maxDelay")||t.has("minDuration")||t.has("maxDuration")||t.has("angle"))&&this.generateMeteorStyles()}generateMeteorStyles(){const t=[];for(let s=0;s<this.number;s++)t.push({angle:`${-this.angle}deg`,top:"-5%",left:`calc(0% + ${Math.floor(Math.random()*window.innerWidth)}px)`,animationDelay:`${Math.random()*(this.maxDelay-this.minDelay)+this.minDelay}s`,animationDuration:`${Math.floor(Math.random()*(this.maxDuration-this.minDuration)+this.minDuration)}s`});this.meteorStyles=t}render(){return h`
      ${this.meteorStyles.map((t,s)=>h`
          <span
            class="meteor pointer-events-none absolute w-0.5 h-0.5 rounded-full bg-zinc-500 shadow-sm"
            style="
            --angle: ${t.angle};
            top: ${t.top};
            left: ${t.left};
            animation-delay: ${t.animationDelay};
            animation-duration: ${t.animationDuration};
            transform: rotate(var(--angle));
            box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
          "
          >
            <div
              class="pointer-events-none absolute top-1/2 -z-10 h-px w-12 -translate-y-1/2 bg-gradient-to-r from-zinc-500 to-transparent"
            ></div>
          </span>
          <div class="content-slot">
            <slot></slot>
          </div>
        `)}
    `}};a.styles=w`
    ${c(E)}

    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }

    @keyframes meteor {
      0% {
        transform: rotate(var(--angle)) translateX(0);
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        transform: rotate(var(--angle)) translateX(-500px);
        opacity: 0;
      }
    }

    .meteor {
      animation: meteor linear infinite;
    }

    .content-slot {
      position: relative;
      z-index: 1;
    }
  `;i([l({type:Number})],a.prototype,"number",2);i([l({type:Number})],a.prototype,"minDelay",2);i([l({type:Number})],a.prototype,"maxDelay",2);i([l({type:Number})],a.prototype,"minDuration",2);i([l({type:Number})],a.prototype,"maxDuration",2);i([l({type:Number})],a.prototype,"angle",2);i([u()],a.prototype,"meteorStyles",2);a=i([k("ui-bg-meteors")],a);const C={class:"relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-200"},B=JSON.parse('{"title":"Meteors Background","description":"","frontmatter":{},"headers":[],"relativePath":"components/meteors/index.md","filePath":"components/meteors/index.md"}'),M={name:"components/meteors/index.md"},F=Object.assign(M,{setup(t){return(s,e)=>{const n=b("ui-bg-meteors");return f(),y("div",null,[e[1]||(e[1]=o("h1",{id:"meteors-background",tabindex:"-1"},[m("Meteors Background "),o("a",{class:"header-anchor",href:"#meteors-background","aria-label":"Permalink to “Meteors Background”"},"​")],-1)),e[2]||(e[2]=o("p",null,"A meteor shower background effect.",-1)),e[3]||(e[3]=o("h2",{id:"example",tabindex:"-1"},[m("Example "),o("a",{class:"header-anchor",href:"#example","aria-label":"Permalink to “Example”"},"​")],-1)),o("div",C,[v(n,{number:"20"}),e[0]||(e[0]=o("span",{class:"pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent"}," Meteors ",-1))]),e[4]||(e[4]=x(`<h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to “Code”">​</a></h2><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;relative overflow-hidden h-[500px]&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ui-bg-meteors</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;20&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ui-bg-meteors</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-label="Permalink to “Credits”">​</a></h2><p><a href="https://magicui.design/docs/components/meteors" target="_blank" rel="noreferrer">https://magicui.design/docs/components/meteors</a></p>`,4))])}}});export{B as __pageData,F as default};
