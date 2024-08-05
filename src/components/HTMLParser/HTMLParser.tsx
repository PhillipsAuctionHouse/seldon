import classnames from 'classnames';
import DOMPurify from 'dompurify';
import parse, { HTMLReactParserOptions } from 'html-react-parser';

import { getCommonProps } from '../../utils';
import { options } from './utils';

export interface HTMLParserProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Rich Text content to be displayed
   */
  html: string;
  /**
   * Optional flag to only sanitize the content and bypass the transforms to our components
   */
  isOnlySanitize?: boolean;
  /**
   * Optional class name to add to the component
   */
  className?: string;
}

/**
 * ## Overview
 *
 * A component for taking in rich text content from CMS and safely rendering the content in a consistent manner.
 *
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-button--overview)
 */

const HTMLParser = ({ className, html, isOnlySanitize = false, ...props }: HTMLParserProps) => {
  const { className: baseClassName, ...commonProps } = getCommonProps(props, 'HTMLParser');
  const cleanHtml = DOMPurify.sanitize(html);
  const cleanReact = parse(cleanHtml, options as HTMLReactParserOptions);
  return (
    <>
      {typeof html === 'string' ? (
        isOnlySanitize ? (
          <div
            {...commonProps}
            className={classnames(`${baseClassName}`, className)}
            {...props}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        ) : (
          <div {...commonProps} className={classnames(`${baseClassName}`, className)} {...props}>
            {cleanReact}
          </div>
        )
      ) : null}
    </>
  );
};

export default HTMLParser;
