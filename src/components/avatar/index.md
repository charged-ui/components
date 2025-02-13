# Alert

The <code>&lt;ui-alert&gt;</code> component provides contextual feedback messages, keeping users informed of important and sometimes time-sensitive changes.

<script setup>
import './avatar';
import '../icon/icon';
</script>

## Examples

<div class="p-12 bg-preview flex flex-col gap-4 justify-center rounded-xl">
  <ui-alert variant="success">
    <ui-icon slot="icon" name="check-circle" />
    <div slot="heading">Success</div>
    <div slot="message">Operation completed successfully.</div>
  </ui-alert>
  <ui-alert variant="error">
    <ui-icon slot="icon" name="exclamation-circle" />
    <div slot="heading">Error</div>
    <div slot="message">Something went wrong.</div>
  </ui-alert>
  <ui-alert variant="warning">
    <ui-icon slot="icon" name="exclamation-triangle" />
    <div slot="heading">Warning</div>
    <div slot="message">Please be cautious.</div>
  </ui-alert>
  <ui-alert variant="info">
    <ui-icon slot="icon" name="information-circle" />
    <div slot="heading">Status</div>
    <div slot="message">Here is some important information.</div>
  </ui-alert>
</div>

## Code

```html
<ui-alert variant="success">
  <ui-icon slot="icon" name="check-circle" />
  <div slot="heading">Success</div>
  <div slot="message">Operation completed successfully.</div>
</ui-alert>
<ui-alert variant="error">
  <ui-icon slot="icon" name="exclamation-circle" />
  <div slot="heading">Error</div>
  <div slot="message">Something went wrong.</div>
</ui-alert>
<ui-alert variant="warning">
  <ui-icon slot="icon" name="exclamation-triangle" />
  <div slot="heading">Warning</div>
  <div slot="message">Please be cautious.</div>
</ui-alert>
<ui-alert variant="info">
  <ui-icon slot="icon" name="information-circle" />
  <div slot="heading">Status</div>
  <div slot="message">Here is some important information.</div>
</ui-alert>
```
