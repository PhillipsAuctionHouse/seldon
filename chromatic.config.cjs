// chromatic.config.js
module.exports = {
  autoAcceptChanges: 'main',
  apiKey: process.env.CHROMATIC_PROJECT_TOKEN,
  buildScriptName: 'build:storybook',
  exitZeroOnChanges: true,
};
