import type { Route } from './+types/button';
import { ButtonVariant, ButtonSize, ButtonShape } from '~/elements/button';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Alert' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Alert() {
	return (
		<>
			<ui-button
				data-size={ButtonSize.Small}
				data-variant={ButtonVariant.Primary}
				data-shape={ButtonShape.Rounded}
			>
				<button>Small</button>
			</ui-button>
			<ui-button
				data-size={ButtonSize.Medium}
				data-variant={ButtonVariant.Primary}
				data-shape={ButtonShape.Rounded}
			>
				<button>Medium</button>
			</ui-button>
			<ui-button
				data-size={ButtonSize.Large}
				data-variant={ButtonVariant.Primary}
				data-shape={ButtonShape.Rounded}
			>
				<button>Large</button>
			</ui-button>
			<ui-button data-variant={ButtonVariant.Primary}>
				<button>Primary</button>
			</ui-button>
			{/* <ui-button data-variant="secondary">
				<button slot="value">Secondary</button>
			</ui-button>
			<ui-button data-variant="tertiary">
				<button slot="value">Tertiary</button>
			</ui-button>
			<ui-button data-variant="warning">
				<button slot="value">Warning</button>
			</ui-button>
			<ui-button data-variant="error">
				<button slot="value">Error</button>
			</ui-button>
			<ui-button data-variant="success">
				<button slot="value">Success</button>
			</ui-button>
			<ui-button data-variant="info">
				<button slot="value">Info</button>
			</ui-button> */}
		</>
	);
}
