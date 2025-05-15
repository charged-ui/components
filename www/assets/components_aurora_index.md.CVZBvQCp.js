import{i as u,n as c,h as E,k as b,t as v}from"./chunks/property.BGekRwO5.js";import"./chunks/text.CcvsKz3U.js";import{c as f,j as t,a as e,G as p,w as h,ae as m,B as k,o as y}from"./chunks/framework.B3Vu90wH.js";import"./chunks/clsx.B-dksMZM.js";var x=Object.defineProperty,_=Object.getOwnPropertyDescriptor,g=(l,r,a,s)=>{for(var i=s>1?void 0:s?_(r,a):r,o=l.length-1,d;o>=0;o--)(d=l[o])&&(i=(s?d(r,a,i):d(i))||i);return s&&i&&x(r,a,i),i};let n=class extends E{constructor(){super(...arguments),this.showRadialGradient=!0}render(){return b`
      <div class="aurora-container">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="aurora-effect ${this.showRadialGradient?"radial-mask":""}"
          ></div>
        </div>
        <div class="content-slot">
          <slot></slot>
        </div>
      </div>
    `}};n.styles=u`
    :host {
      display: block;
    }

    .aurora-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgb(250, 250, 250);
      color: rgb(2, 6, 23);
      transition: background-color 0.3s ease;
    }

    .dark .aurora-container {
      background-color: rgb(24, 24, 27);
    }

    .aurora-effect {
      --white: rgba(255, 255, 255, 1);
      --black: rgba(0, 0, 0, 1);
      --transparent: rgba(0, 0, 0, 0);
      --blue-300: rgba(147, 197, 253, 1);
      --blue-400: rgba(96, 165, 250, 1);
      --blue-500: rgba(59, 130, 246, 1);
      --indigo-300: rgba(165, 180, 252, 1);
      --violet-200: rgba(221, 214, 254, 1);

      --white-gradient: repeating-linear-gradient(
        100deg,
        var(--white) 0%,
        var(--white) 7%,
        var(--transparent) 10%,
        var(--transparent) 12%,
        var(--white) 16%
      );
      --dark-gradient: repeating-linear-gradient(
        100deg,
        var(--black) 0%,
        var(--black) 7%,
        var(--transparent) 10%,
        var(--transparent) 12%,
        var(--black) 16%
      );
      --aurora: repeating-linear-gradient(
        100deg,
        var(--blue-500) 10%,
        var(--indigo-300) 15%,
        var(--blue-300) 20%,
        var(--violet-200) 25%,
        var(--blue-400) 30%
      );

      position: absolute;
      inset: 0px;
      overflow: hidden;
      opacity: 0.5;
      pointer-events: none;
      will-change: transform;
      filter: blur(10px) invert(1);
      background-image: var(--white-gradient), var(--aurora);
      background-size: 300%, 200%;
      background-position:
        50% 50%,
        50% 50%;
    }

    .dark .aurora-effect {
      filter: blur(10px) invert(0);
      background-image: var(--dark-gradient), var(--aurora);
    }

    .aurora-effect::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: var(--white-gradient), var(--aurora);
      background-size: 200%, 100%;
      background-attachment: fixed;
      mix-blend-mode: difference;
      animation: aurora 60s linear infinite;
    }

    .dark .aurora-effect::after {
      background-image: var(--dark-gradient), var(--aurora);
    }

    .radial-mask {
      mask-image: radial-gradient(
        ellipse at 100% 0%,
        black 10%,
        var(--transparent) 70%
      );
      -webkit-mask-image: radial-gradient(
        ellipse at 100% 0%,
        black 10%,
        var(--transparent) 70%
      );
    }

    @keyframes aurora {
      0% {
        background-position:
          0% 0%,
          0% 0%;
      }
      50% {
        background-position:
          100% 100%,
          100% 100%;
      }
      100% {
        background-position:
          0% 0%,
          0% 0%;
      }
    }

    .content-slot {
      position: relative;
      z-index: 1;
    }
  `;g([c({type:Boolean})],n.prototype,"showRadialGradient",2);n=g([v("ui-bg-aurora")],n);const w={class:"rounded-2xl flex flex-col justify-center relative overflow-hidden"},A={class:"flex flex-col gap-4 px-8 py-24 text-center"},q=JSON.parse('{"title":"Aurora Background","description":"","frontmatter":{},"headers":[],"relativePath":"components/aurora/index.md","filePath":"components/aurora/index.md"}'),B={name:"components/aurora/index.md"},T=Object.assign(B,{setup(l){return(r,a)=>{const s=k("ui-text"),i=k("ui-bg-aurora");return y(),f("div",null,[a[2]||(a[2]=t("h1",{id:"aurora-background",tabindex:"-1"},[e("Aurora Background "),t("a",{class:"header-anchor",href:"#aurora-background","aria-label":'Permalink to "Aurora Background"'},"​")],-1)),a[3]||(a[3]=t("p",null,"An aurora background effect with a radial gradient mask.",-1)),a[4]||(a[4]=t("h2",{id:"example",tabindex:"-1"},[e("Example "),t("a",{class:"header-anchor",href:"#example","aria-label":'Permalink to "Example"'},"​")],-1)),t("div",w,[p(i,{"show-radial-gradient":""},{default:h(()=>[t("div",A,[p(s,{variant:"heading-3"},{default:h(()=>a[0]||(a[0]=[e(" Aurora Background ")])),_:1}),p(s,{variant:"display-6"},{default:h(()=>a[1]||(a[1]=[e("This is a beautiful aurora effect with a radial gradient mask.")])),_:1})])]),_:1})]),a[5]||(a[5]=m(`<h2 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ui-bg-aurora</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> show-radial-gradient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;flex flex-col gap-4 px-8 py-24 text-center&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ui-text</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> variant</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;heading-3&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Aurora Background&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ui-text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ui-text</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> variant</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;display-6&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      This is a beautiful aurora effect with a radial gradient mask.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ui-text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ui-bg-aurora</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-label="Permalink to &quot;Credits&quot;">​</a></h2><p><a href="https://ui.aceternity.com/components/aurora-background" target="_blank" rel="noreferrer">https://ui.aceternity.com/components/aurora-background</a></p>`,4))])}}});export{q as __pageData,T as default};
