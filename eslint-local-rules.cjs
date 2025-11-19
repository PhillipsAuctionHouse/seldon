module.exports = {
  'no-deprecated-text-variants': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow using deprecated TextVariants. Use new typography tokens instead.',
        category: 'Best Practices',
        recommended: true,
      },
      messages: {
        deprecatedVariant:
          'TextVariants.{{variant}} is deprecated. Use new typography tokens: displayMedium, displaySmall, headingLarge, headingMedium, headingSmall, bodyLarge, bodyMedium, bodySmall, labelLarge, labelMedium, labelSmall, linkStylised, linkLarge, linkMedium, or linkSmall.',
      },
      schema: [],
    },
    create(context) {
      const deprecatedVariants = [
        'heading1',
        'heading2',
        'heading3',
        'heading4',
        'heading5',
        'title1',
        'title2',
        'title3',
        'title4',
        'body1',
        'body2',
        'body3',
        'string1',
        'string2',
        'snwHeaderLink',
        'snwFlyoutLink',
        'snwHeadingHero1',
        'snwHeadingHero2',
      ];

      return {
        MemberExpression(node) {
          // Check for TextVariants.<deprecated>
          if (
            node.object &&
            node.object.type === 'Identifier' &&
            node.object.name === 'TextVariants' &&
            node.property &&
            node.property.type === 'Identifier' &&
            deprecatedVariants.includes(node.property.name)
          ) {
            context.report({
              node,
              messageId: 'deprecatedVariant',
              data: {
                variant: node.property.name,
              },
            });
          }
        },
      };
    },
  },
  'no-deprecated-link-variants': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow using deprecated LinkVariants. Use new link variants instead.',
        category: 'Best Practices',
        recommended: true,
      },
      messages: {
        deprecatedVariant: 'LinkVariants.{{variant}} is deprecated. {{migration}}',
      },
      schema: [],
    },
    create(context) {
      const deprecatedVariants = {
        email: 'Use linkSmall, linkMedium, or linkLarge instead',
        snwHeaderLink: 'Use linkStylised instead',
        snwFlyoutLink: 'Use linkLarge instead',
        link: 'Use linkSmall instead',
      };

      return {
        MemberExpression(node) {
          // Check for LinkVariants.<deprecated>
          if (
            node.object &&
            node.object.type === 'Identifier' &&
            node.object.name === 'LinkVariants' &&
            node.property &&
            node.property.type === 'Identifier' &&
            deprecatedVariants[node.property.name]
          ) {
            context.report({
              node,
              messageId: 'deprecatedVariant',
              data: {
                variant: node.property.name,
                migration: deprecatedVariants[node.property.name],
              },
            });
          }
        },
      };
    },
  },
  'no-equals-word-string': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow passing code to a prop when a simple quoted string would work.',
        category: 'Possible Errors',
        recommended: false,
      },
      messages: {
        noEqualsWordString: 'Avoid using the pattern ={\'<simple string>\'}.  Instead use ="<simple string>".',
      },
      schema: [], // no options
    },
    create(context) {
      return {
        JSXAttribute(node) {
          const value = node.value;
          if (
            value &&
            value.type === 'JSXExpressionContainer' &&
            value.expression.type === 'Literal' &&
            typeof value.expression.value === 'string' &&
            /^[\s\S]*$/.test(value.expression.value)
          ) {
            context.report({
              node,
              messageId: 'noEqualsWordString',
            });
          }
        },
      };
    },
  },
  'no-faker-import': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow importing @faker-js/faker anywhere in the codebase.',
        category: 'Best Practices',
        recommended: false,
      },
      messages: {
        noFaker:
          'Importing @faker-js/faker is disallowed because it causes issues with our visual snapshot regression. Use utilities in src/utils/staticContent.ts instead.',
      },
      schema: [],
    },
    create(context) {
      return {
        ImportDeclaration(node) {
          if (node.source && node.source.value === '@faker-js/faker') {
            context.report({ node, messageId: 'noFaker' });
          }
        },
        CallExpression(node) {
          if (
            node.callee.type === 'Identifier' &&
            node.callee.name === 'require' &&
            node.arguments.length === 1 &&
            node.arguments[0].type === 'Literal' &&
            node.arguments[0].value === '@faker-js/faker'
          ) {
            context.report({ node, messageId: 'noFaker' });
          }
        },
      };
    },
  },
};
