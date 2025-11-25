import { a as g, i as l, x as p } from "../vendor/lit.js";
import { c } from "../registry.js";
import { b as m, s as h } from "../vendor/motion.js";
var d = Object.getOwnPropertyDescriptor, f = (t, s, o, a) => {
  for (var e = a > 1 ? void 0 : a ? d(s, o) : s, n = t.length - 1, i; n >= 0; n--)
    (i = t[n]) && (e = i(e) || e);
  return e;
};
let r = class extends l {
  constructor() {
    super(...arguments), this.animationControls = null;
  }
  firstUpdated() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelectorAll(".segment"), s = t == null ? void 0 : t.length;
    if (!s) return;
    const o = 0.1, a = s * o;
    this.animationControls = m(
      t,
      //@ts-expect-error (Motion library has incomplete type definitions for keyframes)
      { opacity: [0, 1, 0] },
      {
        offset: [0, 0.1, 1],
        duration: a,
        delay: h(o, { startDelay: -a }),
        repeat: 1 / 0
      }
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.animationControls && (this.animationControls.stop(), this.animationControls = null);
  }
  render() {
    return p`
			<div>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
					<g class="segment">
						<path
							id="loading-path"
							d="M 94 25 C 94 21.686 96.686 19 100 19 L 100 19 C 103.314 19 106 21.686 106 25 L 106 50 C 106 53.314 103.314 56 100 56 L 100 56 C 96.686 56 94 53.314 94 50 Z"
						></path>
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(45deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(90deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(135deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(180deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(225deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(270deg)" />
					</g>
					<g class="segment" opacity="0">
						<use href="#loading-path" style="transform: rotate(315deg)" />
					</g>
				</svg>
			</div>
		`;
  }
};
r.styles = g`
		:host {
			display: block;
			width: 64px;
			height: 64px;
		}

		.segment use,
		.segment path {
			fill: #ccc;
			transform-origin: 100px 100px;
		}
	`;
r = f([
  c("ui-spinner")
], r);
export {
  r as UISpinner
};
