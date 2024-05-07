import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: "Overview"
  },
  viteFinal: (config) => {
    if (config && config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '#scss': path.resolve(__dirname, '../src/scss/'),
      };
    }
    return {
      ...config,
    };
  },
  typescript: {
    reactDocgen: 'react-docgen',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      propFilter: () => true,
    },
  },
};
export default config;
