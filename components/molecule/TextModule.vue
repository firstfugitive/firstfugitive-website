<template>
  <base-text class="module text-module"
    :big="big"
    :bold="bold"
    :gotham="gotham"
    :align="align"
    v-if="text"
    :text="text"/>
</template>

<script>
import BaseText from '../atom/BaseText.vue';
export default {
  components: { BaseText },
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