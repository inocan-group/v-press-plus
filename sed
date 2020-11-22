registering vuepress PLUGIN {}
v-press-plus:htmlBlock ->  no VueJS components were registered to be treated as BLOCK elements; you may add the "md-block" property to a component to make it become a block element.
v-press-plus:htmlBlock ->  evaluating {
  src: 'Better support for VueJS components in Vuepress and Vitepress',
  pos: 20,
  max: 81
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Better support for VueJS components in Vuepress and Vitepress
v-press-plus:htmlBlock ->  evaluating {
  src: `**Vuepress** and **Vitepress** are awesome in the same way that [Reese's Peanut Butter Cups](https://www.hersheys.com/reeses/en_us/products/reeses-peanut-butter-cups.html) are awesome ... "two great tastes that taste great together". Admittedly you probably won't ever eat _markdown_ or _VueJS components_ but being able to author in Markdown while dropping VueJS components on the same authoring surface is very nice indeed.`,
  pos: 103,
  max: 528
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  **Vuepress** and **Vitepress** are awesome in the same way that [Reese's Peanut Butter Cups](https://www.hersheys.com/reeses/en_us/products/reeses-peanut-butter-cups.html) are awesome ... "two great tastes that taste great together". Admittedly you probably won't ever eat _markdown_ or _VueJS components_ but being able to author in Markdown while dropping VueJS components on the same authoring surface is very nice indeed.
v-press-plus:htmlBlock ->  evaluating {
  src: "This repo's goal is to improve the way that VueJS components can interact with content on a Markdown page. To be more specific, we're concerned with making sure that the following use cases are fully supported:",
  pos: 530,
  max: 740
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  This repo's goal is to improve the way that VueJS components can interact with content on a Markdown page. To be more specific, we're concerned with making sure that the following use cases are fully supported:
v-press-plus:htmlBlock ->  evaluating { src: '**Vue Components as Block Elements** ', pos: 745, max: 782 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  **Vue Components as Block Elements** 
v-press-plus:htmlBlock ->  evaluating {
  src: 'Allows all tags which include the `md-block` property to be seen as block HTML elements.',
  pos: 788,
  max: 876
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Allows all tags which include the `md-block` property to be seen as block HTML elements.
v-press-plus:htmlBlock ->  evaluating {
  src: 'In Markdown, a _block_ element\'s interior is NOT treated as Markdown whereas with _inline_ elements it is. This means -- per the spec -- that a `span` tag within your markdown is _inline_ and it\'s interior content should be processed as markdown. In contrast, a `div` is a _block_ element and therefore content in it\'s interior should just be left "as is".',
  pos: 886,
  max: 1242
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  In Markdown, a _block_ element's interior is NOT treated as Markdown whereas with _inline_ elements it is. This means -- per the spec -- that a `span` tag within your markdown is _inline_ and it's interior content should be processed as markdown. In contrast, a `div` is a _block_ element and therefore content in it's interior should just be left "as is".
v-press-plus:htmlBlock ->  evaluating {
  src: 'When it comes to _custom components_ -- which is what the Markdown parsing engine will see your VueJS components as -- they are seen as _inline_ elements and this means it will convert your interior content into what it believes is markdown into HTML _before_ your component gets a chance to look. If you have something like this in your markdown:',
  pos: 1248,
  max: 1595
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  When it comes to _custom components_ -- which is what the Markdown parsing engine will see your VueJS components as -- they are seen as _inline_ elements and this means it will convert your interior content into what it believes is markdown into HTML _before_ your component gets a chance to look. If you have something like this in your markdown:
v-press-plus:htmlBlock ->  evaluating {
  src: 'things are going to end in tears as `<my-table>` is considered an inline element and your interior scope has been converted in an undesirable way. With this plugin you can simply add the `md-block` flag like so:',
  pos: 1771,
  max: 1982
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  things are going to end in tears as `<my-table>` is considered an inline element and your interior scope has been converted in an undesirable way. With this plugin you can simply add the `md-block` flag like so:
v-press-plus:htmlBlock ->  evaluating {
  src: 'Now your component is a block component and any cut-and-paste of template code from a working Vue app into Vue/Vitepress and it will just work.',
  pos: 2047,
  max: 2190
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Now your component is a block component and any cut-and-paste of template code from a working Vue app into Vue/Vitepress and it will just work.
v-press-plus:htmlBlock ->  evaluating { src: '**Inline Elements**', pos: 2195, max: 2214 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  **Inline Elements**
v-press-plus:htmlBlock ->  evaluating {
  src: 'Allows all tags which include the `md-block` property to be seen as block HTML elements.',
  pos: 2220,
  max: 2308
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Allows all tags which include the `md-block` property to be seen as block HTML elements.
v-press-plus:htmlBlock ->  evaluating {
  src: 'Components which should be _inline_ elements should in fact behave as inline elements. In Vue/Vitepress all your Vue components will be defaulted to this configuration and sometimes that _is_ what you want. This is most typically the case when you are building a component, specifically for the Vue/Vitepress platform (and therefore have an expectation that your interior scope will be transformed from an assumed Markdown base).',
  pos: 2314,
  max: 2743
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Components which should be _inline_ elements should in fact behave as inline elements. In Vue/Vitepress all your Vue components will be defaulted to this configuration and sometimes that _is_ what you want. This is most typically the case when you are building a component, specifically for the Vue/Vitepress platform (and therefore have an expectation that your interior scope will be transformed from an assumed Markdown base).
v-press-plus:htmlBlock ->  evaluating {
  src: "With this plugin, you'll find your VueJS components which you wish to be _inline_ should just work more consistently. One obvious, non-spec compliant aspect of the pre-plugin Markdown in Vue/Vitepress is seen when viewing the following markdown:",
  pos: 2749,
  max: 2994
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  With this plugin, you'll find your VueJS components which you wish to be _inline_ should just work more consistently. One obvious, non-spec compliant aspect of the pre-plugin Markdown in Vue/Vitepress is seen when viewing the following markdown:
v-press-plus:htmlBlock ->  evaluating {
  src: 'This should show two lines of red text, however, only the span tag should be italized as the div tag is a block element so the convertion of markdown to HTML should _not_ have been applied. However, by default Vue/Vitepress transform both making them behave identically. ',
  pos: 3144,
  max: 3415
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  This should show two lines of red text, however, only the span tag should be italized as the div tag is a block element so the convertion of markdown to HTML should _not_ have been applied. However, by default Vue/Vitepress transform both making them behave identically. 
v-press-plus:htmlBlock ->  evaluating {
  src: 'With no adjustments made, this will be corrected to be spec-compliant when using this plugin.',
  pos: 3425,
  max: 3518
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  With no adjustments made, this will be corrected to be spec-compliant when using this plugin.
v-press-plus:htmlBlock ->  evaluating { src: '**Structured Inline**', pos: 3523, max: 3544 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  **Structured Inline**
v-press-plus:htmlBlock ->  evaluating {
  src: 'There is a third category which this plugin hopes to introduce soon. It is partially supported today. There are a whole set of cool VueJS components which could be used in a Vue/Vitepress world which use _slots_ but also want to leverage the rendering markdown engine. A good example might be:',
  pos: 3550,
  max: 3843
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  There is a third category which this plugin hopes to introduce soon. It is partially supported today. There are a whole set of cool VueJS components which could be used in a Vue/Vitepress world which use _slots_ but also want to leverage the rendering markdown engine. A good example might be:
v-press-plus:htmlBlock ->  evaluating {
  src: 'In the above example, the `md-hybrid` keyword would make the element a _block element_ but the code would be wrapped in a way that the markdown processor would be passed down to the slot templates and allow for slots to be _pre-processed_ so that `variables` can be replaced in the markdown prior to being converted to HTML. This solution is not started yet.',
  pos: 4129,
  max: 4487
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  In the above example, the `md-hybrid` keyword would make the element a _block element_ but the code would be wrapped in a way that the markdown processor would be passed down to the slot templates and allow for slots to be _pre-processed_ so that `variables` can be replaced in the markdown prior to being converted to HTML. This solution is not started yet.
v-press-plus:htmlBlock ->  evaluating {
  src: 'A potentially simpler model which has the beginning of implementation in place is as follows:',
  pos: 4493,
  max: 4586
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  A potentially simpler model which has the beginning of implementation in place is as follows:
v-press-plus:htmlBlock ->  evaluating {
  src: 'Here we see use of the `md-slot` container in the second slot. The intent is that this will convert the surrounding `<two-columns>` to become a _block_ element but with the interior of this one slot being left open to being transformed by the markdown parser.',
  pos: 4844,
  max: 5103
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Here we see use of the `md-slot` container in the second slot. The intent is that this will convert the surrounding `<two-columns>` to become a _block_ element but with the interior of this one slot being left open to being transformed by the markdown parser.
v-press-plus:htmlBlock ->  evaluating {
  src: "Getting either of these to work requires a bit of understanding of Markdown-it's API (which is very well documented) and then the handoff between it and VueJS. I didn't know anything about MarkdownIt's API a day ago so it's hard for me to know the best approach but very welcome to PR's if others know more.",
  pos: 5109,
  max: 5416
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Getting either of these to work requires a bit of understanding of Markdown-it's API (which is very well documented) and then the handoff between it and VueJS. I didn't know anything about MarkdownIt's API a day ago so it's hard for me to know the best approach but very welcome to PR's if others know more.
v-press-plus:htmlBlock ->  evaluating {
  src: "This repo represents a _plugin_ for **Vuepress** and an importable NPM module you can easily bring into your **Vitepress** config (Vitepress doesn't -- at least yet -- support the concept of a plugin).",
  pos: 5419,
  max: 5620
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  This repo represents a _plugin_ for **Vuepress** and an importable NPM module you can easily bring into your **Vitepress** config (Vitepress doesn't -- at least yet -- support the concept of a plugin).
v-press-plus:htmlBlock ->  evaluating { src: 'Install using **npm** or **yarn**:', pos: 5659, max: 5693 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Install using **npm** or **yarn**:
v-press-plus:htmlBlock ->  evaluating { src: 'Add to your docs configuration:', pos: 5805, max: 5836 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Add to your docs configuration:
v-press-plus:htmlBlock ->  evaluating { src: 'Simple config is:', pos: 5841, max: 5858 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Simple config is:
v-press-plus:htmlBlock ->  evaluating {
  src: 'If you want to register certain components as always being _block_ html elements:',
  pos: 5993,
  max: 6074
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  If you want to register certain components as always being _block_ html elements:
v-press-plus:htmlBlock ->  evaluating { src: '`docs/.vitepress/config.js`', pos: 6080, max: 6107 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  `docs/.vitepress/config.js`
v-press-plus:htmlBlock ->  evaluating {
  src: "While **Vitepress** doesn't provide a _plugin_ mechanism it still provides you a config file and within that configuration you are giving access to the Markdown options and this is all you really need:",
  pos: 6322,
  max: 6523
}
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  While **Vitepress** doesn't provide a _plugin_ mechanism it still provides you a config file and within that configuration you are giving access to the Markdown options and this is all you really need:
v-press-plus:htmlBlock ->  evaluating { src: 'Install using **npm** or **yarn**:', pos: 6528, max: 6562 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Install using **npm** or **yarn**:
v-press-plus:htmlBlock ->  evaluating { src: 'Add to your config file:', pos: 6674, max: 6698 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Add to your config file:
v-press-plus:htmlBlock ->  evaluating { src: '`docs/.vitepress/config.js`:', pos: 6704, max: 6732 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  `docs/.vitepress/config.js`:
v-press-plus:htmlBlock ->  evaluating { src: '<div>', pos: 13, max: 18 }
v-press-plus:htmlBlock ->  processing "div":
{
  "tag": "div",
  "tagProps": {},
  "isMdBlock": false,
  "isMdSlot": false,
  "interior": "\n<More>\n    this is more with DIV wrap\n</More>\n",
  "closure": "</div>"
}
v-press-plus:htmlBlock ->  div is a BLOCK element [ 2, 7 ]
v-press-plus:htmlBlock ->  evaluating { src: 'MarkdownIt API', pos: 75, max: 89 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  MarkdownIt API
v-press-plus:htmlBlock ->  evaluating { src: 'Markdown Spec', pos: 92, max: 105 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Markdown Spec
v-press-plus:htmlBlock ->  evaluating { src: 'Vuepress: [plugins](), [foo] ', pos: 108, max: 137 }
v-press-plus:htmlBlock ->  returning false as block doesn't start with "<":  Vuepress: [plugins](), [foo] 
