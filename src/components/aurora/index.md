# Aurora Background

An aurora background effect with a radial gradient mask.

<script setup>
import './aurora';
import '../../components/text/text';
</script>

## Example

<div class="rounded-2xl flex flex-col justify-center relative overflow-hidden">
 <ui-bg-aurora show-radial-gradient>
    <div class="flex flex-col gap-4 px-8 py-24 text-center">
      <ui-text variant="heading-3">
        Aurora Background
      </ui-text>
      <ui-text variant="display-6">This is a beautiful aurora effect with a radial gradient mask.</ui-text>
    </div>
  </ui-bg-aurora>
</div>

## Code

```html
<ui-bg-aurora show-radial-gradient>
  <div class="flex flex-col gap-4 px-8 py-24 text-center">
    <ui-text variant="heading-3">Aurora Background</ui-text>
    <ui-text variant="display-6">
      This is a beautiful aurora effect with a radial gradient mask.
    </ui-text>
  </div>
</ui-bg-aurora>
```

## Credits

https://ui.aceternity.com/components/aurora-background
