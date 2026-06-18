import path from 'path';
import { globSync } from 'glob';

export const transformScssAlias = (contents: Buffer, name: string) => {
  const filePath = globSync(`**/${name}`, { cwd: path.resolve(__dirname, '../../src') })[0];
  console.log('transforming scss alias for file:', filePath);
  if (!filePath) {
    return contents;
  }
  const countOfSubDirectories = filePath.split('/').length - 1;

  return contents.toString().replace(
    /~scss/g,
    Array(countOfSubDirectories)
      .fill(0)
      .map(() => '..')
      .join('/'),
  );
};
