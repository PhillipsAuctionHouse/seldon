import { DetailsContainer } from './';
import { runCommonTests } from '../../utils/testUtils';
import { render } from '@testing-library/react';
import { Detail } from '../../components/Detail';

describe('DetailsContainer', () => {
  runCommonTests(DetailsContainer, 'DetailsContainer');

  it('should wrap Detail components', () => {
    const { getAllByTestId } = render(
      <DetailsContainer alignment="columns" hasSeparators={false}>
        <Detail label="Artist" value="Andy Warhol" />
        <Detail label="Title" value="Marilyn Monroe" />
        <Detail label="Year" value="1967" />
      </DetailsContainer>,
    );

    expect(getAllByTestId('detail').length).toBe(3);
  });
});
