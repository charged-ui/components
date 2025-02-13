"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("./vendor.js"),w="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.static{position:static}.flex{display:flex}.gap-2{gap:.5rem}.rounded-lg{border-radius:.5rem}.border{border-width:1px}.border-solid{border-style:solid}.border-emerald-200{--tw-border-opacity:1;border-color:rgb(167 243 208/var(--tw-border-opacity))}.border-orange-200{--tw-border-opacity:1;border-color:rgb(254 215 170/var(--tw-border-opacity))}.border-red-200{--tw-border-opacity:1;border-color:rgb(254 202 202/var(--tw-border-opacity))}.border-sky-200{--tw-border-opacity:1;border-color:rgb(186 230 253/var(--tw-border-opacity))}.bg-emerald-50{--tw-bg-opacity:1;background-color:rgb(236 253 245/var(--tw-bg-opacity))}.bg-orange-50{--tw-bg-opacity:1;background-color:rgb(255 247 237/var(--tw-bg-opacity))}.bg-red-50{--tw-bg-opacity:1;background-color:rgb(254 242 242/var(--tw-bg-opacity))}.bg-sky-50{--tw-bg-opacity:1;background-color:rgb(240 249 255/var(--tw-bg-opacity))}.p-4{padding:1rem}.text-emerald-700{--tw-text-opacity:1;color:rgb(4 120 87/var(--tw-text-opacity))}.text-orange-700{--tw-text-opacity:1;color:rgb(194 65 12/var(--tw-text-opacity))}.text-red-700{--tw-text-opacity:1;color:rgb(185 28 28/var(--tw-text-opacity))}.text-sky-700{--tw-text-opacity:1;color:rgb(3 105 161/var(--tw-text-opacity))}";var b=Object.defineProperty,l=Object.getOwnPropertyDescriptor,d=(t,e,s,a)=>{for(var r=a>1?void 0:a?l(e,s):e,i=t.length-1,c;i>=0;i--)(c=t[i])&&(r=(a?c(e,s,r):c(r))||r);return a&&r&&b(e,s,r),r},n=(t=>(t.Success="success",t.Error="error",t.Warning="warning",t.Info="info",t))(n||{});exports.UIAvatar=class extends o.h{constructor(){super(...arguments),this.variant="info"}render(){const e=o.clsx("flex","gap-2","p-4","border","border-solid","rounded-lg",g[this.variant]);return o.ke`
      <div role="alert" class=${e}>
        <slot name="icon"></slot>
        <div>
          <slot name="heading"></slot>
          <slot name="message"></slot>
        </div>
      </div>
    `}};exports.UIAvatar.styles=o.i`
    ${o.r(w)}
    :host {
      width: -webkit-fill-available;
    }
    ::slotted([slot='heading']) {
      font-weight: 600;
    }
    ::slotted([slot='message']) {
      font-size: 14px;
    }
  `;d([o.n({type:n})],exports.UIAvatar.prototype,"variant",2);exports.UIAvatar=d([o.t("ui-avatar")],exports.UIAvatar);const g={success:"bg-emerald-50 border-emerald-200 text-emerald-700",error:"bg-red-50 border-red-200 text-red-700",warning:"bg-orange-50 border-orange-200 text-orange-700",info:"bg-sky-50 border-sky-200 text-sky-700"};exports.AvatarVariant=n;
