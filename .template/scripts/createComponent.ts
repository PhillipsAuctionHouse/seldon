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

async function updateFileContent(targetFile: string, componentName: string, componentType: string) {
  // Update references within the file
  const fileContent = await fs.promises.readFile(targetFile, 'utf-8');
  const updatedContent = fileContent
    .replace(/ComponentName/g, componentName)
    .replace('-componentName', `-${kebabCase(componentName)}`)
    .replace(/'Components\//g, `'${componentType.charAt(0).toUpperCase() + componentType.slice(1)}s/`);
  return updatedContent;
}

async function copyComponentFiles(componentName: string, componentType: 'component' | 'pattern') {
  const componentDir = path.join(__dirname, '..', 'Component');
  const targetDir = path.join(__dirname, '..', '../', 'src', `${componentType}s`, componentName);

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
      const updatedContent = await updateFileContent(targetFile, componentName, componentType);
      await fs.promises.writeFile(targetFile, updatedContent);
    }

    const stylesFilePath = path.join(__dirname, '..', '../', 'src', 'componentStyles.scss');
    const importStatement = `@use '${componentType}s/${componentName}/${newCamelCaseComponentName}';\n`;
    await fs.promises.appendFile(stylesFilePath, importStatement);

    const indexFilePath = path.join(__dirname, '..', '../', 'src', 'index.ts');
    const exportStatement = `export * from './${componentType}s/${componentName}';\n`;
    await fs.promises.appendFile(indexFilePath, exportStatement);
    console.log(`Component files copied to ${targetDir}`);
  } catch (error) {
    console.error('Error copying component files:', error);
  }
}

const componentName = process.argv[2];
const componentType = process.argv[3];

if (!componentName) {
  console.error(
    'Please provide a component name and component type as arguments: npm run createComponent <componentName> <componentType>',
  );
} else if (!componentType || (componentType !== 'component' && componentType !== 'pattern')) {
  console.error(
    'Please provide a component type of either `component` or `pattern` as an argument: npm run createComponent <componentName> <componentType>',
  );
} else {
  copyComponentFiles(componentName, componentType);
}

export { copyComponentFiles, updateFileContent };
