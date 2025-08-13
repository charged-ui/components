import { css as c, LitElement as p, html as h } from "lit";
import { n as d, r as u } from "./vendor.js";
import { c as m } from "./registry-CBck5F9C.js";
var C = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, a = (e, n, r, l) => {
  for (var t = l > 1 ? void 0 : l ? _(n, r) : n, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (t = (l ? o(n, r, t) : o(t)) || t);
  return l && t && C(n, r, t), t;
};
let i = class extends p {
  constructor() {
    super(...arguments), this.isOpen = !1, this.title = "", this.closeOnBackdrop = !0, this.closeOnEscape = !0, this.size = "md", this._portalContainer = null, this._handleKeydown = (e) => {
      e.key === "Escape" && this.isOpen && this.close();
    }, this._handleBackdropClick = (e) => {
      this.closeOnBackdrop && e.target === e.currentTarget && this.close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._createPortalContainer(), this._bindEvents();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._cleanupPortalContainer(), this._unbindEvents();
  }
  _createPortalContainer() {
    this._portalContainer || (this._portalContainer = document.createElement("div"), this._portalContainer.id = `dialog-portal-${Math.random().toString(36).substr(2, 9)}`, document.body.appendChild(this._portalContainer));
  }
  _cleanupPortalContainer() {
    this._portalContainer && this._portalContainer.parentNode && (this._portalContainer.parentNode.removeChild(this._portalContainer), this._portalContainer = null);
  }
  _bindEvents() {
    this.closeOnEscape && document.addEventListener("keydown", this._handleKeydown);
  }
  _unbindEvents() {
    document.removeEventListener("keydown", this._handleKeydown);
  }
  _getSizeClasses() {
    return {
      lg: "max-w-lg"
    }.lg;
  }
  open() {
    this.isOpen = !0, this._preventBodyScroll(), this.dispatchEvent(new CustomEvent("dialog-opened", { bubbles: !0 }));
  }
  close() {
    this.isOpen = !1, this._restoreBodyScroll(), this.dispatchEvent(new CustomEvent("dialog-closed", { bubbles: !0 }));
  }
  _preventBodyScroll() {
    document.body.style.overflow = "hidden";
  }
  _restoreBodyScroll() {
    document.body.style.overflow = "";
  }
  updated(e) {
    super.updated(e), e.has("isOpen") && this._portalContainer && (this.isOpen ? this._renderToPortal() : (this._restoreContent(), this._portalContainer.innerHTML = ""));
  }
  _restoreContent() {
    if (!this._portalContainer) return;
    const e = this._portalContainer.querySelector(".modal-content");
    e && Array.from(e.children).forEach((r) => {
      this.appendChild(r);
    });
  }
  _renderToPortal() {
    if (!this._portalContainer) return;
    const e = document.createElement("div");
    e.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm", e.addEventListener("click", this._handleBackdropClick);
    const n = document.createElement("div");
    if (n.className = `relative w-full ${this._getSizeClasses()} bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-out`, n.setAttribute("role", "dialog"), n.setAttribute("aria-modal", "true"), this.title && n.setAttribute("aria-labelledby", "dialog-title"), this.title) {
      const t = document.createElement("div");
      t.className = "flex items-center justify-between p-4 border-b border-gray-200";
      const s = document.createElement("h2");
      s.id = "dialog-title", s.className = "text-lg font-semibold text-gray-900", s.textContent = this.title;
      const o = document.createElement("button");
      o.type = "button", o.className = "text-gray-400 hover:text-gray-600 transition-colors", o.setAttribute("aria-label", "Close dialog"), o.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `, o.addEventListener("click", () => this.close()), t.appendChild(s), t.appendChild(o), n.appendChild(t);
    }
    const r = document.createElement("div");
    r.className = "modal-content", Array.from(this.children).forEach((t) => {
      r.appendChild(t);
    }), n.appendChild(r), e.appendChild(n), this._portalContainer.innerHTML = "", this._portalContainer.appendChild(e);
  }
  render() {
    return h``;
  }
};
i.styles = c`
    :host {
      display: contents;
    }
  `;
a([
  d({ type: Boolean, reflect: !0 })
], i.prototype, "isOpen", 2);
a([
  d({ type: String })
], i.prototype, "title", 2);
a([
  d({ type: Boolean })
], i.prototype, "closeOnBackdrop", 2);
a([
  d({ type: Boolean })
], i.prototype, "closeOnEscape", 2);
a([
  d({ type: String })
], i.prototype, "size", 2);
a([
  u()
], i.prototype, "_portalContainer", 2);
i = a([
  m("ui-modal")
], i);
export {
  i as UIModal
};
