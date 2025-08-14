import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

@customElement('ui-alert')
export class UIAlert extends LitElement {
	static properties = {
		type: { type: String },
		title: { type: String },
		dismissible: { type: Boolean },
		_visible: { state: true },
	};

	declare type: AlertType;
	declare title: string;
	declare dismissible: boolean;
	declare _visible: boolean;

	constructor() {
		super();
		this.type = 'info';
		this.title = '';
		this.dismissible = false;
		this._visible = true;
	}

	static styles = css`
		:host {
			display: block;
			margin-bottom: 16px;
		}

		:host([hidden]) {
			display: none;
		}

		.alert {
			padding: 16px;
			border-radius: 8px;
			border: 1px solid;
			position: relative;
			transition: opacity 0.3s ease;
		}

		.alert.info {
			background-color: #e3f2fd;
			border-color: #2196f3;
			color: #1976d2;
		}

		.alert.success {
			background-color: #e8f5e8;
			border-color: #4caf50;
			color: #388e3c;
		}

		.alert.warning {
			background-color: #fff3e0;
			border-color: #ff9800;
			color: #f57c00;
		}

		.alert.error {
			background-color: #ffebee;
			border-color: #f44336;
			color: #d32f2f;
		}

		.alert-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 8px;
		}

		.alert-title {
			font-weight: 600;
			font-size: 16px;
			margin: 0;
		}

		.alert-content {
			font-size: 14px;
			line-height: 1.5;
		}

		.close-button {
			background: none;
			border: none;
			font-size: 18px;
			cursor: pointer;
			padding: 4px;
			border-radius: 4px;
			color: inherit;
			opacity: 0.7;
			transition: opacity 0.2s ease;
		}

		.close-button:hover {
			opacity: 1;
		}

		.alert-icon {
			display: inline-block;
			width: 20px;
			height: 20px;
			margin-right: 8px;
			vertical-align: middle;
		}

		.hidden {
			opacity: 0;
			pointer-events: none;
		}
	`;

	private _getIcon() {
		const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
		return icons[this.type] || icons.info;
	}

	private _handleClose() {
		this._visible = false;

		// Dispatch custom event for React integration
		this.dispatchEvent(
			new CustomEvent('alert-close', {
				detail: { type: this.type, title: this.title },
				bubbles: true,
				composed: true,
			})
		);

		// Hide after animation
		setTimeout(() => {
			this.style.display = 'none';
		}, 300);
	}

	render() {
		if (!this._visible) {
			return null;
		}

		return html`
			<div class="alert ${this.type} ${!this._visible ? 'hidden' : ''}">
				${this.title
					? html`
							<div class="alert-header">
								<h3 class="alert-title">
									<span class="alert-icon">${this._getIcon()}</span>
									${this.title}
								</h3>
								${this.dismissible
									? html`
											<button
												class="close-button"
												@click=${this._handleClose}
												aria-label="Close alert"
											>
												✕
											</button>
										`
									: ''}
							</div>
						`
					: this.dismissible
						? html`
								<div class="alert-header">
									<div>
										<span class="alert-icon">${this._getIcon()}</span>
									</div>
									<button
										class="close-button"
										@click=${this._handleClose}
										aria-label="Close alert"
									>
										✕
									</button>
								</div>
							`
						: html` <span class="alert-icon">${this._getIcon()}</span> `}

				<div class="alert-content">
					<slot></slot>
				</div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-alert': UIAlert;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-alert': { title: string } & { children?: React.ReactNode };
		}
	}
}
