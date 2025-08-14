import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';
import { AlertVariant } from '~/elements/alert';
import { TextVariant } from '~/elements/text';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Home() {
	return (
		<div className="flex flex-col divide-y divide-zinc-200">
			<div className="flex flex-col gap-4 p-8">
				<ui-alert variant={AlertVariant.Success}>
					{/* <ui-icon slot="icon" name="check-circle" /> */}
					<div slot="heading">Success</div>
					<div slot="message">Operation completed successfully.</div>
				</ui-alert>
				<ui-alert variant={AlertVariant.Error}>
					{/* <ui-icon slot="icon" name="check-circle" /> */}
					<div slot="heading">Success</div>
					<div slot="message">Operation completed successfully.</div>
				</ui-alert>
				<ui-alert variant={AlertVariant.Warning}>
					<div slot="heading">Warning</div>
					<div slot="message">Please be cautious.</div>
				</ui-alert>
				<ui-alert variant={AlertVariant.Info}>
					<div slot="heading">Status</div>
					<div slot="message">Here is some important information.</div>
				</ui-alert>
			</div>
			<div className="flex flex-col gap-4 p-8">
				<ui-text variant={TextVariant.H1}>Heading 1</ui-text>
				<ui-text variant={TextVariant.H2}>Heading 2</ui-text>
				<ui-text variant={TextVariant.H3}>Heading 3</ui-text>
				<ui-text variant={TextVariant.H4}>Heading 4</ui-text>
				<ui-text variant={TextVariant.H5}>Heading 5</ui-text>
				<ui-text variant={TextVariant.H6}>Heading 6</ui-text>
				<ui-text variant={TextVariant.D1}>Display 1</ui-text>
				<ui-text variant={TextVariant.D2}>Display 2</ui-text>
				<ui-text variant={TextVariant.D3}>Display 3</ui-text>
				<ui-text variant={TextVariant.D4}>Display 4</ui-text>
				<ui-text variant={TextVariant.D5}>Display 5</ui-text>
				<ui-text variant={TextVariant.D6}>Display 6</ui-text>
				<ui-text variant={TextVariant.XL}>Copy XL</ui-text>
				<ui-text variant={TextVariant.LG}>Copy Large</ui-text>
				<ui-text variant={TextVariant.MD}>Copy Medium</ui-text>
				<ui-text variant={TextVariant.SM}>Copy Small</ui-text>
				<ui-text variant={TextVariant.XS}>Copy XS</ui-text>
			</div>
		</div>
	);
}
