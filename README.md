# Charged UI

Universal web components built with [Lit 3](https://lit.dev). Fourteen custom
elements that run on the browser platform itself — drop them into Drupal,
WordPress, React, or plain HTML and they behave the same way in each.

Because they are custom elements and not framework components, there is no
adapter layer to maintain and nothing to rebuild when a framework cycles.

## Install

```bash
npm install charged-ui
```

## Usage

Importing an element registers it. There is no `register()` call and no
manual `customElements.define` — the `@chargedCustomElement` decorator in
[registry.ts](registry.ts) handles it, guarding against double registration so
the same element can be imported from several places safely.

Import per component so bundlers can drop what you do not use:

```ts
import 'charged-ui/button';
import 'charged-ui/alert';
```

Or pull in everything:

```ts
import 'charged-ui';
```

Then write markup — in JSX, Twig, Blade, or hand-written HTML:

```html
<ui-alert data-variant="success">
  <ui-icon slot="icon" name="check-circle"></ui-icon>
  <div slot="heading">Deployed</div>
  <div slot="message">Your components work here. And everywhere else.</div>
</ui-alert>
```

Subpath imports also carry the TypeScript enums, so consumers do not have to
write attribute strings by hand:

```ts
import { ButtonVariant, ButtonSize } from 'charged-ui/button';
```

Each component declares its own `HTMLElementTagNameMap` and JSX
`IntrinsicElements` entries, so React and TypeScript type the tags for free.

## Components

| Tag             | Name     | Description                                                           |
| --------------- | -------- | --------------------------------------------------------------------- |
| `ui-alert`      | Alert    | Status messaging with success, error, warning, and info variants.     |
| `ui-bg-aurora`  | Aurora   | Soft animated aurora gradient background surface.                     |
| `ui-button`     | Button   | Buttons across sizes, shapes, and semantic variants.                  |
| `ui-card`       | Card     | Slotted content container with header, body, and footer.              |
| `ui-details`    | Details  | Accessible accordion built on native `<details>`, themeable via vars. |
| `ui-bg-dots`    | Dots     | Dot-field background surface for technical sections.                  |
| `ui-icon`       | Icon     | Icon element backed by the Heroicons set.                             |
| `ui-logo`       | Logo     | Charged mark in icon and wordmark variants.                           |
| `ui-bg-meteors` | Meteors  | Meteor shower background effect for dark surfaces.                    |
| `ui-nav-menu`   | Nav Menu | Directional nav menu with morphing panel transitions.                 |
| `ui-bg-ripple`  | Ripple   | Radiating ripple background effect.                                   |
| `ui-spinner`    | Spinner  | Loading indicator.                                                    |
| `ui-tabs`       | Tabs     | Accessible tabs with an animated indicator and panel transitions.     |
| `ui-text`       | Text     | Typography element covering display, heading, and copy scales.        |

Every component except `ui-logo` ships a co-located `.mdx` file that is both
its prose documentation and its live demo source.

## Anatomy of a component

```
button/
  index.ts     side-effect CSS import + re-export
  button.ts    the Lit element, enums, and type declarations
  button.css   styles
  button.mdx   docs prose, live demos, and API table
```

`index.ts` is deliberately thin — it imports the stylesheet for its side effect
and re-exports the element, which is what makes `import 'charged-ui/button'`
both register the tag and load its styles.

## Styling

Components render into the **light DOM**, not shadow roots. That is a
deliberate trade: consumers keep full control with ordinary CSS and Tailwind
utilities, and server-rendered markup hydrates without shadow boundaries
getting in the way.

Two consequences worth knowing:

**Light-DOM enhancer pattern.** Components keep the author's `[slot="..."]`
children exactly where the server rendered them and only add behavior — ARIA,
keyboard handling, events, animation. Nothing is re-parented, because moving
children breaks React SSR hydration. React consumers should put
`suppressHydrationWarning` on slotted elements that a component decorates.

**Cascade layers.** Shipped CSS belongs in `@layer components` behind
`:where()` selectors, so consumer Tailwind utilities (always in the later
`utilities` layer) win every conflict without specificity fights or
`!important`. Unlayered library CSS silently beats Tailwind 4 utilities — that
was the original bug this pattern fixes.

> **Migration in progress.** Only [`details/details.css`](details/details.css)
> currently follows the layered pattern; it is the reference implementation.
> The remaining components still use unlayered `@apply` rules. When you touch a
> component's CSS, convert it.

### Theming

Components expose `--ui-<component>-*` custom properties as their theming API,
because CMS environments (Gutenberg, Drupal Canvas) emit inline custom
properties rather than utility classes. The properties act as defaults that
utility classes override:

```css
ui-details {
  --ui-details-bg: white;
  --ui-details-radius: 8px;
}
```

Tailwind users can skip the variables and apply utilities directly.

### Tailwind content detection

Tailwind's automatic content detection skips `node_modules`, so consuming apps
must point at `charged-ui` explicitly:

```css
@source "charged-ui";
```

## Build

```bash
pnpm build:ui
```

Three steps run in sequence:

1. **Vite** builds each component as its own ES entry point (`dist/button/index.js`),
   with CSS code splitting on.
2. **`scripts/postbuild.js`** reassembles Vite's emitted CSS: it splits the
   bundle on `ui-` selector boundaries, writes each component's rules to
   `dist/<name>/<name>.css`, and hoists `@property` declarations into a shared
   `dist/base.css`.
3. **`tsc --project tsconfig.build.json`** emits declarations only.

## Adding a component

A new component has to be registered in several places. Miss one and it will
either fail to build or silently vanish from the bundle:

1. Create `<slug>/` with `index.ts`, `<slug>.ts`, `<slug>.css`, `<slug>.mdx`.
2. Decorate the class with `@chargedCustomElement('ui-<slug>')`.
3. Add the export and side-effect import to [`index.ts`](index.ts).
4. Add the subpath to `exports` in [`package.json`](package.json).
5. Add the entry to [`vite.config.ts`](vite.config.ts).
6. Add the slug to `componentNames` in [`scripts/postbuild.js`](scripts/postbuild.js).
7. Add the path to `include` in [`tsconfig.build.json`](tsconfig.build.json).
8. Add `<slug>.test.ts` and `<slug>.test.html` for accessibility tests.

The docs app needs no catalog edit — it globs every `base/*/*.mdx` frontmatter
to build its sidebar and index. It only needs a route stub for code splitting.

## Documentation

Prose lives beside the element it documents, not in the docs app, so a
component and its documentation move together. The `.mdx` frontmatter
(`name`, `tag`, `description`) drives the docs catalog; `<Demo>` blocks render
as live examples.

The docs site lives in this repo under `docs/`:

```bash
pnpm dev
```

## Testing

Every component ships co-located accessibility tests — axe WCAG 2.1 AA
audits, ARIA assertions, and keyboard navigation tests for interactive
components. Tests run in a real Chromium browser via Playwright.

Each component has two test files alongside its source:

```
alert/
  alert.ts           component
  alert.css          styles
  alert.mdx          docs
  alert.test.ts      test logic (axe + keyboard + ARIA assertions)
  alert.test.html    fixture page (imports the component, renders it)
```

Run the full suite:

```bash
pnpm test:a11y
```

Playwright launches Chromium, spins up a Vite dev server, and runs all
`*.test.ts` files. First run installs Chromium automatically.

To add tests for a new component, copy the `alert.test.ts` +
`alert.test.html` pattern. The fixture uses a relative import
(`import './index.js'`) so it works regardless of package name.

Every evergreen browser — Chrome, Edge, Firefox, and Safari. Custom elements
are a stable platform feature, so there are no polyfills to manage.
