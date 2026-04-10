import type { Route } from './+types/alert';
import '~/elements/meteors';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Charged | Meteors' },
		{ name: 'description', content: 'Meteors background component.' },
	];
}

export default function Meteors() {
	return (
		<div style={{ height: '400px', background: '#18181b', borderRadius: '0.75rem', overflow: 'hidden' }}>
			<ui-bg-meteors number={20} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 600, textAlign: 'center' }}>
					Meteors Background
				</div>
			</ui-bg-meteors>
		</div>
	);
}
