module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'order/properties-alphabetical-order': true,
    // we're fine with _utils imports
    'scss/load-no-partial-leading-underscore': null,
    // Relax optionated naming conventions
    'scss/dollar-variable-pattern': null,
    'scss/at-mixin-pattern': null,
    'media-feature-range-notation': 'prefix',
    'color-function-notation': 'legacy',
    'declaration-property-value-disallowed-list': [
      {
        'font-weight': [/./],
      },
      {
        message:
          'Font-weight does not work with our variable fonts in Safari. Use "font-variation-settings: "wght" <weight>" instead.',
      },
    ],
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        /** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
        resolveNestedSelectors: true,
        /** Custom message */
        message: function expected(selectorValue) {
          return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
        },
      },
    ],
  },
};
