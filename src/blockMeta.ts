import { Debug } from "./debug";

const debug = Debug("v-press-plus");

export interface IBlockMeta {
  /** the HTML element tag name */
  tag: string;
  tagProps: Record<string, string>;
  /**
   * a block component has _opted-in_ as a "md-block" component (either in
   * the HTML or as part of the configuration)
   */
  isMdBlock: boolean;
  /**
   * a template tag in the interior of a VueJS component which has opted into
   * having it's slot be Markdown
   */
  isMdSlot: boolean;
  /** the content existing in the interior of a block component */
  interior: string;
  /** the string representing the closing tag */
  closure: string;

  warning?: string;
}

/**
 * **blockMeta**
 *
 * Given a block of HTML, this function will return meta information
 *
 * @param src
 * @param blockComponents a list of components that should always be setup
 * as a block element
 */
export function blockMeta(src: string, blockComponents: string[] = []) {
  const dasherizedComponent = /^<([a-z|0-9|-]+)([^\0]*?)>([^\0]*?)(<\/\1[^\0]*?>)/gs;
  const findFlags = /\s*(\w+)="(.*?)"/gs;
  const blocks = [...src.matchAll(dasherizedComponent)].reduce((acc, i) => {
    const tag = i[1];
    const flags = i[2]
      .replace(/\s*[\w:]+?=".*?"/g, "")
      .split(/\s+/)
      .filter((f) => f)
      .map((f) => ["flag", f, undefined]);

    const propsAndFlags = [...i[2].matchAll(findFlags), ...flags];
    const tagProps: Record<string, string> = propsAndFlags.reduce((props, p) => {
      const [, key, value] = p;
      if (key) {
        props[key] = value === undefined ? "" : value;
      }
      return props;
    }, {} as Record<string, string>);

    const meta: IBlockMeta = {
      tag,
      tagProps,
      isMdBlock: Object.keys(tagProps).includes("md-block") || blockComponents.includes(tag),
      isMdSlot: tag === "template" && Object.keys(tagProps).includes("md-slot"),
      interior: i[3],
      closure: i[4],
    };
    acc.push(meta);

    return acc;
  }, [] as IBlockMeta[]);

  if (blocks.length > 1) {
    console.warn(
      `the blockMeta function returned more than one block [${blocks.length}], it should not.`
    );
    debug(`blockMeta ended with ${blocks.length} blocks instead of the expected 1:`, { blocks });
  }

  return blocks[0];
}
