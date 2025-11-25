import type { Route } from './+types/card';
import '~/elements/card';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Card' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Button() {
	return (
		<>
			<ui-card className="w-80">
				<div
					className="h-[210px] bg-slate-200 flex justify-center items-center"
					slot="media"
				>
					<ui-icon name="photo" className="w-12 h-12 text-slate-500" />
				</div>
				<div className="text-lg font-bold pt-8 px-8" slot="header">
					Card Header
				</div>
				<div slot="body" className="pb-8 px-8">
					Card Body
				</div>
				<footer slot="footer" className="border-t border-neutral-200 px-8 py-4">
					Card Footer
				</footer>
			</ui-card>
			{/* <ui-button data-variant="secondary">
				<button slot="value">Secondary</button>
			</ui-button>
			<ui-button data-variant="tertiary">
				<button slot="value">Tertiary</button>
			</ui-button>
			<ui-button data-variant="warning">
				<button slot="value">Warning</button>
			</ui-button>
			<ui-button data-variant="error">
				<button slot="value">Error</button>
			</ui-button>
			<ui-button data-variant="success">
				<button slot="value">Success</button>
			</ui-button>
			<ui-button data-variant="info">
				<button slot="value">Info</button>
			</ui-button> */}
		</>
	);
}
