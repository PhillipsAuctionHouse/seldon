import classnames from 'classnames';
import { px } from '../../utils';
import Link, { LinkProps, LinkVariants } from '../Link/Link';

export interface LinkBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Props for the Link component */
  linkProps: Omit<LinkProps, 'variant'>;
  /** Renders description under link */
  description: React.ReactNode;
}

/**
 * ## Overview
 *
 * The LinkBlock component is used to render a link with a description underneath it. Usually this is used in a list of links.
 *
 * [Figma Link](https://www.figma.com/file/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?type=design&node-id=5709-8035&mode=design&t=CTNssP89Nrnt6Jkw-0)
 *
 */
const LinkBlock = ({ linkProps, description, className: classNameProp, id, ...props }: LinkBlockProps) => {
  const baseClassName = `${px}-link-block`;
  const className = classnames(baseClassName, classNameProp);
  const LinkComponent = linkProps?.component ?? Link;
  const dataTestId = id ? `link-block-${id}` : `link-block`;

  return (
    <div {...props} className={className} id={id} data-testid={dataTestId}>
      <LinkComponent {...linkProps} data-testid={`${dataTestId}-link`} variant={LinkVariants.list} />
      <p className={`${baseClassName}__description`}>{description}</p>
    </div>
  );
};

export default LinkBlock;
