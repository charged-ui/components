import type { Route } from './+types/alert';
import '~/elements/details';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Charged | Details' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Details() {
	return (
		<div>
			<ui-details name="faq" open>
				<div slot="summary">What is your return policy?</div>
				<div slot="content">
					<p>
						You can return items within 30 days of purchase for a full refund.
						Items must be in original condition with tags attached.
					</p>
				</div>
			</ui-details>
			<ui-details name="faq">
				<div slot="summary">How long does shipping take?</div>
				<div slot="content">
					<p>
						Standard shipping takes 3-5 business days. Express shipping is
						available for next-day delivery.
					</p>
				</div>
			</ui-details>
			<ui-details name="faq">
				<div slot="summary">Do you offer international shipping?</div>
				<div slot="content">
					<p>
						Yes, we ship to over 50 countries worldwide. International shipping
						rates vary by destination.
					</p>
				</div>
			</ui-details>
		</div>
	);
}
