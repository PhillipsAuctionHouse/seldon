import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path constants
const ICON_TEMPLATE_DIR = path.join(__dirname, '..', 'Icon');
const FORMATTED_ICONS_DIR = path.join(__dirname, '../../src/assets/formatted');
const SVG_SOURCE_DIR = path.join(__dirname, '../../src/assets');
const TEMPLATE_FILE = 'IconName.tsx';

// Regex patterns
const PASCAL_CASE_REGEX = /^[A-Z][a-zA-Z0-9]*$/;
const KEBAB_CASE_REGEX = /\s([a-z]+)-([a-z]+)=/gi;
const SVG_TAG_REGEX = /<svg[^>]*>([\s\S]*)<\/svg>/i;
const VIEWBOX_REGEX = /<svg[^>]*viewBox=/i;
const HARDCODED_COLOR_REGEX = /fill=["'](?!none)(?!currentColor)#[0-9a-fA-F]{3,6}["']/i;
const FILL_ATTRIBUTE_REGEX = /fill\s*=/i;

// SVG elements to process
const SVG_ELEMENTS = ['path', 'circle', 'rect', 'polygon', 'ellipse', 'line', 'polyline'] as const;

/**
 * Formats an error message consistently
 */
function formatError(message: string, error?: unknown): string {
  const errorMsg = error instanceof Error ? error.message : String(error);
  return error ? `${message}: ${errorMsg}` : message;
}

/**
 * Checks if a file exists
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
 * Validates icon name and file paths
 */
async function validateInputs(
  iconName: string,
  svgFilePath: string,
  targetFile: string,
  force: boolean,
): Promise<void> {
  if (!PASCAL_CASE_REGEX.test(iconName)) {
    throw new Error(`Icon name "${iconName}" must be in PascalCase format (e.g., ArrowLeft, CheckCircle)`);
  }

  if ((await fileExists(targetFile)) && !force) {
    throw new Error(`Icon "${iconName}" already exists. Use --force to overwrite.`);
  }

  if (!(await fileExists(svgFilePath))) {
    throw new Error(`SVG file not found: ${svgFilePath}`);
  }
}

/**
 * Extracts SVG content between tags
 */
function extractSvgContent(svgFileContent: string): string {
  const match = svgFileContent.match(SVG_TAG_REGEX);
  if (!match?.[1]) {
    throw new Error('Invalid SVG file: could not parse SVG content');
  }
  return match[1];
}

/**
 * Validates SVG content and logs warnings
 */
function validateAndWarnSvg(svgContent: string, svgInnerContent: string): void {
  if (!svgContent.includes('<svg')) {
    throw new Error('Invalid SVG file: missing <svg> tag');
  }

  if (!VIEWBOX_REGEX.test(svgContent)) {
    console.warn('⚠️  Warning: SVG missing viewBox attribute. This may cause scaling issues.');
  }

  if (HARDCODED_COLOR_REGEX.test(svgInnerContent)) {
    console.warn('⚠️  Warning: SVG contains hardcoded fill colors. These may override the dynamic color prop.');
  }
}

/**
 * Adds fill={color} to SVG elements without a fill attribute
 */
function addFillToElements(svgContent: string): string {
  let result = svgContent;
  SVG_ELEMENTS.forEach((element) => {
    result = result.replace(new RegExp(`<${element}\\s+([^>]*?)(\\/??)>`, 'gi'), (match, attributes, selfClosing) => {
      if (FILL_ATTRIBUTE_REGEX.test(attributes)) return match;
      return `<${element} ${attributes.trim()} fill={color}${selfClosing}>`;
    });
  });
  return result;
}

/**
 * Converts kebab-case attributes to camelCase
 */
function kebabToCamelCase(content: string): string {
  return content.replace(KEBAB_CASE_REGEX, (_, p1, p2) => ` ${p1}${p2.charAt(0).toUpperCase()}${p2.slice(1)}=`);
}

/**
 * Converts SVG content to React-compatible TSX format
 */
function convertToTsx(svgContent: string): string {
  const withFill = addFillToElements(svgContent);
  return kebabToCamelCase(withFill);
}

/**
 * Reads and processes SVG file
 */
async function processSvgFile(svgFilePath: string): Promise<string> {
  const svgContent = await fs.promises.readFile(svgFilePath, 'utf-8');
  const svgInner = extractSvgContent(svgContent);
  validateAndWarnSvg(svgContent, svgInner);
  return convertToTsx(svgInner) + '</svg>';
}

/**
 * Updates icon template with icon name and SVG content
 */
function updateTemplate(templateContent: string, iconName: string, svgContent: string): string {
  return templateContent
    .replace(/\/\/ /g, ' ')
    .replace(/IconName/g, iconName)
    .replace('SVGRest', svgContent);
}

/**
 * Updates index file with new icon export
 */
function updateIndexContent(existingContent: string, iconName: string): string {
  const exportStatement = `export { default as ${iconName} } from './${iconName}';`;
  const lines = existingContent.split('\n').filter((line) => line.trim());
  if (!lines.includes(exportStatement)) {
    lines.push(exportStatement);
  }
  return lines.sort().join('\n') + '\n';
}

/**
 * Formats files with Prettier
 */
async function formatFiles(targetFile: string, indexPath: string, svgTargetFile: string): Promise<void> {
  try {
    await execAsync(`npx prettier --write "${targetFile}" "${indexPath}"`);
    await execAsync(`npx prettier --write --parser html "${svgTargetFile}"`);
  } catch (error) {
    console.warn('Warning: Prettier formatting failed:', error instanceof Error ? error.message : String(error));
  }
}

/**
 * Creates icon files from SVG
 */
async function copyIconFiles(iconName: string, svgFilePath: string, force = false): Promise<void> {
  const targetFile = path.join(FORMATTED_ICONS_DIR, `${iconName}.tsx`);
  const sourceFile = path.join(ICON_TEMPLATE_DIR, TEMPLATE_FILE);
  const indexPath = path.join(FORMATTED_ICONS_DIR, 'index.ts');
  const svgTargetFile = path.join(SVG_SOURCE_DIR, `${iconName}.svg`);

  // Validate inputs
  await validateInputs(iconName, svgFilePath, targetFile, force);

  if (!(await fileExists(sourceFile))) {
    throw new Error(`Icon template not found: ${sourceFile}`);
  }

  // Process SVG file
  const processedSvg = await processSvgFile(svgFilePath).catch((error) => {
    throw new Error(formatError('Failed to process SVG file', error));
  });

  // Read template and existing index
  const [templateContent, existingIndex] = await Promise.all([
    fs.promises.readFile(sourceFile, 'utf-8'),
    fileExists(indexPath).then((exists) => (exists ? fs.promises.readFile(indexPath, 'utf-8') : '')),
  ]);

  // Generate file contents
  const updatedTemplate = updateTemplate(templateContent, iconName, processedSvg);
  const updatedIndex = updateIndexContent(existingIndex, iconName);

  // Ensure directory exists and write files
  await fs.promises.mkdir(FORMATTED_ICONS_DIR, { recursive: true });
  await Promise.all([
    fs.promises.writeFile(targetFile, updatedTemplate),
    fs.promises.writeFile(indexPath, updatedIndex),
    fs.promises.copyFile(svgFilePath, svgTargetFile),
  ]);

  // Format with prettier
  await formatFiles(targetFile, indexPath, svgTargetFile);

  console.log(`✓ Icon files created successfully for ${iconName}:`);
  console.log(`  - ${targetFile}`);
  console.log(`  - ${svgTargetFile}`);
  console.log(`  - ${indexPath} (updated)`);
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

export { copyIconFiles };
