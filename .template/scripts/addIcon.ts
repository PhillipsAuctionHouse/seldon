import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path constants
const ICON_TEMPLATE_DIR = path.join(__dirname, '..', 'Icon');
const FORMATTED_ICONS_DIR = path.join(__dirname, '../../src/assets/formatted');
const SVG_SOURCE_DIR = path.join(__dirname, '../../src/assets');

/**
 * Validates that the icon name is in PascalCase format
 */
function validateIconName(name: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(name);
}

/**
 * Checks if a file exists and is accessible
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extracts SVG content after the opening <svg> tag
 */
function extractSvgContent(svgFileContent: string): string {
  const match = svgFileContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  if (!match || !match[1]) {
    throw new Error('Invalid SVG file: could not parse SVG content');
  }
  return match[1];
}

/**
 * Converts SVG content to React-compatible TSX format
 * - Adds fill={color} to SVG elements without fill attribute
 * - Converts kebab-case attributes to camelCase
 */
function tsxifySvgContent(svgContent: string): string {
  const elementsToProcess = ['path', 'circle', 'rect', 'polygon', 'ellipse', 'line', 'polyline'];
  let result = svgContent;

  // Add fill={color} to elements that don't have a fill attribute
  elementsToProcess.forEach((element) => {
    result = result.replace(new RegExp(`<${element}\\s+([^>]*?)(\\/??)>`, 'gi'), (match, attributes, selfClosing) => {
      if (/fill\\s*=/i.test(attributes)) {
        return match;
      }
      return `<${element} ${attributes.trim()} fill={color}${selfClosing}>`;
    });
  });

  // Convert kebab-case attributes to camelCase (only attribute names, not values)
  return result.replace(
    /\s([a-z]+)-([a-z]+)=/gi,
    (match, p1, p2) => ` ${p1}${p2.charAt(0).toUpperCase()}${p2.slice(1)}=`,
  );
}

/**
 * Updates the icon template file with the icon name and SVG content
 */
async function updateFileContent(targetFile: string, iconName: string, svgRest: string): Promise<string> {
  const fileContent = await fs.promises.readFile(targetFile, 'utf-8');
  const updatedContent = fileContent.replace(/IconName/g, iconName).replace('SVGRest', svgRest);
  return updatedContent;
}

/**
 * Main function to copy and process icon files
 */
async function copyIconFiles(iconName: string, svgFilePath: string, force = false): Promise<void> {
  // Validate icon name format
  if (!validateIconName(iconName)) {
    throw new Error(`Icon name "${iconName}" must be in PascalCase format (e.g., ArrowLeft, CheckCircle)`);
  }

  // Check for duplicate icon
  const targetFile = path.join(FORMATTED_ICONS_DIR, `${iconName}.tsx`);
  if ((await fileExists(targetFile)) && !force) {
    throw new Error(`Icon "${iconName}" already exists. Use --force to overwrite.`);
  }

  // Validate SVG file exists
  if (!(await fileExists(svgFilePath))) {
    throw new Error(`SVG file not found: ${svgFilePath}`);
  }

  // Read and parse SVG file
  let svgFileContent: string;
  try {
    svgFileContent = await fs.promises.readFile(svgFilePath, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to read SVG file: ${error instanceof Error ? error.message : String(error)}`);
  }

  // Validate SVG content
  if (!svgFileContent.includes('<svg')) {
    throw new Error('Invalid SVG file: missing <svg> tag');
  }

  // Warn about missing viewBox
  if (!/<svg[^>]*viewBox=/i.test(svgFileContent)) {
    console.warn('⚠️  Warning: SVG missing viewBox attribute. This may cause scaling issues.');
  }

  let svgRest: string;
  try {
    svgRest = extractSvgContent(svgFileContent);

    // Warn about hardcoded colors
    if (/fill=["'](?!none)(?!currentColor)#[0-9a-fA-F]{3,6}["']/i.test(svgRest)) {
      console.warn('⚠️  Warning: SVG contains hardcoded fill colors. These may override the dynamic color prop.');
    }

    svgRest = tsxifySvgContent(svgRest) + '</svg>';
  } catch (error) {
    throw new Error(`Failed to process SVG content: ${error instanceof Error ? error.message : String(error)}`);
  }

  try {
    // Ensure target directory exists
    await mkdir(FORMATTED_ICONS_DIR, { recursive: true });

    // Copy and update icon template
    const sourceFile = path.join(ICON_TEMPLATE_DIR, 'IconName.tsx');

    if (!(await fileExists(sourceFile))) {
      throw new Error(`Icon template not found: ${sourceFile}`);
    }

    await copyFile(sourceFile, targetFile);
    const updatedContent = await updateFileContent(targetFile, iconName, svgRest);

    // Update index file with sorted exports
    const indexPath = path.join(FORMATTED_ICONS_DIR, 'index.ts');
    let indexContent = '';
    if (await fileExists(indexPath)) {
      indexContent = await fs.promises.readFile(indexPath, 'utf-8');
    }

    const importStatement = `export { default as ${iconName} } from './${iconName}';`;
    const lines = indexContent.split('\n').filter((line) => line.trim());
    if (!lines.includes(importStatement)) {
      lines.push(importStatement);
    }
    const sortedContent = lines.sort().join('\n') + '\n';

    // Copy original SVG file
    const svgTargetFile = path.join(SVG_SOURCE_DIR, `${iconName}.svg`);

    // Write all files in parallel
    await Promise.all([
      fs.promises.writeFile(targetFile, updatedContent),
      fs.promises.writeFile(indexPath, sortedContent),
      copyFile(svgFilePath, svgTargetFile),
    ]);

    // Format generated files with prettier
    try {
      await execAsync(`npx prettier --write "${targetFile}" "${indexPath}"`);
      await execAsync(`npx prettier --write --parser html "${svgTargetFile}"`);
    } catch (error) {
      console.warn('Warning: Prettier formatting failed:', error instanceof Error ? error.message : String(error));
    }

    console.log(`✓ Icon files created successfully for ${iconName}`);
    console.log(`  - ${targetFile}`);
    console.log(`  - ${svgTargetFile}`);
    console.log(`  - ${indexPath} (updated)`);
  } catch (error) {
    throw new Error(`Failed to create icon files: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Main execution
 */
async function main(): Promise<number> {
  const args = process.argv.slice(2);
  const forceFlag = args.includes('--force');
  const filteredArgs = args.filter((arg) => arg !== '--force');
  const iconName = filteredArgs[0];
  const svgPath = filteredArgs[1];

  if (!iconName || !svgPath) {
    console.error('Error: Missing required arguments\n');
    console.error('Usage: npm run add-icon <IconName> <path/to/icon.svg> [--force]');
    console.error('Example: npm run add-icon ArrowLeft ~/Desktop/arrow-left.svg\n');
    console.error('Note: Icon name must be in PascalCase format');
    console.error('      Use --force to overwrite existing icons');
    return 1;
  }

  try {
    await copyIconFiles(iconName, svgPath, forceFlag);
    return 0;
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : String(error));
    return 1;
  }
}

main().then((exitCode) => process.exit(exitCode));

export { copyIconFiles, updateFileContent };
