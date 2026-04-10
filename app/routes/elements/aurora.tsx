import type { Route } from './+types/alert';
import '~/elements/aurora';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Charged | Aurora' },
		{ name: 'description', content: 'Aurora background component.' },
	];
}

export default function Aurora() {
	return (
		<div style={{ height: '400px', borderRadius: '0.75rem', overflow: 'hidden' }}>
			<ui-bg-aurora style={{ height: '100%' }}>
				<div style={{ padding: '4rem', textAlign: 'center' }}>
					<h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Aurora Background</h1>
					<p style={{ marginTop: '1rem', color: '#555' }}>A smooth animated aurora effect.</p>
				</div>
			</ui-bg-aurora>
		</div>
	);
}
