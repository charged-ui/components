"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const b=require("lit"),A=require("./property-DgwSjdZd.js"),h=require("./directive-xCTdrWGO.js"),S=require("./registry-Bpi-HjGd.js");/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B="important",R=" !"+B,O=h.e(class extends h.i{constructor(t){var s;if(super(t),t.type!==h.t.ATTRIBUTE||t.name!=="style"||((s=t.strings)==null?void 0:s.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((s,e)=>{const n=t[e];return n==null?s:s+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(t,[s]){const{style:e}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(s)),this.render(s);for(const n of this.ft)s[n]==null&&(this.ft.delete(n),n.includes("-")?e.removeProperty(n):e[n]=null);for(const n in s){const r=s[n];if(r!=null){this.ft.add(n);const i=typeof r=="string"&&r.endsWith(R);n.includes("-")||i?e.setProperty(n,i?r.slice(0,-11):r,i?B:""):e[n]=r}}return h.R}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:P}=h.si,_=()=>document.createComment(""),g=(t,s,e)=>{var i;const n=t._$AA.parentNode,r=s===void 0?t._$AB:s._$AA;if(e===void 0){const o=n.insertBefore(_(),r),c=n.insertBefore(_(),r);e=new P(o,c,t,t.options)}else{const o=e._$AB.nextSibling,c=e._$AM,d=c!==t;if(d){let w;(i=e._$AQ)==null||i.call(e,t),e._$AM=t,e._$AP!==void 0&&(w=t._$AU)!==c._$AU&&e._$AP(w)}if(o!==r||d){let w=e._$AA;for(;w!==o;){const m=w.nextSibling;n.insertBefore(w,r),w=m}}}return e},y=(t,s,e=t)=>(t._$AI(s,e),t),z={},j=(t,s=z)=>t._$AH=s,D=t=>t._$AH,k=t=>{var n;(n=t._$AP)==null||n.call(t,!1,!0);let s=t._$AA;const e=t._$AB.nextSibling;for(;s!==e;){const r=s.nextSibling;s.remove(),s=r}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=(t,s,e)=>{const n=new Map;for(let r=s;r<=e;r++)n.set(t[r],r);return n},E=h.e(class extends h.i{constructor(t){if(super(t),t.type!==h.t.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,s,e){let n;e===void 0?e=s:s!==void 0&&(n=s);const r=[],i=[];let o=0;for(const c of t)r[o]=n?n(c,o):o,i[o]=e(c,o),o++;return{values:i,keys:r}}render(t,s,e){return this.dt(t,s,e).values}update(t,[s,e,n]){const r=D(t),{values:i,keys:o}=this.dt(s,e,n);if(!Array.isArray(r))return this.ut=o,i;const c=this.ut??(this.ut=[]),d=[];let w,m,a=0,p=r.length-1,l=0,u=i.length-1;for(;a<=p&&l<=u;)if(r[a]===null)a++;else if(r[p]===null)p--;else if(c[a]===o[l])d[l]=y(r[a],i[l]),a++,l++;else if(c[p]===o[u])d[u]=y(r[p],i[u]),p--,u--;else if(c[a]===o[u])d[u]=y(r[a],i[u]),g(t,d[u+1],r[a]),a++,u--;else if(c[p]===o[l])d[l]=y(r[p],i[l]),g(t,r[a],r[p]),p--,l++;else if(w===void 0&&(w=C(o,l,u),m=C(c,a,p)),w.has(c[a]))if(w.has(c[p])){const f=m.get(o[l]),x=f!==void 0?r[f]:null;if(x===null){const $=g(t,r[a]);y($,i[l]),d[l]=$}else d[l]=y(x,i[l]),g(t,r[a],x),r[f]=null;l++}else k(r[p]),p--;else k(r[a]),a++;for(;l<=u;){const f=g(t,d[u+1]);y(f,i[l]),d[l++]=f}for(;a<=p;){const f=r[a++];f!==null&&k(f)}return this.ut=o,j(t,d),h.R}}),M="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.pointer-events-none{pointer-events:none}.static{position:static}.absolute{position:absolute}.inset-0{inset:0}.contents{display:contents}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-solid{border-style:solid}.shadow-xl{--tw-shadow:0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a;--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";var T=Object.defineProperty,q=Object.getOwnPropertyDescriptor,v=(t,s,e,n)=>{for(var r=n>1?void 0:n?q(s,e):s,i=t.length-1,o;i>=0;i--)(o=t[i])&&(r=(n?o(s,e,r):o(r))||r);return n&&r&&T(s,e,r),r};exports.RippleBackground=class extends b.LitElement{constructor(){super(...arguments),this.mainCircleSize=210,this.mainCircleOpacity=.24,this.numCircles=8}generateCircles(){return Array.from({length:this.numCircles},(s,e)=>{const n=this.mainCircleSize+e*70,r=this.mainCircleOpacity-e*.03,i=`${e*.06}s`,o={width:`${n}px`,height:`${n}px`,opacity:r.toString(),animationDelay:i,"--i":e.toString()};return{id:e,styles:o}})}render(){const s=this.generateCircles();return b.html`
      <div
        class="pointer-events-none absolute inset-0 select-none"
        style="mask-image: linear-gradient(to bottom, white, transparent)"
      >
        ${E(s,e=>e.id,e=>b.html`
            <div
              class="absolute animate-ripple rounded-full border border-solid shadow-xl"
              style=${O({...e.styles,top:"50%",left:"50%",transform:"translate(-50%, -50%) scale(1)"})}
            ></div>
          `)}
      </div>
    `}};exports.RippleBackground.styles=b.css`
    ${b.unsafeCSS(M)}

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
  `;v([A.n({type:Number})],exports.RippleBackground.prototype,"mainCircleSize",2);v([A.n({type:Number})],exports.RippleBackground.prototype,"mainCircleOpacity",2);v([A.n({type:Number})],exports.RippleBackground.prototype,"numCircles",2);exports.RippleBackground=v([S.chargedCustomElement("ui-bg-ripple")],exports.RippleBackground);
