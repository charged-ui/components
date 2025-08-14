import {
	type RouteConfig,
	index,
	layout,
	route,
} from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	layout('routes/elements/layout.tsx', [
		route('alert', 'routes/elements/alert.tsx'),
		route('button', 'routes/elements/button.tsx'),
		route('text', 'routes/elements/text.tsx'),
	]),
] satisfies RouteConfig;
