<template>
  <div>
    <base-text
      :big="big"
      :bold="bold"
      :gotham="gotham"
      :align="align"
      v-if="processedText && !isSlider"
      :text="processedText"
    />
    <text-slider
      :big="big"
      :bold="bold"
      :gotham="gotham"
      :align="align"
      v-if="isSlider"
      :beforeSliderText="beforeSliderText"
      :sliderItems="sliderItems"
      :afterSliderText="afterSliderText"
    />
  </div>
</template>

<script>
import BaseText from "../atom/BaseText.vue";
import TextSlider from "./TextSlider.vue";

export default {
  components: { BaseText, TextSlider },
  name: "TextSliderOrNormal",
  props: {
    text: String,
    align: String,
    big: Boolean,
    bold: Boolean,
    gotham: Boolean,
  },
  data() {
    return {
      isSlider: false,
      beforeSliderText: String,
      sliderItems: Array,
      afterSliderText: String,
      processedText: undefined
    };
  },
  methods: {
    searchTextForSlider() {
      let bigDivider = "$";
      let smallDivider = "/";

      let splitText = this.text.split(bigDivider);
      if (splitText.length > 1) {
        //we probably have a slider text definition
        let probablySliderItems = splitText[1].split(smallDivider);
        if (probablySliderItems.length > 1) {
          //must be a slider
          this.isSlider = true;
          this.beforeSliderText = splitText[0];
          this.afterSliderText = splitText[2];
          this.sliderItems = probablySliderItems;
          return;
        }
      }
      this.processedText = this.text;
    },
  },
  created() {
    this.searchTextForSlider();
  },
};
</script>
