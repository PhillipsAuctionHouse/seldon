import { render, screen, fireEvent } from '@testing-library/react';
import TabsComponent from './Tabs';

describe('Tabs', () => {
  const tabs = [
    { label: 'Overview', value: 'overview', content: <div>Overview Content</div> },
    { label: 'Browse Lots', value: 'browse', content: <div>Browse Content</div> },
  ];

  it('renders tabs', () => {
    const { getAllByRole } = render(<TabsComponent tabs={tabs} />);
    const tabsList = getAllByRole('tablist');
    expect(tabsList.length).toBe(1);
  });
  test('renders tabs and displays default content', () => {
    render(<TabsComponent tabs={tabs} />);

    // Check if the tabs are rendered
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Browse Lots')).toBeInTheDocument();

    // // Check that the content of the default active tab is visible
    expect(screen.getByText('Overview Content')).toBeVisible();
  });
  it('switches tabs on click', () => {
    const { getAllByRole } = render(<TabsComponent tabs={tabs} />);
    const tabsTrigger = getAllByRole('tab')[0];
    fireEvent.click(tabsTrigger);
    const tabsContent = getAllByRole('tabpanel')[0];
    expect(tabsContent.textContent).toBe('Overview Content');
  });
});
