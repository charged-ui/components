import type { Route } from './+types/alert';
import '~/elements/icon-selector';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Charged | Icon Selector' }];
}

export default function IconSelector() {
	return (
		<div style={{ maxWidth: '600px' }}>
			<ui-icon-selector size={24} variant="outline"></ui-icon-selector>
		</div>
	);
}
