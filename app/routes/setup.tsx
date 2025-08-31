import type { Route } from './+types/setup';
import { TextVariant } from '~/elements/text';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Charged | Get Started' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Setup() {
	return (
		<div className="flex gap-8">
			<article className="flex flex-col max-w-2xl">
				<header className="flex flex-col gap-4">
					<ui-text data-variant={TextVariant.H4}>Get Started</ui-text>
					<ui-text
						data-variant={TextVariant.XL}
						className="text-neutral-500 dark:text-neutral-400"
					>
						Charged is a universal component system designed for use in any web
						environment.
					</ui-text>
					<p>
						Whether you're working with React, Vue, vanilla JavaScript, or any
						other web technology, maintaining consistent design and
						functionality across projects can be challenging.
					</p>
					<p>
						Charged eliminates this complexity by providing a library of web
						components that work everywhere. No framework lock-in, no rebuilding
						components—just faster development across all your projects.
					</p>
					<p>
						Built on top of the{' '}
						<a
							href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components"
							className="text-blue-600 dark:text-blue-400 hover:underline"
							target="_blank"
						>
							Web Components API
						</a>{' '}
						and{' '}
						<a
							href="https://tailwindcss.com/"
							className="text-blue-600 dark:text-blue-400 hover:underline"
							target="_blank"
						>
							Tailwind
						</a>
						, Charged components drop into any environment and just work.
					</p>
					<ui-text data-variant={TextVariant.H5}>Browser support</ui-text>
				</header>
			</article>
			<aside>
				<ui-text data-variant={TextVariant.SM}>On this page</ui-text>
			</aside>
		</div>
	);
}
