import React from 'react';
import Color from 'color';
import classnames from 'classnames';

import { px } from '../../utils';

interface ColorCardProps {
  /**
   * Name of the color token without the $
   */
  label: string;
  /**
   * Hex value of the color token
   */
  hex: string;
  /**
   * Where is this token used?
   */
  usage?: string;
  /**
   * class to add to color card container
   */
  className: string;
}

/**
 * Primary UI component for user interaction
 */

const isColorLight = (color: string): boolean => {
  if (color.includes('gradient')) {
    const start = color.indexOf('#');
    const end = color.indexOf(',');
    return Color(color.substring(start, end)).isLight();
  }
  return Color(color).isLight();
};

const ColorCard = ({ label, hex, usage, className }: ColorCardProps) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const handleOnClick = function (str: string): void {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str).then(
        () => {
          setCopied(true);
        },
        () => {
          setCopied(false);
          console.log('The Clipboard API is not available.');
        },
      );
    }
  };
  const baseClass = `${px}-color-card`;
  return (
    <button
      type="button"
      className={`${className} ${baseClass}`}
      onClick={() => handleOnClick(`${label.replace(/\s+/g, '-').toLowerCase()}`)}
      style={{ ['--hex-value' as string]: hex }}
    >
      {copied ? (
        <span className={classnames(`${baseClass}__copied`, { [`${baseClass}__copied--light`]: isColorLight(hex) })}>
          Copied &apos;{`${label.replace(/\s+/g, '-').toLowerCase()}`}&apos;
        </span>
      ) : null}
      <span id={`token-${label}`} className={`${baseClass}__token`}>
        {label}
      </span>
      <span className={`${baseClass}__hex`}>{hex.replace(/linear-gradient/g, '')}</span>
      {usage ? (
        <span className={`${baseClass}__usage`}>
          <span>Usage:</span>
          {usage}
        </span>
      ) : null}
    </button>
  );
};

export default ColorCard;
