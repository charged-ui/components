import type { Route } from './+types/alert';
import '~/elements/droppable';
import '~/elements/draggable';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Charged | Droppable' }];
}

export default function Droppable() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
			<ui-draggable>Drag me</ui-draggable>
			<ui-droppable>
				<div style={{ color: '#999', fontSize: '0.875rem' }}>Drop here</div>
			</ui-droppable>
		</div>
	);
}
