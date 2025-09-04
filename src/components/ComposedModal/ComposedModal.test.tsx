import { render, screen } from '@testing-library/react';
import { forwardRef } from 'react';
import Button from '../../components/Button/Button';
import { ButtonVariants } from '../../components/Button/types';
import { px } from '../../utils';
import { runCommonTests } from '../../utils/testUtils';
import ComposedModal, { ComposedModalProps } from './ComposedModal';

describe('ComposedModal', () => {
  const onCloseMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });
  const ComponentWithRef = forwardRef<HTMLDivElement, ComposedModalProps>((props, ref) => (
    <ComposedModal {...props} isOpen ref={ref} />
  ));
  ComponentWithRef.displayName = 'ComponentWithRef';
  runCommonTests(ComponentWithRef, 'Modal');

  it('renders the modal title when isOpen is true', () => {
    render(
      <ComposedModal isOpen onClose={onCloseMock} title="Test Modal">
        <div>Modal Content</div>
      </ComposedModal>,
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders the modal children when isOpen is true', () => {
    render(
      <ComposedModal isOpen onClose={onCloseMock} title="Test Modal">
        <div>Modal Children Content</div>
      </ComposedModal>,
    );

    expect(screen.getByText('Modal Children Content')).toBeInTheDocument();
  });

  it('renders the scrollable body with max height', () => {
    render(
      <ComposedModal isOpen onClose={onCloseMock} title="Test Modal" maxHeightValue="100px">
        <div>{'Lorem ipsum '.repeat(150)}</div>
      </ComposedModal>,
    );

    const body = document.querySelector(`.${px}-composed-modal__body`);
    expect(body).toHaveClass(`${px}-composed-modal__body`);
    expect(body?.getAttribute('style') ?? '').toContain('--max-modal-body-height');
  });

  it('renders the modal buttons and disclaimers', () => {
    render(
      <ComposedModal
        isOpen
        onClose={onCloseMock}
        title="Test Modal"
        secondaryButton={
          <Button
            className={`${px}-sale-card__cta_button`}
            onClick={() => console.log('Primary button clicked')}
            variant={ButtonVariants.primary}
            style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
          >
            Browse
          </Button>
        }
        primaryButton={
          <Button
            className={`${px}-sale-card__cta_button`}
            onClick={() => console.log('Secondary button clicked')}
            variant={ButtonVariants.secondary}
            style={{ padding: '16px 48px', width: '100%', whiteSpace: 'nowrap' }}
          >
            Register to bid
          </Button>
        }
        footerContent="Optional Disclaimer text"
      >
        <div>Modal Content</div>
      </ComposedModal>,
    );

    expect(screen.queryByText('Browse')).toBeInTheDocument();
    expect(screen.queryByText('Register to Bid')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Optional Disclaimer text')).toBeInTheDocument();
  });
});
