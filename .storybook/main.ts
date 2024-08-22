import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    defaultName: "Overview", 
  },
  viteFinal: (config) => {
    if (config && config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '#scss': path.resolve(__dirname, '../src/scss/'),
        '../fonts': path.resolve(__dirname, '../public/fonts/'),
      };
    }
    return {
      ...config,
    };
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // Allow us to extend an underlying HTML Elements attributes in our Typescript types, but not have those inherited props show up in our story
      // For example: const MyComponent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ()...
      // https://github.com/styleguidist/react-docgen-typescript?tab=readme-ov-file#propfilter
      propFilter:  (prop) => {
        if (prop.declarations !== undefined && prop.declarations.length > 0) {
          const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
            return !declaration.fileName.includes("node_modules");
          });
    
          return Boolean(hasPropAdditionalDescription);
        }
    
        return true;
      },
    },
  },
};
export default config;
