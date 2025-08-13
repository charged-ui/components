"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const s=require("lit"),l=require("./property-DgwSjdZd.js"),u=require("./registry-Bpi-HjGd.js");var c=Object.defineProperty,g=Object.getOwnPropertyDescriptor,d=(t,a,i,e)=>{for(var r=e>1?void 0:e?g(a,i):a,n=t.length-1,o;n>=0;n--)(o=t[n])&&(r=(e?o(a,i,r):o(r))||r);return e&&r&&c(a,i,r),r};exports.AuroraBackground=class extends s.LitElement{constructor(){super(...arguments),this.showRadialGradient=!0}render(){return s.html`
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
    `}};exports.AuroraBackground.styles=s.css`
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
  `;d([l.n({type:Boolean})],exports.AuroraBackground.prototype,"showRadialGradient",2);exports.AuroraBackground=d([u.chargedCustomElement("ui-bg-aurora")],exports.AuroraBackground);
