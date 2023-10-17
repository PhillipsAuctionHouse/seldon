import * as React from 'react';

export interface ErrorBoundaryProps {
  /**
   *  Optional fallback component to render in case an error is thrown in the wrapped component
   */
  fallback?: React.ReactNode;

  /**
   *  Optional logging method to call when error is thrown
   */
  logger: (error: Error, info: string) => void;

  /**
   *  Wrapped component(s)
   */
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  public static defaultProps = {
    logger: console.log,
  };

  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Swap out for logging service
    this.props?.logger(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h2>Sorry... An error occurred and we are looking into it</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
