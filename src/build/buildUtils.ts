import path from 'path';
import glob from 'glob';

export const transformScssAlias = (contents: Buffer, name: string) => {
  const filePath = glob.sync(`**/${name}`, { cwd: path.resolve(__dirname, '../../src/components') })[0];
  if (!filePath) {
    return contents;
  }
  // console.log('updating scss alias for file:', name);
  const countOfSubDirectories = filePath.split('/').length;

  return contents.toString().replace(
    /#scss/g,
    Array(countOfSubDirectories)
      .fill(0)
      .map(() => '..')
      .join('/'),
  );
};
