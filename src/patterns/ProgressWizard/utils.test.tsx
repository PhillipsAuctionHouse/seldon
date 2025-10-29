import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { generateStepId, wrapChild, wrapChildren, getLabelsFromChildren, isControlled } from './utils';

describe('Progress wizard utils', () => {
  it('generateStepId returns index based id', () => {
    expect(generateStepId(2)).toBe('wizard-step-2');
  });

  it('wrapChild returns original node for non-elements', () => {
    const node = 'text-node';
    // pass through non-element nodes unchanged
    expect(wrapChild(node, 0, 0, 'base')).toBe('text-node');
  });

  it('wrapChild wraps a valid React element with expected class and key', () => {
    const el = <span aria-label="LabelA">Inner</span>;
    const wrapped = wrapChild(el, 0, 1, 'seldon-progress-wizard');
    render(<div id="wrapped-wrapper">{wrapped}</div>);
    const wrapper = document.querySelector('#wrapped-wrapper > div');
    expect(wrapper).toBeTruthy();
    // since currentIndex !== 0, wrapper should have hidden class
    expect(wrapper).toHaveClass('seldon-progress-wizard-hidden');
    // original content still present
    expect(screen.getByLabelText('LabelA')).toBeInTheDocument();
  });

  it('wrapChildren maps multiple children and preserves order', () => {
    const children = [<div key="a" aria-label="A" />, <div key="b" aria-label="B" />];
    const wrapped = wrapChildren(children, 0, 'seldon-progress-wizard');
    render(<>{wrapped}</>);
    // We rendered wrappers; check both labels present
    expect(screen.getByLabelText('A')).toBeInTheDocument();
    expect(screen.getByLabelText('B')).toBeInTheDocument();
  });

  it('getLabelsFromChildren returns aria-labels else an empty string', () => {
    const children = [<div key="a" aria-label="A" />, <div key="b">NoLabel</div>];
    const labels = getLabelsFromChildren(children as React.ReactNode[]);
    expect(labels[0]).toBe('A');
    expect(labels[1]).toBe('');
  });

  it('isControlled returns true only when index is defined', () => {
    expect(isControlled(undefined)).toBe(false);
    expect(isControlled(0)).toBe(true);
    expect(isControlled(2)).toBe(true);
  });
});
