"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const c=require("lit"),n=require("./property-DgwSjdZd.js"),d=require("./query-CoN9SrqA.js"),l=require("motion"),y=require("./clsx-C11secjj.js"),m=require("./registry-Bpi-HjGd.js"),p=require("./text-CXBWuVR1.js");var h=Object.defineProperty,S=Object.getOwnPropertyDescriptor,r=(a,t,i,s)=>{for(var e=s>1?void 0:s?S(t,i):t,o=a.length-1,u;o>=0;o--)(u=a[o])&&(e=(s?u(t,i,e):u(e))||e);return s&&e&&h(t,i,e),e};exports.UIStat=class extends p.UIText{constructor(){super(...arguments),this.start=0,this.end=0,this.duration=2,this.delay=0}firstUpdated(){l.inView(this,()=>(l.animate(Number(this.start),Number(this.end),{delay:Number(this.delay),duration:Number(this.duration),ease:"circOut",onUpdate:t=>{this.counter&&(this.counter.innerHTML=`${Math.round(t)}`)}}),()=>{}))}render(){const t=y.clsx("counter",p.variantClasses[this.variant]);return c.html`
      <div class="flex items-center">
        <slot name="prefix"></slot>
        <span class="${t}">${this.end}</span>
        <slot name="suffix"></slot>
      </div>
    `}};exports.UIStat.styles=c.css`
    ${c.unsafeCSS(p.styles)}
  `;r([n.n({type:Number})],exports.UIStat.prototype,"start",2);r([n.n({type:Number})],exports.UIStat.prototype,"end",2);r([n.n({type:Number})],exports.UIStat.prototype,"duration",2);r([n.n({type:Number})],exports.UIStat.prototype,"delay",2);r([d.e(".counter")],exports.UIStat.prototype,"counter",2);exports.UIStat=r([m.chargedCustomElement("ui-stat")],exports.UIStat);
