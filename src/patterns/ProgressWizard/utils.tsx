import React, { type ReactNode } from 'react';

export const generateStepKey = (index: number, ariaLabel?: string) =>
  ariaLabel ? `.${index}-${ariaLabel}` : `.wizard-step-${index}`;

export const wrapChild = (child: ReactNode, childIndex: number, currentIndex: number, baseClassName: string) => {
  if (!React.isValidElement(child)) return child;
  const props = (child.props ?? {}) as Record<string, unknown>;
  const ariaLabel = typeof props['aria-label'] === 'string' ? (props['aria-label'] as string) : undefined;
  const key = generateStepKey(childIndex, ariaLabel);
  return (
    <div key={key} className={childIndex !== currentIndex ? `${baseClassName}-hidden` : ''}>
      {child}
    </div>
  );
};

export const wrapChildren = (children: ReactNode[], currentIndex: number, baseClassName: string) =>
  children.map((c, i) => wrapChild(c, i, currentIndex, baseClassName));

export const getLabelsFromChildren = (children: ReactNode[]) =>
  children.map((child, i) => {
    if (React.isValidElement(child)) {
      const props = (child.props ?? {}) as Record<string, unknown>;
      return (typeof props['aria-label'] === 'string' && props['aria-label']) || `Step ${i + 1}`;
    }
    return `Step ${i + 1}`;
  });

export const isControlled = (currentStepIndex: number | undefined) => currentStepIndex !== undefined;
