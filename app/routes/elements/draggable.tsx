import type { Route } from './+types/button';
import '~/elements/draggable';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Draggable' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Draggable() {
	return (
		<>
			<ui-draggable>
				<div>Draggable</div>
			</ui-draggable>
		</>
	);
}
