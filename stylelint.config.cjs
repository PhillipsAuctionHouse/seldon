module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  overrides: [
    {
      // don't worry about enforcing tokens on storybook styles
      files: ['src/story-styles.scss', 'src/pages/**/*.scss'],
      rules: {
        'declaration-property-value-allowed-list': null,
        'declaration-property-value-disallowed-list': null,
      },
    },
  ],
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

    // Enforce SCSS color tokens for color-related properties. Disallow raw color literals.
    // Allowed values:
    // - $token-name (e.g., $white-100)
    // - rgba($token-name, <alpha>) for transparency
    // - common keywords needed for composition: transparent | currentColor | inherit | initial | unset
    'declaration-property-value-allowed-list': {
      color: [
        /^\$[A-Za-z0-9_-]+$/,
        /^rgba\(\$[A-Za-z0-9_-]+\s*,\s*(0|0?\.\d+|1(?:\.0+)?)\)$/i,
        'transparent',
        'currentColor',
        'inherit',
        'initial',
        'unset',
      ],
      'background-color': [
        /^\$[A-Za-z0-9_-]+$/,
        /^rgba\(\$[A-Za-z0-9_-]+\s*,\s*(0|0?\.\d+|1(?:\.0+)?)\)$/i,
        'transparent',
        'currentColor',
        'inherit',
        'initial',
        'unset',
      ],
      'outline-color': [
        /^\$[A-Za-z0-9_-]+$/,
        /^rgba\(\$[A-Za-z0-9_-]+\s*,\s*(0|0?\.\d+|1(?:\.0+)?)\)$/i,
        'transparent',
        'currentColor',
        'inherit',
        'initial',
        'unset',
      ],
      fill: [
        /^\$[A-Za-z0-9_-]+$/,
        /^rgba\(\$[A-Za-z0-9_-]+\s*,\s*(0|0?\.\d+|1(?:\.0+)?)\)$/i,
        'transparent',
        'currentColor',
        'inherit',
        'initial',
        'unset',
      ],
      stroke: [
        /^\$[A-Za-z0-9_-]+$/,
        /^rgba\(\$[A-Za-z0-9_-]+\s*,\s*(0|0?\.\d+|1(?:\.0+)?)\)$/i,
        'transparent',
        'currentColor',
        'inherit',
        'initial',
        'unset',
      ],
      '/^border(-(?:(?:top|right|bottom|left))(?:-[a-z]+)?)?-color$/': [
        /^\$[A-Za-z0-9_-]+$/,
        /^rgba\(\$[A-Za-z0-9_-]+\s*,\s*(0|0?\.\d+|1(?:\.0+)?)\)$/i,
        'transparent',
        'currentColor',
        'inherit',
        'initial',
        'unset',
      ],
    },

    // Disallow raw color literals (hex, numeric rgb/hsl) in shorthands where colors can be embedded
    'declaration-property-value-disallowed-list': {
      '/^(background|border|border-(top|right|bottom|left)|outline|box-shadow)$/': [
        /^(?!.*linear-gradient\().*#[0-9a-fA-F]{3,8}\b/i,
        /^(?!.*linear-gradient\().*\brgb\(\s*\d/i,
        /^(?!.*linear-gradient\().*\brgba\(\s*\d/i,
        /^(?!.*linear-gradient\().*\bhsl\(\s*\d/i,
        /^(?!.*linear-gradient\().*\bhsla\(\s*\d/i,
      ],
    },
  },
};
