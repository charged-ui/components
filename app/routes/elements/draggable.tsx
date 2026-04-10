import type { Route } from './+types/alert';
import '~/elements/draggable';
import '~/elements/droppable';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Charged | Draggable' }];
}

export default function Draggable() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
			<ui-draggable>Drag me</ui-draggable>
			<ui-droppable>
				<div style={{ color: '#999', fontSize: '0.875rem' }}>Drop here</div>
			</ui-droppable>
		</div>
	);
}
