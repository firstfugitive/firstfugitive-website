<template>
  <div class="module slider-full-size">
    <hooper
      class="slider-full-size__slider"
      :infiniteScroll="true"
      :autoPlay="true"
      :playSpeed="4000"
      :wheelControl="false"
    >
      <slide v-for="image in images" :key="image.sys.id">
        <img class="" :src="getImageSrc(image)" />
      </slide>

      <!-- <hooper-pagination slot="hooper-addons"></hooper-pagination> -->
    </hooper>
    <slot></slot>
  </div>
</template>

<script>
import BaseLink from "../atom/BaseLink.vue";
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";
import BaseButton from '../atom/BaseButton.vue';
/* import "hooper/dist/hooper.css"; */

export default {
  components: { BaseLink, Hooper, Slide, HooperPagination, BaseButton },
  name: "SliderFullSize",
  props: {
    data: Object,
  },
  methods: {
    getImageSrc(image) {
      return image.fields?.file?.url;
    },
  },
  computed: {
    images() {
      return this.data?.fields?.items;
    },
    firstImage() {
      return this.images ? this.images[0] : undefined;
    },
    firstImageSrc() {
      return this.firstImage?.fields?.file?.url;
    },
    secImage() {
      return this.images ? this.images[1] : undefined;
    },
    secImageSrc() {
      return this.secImage?.fields?.file?.url;
    },
  },
};
</script>


<style lang="scss">

@import 'assets/css/placeholder.scss';

.slider-full-size {
  height: 100vh;
  width: 100vw;
  position: relative;

  &__slider {
		width: 100vw;
		height: 100vh;
    img {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }

    .hooper-indicator.is-active,
    .hooper-indicator:hover {
      background-color: black;
    }
  }

  
}
</style>