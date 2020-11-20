import { calcTemplateBlock } from "./calcTemplateBlock";
import { IBlockMeta } from "./blockMeta";
import { addToken } from "./addToken";
import StateBlock from "markdown-it/lib/rules_block/state_block";
import { Debug } from "./debug";

let debug = Debug("markdown:slot-tokens");

export function addSlotBasedTokens(
  state: StateBlock,
  meta: IBlockMeta,
  contentBlock: string,
  startLine: number,
  endLine: number
) {
  const mdSlotOpenTag = [...meta.interior.matchAll(/<template.*?[^/]>/gs)]
    .map((i) => i[0])
    .filter((i) => i.includes("md-slot"));

  debug(`this tag's interior does have "md-slot" content`);
  debug(`there are ${mdSlotOpenTag.length} template tags with md-slot set`);

  let lineNumbers = mdSlotOpenTag.reduce((acc, slotTag) => {
    acc.push(calcTemplateBlock(contentBlock, slotTag, startLine));
    return acc;
  }, [] as [number, number][]);
  debug("line number boundaries for md-slot tags:", lineNumbers);

  let sl = startLine;
  lineNumbers.forEach((ln, idx) => {
    const [start, end] = ln;
    addToken(state, sl, start - 1);
    debug(`added block token from ${sl} to ${start - 1}`);
    if (idx === lineNumbers.length - 1) {
      addToken(state, end + 1, endLine);
      debug(`added block token from ${end + 1} to ${endLine}; to close out md-slots`);
    }
    sl = end + 1;
  });
}
