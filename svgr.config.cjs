module.exports = {
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  jsxRuntime: 'automatic',
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'prefixIds',
    ],
  },
  ref: true,
  dimensions: false,
  memo: true,
  titleProp: true,
  prettier: true,
  typescript: true,
  replaceAttrValues: {
    '#000': '{color}',
  },
  svgProps: {
    height: '{height}',
    width: '{width}',
    role: 'img',
  },
  template: (variables, { tpl }) => {
    const { componentName, jsx } = variables;
    const propsName = `${componentName}Props`;

    return tpl`
    import { Ref, forwardRef, memo } from 'react';
    import { kebabCase } from 'change-case';
    ${'\n'}
    interface ${propsName} {
      color?: string;
      height?: number | string;
      width?: number | string;
    }
    ${'\n'}
    const ${componentName} = memo(forwardRef((props: ${propsName}, ref: Ref<SVGSVGElement>) => {
      const { color, height, width } = props;
      const title = '${componentName}';
      const titleId = kebabCase(title);
      ${'\n'}
      return (
        ${jsx}
      );
    }));
    ${'\n'}
    export default ${componentName};
    `;
  },
};
