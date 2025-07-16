# Meteors Background

A meteor shower background effect.

<script setup>
import './meteors';
</script>

## Example

<div class="relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-200">
  <ui-bg-meteors number="20"></ui-bg-meteors>
  <span class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent">
    Meteors
  </span>
</div>

## Code

```html
<div class="relative overflow-hidden h-[500px]">
  <ui-bg-meteors number="20"></ui-bg-meteors>
</div>
```

## Credits

https://magicui.design/docs/components/ripple
