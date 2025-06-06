import { getScssColors, getScssVar } from './scssUtils';

const vars = vi.hoisted(() => '$pure-black: #000000;\n$cta-blue: #0077FF;\n$error-red: #FF0000;\n');
vi.mock('#scss/_vars.scss?raw', () => ({ default: vars }));

describe('scssUtils', () => {
  describe('getScssVar', () => {
    it('should return the value of the scss variable if it exists', () => {
      const scssVar = '$pure-black';
      const defaultValue = '$error-red';

      const result = getScssVar(scssVar, defaultValue);
      expect(result).toBe('#000000');
    });

    it('should return the color of the default value if the scss variable does not exist', () => {
      const scssVar = '$non-existent-var';
      const defaultValue = '$error-red';

      const result = getScssVar(scssVar, defaultValue);
      expect(result).toBe('#FF0000');
    });

    it('should return the default value if the scss variable does not exist AND the color of the default value is not found', () => {
      const scssVar = '$non-existent-var';
      const defaultValue = '$non-existent-default';

      const result = getScssVar(scssVar, defaultValue);
      expect(result).toBe('$non-existent-default');
    });
  });

  describe('getScssColors', () => {
    it('should return an array of color variables from _vars.scss', () => {
      const result = getScssColors();
      expect(result).toEqual(['$pure-black', '$cta-blue', '$error-red']);
    });
  });
});
