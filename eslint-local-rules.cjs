module.exports = {
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
