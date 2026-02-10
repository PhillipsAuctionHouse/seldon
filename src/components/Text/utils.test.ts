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

  it('should return the correct class name for email variant', () => {
    const className = determineTextClassName(TextVariants.email);
    expect(className).toBe(`${px}-text--bodyMedium`);
  });

  it('should return the correct class name for link variant', () => {
    const className = determineTextClassName(TextVariants.link);
    expect(className).toBe(`${px}-text--bodyMedium`);
  });

  it('should return the correct class name for linkSmall variant', () => {
    const className = determineTextClassName(TextVariants.linkSmall);
    expect(className).toBe(`${px}-text--bodySmall`);
  });

  it('should return the correct class name for linkMedium variant', () => {
    const className = determineTextClassName(TextVariants.linkMedium);
    expect(className).toBe(`${px}-text--bodyMedium`);
  });

  it('should return the correct class name for linkLarge variant', () => {
    const className = determineTextClassName(TextVariants.linkLarge);
    expect(className).toBe(`${px}-text--bodyLarge`);
  });

  it('should return the correct class name for button variant', () => {
    const className = determineTextClassName(TextVariants.button);
    expect(className).toBe(`${px}-text--button`);
  });

  it('should return the correct class name for headingLarge variant', () => {
    const className = determineTextClassName(TextVariants.headingLarge);
    expect(className).toBe(`${px}-text--headingLarge`);
  });

  it('should return the correct class name for headingMedium variant', () => {
    const className = determineTextClassName(TextVariants.headingMedium);
    expect(className).toBe(`${px}-text--headingMedium`);
  });

  it('should return the correct class name for headingSmall variant', () => {
    const className = determineTextClassName(TextVariants.headingSmall);
    expect(className).toBe(`${px}-text--headingSmall`);
  });
});

describe('determineDefaultTextElement', () => {
  it('should return "span" for body variant', () => {
    const element = determineDefaultTextElement(TextVariants.body1);
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

  // it('should return "h3" for heading3 variant', () => {
  //   const element = determineDefaultTextElement(TextVariants.heading3Italic);
  //   expect(element).toBe('h3');
  // });

  it('should return "h4" for heading4 variant', () => {
    const element = determineDefaultTextElement(TextVariants.heading4);
    expect(element).toBe('h4');
  });

  // it('should return "h4" for heading4Italic variant', () => {
  //   const element = determineDefaultTextElement(TextVariants.heading4Italic);
  //   expect(element).toBe('h4');
  // });

  it('should return "h4" for heading4 variant', () => {
    const element = determineDefaultTextElement(TextVariants.heading5);
    expect(element).toBe('h5');
  });

  it('should return "h1" for headingLarge variant', () => {
    const element = determineDefaultTextElement(TextVariants.headingLarge);
    expect(element).toBe('h1');
  });

  it('should return "h2" for headingMedium variant', () => {
    const element = determineDefaultTextElement(TextVariants.headingMedium);
    expect(element).toBe('h2');
  });

  it('should return "h3" for headingSmall variant', () => {
    const element = determineDefaultTextElement(TextVariants.headingSmall);
    expect(element).toBe('h3');
  });
});
