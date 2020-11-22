'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");$jscomp.TRUST_ES6_POLYFILLS=!$jscomp.ISOLATE_POLYFILLS||$jscomp.IS_SYMBOL_NATIVE;$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};
$jscomp.polyfill=function(a,b,c,d){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,d):$jscomp.polyfillUnisolated(a,b,c,d))};$jscomp.polyfillUnisolated=function(a,b,c,d){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
$jscomp.polyfillIsolated=function(a,b,c,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<e.length-1;f++){var g=e[f];g in d||(d[g]={});d=d[g]}e=e[e.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?d[e]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:b}):b!==c&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+e,e=$jscomp.propertyToPolyfillSymbol[e],
$jscomp.defineProperty(d,e,{configurable:!0,writable:!0,value:b})))};$jscomp.initSymbol=function(){};$jscomp.initSymbolIterator=function(){};$jscomp.initSymbolAsyncIterator=function(){};$jscomp.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};
$jscomp.polyfill("String.prototype.matchAll",function(a){return a?a:function(a){if(a instanceof RegExp&&!a.global)throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");var c=new RegExp(a,a instanceof RegExp?void 0:"g"),b=this,e=!1,f={next:function(){var a={},d=c.lastIndex;if(e)return{value:void 0,done:!0};var f=c.exec(b);if(!f)return e=!0,{value:void 0,done:!0};c.lastIndex===d&&(c.lastIndex+=1);a.value=f;a.done=!1;return a}};f[Symbol.iterator]=function(){return f};
return f}},"es_2020","es3");let m={black:[30,40],red:[31,41],magenta:[35,45],yellow:[33,43],green:[32,42],brightRed:[91,40],brightGreen:[92,42],brightYellow:[93,43]};function n(a="",b,c){b="\u001b["+b(m)[0]+"m";c=(c=c?c(m)[1]:null)?"\u001b["+c+"m":"";return`${"\u001b[39m"}${b}${c}${a}${c?"\u001b[39m\u001b[49m":"\u001b[39m"}`}
var color={red:(a="",b)=>n(a,a=>a.red,b),magenta:(a="",b)=>n(a,a=>a.magenta,b),black:(a="",b)=>n(a,a=>a.black,b),yellow:(a="",b)=>n(a,a=>a.yellow,b),green:(a="",b)=>n(a,a=>a.green,b),brightRed:(a="",b)=>n(a,a=>a.brightRed,b)};function dasherize(a){let [,b,c,d]=/^(\s*)(.*?)(\s*)$/.exec(a);return`${b}${(a=>a.replace(/[A-Z]/g,a=>`-${a[0].toLowerCase()}`))(c).replace(/\s/gs,"-").replace(/-+/g,"-").replace(/^-/s,"").replace(/-$/s,"").replace(/_/g,"-")}${d}`}
function Debug(a){return(...b)=>{var c;let [d,e]=[color.red(a.split(":").slice(0,1).pop()),color.magenta(a.split(":").slice(1).join(":"))];(null===(c=process.env.DEBUG)||void 0===c?0:c.includes("v-press-plus"))&&console.error(`${d}${color.yellow(":")}${e}${color.yellow("->")} `,...b)}}let debug=Debug("v-press-plus:calcTemplateBlock");
function calcTemplateBlock(a,b,c){a=a.split("\n");let d=a.findIndex(a=>a.includes(b))+c+1,e=a.slice(d-c).findIndex(a=>a.includes("</template"))+d+1;debug("Evaluating template block: ",{lines:`${c} to ${c+a.length}`,openTag:b,start:d,end:e});return[d,e]}function addToken(a,b,c){a.line=c;let d=a.push("html_block","",0);d.map=[b,c];d.content=a.getLines(b,c,a.blkIndent,!0);return!0}let debug$1=Debug("v-press-plus:slot-tokens");
function addSlotBasedTokens(a,b,c,d,e){b=[...b.interior.matchAll(/<template.*?[^/]>/gs)].map(a=>a[0]).filter(a=>a.includes("md-slot"));debug$1('this tag\'s interior does have "md-slot" content');debug$1(`there are ${b.length} template tags with md-slot set`);let f=b.reduce((a,b)=>{a.push(calcTemplateBlock(c,b,d));return a},[]);debug$1("line number boundaries for md-slot tags:",f);let g=d;f.forEach((b,c)=>{let [d,h]=b;addToken(a,g,d-1);debug$1(`added block token from ${g} to ${d-1}`);c===f.length-
1&&(addToken(a,h+1,e),debug$1(`added block token from ${h+1} to ${e}; to close out md-slots`));g=h+1});return!0}let debug$2=Debug("v-press-plus");
function blockMeta(a,b=[]){let c=/\s*(\w+)="(.*?)"/gs;a=[...a.matchAll(/^<([a-z|0-9|-]+)([^\0]*?)>([^\0]*?)(<\/\1[^\0]*?>)/gs)].reduce((a,e)=>{const d=e[1];var g=e[2].replace(/\s*[\w:]+?=".*?"/g,"").split(/\s+/).filter(a=>a).map(a=>["flag",a,void 0]);g=[...e[2].matchAll(c),...g].reduce((a,b)=>{const [,c,d]=b;c&&(a[c]=void 0===d?"":d);return a},{});e={tag:d,tagProps:g,isMdBlock:Object.keys(g).includes("md-block")||b.includes(d),isMdSlot:"template"===d&&Object.keys(g).includes("md-slot"),interior:e[3],
closure:e[4]};a.push(e);return a},[]);1<a.length&&(console.warn(`the blockMeta function returned more than one block [${a.length}], it should not.`),debug$2(`blockMeta ended with ${a.length} blocks instead of the expected 1:`,{blocks:a}));return a[0]}function calcLineNumber(a,b,c){let d=!1;b=b.split("\n").reduce((b,c)=>{c.includes(a)||d?d=!0:b.push(c);return b},[]);return c+b.length+1}
var attr_name="[a-zA-Z_:][a-zA-Z0-9:._-]*",unquoted="[^\"'=<>`\\x00-\\x20]+",single_quoted="'[^']*'",double_quoted='"[^"]*"',attr_value="(?:"+unquoted+"|"+single_quoted+"|"+double_quoted+")",attribute="(?:\\s+"+attr_name+"(?:\\s*=\\s*"+attr_value+")?)",open_tag="<[A-Za-z][A-Za-z0-9\\-]*"+attribute+"*\\s*\\/?>",close_tag="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",HTML_OPEN_CLOSE_TAG_RE=new RegExp("^(?:"+open_tag+"|"+close_tag+")"),HTML_OPEN_CLOSE_TAG_RE_1=HTML_OPEN_CLOSE_TAG_RE,html_blocks="address article aside base basefont blockquote body caption center col colgroup dd details dialog dir div dl dt fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hr html iframe legend li link main menu menuitem meta nav noframes ol optgroup option p param section source summary table tbody td tfoot th thead title tr track ul".split(" ");
let HTML_BLOCK_PATTERNS=[[/^<([a-z]+[a-z|0-9|-]*)[\w|-|\s]*?>/,/___DO NOT FIND__/,!0],[/^<([A-Z]+[a-z|A-Z|0-9]*)[\w|-|\s]*?>/,/___DO NOT FIND__/,!0]],END_TAG=/^<\/\w+/s,HTML_SEQUENCES=[[/^<(script|pre|style)(?=(\s|>|$))/i,/<\/(script|pre|style)>/i,!0],[/^\x3c!--/,/--\x3e/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[/^<[A-Z]/,/>/,!0],[/^<\w+\-/,/>/,!0],[new RegExp("^</?("+html_blocks.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],...HTML_BLOCK_PATTERNS,[new RegExp(HTML_OPEN_CLOSE_TAG_RE_1.source+
"\\s*$"),/^$/,!1]],debug$3=Debug("v-press-plus:start-block");function validStartBlock(a,b){let c;for(c=0;c<HTML_SEQUENCES.length;c++)if(HTML_SEQUENCES[c][0].test(a))return debug$3(`${HTML_SEQUENCES[c][0].toString()} passed with ${a}`),!0;return b?HTML_SEQUENCES[c][2]:!0}
let debug$4=Debug("v-press-plus:htmlBlock"),htmlBlock=(...a)=>{a&&0<a.length?(a=a.map(a=>dasherize(a)),debug$4("the following VueJS components will be treated as BLOCK elements: ",a)):debug$4('no VueJS components were registered to be treated as BLOCK elements; you may add the "md-block" property to a component to make it become a block element.');return(b,c,d,e)=>{let f,g,l=b.bMarks[c]+b.tShift[c],p=b.eMarks[c];const k=b.src.slice(l);g=b.src.slice(l,p);debug$4("evaluating",{src:b.src.slice(l,p),
pos:l,max:p});if(END_TAG.test(k))return debug$4("returning false for bare end tag:",k),!1;if(!b.md.options.html)return debug$4("returning false due to markdown options",k),!1;if(60!==b.src.charCodeAt(l))return debug$4('returning false as block doesn\'t start with "<": ',g),!1;if(4<=b.sCount[c]-b.blkIndent)return debug$4(`- returning false due to indentation [ ${b.sCount[c]}, ${b.blkIndent} ]; if it's indented more than 3 spaces, it should be a code block.`),!1;const h=blockMeta(k,a);if(h){debug$4(`processing "${h.tag}":\n${JSON.stringify(h,
null,2)}`);if([...a,...html_blocks].includes(h.tag)||h.isMdBlock)return d=calcLineNumber(h.closure,k,c),debug$4(`${h.tag} is a BLOCK element [ ${c}, ${d} ]`),h.interior.includes("md-slot")?addSlotBasedTokens(b,h,k,c,d):addToken(b,c,d);debug$4(`- ${h.tag} is an INLINE element [ ${c}, ${d} ] so returning false to prevent block rule`);return!1}debug$4("processing unknown [no meta]: ",k);if(!validStartBlock(g,e))return!1;for(f=0;f<HTML_SEQUENCES.length&&!HTML_SEQUENCES[f][0].test(g);f++);if(f===HTML_SEQUENCES.length)return!1;
if(e)return HTML_SEQUENCES[f][2];e=c+1;if(!HTML_SEQUENCES[f][1].test(g))for(;e<d&&!(b.sCount[e]<b.blkIndent);e++)if(l=b.bMarks[e]+b.tShift[e],p=b.eMarks[e],g=b.src.slice(l,p),HTML_SEQUENCES[f][1].test(g)){0!==g.length&&(debug$4(`skipping a line as line text empty in "${h.tag}"`),e++);break}debug$4(`adding token to "${h?h.tag:k}" [ ${c} -> ${e} ], ending: ${g} ]`);addToken(b,c,e);return!0}};
var vuepressPlugin=(a={components:[]},b)=>{console.error("registering vuepress PLUGIN",a,b);let c=htmlBlock();return{name:"v-press-plus",extendMarkdown:a=>{a.block.ruler.at("html_block",c)}}};module.exports=vuepressPlugin
