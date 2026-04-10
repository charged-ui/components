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
			route('aurora', 'routes/elements/aurora.tsx'),
			route('button', 'routes/elements/button.tsx'),
			route('card', 'routes/elements/card.tsx'),
			route('details', 'routes/elements/details.tsx'),
			route('dots', 'routes/elements/dots.tsx'),
			route('draggable', 'routes/elements/draggable.tsx'),
			route('droppable', 'routes/elements/droppable.tsx'),
			route('globe', 'routes/elements/globe.tsx'),
			route('icon', 'routes/elements/icon.tsx'),
			route('icon-selector', 'routes/elements/icon-selector.tsx'),
			route('meteors', 'routes/elements/meteors.tsx'),
			route('ripple', 'routes/elements/ripple.tsx'),
			route('spinner', 'routes/elements/spinner.tsx'),
			route('stat', 'routes/elements/stat.tsx'),
			route('text', 'routes/elements/text.tsx'),
		]),
	]),
] satisfies RouteConfig;
