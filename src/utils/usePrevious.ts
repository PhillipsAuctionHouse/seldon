import { useRef, useEffect } from 'react';

export const usePrevious = (value: unknown) => {
  const ref = useRef<unknown | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
