import { useState } from 'react';
import Select from '../../components/Select/Select';
import Input from '../../components/Input/Input';
import { Icon, IconProps } from '../../components/Icon';
import * as iconComponents from '../../assets/formatted';
import { getScssColors } from '../../utils/scssUtils';

const formatColorName = (name: string): string =>
  name
    .replace('$', '')
    .replace(/-/g, ' ')
    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

export const IconGrid = (props: IconProps) => {
  const [color, setColor] = useState<string>('$primary-black');
  const [height, setHeight] = useState<number | string>(24);
  const [width, setWidth] = useState<number | string>(24);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleHeightChange = (newHeight: number | string) => {
    setHeight(newHeight);
  };

  const handleWidthChange = (newWidth: number | string) => {
    setWidth(newWidth);
  };

  return (
    <>
      <Input type="number" labelText="Height" value={height} onChange={(e) => handleHeightChange(e.target.value)} />
      <Input type="number" labelText="Width" value={width} onChange={(e) => handleWidthChange(e.target.value)} />
      <Select labelText="Color" onChange={(e) => handleColorChange(e.target.value)}>
        {getScssColors().map((color) => (
          <option key={color} value={color}>
            {formatColorName(color)}
          </option>
        ))}
      </Select>
      <div className="story-icon-flex-wrapper">
        {Object.keys(iconComponents).map((icon) => (
          <div className="icon-set" key={icon}>
            <div className="icon-wrapper">
              <Icon {...props} color={color} height={height} width={width} icon={icon as IconProps['icon']} />
            </div>
            <div className="icon-name">{icon}</div>
          </div>
        ))}
      </div>
    </>
  );
};
