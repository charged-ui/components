export const navbar = `
	<div class="flex flex-col gap-8">
		<div class="flex flex-col gap-2">
			<h1 class="text-4xl font-semibold tracking-tight">Navbar</h2>
			<p class="text-xl text-stone-600">
				A navbar component used as the primary navigation menu.
			</p>
		</div>
		<div class="p-8 bg-gradient-to-b from-stone-100 rounded-2xl flex items-center justify-center height-[310px]">
			<ui-navbar role="list" class="relative">
				<div class="group" role="listitem">
					<button class="rounded-full bg-white border px-6 py-2 font-medium">
						Home
					</button>
				</div>
				<div class="group" role="listitem">
					<button class="flex items-center rounded-full px-6 py-2 font-medium hover:bg-white group-hover:bg-white hover:border-inherit group-hover:border-inherit border border-transparent mb-2">
						About
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-4 h-4 ml-2 group-hover:rotate-180 duration-300 transition-transform relative">
							<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
						</svg>
					</button>
					<ul class="absolute hidden group-hover:flex flex-col bg-white border rounded-xl shadow-lg divide-y divide-gray-100 min-w-[200px] overflow-hidden">
						<li class="py-2 px-4 hover:bg-gray-50 cursor-pointer">Default</li>
						<li class="py-2 px-4 hover:bg-gray-50 cursor-pointer">Alternate</li>
						<li class="py-2 px-4 hover:bg-gray-50 cursor-pointer">Item 3</li>
					</ul>
				</div>
				<div>
					<button class="rounded-full px-6 py-2 font-medium hover:bg-white group-hover:bg-white hover:border-inherit group-hover:border-inherit border border-transparent mb-1">
						Blog
					</button>
				</div>
				<div>
					<button class="rounded-full px-6 py-2 font-medium hover:bg-white group-hover:bg-white hover:border-inherit group-hover:border-inherit border border-transparent mb-1">
						Contact
					</button>
				</div>
			</ui-navbar>
		</div>
	</div>
`