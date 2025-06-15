import{r as d,i as E,n as g,h as c,k as y,t as u}from"./chunks/property.DA0TKUJZ.js";import{r as k}from"./chunks/icon.m47xOXh0.js";import{I as w,c as b,o as m,j as s,af as F,a as e,J as v,w as x}from"./chunks/framework.CB17hpbL.js";const f="*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.static{position:static}.absolute{position:absolute}.relative{position:relative}.left-4{left:1rem}.top-3\\.5{top:.875rem}.top-full{top:100%}.z-10{z-index:10}.mt-2{margin-top:.5rem}.hidden{display:none}.h-10{height:2.5rem}.h-5{height:1.25rem}.w-5{width:1.25rem}.w-full{width:100%}.appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}.overflow-hidden{overflow:hidden}.rounded-lg{border-radius:.5rem}.border{border-width:1px}.border-solid{border-style:solid}.border-gray-200{--tw-border-opacity:1;border-color:rgb(229 231 235/var(--tw-border-opacity))}.border-zinc-200{--tw-border-opacity:1;border-color:rgb(228 228 231/var(--tw-border-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.pl-0{padding-left:0}.pl-11{padding-left:2.75rem}.pr-4{padding-right:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-gray-400{--tw-text-opacity:1;color:rgb(156 163 175/var(--tw-text-opacity))}.shadow-sm{--tw-shadow:0 1px 2px 0 #0000000d;--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.blur{--tw-blur:blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}";var C=Object.defineProperty,B=Object.getOwnPropertyDescriptor,r=(a,h,i,n)=>{for(var t=n>1?void 0:n?B(h,i):h,p=a.length-1,o;p>=0;p--)(o=a[p])&&(t=(n?o(h,i,t):o(t))||t);return n&&t&&C(h,i,t),t};let l=class extends c{constructor(){super(...arguments),this.placeholder="Search for anything",this.currentFocus=-1,this.expanded=!1}handleFocus(){this.expanded=!0}handleBlur(){this.expanded=!1}handleKeyDown(a){a.key==="ArrowDown"||a.key==="ArrowUp"?(a.preventDefault(),a.key):a.key==="Enter"&&this.currentFocus!==-1?a.preventDefault():a.key==="Escape"&&(this.expanded=!1)}handleSlotChange(){}render(){return y`
      <div class="relative">
        <label for="combo-input" class="sr-only">Search or use commands</label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute top-3.5 left-4 h-5 w-5 text-gray-400"
          aria-hidden="true"
        >
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
          <path d="M21 21l-6 -6"></path>
        </svg>
        <input
          type="text"
          id="combo-input"
          class="h-10 pl-11 pr-4 bg-white border border-solid border-zinc-200 rounded-lg appearance-none text-sm"
          placeholder="${this.placeholder}"
          role="combobox"
          aria-expanded="${this.expanded}"
          aria-controls="combo-menu"
          aria-activedescendant=""
          aria-autocomplete="list"
          @focus="${this.handleFocus}"
          @blur="${this.handleBlur}"
          @keydown="${this.handleKeyDown}"
        />
        <ul
          id="combo-menu"
          class="${this.expanded?"absolute":"hidden"} w-full mt-2 pl-0 overflow-hidden bg-white rounded-lg shadow-sm border border-gray-200 top-full z-10 border border-solid border-zinc-200"
          role="listbox"
          aria-label="Command options"
        >
          <slot @slotchange=${()=>this.handleSlotChange()}></slot>
        </ul>
      </div>
    `}};l.styles=E`
    ${d(f)}
  `;r([g({type:String})],l.prototype,"placeholder",2);r([k()],l.prototype,"currentFocus",2);r([k()],l.prototype,"expanded",2);l=r([u("ui-combobox")],l);const q={class:"p-12 bg-preview flex flex-col gap-4 justify-center rounded-xl padding-8"},S=JSON.parse('{"title":"Combobox","description":"","frontmatter":{},"headers":[],"relativePath":"components/combobox/index.md","filePath":"components/combobox/index.md"}'),D={name:"components/combobox/index.md"},M=Object.assign(D,{setup(a){return(h,i)=>{const n=w("ui-combobox");return m(),b("div",null,[i[1]||(i[1]=s("h1",{id:"combobox",tabindex:"-1"},[e("Combobox "),s("a",{class:"header-anchor",href:"#combobox","aria-label":"Permalink to “Combobox”"},"​")],-1)),i[2]||(i[2]=s("p",null,[e("The "),s("code",null,"<ui-alert>"),e(" component provides contextual feedback messages, keeping users informed of important and sometimes time-sensitive changes.")],-1)),i[3]||(i[3]=s("h2",{id:"examples",tabindex:"-1"},[e("Examples "),s("a",{class:"header-anchor",href:"#examples","aria-label":"Permalink to “Examples”"},"​")],-1)),s("div",q,[v(n,{placeholder:"Search or use commands"},{default:x(()=>i[0]||(i[0]=[s("li",{id:"option-1",class:"flex items-center p-3 gap-4 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 hover:text-blue-500",role:"option","aria-selected":"false"},[s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"size-4",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[s("path",{d:"M3 12l3 3l3 -3l-3 -3z"}),s("path",{d:"M15 12l3 3l3 -3l-3 -3z"}),s("path",{d:"M9 6l3 3l3 -3l-3 -3z"}),s("path",{d:"M9 18l3 3l3 -3l-3 -3z"})]),e(" Search projects ")],-1),s("li",{id:"option-2",class:"flex items-center p-3 gap-4 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 hover:text-blue-500",role:"option","aria-selected":"false"},[s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"size-4",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[s("path",{d:"M12 5l0 14"}),s("path",{d:"M5 12l14 0"})]),e(" Create a new project ")],-1),s("li",{id:"option-3",class:"flex items-center p-3 gap-4 text-sm text-gray-600 cursor-pointer hover:bg-gray-50 hover:text-blue-500",role:"option","aria-selected":"false"},[s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"size-4",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},[s("path",{d:"M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),s("path",{d:"M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"}),s("path",{d:"M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),s("path",{d:"M17 10h2a2 2 0 0 1 2 2v1"}),s("path",{d:"M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"}),s("path",{d:"M3 13v-1a2 2 0 0 1 2 -2h2"})]),e(" Search team ")],-1)])),_:1})]),i[4]||(i[4]=F("",2))])}}});export{S as __pageData,M as default};
