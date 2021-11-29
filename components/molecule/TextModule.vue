<template>
  <div 
    :class="['module text-module', {'text-module--big': big}, {'text-module--bold': bold}, {'text-module--gotham': gotham}]"
    :style="`text-align: ${align}`">
    {{ text }}
  </div>
</template>

<script>
import MarkdownText from './MarkdownText.vue';
export default {
  components: { MarkdownText },
  name: "TextModule",
  props: {
    data: Object,
  },
  computed: {
    text() {
      return this.data?.fields?.text;
    },
    align() {
      return this.data?.fields?.align;
    },
    big() {
      return this.data?.fields?.big;
    },
    bold() {
      return this.data?.fields?.bold;
    },
    gotham() {
      return this.data?.fields?.gotham;
    },
  },
};
</script>


<style lang="scss" >
@import "assets/css/variables";
@import 'assets/css/placeholder.scss';

.text-module {
  &--big {
    @extend %fontVeryBig;
  }

  &--bold {
    font-weight: bold;
  }

  &--gotham {
    @extend %fontGotham;
  }

}
</style>