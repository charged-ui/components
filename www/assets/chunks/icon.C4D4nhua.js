import{n as a,D as h,R as u,i as l,r as d,h as f,t as y}from"./property.BGekRwO5.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(e){return a({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},v=e=>(...t)=>({_$litDirective$:e,values:t});class ${constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,i){this.t=t,this._$AM=r,this.i=i}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class p extends ${constructor(t){if(super(t),this.it=h,t.type!==b.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===h||t==null)return this._t=void 0,this.it=t;if(t===u)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}p.directiveName="unsafeHTML",p.resultType=1;const _=v(p),m="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.static{position:static}.outline{outline-style:solid}";var T=Object.defineProperty,x=Object.getOwnPropertyDescriptor,o=(e,t,r,i)=>{for(var s=i>1?void 0:i?x(t,r):t,c=e.length-1,w;c>=0;c--)(w=e[c])&&(s=(i?w(t,r,s):w(s))||s);return i&&s&&T(t,r,s),s};let n=class extends f{constructor(){super(...arguments),this.variant="outline",this.size="24",this.content=""}async updated(e){(e.has("name")||e.has("variant"))&&await this.fetchIcon()}async fetchIcon(){if(!this.name)return;const e="https://cdn.jsdelivr.net/npm/heroicons@latest",t=this.variant==="solid"?"solid":"outline",r=`${e}/${this.size}/${t}/${this.name}.svg`;try{const i=await fetch(r);if(!i.ok)throw new Error("Icon not found");this.content=await i.text()}catch(i){console.error(`Failed to fetch icon: ${i}`),this.content=""}}render(){if(this.content)return _(this.content)}};n.styles=l`
    ${d(m)}
    :host {
      width: 24px;
      height: 24px;
    }
  `;o([a({type:String})],n.prototype,"name",2);o([a({type:String})],n.prototype,"variant",2);o([a({type:String})],n.prototype,"size",2);o([g()],n.prototype,"content",2);n=o([y("ui-icon")],n);export{g as r};
