const { path } = require('@vuepress/shared-utils');
const fs = require('fs');
const pluginPath = path.resolve('dist/cjs/index.js');
const vPressPlus = require(pluginPath);
fs.writeFileSync(
  path.join(process.cwd(), 'plugin.txt'),
  `Plugin path is: "${pluginPath}", import is: ${vPressPlus.toString()}, typeof is ${typeof vPressPlus}\n`,
);

module.exports = {
  title: 'v-press-plus',
  description: 'Better support for VueJS components in a Vuepress or Vitepress project',
  plugins: [vPressPlus],
  themeConfig: {
    nav: [
      {
        text: 'Resources',
        link: '/resources/',
      },
    ],
    sidebar: 'auto',
  },
  alias: {
    '/@/': path.resolve(__dirname, '../../lib/cjs'),
  },
};
