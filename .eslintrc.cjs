// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:local-rules/all',
  ],
  overrides: [
    {
      // Don't warn about deprecated text variants in stories and test files
      files: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.test.ts'],
      rules: {
        'local-rules/no-deprecated-text-variants': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', 'local-rules'],
  rules: {
    'local-rules/no-deprecated-text-variants': 'off',
    'react-refresh/only-export-components': 'warn',
    'react/boolean-prop-naming': ['warn', {}],
    'require-await': 'warn',
    '@typescript-eslint/no-floating-promises': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      { name: 'Link', linkAttribute: ['href'] }, // allows specifying multiple properties if necessary
    ],
  },
};
