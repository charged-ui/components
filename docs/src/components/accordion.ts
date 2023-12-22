export const accordion = `
	<div class="flex flex-col gap-8">
		<div class="flex flex-col gap-2">
		<h1 class="text-4xl font-semibold tracking-tight">Accordion</h2>
		<p class="text-xl text-stone-600">
			A group of collapsible, vertically stacked disclosure components.
		</p>
		</div>
		<div class="p-8 bg-gradient-to-b from-indigo-50 rounded-2xl">
			<ui-accordion class="bg-white">
				<ui-disclosure id="disclosure1" open>
					<summary>
						Disclosure 1
					</summary>
					<div class="p-6 bg-stone-50">
						Disclosure 1 content
					</div>
				</ui-disclosure>
				<ui-disclosure id="disclosure2">
					<summary>
						Disclosure 2
					</summary>
					<div class="p-6 bg-stone-50">
						Disclosure 2 content
					</div>
				</ui-disclosure>
				<ui-disclosure id="disclosure3">
					<summary>
						Disclosure 3
					</summary>
					<div class="p-6 bg-stone-50">
						Disclosure 3 content
					</div>
				</ui-disclosure>
			</ui-accordion>
		</div>
	</div>
`