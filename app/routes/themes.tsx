import type { Route } from './+types/integrations';
import { TextVariant } from '~/elements/text';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Charged | Themes' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Themes() {
	return <ui-text data-variant={TextVariant.XL}>Themes</ui-text>;
}
