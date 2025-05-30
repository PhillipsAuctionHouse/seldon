import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './Page';

describe('Page Component', () => {
  it('renders without crashing', () => {
    render(<Page />);
    expect(document.body.innerHTML).toBeTruthy();
  });

  it('displays the correct heading', () => {
    render(<Page />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
