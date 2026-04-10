import type { Route } from './+types/alert';
import '~/elements/globe';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Charged | Globe' },
		{ name: 'description', content: 'Interactive 3D globe component.' },
	];
}

export default function Globe() {
	return (
		<div>
			<ui-globe size={400}></ui-globe>
		</div>
	);
}
