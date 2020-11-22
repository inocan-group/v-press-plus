import MarkdownIt from 'markdown-it';
interface IVuepressPlugin {
    ready?: () => Promise<void>;
    updated?: () => Promise<void>;
    generated?: () => Promise<void>;
    name: string;
    extendMarkdown?: (md: MarkdownIt) => void;
}
declare const _default: (options?: Record<'components', string[]>) => IVuepressPlugin;
export default _default;
