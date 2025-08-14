import { NavLink, Link, Outlet } from 'react-router';
import { TextVariant } from '~/elements/text';

export default function Layout() {
	return (
		<div className="flex flex-col divide-y divide-neutral-200 w-screen h-screen">
			<header className="px-8 py-4">Header</header>
			<main className="flex flex-1 overflow-hidden divide-x divide-neutral-200">
				<nav className="flex flex-col min-w-2xs bg-neutral-50 p-8 max-w-2xs overflow-auto gap-3">
					<ui-text data-variant={TextVariant.MD}>Elements</ui-text>
					<ul className="flex flex-col gap-2">
						<li>
							<NavLink
								to="/alert"
								className={({ isActive, isPending }) =>
									isPending ? '' : isActive ? 'font-medium' : ''
								}
							>
								Alert
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/button"
								className={({ isActive, isPending }) =>
									isPending ? '' : isActive ? 'font-medium' : ''
								}
							>
								Button
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/text"
								className={({ isActive, isPending }) =>
									isPending ? '' : isActive ? 'font-medium' : ''
								}
							>
								Text
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className="flex flex-col w-full gap-4 p-8 overflow-auto">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
