import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import { handleHiddenFields } from './utils';
import { z } from 'zod';
import { FormStep } from './types';

describe('handleHiddenFields', () => {
  let inputEls: HTMLInputElement[];
  let textareaEls: HTMLTextAreaElement[];
  let selectEls: HTMLSelectElement[];

  beforeEach(() => {
    inputEls = ['step1.firstName', 'step1.country'].map((name) => {
      const el = document.createElement('input');
      el.setAttribute('name', name);
      el.setAttribute('type', 'text');
      el.setAttribute('tabindex', '0');
      document.body.appendChild(el);
      return el;
    });
    textareaEls = ['step1.firstName'].map((name) => {
      const el = document.createElement('textarea');
      el.setAttribute('name', name);
      el.setAttribute('tabindex', '0');
      document.body.appendChild(el);
      return el;
    });
    selectEls = ['step1.country'].map((name) => {
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
    screen.logTestingPlaygroundURL();
    inputEls.forEach((el) => {
      if (el.getAttribute('name') === 'step1.firstName') {
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

  it('hides parent div when it contains only the hidden input', () => {
    const parentDiv = document.createElement('div');
    parentDiv.setAttribute('id', 'parent-div');
    const el = document.createElement('input');
    el.setAttribute('name', 'step1.firstName');
    el.setAttribute('type', 'text');
    el.setAttribute('tabindex', '0');
    parentDiv.appendChild(el);
    document.body.appendChild(parentDiv);

    handleHiddenFields({
      id: 'step1',
      label: 'Step 1',
      schema: z.object({}),
      componentFactory: () => <div />,
      hiddenFields: ['firstName'],
    });

    expect(el.getAttribute('type')).toBe('hidden');
    expect(parentDiv.style.visibility).toBe('hidden');
    expect(parentDiv.style.position).toBe('absolute');
    expect(parentDiv.getAttribute('aria-hidden')).toBe('true');
    expect(parentDiv.style.pointerEvents).toBe('none');

    // Clean up
    document.body.removeChild(parentDiv);
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
