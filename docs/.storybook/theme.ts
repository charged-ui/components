import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  brandTitle: 'Charged UI',
  brandUrl: 'https://charged.dev/',
  brandImage:
    'https://raw.githubusercontent.com/charged-ui/components/5576cfd4e6ef3f90f98c1b07f4162032329c5f1e/docs/src/assets/wordmark.svg',
  brandTarget: '_self',

  //
  colorPrimary: '#3A10E5',
  colorSecondary: '#585C6D',

  // UI
  appBg: '#f9f9f9',
  appContentBg: '#eeeeee',
  appPreviewBg: '#ffffff',
  // appBorderColor: '#585C6D',
  appBorderRadius: 0,

  // Text colors
  textColor: '#10162F',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#10162F',
  inputTextColor: '#10162F',
  inputBorderRadius: 2
});
