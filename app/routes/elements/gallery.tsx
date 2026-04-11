import type { Route } from './+types/alert';
import '~/elements/gallery';
import '~/elements/card';
import '~/elements/icon';
import '~/elements/button';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'Charged | Gallery' }];
}

export default function Gallery() {
	return (
		<ui-gallery data-columns={2}>
			<ui-card
				data-categories="design,marketing"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
					alt="Brand Refresh"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Brand Refresh
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="apps,design"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
					alt="Mobile App"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Mobile App
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="marketing"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
					alt="Campaign Strategy"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Campaign Strategy
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="packaging,design"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
					alt="Sustainable Packaging"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Sustainable Packaging
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="design"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
					alt="Web Design"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Web Design
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="marketing,design"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg"
					alt="Social Media Kit"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Social Media Kit
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="design,apps"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg"
					alt="Dashboard UI"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Dashboard UI
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="apps"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg"
					alt="Plugin Development"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Plugin Development
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="marketing,packaging"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
					alt="Product Launch"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Product Launch
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="design,apps"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg"
					alt="UX Research"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					UX Research
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="packaging"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
					alt="Retail Packaging"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Retail Packaging
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>

			<ui-card
				data-categories="marketing,apps"
				class="grid-item group hover:shadow-sm duration-300 ease-out rounded-xl relative overflow-hidden cursor-pointer"
			>
				<img
					src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
					alt="Marketing Automation"
					slot="media"
					class="group-hover:scale-105 duration-300 ease-out transition-all"
				/>
				<div
					slot="footer"
					class="bg-white relative z-1 flex items-center p-4 font-medium"
				>
					Marketing Automation
					<ui-icon
						name="arrow-top-right-on-square"
						class="ml-auto opacity-0 group-hover:opacity-100 duration-300 ease-out transition-all"
					/>
				</div>
			</ui-card>
		</ui-gallery>
	);
}
