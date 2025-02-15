"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=require("./vendor.js"),p=require("./text2.js");var l=Object.defineProperty,c=Object.getOwnPropertyDescriptor,s=(a,e,i,n)=>{for(var r=n>1?void 0:n?c(e,i):e,o=a.length-1,u;o>=0;o--)(u=a[o])&&(r=(n?u(e,i,r):u(r))||r);return n&&r&&l(e,i,r),r};exports.UIStat=class extends p.UIText{constructor(){super(...arguments),this.start=0,this.end=0,this.duration=2,this.delay=0}firstUpdated(){t.inView(this,()=>(t.animate(Number(this.start),Number(this.end),{delay:Number(this.delay),duration:Number(this.duration),ease:"circOut",onUpdate:e=>{this.counter&&(this.counter.innerHTML=`${Math.round(e)}`)}}),()=>{}))}render(){const e=t.clsx("counter",p.variantClasses[this.variant]);return t.ke`
      <div class="flex items-center">
        <slot name="prefix"></slot>
        <span class="${e}">${this.end}</span>
        <slot name="suffix"></slot>
      </div>
    `}};exports.UIStat.styles=t.i`
    ${t.r(p.styles)}
  `;s([t.n({type:Number})],exports.UIStat.prototype,"start",2);s([t.n({type:Number})],exports.UIStat.prototype,"end",2);s([t.n({type:Number})],exports.UIStat.prototype,"duration",2);s([t.n({type:Number})],exports.UIStat.prototype,"delay",2);s([t.e(".counter")],exports.UIStat.prototype,"counter",2);exports.UIStat=s([t.t("ui-stat")],exports.UIStat);
