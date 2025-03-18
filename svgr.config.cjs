module.exports = {
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  ref: true,
  jsxRuntime: 'automatic',
  svgProps: {
    height: '{props.height}',
    width: '{props.width}',
  },
  ext: 'jsx',
};
