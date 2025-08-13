"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("lit"),r=require("./property-DgwSjdZd.js"),l=require("./state-BRh57wQp.js"),m=require("./registry-Bpi-HjGd.js"),d="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.pointer-events-none{pointer-events:none}.static{position:static}.absolute{position:absolute}.relative{position:relative}.top-1\\/2{top:50%}.-z-10{z-index:-10}.block{display:block}.hidden{display:none}.h-0\\.5{height:.125rem}.h-px{height:1px}.w-0\\.5{width:.125rem}.w-12{width:3rem}.-translate-y-1\\/2{--tw-translate-y:-50%}.-translate-y-1\\/2,.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rounded-full{border-radius:9999px}.bg-zinc-500{--tw-bg-opacity:1;background-color:rgb(113 113 122/var(--tw-bg-opacity))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.from-zinc-500{--tw-gradient-from:#71717a var(--tw-gradient-from-position);--tw-gradient-to:#71717a00 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.to-transparent{--tw-gradient-to:#0000 var(--tw-gradient-to-position)}.shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";var c=Object.defineProperty,h=Object.getOwnPropertyDescriptor,e=(i,t,o,s)=>{for(var a=s>1?void 0:s?h(t,o):t,p=i.length-1,w;p>=0;p--)(w=i[p])&&(a=(s?w(t,o,a):w(a))||a);return s&&a&&c(t,o,a),a};exports.MeteorsComponent=class extends n.LitElement{constructor(){super(...arguments),this.number=20,this.minDelay=.2,this.maxDelay=1.2,this.minDuration=2,this.maxDuration=10,this.angle=60,this.meteorStyles=[]}firstUpdated(){this.generateMeteorStyles()}updated(t){(t.has("number")||t.has("minDelay")||t.has("maxDelay")||t.has("minDuration")||t.has("maxDuration")||t.has("angle"))&&this.generateMeteorStyles()}generateMeteorStyles(){const t=[];for(let o=0;o<this.number;o++)t.push({angle:`${-this.angle}deg`,top:"-5%",left:`calc(0% + ${Math.floor(Math.random()*window.innerWidth)}px)`,animationDelay:`${Math.random()*(this.maxDelay-this.minDelay)+this.minDelay}s`,animationDuration:`${Math.floor(Math.random()*(this.maxDuration-this.minDuration)+this.minDuration)}s`});this.meteorStyles=t}render(){return n.html`
      ${this.meteorStyles.map((t,o)=>n.html`
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
    `}};exports.MeteorsComponent.styles=n.css`
    ${n.unsafeCSS(d)}

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
  `;e([r.n({type:Number})],exports.MeteorsComponent.prototype,"number",2);e([r.n({type:Number})],exports.MeteorsComponent.prototype,"minDelay",2);e([r.n({type:Number})],exports.MeteorsComponent.prototype,"maxDelay",2);e([r.n({type:Number})],exports.MeteorsComponent.prototype,"minDuration",2);e([r.n({type:Number})],exports.MeteorsComponent.prototype,"maxDuration",2);e([r.n({type:Number})],exports.MeteorsComponent.prototype,"angle",2);e([l.r()],exports.MeteorsComponent.prototype,"meteorStyles",2);exports.MeteorsComponent=e([m.chargedCustomElement("ui-bg-meteors")],exports.MeteorsComponent);
