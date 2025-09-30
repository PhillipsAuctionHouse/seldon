import { getScssColors, getScssVar } from './scssUtils';

let vars: string;

beforeAll(() => {
  vars = '$pure-black: #000000;\n$cta-blue: #0077FF;\n$error-red: #FF0000;\n';
  vi.mock('#scss/_vars.scss?raw', () => ({ default: vars }));
});

describe('scssUtils', () => {
  it.each([
    ['$pure-black', '$error-red', '#000000'],
    ['$non-existent-var', '$error-red', '#FF0000'],
    ['$non-existent-var', '$non-existent-default', '$non-existent-default'],
  ])(
    'returns correct value for scssVar=%s and defaultValue=%s',
    (scssVar: string, defaultValue: string, expected: string) => {
      expect(getScssVar(scssVar, defaultValue)).toBe(expected);
    },
  );

  it('returns an array of color variables from _vars.scss', () => {
    const result = getScssColors();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(['$pure-black', '$cta-blue', '$error-red']);
  });
});
