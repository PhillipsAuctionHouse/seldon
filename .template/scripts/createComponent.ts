import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { camelCase, kebabCase } from 'change-case';

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateFileContent(targetFile: string, componentName: string) {
  // Update references within the file
  const fileContent = await fs.promises.readFile(targetFile, 'utf-8');
  const updatedContent = fileContent
    .replace(/ComponentName/g, componentName)
    .replace('-componentName', `-${kebabCase(componentName)}`);
  return updatedContent;
}

async function copyComponentFiles(componentName: string) {
  const componentDir = path.join(__dirname, '..', 'Component');
  const targetDir = path.join(__dirname, '..', '../', 'src', 'components', componentName);

  const newCamelCaseComponentName = camelCase(componentName);
  try {
    await mkdir(targetDir);
    const files = await readdir(componentDir);
    for (const file of files) {
      const sourceFile = path.join(componentDir, file);
      const targetFile = path.join(
        targetDir,
        file.replace('ComponentName', componentName).replace('_componentName', `_${newCamelCaseComponentName}`),
      );
      await copyFile(sourceFile, targetFile);
      const updatedContent = await updateFileContent(targetFile, componentName);
      await fs.promises.writeFile(targetFile, updatedContent);
    }

    const stylesFilePath = path.join(__dirname, '..', '../', 'src', 'componentStyles.scss');
    const importStatement = `@use 'components/${componentName}/${newCamelCaseComponentName}';\n`;
    await fs.promises.appendFile(stylesFilePath, importStatement);

    const indexFilePath = path.join(__dirname, '..', '../', 'src', 'index.ts');
    const exportStatement = `export * from './components/${componentName}';\n`;
    await fs.promises.appendFile(indexFilePath, exportStatement);
    console.log(`Component files copied to ${targetDir}`);
  } catch (error) {
    console.error('Error copying component files:', error);
  }
}

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name as an argument: npm run createComponent <componentName>');
} else {
  copyComponentFiles(componentName);
}

export { copyComponentFiles, updateFileContent };
