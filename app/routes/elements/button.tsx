import type { Route } from './+types/button';
import { ButtonVariant, ButtonSize } from '~/elements/button';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Alert' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Alert() {
	return (
		<>
			<ui-button size={ButtonSize.Small}>Small</ui-button>
			<ui-button>
				<div slot="value">Medium</div>
			</ui-button>
			<ui-button size="large">
				<div slot="value">Large</div>
			</ui-button>
		</>
	);
}
