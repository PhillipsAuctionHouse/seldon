import vars from '#scss/_vars.scss?raw';

// This function parses the _vars.scss file into individual lines and returns the value of the variable passed in
// If the variable is not found, it returns the default value passed in
export const getScssVar = (scssVar: string, defaultValue: string): string => {
  const parsedVars = vars.split('\n');
  const colorIndex = parsedVars.findIndex((_var) => _var.includes(scssVar));

  if (scssVar && colorIndex > -1) {
    const parsedColorValue = parsedVars[colorIndex].split(': ')[1].replace(';', '');
    return parsedColorValue;
  }

  // Passed in the default, but still couldn't find the value. Just return ''
  if (scssVar === defaultValue && colorIndex === -1) {
    return '';
  }

  return getScssVar(defaultValue, defaultValue);
};
