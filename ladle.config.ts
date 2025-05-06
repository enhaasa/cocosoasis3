import { resolve } from 'path';

const config = {
  stories: './src/**/*.stories.@(ts|tsx)',
  preview: resolve(__dirname, './ladle/preview.tsx'),
};

export default config;
