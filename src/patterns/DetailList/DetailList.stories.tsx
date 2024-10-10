import { Meta } from '@storybook/react';
import { Detail } from '../../components/Detail';
import DetailList, { DetailListProps } from './DetailList';
import { DetailListAlignment } from './types';

interface WrapperProps {
  children: JSX.Element;
  title: string;
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Patterns/DetailList',
  component: DetailList,
} satisfies Meta<typeof DetailList>;

export default meta;

const Wrapper = ({ title, children }: WrapperProps) => (
  <div style={{ backgroundColor: '#ccc', width: '100%', padding: '24px' }}>
    <div style={{ backgroundColor: 'white', padding: '12px', width: '400px', margin: '0 auto' }}>
      <div
        style={{
          backgroundColor: '#ccc',
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '12px',
          padding: '4px',
          textDecoration: 'underline',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {title}
      </div>
      {children}
    </div>
  </div>
);

const StoryList = (props: Omit<DetailListProps, 'children'>) => (
  <DetailList {...props}>
    <Detail key="1" label="Artist" value="Andy Warhol" />
    <Detail key="2" label="Title" value="Marilyn Monroe" />
    <Detail key="3" label="Year" value="1967" />
    <Detail
      key="4"
      label="Really Long Label That should wrap"
      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    />
  </DetailList>
);

export const Playground = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
    <Wrapper title="With Separators (Justified)">
      <StoryList hasSeparators alignment={DetailListAlignment.justified} />
    </Wrapper>
    <Wrapper title="With Separators (Columns)">
      <StoryList hasSeparators alignment={DetailListAlignment.columns} />
    </Wrapper>
    <Wrapper title="Without Separators (Justified)">
      <StoryList hasSeparators={false} alignment={DetailListAlignment.justified} />
    </Wrapper>
    <Wrapper title="Without Separators (Columns)">
      <StoryList hasSeparators={false} alignment={DetailListAlignment.columns} />
    </Wrapper>
  </div>
);
