var e=e||{};e.scope={};e.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};e.arrayIterator=function(a){return{next:e.arrayIteratorImpl(a)}};e.ASSUME_ES5=!1;e.ASSUME_NO_NATIVE_MAP=!1;e.ASSUME_NO_NATIVE_SET=!1;e.SIMPLE_FROUND_POLYFILL=!1;e.ISOLATE_POLYFILLS=!1;
e.defineProperty=e.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};e.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};e.global=e.getGlobal(this);
e.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");e.TRUST_ES6_POLYFILLS=!e.ISOLATE_POLYFILLS||e.IS_SYMBOL_NATIVE;e.polyfills={};e.propertyToPolyfillSymbol={};e.POLYFILL_PREFIX="$jscp$";e.polyfill=function(a,b,c,d){b&&(e.ISOLATE_POLYFILLS?e.polyfillIsolated(a,b,c,d):e.polyfillUnisolated(a,b,c,d))};
e.polyfillUnisolated=function(a,b){var c=e.global;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];f in c||(c[f]={});c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&e.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};
e.polyfillIsolated=function(a,b,c){var d=a.split(".");a=1===d.length;var f=d[0];f=!a&&f in e.polyfills?e.polyfills:e.global;for(var h=0;h<d.length-1;h++){var g=d[h];g in f||(f[g]={});f=f[g]}d=d[d.length-1];c=e.IS_SYMBOL_NATIVE&&"es6"===c?f[d]:null;b=b(c);null!=b&&(a?e.defineProperty(e.polyfills,d,{configurable:!0,writable:!0,value:b}):b!==c&&(e.propertyToPolyfillSymbol[d]=e.IS_SYMBOL_NATIVE?e.global.Symbol(d):e.POLYFILL_PREFIX+d,d=e.propertyToPolyfillSymbol[d],e.defineProperty(f,d,{configurable:!0,
writable:!0,value:b})))};e.initSymbol=function(){};e.initSymbolIterator=function(){};e.initSymbolAsyncIterator=function(){};e.iteratorPrototype=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};
e.polyfill("String.prototype.matchAll",function(a){return a?a:function(a){if(a instanceof RegExp&&!a.global)throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");var b=new RegExp(a,a instanceof RegExp?void 0:"g"),d=this,f=!1,h={next:function(){var a={},c=b.lastIndex;if(f)return{value:void 0,done:!0};var h=b.exec(d);if(!h)return f=!0,{value:void 0,done:!0};b.lastIndex===c&&(b.lastIndex+=1);a.value=h;a.done=!1;return a}};h[Symbol.iterator]=function(){return h};
return h}},"es_2020","es3");let m={black:[30,40],red:[31,41],magenta:[35,45],yellow:[33,43],green:[32,42],brightRed:[91,40],brightGreen:[92,42],brightYellow:[93,43]};function n(a="",b,c){b="\u001b["+b(m)[0]+"m";c=(c=c?c(m)[1]:null)?"\u001b["+c+"m":"";return`${"\u001b[39m"}${b}${c}${a}${c?"\u001b[39m\u001b[49m":"\u001b[39m"}`}
var q={red:(a="",b)=>n(a,a=>a.red,b),magenta:(a="",b)=>n(a,a=>a.magenta,b),black:(a="",b)=>n(a,a=>a.black,b),yellow:(a="",b)=>n(a,a=>a.yellow,b),green:(a="",b)=>n(a,a=>a.green,b),brightRed:(a="",b)=>n(a,a=>a.brightRed,b)};function t(a){let [,b,c,d]=/^(\s*)(.*?)(\s*)$/.exec(a);return`${b}${(a=>a.replace(/[A-Z]/g,a=>`-${a[0].toLowerCase()}`))(c).replace(/\s/gs,"-").replace(/-+/g,"-").replace(/^-/s,"").replace(/-$/s,"").replace(/_/g,"-")}${d}`}
function u(a){return(...b)=>{var c;let [d,f]=[q.red(a.split(":").slice(0,1).pop()),q.magenta(a.split(":").slice(1).join(":"))];(null===(c=process.env.DEBUG)||void 0===c?0:c.includes("v-press-plus"))&&console.error(`${d}${q.yellow(":")}${f}${q.yellow("->")} `,...b)}}let v=u("v-press-plus:calcTemplateBlock");
function w(a,b,c){a=a.split("\n");let d=a.findIndex(a=>a.includes(b))+c+1,f=a.slice(d-c).findIndex(a=>a.includes("</template"))+d+1;v("Evaluating template block: ",{lines:`${c} to ${c+a.length}`,openTag:b,start:d,end:f});return[d,f]}function x(a,b,c){a.line=c;let d=a.push("html_block","",0);d.map=[b,c];d.content=a.getLines(b,c,a.blkIndent,!0);return!0}let y=u("v-press-plus:slot-tokens");
function z(a,b,c,d,f){b=[...b.interior.matchAll(/<template.*?[^/]>/gs)].map(a=>a[0]).filter(a=>a.includes("md-slot"));y('this tag\'s interior does have "md-slot" content');y(`there are ${b.length} template tags with md-slot set`);let h=b.reduce((a,b)=>{a.push(w(c,b,d));return a},[]);y("line number boundaries for md-slot tags:",h);let g=d;h.forEach((b,c)=>{let [d,k]=b;x(a,g,d-1);y(`added block token from ${g} to ${d-1}`);c===h.length-1&&(x(a,k+1,f),y(`added block token from ${k+1} to ${f}; to close out md-slots`));
g=k+1});return!0}let A=u("v-press-plus");
function B(a,b=[]){let c=/\s*(\w+)="(.*?)"/gs;a=[...a.matchAll(/^<([a-z|0-9|-]+)([^\0]*?)>([^\0]*?)(<\/\1[^\0]*?>)/gs)].reduce((a,f)=>{const d=f[1];var g=f[2].replace(/\s*[\w:]+?=".*?"/g,"").split(/\s+/).filter(a=>a).map(a=>["flag",a,void 0]);g=[...f[2].matchAll(c),...g].reduce((a,b)=>{const [,c,d]=b;c&&(a[c]=void 0===d?"":d);return a},{});f={tag:d,tagProps:g,isMdBlock:Object.keys(g).includes("md-block")||b.includes(d),isMdSlot:"template"===d&&Object.keys(g).includes("md-slot"),interior:f[3],closure:f[4]};
a.push(f);return a},[]);1<a.length&&(console.warn(`the blockMeta function returned more than one block [${a.length}], it should not.`),A(`blockMeta ended with ${a.length} blocks instead of the expected 1:`,{blocks:a}));return a[0]}function C(a,b,c){let d=!1;b=b.split("\n").reduce((b,c)=>{c.includes(a)||d?d=!0:b.push(c);return b},[]);return c+b.length+1}var D="address article aside base basefont blockquote body caption center col colgroup dd details dialog dir div dl dt fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hr html iframe legend li link main menu menuitem meta nav noframes ol optgroup option p param section source summary table tbody td tfoot th thead title tr track ul".split(" ");
let E=/^<\/\w+/s,F=[[/^<(script|pre|style)(?=(\s|>|$))/i,/<\/(script|pre|style)>/i,!0],[/^\x3c!--/,/--\x3e/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[/^<[A-Z]/,/>/,!0],[/^<\w+\-/,/>/,!0],[new RegExp("^</?("+D.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[/^<([a-z]+[a-z|0-9|-]*)[\w|-|\s]*?>/,/___DO NOT FIND__/,!0],[/^<([A-Z]+[a-z|A-Z|0-9]*)[\w|-|\s]*?>/,/___DO NOT FIND__/,!0],[new RegExp(/^(?:<[A-Za-z][A-Za-z0-9\-]*(?:\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\s*=\s*(?:[^"'=<>`\x00-\x20]+|'[^']*'|"[^"]*"))?)*\s*\/?>|<\/[A-Za-z][A-Za-z0-9\-]*\s*>)/.source+
"\\s*$"),/^$/,!1]],G=u("v-press-plus:start-block"),H=u("v-press-plus:htmlBlock");
var htmlBlock=(...a)=>{a&&0<a.length?(a=a.map(a=>t(a)),H("the following VueJS components will be treated as BLOCK elements: ",a)):H('no VueJS components were registered to be treated as BLOCK elements; you may add the "md-block" property to a component to make it become a block element.');return(b,c,d,f)=>{let h;var g=b.bMarks[c]+b.tShift[c];let r=b.eMarks[c];const p=b.src.slice(g);h=b.src.slice(g,r);H("evaluating",{src:b.src.slice(g,r),pos:g,max:r});if(E.test(p))return H("returning false for bare end tag:",
p),!1;if(!b.md.options.html)return H("returning false due to markdown options",p),!1;if(60!==b.src.charCodeAt(g))return H('returning false as block doesn\'t start with "<": ',h),!1;if(4<=b.sCount[c]-b.blkIndent)return H(`- returning false due to indentation [ ${b.sCount[c]}, ${b.blkIndent} ]; if it's indented more than 3 spaces, it should be a code block.`),!1;const l=B(p,a);if(l){H(`processing "${l.tag}":\n${JSON.stringify(l,null,2)}`);if([...a,...D].includes(l.tag)||l.isMdBlock)return d=C(l.closure,
p,c),H(`${l.tag} is a BLOCK element [ ${c}, ${d} ]`),l.interior.includes("md-slot")?z(b,l,p,c,d):x(b,c,d);H(`- ${l.tag} is an INLINE element [ ${c}, ${d} ] so returning false to prevent block rule`);return!1}H("processing unknown [no meta]: ",p);a:{var k=h;for(g=0;g<F.length;g++)if(F[g][0].test(k)){G(`${F[g][0].toString()} passed with ${k}`);k=!0;break a}k=f?F[g][2]:!0}if(!k)return!1;for(k=0;k<F.length&&!F[k][0].test(h);k++);if(k===F.length)return!1;if(f)return F[k][2];f=c+1;if(!F[k][1].test(h))for(;f<
d&&!(b.sCount[f]<b.blkIndent);f++)if(g=b.bMarks[f]+b.tShift[f],r=b.eMarks[f],h=b.src.slice(g,r),F[k][1].test(h)){0!==h.length&&(H(`skipping a line as line text empty in "${l.tag}"`),f++);break}H(`adding token to "${l?l.tag:p}" [ ${c} -> ${f} ], ending: ${h} ]`);x(b,c,f);return!0}};export{htmlBlock as vPressPlug}
