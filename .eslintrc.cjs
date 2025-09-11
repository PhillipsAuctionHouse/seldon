module.exports = {
  ignorePatterns: ['.eslintrc.cjs', 'config/**'],
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
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [__dirname + '/tsconfig.json', __dirname + '/tsconfig.node.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', 'local-rules'],
  rules: {
    'react/prop-types': 'off', // we use TypeScript for type checking
    'react-refresh/only-export-components': 'warn',
    'react/boolean-prop-naming': ['warn', {}],
    'require-await': 'warn',
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
        fixStyle: 'inline-type-imports',
      },
    ],
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
    'no-template-curly-in-string': 'error',
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
