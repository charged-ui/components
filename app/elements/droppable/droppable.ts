import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Detail for dropzone-drop event
 */
export interface DropzoneDropDetail {
  event: DragEvent;
  data: Record<string, string>;
  files: File[];
  types: string[];
}

/**
 * Detail for dropzone-dragenter and dropzone-dragover events
 */
export interface DropzoneDragEnterDetail {
  event: DragEvent;
  types: string[];
}

/**
 * Detail for dropzone-dragleave event
 */
export interface DropzoneDragLeaveDetail {
  event: DragEvent;
}

/**
 * Custom event map for Dropzone component
 */
export interface DropzoneEventMap {
  'dropzone-drop': CustomEvent<DropzoneDropDetail>;
  'dropzone-dragenter': CustomEvent<DropzoneDragEnterDetail>;
  'dropzone-dragleave': CustomEvent<DropzoneDragLeaveDetail>;
  'dropzone-dragover': CustomEvent<DropzoneDragEnterDetail>;
}

export type DroppableProps = {} & { children: React.ReactNode };

/**
 * A dropzone component that fires events when elements are dropped into it.
 * 
 * @fires dropzone-drop - Fired when an element is dropped. Detail contains the drop event and transferred data.
 * @fires dropzone-dragenter - Fired when a dragged element enters the dropzone.
 * @fires dropzone-dragleave - Fired when a dragged element leaves the dropzone.
 * @fires dropzone-dragover - Fired continuously while dragging over the dropzone.
 * 
 * @example
 * ```html
 * <drop-zone id="my-dropzone">
 *   <div>Drop files here</div>
 * </drop-zone>
 * ```
 * 
 * @example
 * ```typescript
 * const dropzone = document.getElementById('my-dropzone') as Dropzone;
 * dropzone.addEventListener('dropzone-drop', (e: CustomEvent<DropzoneDropDetail>) => {
 *   console.log('Dropped files:', e.detail.files);
 * });
 * ```
 */
@customElement('ui-droppable')
export class UIDroppable extends LitElement {
	static styles = css`
		p {
			color: blue;
		}
	`;

  /**
   * Indicates whether an element is currently being dragged over the dropzone
   */
  @property({ type: Boolean, reflect: true, attribute: 'drag-over' })
  dragOver = false;

  /**
   * Array of accepted MIME types or data transfer types.
   * Empty array means accept all types.
   * 
   * @example ['image/png', 'image/jpeg']
   * @example ['text/plain', 'text/html']
   */
  @property({ type: Array, attribute: 'accepted-types' })
  acceptedTypes: string[] = [];
  
  /**
   * Internal counter to track nested drag events
   * @private
   */
  private dragCounter = 0;

  /**
   * Check if the dragged data type is accepted
   * @private
   */
  private isAcceptedType(dataTransfer: DataTransfer): boolean {
    if (!this.acceptedTypes || this.acceptedTypes.length === 0) {
      return true;
    }

    return this.acceptedTypes.some(type => 
      Array.from(dataTransfer.types).includes(type)
    );
  }

  /**
   * Emit a custom event with proper typing
   * @private
   */
  private emitEvent<K extends keyof DropzoneEventMap>(
    eventName: K,
    detail: DropzoneEventMap[K]['detail']
  ): void {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    }));
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

  /**
   * Handle drag enter event
   * @private
   */
  private onDragEnter(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    
    this.dragCounter++;
    
    if (e.dataTransfer && this.isAcceptedType(e.dataTransfer)) {
      this.dragOver = true;

      this.emitEvent('dropzone-dragenter', {
        event: e,
        types: Array.from(e.dataTransfer.types)
      });
    }
  }

  /**
   * Handle drag over event
   * @private
   */
  private onDragOver(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer) {
      if (this.isAcceptedType(e.dataTransfer)) {
        e.dataTransfer.dropEffect = 'copy';
        
        this.emitEvent('dropzone-dragover', {
          event: e,
          types: Array.from(e.dataTransfer.types)
        });
      } else {
        e.dataTransfer.dropEffect = 'none';
      }
    }
  }

  /**
   * Handle drag leave event
   * @private
   */
  private onDragLeave(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    
    this.dragCounter--;
    
    // Only set dragOver to false when we've truly left the dropzone
    if (this.dragCounter === 0) {
      this.dragOver = false;
      
      this.emitEvent('dropzone-dragleave', {
        event: e
      });
    }
  }

  /**
   * Handle drop event
   * @private
   */
  private onDrop(e: DragEvent): void {
    console.log('onDrop');
    e.preventDefault();
    e.stopPropagation();
    
    this.dragCounter = 0;
    this.dragOver = false;

    if (!e.dataTransfer || !this.isAcceptedType(e.dataTransfer)) {
      return;
    }

    // Extract data from dataTransfer
    const data: Record<string, string> = {};

    Array.from(e.dataTransfer.types).forEach(type => {
      if (e.dataTransfer) {
        data[type] = e.dataTransfer.getData(type);
      }
    });

    this.emitEvent('dropzone-drop', {
      event: e,
      data,
      files: Array.from(e.dataTransfer.files),
      types: Array.from(e.dataTransfer.types)
    });
  }



	render() {
		return html`
      <slot></slot>
		`;
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
