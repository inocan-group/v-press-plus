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
export declare function blockMeta(src: string, blockComponents?: string[]): IBlockMeta;
