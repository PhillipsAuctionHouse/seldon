# Easel Design System 🎨 by Phillips Auction House

[![Netlify Status](https://api.netlify.com/api/v1/badges/45a31dc9-7c19-482a-ae3d-be6bb2533cef/deploy-status)](https://app.netlify.com/sites/snazzy-liger-5606f7/deploys)

Seldon is the source for design guidelines, component documentation, and resources for building apps with the Phillips.com Design System.

## Installation

```
# With NPM
npm install @phillips/seldon

# With yarn
yarn add @phillips/seldon
```

## What's included

### Styling

The project contains a `scss` folder. Here you will find the main export of our sass styles. This will include all the styles bundled with this package, including resets and typography styles.

```scss
@use '@phillips/seldon/dist/scss/styles';
```

If you wish to only import specific component styles you can find them in their respective directories inside the `scss` folder.

```scss
@use '@phillips/seldon/dist/scss/components/Button/button';
```

### Components

Each component can be imported in your project by referencing the component name inside the `components` directory.

```js
import Button from '@phillips/seldon/dist/components/Button/Button';
```

You can also use named exports for multiple component imports from main index file.

```js
import { Button } from '@phillips/seldon';
```
