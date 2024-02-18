import './tabs.css';

class ChargedTabs extends HTMLElement {
	label: string;

	constructor() {
		super();
	}

	// Called when the element is added to the DOM.
	connectedCallback() {}

	// Called when the element is removed from the DOM.
	disconnectedCallback() {}

}

customElements.define('ui-tabs', ChargedTabs);