import { determineTextClassName, determineDefaultTextElement } from './utils';
import { TextVariants } from './types';

describe('determineTextClassName', () => {
  it('should return the correct class name for body variant', () => {
    const className = determineTextClassName(TextVariants.body1);
    expect(className).toBe('phillips-text--body1');
  });

  it('should return the correct class name for label variant', () => {
    const className = determineTextClassName(TextVariants.label);
    expect(className).toBe('phillips-text--label');
  });

  it('should return the correct class name for heading variant', () => {
    const className = determineTextClassName(TextVariants.heading1);
    expect(className).toBe('phillips-text--heading1');
  });

  it('should return the correct class name for ctaSm variant', () => {
    const className = determineTextClassName(TextVariants.ctaSm);
    expect(className).toBe('phillips-text--cta-sm');
  });

  it('should return the correct class name for ctaLg variant', () => {
    const className = determineTextClassName(TextVariants.ctaLg);
    expect(className).toBe('phillips-text--cta-lg');
  });
});

describe('determineDefaultTextElement', () => {
  it('should return "p" for body variant', () => {
    const element = determineDefaultTextElement(TextVariants.body1);
    expect(element).toBe('p');
  });

  it('should return "label" for label variant', () => {
    const element = determineDefaultTextElement(TextVariants.label);
    expect(element).toBe('label');
  });

  it('should return "h1" for heading1 variant', () => {
    const element = determineDefaultTextElement(TextVariants.heading1);
    expect(element).toBe('h1');
  });

  it('should return "h2" for heading2 variant', () => {
    const element = determineDefaultTextElement(TextVariants.heading2);
    expect(element).toBe('h2');
  });

  it('should return "h3" for heading3 variant', () => {
    const element = determineDefaultTextElement(TextVariants.heading3);
    expect(element).toBe('h3');
  });

  it('should return "h4" for heading4 variant', () => {
    const element = determineDefaultTextElement(TextVariants.heading4);
    expect(element).toBe('h4');
  });
});
