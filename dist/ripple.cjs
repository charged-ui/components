"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("lit"),i=require("./vendor.cjs"),c=require("./registry-Bpi-HjGd.cjs"),w="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.pointer-events-none{pointer-events:none}.static{position:static}.absolute{position:absolute}.inset-0{inset:0}.contents{display:contents}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-solid{border-style:solid}.shadow-xl{--tw-shadow:0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a;--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";var d=Object.defineProperty,u=Object.getOwnPropertyDescriptor,l=(p,r,t,o)=>{for(var e=o>1?void 0:o?u(r,t):r,a=p.length-1,s;a>=0;a--)(s=p[a])&&(e=(o?s(r,t,e):s(e))||e);return o&&e&&d(r,t,e),e};exports.RippleBackground=class extends n.LitElement{constructor(){super(...arguments),this.mainCircleSize=210,this.mainCircleOpacity=.24,this.numCircles=8}generateCircles(){return Array.from({length:this.numCircles},(r,t)=>{const o=this.mainCircleSize+t*70,e=this.mainCircleOpacity-t*.03,a=`${t*.06}s`,s={width:`${o}px`,height:`${o}px`,opacity:e.toString(),animationDelay:a,"--i":t.toString()};return{id:t,styles:s}})}render(){const r=this.generateCircles();return n.html`
      <div
        class="pointer-events-none absolute inset-0 select-none"
        style="mask-image: linear-gradient(to bottom, white, transparent)"
      >
        ${i.Qt(r,t=>t.id,t=>n.html`
            <div
              class="absolute animate-ripple rounded-full border border-solid shadow-xl"
              style=${i.se({...t.styles,top:"50%",left:"50%",transform:"translate(-50%, -50%) scale(1)"})}
            ></div>
          `)}
      </div>
    `}};exports.RippleBackground.styles=n.css`
    ${n.unsafeCSS(w)}

    :host {
      display: contents;

      /* Design tokens - default values */
      --ripple-bg-color: oklch(55.2% 0.016 285.938 / 0.25); /* gray-600/25 */
      --ripple-border-color: oklch(55.1% 0.027 264.364); /* gray-400 */
      --ripple-animation-duration: 2s;
      --ripple-animation-timing: ease-out;
    }

    @keyframes ripple {
      0%,
      100% {
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        transform: translate(-50%, -50%) scale(1.06);
      }
    }

    .animate-ripple {
      animation: ripple var(--ripple-animation-duration)
        var(--ripple-animation-timing) infinite;
      background-color: var(--ripple-bg-color);
      border-color: var(--ripple-border-color);
    }
  `;l([i.n({type:Number})],exports.RippleBackground.prototype,"mainCircleSize",2);l([i.n({type:Number})],exports.RippleBackground.prototype,"mainCircleOpacity",2);l([i.n({type:Number})],exports.RippleBackground.prototype,"numCircles",2);exports.RippleBackground=l([c.chargedCustomElement("ui-bg-ripple")],exports.RippleBackground);
