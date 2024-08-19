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
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },

    siteTitle: false,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Card', link: '/components/card/' },
          { text: 'Text', link: '/components/text/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/charged-ui/components' }
    ]
  }
});
