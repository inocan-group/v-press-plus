import StateBlock from "markdown-it/lib/rules_block/state_block";

/**
 * Adds a new _token_ to **markdown-it**'s `StateBlock`
 */
export function addToken(state: StateBlock, startLine: number, nextLine: number) {
  state.line = nextLine;
  const token = state.push("html_block", "", 0);
  token.map = [startLine, nextLine];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
}
