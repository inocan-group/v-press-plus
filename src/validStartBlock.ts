import { Debug } from "./debug";
import { HTML_SEQUENCES } from "./patterns";

const debug = Debug("markdown:start-block");

export function validStartBlock(lineText: string, silent: boolean) {
  let i;
  for (i = 0; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) {
      debug(`${HTML_SEQUENCES[i][0].toString()} passed with ${lineText}`);
      return true;
    }
  }
  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return HTML_SEQUENCES[i][2];
  }

  return true;
}
