import { defineConfig } from 'vitepress';
import cssReloadPlugin from './plugins/lit-reload';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Charged UI',
  description: 'Accessible experience design for modern web applications.',
  srcDir: './src',
  outDir: './www',
  vite: {
    plugins: [cssReloadPlugin()]
  },
  themeConfig: {
    logo: { light: '/logo-black.svg', dark: '/logo-white.svg' },

    siteTitle: 'Charged',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        collapsed: true,
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Components',
        collapsed: false,
        items: [
          { text: 'Alert', link: '/components/alert/' },
          { text: 'Avatar', link: '/components/avatar/' },
          { text: 'Button', link: '/components/button/' },
          { text: 'Card', link: '/components/card/' },
          { text: 'Collapse', link: '/components/collapse/' },
          { text: 'Icon', link: '/components/icon/' },
          { text: 'Progress', link: '/components/progress/' },
          { text: 'Stat', link: '/components/stat/' },
          { text: 'Text', link: '/components/text/' }
        ]
      },
      {
        text: 'Backgrounds',
        collapsed: false,
        items: [{ text: 'Aurora', link: '/backgrounds/aurora' }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/charged-ui/components' }
    ]
  }
});
