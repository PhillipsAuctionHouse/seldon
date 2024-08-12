# Easel Design System 🎨 by Phillips Auction House

![tests](https://github.com/phillipsauctionhouse/seldon/actions/workflows/test.yml/badge.svg)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Netlify Status](https://api.netlify.com/api/v1/badges/45a31dc9-7c19-482a-ae3d-be6bb2533cef/deploy-status)](https://app.netlify.com/sites/snazzy-liger-5606f7/deploys)

Seldon is the source for design guidelines, component documentation, and resources for building apps with the Phillips.com Design System.

We use Storybook to document the components. Our storybook is hosted in Netlify at [here](https://phillips-seldon.netlify.app/?path=/docs/welcome--overview).

## Installation

```
# With NPM
npm install @phillips/seldon

# With yarn
yarn add @phillips/seldon
```

### Styling

The project contains a `scss` folder. Here you will find the main export of our sass styles for our components. There's also a scss export that contains our mixins, tokens, and other utilities.

```scss
@use '@phillips/seldon/dist/scss/componentStyles'; // our component tyles
@use '@phillips/seldon/dist/scss/allPartials'; // our scss utilities
```

If you wish to only import specific component styles you can find them in their respective directories inside the `scss` folder.

```scss
@use '@phillips/seldon/dist/scss/components/Button/button';
```

### Components

Each component can be imported in your project by referencing the named exports from main index file.

```js
import { Button } from '@phillips/seldon';
```

### Contributing Guidelines

Before you start contributing to this project please check out our guidelines found [here](/src/docs/CONTRIBUTING.md)
