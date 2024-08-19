"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("./vendor.js"),w="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.static{position:static}.relative{position:relative}.inline-flex{display:inline-flex}.flex-col{flex-direction:column}.overflow-hidden{overflow:hidden}.rounded-xl{border-radius:.75rem}.border{border-width:1px}.border-solid{border-style:solid}.border-gray-200{--tw-border-opacity:1;border-color:rgb(229 231 235/var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.p-8{padding:2rem}";var l=Object.defineProperty,c=Object.getOwnPropertyDescriptor,d=(a,e,i,o)=>{for(var t=o>1?void 0:o?c(e,i):e,s=a.length-1,n;s>=0;s--)(n=a[s])&&(t=(o?n(e,i,t):n(t))||t);return o&&t&&l(e,i,t),t};exports.UICard=class extends r.h{render(){return r.ke`
      <div
        class="bg-white border border-solid border-gray-200 rounded-xl inline-flex flex-col relative overflow-hidden"
      >
        <slot name="media"></slot>
        <div class="p-8">
          <slot name="one"></slot>
          <slot name="two"></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    `}};exports.UICard.styles=r.i`
    ${r.r(w)}
  `;d([r.n({type:String})],exports.UICard.prototype,"variant",2);exports.UICard=d([r.t("ui-card")],exports.UICard);
