# Ripple Background

An animated ripple effect typically used behind elements to emphasize them.

<script setup>
import './ripple';
</script>

## Example

<div class="bg-white border border-solid border-slate-200 rounded-xl flex justify-center relative overflow-hidden h-[500px] flex items-center justify-center">
    <p class="z-10 text-center text-5xl font-medium tracking-tighter">
      Ripple
    </p>
    <ui-bg-ripple></ui-bg-ripple>
</div>

## Code

```html
<div class="relative overflow-hidden h-[500px]">
  <p class="z-10 text-center text-5xl font-medium">Ripple</p>
  <ui-bg-ripple></ui-bg-ripple>
</div>
```

## Credits

https://magicui.design/docs/components/ripple
