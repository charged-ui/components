import type { Route } from './+types/home';
import { TextVariant } from '~/elements/text';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Plugins() {
	return <ui-text data-variant={TextVariant.XL}>Plugins</ui-text>;
}
