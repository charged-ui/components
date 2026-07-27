# Nav Menu

A navigation menu with smooth, directional panel transitions. Hover or
focus a trigger to open its panel; moving between triggers slides the panel
under the new one and cross-fades the content in the direction of travel.

## Example

```html
<ui-nav-menu>
  <!-- The trigger bar: any element (e.g. a nav) — the component finds the
       [data-target] buttons inside it. Buttons can also be slotted directly. -->
  <nav slot="trigger" style="display:flex; gap:2rem;">
    <button data-target="products">Products</button>
    <button data-target="pricing">Pricing</button>
    <button data-target="docs">Docs</button>
  </nav>

  <div slot="content" data-id="products" data-width="820" style="grid-template-columns:1fr 240px; width:820px;">
    <!-- Products panel content (your markup here) -->
  </div>
  <div slot="content" data-id="pricing" data-width="560" style="grid-template-columns:1fr 180px; width:560px;">
    <!-- Pricing panel content -->
  </div>
  <div slot="content" data-id="docs" data-width="400" style="width:400px;">
    <!-- Docs panel content -->
  </div>
</ui-nav-menu>
```

> The panel is centered under the active trigger and clamped to the host
> nav's edges (minus `gutter`). Content panels display as `grid` while
> active — declare their columns with `grid-template-columns`.

## Slots

| Slot        | Multiplicity | Description                                                                 |
| ----------- | ------------ | --------------------------------------------------------------------------- |
| `trigger`   | many         | A `<button>` per panel. Set `data-target` to match a content's `data-id`.   |
| `content`   | many         | One element per panel. Set `data-id` (matched by a trigger) and optionally `data-width` (px). |

> `data-target` on a trigger must match `data-id` on exactly one content panel.

## Properties

| Property     | Attribute    | Type     | Default | Description                                              |
| ------------ | ------------ | -------- | ------- | -------------------------------------------------------- |
| `gutter`     | `gutter`     | `number` | `16`    | Edge padding (px) kept between the panel and the viewport. |
| `closeDelay` | —            | `number` | `150`   | Hover-out delay (ms) before the panel closes.            |

## Trigger attributes

| Attribute       | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `data-target`   | The `data-id` of the content panel this trigger opens.                      |

## Content attributes

| Attribute    | Type                | Description                                                                 |
| ------------ | ------------------- | --------------------------------------------------------------------------- |
| `data-id`    | `string`            | Unique id matched by a trigger's `data-target`.                             |
| `data-width` | `number` (px)       | Panel width. Defaults to the content element's own width.                   |

## Animation notes

The transitions are intentionally faithful to the reference prototype:

- **Open/close** — the panel fades, lifts (`translateY(-6px) → 0`) and toggles
  visibility over 200ms (`ease`).
- **Re-center** — moving between triggers animates `left` (220ms `ease`) and
  resizes the viewport (`width`/`height`, 220ms `ease`) so the panel glides
  under the new trigger.
- **Directional content swap** — the outgoing panel slides out and the
  incoming one slides in along the axis of travel, each a 220ms
  `cubic-bezier(0.22, 1, 0.36, 1)` keyframe
  (`enterFromLeft`/`enterFromRight`/`exitToLeft`/`exitToRight`). The exiting
  panel is absolutely positioned during its exit so both panels briefly
  co-exist for the cross-fade.

## Credits

Animation logic ported from the Charged UI nav-menu HTML prototype.
