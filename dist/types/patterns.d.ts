import { HTML_OPEN_CLOSE_TAG_RE } from "markdown-it/lib/common/html_re";
import blockNames from "markdown-it/lib/common/html_blocks";
export { HTML_OPEN_CLOSE_TAG_RE, blockNames };
/**
 * Block patterns to pick up components start tag and use
 * RegEx pattern matching so that the end tag can be constructed.
 */
export declare const HTML_BLOCK_PATTERNS: [open: RegExp, close: RegExp, outcome: boolean][];
export declare const END_TAG: RegExp;
export declare const HTML_SEQUENCES: [open: RegExp, close: RegExp, outcome: boolean][];
