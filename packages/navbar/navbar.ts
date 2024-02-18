import './navbar.css';

class ChargedNavbar extends HTMLElement {
	constructor() {
		super();
	}

	// Called when the element is added to the DOM.
	connectedCallback() {}

	// Called when the element is removed from the DOM.
	disconnectedCallback() {}
}

customElements.define('ui-navbar', ChargedNavbar);