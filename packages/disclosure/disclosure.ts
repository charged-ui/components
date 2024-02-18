import './disclosure.css';

class ChargedDisclosure extends HTMLElement {
	constructor() {
		super();

		// Create new HTMLDetailsElement
		const details = document.createElement('details');

		// Set name attribute on new details element
		if (this.hasAttribute('id')) {
			details.setAttribute('name', this.id);
		}

		// Set open attribute on new details element
		if (this.hasAttribute('open')) {
			details.setAttribute('open', '')
			this.removeAttribute('open');
		}

		// Wrap disclosure content with details element
		details.innerHTML = this.innerHTML;
		this.innerHTML = details.outerHTML;
	}

	// Called when the element is added to the DOM.
	connectedCallback() {
		this.addEventListener('click', this.handleClick, true);
		this.addEventListener('transitionend', this.handleTransitionEnd, true);
	}

	// Called when the element is removed from the DOM.
	disconnectedCallback() {
		this.addEventListener('click', this.handleClick, true);
		this.removeEventListener('transitionend', this.handleTransitionEnd, true);
	}

	// Called when end TransitionEvent occurs
	handleTransitionEnd(e: TransitionEvent) {}

	// Called when ClickEvent occurs
	handleClick(e: MouseEvent) {}
}

customElements.define('ui-disclosure', ChargedDisclosure);