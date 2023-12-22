export const tabs = `
	<div class="flex flex-col gap-8">
		<div class="flex flex-col gap-2">
			<h1 class="text-4xl font-semibold">Tabs</h2>
			<p class="text-xl text-stone-600">
				A group of collapsible, vertically stacked disclosure components.
			</p>
		</div>
		<div class="p-8 bg-gradient-to-b from-pink-50 rounded-2xl">
			<ui-tabs class="flex flex-col">
				<div role="tablist" aria-label="Sample Tabs" class="-bottom-px relative overflow-hidden flex bg-stone-50 mr-auto relative rounded-t-xl border-t border-l border-r divide-x">
					<button
						role="tab"
						aria-selected="true"
						aria-controls="panel1"
						id="tab1"
						class="px-6 py-3 bg-white border-b border-b-white font-medium text-sm md:text-base"
					>
						First Tab
					</button>
					<button
						role="tab"
						aria-selected="false"
						aria-controls="panel2"
						id="tab2"
						class="px-6 py-3 border-b text-sm md:text-base"
					>
						Second Tab
					</button>
					<button
						role="tab"
						aria-selected="false"
						aria-controls="panel3"
						id="tab3"
						class="px-6 py-3 border-b text-sm md:text-base"
					>
						Third Tab
					</button>
				</div>
				<div class="bg-white p-6 border rounded-b-xl rounded-tr-xl shadow-[0_15px_30px_-15px_rgba(0,0,0,0.1)]">
					<div id="panel1" role="tabpanel" aria-labelledby="tab1">
						<p>Content for the first panel</p>
					</div>
					<div id="panel2" role="tabpanel" aria-labelledby="tab2" hidden>
						<p>Content for the second panel</p>
					</div>
					<div id="panel3" role="tabpanel" aria-labelledby="tab3" hidden>
						<p>Content for the third panel</p>
					</div>
				</div>
			</div>
		</ui-tabs>
	</div>
`