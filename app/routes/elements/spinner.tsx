import type { Route } from './+types/alert';
import '~/elements/spinner';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Charged | Loader' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Spinner() {
	return (
		<div>
			<ui-spinner />
		</div>
	);
}
