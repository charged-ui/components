import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ui-draggable')
export class UIDraggable extends LitElement {
	static styles = css`
		:host { 
			display: inline-block;
		}
		p {
			color: blue;
		}
	`;

	@property()
	name = 'Somebody';

	connectedCallback() {
    super.connectedCallback();
    this.setAttribute('draggable', 'true'); // Make the element draggable
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
    // Prevent default behavior (e.g., text selection) and set data
    // event.dataTransfer!.effectAllowed = 'move';
    // event.dataTransfer!.setData('text/plain', this.id); // Transfer the element's ID
    this.classList.add('dragging'); // Add a class for styling the source element
    
		// 1. Create the ghost
		const target = event.target as HTMLElement;
		const ghost = target.cloneNode(true) as HTMLElement;
		
		// 2. Remove the shadow and add custom 2026 "lifted" styling
		ghost.style.boxShadow = 'none'; 
		ghost.style.opacity = '1';
		
		// 3. Move it off-screen so it's not visible in the layout
		// ghost.style.position = 'absolute';
		// ghost.style.top = '-1000px';
		// document.body.appendChild(ghost);

		// 4. Set it as the drag image
		// event.dataTransfer?.setDragImage(ghost, 0, 0);

		// 5. Cleanup immediately after the browser takes its snapshot
		setTimeout(() => ghost.remove(), 0);

    // Optional: set a custom drag image
    // event.dataTransfer.setDragImage(imgElement, xOffset, yOffset);
    // console.log('Drag started:', this.id);
  }

	onDrag(event: DragEvent) {
    // This event fires continuously while dragging
    console.log('Dragging:', event.clientX, event.clientY);
  }

  onDragEnd(event: DragEvent) {
    // Fired when the drag operation finishes (after drop or cancel)
    this.classList.remove('dragging'); // Remove styling class
    console.log('Drag ended');
  }

	render() {
		return html`<slot></slot>`;
	}
}

export type DraggableProps = {} & { children: React.ReactNode };

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
