---
sidebarDepth: 3
---
# `v-press-plus`

> Better support for VueJS components in Vuepress and Vitepress


## Quick Overview

**Vuepress** and **Vitepress** are awesome in the same way that [Reese's Peanut Butter Cups](https://www.hersheys.com/reeses/en_us/products/reeses-peanut-butter-cups.html) are awesome ... "two great tastes that taste great together". Admittedly you probably won't ever eat _markdown_ or _VueJS components_ but being able to author in Markdown while dropping VueJS components on the same authoring surface is very nice indeed.

This repo's goal is to improve the way that VueJS components can interact with content on a Markdown page. To be more specific, we're concerned with making sure that the following use cases are fully supported:

### **1. Vue Components as Block Elements** 

Allows all tags which include the `md-block` property to be seen as block HTML elements.


In Markdown, a _block_ element's interior is NOT treated as Markdown whereas with _inline_ elements it is. This means -- per the spec -- that a `span` tag within your markdown is _inline_ and it's interior content should be processed as markdown. In contrast, a `div` is a _block_ element and therefore content in it's interior should just be left "as is".

When it comes to _custom components_ -- which is what the Markdown parsing engine will see your VueJS components as -- they are seen as _inline_ elements and this means it will convert your interior content into what it believes is markdown into HTML _before_ your component gets a chance to look. If you have something like this in your markdown:

```md
# My Page

<my-table>
<template #name="{row}">
    <span class="font-semiBold">{{row.name}}</span>
</template>
</my-table>
```

things are going to end in tears as `<my-table>` is considered an inline element and your interior scope has been converted in an undesirable way. With this plugin you can simply add the `md-block` flag like so:

```md
<my-table md-block> ... </my-table>
```

Now your component is a block component and any cut-and-paste of template code from a working Vue app into Vue/Vitepress and it will just work.

### **2. Inline Elements**

Allows all tags which include the `md-block` property to be seen as block HTML elements.

Components which should be _inline_ elements should in fact behave as inline elements. In Vue/Vitepress all your Vue components will be defaulted to this configuration and sometimes that _is_ what you want. This is most typically the case when you are building a component, specifically for the Vue/Vitepress platform (and therefore have an expectation that your interior scope will be transformed from an assumed Markdown base).

With this plugin, you'll find your VueJS components which you wish to be _inline_ should just work more consistently. One obvious, non-spec compliant aspect of the pre-plugin Markdown in Vue/Vitepress is seen when viewing the following markdown:

```md
# Non Spec Compliant 

<span style="color:red">_my red shoes_</span>
<div style="color:red">_my red shoes_</div>
```

This should show two lines of red text, however, only the span tag should be italized as the div tag is a block element so the convertion of markdown to HTML should _not_ have been applied. However, by default Vue/Vitepress transform both making them behave identically. 

With no adjustments made, this will be corrected to be spec-compliant when using this plugin.

### **3. Structured Inline**

There is a third category which this plugin hopes to introduce soon. It is partially supported today. There are a whole set of cool VueJS components which could be used in a Vue/Vitepress world which use _slots_ but also want to leverage the rendering markdown engine. A good example might be:

```html
<two-columns md-hybrid>
    <slot #left="{name}">
    ## {{name}}'s Left Brain says
    Lorem ipsum dolor sit amet, consectetur adipisicing elit
    </slot>
    <slot #right>
        ## My Right Brains says
    </slot>
</two-columns>
```

In the above example, the `md-hybrid` keyword would make the element a _block element_ but the code would be wrapped in a way that the markdown processor would be passed down to the slot templates and allow for slots to be _pre-processed_ so that `variables` can be replaced in the markdown prior to being converted to HTML. This solution is not started yet.

A potentially simpler model which has the beginning of implementation in place is as follows:

```md
<two-columns>
    <slot #left="{name}">
    <my-component>...</my-component>
    </slot>
    <slot #right md-slot>
        ```html
    <my-component>...</my-component>
        ```
    </slot>
</two-columns>
```

Here we see use of the `md-slot` container in the second slot. The intent is that this will convert the surrounding `<two-columns>` to become a _block_ element but with the interior of this one slot being left open to being transformed by the markdown parser.

Getting either of these to work requires a bit of understanding of Markdown-it's API (which is very well documented) and then the handoff between it and VueJS. I didn't know anything about MarkdownIt's API a day ago so it's hard for me to know the best approach but very welcome to PR's if others know more.


This repo represents a _plugin_ for **Vuepress** and an importable NPM module you can easily bring into your **Vitepress** config (Vitepress doesn't -- at least yet -- support the concept of a plugin).

## Getting Started with Vuepress

1. Install using **npm** or **yarn**:

     ```sh
     # yarn
     yarn add --dev v-press-plus
     # npm
     npm install v-press-plus
     ```

2. Add to your docs configuration:

   Simple config is:
   `docs/.vuepress/config.js`
   ```js
    module.exports = {
        // ...
        plugins: [ 'v-press-plus' ],
    }
    ```

    If you want to register certain components as always being _block_ html elements:

    `docs/.vuepress/config.js`
    ```js
    module.exports = {
        // ...
        plugins: {
            'v-press-plus': {
                components: ["foo", "bar"]
            }
        }
    }
    ```

## Getting Started with Vitepress

While **Vitepress** doesn't provide a _plugin_ mechanism it still provides you a config file and within that configuration you are giving access to the Markdown options and this is all you really need:

1. Install using **npm** or **yarn**:

     ```sh
     # yarn
     yarn add --dev v-press-plus
     # npm
     npm install --save-dev v-press-plus
     ```

2. Add to your config file:

   The simplest way to add to your config is as follows:

    `docs/.vitepress/config.js`:
    ```js
    const markdown = require("v-press-plus/dist/vitepress").markdown;

    module.exports = {
        // ...
        markdown,
        // ...
    } 
    ```

    This approach will get you up and running but if you want to pre-register some VueJS components (aka, so they'll always be treated as HTML Block elements), or you want to modify the `markdown` property in other ways than just this plugin, you can do the following instead:

   `docs/.vitepress/config.js`:
    ```js
    const htmlBlock = require("v-press-plus/dist/vitepress/index").htmlBlock;

    module.exports = {
        // ...
        markdown: {
            config: md => {
                md.block.ruler.at('html_block', htmlBlock('component-1', 'component-2'));
            }
        },
        // ...
    } 
    ```

## Running in Debug Mode

If you ever want to see this plugin's comments about it's parsing rules you can run it in DEBUG mode:

```sh
# Vuepress
DEBUG=v-press-plus TERM=xterm-color yarn vuepress dev docs \
2>&1 >/dev/null | sed s/\\033//g 

# Vitepress
DEBUG=v-press-plus TERM=xterm-color yarn vitepress dev docs \
2>&1 >/dev/null | sed s/\\033//g 
 ```