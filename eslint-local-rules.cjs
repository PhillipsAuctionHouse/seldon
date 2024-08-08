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
};
