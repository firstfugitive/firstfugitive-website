<template>
  <div class="slider-wrapper">
    <base-text
      class="slider-text slider-text__before"
      :big="big"
      :bold="bold"
      :gotham="gotham"
      :align="align"
      v-if="beforeSliderText"
      :text="beforeSliderText"
    />
    <div :class="`slider slider-items-${sliderItems.length}`">
      <base-text
        v-for="(item, index) in sliderItems"
        :key="`slider-item_${index}`"
        :big="big"
        :bold="bold"
        :gotham="gotham"
        :align="align"
        :text="item"
      />
    </div>
    <base-text
      class="slider-text slider-text__after"
      :big="big"
      :bold="bold"
      :gotham="gotham"
      :align="align"
      v-if="afterSliderText"
      :text="afterSliderText"
    />
  </div>
</template>

<script>
import BaseText from "../atom/BaseText.vue";
export default {
  components: { BaseText },
  name: "TextSlider",
  props: {
    beforeSliderText: String,
    sliderItems: Array,
    afterSliderText: String,
    align: String,
    big: Boolean,
    bold: Boolean,
    gotham: Boolean,
  },
};
</script>


<style lang="scss" >
@keyframes slide-2 {
  0% {margin-top: -200px;}
  5% {margin-top: -100px;}
  50% {margin-top: -100px;}
  55% {margin-top: 0px;}
  100% {margin-top: 0px;}
}

@keyframes slide-3 {
  0% {margin-top: -300px;}
  5% {margin-top: -200px;}
  33% {margin-top: -200px;}
  38% {margin-top: -100px;}
  66% {margin-top: -100px;}
  71% {margin-top: 0px;}
  100% {margin-top: 0px;}
}

@keyframes slide-4 {
  0% {margin-top: -400px;}
  5% {margin-top: -300px;}
  25% {margin-top: -300px;}
  30% {margin-top: -200px;}
  50% {margin-top: -200px;}
  55% {margin-top: -100px;}
  75% {margin-top: -100px;}
  80% {margin-top: 0px;}
  100% {margin-top: 0px;}
}

@keyframes slide-5 {
  0% {margin-top: -500px;}
  5% {margin-top: -400px;}
  20% {margin-top: -400px;}
  25% {margin-top: -300px;}
  40% {margin-top: -300px;}
  45% {margin-top: -200px;}
  60% {margin-top: -200px;}
  65% {margin-top: -100px;}
  80% {margin-top: -100px;}
  85% {margin-top: 0px;}
  100% {margin-top: 0px;}
}

.slider-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.slider-text {
  white-space: nowrap;
}
.slider {
  padding: 0 15px;
  overflow: hidden;
  height: 50px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-bottom: 50px;
    text-align: center;
    box-sizing: border-box;
  }

  &.slider-items-2 div:first-child {
    animation: slide-2 5s linear infinite;
  }

  &.slider-items-3 div:first-child {
    animation: slide-3 8s linear infinite;
  }

  &.slider-items-4 div:first-child {
    animation: slide-4 10s linear infinite;
  }

  &.slider-items-5 div:first-child {
    animation: slide-5 12s linear infinite;
  }

}
</style>
