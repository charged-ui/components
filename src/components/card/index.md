# Card

This page demonstrates some of the built-in markdown extensions provided by VitePress.

<script setup>
import './card';
</script>

## Example

<div class="p-8 bg-gradient-to-b from-indigo-50 to-transparent rounded-2xl flex justify-center">
  <ui-card class="w-80">
    <img src="http://via.placeholder.com/600x400" slot="media" />
    <div class="text-lg font-bold" slot="header">Card Header</div>
    <div slot="body">Card Body</div>
    <footer slot="footer" class="border-t border-gray-200 px-8 py-4">
      Card Footer
    </footer>
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
