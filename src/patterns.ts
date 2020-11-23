import { HTML_OPEN_CLOSE_TAG_RE } from "markdown-it/lib/common/html_re";
import blockNames from "markdown-it/lib/common/html_blocks";

export { HTML_OPEN_CLOSE_TAG_RE, blockNames };

/**
 * Block patterns to pick up components start tag and use
 * RegEx pattern matching so that the end tag can be constructed.
 */
export const HTML_BLOCK_PATTERNS: [open: RegExp, close: RegExp, outcome: boolean][] = [
  // dasherized component with block syntax
  [/^<([a-z]+[a-z|0-9|-]*)[\w|-|\s]*?>/, /___DO NOT FIND__/, true],
  // PascalCased component with block syntax
  [/^<([A-Z]+[a-z|A-Z|0-9]*)[\w|-|\s]*?>/, /___DO NOT FIND__/, true],
];

export const END_TAG = /^<\/\w+/s;

// An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
export const HTML_SEQUENCES: [open: RegExp, close: RegExp, outcome: boolean][] = [
  [/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true],
  [/^<!--/, /-->/, true],
  [/^<\?/, /\?>/, true],
  [/^<![A-Z]/, />/, true],
  [/^<!\[CDATA\[/, /\]\]>/, true],
  // PascalCase Components
  [/^<[A-Z]/, />/, true],
  // inline custom elements with hyphens
  [/^<\w+\-/, />/, true],
  ...HTML_BLOCK_PATTERNS,
  [new RegExp("^</?(" + blockNames.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true],
  [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, false],
];
