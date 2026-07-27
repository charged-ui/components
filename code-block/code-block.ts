import { LitElement, html, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import Prism from 'prismjs';
import 'prismjs/plugins/autoloader/prism-autoloader.js';
import { chargedCustomElement } from '../registry';
import './code-block.css';

/* The autoloader plugin only registers itself in a browser (it needs
 * `document`), so it's undefined during SSR — guard the assignment. */
if (Prism.plugins.autoloader) {
	(Prism.plugins.autoloader as any).languages_path =
		'https://cdn.jsdelivr.net/npm/prismjs@1/components/';
}

const EXTENSION_TO_LANGUAGE: Record<string, string> = {
	ts: 'typescript',
	tsx: 'tsx',
	js: 'javascript',
	jsx: 'jsx',
	php: 'php',
	css: 'css',
	scss: 'scss',
	html: 'markup',
	xml: 'markup',
	svg: 'markup',
	json: 'json',
	py: 'python',
	rb: 'ruby',
	go: 'go',
	rs: 'rust',
	sh: 'bash',
	bash: 'bash',
	zsh: 'bash',
	yml: 'yaml',
	yaml: 'yaml',
	md: 'markdown',
	sql: 'sql',
	java: 'java',
	kt: 'kotlin',
	swift: 'swift',
	c: 'c',
	h: 'c',
	cpp: 'cpp',
	hpp: 'cpp',
};

/**
 * Split Prism's highlighted HTML into per-line strings, correctly handling
 * tokens that span multiple lines (e.g. PHP's outer `<?php … ?>` wrapper).
 * At each newline, all currently-open <span>s are closed, then re-opened on
 * the next line so each line is self-contained valid HTML.
 */
function splitHighlightedLines(highlighted: string): string[] {
	const lines: string[] = [];
	const open: string[] = [];
	let cur = '';
	const tokens = highlighted.split(/(<\/?span[^>]*>|\n)/);
	for (const t of tokens) {
		if (!t) continue;
		if (t === '\n') {
			cur += '</span>'.repeat(open.length);
			lines.push(cur);
			cur = open.join('');
		} else if (t.startsWith('</span')) {
			open.pop();
			cur += t;
		} else if (t.startsWith('<span')) {
			open.push(t);
			cur += t;
		} else {
			cur += t;
		}
	}
	if (cur || lines.length === 0) lines.push(cur);
	return lines;
}

function parseHighlightLines(spec: string): Set<number> {
	const lines = new Set<number>();
	if (!spec) return lines;
	for (const part of spec.split(',')) {
		const m = part.trim().match(/^(\d+)(?:-(\d+))?$/);
		if (!m) continue;
		const start = Number(m[1]);
		const end = m[2] ? Number(m[2]) : start;
		for (let i = start; i <= end; i++) lines.add(i);
	}
	return lines;
}

/** Accepts either a range string ("2-4,6") or an array ([2,3,4,6]). */
function toLineSet(v: string | number[] | null | undefined): Set<number> {
	if (Array.isArray(v)) return new Set(v.map(Number).filter(Number.isFinite));
	return parseHighlightLines(v ?? '');
}

/**
 * Strip a leading blank line, a trailing blank line, and the common
 * indent shared by every non-empty line. Lets consumers write their
 * code as natural HTML/JSX children with normal indentation.
 */
function dedent(text: string): string {
	const stripped = text.replace(/^[ \t]*\n/, '').replace(/\n[ \t]*$/, '');
	const lines = stripped.split('\n');
	let min = Infinity;
	for (const l of lines) {
		if (l.trim() === '') continue;
		const m = l.match(/^[ \t]*/);
		if (m && m[0].length < min) min = m[0].length;
	}
	if (!Number.isFinite(min) || min === 0) return stripped;
	return lines.map((l) => (l.trim() === '' ? l : l.slice(min))).join('\n');
}

const copyIcon = html`<svg
	viewBox="0 0 16 16"
	width="14"
	height="14"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<rect x="5" y="5" width="9" height="9" rx="1.5" />
	<path d="M3 11V3a1 1 0 0 1 1-1h7" />
</svg>`;

const checkIcon = html`<svg
	viewBox="0 0 16 16"
	width="14"
	height="14"
	fill="none"
	stroke="currentColor"
	stroke-width="1.75"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d="M3 8.5l3.5 3.5L13 5" />
</svg>`;

function slugify(s: string): string {
	return (
		s
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '') || 'block'
	);
}

function hashCode(s: string): string {
	let h = 5381;
	for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
	return (h >>> 0).toString(36);
}

/**
 * Props use camelCase so React 19 sets them as JS properties (not attributes).
 * Boolean defaults of `true` can't round-trip through attributes — React drops
 * the attribute on `false`, and Lit's @property reads attribute presence — so
 * these have to bind as properties.
 *
 * For raw HTML / Drupal / WP, the kebab attribute equivalents
 * (show-line-numbers, show-copy-button, highlight-lines, added-lines,
 * removed-lines, block-id) are still wired up via attribute: '…' on each
 * @property and behave the standard way (presence = true for booleans).
 */
export type CodeBlockProps = {
	code?: string;
	language?: string;
	filename?: string;
	blockId?: string;
	showLineNumbers?: boolean;
	showCopyButton?: boolean;
	wrap?: boolean;
	highlightLines?: string | number[];
	addedLines?: string | number[];
	removedLines?: string | number[];
} & React.HTMLAttributes<HTMLElement>;

@chargedCustomElement('ui-code-block')
export class UICodeBlock extends LitElement {
	createRenderRoot() {
		return this;
	}

	@property({ type: String })
	code = '';

	@property({ type: String })
	language = '';

	@property({ type: String })
	filename = '';

	@property({ type: String, attribute: 'block-id' })
	blockId = '';

	@property({ type: Boolean, attribute: 'show-line-numbers' })
	showLineNumbers = false;

	@property({ type: Boolean, attribute: 'show-copy-button' })
	showCopyButton = true;

	@property({ type: Boolean })
	wrap = false;

	@property({ attribute: 'highlight-lines' })
	highlightLines: string | number[] = '';

	@property({ attribute: 'added-lines' })
	addedLines: string | number[] = '';

	@property({ attribute: 'removed-lines' })
	removedLines: string | number[] = '';

	@state()
	private _highlightedHTML = '';

	@state()
	private _copied = false;

	@state()
	private _lineCount = 0;

	@state()
	private _referencedLine: number | null = null;

	private _onHashChange = () => this._syncReferencedLine();

	connectedCallback() {
		// Capture light-DOM children as code source BEFORE Lit's first render.
		// Supports <ui-code-block>code</ui-code-block> and
		// <ui-code-block><pre><code>code</code></pre></ui-code-block>.
		// Lit doesn't clear pre-existing children when the render root is the
		// host element, so we have to drop them ourselves to avoid duplicating
		// the source text under the rendered output.
		if (this.firstChild) {
			if (!this.code) {
				const slotted = this.querySelector('pre > code, code, pre');
				const text = (slotted ?? this).textContent ?? '';
				if (text.trim()) this.code = dedent(text);
			}
			this.replaceChildren();
		}
		super.connectedCallback();
		window.addEventListener('hashchange', this._onHashChange);
		this._syncReferencedLine();
	}

	disconnectedCallback() {
		window.removeEventListener('hashchange', this._onHashChange);
		super.disconnectedCallback();
	}

	private _syncReferencedLine() {
		const hash = location.hash.slice(1);
		const prefix = `${this._id}-L`;
		if (hash.startsWith(prefix)) {
			const n = Number(hash.slice(prefix.length));
			this._referencedLine = Number.isFinite(n) ? n : null;
		} else {
			this._referencedLine = null;
		}
	}

	willUpdate(changed: Map<string, unknown>) {
		if (
			changed.has('code') ||
			changed.has('language') ||
			changed.has('highlightLines') ||
			changed.has('addedLines') ||
			changed.has('removedLines')
		) {
			this._highlight();
		}
	}

	updated(changed: Map<string, unknown>) {
		if (changed.has('_referencedLine') || changed.has('_highlightedHTML')) {
			for (const el of this.querySelectorAll('.cb-line.is-referenced')) {
				el.classList.remove('is-referenced');
			}
			if (this._referencedLine != null) {
				const id = `${this._id}-L${this._referencedLine}`;
				this.querySelector(`#${CSS.escape(id)}`)?.classList.add(
					'is-referenced',
				);
			}
		}
	}

	private get _id(): string {
		if (this.blockId) return this.blockId;
		if (this.filename) return slugify(this.filename);
		return `cb-${hashCode(this.code)}`;
	}

	private async _highlight() {
		await this._loadLanguage(this.language);
		const lang = Prism.languages[this.language] ? this.language : 'plaintext';
		const highlighted = Prism.highlight(this.code, Prism.languages[lang], lang);
		const lines = splitHighlightedLines(highlighted);
		if (lines[lines.length - 1] === '') lines.pop();
		const highlightSet = toLineSet(this.highlightLines);
		const addedSet = toLineSet(this.addedLines);
		const removedSet = toLineSet(this.removedLines);
		const id = this._id;
		this._highlightedHTML = lines
			.map((line, i) => {
				const n = i + 1;
				const classes = ['cb-line'];
				if (highlightSet.has(n)) classes.push('is-highlighted');
				if (addedSet.has(n)) classes.push('is-added');
				if (removedSet.has(n)) classes.push('is-removed');
				return `<span class="${classes.join(' ')}" data-line="${n}" id="${id}-L${n}">${line}</span>`;
			})
			.join('');
		this._lineCount = lines.length;
	}

	private async _loadLanguage(lang: string): Promise<void> {
		if (!lang || Prism.languages[lang] || lang === 'plaintext') return;
		const autoloader = Prism.plugins.autoloader as any;
		if (!autoloader?.loadLanguages) return;
		return new Promise((resolve) => {
			autoloader.loadLanguages(
				[lang],
				() => resolve(),
				() => resolve(),
			);
		});
	}

	private _handleLineNumberClick(e: MouseEvent, line: number, lineId: string) {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
			return;
		e.preventDefault();
		history.pushState(null, '', `#${lineId}`);
		this._referencedLine = line;
	}

	private async _handleCopy() {
		await navigator.clipboard.writeText(this.code);
		this._copied = true;
		setTimeout(() => {
			this._copied = false;
		}, 2000);
	}

	private get _languageBadge(): string {
		if (!this.language) return '';
		if (!this.filename) return this.language;
		const ext = this.filename.split('.').pop()?.toLowerCase() ?? '';
		const inferred = EXTENSION_TO_LANGUAGE[ext];
		return inferred === this.language ? '' : this.language;
	}

	render(): TemplateResult {
		const badge = this._languageBadge;
		// Header is tied to having a filename. With no filename, the copy
		// button (if any) floats in the top-right of the code area instead.
		const showHeader = !!this.filename;
		const showFloatingCopy = !showHeader && this.showCopyButton;
		const lang = this.language || 'plaintext';
		const isDiff = !!(this.addedLines || this.removedLines);
		const preClasses = [
			this.showLineNumbers ? 'line-numbers' : '',
			this.wrap ? 'is-wrap' : '',
			isDiff ? 'is-diff' : '',
		]
			.filter(Boolean)
			.join(' ');

		const copyButton = html`<button
			class="cb-copy ${this._copied ? 'is-copied' : ''}"
			@click=${this._handleCopy}
			type="button"
			aria-label="Copy code"
		>
			${this._copied ? checkIcon : copyIcon}
		</button>`;

		return html`
			${showHeader
				? html`
						<div class="cb-header">
							<span class="cb-filename">${this.filename}</span>
							<div class="cb-header-actions">
								${badge ? html`<span class="cb-language">${badge}</span>` : ''}
								${this.showCopyButton ? copyButton : ''}
							</div>
						</div>
					`
				: ''}
			${showFloatingCopy
				? html`<div class="cb-copy-floating">${copyButton}</div>`
				: ''}
			<pre
				class="${preClasses}"
				data-language="${lang}"
				style="--cb-gutter: ${Math.max(2, String(this._lineCount).length)}ch;"
			>${this.showLineNumbers && this._lineCount > 0
				? html`<span class="cb-line-numbers"
						>${Array.from({ length: this._lineCount }, (_, i) => {
							const n = i + 1;
							const lineId = `${this._id}-L${n}`;
							return html`<a
								class="cb-line-number"
								href="#${lineId}"
								aria-label="Link to line ${n}"
								@click=${(e: MouseEvent) =>
									this._handleLineNumberClick(e, n, lineId)}
								>${n}</a
							>`;
						})}</span
					>`
				: ''}<code data-language="${lang}">${unsafeHTML(
				this._highlightedHTML,
			)}</code></pre>
			${this.showCopyButton
				? html`<span class="cb-sr" aria-live="polite"
						>${this._copied ? 'Copied to clipboard' : ''}</span
					>`
				: ''}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-code-block': UICodeBlock;
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'ui-code-block': CodeBlockProps & {
				children?: React.ReactNode;
			};
		}
	}
}
