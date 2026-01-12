import type { Route } from './+types/button';
import '~/elements/droppable';
import '~/elements/draggable';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Droppable' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Droppable() {
	return (
		<>
			<ui-draggable>
				<div>Draggable</div>
			</ui-draggable>
			<ui-droppable>
				<div>Dropzone</div>
			</ui-droppable>
		</>
	);
}
