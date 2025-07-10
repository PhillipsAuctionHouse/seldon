import { useEffect, useState } from 'react';

export const usePendingState = <StateType,>(value: StateType) => {
  const [pendingState, setPendingState] = useState<StateType | null>(null);

  useEffect(() => {
    if (value) {
      setPendingState(null);
    }
  }, [value]);

  return { pendingState, setPendingState };
};

export const useIsMobile = (breakpoint = 961) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};
