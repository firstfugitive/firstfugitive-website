<template>
  <div class="module markdown-text" 
    v-html="convertedText"
    :style="`text-align: ${align}`"></div>
</template>

<script>
const showdown = require('showdown');
const converter = new showdown.Converter();
export default {
  name: 'MarkdownText',
  props: {
    data: Object
  },
  computed: {
    convertedText() {
      let convertedText = converter.makeHtml(this.text);
      let convertedTextLineBreaksToBrTags = convertedText.replace(/\n/gi, "<br>");
      return convertedTextLineBreaksToBrTags;
    },
    text() {
      return this.data?.fields?.text;
    },
    align() {
      return this.data?.fields?.align;
    }
  },
}
</script>

<style lang="scss">
@import "assets/css/variables";
@import 'assets/css/placeholder.scss';

.markdown-text {
  ul {
    padding-left: 2rem;
    > li {
      padding-left: 10px;
      &:not(:first-child) {
        margin-top: 1.25rem;
      }
    }
  }
  ol {
    padding-left: 2rem;
    > li {
      padding-left: 10px;
      &:not(:first-child) {
        margin-top: 1.25rem;
      }
    }
  }
  img {
    max-width: 100%;
  }
}
</style>