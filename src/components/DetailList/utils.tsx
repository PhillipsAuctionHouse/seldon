import { isValidElement } from 'react';
import { DetailComponent, DetailProps } from '../../components/Detail';

export const getDetailKey = (child: DetailComponent, index: number) => {
  if (isValidElement(child)) {
    if (child.key) {
      return child.key;
    }
    const { label, value } = child.props as DetailProps;
    return `detail-${label}-${value}`;
  }
  return `detail-${index}`;
};
