import { NavLink, Outlet, type NavLinkRenderProps } from 'react-router';
import { TextVariant } from '~/elements/text';

const menuLinkBase =
	'relative -bottom-px flex gap-1 items-center justify-center text-sm px-3 py-5 border-b-2 border-transparent';

const navLinkStyles = ({ isActive, isPending }: NavLinkRenderProps) =>
	isPending
		? 'block px-4 py-2 font-medium rounded-lg'
		: isActive
			? 'block px-4 py-2 bg-neutral-100 dark:bg-neutral-800 dark:!text-white !text-zinc-950 font-medium rounded-lg'
			: 'block px-4 py-2 text-neutral-500 font-medium hover:bg-neutral-50 dark:hover:bg-zinc-900 rounded-lg';

const menuLinkStyles = ({ isActive, isPending }: NavLinkRenderProps) =>
	isPending
		? menuLinkBase
		: isActive
			? menuLinkBase +
				' ' +
				'dark:!text-white !text-neutral-950 !border-neutral-950 dark:!border-white'
			: menuLinkBase;

export default function Layout() {
	return (
		<div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700 divide-dashed w-screen h-screen px-8">
			<header className="flex divide-x divide-neutral-200 dark:divide-neutral-700 divide-dashed gap-8 bg-white dark:bg-neutral-950 border-x border-neutral-200 dark:border-neutral-700 border-dashed">
				<div className="flex gap-1.5 items-center px-4 py-4 max-w-2xs w-full">
					<img src="/logo.svg" alt="Charged Logo" className="size-6" />
					<ui-text
						data-variant={TextVariant.LG}
						className="!font-bold tracking-tight"
					>
						Charged
					</ui-text>
				</div>
				<div className="flex items-center border-l border-dashed border-neutral-200 dark:border-neutral-700 px-4">
					<ul className="flex gap-2">
						<li>
							<NavLink to="/" className={menuLinkStyles}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-5 relative top-px"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
									/>
								</svg>

								<ui-text
									data-variant={TextVariant.SM}
									className="!font-semibold relative top-px"
								>
									Installation
								</ui-text>
							</NavLink>
						</li>
						<li>
							<NavLink to="/elements" className={menuLinkStyles}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-4 relative top-px"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
									/>
								</svg>

								<ui-text
									data-variant={TextVariant.SM}
									className="!font-semibold relative top-px"
								>
									Elements
								</ui-text>
							</NavLink>
						</li>
						<li>
							<NavLink to="/themes" className={menuLinkStyles}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-4 relative top-px"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
									/>
								</svg>

								<ui-text
									data-variant={TextVariant.SM}
									className="!font-semibold relative top-px"
								>
									Themes
								</ui-text>
							</NavLink>
						</li>
						<li>
							<NavLink to="/plugins" className={menuLinkStyles}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-4 relative top-px"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
									/>
								</svg>

								<ui-text
									data-variant={TextVariant.SM}
									className="!font-semibold relative top-px"
								>
									Plugins
								</ui-text>
							</NavLink>
						</li>
						<li>
							<NavLink to="/cloud" className={menuLinkStyles}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-4 relative top-px"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
									/>
								</svg>

								<ui-text
									data-variant={TextVariant.SM}
									className="!font-semibold relative top-px"
								>
									Cloud
								</ui-text>
							</NavLink>
						</li>
					</ul>
					{/* Test */}
				</div>
			</header>
			<main className="flex flex-1 overflow-hidden divide-x divide-neutral-200 dark:divide-neutral-700 divide-dashed gap-8 border-x border-neutral-200 dark:border-neutral-700 border-dashed">
				<nav className="flex flex-col min-w-2xs bg-white dark:bg-neutral-950 px-4 py-8 max-w-2xs overflow-auto gap-2">
					<ui-text data-variant={TextVariant.SM} className="px-4 !font-bold">
						Elements
					</ui-text>
					<ul className="flex flex-col gap-1 text-sm">
						<li>
							<NavLink to="elements/alert" className={navLinkStyles}>
								Alert
							</NavLink>
						</li>
						<li>
							<NavLink to="elements/button" className={navLinkStyles}>
								Button
							</NavLink>
						</li>
						<li>
							<NavLink to="elements/details" className={navLinkStyles}>
								Details
							</NavLink>
						</li>
						<li>
							<NavLink to="elements/icon" className={navLinkStyles}>
								Icon
							</NavLink>
						</li>
						<li>
							<NavLink to="elements/text" className={navLinkStyles}>
								Text
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className="flex flex-col w-full gap-4 bg-white dark:bg-neutral-950 p-8 overflow-auto border-l border-neutral-200 dark:border-neutral-700 border-dashed">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
