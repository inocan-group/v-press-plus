declare const COLOR: Record<string, [fg: number, bg: number]>;
export declare type Color = keyof typeof COLOR;
export declare type ColorConfig = (color: typeof COLOR) => [fg: number, bg: number];
export declare type OptColorConfig = Color | null;
declare type ColorFormatter = (text?: string, bg?: ColorConfig) => string;
export declare const color: Record<string, ColorFormatter>;
export declare function italicize(text?: string): string;
export declare function underline(text?: string): string;
export declare function strikethrough(text?: string): string;
export interface IFormattingOptions {
    color?: ColorConfig;
    bg?: ColorConfig;
    italics?: true;
    underline?: true;
    strikeThrough?: true;
}
export interface IFormattingApi {
    withColor: (fg: ColorConfig) => IFormattingApi;
    withItalics: () => IFormattingApi;
    withUnderline: () => IFormattingApi;
    withStrikethrough: () => IFormattingApi;
    in: (corpus: string) => string;
    withBackground: (bg: ColorConfig) => IFormattingApi;
}
export declare type IFormatting = <T extends string[]>(omit: T) => (find: string, config: IFormattingOptions, global: boolean) => any;
/**
 * Look through a _corpus_ of text for a particular string and
 * then format for the console.
 */
export declare function format(find: string, global?: boolean): IFormattingApi;
export {};
