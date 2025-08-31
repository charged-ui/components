import type { Route } from './+types/text';
import { TextVariant } from '~/elements/text';
import '~/elements/text/text';
export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Text' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Text() {
	return (
		<>
			<ui-text data-variant={TextVariant.H1}>Heading 1</ui-text>
			<ui-text data-variant={TextVariant.H2}>Heading 2</ui-text>
			<ui-text data-variant={TextVariant.H3}>Heading 3</ui-text>
			<ui-text data-variant={TextVariant.H4}>Heading 4</ui-text>
			<ui-text data-variant={TextVariant.H5}>Heading 5</ui-text>
			<ui-text data-variant={TextVariant.H6}>Heading 6</ui-text>
			<ui-text data-variant={TextVariant.D1}>Display 1</ui-text>
			<ui-text data-variant={TextVariant.D2}>Display 2</ui-text>
			<ui-text data-variant={TextVariant.D3}>Display 3</ui-text>
			<ui-text data-variant={TextVariant.D4}>Display 4</ui-text>
			<ui-text data-variant={TextVariant.D5}>Display 5</ui-text>
			<ui-text data-variant={TextVariant.D6}>Display 6</ui-text>
			<ui-text data-variant={TextVariant.XL}>Copy XL</ui-text>
			<ui-text data-variant={TextVariant.LG}>Copy Large</ui-text>
			<ui-text data-variant={TextVariant.MD}>Copy Medium</ui-text>
			<ui-text data-variant={TextVariant.SM}>Copy Small</ui-text>
			<ui-text data-variant={TextVariant.XS}>Copy XS</ui-text>
		</>
	);
}
