import type { Route } from './+types/alert';
import '~/elements/dots';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Charged | Dots' }];
}

export default function Dots() {
	return (
		<div style={{ height: '400px', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
			<ui-bg-dots style={{ height: '100%', '--dot-bg-color': '#f5f5f5' } as React.CSSProperties}>
				<div style={{ padding: '4rem', textAlign: 'center' }}>
					<h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Dots Background</h1>
				</div>
			</ui-bg-dots>
		</div>
	);
}
