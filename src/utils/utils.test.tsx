import { render, screen } from '@testing-library/react';
import { focusElementById } from './index';

describe('focusElementById', () => {
  it('should focus the element when focus is true', () => {
    render(
      <div id="test-element" tabIndex={0}>
        Focusable Element
      </div>,
    );

    const element = screen.getByText('Focusable Element');
    expect(element).toBeInTheDocument();
    focusElementById('test-element', true);
    expect(document.activeElement).toBe(element);
  });

  it('should blur the element when focus is false', () => {
    render(
      <div id="test-element" tabIndex={0}>
        Focusable Element
      </div>,
    );

    const element = screen.getByText('Focusable Element');
    element.focus();
    expect(document.activeElement).toBe(element);

    focusElementById('test-element', false);
    expect(document.activeElement).not.toBe(element);
  });

  it('should do nothing if the element does not exist', () => {
    focusElementById('non-existent-element', true);
    expect(document.activeElement).toBe(document.body);
  });
});
