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
