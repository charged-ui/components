import { NavLink, Link, Outlet, type NavLinkRenderProps } from 'react-router';
import { TextVariant } from '~/elements/text';

const menuLinkStyles =
	'flex gap-1 items-center justify-center text-sm px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg';
const navLinkStyles = ({ isActive, isPending }: NavLinkRenderProps) =>
	isPending
		? 'block px-4 py-2'
		: isActive
			? 'block px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg'
			: 'block px-4 py-2 text-neutral-500';

export default function Layout() {
	return (
		<div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700 divide-dashed w-screen h-screen px-8">
			<header className="flex divide-x divide-neutral-200 dark:divide-neutral-700 divide-dashed gap-8 bg-white dark:bg-neutral-900 border-x border-neutral-200 dark:border-neutral-700 border-dashed">
				<div className="flex gap-1.5 items-center px-4 py-4 max-w-2xs w-full">
					<img src="./logo.svg" alt="Charged Logo" className="size-5" />
					<ui-text data-variant={TextVariant.MD} className="font-semibold">
						Charged
					</ui-text>
				</div>
				<div className="flex items-center border-l border-dashed border-neutral-200 dark:border-neutral-700 px-4 py-2">
					<ul className="flex gap-2">
						<li className={menuLinkStyles}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
								/>
							</svg>

							<ui-text data-variant={TextVariant.SM}>Setup</ui-text>
						</li>
						<li className="flex gap-1 items-center justify-center text-sm px-3 py-2 bg-zinc-100  dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="size-4"
							>
								<path d="M10.362 1.093a.75.75 0 0 0-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925ZM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0 0 18 14.25V6.443ZM9.25 18.693v-8.25l-7.25-4v7.807a.75.75 0 0 0 .388.657l6.862 3.786Z" />
							</svg>

							<ui-text data-variant={TextVariant.SM}>Elements</ui-text>
						</li>
						<li className={menuLinkStyles}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
								/>
							</svg>

							<ui-text data-variant={TextVariant.SM}>Integrations</ui-text>
						</li>
						<li className={menuLinkStyles}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
								/>
							</svg>

							<ui-text data-variant={TextVariant.SM}>Cloud</ui-text>
						</li>
					</ul>
					{/* Test */}
				</div>
			</header>
			<main className="flex flex-1 overflow-hidden divide-x divide-neutral-200 dark:divide-neutral-700 divide-dashed gap-8 border-x border-neutral-200 dark:border-neutral-700 border-dashed">
				<nav className="flex flex-col min-w-2xs bg-white dark:bg-neutral-900 px-4 py-8 max-w-2xs overflow-auto gap-2">
					<ui-text data-variant={TextVariant.SM} className="px-4">
						Elements
					</ui-text>
					<ul className="text-sm">
						<li>
							<NavLink to="/alert" className={navLinkStyles}>
								Alert
							</NavLink>
						</li>
						<li>
							<NavLink to="/button" className={navLinkStyles}>
								Button
							</NavLink>
						</li>
						<li>
							<NavLink to="/text" className={navLinkStyles}>
								Text
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className="flex flex-col w-full gap-4 bg-white dark:bg-neutral-900 p-8 overflow-auto border-l border-neutral-200 dark:border-neutral-700 border-dashed">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
