import{n as a,D as l,R as h,r as d,i as u,h as f,t as y}from"./property.NcA2NZIx.js";import{e as b,i as g,t as v}from"./directive.p_YAsO23.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(r){return a({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class p extends g{constructor(t){if(super(t),this.it=l,t.type!==v.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===l||t==null)return this._t=void 0,this.it=t;if(t===h)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}p.directiveName="unsafeHTML",p.resultType=1;const x=b(p),k="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.static{position:static}.block{display:block}.outline{outline-style:solid}";var $=Object.defineProperty,_=Object.getOwnPropertyDescriptor,n=(r,t,e,i)=>{for(var o=i>1?void 0:i?_(t,e):t,c=r.length-1,w;c>=0;c--)(w=r[c])&&(o=(i?w(t,e,o):w(o))||o);return i&&o&&$(t,e,o),o};let s=class extends f{constructor(){super(...arguments),this.variant="outline",this.size="24",this.content=""}async updated(r){(r.has("name")||r.has("variant"))&&await this.fetchIcon()}async fetchIcon(){if(!this.name)return;const r="https://cdn.jsdelivr.net/npm/heroicons@latest",t=this.variant==="solid"?"solid":"outline",e=`${r}/${this.size}/${t}/${this.name}.svg`;try{const i=await fetch(e);if(!i.ok)throw new Error("Icon not found");this.content=await i.text()}catch(i){console.error(`Failed to fetch icon: ${i}`),this.content=""}}render(){if(this.content)return x(this.content)}};s.styles=u`
    ${d(k)}
    :host {
      display: block;
      width: 24px;
      height: 24px;
    }
  `;n([a({type:String})],s.prototype,"name",2);n([a({type:String})],s.prototype,"variant",2);n([a({type:String})],s.prototype,"size",2);n([m()],s.prototype,"content",2);s=n([y("ui-icon")],s);export{m as r};
