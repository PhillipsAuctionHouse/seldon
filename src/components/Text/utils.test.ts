import { determineTextClassName, determineDefaultTextElement } from './utils';
import { TextVariants } from './types';
import { px } from '../../utils';

describe('determineTextClassName', () => {
  it('should return the correct class name for body variant', () => {
    const className = determineTextClassName(TextVariants.bodyLg);
    expect(className).toBe(`${px}-text--bodyLg`);
  });

  it('should return the correct class name for label variant', () => {
    const className = determineTextClassName(TextVariants.label);
    expect(className).toBe(`${px}-text--label`);
  });

  it('should return the correct class name for heading variant', () => {
    const className = determineTextClassName(TextVariants.blockquote);
    expect(className).toBe(`${px}-text--blockquote`);
  });

  it('should return the correct class name for link variant', () => {
    const className = determineTextClassName(TextVariants.link);
    expect(className).toBe(`${px}-text--link`);
  });

  it('should return the correct class name for button variant', () => {
    const className = determineTextClassName(TextVariants.button);
    expect(className).toBe(`${px}-text--button`);
  });
});

describe('determineDefaultTextElement', () => {
  it('should return "span" for body variant', () => {
    const element = determineDefaultTextElement(TextVariants.bodyLg);
    expect(element).toBe('span');
  });

  it('should return "label" for label variant', () => {
    const element = determineDefaultTextElement(TextVariants.label);
    expect(element).toBe('label');
  });

  it('should return "blockquote" for blockquote variant', () => {
    const element = determineDefaultTextElement(TextVariants.blockquote);
    expect(element).toBe('blockquote');
  });

  it('should return "h1" for heading', () => {
    const displayVariants = [TextVariants.heading1, TextVariants.heading1];
    displayVariants.forEach((variant) => {
      const element = determineDefaultTextElement(variant);
      expect(element).toBe('h1');
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
  it('should return "h4" for heading4 variant', () => {
    const element = determineDefaultTextElement(TextVariants.heading5);
    expect(element).toBe('h5');
  });
});
