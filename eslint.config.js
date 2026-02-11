import js from '@eslint/js';
import { createRequire } from 'node:module';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';
import globals from 'globals';

const require = createRequire(import.meta.url);
const localRules = require('./eslint-local-rules.cjs');

const localRulesPlugin = {
  rules: localRules,
};

export default tseslint.config(
  {
    ignores: [
      'vitest.config.ts',
      'dist',
      'node_modules',
      'storybook-static',
      'vite.config.ts',
      '.template',
      '.storybook',
      'coverage',
      'eslint-local-rules.cjs',
      'eslint.config.js',
      'stylelint-local-rules.mjs',
      'stylelint.config.cjs',
      'svgr.config.cjs',
      'chromatic.config.cjs',
      'commitlint.config.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      storybook,
      'local-rules': localRulesPlugin,
    },
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      linkComponents: [{ name: 'Link', linkAttribute: ['href'] }],
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'local-rules/no-deprecated-text-variants': 'error',
      'local-rules/no-deprecated-link-variants': 'error',
      'local-rules/no-equals-word-string': 'warn',
      'local-rules/no-faker-import': 'error',
      'react-refresh/only-export-components': 'off',
      'react/boolean-prop-naming': [
        'warn',
        {
          rule: '^(is|has|should)[A-Z]([A-Za-z0-9]?)+',
          message: 'Boolean props should be named with is/has/should prefix',
          validateNested: true,
        },
      ],
      'require-await': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
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
  },
  storybook.configs['flat/recommended'],
  {
    files: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.test.ts'],
    rules: {
      'local-rules/no-deprecated-text-variants': 'off',
    },
  },
);
