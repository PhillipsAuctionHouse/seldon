import { determineTextClassName, determineDefaultTextElement } from './utils';
import { TextVariants } from './types';
import { px } from '../../utils';

describe('determineTextClassName', () => {
  it('should return the correct class name for body variant', () => {
    const className = determineTextClassName(TextVariants.body1);
    expect(className).toBe(`${px}-text--body1`);
  });

  it('should return the correct class name for label variant', () => {
    const className = determineTextClassName(TextVariants.label);
    expect(className).toBe(`${px}-text--label`);
  });

  it('should return the correct class name for heading variant', () => {
    const className = determineTextClassName(TextVariants.blockquote);
    expect(className).toBe(`${px}-text--blockquote`);
  });

  it('should return the correct class name for ctaSm variant', () => {
    const className = determineTextClassName(TextVariants.ctaSm);
    expect(className).toBe(`${px}-text--cta-sm`);
  });

  it('should return the correct class name for ctaLg variant', () => {
    const className = determineTextClassName(TextVariants.ctaLg);
    expect(className).toBe(`${px}-text--cta-lg`);
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

  it('should return "blockquote" for blockquote variant', () => {
    const element = determineDefaultTextElement(TextVariants.blockquote);
    expect(element).toBe('blockquote');
  });

  it('should return "h1" for display 0 and display 1', () => {
    const displayVariants = [TextVariants.display0, TextVariants.display1];
    displayVariants.forEach((variant) => {
      const element = determineDefaultTextElement(variant);
      expect(element).toBe('h1');
    });
  });

  it('should return "h3" for display 2 and display 3 and display 4', () => {
    const displayVariants = [TextVariants.display2, TextVariants.display3, TextVariants.display4];
    displayVariants.forEach((variant) => {
      const element = determineDefaultTextElement(variant);
      expect(element).toBe('h3');
    });
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
