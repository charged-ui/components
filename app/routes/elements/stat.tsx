import type { Route } from './+types/alert';
import '~/elements/stat';
import '~/elements/text';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Charged | Stat' }];
}

export default function Stat() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
			<div>
				<p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Count Up</p>
				<ui-stat variant="display-2" start={0} end={500}></ui-stat>
			</div>
			<div>
				<p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>With Prefix &amp; Suffix</p>
				<ui-stat variant="display-2" start={10} end={500}>
					<ui-text slot="prefix" data-variant="copy-xl">$</ui-text>
					<ui-text slot="suffix" data-variant="copy-xl">+</ui-text>
				</ui-stat>
			</div>
		</div>
	);
}
