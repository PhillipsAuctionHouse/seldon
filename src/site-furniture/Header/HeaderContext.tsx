import { createContext } from 'react';
import type { HeaderContextType } from './Header';
import { defaultHeaderContext } from './utils';

export const HeaderContext = createContext<HeaderContextType>(defaultHeaderContext);
