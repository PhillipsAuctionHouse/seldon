import { describe, it, expect } from 'vitest';
import { getAccordionVariantProps, getIconClasses } from './utils';

describe('getAccordionVariantProps', () => {
  it('returns type multiple by default', () => {
    expect(getAccordionVariantProps()).toEqual({ type: 'multiple' });
  });

  it('returns type single for singleCollapsible', () => {
    expect(getAccordionVariantProps('singleCollapsible')).toEqual({ type: 'single' });
  });

  it('returns type single for singleNonCollapsible', () => {
    expect(getAccordionVariantProps('singleNonCollapsible')).toEqual({ type: 'single' });
  });

  it('logs error if value is array for single variant', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => void 0);
    getAccordionVariantProps('singleCollapsible', ['a', 'b']);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});

describe('getIconClasses', () => {
  it('returns correct classes for large variation', () => {
    const result = getIconClasses('myClass', true, 'lock');
    expect(result).toContain('myClass__icon--lg');
  });

  it('returns correct classes for small variation', () => {
    const result = getIconClasses('myClass', false, 'plus');
    expect(result).not.toContain('myClass__icon--lg');
  });

  it('returns correct icon name classes', () => {
    const result = getIconClasses('myClass', false, 'minus');
    expect(result).toContain('myClass-minus__icon');
  });
});
