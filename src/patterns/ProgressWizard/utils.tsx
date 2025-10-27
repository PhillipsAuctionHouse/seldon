import React, { type ReactNode } from 'react';

export const generateStepId = (index: number) => `wizard-step-${index}`;

export const wrapChild = (child: ReactNode, childIndex: number, currentIndex: number, baseClassName: string) => {
  if (!React.isValidElement(child)) return child;
  return (
    <div key={generateStepId(childIndex)} className={childIndex !== currentIndex ? `${baseClassName}-hidden` : ''}>
      {child}
    </div>
  );
};

export const wrapChildren = (children: ReactNode[], currentIndex: number, baseClassName: string) =>
  children.map((c, i) => wrapChild(c, i, currentIndex, baseClassName));

export const getLabelsFromChildren = (children: ReactNode[]): string[] =>
  children.map(
    (child) => (React.isValidElement(child) && child.props?.['aria-label']) || ''
  );

export const isControlled = (currentStepIndex: number | undefined) => currentStepIndex !== undefined;
