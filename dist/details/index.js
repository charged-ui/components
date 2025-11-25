import { a as d, n as c, e as p, i as m, x as u } from "../vendor/lit.js";
import { c as g } from "../registry.js";
import "../icon/index.js";
import { a as h } from "../vendor/motion.js";
var y = Object.defineProperty, f = Object.getOwnPropertyDescriptor, s = (e, i, o, a) => {
  for (var t = a > 1 ? void 0 : a ? f(i, o) : i, l = e.length - 1, r; l >= 0; l--)
    (r = e[l]) && (t = (a ? r(i, o, t) : r(t)) || t);
  return a && t && y(i, o, t), t;
};
let n = class extends m {
  constructor() {
    super(...arguments), this.open = !1, this.name = "", this.handleToggle = (e) => {
      const { name: i, source: o } = e.detail;
      this === o ? this.open ? this.collapse() : this.expand() : this.name === i && this.collapse();
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("ui-details-toggle", this.handleToggle);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("ui-details-toggle", this.handleToggle);
  }
  handleClick(e) {
    e.preventDefault(), this.dispatchEvent(
      new CustomEvent("ui-details-toggle", {
        bubbles: !0,
        detail: { name: this.name, source: this }
      })
    );
  }
  expand() {
    const e = this.content.clientHeight;
    this.content.style.height = "0px", this.content.style.overflow = "hidden", this.open = !0, h(this.content, { height: e }, { duration: 0.3 }).then(() => {
      this.content.style.height = "", this.content.style.overflow = "";
    });
  }
  collapse() {
    this.content.style.height = this.content.clientHeight + "px", this.content.style.overflow = "hidden", this.icon.style.transform = "rotate(0deg)", h(this.content, { height: 0 }, { duration: 0.3 }).then(() => {
      this.open = !1, this.content.style.height = "", this.content.style.overflow = "", this.icon.style.transform = "";
    }), h(this.icon, { rotate: 0 }, { duration: 0.3 });
  }
  render() {
    return u`
			<details name="${this.name}" ?open=${this.open}>
				<summary
					id="summary"
					aria-expanded=${this.open}
					aria-controls="content"
					@click=${this.handleClick}
				>
					<slot name="summary"></slot>
					<ui-icon name="chevron-down" />
				</summary>
				<div
					id="content"
					role="region"
					aria-labelledby="summary"
					aria-hidden="${!this.open}"
				>
					<slot name="content" />
				</div>
			</details>
		`;
  }
};
n.styles = d`
		summary {
			display: flex;
			align-items: center;
			cursor: pointer;
			position: relative;
		}

		ui-icon {
			position: absolute;
			right: 1rem;
			width: 20px;
			height: 20px;
			transition: all 0.3s;
		}

		details[open] ui-icon {
			transform: rotate(180deg);
		}
	`;
s([
  c({ type: Boolean, reflect: !0, attribute: "open" })
], n.prototype, "open", 2);
s([
  c({ type: String, reflect: !0, attribute: "name" })
], n.prototype, "name", 2);
s([
  p("#content")
], n.prototype, "content", 2);
s([
  p("ui-icon")
], n.prototype, "icon", 2);
n = s([
  g("ui-details")
], n);
export {
  n as UIDetails
};
