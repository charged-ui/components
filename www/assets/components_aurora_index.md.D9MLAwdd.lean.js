import{i as u,n as c,h as E,k as b,t as f}from"./chunks/property.NcA2NZIx.js";import"./chunks/text.DLsk4-vP.js";import{I as h,c as v,o as m,j as r,af as y,a as e,J as p,w as k}from"./chunks/framework.CB17hpbL.js";import"./chunks/clsx.B-dksMZM.js";var x=Object.defineProperty,_=Object.getOwnPropertyDescriptor,g=(l,t,a,s)=>{for(var i=s>1?void 0:s?_(t,a):t,o=l.length-1,d;o>=0;o--)(d=l[o])&&(i=(s?d(t,a,i):d(i))||i);return s&&i&&x(t,a,i),i};let n=class extends E{constructor(){super(...arguments),this.showRadialGradient=!0}render(){return b`
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
  `;g([c({type:Boolean})],n.prototype,"showRadialGradient",2);n=g([f("ui-bg-aurora")],n);const w={class:"rounded-2xl flex flex-col justify-center relative overflow-hidden"},A={class:"flex flex-col gap-4 px-8 py-24 text-center"},T=JSON.parse('{"title":"Aurora Background","description":"","frontmatter":{},"headers":[],"relativePath":"components/aurora/index.md","filePath":"components/aurora/index.md"}'),C={name:"components/aurora/index.md"},j=Object.assign(C,{setup(l){return(t,a)=>{const s=h("ui-text"),i=h("ui-bg-aurora");return m(),v("div",null,[a[2]||(a[2]=r("h1",{id:"aurora-background",tabindex:"-1"},[e("Aurora Background "),r("a",{class:"header-anchor",href:"#aurora-background","aria-label":"Permalink to “Aurora Background”"},"​")],-1)),a[3]||(a[3]=r("p",null,"An aurora background effect with a radial gradient mask.",-1)),a[4]||(a[4]=r("h2",{id:"example",tabindex:"-1"},[e("Example "),r("a",{class:"header-anchor",href:"#example","aria-label":"Permalink to “Example”"},"​")],-1)),r("div",w,[p(i,{"show-radial-gradient":""},{default:k(()=>[r("div",A,[p(s,{variant:"heading-3"},{default:k(()=>a[0]||(a[0]=[e(" Aurora Background ")])),_:1}),p(s,{variant:"display-6"},{default:k(()=>a[1]||(a[1]=[e("This is a beautiful aurora effect with a radial gradient mask.")])),_:1})])]),_:1})]),a[5]||(a[5]=y("",4))])}}});export{T as __pageData,j as default};
