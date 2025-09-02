import type { Route } from './+types/alert';
import '~/elements/details';
export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Charged | Details' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Details() {
	return (
		<div>
			<ui-details>
				<div slot="summary">Heading 1</div>
				<div slot="content">Content 1</div>
			</ui-details>
			<ui-details>
				<div slot="summary">Heading 2</div>
				<div slot="content">Content 2</div>
			</ui-details>
		</div>
	);
}
