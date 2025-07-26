import{R as P,s as T,r as F,i as N,h as R,k as A,c as j}from"./chunks/registry.DEgqvEkJ.js";import{n as v}from"./chunks/property.B9LzXozf.js";import{e as S,i as D,t as z}from"./chunks/directive.p_YAsO23.js";import{I,c as V,o as q,j as g,af as M,a as C,J as H}from"./chunks/framework.CB17hpbL.js";/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O="important",J=" !"+O,U=S(class extends D{constructor(t){var i;if(super(t),t.type!==z.ATTRIBUTE||t.name!=="style"||((i=t.strings)==null?void 0:i.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((i,e)=>{const r=t[e];return r==null?i:i+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(t,[i]){const{style:e}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(i)),this.render(i);for(const r of this.ft)i[r]==null&&(this.ft.delete(r),r.includes("-")?e.removeProperty(r):e[r]=null);for(const r in i){const s=i[r];if(s!=null){this.ft.add(r);const a=typeof s=="string"&&s.endsWith(J);r.includes("-")||a?e.setProperty(r,a?s.slice(0,-11):s,a?O:""):e[r]=s}}return P}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:L}=T,$=()=>document.createComment(""),m=(t,i,e)=>{var a;const r=t._$AA.parentNode,s=i===void 0?t._$AB:i._$AA;if(e===void 0){const n=r.insertBefore($(),s),p=r.insertBefore($(),s);e=new L(n,p,t,t.options)}else{const n=e._$AB.nextSibling,p=e._$AM,c=p!==t;if(c){let u;(a=e._$AQ)==null||a.call(e,t),e._$AM=t,e._$AP!==void 0&&(u=t._$AU)!==p._$AU&&e._$AP(u)}if(n!==s||c){let u=e._$AA;for(;u!==n;){const y=u.nextSibling;r.insertBefore(u,s),u=y}}}return e},w=(t,i,e=t)=>(t._$AI(i,e),t),Q={},X=(t,i=Q)=>t._$AH=i,Y=t=>t._$AH,E=t=>{var r;(r=t._$AP)==null||r.call(t,!1,!0);let i=t._$AA;const e=t._$AB.nextSibling;for(;i!==e;){const s=i.nextSibling;i.remove(),i=s}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=(t,i,e)=>{const r=new Map;for(let s=i;s<=e;s++)r.set(t[s],s);return r},W=S(class extends D{constructor(t){if(super(t),t.type!==z.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,i,e){let r;e===void 0?e=i:i!==void 0&&(r=i);const s=[],a=[];let n=0;for(const p of t)s[n]=r?r(p,n):n,a[n]=e(p,n),n++;return{values:a,keys:s}}render(t,i,e){return this.dt(t,i,e).values}update(t,[i,e,r]){const s=Y(t),{values:a,keys:n}=this.dt(i,e,r);if(!Array.isArray(s))return this.ut=n,a;const p=this.ut??(this.ut=[]),c=[];let u,y,l=0,d=s.length-1,o=0,h=a.length-1;for(;l<=d&&o<=h;)if(s[l]===null)l++;else if(s[d]===null)d--;else if(p[l]===n[o])c[o]=w(s[l],a[o]),l++,o++;else if(p[d]===n[h])c[h]=w(s[d],a[h]),d--,h--;else if(p[l]===n[h])c[h]=w(s[l],a[h]),m(t,c[h+1],s[l]),l++,h--;else if(p[d]===n[o])c[o]=w(s[d],a[o]),m(t,s[l],s[d]),d--,o++;else if(u===void 0&&(u=B(n,o,h),y=B(p,l,d)),u.has(p[l]))if(u.has(p[d])){const k=y.get(n[o]),x=k!==void 0?s[k]:null;if(x===null){const _=m(t,s[l]);w(_,a[o]),c[o]=_}else c[o]=w(x,a[o]),m(t,s[l],x),s[k]=null;o++}else E(s[d]),d--;else E(s[l]),l++;for(;o<=h;){const k=m(t,c[h+1]);w(k,a[o]),c[o++]=k}for(;l<=d;){const k=s[l++];k!==null&&E(k)}return this.ut=n,X(t,c),P}}),Z="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.pointer-events-none{pointer-events:none}.static{position:static}.absolute{position:absolute}.inset-0{inset:0}.contents{display:contents}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.rounded-full{border-radius:9999px}.border{border-width:1px}.border-solid{border-style:solid}.shadow-xl{--tw-shadow:0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a;--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}";var G=Object.defineProperty,K=Object.getOwnPropertyDescriptor,b=(t,i,e,r)=>{for(var s=r>1?void 0:r?K(i,e):i,a=t.length-1,n;a>=0;a--)(n=t[a])&&(s=(r?n(i,e,s):n(s))||s);return r&&s&&G(i,e,s),s};let f=class extends R{constructor(){super(...arguments),this.mainCircleSize=210,this.mainCircleOpacity=.24,this.numCircles=8}generateCircles(){return Array.from({length:this.numCircles},(t,i)=>{const e=this.mainCircleSize+i*70,r=this.mainCircleOpacity-i*.03,s=`${i*.06}s`,a={width:`${e}px`,height:`${e}px`,opacity:r.toString(),animationDelay:s,"--i":i.toString()};return{id:i,styles:a}})}render(){const t=this.generateCircles();return A`
      <div
        class="pointer-events-none absolute inset-0 select-none"
        style="mask-image: linear-gradient(to bottom, white, transparent)"
      >
        ${W(t,i=>i.id,i=>A`
            <div
              class="absolute animate-ripple rounded-full border border-solid shadow-xl"
              style=${U({...i.styles,top:"50%",left:"50%",transform:"translate(-50%, -50%) scale(1)"})}
            ></div>
          `)}
      </div>
    `}};f.styles=N`
    ${F(Z)}

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
  `;b([v({type:Number})],f.prototype,"mainCircleSize",2);b([v({type:Number})],f.prototype,"mainCircleOpacity",2);b([v({type:Number})],f.prototype,"numCircles",2);f=b([j("ui-bg-ripple")],f);const tt={class:"bg-white border border-solid border-slate-200 rounded-xl flex justify-center relative overflow-hidden h-[500px] flex items-center justify-center"},nt=JSON.parse('{"title":"Ripple Background","description":"","frontmatter":{},"headers":[],"relativePath":"components/ripple/index.md","filePath":"components/ripple/index.md"}'),et={name:"components/ripple/index.md"},lt=Object.assign(et,{setup(t){return(i,e)=>{const r=I("ui-bg-ripple");return q(),V("div",null,[e[1]||(e[1]=g("h1",{id:"ripple-background",tabindex:"-1"},[C("Ripple Background "),g("a",{class:"header-anchor",href:"#ripple-background","aria-label":"Permalink to “Ripple Background”"},"​")],-1)),e[2]||(e[2]=g("p",null,"An animated ripple effect typically used behind elements to emphasize them.",-1)),e[3]||(e[3]=g("h2",{id:"example",tabindex:"-1"},[C("Example "),g("a",{class:"header-anchor",href:"#example","aria-label":"Permalink to “Example”"},"​")],-1)),g("div",tt,[e[0]||(e[0]=g("p",{class:"z-10 text-center text-5xl font-medium tracking-tighter"}," Ripple ",-1)),H(r)]),e[4]||(e[4]=M("",4))])}}});export{nt as __pageData,lt as default};
