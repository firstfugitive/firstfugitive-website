<template>
  <div class="slider-full-size">
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
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";

export default {
  components: { Hooper, Slide, HooperPagination },
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