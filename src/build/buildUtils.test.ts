import { transformScssAlias } from './buildUtils';

function createMockGlob(fileName: string) {
  return async (importOriginal: () => Promise<object>) => {
    const glob = (await importOriginal()) as object;
    return {
      ...glob,
      sync: vitest.fn(() => [fileName]),
    };
  };
}

const originalLog = console.log;
beforeAll(() => {
  console.log = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].startsWith('transforming scss alias')) {
      return;
    }
    originalLog(...args);
  };
});

afterAll(() => {
  console.log = originalLog;
});

describe('transformScssAlias', () => {
  it('should return the contents unchanged if the file name is not found', () => {
    const contents = Buffer.from('Some contents');
    const transformedContents = transformScssAlias(contents, 'nonexistent.scss');
    expect(transformedContents).toBe(contents);
  });

  it('should replace the #scss alias with the correct number of ".." based on the file path', () => {
    vitest.mock('glob', createMockGlob('Text/_text.scss'));
    const contents = Buffer.from('import "#scss/styles.scss";');
    const transformedContents = transformScssAlias(contents, '_text.scss');
    expect(transformedContents.toString()).toBe('import "../../styles.scss";');
  });

  it('should replace multiple occurrences of the #scss alias in the contents', () => {
    vitest.mock('glob', createMockGlob('Text/_text.scss'));
    const contents = Buffer.from(`
      import "#scss/styles.scss";
      import "#scss/variables.scss";
    `);
    const transformedContents = transformScssAlias(contents, '_text.scss');
    expect(transformedContents.toString()).toBe(`
      import "../../styles.scss";
      import "../../variables.scss";
    `);
  });
  it('should handle deeply nested links', () => {
    vitest.mock('glob', createMockGlob('Navigation/NavigationItem/_navigationItem.scss'));
    const contents = Buffer.from(`
      import "#scss/styles.scss";
      import "#scss/variables.scss";
    `);
    const transformedContents = transformScssAlias(contents, '_navigationItem.scss');
    expect(transformedContents.toString()).toBe(`
      import "../../../styles.scss";
      import "../../../variables.scss";
    `);
  });
});
