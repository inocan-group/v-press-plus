import StateBlock from 'markdown-it/lib/rules_block/state_block';
/**
 * **htmlBlock**
 *
 * Provides an extension to the default `htmlBlock` rule that Vitepress
 * provides which is able to better handle embedding VueJS components
 * into a Markdown page.
 *
 * @param components an array of component names -- using
 * PascalCase --which have been registered with Vitepress where the user
 * would like to _always_ have the component treated as a Block element
 * and thereby it's internal content (aka, where the slot definitions go)
 * will _not_ be processed by
 *
 * @returns a value of `false` indicates that the block is
 * _not_ considered a Block element in the DOM and therefore the the
 * rule should not be applied. The value of `true` ensures the rule is
 * applied.
 */
export declare const htmlBlock: (...components: string[]) => (state: StateBlock, startLine: number, endLine: number, silent: boolean) => boolean;
