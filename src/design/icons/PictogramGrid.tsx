import { useState } from 'react';
import Select from '../../components/Select/Select';
import { Pictogram, PictogramProps } from '../../components/Pictogram';
import cn from 'classnames';

const pictograms = [
  'Form',
  'Photos',
  'Submit',
  'Live',
  'MobilePhone',
  'Verification',
  'Sign',
  'Phone',
  'Timer',
  'Chat',
  'Search',
  'Shipping',
  'Notification',
  'CreditCard',
] as const;
export const PictogramGrid = (props: PictogramProps) => {
  const [color, setColor] = useState<string>('$primary-black');
  const [size, setSize] = useState<string>('64px');

  const baseClassName = 'picto-grid-wrapper';
  const isDarkMode = color === '$white';

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);
  };

  return (
    <div>
      <h2 className="h2">Pictograms</h2>
      <div className={`${baseClassName}--controls`}>
        <Select id="size" labelText="Icon Size" value={size} onChange={(e) => handleSizeChange(e.target.value)}>
          <option key="32px" value="32px">
            32px
          </option>
          <option key="64px" value="64px">
            64px
          </option>
        </Select>
        <Select id="color" labelText="Pictogram Color" onChange={(e) => handleColorChange(e.target.value)}>
          <option key="$pure-black" value="$pure-black">
            Pure Black
          </option>
          <option key="$white" value="$white">
            White
          </option>
        </Select>
      </div>
      <div className={cn(baseClassName, { [`${baseClassName}--dark`]: isDarkMode })}>
        {pictograms.map((picto) => (
          <div className="picto-set" key={picto}>
            <div className="picto-wrapper">
              <Pictogram {...props} color={color} size={size} pictogram={picto as PictogramProps['pictogram']} />
            </div>
            <div
              className={cn('picto-name', {
                [`picto-name--dark`]: isDarkMode,
              })}
            >
              {picto}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
