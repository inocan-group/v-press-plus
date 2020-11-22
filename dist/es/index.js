/**
 * Produces a _dasherized_ version of a passed in string by:
 *
 * 1. Replacing all interior whitespace with a dash
 * 2. Replacing capitalized letters with a dash followed by the lowercase variant.
 * 3. Replace underscores with dashes
 * 4. Ensuring that duplicate dashes are removed and that non-whitespaced
 * characters are not dashes
 *
 * Note: does not impact exterior whitespace, e.g., `  myDash  ` is translated to `  my-dash  ` and leading and closing white space is not transformed.
 */
function dasherize(input) {
    const [_, preWhite, focus, postWhite] = /^(\s*)(.*?)(\s*)$/.exec(input);
    const replaceWhitespace = (i) => i.replace(/\s/gs, "-");
    const replaceUppercase = (i) => i.replace(/[A-Z]/g, (c) => `-${c[0].toLowerCase()}`);
    const replaceLeadingDash = (i) => i.replace(/^-/s, "");
    const replaceTrailingDash = (i) => i.replace(/-$/s, "");
    const replaceUnderscore = (i) => i.replace(/_/g, "-");
    const removeDupDashes = (i) => i.replace(/-+/g, "-");
    return `${preWhite}${replaceUnderscore(replaceTrailingDash(replaceLeadingDash(removeDupDashes(replaceWhitespace(replaceUppercase(focus))))))}${postWhite}`;
}

const RESET_FG = `\u001b[39m`;
const RESET_BG = `\u001b[49m`;
const COLOR = {
    black: [30, 40],
    red: [31, 41],
    magenta: [35, 45],
    yellow: [33, 43],
    green: [32, 42],
    brightRed: [91, 40],
    brightGreen: [92, 42],
    brightYellow: [93, 43]
};
function paint(text = '', fg, bg) {
    const foreground = "\u001b[" + fg(COLOR)[0] + "m";
    const bgc = bg ? bg(COLOR)[1] : null;
    const background = bgc ? "\u001b[" + bgc + "m" : "";
    const reset = background ? `${RESET_FG}${RESET_BG}` : `${RESET_FG}`;
    return `${RESET_FG}${foreground}${background}${text}${reset}`;
}
const color = {
    red: (text = "", bg) => {
        return paint(text, c => c.red, bg);
    },
    magenta: (text = "", bg) => {
        return paint(text, c => c.magenta, bg);
    },
    black: (text = "", bg) => {
        return paint(text, c => c.black, bg);
    },
    yellow: (text = "", bg) => {
        return paint(text, c => c.yellow, bg);
    },
    green: (text = "", bg) => {
        return paint(text, c => c.green, bg);
    },
    brightRed: (text = "", bg) => {
        return paint(text, c => c.brightRed, bg);
    },
};

function Debug(offset) {
    return (...args) => {
        var _a;
        const [type, subType] = [
            color.red(offset.split(':').slice(0, 1).pop()),
            color.magenta(offset.split(':').slice(1).join(':')),
        ];
        if ((_a = process.env.DEBUG) === null || _a === void 0 ? void 0 : _a.includes('v-press-plus')) {
            console.error(`${type}${color.yellow(':')}${subType}${color.yellow('->')} `, ...args);
        }
    };
}

let debug = Debug("v-press-plus:calcTemplateBlock");
/**
 * Identifies the start and end line numbers for a `<template> ... </template>` block
 */
function calcTemplateBlock(content, openTag, startLine) {
    const lines = content.split("\n");
    const start = lines.findIndex((l) => l.includes(openTag)) + startLine + 1;
    const end = lines.slice(start - startLine).findIndex((l) => l.includes("</template")) + start + 1;
    debug(`Evaluating template block: `, {
        lines: `${startLine} to ${startLine + lines.length}`,
        openTag,
        start,
        end,
    });
    return [start, end];
}

/**
 * Adds a new _token_ to **markdown-it**'s `StateBlock`
 */
function addToken(state, startLine, nextLine) {
    state.line = nextLine;
    const token = state.push('html_block', '', 0);
    token.map = [startLine, nextLine];
    token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
    return true;
}

let debug$1 = Debug('v-press-plus:slot-tokens');
function addSlotBasedTokens(state, meta, contentBlock, startLine, endLine) {
    const mdSlotOpenTag = [...meta.interior.matchAll(/<template.*?[^/]>/gs)]
        .map(i => i[0])
        .filter(i => i.includes('md-slot'));
    debug$1(`this tag's interior does have "md-slot" content`);
    debug$1(`there are ${mdSlotOpenTag.length} template tags with md-slot set`);
    let lineNumbers = mdSlotOpenTag.reduce((acc, slotTag) => {
        acc.push(calcTemplateBlock(contentBlock, slotTag, startLine));
        return acc;
    }, []);
    debug$1('line number boundaries for md-slot tags:', lineNumbers);
    let sl = startLine;
    lineNumbers.forEach((ln, idx) => {
        const [start, end] = ln;
        addToken(state, sl, start - 1);
        debug$1(`added block token from ${sl} to ${start - 1}`);
        if (idx === lineNumbers.length - 1) {
            addToken(state, end + 1, endLine);
            debug$1(`added block token from ${end + 1} to ${endLine}; to close out md-slots`);
        }
        sl = end + 1;
    });
    return true;
}

const debug$2 = Debug("v-press-plus");
/**
 * **blockMeta**
 *
 * Given a block of HTML, this function will return meta information
 *
 * @param src
 * @param blockComponents a list of components that should always be setup
 * as a block element
 */
function blockMeta(src, blockComponents = []) {
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
        const tagProps = propsAndFlags.reduce((props, p) => {
            const [, key, value] = p;
            if (key) {
                props[key] = value === undefined ? "" : value;
            }
            return props;
        }, {});
        const meta = {
            tag,
            tagProps,
            isMdBlock: Object.keys(tagProps).includes("md-block") || blockComponents.includes(tag),
            isMdSlot: tag === "template" && Object.keys(tagProps).includes("md-slot"),
            interior: i[3],
            closure: i[4],
        };
        acc.push(meta);
        return acc;
    }, []);
    if (blocks.length > 1) {
        console.warn(`the blockMeta function returned more than one block [${blocks.length}], it should not.`);
        debug$2(`blockMeta ended with ${blocks.length} blocks instead of the expected 1:`, { blocks });
    }
    return blocks[0];
}

/**
 * Calculates the line number where the passed in _tag_ can be found.
 *
 * @param tag     the tag/string you are looking for
 * @param content the corpus of what you are looking through
 * @param start   the starting line number
 */
function calcLineNumber(tag, content, start) {
    let done = false;
    const block = content.split("\n").reduce((acc, i) => {
        if (!i.includes(tag) && !done)
            acc.push(i);
        else
            done = true;
        return acc;
    }, []);
    return start + block.length + 1;
}

// Regexps to match html elements

var attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

var unquoted      = '[^"\'=<>`\\x00-\\x20]+';
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';

var attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

var attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

var open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

var close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var HTML_OPEN_CLOSE_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');
var HTML_OPEN_CLOSE_TAG_RE_1 = HTML_OPEN_CLOSE_TAG_RE;

// List of valid html blocks names, accorting to commonmark spec


var html_blocks = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'meta',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'source',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];

/**
 * Block patterns to pick up components start tag and use
 * RegEx pattern matching so that the end tag can be constructed.
 */
const HTML_BLOCK_PATTERNS = [
    // dasherized component with block syntax
    [/^<([a-z]+[a-z|0-9|-]*)[\w|-|\s]*?>/, /___DO NOT FIND__/, true],
    // PascalCased component with block syntax
    [/^<([A-Z]+[a-z|A-Z|0-9]*)[\w|-|\s]*?>/, /___DO NOT FIND__/, true],
];
const END_TAG = /^<\/\w+/s;
// An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
const HTML_SEQUENCES = [
    [/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true],
    [/^<!--/, /-->/, true],
    [/^<\?/, /\?>/, true],
    [/^<![A-Z]/, />/, true],
    [/^<!\[CDATA\[/, /\]\]>/, true],
    // PascalCase Components
    [/^<[A-Z]/, />/, true],
    // inline custom elements with hyphens
    [/^<\w+\-/, />/, true],
    [new RegExp("^</?(" + html_blocks.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true],
    ...HTML_BLOCK_PATTERNS,
    [new RegExp(HTML_OPEN_CLOSE_TAG_RE_1.source + "\\s*$"), /^$/, false],
];

const debug$3 = Debug("v-press-plus:start-block");
function validStartBlock(lineText, silent) {
    let i;
    for (i = 0; i < HTML_SEQUENCES.length; i++) {
        if (HTML_SEQUENCES[i][0].test(lineText)) {
            debug$3(`${HTML_SEQUENCES[i][0].toString()} passed with ${lineText}`);
            return true;
        }
    }
    if (silent) {
        // true if this sequence can be a terminator, false otherwise
        return HTML_SEQUENCES[i][2];
    }
    return true;
}

let debug$4 = Debug('v-press-plus:htmlBlock');
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
const htmlBlock = (...components) => {
    if (components && components.length > 0) {
        components = components.map(c => dasherize(c));
        debug$4('the following VueJS components will be treated as BLOCK elements: ', components);
    }
    else {
        debug$4('no VueJS components were registered to be treated as BLOCK elements; you may add the "md-block" property to a component to make it become a block element.');
    }
    return (state, startLine, endLine, silent) => {
        let i, nextLine, lineText;
        let pos = state.bMarks[startLine] + state.tShift[startLine];
        let max = state.eMarks[startLine];
        /** the content block starting at the `pos` */
        const contentBlock = state.src.slice(pos);
        lineText = state.src.slice(pos, max);
        debug$4('evaluating', { src: state.src.slice(pos, max), pos, max });
        if (END_TAG.test(contentBlock)) {
            debug$4(`returning false for bare end tag:`, contentBlock);
            return false;
        }
        if (!state.md.options.html) {
            debug$4(`returning false due to markdown options`, contentBlock);
            return false;
        }
        if (state.src.charCodeAt(pos) !== 0x3c /* < */) {
            debug$4(`returning false as block doesn't start with "<": `, lineText);
            return false;
        }
        if (state.sCount[startLine] - state.blkIndent >= 4) {
            debug$4(`- returning false due to indentation [ ${state.sCount[startLine]}, ${state.blkIndent} ]; if it's indented more than 3 spaces, it should be a code block.`);
            return false;
        }
        const meta = blockMeta(contentBlock, components);
        if (meta) {
            debug$4(`processing "${meta.tag}":\n${JSON.stringify(meta, null, 2)}`);
            // if tag is BLOCK content
            if ([...components, ...html_blocks].includes(meta.tag) || meta.isMdBlock) {
                const endLine = calcLineNumber(meta.closure, contentBlock, startLine);
                debug$4(`${meta.tag} is a BLOCK element [ ${startLine}, ${endLine} ]`);
                return meta.interior.includes('md-slot')
                    ? addSlotBasedTokens(state, meta, contentBlock, startLine, endLine)
                    : addToken(state, startLine, endLine);
            }
            else {
                debug$4(`- ${meta.tag} is an INLINE element [ ${startLine}, ${endLine} ] so returning false to prevent block rule`);
                return false;
            }
        }
        debug$4(`processing unknown [no meta]: `, contentBlock);
        // return false if no start block found
        if (!validStartBlock(lineText, silent))
            return false;
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
                        debug$4(`skipping a line as line text empty in "${meta.tag}"`);
                        nextLine++;
                    }
                    break;
                }
            }
        }
        debug$4(`adding token to "${meta ? meta.tag : contentBlock}" [ ${startLine} -> ${nextLine} ], ending: ${lineText} ]`);
        addToken(state, startLine, nextLine);
        return true;
    };
};

export { htmlBlock as vPressPlug };
