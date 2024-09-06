import classnames from 'classnames';
import { SpacingTokens } from '../../utils';

export const determineGridClassName = (baseClassName: string, columnGap: SpacingTokens, rowGap: SpacingTokens) => {
  return classnames(
    `${baseClassName} ${baseClassName}--column-gap-${columnGap}`,
    `${baseClassName}--row-gap-${rowGap}`,
  );
};
