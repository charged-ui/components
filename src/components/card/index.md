# Card

This page demonstrates some of the built-in markdown extensions provided by VitePress.

<script setup>
import './card';
import '../icon/icon';
</script>

## Example

<div class="p-12 bg-preview rounded-xl flex justify-center">
  <ui-card class="w-80">
    <div class="h-[210px] bg-slate-200 flex justify-center items-center" slot="media">
      <ui-icon name="photo" class="w-12 h-12 text-slate-500" />
    </div>
    <div class="text-lg font-bold pt-8 px-8" slot="header">Card Header</div>
    <div slot="body" class="pb-8 px-8">Card Body</div>
    <footer slot="footer" class="border-t border-neutral-200 px-8 py-4">
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
