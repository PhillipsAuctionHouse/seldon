import { noOp } from '../../utils';
import { HeaderContextType } from './Header';

export const defaultHeaderContext: HeaderContextType = {
  isMenuOpen: false,
  isSearchExpanded: false,
  setIsSearchExpanded: noOp,
  closeMenu: noOp,
  activeSubmenuId: null,
  setActiveSubmenuId: noOp,
  closeTimeoutRef: { current: null },
};
