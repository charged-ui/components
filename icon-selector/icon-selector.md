# Icon Selector

A searchable icon picker component backed by the full Heroicons library (1,288 icons across 16px, 20px, and 24px sizes in outline and solid styles).

## Example

```html
<ui-icon-selector size="24" variant="outline"></ui-icon-selector>
```

Listen for the `icon-selected` custom event to get the chosen icon:

```js
document.querySelector('ui-icon-selector').addEventListener('icon-selected', (e) => {
  console.log(e.detail); // { name, size, variant }
});
```

## Properties

| Property        | Type     | Default     | Description                        |
| --------------- | -------- | ----------- | ---------------------------------- |
| `size`          | `number` | `24`        | Icon size: `16`, `20`, or `24`     |
| `variant`       | `string` | `'outline'` | `'outline'` or `'solid'`           |
| `selected-icon` | `string` | `''`        | Name of the currently selected icon |

## Events

| Event           | Detail                          | Description                      |
| --------------- | ------------------------------- | -------------------------------- |
| `icon-selected` | `{ name, size, variant }`       | Fired when an icon is clicked    |
