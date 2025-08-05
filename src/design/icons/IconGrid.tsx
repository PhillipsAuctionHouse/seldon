import { useState } from 'react';
import Select from '../../components/Select/Select';
import { Icon, IconProps } from '../../components/Icon';
import cn from 'classnames';

const designIcons = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'ChevronLeft',
  'ChevronRight',
  'ChevronUp',
  'ChevronDown',
  'ExternalLink',
  'Share',
  'Upload',
  'Download',
  'Refresh',
  'Add',
  'Subtract',
  'CloseX',
  'Success',
  'Home',
  'HomeActive',
  'Favorite',
  'FavoriteActive',
  'Account',
  'AccountActive',
  'Gavel',
  'GavelActive',
  'Sell',
  'SellActive',
  'Search',
  'Email',
  'Filters',
  'Grid',
  'List',
  'Icon',
  'Menu',
  'Edit',
  'Delete',
  'Calendar',
  'Bag',
  'Tooltip',
  'Error',
  'Lock',
  'ConditionReport',
  'View',
  'Hide',
  'Play',
  'Pause',
  'VolumeMaximum',
  'VolumeMid',
  'VolumeMinimum',
  'Mute',
  'Fullscreen',
  'FullscreenExit',
  'Instagram',
  'Facebook',
  'TwitterX',
  'LinkedIn',
  'Red',
  'WeChat',
  'AdminGavel',
  'AdminLiveOnline',
  'AdminPerson',
  'AdminTelephone',
  'AdminPlay',
  'AdminFullscreen',
  'AdminFullscreenExit',
] as const;
export const IconGrid = (props: IconProps) => {
  const [color, setColor] = useState<string>('$primary-black');
  const [size, setSize] = useState<string>('16px');
  const baseClassName = 'icon-grid-wrapper';
  const isDarkMode = color === '$white';
  const isSmallSize = size === '16px';

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);
  };
  return (
    <div>
      <h2 className="h2">Icons</h2>
      <div className={`${baseClassName}--controls`}>
        <Select id="size" labelText="Icon Size" onChange={(e) => handleSizeChange(e.target.value)}>
          <option key="16px" value="16px">
            16px
          </option>
          <option key="24px" value="24px">
            24px
          </option>
        </Select>
        <Select id="color" labelText="Icon Color" onChange={(e) => handleColorChange(e.target.value)}>
          <option key="$pure-black" value="$pure-black">
            Pure Black
          </option>
          <option key="$white" value="$white">
            White
          </option>
        </Select>
      </div>
      <div className={cn(baseClassName, { [`${baseClassName}--dark`]: isDarkMode })}>
        {designIcons.map((icon) => (
          <div className="icon-set" key={icon}>
            <div className="icon-wrapper">
              <Icon {...props} color={color} height={size} width={size} icon={icon as IconProps['icon']} />
            </div>
            <div
              className={cn('icon-name', {
                [`icon-name--dark`]: isDarkMode,
                [`icon-name--small`]: isSmallSize,
              })}
            >
              {icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
