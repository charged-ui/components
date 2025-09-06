import type { Route } from './+types/alert';
import '~/elements/icon';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Charged | Icon' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Details() {
	return (
		<div>
			<ui-icon name="home" />
		</div>
	);
}
