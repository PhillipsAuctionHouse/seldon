import { render, screen } from '@testing-library/react';
import Input from '../Input/Input';
import ErrorBoundary, { ErrorBoundaryProps } from './ErrorBoundary';
import { useEffect } from 'react';
import { Mock } from 'vitest';

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

// not sure why yet, but I get runtime erros if I don't redefine in the beforeEach
let log = vi.spyOn(console, 'log').mockImplementation(() => void 0) as Mock;
let error = vi.spyOn(console, 'error').mockImplementation(() => void 0) as Mock;

beforeEach(() => {
  log = vi.spyOn(console, 'log').mockImplementation(() => void 0) as Mock;
  error = vi.spyOn(console, 'error').mockImplementation(() => void 0) as Mock;
  vi.spyOn(console, 'warn').mockImplementation(() => void 0);
});

describe('ErrorBoundary', () => {
  it('renders child if no error is thrown', () => {
    render(
      <ErrorBoundary logger={log}>
        <VolatileComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('test-id')).toBeInTheDocument();
  });

  it('calls logger with info.componentStack when error is caught', () => {
    const mockedLogger = vi.fn(() => void 0) as ErrorBoundaryProps['logger'] & Mock;
    const errorBoundaryInstance = new ErrorBoundary({ logger: mockedLogger, children: undefined });
    const error = new Error('Sudan Archives');
    const info = { componentStack: '🐘Sudan Archives stack trace' };
    errorBoundaryInstance.componentDidCatch(error, info);
    expect(mockedLogger).toHaveBeenCalledWith(error, '🐘Sudan Archives stack trace');
  });

  it.each([
    {
      name: 'default fallback',
      fallback: undefined,
      throwFn: () => {
        throw new Error("I've been thrown!");
      },
      fallbackText: 'Sorry... An error occurred and we are looking into it',
      logger: log,
    },
    {
      name: 'custom fallback',
      fallback: <p>Something is not right!</p>,
      throwFn: () => {
        // @ts-expect-error the unknown property is unknown and we support its journey
        log.unknownProperty();
      },
      fallbackText: 'Something is not right!',
      logger: error,
    },
  ])('renders $name when error is thrown', ({ fallback, throwFn, fallbackText, logger }) => {
    render(
      <ErrorBoundary logger={logger} fallback={fallback}>
        <VolatileComponent throwError={throwFn} />
      </ErrorBoundary>,
    );
    expect(screen.queryByTestId('test-id')).not.toBeInTheDocument();
    expect(screen.getByText(fallbackText)).toBeInTheDocument();
    expect(logger).toHaveBeenCalled();
  });

  it('calls provided logger with error details', () => {
    const mockedLogger = vi.fn(() => 'logger mock') as ErrorBoundaryProps['logger'] & Mock;
    render(
      <ErrorBoundary logger={mockedLogger} fallback={<p>Something is not right!</p>}>
        <VolatileComponent
          throwError={() => {
            throw new Error("I've been thrown!");
          }}
        />
      </ErrorBoundary>,
    );
    expect(mockedLogger).toHaveBeenCalled();
    expect(mockedLogger.mock?.calls?.[0]?.[0]?.message).toBe("I've been thrown!");
  });

  it('handles error thrown during render', () => {
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
});
