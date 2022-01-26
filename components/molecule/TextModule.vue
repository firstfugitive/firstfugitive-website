<template>
  <text-slider-or-normal
    class="module text-module"
    :big="big"
    :bold="bold"
    :gotham="gotham"
    :align="align"
    :text="text"
  />
</template>

<script>
import BaseText from "../atom/BaseText.vue";
import TextSlider from "./TextSlider.vue";
import TextSliderOrNormal from './TextSliderOrNormal.vue';
export default {
  components: { BaseText, TextSlider, TextSliderOrNormal },
  name: "TextModule",
  props: {
    data: Object,
  },
  data() {
    return {
      isSlider: false,
      beforeSliderText: String,
      sliderItems: Array,
      afterSliderText: String,
    };
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
@import "assets/css/placeholder.scss";

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