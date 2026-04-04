import type { Route } from './+types/alert';
import '~/elements/ripple';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Charged | Ripple' }];
}

export default function Ripple() {
	return (
		<div style={{ height: '400px', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e5e5e5', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
			<p style={{ zIndex: 10, fontSize: '3rem', fontWeight: 600, letterSpacing: '-0.04em' }}>Ripple</p>
			<ui-bg-ripple></ui-bg-ripple>
		</div>
	);
}
