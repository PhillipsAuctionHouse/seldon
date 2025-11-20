import stylelint from 'stylelint';

const ruleName = 'local-rules/no-deprecated-text-tokens';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (token) =>
    `Text token "${token}" is deprecated. Use new typography tokens: $displayMedium, $displaySmall, $headingLarge, $headingMedium, $headingSmall, $headingExtraSmall, $bodyLarge, $bodyMedium, $bodySmall, $labelLarge, $labelMedium, $labelSmall, $linkStylised, $linkLarge, $linkMedium, or $linkSmall instead.`,
});

const deprecatedTokens = [
  '$heading1',
  '$heading2',
  '$heading3',
  '$heading4',
  '$heading5',
  '$title1',
  '$title2',
  '$title3',
  '$title4',
  '$body1',
  '$body2',
  '$body3',
  '$string1',
  '$string2',
  '$string3',
  '$snwHeaderLink',
  '$snwFlyoutLink',
  '$snwHeadingHero1',
  '$snwHeadingHero2',
];

export default [
  stylelint.createPlugin(ruleName, (primaryOption) => {
    return (root, result) => {
      const validOptions = stylelint.utils.validateOptions(result, ruleName, {
        actual: primaryOption,
      });

      if (!validOptions) {
        return;
      }

      root.walkDecls((decl) => {
        const value = decl.value;

        // Check for deprecated tokens in the value
        deprecatedTokens.forEach((token) => {
          // Match the token as a standalone value or in function calls like hText($heading1)
          const regex = new RegExp(`\\${token}\\b`, 'g');
          if (regex.test(value)) {
            stylelint.utils.report({
              message: messages.rejected(token),
              node: decl,
              result,
              ruleName,
            });
          }
        });
      });

      // Also check @include statements for deprecated tokens
      root.walkAtRules('include', (atRule) => {
        const params = atRule.params;

        deprecatedTokens.forEach((token) => {
          const regex = new RegExp(`\\${token}\\b`, 'g');
          if (regex.test(params)) {
            stylelint.utils.report({
              message: messages.rejected(token),
              node: atRule,
              result,
              ruleName,
            });
          }
        });
      });
    };
  }),
];
