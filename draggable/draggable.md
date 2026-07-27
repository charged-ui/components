# Draggable

Wraps any content to make it draggable via the HTML Drag and Drop API. Pair with `<ui-droppable>` to build drag-and-drop interfaces.

## Example

```html
<ui-draggable>Drag me</ui-draggable>
```

## Properties

| Property | Type     | Default      | Description              |
| -------- | -------- | ------------ | ------------------------ |
| `name`   | `string` | `'Somebody'` | Identifier for the item  |

## Events

The component uses native drag events. Listen via standard DOM event listeners:

```js
const el = document.querySelector('ui-draggable');
el.addEventListener('dragstart', (e) => console.log('started', e));
el.addEventListener('dragend', (e) => console.log('ended', e));
```

## CSS

`ui-draggable` gets `cursor: move`, padding, and a dashed border by default via `draggable.css`.
