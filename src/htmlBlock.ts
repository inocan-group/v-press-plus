import StateBlock from 'markdown-it/lib/rules_block/state_block';
import { dasherize } from 'native-dash';
import { addSlotBasedTokens } from './addSlotBasedTokens';
import { addToken } from './addToken';
import { blockMeta } from './blockMeta';
import { calcLineNumber } from './calcLineNumber';
import { Debug } from './debug';
import { blockNames, END_TAG, HTML_SEQUENCES } from './patterns';
import { validStartBlock } from './validStartBlock';

let debug = Debug('v-press-plus:htmlBlock');

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
export const htmlBlock = (...components: string[]) => {
  if (components && components.length > 0) {
    components = components.map(c => dasherize(c));
    debug('the following VueJS components will be treated as BLOCK elements: ', components);
  } else {
    debug(
      'no VueJS components were registered to be treated as BLOCK elements; you may add the "md-block" property to a component to make it become a block element.',
    );
  }
  return (state: StateBlock, startLine: number, endLine: number, silent: boolean): boolean => {
    let i, nextLine, lineText;
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    /** the content block starting at the `pos` */
    const contentBlock = state.src.slice(pos);
    lineText = state.src.slice(pos, max);
    debug('evaluating', { src: state.src.slice(pos, max), pos, max });

    if (END_TAG.test(contentBlock)) {
      debug(`returning false for bare end tag:`, contentBlock);
      return false;
    }

    if (!state.md.options.html) {
      debug(`returning false due to markdown options`, contentBlock);
      return false;
    }
    if (state.src.charCodeAt(pos) !== 0x3c /* < */) {
      debug(`returning false as block doesn't start with "<": `, lineText);
      return false;
    }

    if (state.sCount[startLine] - state.blkIndent >= 4) {
      debug(
        `- returning false due to indentation [ ${state.sCount[startLine]}, ${state.blkIndent} ]; if it's indented more than 3 spaces, it should be a code block.`,
      );
      return false;
    }

    const meta = blockMeta(contentBlock, components);

    if (meta) {
      debug(`processing "${meta.tag}":\n${JSON.stringify(meta, null, 2)}`);

      // if tag is BLOCK content
      if ([...components, ...blockNames].includes(meta.tag) || meta.isMdBlock) {
        const endLine = calcLineNumber(meta.closure, contentBlock, startLine);
        debug(`${meta.tag} is a BLOCK element [ ${startLine}, ${endLine} ]`);

        return meta.interior.includes('md-slot')
          ? addSlotBasedTokens(state, meta, contentBlock, startLine, endLine)
          : addToken(state, startLine, endLine);
      } else {
        debug(
          `- ${meta.tag} is an INLINE element [ ${startLine}, ${endLine} ] so returning false to prevent block rule`,
        );
        return false;
      }
    }

    debug(`processing unknown [no meta]: `, contentBlock);

    // return false if no start block found
    if (!validStartBlock(lineText, silent)) return false;

    for (i = 0; i < HTML_SEQUENCES.length; i++) {
      if (HTML_SEQUENCES[i][0].test(lineText)) {
        break;
      }
    }
    if (i === HTML_SEQUENCES.length) {
      return false;
    }
    if (silent) {
      // true if this sequence can be a terminator, false otherwise
      return HTML_SEQUENCES[i][2];
    }
    nextLine = startLine + 1;

    // move down lines until end block is found
    if (!HTML_SEQUENCES[i][1].test(lineText)) {
      for (; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }

        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        lineText = state.src.slice(pos, max);

        if (HTML_SEQUENCES[i][1].test(lineText)) {
          if (lineText.length !== 0) {
            debug(`skipping a line as line text empty in "${meta.tag}"`);
            nextLine++;
          }
          break;
        }
      }
    }

    debug(`adding token to "${meta ? meta.tag : contentBlock}" [ ${startLine} -> ${nextLine} ], ending: ${lineText} ]`);
    addToken(state, startLine, nextLine);
    return true;
  };
};
