import { describe, it, expect } from 'vitest';
import { LOREM_SHORT, LOREM_MEDIUM, LOREM_LONG, LOREM_MULTIPARAGRAPH, paragraphs } from './staticContent';

describe('staticContent utilities', () => {
  it('LOREM_SHORT should match the expected short text', () => {
    expect(LOREM_SHORT).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  });

  it('LOREM_MEDIUM should match the expected medium text', () => {
    expect(LOREM_MEDIUM).toContain('Lorem ipsum dolor sit amet');
    expect(LOREM_MEDIUM.length).toBeGreaterThan(LOREM_SHORT.length);
  });

  it('LOREM_LONG should match the expected long text', () => {
    expect(LOREM_LONG).toContain('Lorem ipsum dolor sit amet');
    expect(LOREM_LONG.length).toBeGreaterThan(LOREM_MEDIUM.length);
  });

  it('LOREM_MULTIPARAGRAPH should contain multiple paragraphs', () => {
    expect(LOREM_MULTIPARAGRAPH).toBeInstanceOf(Array);
    expect(LOREM_MULTIPARAGRAPH.length).toBeGreaterThan(1);
    expect(LOREM_MULTIPARAGRAPH[0]).toContain('Lorem ipsum dolor sit amet');
  });

  describe('paragraphs function', () => {
    it('should return an empty string for count <= 0', () => {
      expect(paragraphs(0)).toBe('');
      expect(paragraphs(-1)).toBe('');
    });

    it('should return the correct number of paragraphs', () => {
      const result = paragraphs(2);
      const splitResult = result.split('\n\n');
      expect(splitResult.length).toBe(2);
      expect(splitResult[0]).toBe(LOREM_MULTIPARAGRAPH[0]);
      expect(splitResult[1]).toBe(LOREM_MULTIPARAGRAPH[1]);
    });

    it('should loop through paragraphs if count exceeds available paragraphs', () => {
      const result = paragraphs(6);
      const splitResult = result.split('\n\n');
      expect(splitResult.length).toBe(6);
      expect(splitResult[4]).toBe(LOREM_MULTIPARAGRAPH[0]); // Loops back
      expect(splitResult[5]).toBe(LOREM_MULTIPARAGRAPH[1]);
    });
  });
});
