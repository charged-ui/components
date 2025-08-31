import { AlertProps } from './app/elements/alert';

declare namespace JSX {
	interface IntrinsicElements {
		'ui-alert': AlertProps & { children?: React.ReactNode };
	}
}
