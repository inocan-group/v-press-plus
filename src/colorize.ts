const RESET_FG = `\u001b[39m`;
const RESET_BG = `\u001b[49m`;

const COLOR: Record<string, [ fg: number, bg: number ]> = {
  black: [30, 40],
  red: [31,41],
  magenta: [35, 45],
  yellow: [33, 43],
  green: [32, 42],

  brightRed: [91, 40],
  brightGreen: [92, 42],
  brightYellow: [93, 43]
};

export type Color =  keyof typeof COLOR;
export type ColorConfigurator = (color: typeof COLOR) => [fg: number, bg: number]

type ColorFormatter = (text?: string, bg?: ColorConfigurator) => string;

function paint(text: string = '', fg: ColorConfigurator, bg?: ColorConfigurator) {
  const foreground = "\u001b[" + fg(COLOR)[0] + "m";
  const bgc = bg ? bg(COLOR)[1] : null;
  const background = bgc ? "\u001b[" + bgc + "m" : "";
  const reset = background ? `${RESET_FG}${RESET_BG}` : `${RESET_FG}`;
  return `${RESET_FG}${foreground}${background}${text}${reset}`;
}

export const color: Record<string, ColorFormatter> = {
  red: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, c => c.red, bg );
  },
  magenta: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, c => c.magenta, bg );
  },
  black: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, c => c.black, bg );
  },
  yellow: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, c => c.yellow, bg );
  },
  green: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, c => c.green, bg );
  },

  brightRed: (text: string = "", bg?: ColorConfigurator) => {
    return paint(text, c => c.brightRed, bg );
  },
}

export function italicize(text: string = "") {
  return `\u001b[3m${text}\u001b[0m`
}

export function underline(text: string = "") {
  return `\u001b[4m${text}\u001b[0m`
}

export function strikethrough(text: string = "") {
  return `\u001b[9m${text}\u001b[0m`
}

function replace(find: string, corpus: string, formatting: IFormattingOptions, global: boolean = true) {
  const re = new RegExp(find, global ? 'gs' : 's');
  let replacement = find;
  if(formatting.color) replacement = paint(replacement, formatting.color, formatting.bg);

  if(formatting.italics) replacement = italicize(replacement);
  if(formatting.underline) replacement = underline(replacement);
  if(formatting.strikeThrough) replacement = strikethrough(replacement);

  return corpus.replace(re, replacement)
}

export interface IFormattingOptions {
  color?: ColorConfigurator;
  bg?: ColorConfigurator;
  italics?: true;
  underline?: true;
  strikeThrough?: true;
}

export type FluentOneUse<
  TApi extends Record<string, any>, 
  TOneUse extends string
> = TOneUse extends string ? Omit<TApi, TOneUse> : TApi;


/**
 * Defines a Fluent API, types are (in order):
 * 
 * - `TFluent`: the _fns_ on the API which return the Fluent API after modifying state
 * - `TExits`: the _functions_ on the API which _exit_ the Fluent interface
 * - `TProps`: the read-only _properties_ on the API; default is _false_ indicating none
 * - `TOneUse`: the prop names of the Fluent API which should be removed from the API once used once; default is _false_ indicating none
 */
export type FluentApi<
  TFluent extends Record<string, (...args: any[]) => unknown>, 
  TExits extends Record<string, (...args: any[]) => any>, 
  TProps extends (Record<string, Readonly<any>> | false) = false,
  TOneUse extends string & keyof TFluent = '',
  TExclude extends string = ''

> 
  = FluentOneUse<Pick<TFluent, TOneUse>, TExclude> & Omit<TFluent, TOneUse> & TExits & Readonly<TProps>;

/**
 * A fluent API design to replace a text block with a _formatted_ version
 */
export type IFormattingApi<X extends string = ''> = FluentApi<{
  /** Add a _foreground_ color for the text that matches */
  withColor: X extends 'withColor' ? never : (fg: ColorConfigurator) => IFormattingApi<X | 'withColor'>;
  withItalics: () => IFormattingApi<X | 'withItalics'>;
  withUnderline: () => IFormattingApi<X | 'withUnderline'>;
  withStrikethrough: () => IFormattingApi<X | 'withStrikethrough'>;

  /** Add a _background_ color for the text that matches */
  withBackground: (bg: ColorConfigurator) => unknown;
}, {
  /** provide the _corpus_ of text to search through */
  in: (corpus: string) => string;
}, {
  config: IFormattingOptions
}, 'withColor' | 'withItalics' | 'withBackground' | 'withStrikethrough' | 'withUnderline'>



// type tt<T extends string> = { foo: T extends 'foo' ? string : never }


const formattingApi = <X extends string >(find: string, global: boolean, config: IFormattingOptions): IFormattingApi<X> => {

  const api = {
    withColor: (fg: ColorConfigurator) => {
      return formattingApi<X | 'withColor'>(find, global, {...config, color: fg})
    },
    withItalics: () => {
      return formattingApi<X | 'withItalics'>(find, global, {...config, italics: true});
    },
    withUnderline: () => {
      return formattingApi<X | 'withUnderline'>(find, global, {...config, underline: true});
    },
    withStrikethrough: () => {
      return formattingApi<X | 'withStrikethrough'>(find, global,{...config, strikeThrough: true});
    },
    withBackground: (bg: ColorConfigurator) => {
      return formattingApi<X | 'withBackground'>(find, global, {...config, bg});
    },
    in: (corpus: string) => {
      return replace(find, corpus, config, global);
    },
    config
  } as IFormattingApi<any> as unknown as IFormattingApi<X>;

  return api;
}

/**
 * Look through a _corpus_ of text for a particular string and
 * then format for the console.
 */
export function format(find: string, global: boolean = true) {
  let config: IFormattingOptions = {};
  
  return formattingApi<'in'>(find, global, config);
}