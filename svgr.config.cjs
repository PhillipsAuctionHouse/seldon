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
      title?: string;
      titleId?: string;
    }
    ${'\n'}
    const ${componentName} = memo(forwardRef((props: ${propsName}, ref: Ref<SVGSVGElement>) => {
      const { color, height, width, title: propsTitle, titleId: propsTitleId } = props;
      const title = propsTitle || '${componentName}';
      const titleId = propsTitleId || kebabCase(title);
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
