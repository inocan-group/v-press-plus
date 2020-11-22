<template>
  <div class="more" style="cursor: pointer" @click="show = !show">
    <div v-show="show">
      <slot />
      <br />
      <div class="less"><span :style="ctaStyle" style="margin-top: 0.5rem;margin-left: 0;">less</span></div>
    </div>
    <div v-show="!show" style="display: inline-flex; padding: 0.5rem; overflow: hidden; border-radius: 50%;">
      <div :style="ctaStyle">
        <span v-if="title" style="margin-right: 3px;">{{ title }}</span>
        <span v-else>more ...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    show: false,
    ctaStyle:
      'display: inline-flex; padding: 0.5rem;background-color: #C6C8C9; border-radius: 10px; margin-left: 2px; margin-right: 2px;',
  }),
};
</script>

<style></style>
