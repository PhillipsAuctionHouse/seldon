import type { Meta } from '@storybook/react';

import Grid, { GridProps } from './Grid';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Layouts/Grid',
  component: Grid,

  argTypes: {
    element: { control: 'text' },
  },
} satisfies Meta<typeof Grid>;

export default meta;
interface MyFuncProps {
  children: React.ReactNode;
}
const MyFunc = ({ children, ...props }: MyFuncProps) => {
  return <span {...props}>{children}</span>;
};
export const Playground = ({ element, ...props }: GridProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const newelement = element !== '' && element !== undefined ? element : undefined;
  return (
    <>
      <div className="grid-example__layout doc-wrapper">
        <Grid {...props} element={newelement}>
          <h1>Example Layout using Grid</h1>
          <p>
            The grid component is just a simple utility that will ensure that its children are grid items that can be
            laid out along our defined layout grid. This component acts as the grid container and no styles have to be
            applied to get our defined grid and its variations at different breakpoints. The only styles needed are the
            ones to layout the children and their changes at our defined breakpoints. You can see an example of those
            styles below.
          </p>
          <header className="grid-example__header">
            <code></code>
          </header>
          <section className="grid-example__section">
            <code></code>
          </section>
          <aside className="grid-example__aside">
            <code></code>
          </aside>
          <footer className="grid-example__footer">
            <code></code>
          </footer>
        </Grid>
      </div>
    </>
  );
};

Playground.args = {
  className: 'grid-class',
  element: MyFunc,
};
