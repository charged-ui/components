import type { Route } from './+types/elements';
import { TextVariant } from '~/elements/text';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Elements() {
	return <ui-text data-variant={TextVariant.XL}>Elements</ui-text>;
}
