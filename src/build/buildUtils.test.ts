import { vi, describe, it, expect } from 'vitest';
import { transformScssAlias } from './buildUtils';

const politeConsole = (...args) => {
  if (!args[0]?.startsWith?.('transforming scss alias')) {
    console.log(...args);
  }
};

describe('transformScssAlias', () => {
  it('returns contents unchanged when file name is not found', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(politeConsole);
    const contents = Buffer.from('Some contents');
    const transformedContents = transformScssAlias(contents, 'nonexistent.scss');
    expect(transformedContents).toBe(contents);
    spy.mockRestore();
  });

  [
    {
      name: 'replaces #scss alias for shallow file',
      fileName: 'Text/_text.scss',
      filePath: '_text.scss',
      expected: 'import "../../styles.scss";',
      input: Buffer.from('import "#scss/styles.scss";'),
    },
    {
      name: 'replaces multiple #scss aliases for shallow file',
      fileName: 'Text/_text.scss',
      filePath: '_text.scss',
      expected: `
      import "../../styles.scss";
      import "../../variables.scss";
    `,
      input: Buffer.from(`
      import "#scss/styles.scss";
      import "#scss/variables.scss";
    `),
    },
    {
      name: 'replaces #scss alias for deeply nested file',
      fileName: 'Navigation/NavigationItem/_navigationItem.scss',
      filePath: '_navigationItem.scss',
      expected: `
      import "../../../styles.scss";
      import "../../../variables.scss";
    `,
      input: Buffer.from(`
      import "#scss/styles.scss";
      import "#scss/variables.scss";
    `),
    },
  ].forEach(({ name, fileName, filePath, expected, input }) => {
    it(name, () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(politeConsole);
      vi.mock('glob', async (importOriginal: () => Promise<Record<string, unknown>>) => {
        const glob = await importOriginal();
        return {
          ...glob,
          sync: vi.fn(() => [fileName]),
        };
      });
      const transformedContents = transformScssAlias(input, filePath);
      expect(transformedContents.toString()).toBe(expected);
      spy.mockRestore();
    });
  });
});
