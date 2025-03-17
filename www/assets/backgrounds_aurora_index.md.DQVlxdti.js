import{i as c,n as g,h as b,k as p,t as f}from"./chunks/property.BGekRwO5.js";import{c as v,j as r,a as d,G as k,w as m,B as h,o as x}from"./chunks/framework.B3Vu90wH.js";var w=Object.defineProperty,_=Object.getOwnPropertyDescriptor,u=(i,o,a,t)=>{for(var e=t>1?void 0:t?_(o,a):o,s=i.length-1,l;s>=0;s--)(l=i[s])&&(e=(t?l(o,a,e):l(e))||e);return t&&e&&w(o,a,e),e};let n=class extends b{constructor(){super(...arguments),this.showRadialGradient=!0}render(){return p`
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
    `}};n.styles=c`
    :host {
      display: block;
    }

    .aurora-container {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100vh;
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
      inset: -10px;
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
  `;u([g({type:Boolean})],n.prototype,"showRadialGradient",2);n=u([f("ui-bg-aurora")],n);const y={class:"p-8 bg-gradient-to-b from-indigo-50 to-transparent rounded-2xl flex flex-col justify-center"},A=JSON.parse('{"title":"Aurora Background","description":"","frontmatter":{},"headers":[],"relativePath":"backgrounds/aurora/index.md","filePath":"backgrounds/aurora/index.md"}'),B={name:"backgrounds/aurora/index.md"},O=Object.assign(B,{setup(i){return(o,a)=>{const t=h("ui-bg-aurora");return x(),v("div",null,[a[1]||(a[1]=r("h1",{id:"aurora-background",tabindex:"-1"},[d("Aurora Background "),r("a",{class:"header-anchor",href:"#aurora-background","aria-label":'Permalink to "Aurora Background"'},"​")],-1)),a[2]||(a[2]=r("p",null,"Aurora background effect",-1)),a[3]||(a[3]=r("h2",{id:"example",tabindex:"-1"},[d("Example "),r("a",{class:"header-anchor",href:"#example","aria-label":'Permalink to "Example"'},"​")],-1)),r("div",y,[k(t,{"show-radial-gradient":""},{default:m(()=>a[0]||(a[0]=[r("h1",null,"Hello, Aurora!",-1),r("p",null,"This is a beautiful aurora effect with a radial gradient mask.",-1)])),_:1})]),a[4]||(a[4]=r("h2",{id:"source",tabindex:"-1"},[d("Source "),r("a",{class:"header-anchor",href:"#source","aria-label":'Permalink to "Source"'},"​")],-1)),a[5]||(a[5]=r("p",null,[r("a",{href:"https://ui.aceternity.com/components/aurora-background",target:"_blank",rel:"noreferrer"},"https://ui.aceternity.com/components/aurora-background")],-1))])}}});export{A as __pageData,O as default};
