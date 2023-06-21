// .storybook/YourTheme.js

import { create } from '@storybook/theming/create';
import Logo from './assets/LogoBlack.svg';

export default create({
  base: 'light',
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Easel by Phillips',
  brandUrl: 'https://phillips.com',
  brandImage: Logo,
  brandTarget: '_self',

  //
  colorPrimary: '#ff0000',
  colorSecondary: '#eeeeee',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#585C6D',
  appBorderRadius: 4,

  // Text colors
  textColor: '#000000',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#000000',
  inputTextColor: '#000000',
  inputBorderRadius: 0,
});