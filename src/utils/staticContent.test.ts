import { describe, it, expect } from 'vitest';
import { LOREM_SHORT, LOREM_MEDIUM, LOREM_LONG, LOREM_MULTIPARAGRAPH, paragraphs, LOREM_HUGE } from './staticContent';

describe('staticContent constants', () => {
  it('LOREM_SHORT is a short string', () => {
    expect(typeof LOREM_SHORT).toBe('string');
    expect(LOREM_SHORT.length).toBeGreaterThan(10);
    expect(LOREM_SHORT).toMatch(/^Lorem ipsum/);
  });

  it('LOREM_MEDIUM is a medium-length string', () => {
    expect(typeof LOREM_MEDIUM).toBe('string');
    expect(LOREM_MEDIUM.length).toBeGreaterThan(50);
    expect(LOREM_MEDIUM).toMatch(/^Lorem ipsum/);
  });

  it('LOREM_LONG is a long string', () => {
    expect(typeof LOREM_LONG).toBe('string');
    expect(LOREM_LONG.length).toBeGreaterThan(200);
    expect(LOREM_LONG).toMatch(/^Lorem ipsum/);
  });

  it('LOREM_MULTIPARAGRAPH is an array of paragraphs', () => {
    expect(Array.isArray(LOREM_MULTIPARAGRAPH)).toBe(true);
    expect(LOREM_MULTIPARAGRAPH.length).toBeGreaterThan(1);
    LOREM_MULTIPARAGRAPH.forEach((p) => {
      expect(typeof p).toBe('string');
      expect(p.length).toBeGreaterThan(20);
    });
  });

  it('LOREM_HUGE is a long string with ~100 lines', () => {
    expect(typeof LOREM_HUGE).toBe('string');
    // Count lines by splitting on period (since each line ends with one)
    const lineCount = LOREM_HUGE.split('.').length - 1;
    expect(lineCount).toBeGreaterThanOrEqual(100);
    expect(LOREM_HUGE).toMatch(/^Lorem ipsum/);
  });
});

describe('paragraphs()', () => {
  it('returns empty string for count <= 0', () => {
    expect(paragraphs(0)).toBe('');
    expect(paragraphs(-5)).toBe('');
  });

  it('returns one paragraph for count = 1', () => {
    expect(paragraphs(1)).toBe(LOREM_MULTIPARAGRAPH[0]);
  });

  it('returns correct paragraphs for count > 1', () => {
    expect(paragraphs(2)).toBe(`${LOREM_MULTIPARAGRAPH[0]}\n\n${LOREM_MULTIPARAGRAPH[1]}`);
    expect(paragraphs(4)).toBe(
      `${LOREM_MULTIPARAGRAPH[0]}\n\n${LOREM_MULTIPARAGRAPH[1]}\n\n${LOREM_MULTIPARAGRAPH[2]}\n\n${LOREM_MULTIPARAGRAPH[3]}`,
    );
  });

  it('wraps paragraphs if count > length', () => {
    const count = LOREM_MULTIPARAGRAPH.length + 2;
    const result = paragraphs(count);
    const expected = [...LOREM_MULTIPARAGRAPH, LOREM_MULTIPARAGRAPH[0], LOREM_MULTIPARAGRAPH[1]].join('\n\n');
    expect(result).toBe(expected);
  });
});
