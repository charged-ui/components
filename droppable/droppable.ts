import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { chargedCustomElement } from '../registry';
import './droppable.css';

export interface DropzoneDropDetail {
	event: DragEvent;
	data: Record<string, string>;
	files: File[];
	types: string[];
}

export interface DropzoneDragEnterDetail {
	event: DragEvent;
	types: string[];
}

export interface DropzoneDragLeaveDetail {
	event: DragEvent;
}

export interface DropzoneEventMap {
	'dropzone-drop': CustomEvent<DropzoneDropDetail>;
	'dropzone-dragenter': CustomEvent<DropzoneDragEnterDetail>;
	'dropzone-dragleave': CustomEvent<DropzoneDragLeaveDetail>;
	'dropzone-dragover': CustomEvent<DropzoneDragEnterDetail>;
}

export type DroppableProps = {} & { children: React.ReactNode };

@chargedCustomElement('ui-droppable')
export class UIDroppable extends LitElement {
	static styles = css`
		:host {
			display: block;
		}
	`;

	@property({ type: Boolean, reflect: true, attribute: 'drag-over' })
	dragOver = false;

	@property({ type: Array, attribute: 'accepted-types' })
	acceptedTypes: string[] = [];

	private dragCounter = 0;

	private isAcceptedType(dataTransfer: DataTransfer): boolean {
		if (!this.acceptedTypes || this.acceptedTypes.length === 0) {
			return true;
		}
		return this.acceptedTypes.some((type) =>
			Array.from(dataTransfer.types).includes(type)
		);
	}

	private emitEvent<K extends keyof DropzoneEventMap>(
		eventName: K,
		detail: DropzoneEventMap[K]['detail']
	): void {
		this.dispatchEvent(
			new CustomEvent(eventName, { detail, bubbles: true, composed: true })
		);
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('dragenter', this.onDragEnter);
		this.addEventListener('drop', this.onDrop);
		this.addEventListener('dragover', this.onDragOver);
		this.addEventListener('dragleave', this.onDragLeave);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('dragenter', this.onDragEnter);
		this.removeEventListener('drop', this.onDrop);
		this.removeEventListener('dragover', this.onDragOver);
		this.removeEventListener('dragleave', this.onDragLeave);
	}

	private onDragEnter(e: DragEvent): void {
		e.preventDefault();
		e.stopPropagation();
		this.dragCounter++;
		if (e.dataTransfer && this.isAcceptedType(e.dataTransfer)) {
			this.dragOver = true;
			this.emitEvent('dropzone-dragenter', {
				event: e,
				types: Array.from(e.dataTransfer.types),
			});
		}
	}

	private onDragOver(e: DragEvent): void {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer) {
			if (this.isAcceptedType(e.dataTransfer)) {
				e.dataTransfer.dropEffect = 'copy';
				this.emitEvent('dropzone-dragover', {
					event: e,
					types: Array.from(e.dataTransfer.types),
				});
			} else {
				e.dataTransfer.dropEffect = 'none';
			}
		}
	}

	private onDragLeave(e: DragEvent): void {
		e.preventDefault();
		e.stopPropagation();
		this.dragCounter--;
		if (this.dragCounter === 0) {
			this.dragOver = false;
			this.emitEvent('dropzone-dragleave', { event: e });
		}
	}

	private onDrop(e: DragEvent): void {
		e.preventDefault();
		e.stopPropagation();
		this.dragCounter = 0;
		this.dragOver = false;

		if (!e.dataTransfer || !this.isAcceptedType(e.dataTransfer)) {
			return;
		}

		const data: Record<string, string> = {};
		Array.from(e.dataTransfer.types).forEach((type) => {
			if (e.dataTransfer) {
				data[type] = e.dataTransfer.getData(type);
			}
		});

		this.emitEvent('dropzone-drop', {
			event: e,
			data,
			files: Array.from(e.dataTransfer.files),
			types: Array.from(e.dataTransfer.types),
		});
	}

	render() {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-droppable': UIDroppable;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-droppable': DroppableProps & {
				children: React.ReactElement<
					React.ButtonHTMLAttributes<HTMLButtonElement>
				>;
			};
		}
	}
}
