# Card

This page demonstrates some of the built-in markdown extensions provided by VitePress.

<!-- This content will not appear in the rendered Markdown -->
<script setup>
import { ref } from 'vue'
import './card';

const count = ref(0)
</script>
<div class="p-8 bg-gradient-to-b from-indigo-50 to-transparent rounded-2xl">
  <ui-card>
    <p slot="one">Include me in slot "one".</p>
    <p slot="two">Include me in slot "two".</p>
  </ui-card>
</div>

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
