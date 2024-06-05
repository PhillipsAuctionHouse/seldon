import { px } from '../../utils';

export interface HeroBannerProps {
  /**
   * informational text above the header (e.g. region label or "buy now")
   */
  prehead?: string;
  /**
   * When is this sale taking place?
   */
  date?: string;
  /**
   * Main header text
   */
  headerText: string;
  /**
   * Sub-head text
   */
  subHeadText?: string;
  /**
   * Is there an association related to this sale?
   */
  association?: string;
  /**
   * What background image or color to use
   */
  background?: string;
  /**
   * Unique id for component testing
   */
  id?: string;
}

const baseClass = `${px}-hero-banner`;

/**
 * ## Overview
 *
 * Hero Banner UI component
 *
 * [Figma Link](https://www.figma.com/design/xMuOXOAKVt5HC7hgYjF3ot/Components-v2.0?node-id=6532-691&m=dev)
 *
 * [Storybook Link](https://phillips-seldon.netlify.app/?path=/docs/components-herobanner--overview)
 */

const HeroBanner = ({ prehead, date, headerText, subHeadText, association, background, id }: HeroBannerProps) => {
  return (
    <header
      data-testid={id ? `hero-banner-${id}` : `hero-banner`}
      id={id}
      className={baseClass}
      style={{ '--background': background } as React.CSSProperties}
    >
      <span className={`${baseClass}__content-wrapper`}>
        {prehead || date ? (
          <p className={`${baseClass}__pre-head`}>
            {prehead ? <span>{prehead}</span> : null}
            {date ? <span>{date}</span> : null}
          </p>
        ) : null}
        <h1 className={`${baseClass}__heading`}>
          {headerText}
          {subHeadText ? <span>{subHeadText}</span> : null}
        </h1>
        {association ? <p>{association}</p> : null}
      </span>
    </header>
  );
};

export default HeroBanner;
