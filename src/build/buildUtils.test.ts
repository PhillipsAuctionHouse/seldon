import { transformScssAlias } from './buildUtils';

// `vitest.mock` is hoisted above the imports, so the mock function has to be created
// with `vitest.hoisted` to exist by the time the factory runs.
const globSync = vitest.hoisted(() => vitest.fn(() => [] as string[]));

// buildUtils reads `glob.sync` off glob's *default* export, so the mock has to replace
// `default.sync` — overriding only the named `sync` export leaves the real one in place.
vitest.mock('glob', () => ({
  default: { sync: globSync },
  sync: globSync,
}));

// Paths mirror the real src/ layout, because the number of ".." is derived from the
// number of directories in the path glob returns.
describe('transformScssAlias', () => {
  it('should return the contents unchanged if the file name is not found', () => {
    globSync.mockReturnValue([]);
    const contents = Buffer.from('Some contents');
    const transformedContents = transformScssAlias(contents, 'nonexistent.scss');
    expect(transformedContents).toBe(contents);
  });

  it('should replace the ~scss alias with the correct number of ".." based on the file path', () => {
    globSync.mockReturnValue(['components/Text/_text.scss']);
    const contents = Buffer.from('import "~scss/styles.scss";');
    const transformedContents = transformScssAlias(contents, '_text.scss');
    expect(transformedContents.toString()).toBe('import "../../styles.scss";');
  });

  it('should replace multiple occurrences of the ~scss alias in the contents', () => {
    globSync.mockReturnValue(['components/Text/_text.scss']);
    const contents = Buffer.from(`
      import "~scss/styles.scss";
      import "~scss/variables.scss";
    `);
    const transformedContents = transformScssAlias(contents, '_text.scss');
    expect(transformedContents.toString()).toBe(`
      import "../../styles.scss";
      import "../../variables.scss";
    `);
  });
  it('should handle deeply nested links', () => {
    globSync.mockReturnValue(['components/Navigation/NavigationItem/_navigationItem.scss']);
    const contents = Buffer.from(`
      import "~scss/styles.scss";
      import "~scss/variables.scss";
    `);
    const transformedContents = transformScssAlias(contents, '_navigationItem.scss');
    expect(transformedContents.toString()).toBe(`
      import "../../../styles.scss";
      import "../../../variables.scss";
    `);
  });
});
