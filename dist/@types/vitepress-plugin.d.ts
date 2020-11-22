import type MarkdownIt from 'markdown-it';
import { htmlBlock } from './htmlBlock';
/**
 * Provides a one-for-one replacement of the _markdown_ config
 * option made available in the `config.js` file for Vitepress.
 *
 * `docs/.vitepress/config.js`
 * ```js
 * const markdown = require('v-press-plus').markdown;
 * module.exports = {
 *    // ...
 *    markdown,
 * }
 * ```
 *
 * **Note:** *if you want to pre-register your VueJS components, or you
 * have other things you want to do with the markdown configuration
 * beyond this plugin, then you should  use the `htmlBlock`
 * symbol instead.*
 */
declare const markdown: {
    config: (md: MarkdownIt) => void;
};
export { htmlBlock, markdown };
