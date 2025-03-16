# Icon

This page demonstrates some of the built-in markdown extensions provided by VitePress.

<script setup>
import './aurora';
</script>

## Example

<div class="p-8 bg-gradient-to-b from-indigo-50 to-transparent rounded-2xl flex flex-col justify-center">
 <aurora-background>
    <div class="relative flex flex-col gap-4 items-center justify-center px-4">
      <div class="text-3xl md:text-7xl font-bold dark:text-white text-center">
        Background lights are cool you know.
      </div>
      <div class="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        And this, is chemical burn.
      </div>
      <button class="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
        Debug now
      </button>
    </div>
  </aurora-background>
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
