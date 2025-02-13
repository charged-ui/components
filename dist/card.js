"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("./vendor.js"),n="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.static{position:static}.relative{position:relative}.overflow-hidden{overflow:hidden}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-solid{border-style:solid}.border-neutral-200{--tw-border-opacity:1;border-color:rgb(229 229 229/var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.p-8{padding:2rem}.shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";var c=Object.defineProperty,l=Object.getOwnPropertyDescriptor,i=(a,o,s,e)=>{for(var t=e>1?void 0:e?l(o,s):o,w=a.length-1,d;w>=0;w--)(d=a[w])&&(t=(e?d(o,s,t):d(t))||t);return e&&t&&c(o,s,t),t};exports.UICard=class extends r.h{render(){return r.ke`
      <div
        class="bg-white border border-solid border-neutral-200 rounded-xl relative overflow-hidden shadow-sm"
      >
        <slot name="media"></slot>
        <div class="p-8">
          <slot name="header"></slot>
          <slot name="body"></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    `}};exports.UICard.styles=r.i`
    ${r.r(n)}
  `;i([r.n({type:String})],exports.UICard.prototype,"variant",2);exports.UICard=i([r.t("ui-card")],exports.UICard);
