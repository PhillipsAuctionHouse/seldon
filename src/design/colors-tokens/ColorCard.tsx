
import React from 'react';
import { px } from '../../utils';

interface ColorCardProps {
  /**
   * Name of the color token without the $
   */
  label: string ;
  /**
   * Hex value of the color token
   */
  hex: string;
  /**
   * Where is this token used?
   */
  usage: string;
  /**
   * class to add to color card container
   */
  className: string;
}

/**
 * Primary UI component for user interaction
 */

const ColorCard = ({
  label,
  hex,
  usage,
  className
}: ColorCardProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleOnClick = function (str: string): void {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(str)
        .then(() => {
          setCopied(true);
        }, () => {
          setCopied(false);
          console.log('The Clipboard API is not available.');
        });
    }

  };
  const baseClass = `${px}-color-card`
  return (
    <button
      type="button"
      className={`${className} ${baseClass}`}
      onClick={() => handleOnClick(`$${label.replace(/\s+/g, '-').toLowerCase()}`)}
      style={{['--hex-value' as any]: hex}}
    >
      <span id={`token-${label}`} className={`${baseClass}__token`}>{label}</span>
      <span className={`${baseClass}__hex`}>{hex}</span>
      <span className={`${baseClass}__usage`}>
        <span>Usage:</span>
        {usage}
      </span>
    </button>
  );
};

export default ColorCard
