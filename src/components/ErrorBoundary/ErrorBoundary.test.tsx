import { render, screen } from '@testing-library/react';
import * as React from 'react';

import Input from '../Input/Input';
import ErrorBoundary, { ErrorBoundaryProps } from './ErrorBoundary';
interface WrappedProps {
  throwError?: () => void;
}
const VolatileComponent = ({ throwError }: WrappedProps) => {
  const reqProps = { labelText: 'My Test Label', id: 'test-id' };
  React.useEffect(() => {
    if (throwError) {
      throwError();
    }
  }, [throwError]);
  return <Input {...reqProps} defaultValue={['2023-06-01T08:30', '2023-06-05T08:30']} />;
};

describe('An ErrorBoundary', () => {
  it('will render its child component if no error is thrown', () => {
    render(
      <ErrorBoundary>
        <VolatileComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('test-id')).toBeInTheDocument();
  });

  it('will render a default fallback component if an error is thrown', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {
      return;
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => {
      return;
    });
    render(
      <ErrorBoundary logger={log as unknown as ErrorBoundaryProps['logger']}>
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
    error.mockRestore();
    log.mockRestore();
  });

  it('will render a provided fallback component if an error is thrown', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {
      return;
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => {
      return;
    });
    render(
      <ErrorBoundary logger={log as unknown as ErrorBoundaryProps['logger']} fallback={<p>Something is not right!</p>}>
        <VolatileComponent
          throwError={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore-start
            log.unknownProperty();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore-end
          }}
        />
      </ErrorBoundary>,
    );
    expect(screen.queryByTestId('test-id')).not.toBeInTheDocument();
    expect(screen.getByText('Something is not right!')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
    error.mockRestore();
    log.mockRestore();
  });

  it('will call the logger method that is passed in with the error details', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {
      return;
    });
    const log = vi.spyOn(console, 'log').mockImplementation(() => {
      return 'logger mock';
    });
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
    error.mockRestore();
    log.mockRestore();
  });
});
