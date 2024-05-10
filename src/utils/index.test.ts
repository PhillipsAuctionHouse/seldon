import { nullishCoalescing } from './index.tsx';

describe('nullishCoalescing', () => {
  it('should return string', () => {
    const testStr = nullishCoalescing(null, 'This is a string');
    expect(testStr).toBe(null ?? 'This is a string');
  });
  it('should return the number 0', () => {
    const testNum = nullishCoalescing(0, 42);
    expect(testNum).toBe(0 ?? 42);
  });
  it('should return first available value', () => {
    const testValue = nullishCoalescing(undefined, '');
    expect(testValue).toBe(undefined ?? '');
  });
});
