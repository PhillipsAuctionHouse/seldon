import { render, screen } from '@testing-library/react';
import TabsContainer from './TabsContainer';
import TabsContent from './TabsContent';
import { Text } from '../Text';
import userEvent from '@testing-library/user-event';

describe('Tabs', () => {
  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Browse lots', value: 'browse' },
  ];

  it('renders tabs', () => {
    const { getAllByRole } = render(<TabsContainer tabs={tabs} />);
    const tabsList = getAllByRole('tablist');
    expect(tabsList.length).toBe(1);
  });
  test('renders the tabs and displays default content', () => {
    render(
      <TabsContainer tabs={tabs} defaultValue="overview">
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="browse">Browse lots content</TabsContent>
      </TabsContainer>,
    );
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Browse lots')).toBeInTheDocument();

    // Verify default tab content is visible
    expect(screen.getByText('Overview content')).toBeVisible();
  });
  test('renders ReactNode in tab', () => {
    const componentTabs = [
      {
        label: (
          <div style={{ display: 'flex' }}>Overview {<Text style={{ color: 'red', marginBottom: '0' }}>*</Text>}</div>
        ),
        value: 'overview',
      },
      {
        label: (
          <div style={{ display: 'flex' }}>Submit {<Text style={{ color: 'blue', marginBottom: '0' }}>+</Text>}</div>
        ),
        value: 'Browse',
      },
    ];
    render(
      <TabsContainer tabs={componentTabs}>
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="browse">Browse lots content</TabsContent>
      </TabsContainer>,
    );
    expect(screen.getByRole('tab', { name: /Overview/ })).toBeInTheDocument();
    expect(screen.getByText(/\*/)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Submit/ })).toBeInTheDocument();
    expect(screen.getByText(/\+/)).toBeInTheDocument();
  });
  test('displays correct content when a different tab is selected', async () => {
    render(
      <TabsContainer tabs={tabs} defaultValue="overview">
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="browse">Browse lots content</TabsContent>
      </TabsContainer>,
    );
    expect(screen.getByText('Overview content')).toBeVisible();

    await userEvent.click(screen.getByRole('tab', { name: /Browse/i }));

    expect(screen.getByText('Browse lots content')).toBeVisible();
  });
  test('calls onTabClick when a tab is clicked', async () => {
    const onTabClickMock = vitest.fn();

    render(
      <TabsContainer tabs={tabs} defaultValue="browse" onTabClick={onTabClickMock}>
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="browse">Browse lots content</TabsContent>
      </TabsContainer>,
    );

    await userEvent.click(screen.getByRole('tab', { name: /Overview/i }));
    expect(onTabClickMock).toBeCalledWith('overview'); // Validate that the clicked tab value is correct
  });
});
