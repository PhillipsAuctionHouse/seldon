import classnames from 'classnames';

import { px } from '../../utils';

interface HeroBannerProps {
  /**
   * Where
   */
  region?: string ;
  /**
   * When is this sale taking place?
   */
  date?: string;
  /**
   * Main header text
   */
  headerText?: string;
  /**
   * Sub-head text
   */
  subHeadText?: string;
  /**
  * Is there an association related to this sale?
  */
  association?: string;
  /**
  * What background color to use
  */
  backgroundColor?: string;
  /**
  * What background image to use
  */
  backgroundImage?: string;
  /**
  * Unique id for component
  */
  id?: string ; 
}

/**
 * Hero Banner UI component
 */

const HeroBanner = ({
  region,
  date,
  headerText,
  subHeadText,
  association,
  backgroundColor,
  backgroundImage,
  id
}: HeroBannerProps) => {
  return (
    <div
      data-testid={id ? `hero-banner__${id}` : `heroBanner`}
      className={classnames(`${px}-hero-banner`)}
      style={{ backgroundColor, backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${backgroundImage})` }}
    >
      <div className={classnames(`${px}-hero-banner__text-overlay`)}>
        {(region || date) && 
        <div className={classnames(`${px}-hero-banner__text-overlay__pre-head`)}>
          {region && <div className={classnames(`${px}-hero-banner__text-overlay__pre-head__region`)}>{region}</div>}
          {date && <div className={classnames(`${px}-hero-banner__text-overlay__pre-head__date`)}>{date}</div>}
        </div>}
        {headerText && 
        <div className={classnames(`${px}-hero-banner__text-overlay__heading`)}>
          <div className={classnames(`${px}-hero-banner__text-overlay__heading__header`)}>
            <h1>{headerText}</h1>
          </div>
          {subHeadText && 
          <div className={classnames(`${px}-hero-banner__text-overlay__heading__sub-head`)}>
            <h2>{subHeadText}</h2>
          </div>}
        </div>}
        {association && 
        <div className={classnames(`${px}-hero-banner__text-overlay__association`)}>
          <p>{association}</p>
        </div>}
      </div>
    </div>
  );
};

export default HeroBanner
