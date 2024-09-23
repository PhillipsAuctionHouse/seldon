import { ComponentProps, forwardRef } from 'react';
import { getCommonProps } from '../../utils';
import classnames from 'classnames';
import React from 'react';

// You'll need to change the ComponentProps<"htmlelementname"> to match the top-level element of your component
export interface PageContentWrapperProps extends ComponentProps<'div'> {
  /**
   * Contents on a page that are flanked by a Page/Margin in figma
   */
  children: React.ReactNode;
}

/**
 * ## Overview
 *
 * This component wraps content on a page to maintain consistent page padding
 *
 * [Figma Link](Add Figma URL here)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-pagecontentwrapper--overview)
 */
const PageContentWrapper = forwardRef<HTMLDivElement, PageContentWrapperProps>(
  ({ children, className, ...props }, ref) => {
    const { className: baseClassName, ...commonProps } = getCommonProps(props, 'PageContentWrapper');

    return (
      <div {...commonProps} className={classnames(baseClassName, className)} {...props} ref={ref}>
        {children}
      </div>
    );
  },
);

PageContentWrapper.displayName = 'PageContentWrapper';

export default PageContentWrapper;
