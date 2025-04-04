import vars from '#scss/_vars.scss?raw';

export const getScssVarsMap = () => {
  const parsedVars = vars.split('\n').map((_var) => {
    const [name, value] = _var.split(': ');
    return { name, value: value?.replace(';', '') };
  });
  const scssVarsMap: Record<string, string> = {};

  parsedVars.forEach(({ name, value }) => {
    if (name && value) {
      scssVarsMap[name] = value;
    }
  });
  return scssVarsMap;
};

// This function parses the _vars.scss file into individual lines and returns the value of the variable passed in
// If the variable is not found, it returns the default value passed in
export const getScssVar = (scssVar: string, defaultValue: string): string => {
  const varsMap = getScssVarsMap();
  return varsMap[scssVar] ?? varsMap[defaultValue] ?? defaultValue;
};

// Finds all color variables set in _vars.scss and returns the name of each
export const getScssColors = (): string[] => {
  const parsedVars = vars.replace(/\r/g, '').split('\n');

  const colors: string[] = parsedVars
    .map((_var) => {
      const [name, value] = _var.split(': ');
      if (!!name && !!value && value.startsWith('#') && value.length === 8) {
        return name; // returning only the name of each color variable
      }
      return null;
    })
    .filter((color): color is string => color !== null);

  return colors;
};
