import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { handleHiddenFields /* mergeZodEffects */ } from './utils';
import { z } from 'zod';
import { FormStep } from './types';

describe('handleHiddenFields', () => {
  let inputEls: HTMLInputElement[];
  let textareaEls: HTMLTextAreaElement[];
  let selectEls: HTMLSelectElement[];

  beforeEach(() => {
    // Create mock DOM elements
    inputEls = ['firstName', 'country'].map((name) => {
      const el = document.createElement('input');
      el.setAttribute('name', name);
      el.setAttribute('type', 'text');
      el.setAttribute('tabindex', '0');
      document.body.appendChild(el);
      return el;
    });
    textareaEls = ['firstName'].map((name) => {
      const el = document.createElement('textarea');
      el.setAttribute('name', name);
      el.setAttribute('tabindex', '0');
      document.body.appendChild(el);
      return el;
    });
    selectEls = ['country'].map((name) => {
      const el = document.createElement('select');
      el.setAttribute('name', name);
      el.setAttribute('tabindex', '0');
      document.body.appendChild(el);
      return el;
    });
  });

  afterEach(() => {
    [...inputEls, ...textareaEls, ...selectEls].forEach((el) => {
      document.body.removeChild(el);
    });
  });

  const genStep = (hiddenFields?: string[]): FormStep => ({
    id: 'step1',
    label: 'Step 1',
    schema: z.object({}),
    componentFactory: () => <div />,
    hiddenFields,
  });

  it('hides specified fields and sets correct attributes', () => {
    handleHiddenFields(genStep(['firstName']));
    inputEls.forEach((el) => {
      if (el.getAttribute('name') === 'firstName') {
        expect(el.getAttribute('type')).toBe('hidden');
        expect(el.getAttribute('aria-hidden')).toBe('true');
        expect(el.getAttribute('tabindex')).toBe('-1');
        expect(el.getAttribute('data-prev')).toContain('text|0');
      } else {
        expect(el.getAttribute('type')).toBe('text');
        expect(el.hasAttribute('aria-hidden')).toBe(false);
      }
    });
    textareaEls.forEach((el) => {
      expect(el.getAttribute('type')).toBe('hidden');
      expect(el.getAttribute('aria-hidden')).toBe('true');
      expect(el.getAttribute('tabindex')).toBe('-1');
      expect(el.getAttribute('data-prev')).toContain('|0');
    });
  });

  it('unhides fields and restores previous attributes', () => {
    handleHiddenFields(genStep(['firstName']));
    handleHiddenFields(genStep([]));
    inputEls.forEach((el) => {
      expect(el.getAttribute('type')).toBe('text');
      expect(el.hasAttribute('aria-hidden')).toBe(false);
      expect(el.getAttribute('tabindex')).toBe('0');
      expect(el.hasAttribute('data-prev')).toBe(false);
    });
    textareaEls.forEach((el) => {
      expect(el.hasAttribute('type')).toBe(false);
      expect(el.hasAttribute('aria-hidden')).toBe(false);
      expect(el.getAttribute('tabindex')).toBe('0');
      expect(el.hasAttribute('data-prev')).toBe(false);
    });
  });
});

/* 
describe('mergeZodEffects', () => {
  // this function is not used for the time being
  it('merges multiple Zod schemas and preserves refinements and transforms', () => {
    const personSchema = z
      .object({
        name: z.string().refine((val) => val.length > 2, {
          message: 'Too short',
        }),
      })
      .transform((obj) => ({ ...obj, name: obj.name.toUpperCase() }));

    const countrySchema = z
      .object({
        age: z.number().refine((val) => val > 10, {
          message: 'Too small',
        }),
      })
      .transform((obj) => ({ ...obj, age: obj.age + 1 }));

    const merged = mergeZodEffects({ person: personSchema, country: countrySchema });

    const result = merged.safeParse({ person: { name: 'hello' }, country: { age: 11 } });
    expect(result.success).toBe(true);
    expect(result.data?.person?.name).toBe('HELLO');
    expect(result.data?.country?.age).toBe(12);
  });

  it('fails validation if refinements are not met', () => {
    const personSchema = z.object({
      name: z.string().refine((val) => val.length > 2, {
        message: 'Too short',
      }),
    });
    const countrySchema = z.object({
      age: z.number().refine((val) => val > 10, {
        message: 'Too small',
      }),
    });
    const merged = mergeZodEffects({ person: personSchema, country: countrySchema });
    const result = merged.safeParse({ person: { name: 'hi' }, country: { age: 5 } });
    expect(result.success).toBe(false);
    expect(result.error?.issues.length).toBeGreaterThan(0);
    expect(result.error?.issues.map((i) => i.message)).toEqual(expect.arrayContaining(['Too short', 'Too small']));
  });

  it('merges schemas with no effects', () => {
    const personSchema = z.object({ name: z.string() });
    const countrySchema = z.object({ age: z.number() });
    const merged = mergeZodEffects({ person: personSchema, country: countrySchema });
    const result = merged.safeParse({ person: { name: 'hello' }, country: { age: 42 } });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ person: { name: 'hello' }, country: { age: 42 } });
  });
}); 
*/
