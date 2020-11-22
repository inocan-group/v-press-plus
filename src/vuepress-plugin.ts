import MarkdownIt from 'markdown-it';
import { htmlBlock } from './htmlBlock';

interface IVuepressPlugin {
  ready?: () => Promise<void>;
  updated?: () => Promise<void>;
  generated?: () => Promise<void>;

  name: string;
  extendMarkdown?: (md: MarkdownIt) => void;
}

// interface IVuepressContext {
//   isProd: boolean;
//   pages: Record<string, unknown>[];
//   sourceDir: string;
//   tempPath: string;
//   outDir: string;
//   base: string;
//   writeTemp: Function;
// }

export default (
  options: Record<'components', string[]> = { components: [] },
  // ctx: IVuepressContext,
): IVuepressPlugin => {
  console.error('registering vuepress PLUGIN', options);
  const markdown = htmlBlock();

  return {
    name: 'v-press-plus',
    extendMarkdown: md => {
      md.block.ruler.at('html_block', markdown);
    },
  };
};
