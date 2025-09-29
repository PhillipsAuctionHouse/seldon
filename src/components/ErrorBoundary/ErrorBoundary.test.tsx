import { render, screen } from '@testing-library/react';
import Input from '../Input/Input';
import ErrorBoundary, { ErrorBoundaryProps } from './ErrorBoundary';
import { useEffect } from 'react';
import { Mock } from 'vitest';

// 🎺TODO figure out how to shush these expected errors
interface WrappedProps {
  throwError?: () => void;
}

const VolatileComponent = ({ throwError }: WrappedProps) => {
  const reqProps = { labelText: 'My Test Label', id: 'test-id' };
  useEffect(() => {
    if (throwError) throwError();
  }, [throwError]);
  return <Input {...reqProps} />;
};

const log = vi.spyOn(console, 'log').mockImplementation(() => void 0) as Mock;
const error = vi.spyOn(console, 'error').mockImplementation(() => void 0) as Mock;

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => void 0);
  vi.spyOn(console, 'log').mockImplementation(() => void 0);
  vi.spyOn(console, 'warn').mockImplementation(() => void 0);
});

describe('An ErrorBoundary', () => {
  it('uses default logger if none provided (error thrown during render)', () => {
    // Component that throws during render
    const RenderError = () => {
      throw new Error('Default logger test');
    };
    render(
      <ErrorBoundary logger={log}>
        <RenderError />
      </ErrorBoundary>,
    );
    expect(log).toHaveBeenCalledWith(expect.objectContaining({ message: 'Default logger test' }), expect.anything());
  });

  it('will render its child component if no error is thrown', () => {
    render(
      <ErrorBoundary logger={log}>
        <VolatileComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('test-id')).toBeInTheDocument();
  });

  it('will render a default fallback component if an error is thrown', () => {
    render(
      <ErrorBoundary logger={log}>
        <VolatileComponent
          throwError={() => {
            throw new Error("I've been thrown!");
          }}
        />
      </ErrorBoundary>,
    );
    expect(screen.queryByTestId('test-id')).not.toBeInTheDocument();
    expect(screen.getByText('Sorry... An error occurred and we are looking into it')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });

  it('will render a provided fallback component if an error is thrown', () => {
    render(
      <ErrorBoundary logger={error} fallback={<p>Something is not right!</p>}>
        <VolatileComponent
          throwError={() => {
            // @ts-expect-error the bad property access it a good bad property access
            log.unknownProperty();
          }}
        />
      </ErrorBoundary>,
    );
    expect(screen.queryByTestId('test-id')).not.toBeInTheDocument();
    expect(screen.getByText('Something is not right!')).toBeInTheDocument();
    expect(error).toHaveBeenCalled();
  });

  it('will call the logger method that is passed in with the error details', () => {
    const mockedLogger = vi.fn().mockImplementation(() => {
      return 'logger mock';
    });
    render(
      <ErrorBoundary
        logger={mockedLogger as unknown as ErrorBoundaryProps['logger']}
        fallback={<p>Something is not right!</p>}
      >
        <VolatileComponent
          throwError={() => {
            throw new Error("I've been thrown!");
          }}
        />
      </ErrorBoundary>,
    );
    expect(mockedLogger).toHaveBeenCalled();
    expect(mockedLogger.mock.calls[0][0].message).toBe("I've been thrown!");
  });
});
