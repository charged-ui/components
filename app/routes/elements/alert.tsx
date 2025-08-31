import type { Route } from './+types/alert';
import { AlertVariant } from '~/elements/alert';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Alert' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Alert() {
	return (
		<>
			<ui-alert data-variant={AlertVariant.Success}>
				{/* <ui-icon slot="icon" name="check-circle" /> */}
				<div slot="heading">Success</div>
				<div slot="message">Operation completed successfully.</div>
			</ui-alert>
			<ui-alert data-variant={AlertVariant.Error}>
				{/* <ui-icon slot="icon" name="check-circle" /> */}
				<div slot="heading">Success</div>
				<div slot="message">Operation completed successfully.</div>
			</ui-alert>
			<ui-alert data-variant={AlertVariant.Warning}>
				<div slot="heading">Warning</div>
				<div slot="message">Please be cautious.</div>
			</ui-alert>
			<ui-alert data-variant={AlertVariant.Info}>
				<div slot="heading">Status</div>
				<div slot="message">Here is some important information.</div>
			</ui-alert>
		</>
	);
}
