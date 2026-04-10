import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { chargedCustomElement } from '../registry';
import './draggable.css';

export type DraggableProps = {} & { children: React.ReactNode };

@chargedCustomElement('ui-draggable')
export class UIDraggable extends LitElement {
	static styles = css`
		:host {
			display: inline-block;
		}
	`;

	@property()
	name = 'Somebody';

	connectedCallback() {
		super.connectedCallback();
		this.setAttribute('draggable', 'true');
		this.addEventListener('dragstart', this.onDragStart);
		this.addEventListener('drag', this.onDrag);
		this.addEventListener('dragend', this.onDragEnd);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('dragstart', this.onDragStart);
		this.removeEventListener('drag', this.onDrag);
		this.removeEventListener('dragend', this.onDragEnd);
	}

	onDragStart(event: DragEvent) {
		this.classList.add('dragging');
		const target = event.target as HTMLElement;
		const ghost = target.cloneNode(true) as HTMLElement;
		ghost.style.boxShadow = 'none';
		ghost.style.opacity = '1';
		setTimeout(() => ghost.remove(), 0);
	}

	onDrag(event: DragEvent) {
		console.log('Dragging:', event.clientX, event.clientY);
	}

	onDragEnd(event: DragEvent) {
		this.classList.remove('dragging');
		console.log('Drag ended');
	}

	render() {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-draggable': UIDraggable;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-draggable': DraggableProps & {
				children: React.ReactElement<
					React.ButtonHTMLAttributes<HTMLButtonElement>
				>;
			};
		}
	}
}
