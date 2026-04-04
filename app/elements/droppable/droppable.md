# Droppable

A drop target that fires typed custom events when dragged elements enter, hover over, or are dropped into it. Pair with `<ui-draggable>`.

## Example

```html
<ui-droppable>
  <p>Drop files here</p>
</ui-droppable>
```

## Properties

| Property          | Type       | Default | Description                                       |
| ----------------- | ---------- | ------- | ------------------------------------------------- |
| `drag-over`       | `boolean`  | `false` | Reflects `true` while a dragged item is over it   |
| `accepted-types`  | `string[]` | `[]`    | MIME/transfer types to accept (empty = all)       |

## Events

| Event               | Detail                               | Description                        |
| ------------------- | ------------------------------------ | ---------------------------------- |
| `dropzone-drop`     | `{ event, data, files, types }`      | Fired on drop                      |
| `dropzone-dragenter`| `{ event, types }`                   | Fired when drag enters             |
| `dropzone-dragleave`| `{ event }`                          | Fired when drag leaves             |
| `dropzone-dragover` | `{ event, types }`                   | Fired continuously while hovering  |

## Example with events

```js
const zone = document.querySelector('ui-droppable');

zone.addEventListener('dropzone-drop', (e) => {
  console.log('files:', e.detail.files);
  console.log('data:', e.detail.data);
});

zone.addEventListener('dropzone-dragenter', () => {
  zone.style.background = '#f0fdf4';
});
```
