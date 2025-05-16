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
    const { jsx } = variables;
    const componentName = variables.componentName.replace(/^Svg/, '');
    const propsName = `${componentName}Props`;

    return tpl`
      import { forwardRef, memo } from 'react';
      import { kebabCase } from 'change-case';
      ${'\n'}
      interface ${propsName} extends React.HTMLAttributes<SVGSVGElement>{
        color?: string;
        height?: number | string;
        width?: number | string;
        title?: string;
        titleId?: string;
      }
      ${'\n'}
      const ${componentName} = memo(forwardRef<SVGSVGElement, ${propsName}>((props, ref) => {
        const { color, height, width, title, titleId: propsTitleId } = props;
        const titleId = propsTitleId || kebabCase(title || '');
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
