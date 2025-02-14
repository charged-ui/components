# Stat

The <code>&lt;ui-stat&gt;</code> component provides contextual feedback messages, keeping users informed of important and sometimes time-sensitive changes.

<script setup>
import './stat';
import '../icon/icon';
import '../text/text';
</script>

## Examples

<div class="p-12 bg-preview flex flex-col gap-4 justify-center rounded-xl">
  <ui-stat variant="display-2" start="10" end="500" />
</div>

## Code

```html
<ui-stat variant="heading-2">
  <ui-text variant="display-2" slot="prefix">$</ui-text>
</ui-stat>
```
