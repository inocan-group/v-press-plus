import MarkdownIt from 'markdown-it';
interface IVuepressPlugin {
    ready?: () => Promise<void>;
    updated?: () => Promise<void>;
    generated?: () => Promise<void>;
    name: string;
    extendMarkdown?: (md: MarkdownIt) => void;
}
interface IVuepressContext {
    isProd: boolean;
    pages: Record<string, unknown>[];
    sourceDir: string;
    tempPath: string;
    outDir: string;
    base: string;
    writeTemp: Function;
}
declare const _default: (options: Record<"components", string[]> | undefined, ctx: IVuepressContext) => IVuepressPlugin;
export default _default;
