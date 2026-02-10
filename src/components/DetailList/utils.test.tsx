import { Detail } from '../../components/Detail';
import { getDetailKey } from './utils';

describe('getDetailKey', () => {
  const props = {
    label: 'Label',
    value: 'Value',
  };

  it('should return a key based on the label and value of the Detail component', () => {
    const child = <Detail {...props} />;
    expect(getDetailKey(child, 0)).toBe('detail-Label-Value');
  });

  it('should return a key based on the index if the child is not a valid element', () => {
    const child = 'Not a valid element';
    expect(getDetailKey(child, 0)).toBe('detail-0');
  });
  it('should return a key if passed directly', () => {
    const child = <Detail {...props} key="custom-key" />;
    expect(getDetailKey(child, 0)).toBe('custom-key');
  });
});
