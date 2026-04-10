import type { Route } from './+types/alert';
import '~/elements/card';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Charged | Card' },
		{ name: 'description', content: 'Card component.' },
	];
}

export default function Card() {
	return (
		<div style={{ padding: '2rem', maxWidth: '400px' }}>
			<ui-card>
				<div slot="header" style={{ padding: '1rem', fontWeight: 600 }}>Card Header</div>
				<div slot="body" style={{ padding: '1rem' }}>
					This is the card body content. Add anything here.
				</div>
				<div slot="footer" style={{ padding: '1rem', borderTop: '1px solid #e5e5e5', color: '#666' }}>
					Card Footer
				</div>
			</ui-card>
		</div>
	);
}
