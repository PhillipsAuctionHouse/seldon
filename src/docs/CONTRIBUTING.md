# Contributing

## Prerequisites

Before contributing to `@phillips/seldon`, you should make sure you have
the following tools installed:

- [Node.js](https://nodejs.org/en/download/) - the required version is specified
  in the [`.nvmrc`](/.nvmrc)
  - If you're on macOS or using Windows Subsystem for Linux (WSL), we recommend using
    [`nvm`](https://github.com/nvm-sh/nvm) as your version manager for Node.
  - If using windows and not WSL you should use [nvm for windows](https://github.com/coreybutler/nvm-windows)
- Git
  - on Mac download either with xcode command line tools (`xcode-select --install`) or the [latest version](https://git-scm.com/download/mac) from the git site
  - on Windows download the git for windows [installer](https://gitforwindows.org/)
- NPM

You'll also need a code editor to make changes. There are many to choose from
but some popular options are [VSCode](https://code.visualstudio.com/),
[Atom](https://atom.io), and [Sublime](https://www.sublimetext.com/).

With that all in place, you're ready to start contributing!

## Build and start the development server

From the root directory of the project, run:

```sh
# To install the project's dependencies
npm install
```

To get your development server running and to start coding, run:

```sh
npm start
```

This will start a development server where you can see any changes you are
making to components in our react components Storybook.

Once it's done building, you can edit source code or create new components. The
system is set up to automatically bundle your changes/additions. Visit
http://localhost:6006 to see the changes happen on the fly.

## Dependencies

When adding new `dependencies` or `devDependencies` to the codebase, the
associated pull request should include justification for the package and the
alternatives considered.

## Submitting pull requests and commits

All new development work should take place in a feature branch off of `main`.

Commits must follow the
[conventional commit](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary)
format. You won't be able to create a commit unless you follow those rules. The
[recent commits in the repository](https://github.com/phillipsauctionhouse/seldon/commits/main)
show examples of the format and how it's generally used.

For more information on what type of change commit should be labeled a
`BREAKING CHANGE`, `feat`, or `fix`, please read
[the versioning documentation](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).

Commits are preferred but not required to contain a link to an issue. If you
choose to link commits to an issue, the 72 character limit can be avoided by
placing the link in the body of the commit. Example:

```sh
git commit -m "fix(table): columns need unique ids" -m "#123"
```

## Release process

We use `semantic-release` to publish new releases when a commit of type `feat` or `fix` is merged to the `main` branch. This is done automatically by this [GitHub Workflow](https://github.com/PhillipsAuctionHouse/seldon/blob/main/.github/workflows/publish.yml). The version number is determined by the commit messages.

## Styling new components

Components should have their own sass partial in which the corresponding styles
are contained. If a component does not have one, please add it. Each partial will need to be imported into the styles.scss file.

## Documenting new components

If you follow the convention seen in existing stories the documentation is auto generated. This documenation can be enhanced following these [guidelines](https://storybook.js.org/docs/react/writing-docs/mdx)

## Props

This is a typescript project so all props are defined using [interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html). Be sure to add comments as these become the documentation for the component in our storybook. Default props should be written as part of the prop destructing.

```js
export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: React.ReactElement | string;
  /**
   * Unique id for component
   */
  id?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */

const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  id,
  ...props
}: ButtonProps) => {
  // component code
};
```

## Exporting components

After adding a component make sure that the component is exported from the main `index.ts` file. This will allow the component to be imported from the main package. Please also export any Typescript types that should be available to consumers of the package.

```js
export { Button, type ButtonProps } from './components/Button/Button';
```

## Styling

We create css variables on the :root element. This allows for downstream usage within non-SASS applications. If you are adding a new component please make sure to add the css variables to the `:root` element in the `_vars.scss` file with media queries for the different breakpoints.

These css variables are then used in our `_vars.scss` to create SCSS variables.
We use scss variables within the components themselves as style property values.

## Testing

Unit test must be written for all JavaScript files. We utlize [`Vitest.js`](https://vitest.dev/) and the [`@testing-library`](https://testing-library.com/docs/react-testing-library/intro) packages to author test.

### Writing tests

The items below are high level points of guidance for writing tests:

- Use the `@testing-library` family of packages
- Prefer queries that reflect the experience of visual/mouse users as well as
  those that use assistive technology,
  [read more from the `@testing-library` docs](https://testing-library.com/docs/guide-which-query)
  - `getByRole`, `getByLabelText`, `getByPlaceholderText`, `getByText`,
    `getByDisplayValue`
- Write tests using queries directly from the `screen` object rather than
  destructuring them from `render` result,
  [read more from the `prefer-screen-queries` eslint rule](https://github.com/testing-library/eslint-plugin-testing-library/blob/master/docs/rules/prefer-screen-queries.md)
- For more information look at our [Testing-Best-Practices](./testing-best-practices.md) guide.

### Minimum code coverage

Code coverage thresholds are enforced in the repository. If you add code but do
not cover it with unit tests, the git push may fail because the coverage fell to
a level under the required code coverage thresholds. Please add unit tests to cover your new code before checking in. _Do not reduce
the code coverage threshold to get around this constraint._

To understand what lines of code are NOT covered by the current testcases, open
the coverage/index.html file in a browser and investigate.

## Testing changes in downstream consumers

Often times changes to the library are being made to add features to an application. To test these changes you can link the library to the consuming application. This is done by running the following commands to add the library to the global npm registry:

```sh
npm run build
npm link
```

Then you will point the application to the `seldon` published in the global npm registry not the one installed locally in `application/node_modules`. To link the application in to the global npm registry run the following command in the application directory:

```sh
npm link "@phillips/seldon"
```

Future rebuilds of the library will be reflected in the application without having to publish the library again to the npm registry. If you perform a full `npm install` or add a new library in the consuming application you will need to re-link the library.
