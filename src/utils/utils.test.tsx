import { render, screen } from '@testing-library/react';
import { closeActiveElement } from './index';

describe('closeActiveElement', () => {
  it('should blur the active element if it matches the specified element type', () => {
    render(
      <select data-testid="test-select">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>,
    );

    const selectElement = screen.getByTestId('test-select') as HTMLSelectElement;
    selectElement.focus();

    expect(document.activeElement).toBe(selectElement);
    closeActiveElement('SELECT');
    expect(document.activeElement).not.toBe(selectElement);
  });

  it('should not blur the active element if it does not match the specified element type', () => {
    render(<input data-testid="test-input" />);

    const inputElement = screen.getByTestId('test-input') as HTMLInputElement;
    inputElement.focus();

    expect(document.activeElement).toBe(inputElement);
    closeActiveElement('SELECT');
    expect(document.activeElement).toBe(inputElement);
  });
});
