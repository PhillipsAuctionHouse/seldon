import { useState } from 'react';
import { HeaderProps } from './Header';

type UseMobileMenuProps = Pick<HeaderProps, 'toggleCloseText' | 'toggleOpenText'>;

export const useMobileMenu = ({ toggleCloseText, toggleOpenText }: UseMobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleText = isMenuOpen ? toggleCloseText : toggleOpenText;
  return { isMenuOpen, handleMenuToggle, closeMenu, toggleText };
};
