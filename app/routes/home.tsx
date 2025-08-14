import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';
import '../components/alert';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-alert': { title: string } & { children?: React.ReactNode };
		}
	}
}

export default function Home() {
	return (
		<div>
			<ui-alert title="Lit Info">
				This is a pure Lit web component - no React wrapper.
			</ui-alert>
		</div>
	);
}
