import {
	type RouteConfig,
	index,
	layout,
	route,
	prefix,
} from '@react-router/dev/routes';

export default [
	layout('./layout.tsx', [
		index('routes/setup.tsx', {}),
		route('cloud', 'routes/cloud.tsx'),
		route('elements', 'routes/elements.tsx'),
		route('themes', 'routes/themes.tsx'),
		route('plugins', 'routes/plugins.tsx'),
		...prefix('elements', [
			route('alert', 'routes/elements/alert.tsx'),
			route('button', 'routes/elements/button.tsx'),
			route('text', 'routes/elements/text.tsx'),
		]),
	]),
] satisfies RouteConfig;
