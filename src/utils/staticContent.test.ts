import { describe, it, expect } from 'vitest';
import { LOREM_SHORT, LOREM_MEDIUM, LOREM_LONG, LOREM_MULTIPARAGRAPH, paragraphs, LOREM_HUGE } from './staticContent';

describe('staticContent constants', () => {
  it.each([
    ['LOREM_SHORT', 'string', 10, /^Lorem ipsum/, LOREM_SHORT],
    ['LOREM_MEDIUM', 'string', 50, /^Lorem ipsum/, LOREM_MEDIUM],
    ['LOREM_LONG', 'string', 200, /^Lorem ipsum/, LOREM_LONG],
  ])('%s is a %s with length > %i and starts with Lorem ipsum', (_name, type, minLength, regex, value) => {
    expect(typeof value).toBe(type);
    expect(value.length).toBeGreaterThan(minLength);
    expect(value).toMatch(regex);
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
    const lineCount = LOREM_HUGE.split('.').length - 1;
    expect(lineCount).toBeGreaterThanOrEqual(100);
    expect(LOREM_HUGE).toMatch(/^Lorem ipsum/);
  });
});

describe('paragraphs()', () => {
  it.each([
    [0, ''],
    [-5, ''],
  ])('paragraphs(%i) returns empty string for count <= 0', (count, expected) => {
    expect(paragraphs(count)).toBe(expected);
  });

  it('returns one paragraph for count = 1', () => {
    expect(paragraphs(1)).toBe(LOREM_MULTIPARAGRAPH[0]);
  });

  it.each([
    [2, `${LOREM_MULTIPARAGRAPH[0]}\n\n${LOREM_MULTIPARAGRAPH[1]}`],
    [
      4,
      `${LOREM_MULTIPARAGRAPH[0]}\n\n${LOREM_MULTIPARAGRAPH[1]}\n\n${LOREM_MULTIPARAGRAPH[2]}\n\n${LOREM_MULTIPARAGRAPH[3]}`,
    ],
  ])('paragraphs(%i) returns correct paragraphs for count > 1', (count, expected) => {
    expect(paragraphs(count)).toBe(expected);
  });

  it('wraps paragraphs if count > length', () => {
    const count = LOREM_MULTIPARAGRAPH.length + 2;
    const result = paragraphs(count);
    const expected = [...LOREM_MULTIPARAGRAPH, LOREM_MULTIPARAGRAPH[0], LOREM_MULTIPARAGRAPH[1]].join('\n\n');
    expect(result).toBe(expected);
  });
});
