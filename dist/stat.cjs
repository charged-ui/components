"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const c=require("lit"),r=require("./vendor.cjs"),p=require("motion"),d=require("./registry-Bpi-HjGd.cjs"),l=require("./text-wgl3qIWa.cjs");var m=Object.defineProperty,y=Object.getOwnPropertyDescriptor,s=(a,t,i,n)=>{for(var e=n>1?void 0:n?y(t,i):t,o=a.length-1,u;o>=0;o--)(u=a[o])&&(e=(n?u(t,i,e):u(e))||e);return n&&e&&m(t,i,e),e};exports.UIStat=class extends l.UIText{constructor(){super(...arguments),this.start=0,this.end=0,this.duration=2,this.delay=0}firstUpdated(){p.inView(this,()=>(p.animate(Number(this.start),Number(this.end),{delay:Number(this.delay),duration:Number(this.duration),ease:"circOut",onUpdate:t=>{this.counter&&(this.counter.innerHTML=`${Math.round(t)}`)}}),()=>{}))}render(){const t=r.clsx("counter",l.variantClasses[this.variant]);return c.html`
      <div class="flex items-center">
        <slot name="prefix"></slot>
        <span class="${t}">${this.end}</span>
        <slot name="suffix"></slot>
      </div>
    `}};exports.UIStat.styles=c.css`
    ${c.unsafeCSS(l.styles)}
  `;s([r.n({type:Number})],exports.UIStat.prototype,"start",2);s([r.n({type:Number})],exports.UIStat.prototype,"end",2);s([r.n({type:Number})],exports.UIStat.prototype,"duration",2);s([r.n({type:Number})],exports.UIStat.prototype,"delay",2);s([r.e(".counter")],exports.UIStat.prototype,"counter",2);exports.UIStat=s([d.chargedCustomElement("ui-stat")],exports.UIStat);
