import { runCommonTests } from '../../utils/testUtils';
import { render } from '@testing-library/react';
import { DetailList } from '.';
import { Detail } from '../../components/Detail';
import { DetailListAlignment } from './types';

describe('DetailList', () => {
  runCommonTests(DetailList, 'DetailList');

  it('should wrap Detail components', () => {
    const { getAllByTestId } = render(
      <DetailList alignment={DetailListAlignment.columns} hasSeparators={false}>
        <Detail label="Artist" value="Andy Warhol" key="1" />
        <Detail label="Title" value="Marilyn Monroe" key="2" />
        <Detail label="Year" value="1967" key="3" />
      </DetailList>,
    );

    expect(getAllByTestId('detail').length).toBe(3);
  });
});
