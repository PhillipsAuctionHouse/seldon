import { create } from '@storybook/theming/create';
// @ts-ignore
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
  colorPrimary: '#4A90e2',
  // colorSecondary: '#ff0086',
  colorSecondary: '#000000',

  // UI
  // appBg: 'rgb(244 242 241 / 12%)',
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#585C6D',
  appBorderRadius: 4,

  // Text colors
  textColor: '#000000',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#000000', //'#9E9E9E',
  barSelectedColor: '#000000',
  // barSelectedColor: '#585C6D',
  barBg: '#f7f7f7',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#000000',
  inputTextColor: '#000000',
  inputBorderRadius: 0,
});
