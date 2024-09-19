import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContentPeek from './ContentPeek';
import { runCommonTests } from '../../utils/testUtils';
import { px } from '../../utils';

describe('ContentPeek', () => {
  runCommonTests(ContentPeek, 'ContentPeek');

  // Mock scrollHeight property
  // https://github.com/testing-library/react-testing-library/issues/353#issuecomment-510046921
  const originalScrollHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight');

  const setTallScrollHeight = () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 1000 });
  };

  const setShortScrollHeight = () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 50 });
  };

  const resetScrollHeight = () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', originalScrollHeight || { value: 0 });
  };

  afterAll(() => {
    resetScrollHeight();
  });

  it('should render the component with default props (short content)', () => {
    setShortScrollHeight();
    render(<ContentPeek>Test content</ContentPeek>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render the component with default props (long content)', async () => {
    setTallScrollHeight();
    render(<ContentPeek maxHeight={50}>{'Test content'.repeat(100)}</ContentPeek>);
    expect(screen.getByText('Test content'.repeat(100))).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Read More')).toBeInTheDocument();
    });
  });

  it('should expand and collapse content on button click and toggle gradient visibility', async () => {
    setTallScrollHeight();
    const longContent = 'Lorem ipsum '.repeat(100);
    const { container } = render(<ContentPeek maxHeight={50}>{longContent}</ContentPeek>);
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    const overlayElement = container.querySelector(`.${px}-content-peek-overlay`);

    expect(button).toHaveTextContent('Read More');
    expect(overlayElement).toHaveClass(`${px}-content-peek-overlay--gradient`);
    expect(overlayElement).toBeVisible();

    await userEvent.click(button);
    await waitFor(() => {
      expect(button).toHaveTextContent('Read Less');
      expect(overlayElement).not.toHaveClass(`${px}-content-peek-overlay--gradient`);
    });

    await userEvent.click(button);
    await waitFor(() => {
      expect(button).toHaveTextContent('Read More');
      expect(overlayElement).toHaveClass(`${px}-content-peek-overlay--gradient`);
    });
  });
  it('should use custom read more and read less text', async () => {
    setTallScrollHeight();
    render(
      <ContentPeek contentExpandText="Show More" contentCollapseText="Show Less" maxHeight={50}>
        Test content.repeat(100)
      </ContentPeek>,
    );
    await waitFor(() => {
      expect(screen.getByText('Show More')).toBeInTheDocument();
    });
  });

  it('should not show read more button when content is shorter than maxHeight', async () => {
    setShortScrollHeight();
    render(<ContentPeek maxHeight={1000}>Short content</ContentPeek>);
    await waitFor(() => {
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  it('should apply correct classes based on expanded state', async () => {
    setTallScrollHeight();
    const { container } = render(<ContentPeek maxHeight={50}>{'Lorem ipsum '.repeat(100)}</ContentPeek>);

    const readMoreElement = container.firstChild as HTMLElement;
    expect(readMoreElement).toHaveClass(`${px}-content-peek`);

    const overlayElement = container.querySelector(`.${px}-content-peek-overlay`);
    expect(overlayElement).toHaveClass(`${px}-content-peek-overlay--gradient`);

    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(overlayElement).not.toHaveClass(`${px}-content-peek-overlay--gradient`);
    });
  });
});
