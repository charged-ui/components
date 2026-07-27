# Card

A flexible container component with named slots for media, header, body, and footer content.

## Example

```html
<ui-card>
  <div slot="media">...</div>
  <div slot="header">Card Header</div>
  <div slot="body">Card body content.</div>
  <footer slot="footer">Card Footer</footer>
</ui-card>
```

## Slots

| Slot       | Description                         |
| ---------- | ----------------------------------- |
| `media`    | Image or media content at the top   |
| `header`   | Title or heading area               |
| `body`     | Main content area                   |
| `footer`   | Footer area, often for actions      |
